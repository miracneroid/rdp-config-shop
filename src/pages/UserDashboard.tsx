
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("rdp-management");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to access your dashboard",
        variant: "destructive",
      });
      navigate("/login");
    }
  };

  // Check session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-rdp-dark dark:text-white">Your Dashboard</h1>
        
        <Tabs defaultValue="rdp-management" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="rdp-management">RDP Management</TabsTrigger>
            <TabsTrigger value="system-usage">System Usage</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="support">Support Tickets</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rdp-management" className="space-y-4">
            <RdpManagement />
          </TabsContent>
          
          <TabsContent value="system-usage" className="space-y-4">
            <SystemUsage />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <OrderHistory />
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <SupportTickets />
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-4">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
