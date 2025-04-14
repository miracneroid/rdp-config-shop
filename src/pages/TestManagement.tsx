
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, Server, AlertCircle, Settings, Users, ShoppingCart, TicketCheck, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddAdminForm from "@/components/admin/AddAdminForm";

const TestManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="rdp" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">RDP Instances</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <TicketCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Admins</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BarChart className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
                  Quick Access
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your RDP service through these quick links
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/admin")}
                    className="w-full justify-start h-auto py-4"
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <Server className="mr-2 h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
                        <span className="font-medium">Manage RDP Instances</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 ml-7">
                        Configure and monitor all RDP instances
                      </span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("orders")}
                    className="w-full justify-start h-auto py-4"
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <ShoppingCart className="mr-2 h-5 w-5 text-emerald-500" />
                        <span className="font-medium">View Orders</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 ml-7">
                        Check and manage customer orders
                      </span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("tickets")}
                    className="w-full justify-start h-auto py-4"
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <TicketCheck className="mr-2 h-5 w-5 text-amber-500" />
                        <span className="font-medium">Support Tickets</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 ml-7">
                        Respond to customer support requests
                      </span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("admins")}
                    className="w-full justify-start h-auto py-4"
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-indigo-500" />
                        <span className="font-medium">Manage Admins</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 ml-7">
                        Add or remove administrator access
                      </span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rdp">
            <iframe 
              src="/admin" 
              className="w-full h-[calc(100vh-300px)] min-h-[500px] rounded-lg border border-gray-200 dark:border-gray-700"
              title="RDP Management"
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <ShoppingCart className="h-5 w-5 text-emerald-500" />
                  Order Management
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <iframe 
                  src="/admin#orders" 
                  className="w-full h-[calc(100vh-300px)] min-h-[500px]"
                  title="Order Management"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tickets">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TicketCheck className="h-5 w-5 text-amber-500" />
                  Support Tickets
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage customer support requests
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <iframe 
                  src="/admin#tickets" 
                  className="w-full h-[calc(100vh-300px)] min-h-[500px]"
                  title="Support Tickets"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admins">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5 text-indigo-500" />
                  Admin Management
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Add or manage administrator access
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <AddAdminForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default TestManagement;
