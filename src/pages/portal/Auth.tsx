import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const { locale = "en" } = useParams();
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/${locale}/portal`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        // If session returned, account is auto-confirmed — go straight in
        if (data.session) {
          toast.success("Account created! Welcome.");
          nav(`/${locale}/portal`);
        } else {
          toast.success("Account created! Check your inbox (and spam folder) for a verification link, then sign in.");
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.toLowerCase().includes("email not confirmed")) {
            toast.error("Please verify your email first. Check your inbox and spam folder for the confirmation link.");
          } else if (error.message.toLowerCase().includes("invalid login")) {
            toast.error("Incorrect email or password. Please try again.");
          } else {
            throw error;
          }
          return;
        }
        toast.success("Welcome back!");
        nav(`/${locale}/portal`);
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/${locale}/portal`,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    nav(`/${locale}/portal`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-prime-blue-deepest">
      <Card className="w-full max-w-md border-white/10 bg-white/[0.03] shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-white text-center">
            {mode === "signin" ? "Investor Sign In" : "Create Investor Account"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGoogle} disabled={loading} variant="outline" className="w-full border-white/20 text-white hover:bg-white/5 rounded-none">
            Continue with Google
          </Button>
          <div className="relative text-center text-xs text-white/50">
            <span className="bg-prime-blue-deepest px-2 relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 border-t border-white/10" />
          </div>
          <form onSubmit={handleEmail} className="space-y-3">
            {mode === "signup" && (
              <div>
                <Label htmlFor="fn">Full Name</Label>
                <Input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
            )}
            <div>
              <Label htmlFor="em">Email</Label>
              <Input id="em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-prime-gold hover:bg-prime-gold-bright text-prime-blue font-montserrat font-bold uppercase tracking-[0.1em] rounded-none">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <p className="text-center text-sm text-white/60">
            {mode === "signin" ? "No account?" : "Have an account?"}{" "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-prime-gold font-semibold">
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
          <p className="text-center text-xs text-white/50">
            <Link to={`/${locale}`}>← Back to website</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;