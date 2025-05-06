
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { 
  Users, 
  Server, 
  ShoppingCart, 
  DollarSign, 
  TicketCheck, 
  Activity,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOrderList from "@/components/admin/AdminOrderList";
import AdminRdpList from "@/components/admin/AdminRdpList";
import AdminTicketList from "@/components/admin/AdminTicketList";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

const AdminDashboard = () => {
  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Monitor and manage your RDP service operations"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Active Users" 
          value="546" 
          description="28 new today" 
          icon={Users} 
          change={12} 
          trend="up"
        />
        <StatCard 
          title="Active RDPs" 
          value="423" 
          description="98.6% uptime" 
          icon={Server} 
          change={3} 
          trend="up"
        />
        <StatCard 
          title="Weekly Orders" 
          value="89" 
          description="14 pending setup" 
          icon={ShoppingCart} 
          change={5} 
          trend="down"
        />
        <StatCard 
          title="Revenue (30d)" 
          value="₹120,450" 
          description="₹4,015/day avg" 
          icon={DollarSign} 
          change={8} 
          trend="up"
          iconColor="text-green-500"
        />
      </div>

      {/* Alerts */}
      <div className="mb-8">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-md">
                <div className="font-medium text-red-600 dark:text-red-400 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Server Node 3 (Singapore) High CPU Load
                </div>
                <div className="text-sm text-red-500 dark:text-red-300 mt-1">
                  CPU usage at 94% for more than 15 minutes. Consider redistributing workloads.
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 rounded-md">
                <div className="font-medium text-amber-600 dark:text-amber-400 flex items-center">
                  <TicketCheck className="h-4 w-4 mr-2" />
                  8 Support Tickets Require Attention
                </div>
                <div className="text-sm text-amber-500 dark:text-amber-300 mt-1">
                  3 high priority tickets have been waiting for more than 24 hours.
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-md">
                <div className="font-medium text-blue-600 dark:text-blue-400 flex items-center">
                  <Server className="h-4 w-4 mr-2" />
                  12 RDPs Expiring Within 24 Hours
                </div>
                <div className="text-sm text-blue-500 dark:text-blue-300 mt-1">
                  Auto-notification emails have been sent to customers.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="rdp">RDP Instances</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
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
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
