
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddAdminForm from "@/components/admin/AddAdminForm";
import AdminOrderList from "@/components/admin/AdminOrderList";
import AdminTicketList from "@/components/admin/AdminTicketList";
import AdminRdpList from "@/components/admin/AdminRdpList";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { Loader2, User, Server, ShoppingCart, TicketCheck, BarChart } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeRdps: 0,
    openTickets: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Get total users
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get active users (users who have logged in within the last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const thirtyDaysAgoString = thirtyDaysAgo.toISOString();
        
        // Using a filter for active users
        const { count: activeUserCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('updated_at', thirtyDaysAgoString);

        // Get order stats
        const { data: orders } = await supabase
          .from('orders')
          .select('amount');

        // Calculate total revenue
        const totalRevenue = orders?.reduce((sum, order) => sum + (typeof order.amount === 'number' ? order.amount : 0), 0) || 0;

        // Get active RDPs
        const { count: rdpCount } = await supabase
          .from('rdp_instances')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        // Get open tickets
        const { count: ticketCount } = await supabase
          .from('support_tickets')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'open');

        setStats({
          totalUsers: userCount || 0,
          activeUsers: activeUserCount || 0,
          totalOrders: orders?.length || 0,
          totalRevenue,
          activeRdps: rdpCount || 0,
          openTickets: ticketCount || 0
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading admin dashboard...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <User className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.activeUsers} active in last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active RDPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Server className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{stats.activeRdps}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue: ${stats.totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TicketCheck className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{stats.openTickets}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="rdp" className="flex items-center">
            <Server className="h-4 w-4 mr-2" />
            <span>RDP Instances</span>
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center">
            <TicketCheck className="h-4 w-4 mr-2" />
            <span>Support Tickets</span>
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Admins</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <AdminAnalytics />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <AdminOrderList />
        </TabsContent>
        
        <TabsContent value="rdp" className="space-y-4">
          <AdminRdpList />
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4">
          <AdminTicketList />
        </TabsContent>
        
        <TabsContent value="admins" className="space-y-4">
          <AddAdminForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
