
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, Server, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AddAdminForm from "@/components/admin/AddAdminForm";

const TestManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        
        const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', { role_param: 'admin' });
        
        if (roleError) {
          console.error("Error checking admin role:", roleError);
          throw roleError;
        }
        
        if (!isAdmin) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
      } catch (error: any) {
        console.error("Admin check error:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to verify admin permissions",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    checkAdmin();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Admin Dashboard
        </h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Server className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
                  Admin Controls
                </CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Manage your admin settings and controls
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/admin")}
                  className="w-full justify-start"
                >
                  <Server className="mr-2 h-4 w-4" />
                  Manage RDP Instances
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <AddAdminForm />
      </div>
      <Footer />
    </div>
  );
};

export default TestManagement;
