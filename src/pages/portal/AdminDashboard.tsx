import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, FileText, MessageCircle } from "lucide-react";
import Chat from "@/components/portal/Chat";

interface Investor {
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  sector: string | null;
  investment_size: string | null;
  business_description: string | null;
  status: string;
  created_at: string;
}

interface FileRow { id: string; file_name: string; file_path: string; }

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [selected, setSelected] = useState<Investor | null>(null);
  const [files, setFiles] = useState<FileRow[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("investor_applications").select("*").order("created_at", { ascending: false });
      setInvestors((data as Investor[]) || []);
    })();
  }, []);

  useEffect(() => {
    if (!selected) { setFiles([]); return; }
    (async () => {
      const { data } = await supabase.from("application_files").select("*").eq("user_id", selected.user_id);
      setFiles((data as FileRow[]) || []);
    })();
  }, [selected]);

  const download = async (f: FileRow) => {
    const { data } = await supabase.storage.from("investor-files").createSignedUrl(f.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const setStatus = async (status: string) => {
    if (!selected) return;
    await supabase.from("investor_applications").update({ status }).eq("user_id", selected.user_id);
    setSelected({ ...selected, status });
    setInvestors((arr) => arr.map((i) => i.user_id === selected.user_id ? { ...i, status } : i));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-prime-light-grey py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-montserrat font-bold text-prime-blue">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">{investors.length} registered investors</p>
          </div>
          <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign Out</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Investors</CardTitle></CardHeader>
            <CardContent className="space-y-2 max-h-[700px] overflow-y-auto">
              {investors.map((inv) => (
                <button key={inv.user_id} onClick={() => setSelected(inv)}
                  className={`w-full text-left p-3 rounded-lg border transition ${selected?.user_id === inv.user_id ? "bg-prime-blue text-white border-prime-blue" : "hover:bg-gray-50"}`}>
                  <div className="font-semibold text-sm">{inv.full_name}</div>
                  <div className="text-xs opacity-80">{inv.email}</div>
                  <div className="text-xs mt-1 opacity-70">{inv.country} • {inv.status}</div>
                </button>
              ))}
              {investors.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No investors yet.</p>}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {!selected && <Card><CardContent className="py-16 text-center text-gray-500">Select an investor to view details</CardContent></Card>}
            {selected && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle>{selected.full_name} <Badge variant="secondary" className="ml-2">{selected.status}</Badge></CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setStatus("approved")}>Approve</Button>
                        <Button size="sm" variant="outline" onClick={() => setStatus("pending")}>Pending</Button>
                        <Button size="sm" variant="outline" onClick={() => setStatus("rejected")}>Reject</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Email:</span> {selected.email}</div>
                    <div><span className="text-gray-500">Phone:</span> {selected.phone || "—"}</div>
                    <div><span className="text-gray-500">Country:</span> {selected.country || "—"}</div>
                    <div><span className="text-gray-500">Sector:</span> {selected.sector || "—"}</div>
                    <div className="sm:col-span-2"><span className="text-gray-500">Investment:</span> {selected.investment_size || "—"}</div>
                    <div className="sm:col-span-2"><span className="text-gray-500">Description:</span><br />{selected.business_description || "—"}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" />Documents ({files.length})</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {files.map((f) => (
                      <button key={f.id} onClick={() => download(f)} className="flex items-center gap-2 text-sm text-prime-blue hover:underline border rounded p-2 w-full">
                        <FileText className="w-4 h-4" />{f.file_name}
                      </button>
                    ))}
                    {files.length === 0 && <p className="text-sm text-gray-500">No documents uploaded.</p>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircle className="w-5 h-5" />Chat</CardTitle></CardHeader>
                  <CardContent><Chat conversationUserId={selected.user_id} currentUserId={user.id} /></CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;