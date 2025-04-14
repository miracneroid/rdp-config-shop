
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddAdminForm from "@/components/admin/AddAdminForm";
import AdminOrderList from "@/components/admin/AdminOrderList";
import AdminTicketList from "@/components/admin/AdminTicketList";
import AdminRdpList from "@/components/admin/AdminRdpList";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { 
  Loader2, 
  User, 
  Server, 
  ShoppingCart, 
  TicketCheck, 
  BarChart, 
  Users, 
  DollarSign,
  UserPlus,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeRdps: 0,
    openTickets: 0
  });

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      const isAdmin = email === 'admin@example.com' || email === 'test@gmail.com';
      
      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    checkAdmin();
    fetchStats();
  }, [navigate, toast]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Get total users
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
        
      if (userError) throw userError;

      // Get active users (users who have logged in within the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const thirtyDaysAgoString = thirtyDaysAgo.toISOString();
      
      // Using a filter for active users
      const { count: activeUserCount, error: activeUserError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('updated_at', thirtyDaysAgoString);
        
      if (activeUserError) throw activeUserError;

      // Get order stats
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('amount');
        
      if (ordersError) throw ordersError;

      // Calculate total revenue
      const totalRevenue = orders?.reduce((sum, order) => sum + (typeof order.amount === 'number' ? order.amount : 0), 0) || 0;

      // Get active RDPs
      const { count: rdpCount, error: rdpError } = await supabase
        .from('rdp_instances')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
        
      if (rdpError) throw rdpError;

      // Get open tickets
      const { count: ticketCount, error: ticketError } = await supabase
        .from('support_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');
        
      if (ticketError) throw ticketError;

      setStats({
        totalUsers: userCount || 0,
        activeUsers: activeUserCount || 0,
        totalOrders: orders?.length || 0,
        totalRevenue,
        activeRdps: rdpCount || 0,
        openTickets: ticketCount || 0
      });
    } catch (error: any) {
      console.error("Error fetching admin stats:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/test-management")}
          >
            <UserPlus size={18} />
            Test User Management
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/settings")}
          >
            <Settings size={18} />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-blue-700 dark:text-blue-300">
              <Users className="h-5 w-5 mr-2" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalUsers}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              {stats.activeUsers} active in last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-indigo-700 dark:text-indigo-300">
              <Server className="h-5 w-5 mr-2" />
              Active RDPs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">{stats.activeRdps}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">₹{stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-emerald-700 dark:text-emerald-300">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-amber-700 dark:text-amber-300">
              <TicketCheck className="h-5 w-5 mr-2" />
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.openTickets}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 gap-2 p-1 rounded-lg bg-muted">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="rdp" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Server className="h-4 w-4" />
            <span>RDP Instances</span>
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <TicketCheck className="h-4 w-4" />
            <span>Support Tickets</span>
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="h-4 w-4" />
            <span>Admins</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <AdminAnalytics />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Management</h2>
          <AdminOrderList />
        </TabsContent>
        
        <TabsContent value="rdp" className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">RDP Instance Management</h2>
          <AdminRdpList />
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Support Ticket Management</h2>
          <AdminTicketList />
        </TabsContent>
        
        <TabsContent value="admins" className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Admin Management</h2>
          <AddAdminForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
