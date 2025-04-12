
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
  HardDrive,
  User,
  Package,
  ArrowUpDown,
  Plus,
  PencilLine,
  Trash,
  Download,
  Mail
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateInvoice } from "@/utils/invoiceGenerator";

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active", lastLogin: "2023-04-10" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", status: "Active", lastLogin: "2023-04-09" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive", lastLogin: "2023-03-28" },
];

const mockRdps = [
  { id: 101, name: "Basic RDP", cpu: "2 Core", ram: "4 GB", storage: "100 GB", price: "$25/month", status: "Available" },
  { id: 102, name: "Standard RDP", cpu: "4 Core", ram: "8 GB", storage: "250 GB", price: "$45/month", status: "Available" },
  { id: 103, name: "Premium RDP", cpu: "8 Core", ram: "16 GB", storage: "500 GB", price: "$85/month", status: "Available" },
];

const mockOrders = [
  { id: 1001, user: "John Doe", email: "john@example.com", rdp: "Basic RDP", date: "2023-04-08", status: "Completed", amount: "$25.00", rdpCredentials: { username: "john_rdp", password: "S3cur3P@ss!" } },
  { id: 1002, user: "Jane Smith", email: "jane@example.com", rdp: "Premium RDP", date: "2023-04-07", status: "Processing", amount: "$85.00", rdpCredentials: null },
  { id: 1003, user: "Bob Johnson", email: "bob@example.com", rdp: "Standard RDP", date: "2023-04-05", status: "Cancelled", amount: "$45.00", rdpCredentials: null },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [rdps, setRdps] = useState(mockRdps);
  const [orders, setOrders] = useState(mockOrders);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRdpOpen, setIsAddRdpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Customer", status: "Active" });
  const [newRdp, setNewRdp] = useState({ name: "", cpu: "", ram: "", storage: "", price: "", status: "Available" });
  const [systemSettings, setSystemSettings] = useState({
    emailNotifications: true,
    automaticProvisioning: true,
    maintenanceMode: false,
    backupFrequency: "daily",
    defaultCurrency: "USD"
  });

  // Stats
  const stats = {
    users: users.length,
    orders: orders.length,
    revenue: `$${orders.reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0).toFixed(2)}`,
    rdps: rdps.length
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would check a secure JWT or session cookie
      // For demo, we're just using localstorage
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      if (isAdmin) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/admin-login");
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

  // Handle user actions
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const user = {
      ...newUser,
      id: newUserId,
      lastLogin: "Never"
    };
    
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "Customer", status: "Active" });
    setIsAddUserOpen(false);
    
    toast({
      title: "User added",
      description: `${user.name} has been added successfully`,
    });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: "User has been removed from the system",
    });
  };

  // Handle RDP actions
  const handleAddRdp = () => {
    if (!newRdp.name || !newRdp.cpu || !newRdp.ram || !newRdp.storage || !newRdp.price) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newRdpId = rdps.length > 0 ? Math.max(...rdps.map(r => r.id)) + 1 : 101;
    const rdp = {
      ...newRdp,
      id: newRdpId
    };
    
    setRdps([...rdps, rdp]);
    setNewRdp({ name: "", cpu: "", ram: "", storage: "", price: "", status: "Available" });
    setIsAddRdpOpen(false);
    
    toast({
      title: "RDP added",
      description: `${rdp.name} has been added successfully`,
    });
  };

  const handleDeleteRdp = (id: number) => {
    setRdps(rdps.filter(rdp => rdp.id !== id));
    toast({
      title: "RDP deleted",
      description: "RDP configuration has been removed from the system",
    });
  };

  // Handle order actions
  const handleUpdateOrderStatus = (id: number, status: string) => {
    setOrders(orders.map(order => {
      if (order.id === id) {
        // If changing to completed, generate RDP credentials
        if (status === "Completed" && order.rdpCredentials === null) {
          const username = order.user.toLowerCase().replace(' ', '_') + "_rdp";
          const password = Math.random().toString(36).slice(-8) + "!A9";
          
          // In a real app, this would actually provision an RDP and then email credentials
          // For demo, we're just generating mock credentials
          setTimeout(() => {
            if (systemSettings.emailNotifications) {
              sendRdpCredentials(order.email, username, password, order);
            }
          }, 500);
          
          return { 
            ...order, 
            status, 
            rdpCredentials: { 
              username, 
              password 
            } 
          };
        }
        return { ...order, status };
      }
      return order;
    }));
    
    toast({
      title: "Order updated",
      description: `Order #${id} status changed to ${status}`,
    });
  };

  const handleGenerateInvoice = (order: any) => {
    const invoiceData = {
      orderNumber: order.id,
      customer: {
        name: order.user,
        email: order.email
      },
      items: [{
        description: order.rdp,
        price: order.amount
      }],
      total: order.amount,
      date: order.date
    };
    
    // Generate an invoice and download it
    const pdfBlob = generateInvoice(invoiceData);
    
    // In a real app, this would also email the invoice
    if (systemSettings.emailNotifications) {
      // Mock sending email
      toast({
        title: "Invoice generated",
        description: `Invoice for order #${order.id} has been generated and emailed to ${order.email}`,
      });
    }
  };

  const sendRdpCredentials = (email: string, username: string, password: string, order: any) => {
    // In a real app, this would send an actual email
    // For demo purposes, we just show a toast notification
    toast({
      title: "RDP Credentials Sent",
      description: `Credentials for order #${order.id} have been sent to ${email}`,
    });
  };

  // Handle settings update
  const handleUpdateSettings = () => {
    toast({
      title: "Settings updated",
      description: "System settings have been updated successfully",
    });
    setIsSettingsOpen(false);
  };

  // Quick actions
  const quickActions = [
    { 
      name: "Add New RDP", 
      icon: PlusSquare, 
      action: () => setIsAddRdpOpen(true) 
    },
    { 
      name: "View Orders", 
      icon: PackageOpen, 
      action: () => document.getElementById('orders-tab')?.click() 
    },
    { 
      name: "System Settings", 
      icon: Settings, 
      action: () => setIsSettingsOpen(true)
    },
  ];

  if (!isAuthenticated) {
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rdps">RDP Configurations</TabsTrigger>
            <TabsTrigger value="orders" id="orders-tab">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5" /> User Management
                  </div>
                  <Button onClick={() => setIsAddUserOpen(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add User
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage user accounts, permissions, and activity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => toast({
                                title: "Edit User",
                                description: "Edit functionality will be available in the next update"
                              })}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RDPs Tab */}
          <TabsContent value="rdps" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Server className="mr-2 h-5 w-5" /> RDP Management
                  </div>
                  <Button onClick={() => setIsAddRdpOpen(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add RDP
                  </Button>
                </CardTitle>
                <CardDescription>
                  Configure and manage RDP instances and settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>CPU</TableHead>
                      <TableHead>RAM</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rdps.map((rdp) => (
                      <TableRow key={rdp.id}>
                        <TableCell className="font-medium">{rdp.id}</TableCell>
                        <TableCell>{rdp.name}</TableCell>
                        <TableCell>{rdp.cpu}</TableCell>
                        <TableCell>{rdp.ram}</TableCell>
                        <TableCell>{rdp.storage}</TableCell>
                        <TableCell>{rdp.price}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            rdp.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {rdp.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => toast({
                                title: "Edit RDP",
                                description: "Edit functionality will be available in the next update"
                              })}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => handleDeleteRdp(rdp.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" /> Order Management
                </CardTitle>
                <CardDescription>
                  View and manage customer orders and subscriptions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>RDP Package</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.user}</TableCell>
                        <TableCell>{order.rdp}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Select 
                              defaultValue={order.status}
                              onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Completed">Complete</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Cancelled">Cancel</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleGenerateInvoice(order)}
                              title="Generate Invoice"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            
                            {order.rdpCredentials && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => sendRdpCredentials(order.email, order.rdpCredentials.username, order.rdpCredentials.password, order)}
                                title="Resend Credentials"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
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
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Sales Performance</h3>
                    <div className="h-[200px] w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Sales chart visualization would appear here</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">User Growth</h3>
                    <div className="h-[200px] w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">User growth chart would appear here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => toast({
                  title: "Generate Reports",
                  description: "Report generation will be available in the next update"
                })}>
                  Generate Reports
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select 
                defaultValue={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                defaultValue={newUser.status}
                onValueChange={(value) => setNewUser({...newUser, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add RDP Dialog */}
      <Dialog open={isAddRdpOpen} onOpenChange={setIsAddRdpOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New RDP Configuration</DialogTitle>
            <DialogDescription>
              Create a new RDP configuration in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rdp-name" className="text-right">
                Name
              </Label>
              <Input
                id="rdp-name"
                value={newRdp.name}
                onChange={(e) => setNewRdp({...newRdp, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rdp-cpu" className="text-right">
                CPU
              </Label>
              <Input
                id="rdp-cpu"
                value={newRdp.cpu}
                onChange={(e) => setNewRdp({...newRdp, cpu: e.target.value})}
                className="col-span-3"
                placeholder="e.g. 2 Core"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rdp-ram" className="text-right">
                RAM
              </Label>
              <Input
                id="rdp-ram"
                value={newRdp.ram}
                onChange={(e) => setNewRdp({...newRdp, ram: e.target.value})}
                className="col-span-3"
                placeholder="e.g. 4 GB"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rdp-storage" className="text-right">
                Storage
              </Label>
              <Input
                id="rdp-storage"
                value={newRdp.storage}
                onChange={(e) => setNewRdp({...newRdp, storage: e.target.value})}
                className="col-span-3"
                placeholder="e.g. 100 GB"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rdp-price" className="text-right">
                Price
              </Label>
              <Input
                id="rdp-price"
                value={newRdp.price}
                onChange={(e) => setNewRdp({...newRdp, price: e.target.value})}
                className="col-span-3"
                placeholder="e.g. $25/month"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rdp-status" className="text-right">
                Status
              </Label>
              <Select 
                defaultValue={newRdp.status}
                onValueChange={(value) => setNewRdp({...newRdp, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddRdp}>Add RDP</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* System Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>System Settings</DialogTitle>
            <DialogDescription>
              Configure global system settings and preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex-1">
                Email Notifications
                <p className="text-sm text-muted-foreground">Send email notifications to users and administrators</p>
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={systemSettings.emailNotifications}
                  onChange={(e) => setSystemSettings({...systemSettings, emailNotifications: e.target.checked})}
                  className="form-checkbox h-5 w-5 text-rdp-blue"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-provisioning" className="flex-1">
                Automatic RDP Provisioning
                <p className="text-sm text-muted-foreground">Automatically provision RDPs when orders are completed</p>
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="auto-provisioning"
                  checked={systemSettings.automaticProvisioning}
                  onChange={(e) => setSystemSettings({...systemSettings, automaticProvisioning: e.target.checked})}
                  className="form-checkbox h-5 w-5 text-rdp-blue"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode" className="flex-1">
                Maintenance Mode
                <p className="text-sm text-muted-foreground">Put the site in maintenance mode (users will see a maintenance message)</p>
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="maintenance-mode"
                  checked={systemSettings.maintenanceMode}
                  onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                  className="form-checkbox h-5 w-5 text-rdp-blue"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="backup-frequency" className="text-right">
                Backup Frequency
              </Label>
              <Select 
                defaultValue={systemSettings.backupFrequency}
                onValueChange={(value) => setSystemSettings({...systemSettings, backupFrequency: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="default-currency" className="text-right">
                Default Currency
              </Label>
              <Select 
                defaultValue={systemSettings.defaultCurrency}
                onValueChange={(value) => setSystemSettings({...systemSettings, defaultCurrency: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
