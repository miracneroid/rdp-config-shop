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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Loader2, 
  User, 
  Server, 
  ShoppingCart, 
  TicketCheck, 
  BarChart, 
  Users, 
  DollarSign 
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeRdps: number;
  openTickets: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats>({
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
        console.log("Fetching admin stats...");
        
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (userError) {
          console.error("User count error:", userError);
          throw userError;
        }
        
        console.log("Total users:", userCount);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const thirtyDaysAgoString = thirtyDaysAgo.toISOString();
        
        const { count: activeUserCount, error: activeUserError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('updated_at', thirtyDaysAgoString);
          
        if (activeUserError) {
          console.error("Active user count error:", activeUserError);
          throw activeUserError;
        }
        
        console.log("Active users:", activeUserCount);

        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('amount');
          
        if (ordersError) {
          console.error("Orders error:", ordersError);
          throw ordersError;
        }
        
        console.log("Orders:", orders?.length);

        const totalRevenue = orders?.reduce((sum, order) => {
          const amount = typeof order.amount === 'number' ? order.amount : parseFloat(order.amount as any);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0) || 0;
        
        console.log("Total revenue:", totalRevenue);

        const { count: rdpCount, error: rdpError } = await supabase
          .from('rdp_instances')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
          
        if (rdpError) {
          console.error("RDP count error:", rdpError);
          throw rdpError;
        }
        
        console.log("Active RDPs:", rdpCount);

        const { count: ticketCount, error: ticketError } = await supabase
          .from('support_tickets')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'open');
          
        if (ticketError) {
          console.error("Ticket count error:", ticketError);
          throw ticketError;
        }
        
        console.log("Open tickets:", ticketCount);

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
        setStats({
          totalUsers: 0,
          activeUsers: 0,
          totalOrders: 0,
          totalRevenue: 0,
          activeRdps: 0,
          openTickets: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-rdp-blue dark:text-rdp-blue-light" />
          <span className="ml-2 text-foreground">Loading admin dashboard...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-foreground">
                <Users className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light mr-2" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeUsers} active in last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-foreground">
                <Server className="h-5 w-5 text-indigo-500 mr-2" />
                Active RDPs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.activeRdps}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-foreground">
                <ShoppingCart className="h-5 w-5 text-emerald-500 mr-2" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-foreground">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹{stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-foreground">
                <TicketCheck className="h-5 w-5 text-amber-500 mr-2" />
                Open Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.openTickets}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="overview" 
              className="flex items-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light rounded-md transition-colors"
            >
              <BarChart className="h-4 w-4 mr-2" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="flex items-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light rounded-md transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rdp" 
              className="flex items-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light rounded-md transition-colors"
            >
              <Server className="h-4 w-4 mr-2" />
              <span>RDP Instances</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tickets" 
              className="flex items-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light rounded-md transition-colors"
            >
              <TicketCheck className="h-4 w-4 mr-2" />
              <span>Support Tickets</span>
            </TabsTrigger>
            <TabsTrigger 
              value="admins" 
              className="flex items-center data-[state=active]:bg-rdp-blue data-[state=active]:text-white dark:data-[state=active]:bg-rdp-blue-light rounded-md transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              <span>Admins</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent 
            value="overview" 
            className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">Dashboard Overview</h2>
            <AdminAnalytics />
          </TabsContent>
          
          <TabsContent 
            value="orders" 
            className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">Order Management</h2>
            <AdminOrderList />
          </TabsContent>
          
          <TabsContent 
            value="rdp" 
            className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">RDP Instance Management</h2>
            <AdminRdpList />
          </TabsContent>
          
          <TabsContent 
            value="tickets" 
            className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">Support Ticket Management</h2>
            <AdminTicketList />
          </TabsContent>
          
          <TabsContent 
            value="admins" 
            className="space-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-foreground">Admin Management</h2>
            <AddAdminForm />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
