import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, FileText, LogOut } from "lucide-react";
import Chat from "@/components/portal/Chat";

interface FileRow { id: string; file_name: string; file_path: string; file_size: number | null; created_at: string; }

const InvestorDashboard = () => {
  const { user, signOut } = useAuth();
  const [app, setApp] = useState<any>(null);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", country: "", sector: "", investment_size: "", business_description: "",
  });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("investor_applications").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setApp(data);
        setForm({
          full_name: data.full_name || "", email: data.email || "", phone: data.phone || "",
          country: data.country || "", sector: data.sector || "", investment_size: data.investment_size || "",
          business_description: data.business_description || "",
        });
      } else {
        setForm((f) => ({ ...f, email: user.email || "" }));
      }
      const { data: f } = await supabase.from("application_files").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setFiles((f as FileRow[]) || []);
    })();
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const payload = { ...form, user_id: user.id };
    const { data, error } = await supabase.from("investor_applications").upsert(payload, { onConflict: "user_id" }).select().single();
    setLoading(false);
    if (error) return toast.error(error.message);
    setApp(data);
    toast.success("Application saved");
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(e.target.files)) {
        const path = `${user.id}/${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("investor-files").upload(path, file);
        if (upErr) throw upErr;
        const { data, error } = await supabase.from("application_files").insert({
          user_id: user.id, application_id: app?.id ?? null,
          file_name: file.name, file_path: path, file_size: file.size, mime_type: file.type,
        }).select().single();
        if (error) throw error;
        setFiles((prev) => [data as FileRow, ...prev]);
      }
      toast.success("Uploaded");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const remove = async (f: FileRow) => {
    await supabase.storage.from("investor-files").remove([f.file_path]);
    await supabase.from("application_files").delete().eq("id", f.id);
    setFiles((prev) => prev.filter((x) => x.id !== f.id));
  };

  const download = async (f: FileRow) => {
    const { data } = await supabase.storage.from("investor-files").createSignedUrl(f.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-prime-light-grey py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-montserrat font-bold text-prime-blue">Investor Portal</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign Out</Button>
        </div>

        <Tabs defaultValue="application">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="files">Documents</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="application">
            <Card>
              <CardHeader><CardTitle>Application Details {app?.status && <span className="text-sm font-normal text-gray-500 ml-2">Status: {app.status}</span>}</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
                  <div><Label>Full Name *</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
                  <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <div><Label>Country</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
                  <div><Label>Sector</Label><Input value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} /></div>
                  <div><Label>Investment Size (USD)</Label><Input value={form.investment_size} onChange={(e) => setForm({ ...form, investment_size: e.target.value })} /></div>
                  <div className="md:col-span-2"><Label>Business Description</Label><Textarea rows={5} value={form.business_description} onChange={(e) => setForm({ ...form, business_description: e.target.value })} /></div>
                  <div className="md:col-span-2">
                    <Button type="submit" disabled={loading} className="bg-prime-gold hover:bg-prime-gold/90 text-prime-blue">
                      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Save Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader><CardTitle>Upload Documents</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                  <span>{uploading ? "Uploading..." : "Click to upload (PDF, images, docs)"}</span>
                  <input type="file" multiple className="hidden" onChange={onUpload} disabled={uploading} />
                </label>
                <div className="space-y-2">
                  {files.map((f) => (
                    <div key={f.id} className="flex items-center justify-between border rounded-lg p-3">
                      <button onClick={() => download(f)} className="flex items-center gap-2 text-sm text-prime-blue hover:underline">
                        <FileText className="w-4 h-4" />{f.file_name}
                      </button>
                      <Button variant="ghost" size="icon" onClick={() => remove(f)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </div>
                  ))}
                  {files.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No documents yet.</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader><CardTitle>Chat with Prime Auditors</CardTitle></CardHeader>
              <CardContent><Chat conversationUserId={user.id} currentUserId={user.id} /></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorDashboard;