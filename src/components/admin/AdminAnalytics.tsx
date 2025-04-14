
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [rdpStats, setRdpStats] = useState<any[]>([]);
  const [userSignups, setUserSignups] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at");

      if (ordersError) throw ordersError;

      // Process order data for charts
      const processedOrderData = processOrderData(orders || []);
      setOrderData(processedOrderData);

      // Fetch RDP data
      const { data: rdps, error: rdpsError } = await supabase
        .from("rdp_instances")
        .select("*");

      if (rdpsError) throw rdpsError;

      // Process RDP data for charts
      const processedRdpData = processRdpData(rdps || []);
      setRdpStats(processedRdpData);

      // Fetch user signups
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("created_at")
        .order("created_at");

      if (profilesError) throw profilesError;

      // Process user signup data for charts
      const processedUserData = processUserData(profiles || []);
      setUserSignups(processedUserData);
    } catch (error: any) {
      console.error("Error fetching analytics data:", error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const processOrderData = (orders: any[]) => {
    // Group orders by month
    const monthlyOrders: Record<string, { revenue: number; orders: number }> = {};
    
    orders.forEach(order => {
      const date = new Date(order.created_at);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      if (!monthlyOrders[month]) {
        monthlyOrders[month] = { revenue: 0, orders: 0 };
      }
      
      monthlyOrders[month].revenue += Number(order.amount);
      monthlyOrders[month].orders += 1;
    });
    
    // Convert to array for charts
    return Object.entries(monthlyOrders).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      orders: data.orders
    }));
  };

  const processRdpData = (rdps: any[]) => {
    // Count RDPs by status
    const statusCounts: Record<string, number> = {};
    
    rdps.forEach(rdp => {
      const status = rdp.status || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    // Convert to array for charts
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
  };

  const processUserData = (profiles: any[]) => {
    // Group users by month
    const monthlySignups: Record<string, number> = {};
    
    profiles.forEach(profile => {
      const date = new Date(profile.created_at);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      monthlySignups[month] = (monthlySignups[month] || 0) + 1;
    });
    
    // Convert to array for charts
    return Object.entries(monthlySignups).map(([month, count]) => ({
      month,
      users: count
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="rdp">RDP Instances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>
                Revenue trends over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0088FE" 
                    activeDot={{ r: 8 }} 
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Count</CardTitle>
              <CardDescription>
                Number of orders per month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#00C49F" name="Order Count" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Signups</CardTitle>
              <CardDescription>
                New user registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userSignups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rdp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RDP Status Distribution</CardTitle>
              <CardDescription>
                Current status of all RDP instances
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rdpStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {rdpStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
