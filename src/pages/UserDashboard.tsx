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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Server, 
  History, 
  HelpCircle, 
  User, 
  BarChart,
  Loader2,
  Ticket,
  Gift,
  Bell
} from "lucide-react";

const Coupons = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Your Coupons</h2>
    <p>You don't have any active coupons at the moment.</p>
  </div>
);

const GiftCards = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Your Gift Cards</h2>
    <p>You don't have any gift cards at the moment.</p>
  </div>
);

const Notifications = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Your Notifications</h2>
    <p>You don't have any notifications at the moment.</p>
  </div>
);

const UserDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get('tab');
  const defaultTab = tabFromUrl || "profile"; // Default to profile tab
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
        
        const { data: profileData } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', session.user.id)
          .maybeSingle();
        
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard?tab=${value}`, { replace: true });
  };

  useEffect(() => {
    if (tabFromUrl && ["profile", "rdp-management", "orders", "support", "coupons", "giftcards", "notifications"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else {
      setActiveTab("profile");
      navigate(`/dashboard?tab=profile`, { replace: true });
    }
  }, [location, tabFromUrl, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-white/95 to-white/90">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-rdp-blue dark:text-rdp-blue-light" />
            <p className="mt-4 text-lg text-foreground/80">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-white/95 to-white/90">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-rdp-blue/10">
            <User className="h-8 w-8 text-rdp-blue" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1e2537]">
              My Account
            </h1>
            <p className="text-gray-500">Welcome back, {userName}</p>
          </div>
        </div>
        
        <Card className="mb-8 bg-white border border-gray-200/50 shadow-xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-6 rounded-none bg-white/50 dark:bg-gray-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
                <TabsTrigger value="profile" className="flex items-center justify-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Profile</span>
                  <span className="inline md:hidden">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="rdp-management" className="flex items-center justify-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light">
                  <Server className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">RDP Management</span>
                  <span className="inline md:hidden">RDPs</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center justify-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light">
                  <History className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Orders</span>
                  <span className="inline md:hidden">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="support" className="flex items-center justify-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Support</span>
                  <span className="inline md:hidden">Support</span>
                </TabsTrigger>
                <TabsTrigger value="coupons" className="flex items-center justify-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light">
                  <Ticket className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Coupons</span>
                  <span className="inline md:hidden">Coupons</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center justify-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Notifications</span>
                  <span className="inline md:hidden">Alerts</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-inner p-6 mt-0">
                <TabsContent value="profile" className="space-y-4 mt-0">
                  <UserProfile />
                </TabsContent>
                
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
                
                <TabsContent value="coupons" className="space-y-4 mt-0">
                  <Coupons />
                </TabsContent>
                
                <TabsContent value="giftcards" className="space-y-4 mt-0">
                  <GiftCards />
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-4 mt-0">
                  <Notifications />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
