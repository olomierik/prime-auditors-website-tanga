import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import InvestorDashboard from "./InvestorDashboard";
import AdminDashboard from "./AdminDashboard";
import { Loader2 } from "lucide-react";

const Portal = () => {
  const { locale = "en" } = useParams();
  const { user, role, loading } = useAuth();

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-prime-blue" /></div>;
  if (!user) return <Navigate to={`/${locale}/auth`} replace />;
  return role === "admin" ? <AdminDashboard /> : <InvestorDashboard />;
};

export default Portal;