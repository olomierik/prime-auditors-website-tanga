import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center space-y-6">
          <div className="text-7xl font-montserrat font-bold text-prime-blue">404</div>
          <h1 className="text-2xl font-montserrat font-bold text-prime-blue">Page Not Found</h1>
          <p className="text-gray-600 font-open-sans max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-prime-blue hover:bg-prime-blue/90 text-white font-montserrat">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
