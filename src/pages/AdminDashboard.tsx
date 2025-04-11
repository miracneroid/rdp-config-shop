
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  PlusSquare, 
  PackageOpen, 
  Settings, 
  BarChart3, 
  ShieldAlert,
  LogOut,
  Server,
  HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Mock admin auth state - in a real app, this would come from an auth context
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Mock data
  const stats = {
    users: 243,
    orders: 56,
    revenue: "$12,450",
    rdps: 125
  };

  // Check mock authentication status
  useEffect(() => {
    // In a real app, this would verify an admin token
    const checkAuth = () => {
      // Mock check - in real app would verify JWT token or session
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      if (!isAdmin) {
        // For demo purposes, we'll just set it to true
        localStorage.setItem("isAdmin", "true");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of the admin portal.",
    });
    navigate("/admin-login");
  };

  // Quick actions for the admin
  const quickActions = [
    { name: "Add New RDP", icon: PlusSquare, action: () => toast({ title: "Feature coming soon", description: "This functionality is under development" }) },
    { name: "View Orders", icon: PackageOpen, action: () => toast({ title: "Orders", description: "Navigating to orders would happen here" }) },
    { name: "System Settings", icon: Settings, action: () => toast({ title: "Settings", description: "Accessing system settings" }) },
  ];

  if (!isAuthenticated) {
    navigate("/admin-login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-rdp-dark-deeper">
      {/* Admin Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-rdp-blue dark:text-rdp-blue-light" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleLogout}
            className="gap-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">RDPs Configured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rdps}</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.orders}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenue}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:bg-accent transition-colors" onClick={action.action}>
              <CardContent className="flex items-center p-6">
                <action.icon className="h-10 w-10 text-rdp-blue dark:text-rdp-blue-light mr-4" />
                <span className="font-medium">{action.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rdps">RDP Configurations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" /> User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts, permissions, and activity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  User management interface would be displayed here with options to view, edit, and delete user accounts.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Users</Button>
                <Button>Add New User</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="rdps" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" /> RDP Management
                </CardTitle>
                <CardDescription>
                  Configure and manage RDP instances and settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  RDP management interface would allow administrators to view, configure, and manage existing RDP instances.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All RDPs</Button>
                <Button>Create RDP Template</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" /> Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  View detailed performance analytics and reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Analytics dashboard would display charts, graphs, and metrics about system performance, user activity, and business KPIs.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Generate Reports</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
