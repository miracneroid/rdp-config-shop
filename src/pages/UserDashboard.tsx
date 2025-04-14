
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RdpManagement from "@/components/dashboard/RdpManagement";
import OrderHistory from "@/components/dashboard/OrderHistory";
import SupportTickets from "@/components/dashboard/SupportTickets";
import UserProfile from "@/components/dashboard/UserProfile";
import SystemUsage from "@/components/dashboard/SystemUsage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Server, 
  History, 
  HelpCircle, 
  User, 
  BarChart,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get('tab');
  const defaultTab = tabFromUrl || "rdp-management";
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please log in to access your dashboard",
            variant: "destructive",
          });
          navigate("/login", { state: { redirectTo: "/dashboard" } });
          return;
        }
        
        // Get user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', session.user.id)
          .maybeSingle();
        
        // Check if user has profile data from Google login
        let displayName = profileData?.display_name;
        
        if (!displayName) {
          const { provider_id, user_metadata } = session.user.app_metadata || {};
          if (provider_id === 'google' && user_metadata?.full_name) {
            displayName = user_metadata.full_name;
          } else {
            displayName = session.user.email?.split('@')[0] || "User";
          }
        }
        
        setUserName(displayName);
      } catch (error) {
        console.error("Error checking session:", error);
        toast({
          title: "Error",
          description: "There was a problem loading your dashboard",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate, toast]);

  // Handle tab changes - update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard?tab=${value}`);
  };

  // Update active tab when URL changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location, tabFromUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-rdp-blue dark:text-rdp-blue-light" />
            <p className="mt-4 text-lg">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <LayoutDashboard className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light" />
          <div>
            <h1 className="text-3xl font-bold text-rdp-dark dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {userName}</p>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-0">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 rounded-none bg-muted/50">
                <TabsTrigger value="rdp-management" className="flex items-center justify-center">
                  <Server className="h-4 w-4 mr-2" /><span className="hidden md:inline">RDP Management</span>
                  <span className="inline md:hidden">RDPs</span>
                </TabsTrigger>
                <TabsTrigger value="system-usage" className="flex items-center justify-center">
                  <BarChart className="h-4 w-4 mr-2" /><span className="hidden md:inline">System Usage</span>
                  <span className="inline md:hidden">Usage</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center justify-center">
                  <History className="h-4 w-4 mr-2" /><span className="hidden md:inline">Order History</span>
                  <span className="inline md:hidden">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="support" className="flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 mr-2" /><span className="hidden md:inline">Support Tickets</span>
                  <span className="inline md:hidden">Support</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center justify-center">
                  <User className="h-4 w-4 mr-2" /><span className="hidden md:inline">Profile</span>
                  <span className="inline md:hidden">Profile</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <TabsContent value="rdp-management" className="space-y-4 mt-0">
            <RdpManagement />
          </TabsContent>
          
          <TabsContent value="system-usage" className="space-y-4 mt-0">
            <SystemUsage />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4 mt-0">
            <OrderHistory />
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4 mt-0">
            <SupportTickets />
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-4 mt-0">
            <UserProfile />
          </TabsContent>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
