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
  Mail,
  Shield,
  KeyRound,
  ShieldCheck,
  ShieldX
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
import { 
  Checkbox,
} from "@/components/ui/checkbox";
import { generateTestUser } from "@/utils/testDataGenerator";
import { Navbar, Footer } from "@/components";

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

// Initial admin accounts
const initialAdmins = [
  { 
    id: 1, 
    username: "miracneroid", 
    password: "Jarus@2803", 
    type: "super", 
    status: "Active", 
    lastLogin: "2023-04-12",
    permissions: {
      manageAdmins: true,
      manageUsers: true,
      manageRdps: true,
      manageOrders: true,
      viewAnalytics: true,
      systemSettings: true,
    }
  },
  { 
    id: 2, 
    username: "admin", 
    password: "admin12345", 
    type: "regular", 
    status: "Active", 
    lastLogin: "2023-04-11",
    permissions: {
      manageAdmins: false,
      manageUsers: true,
      manageRdps: true,
      manageOrders: true,
      viewAnalytics: true,
      systemSettings: false,
    }
  },
];

// Generate a secure admin key
const generateAdminKey = () => {
  const keyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const keyLength = 20;
  let key = "";
  
  for (let i = 0; i < keyLength; i++) {
    key += keyChars.charAt(Math.floor(Math.random() * keyChars.length));
  }
  
  return key;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [adminName, setAdminName] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [rdps, setRdps] = useState(mockRdps);
  const [orders, setOrders] = useState(mockOrders);
  const [admins, setAdmins] = useState(initialAdmins);
  const [adminKey, setAdminKey] = useState("");
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRdpOpen, setIsAddRdpOpen] = useState(false);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isViewKeyOpen, setIsViewKeyOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Customer", status: "Active" });
  const [newRdp, setNewRdp] = useState({ name: "", cpu: "", ram: "", storage: "", price: "", status: "Available" });
  const [newAdmin, setNewAdmin] = useState({ 
    username: "", 
    password: "", 
    type: "regular", 
    status: "Active",
    adminKey: "",
    permissions: {
      manageAdmins: false,
      manageUsers: true,
      manageRdps: true,
      manageOrders: true,
      viewAnalytics: true,
      systemSettings: false,
    }
  });
  const [systemSettings, setSystemSettings] = useState({
    emailNotifications: true,
    automaticProvisioning: true,
    maintenanceMode: false,
    backupFrequency: "daily",
    defaultCurrency: "USD"
  });
  const [activeTab, setActiveTab] = useState("users");
  const [isTestUserLoading, setIsTestUserLoading] = useState(false);

  // Stats
  const stats = {
    users: users.length,
    orders: orders.length,
    revenue: `$${orders.reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0).toFixed(2)}`,
    rdps: rdps.length,
    admins: admins.length
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      // Check admin status
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      const storedAdminType = localStorage.getItem("adminType");
      const storedAdminName = localStorage.getItem("adminName");
      
      if (isAdmin) {
        setIsAuthenticated(true);
        setAdminType(storedAdminType || "");
        setAdminName(storedAdminName || "");
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
    localStorage.removeItem("adminType");
    localStorage.removeItem("adminName");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of the admin portal.",
    });
    navigate("/admin-login");
  };

  // Create test user function
  const createTestUser = async () => {
    setIsTestUserLoading(true);
    
    try {
      const testEmail = "test@gmail.com";
      const testPassword = "test@123";
      
      const result = await generateTestUser(testEmail, testPassword);
      
      if (!result.success) {
        throw new Error(result.error?.message || "Failed to create test user");
      }
      
      toast({
        title: "Test user created",
        description: "Test user created with email: test@gmail.com and password: test@123",
      });
    } catch (error: any) {
      toast({
        title: "Error creating test user",
        description: error.message || "An error occurred while creating the test user",
        variant: "destructive",
      });
      console.error("Test user error:", error);
    } finally {
      setIsTestUserLoading(false);
    }
  };

  // Handle admin key generation
  const handleGenerateKey = () => {
    const newKey = generateAdminKey();
    setAdminKey(newKey);
    setIsKeyGenerated(true);
    setIsViewKeyOpen(true);
    
    toast({
      title: "Admin key generated",
      description: "A new admin key has been generated successfully.",
    });
  };

  // Handle admin actions
  const handleAddAdmin = () => {
    if (!newAdmin.username || !newAdmin.password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Verify admin key if adding a new admin
    if (newAdmin.adminKey !== adminKey) {
      toast({
        title: "Invalid admin key",
        description: "The provided admin key is incorrect.",
        variant: "destructive",
      });
      return;
    }
    
    const newAdminId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
    const admin = {
      id: newAdminId,
      username: newAdmin.username,
      password: newAdmin.password,
      type: newAdmin.type,
      status: newAdmin.status,
      lastLogin: "Never",
      permissions: newAdmin.permissions
    };
    
    setAdmins([...admins, admin]);
    setNewAdmin({ 
      username: "", 
      password: "", 
      type: "regular", 
      status: "Active",
      adminKey: "",
      permissions: {
        manageAdmins: false,
        manageUsers: true,
        manageRdps: true,
        manageOrders: true,
        viewAnalytics: true,
        systemSettings: false,
      }
    });
    setIsAddAdminOpen(false);
    
    toast({
      title: "Admin added",
      description: `${admin.username} has been added successfully`,
    });
    
    // Reset the admin key after use for security
    setAdminKey("");
    setIsKeyGenerated(false);
  };

  const handleUpdateAdminPermissions = (id: number, permissionKey: string, value: boolean) => {
    setAdmins(admins.map(admin => {
      if (admin.id === id) {
        return {
          ...admin,
          permissions: {
            ...admin.permissions,
            [permissionKey]: value
          }
        };
      }
      return admin;
    }));
    
    toast({
      title: "Permissions updated",
      description: "Admin permissions have been updated successfully",
    });
  };

  const handleUpdateAdminStatus = (id: number, status: string) => {
    setAdmins(admins.map(admin => {
      if (admin.id === id) {
        return { ...admin, status };
      }
      return admin;
    }));
    
    toast({
      title: "Admin status updated",
      description: `Admin status changed to ${status}`,
    });
  };

  const handleDeleteAdmin = (id: number) => {
    // Prevent deleting your own account
    const currentAdmin = admins.find(admin => admin.username === adminName);
    if (currentAdmin && currentAdmin.id === id) {
      toast({
        title: "Action denied",
        description: "You cannot delete your own admin account",
        variant: "destructive",
      });
      return;
    }
    
    setAdmins(admins.filter(admin => admin.id !== id));
    toast({
      title: "Admin deleted",
      description: "Admin has been removed from the system",
    });
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
  const getQuickActions = () => {
    const actions = [];
    
    // All admins can view orders
    actions.push({ 
      name: "View Orders", 
      icon: PackageOpen, 
      action: () => document.getElementById('orders-tab')?.click() 
    });
    
    // Super admin or admin with RDP management permission can add new RDPs
    const currentAdmin = admins.find(admin => admin.username === adminName);
    if (adminType === "super" || (currentAdmin && currentAdmin.permissions.manageRdps)) {
      actions.push({ 
        name: "Add New RDP", 
        icon: PlusSquare, 
        action: () => setIsAddRdpOpen(true) 
      });
    }
    
    // Super admin or admin with system settings permission can access settings
    if (adminType === "super" || (currentAdmin && currentAdmin.permissions.systemSettings)) {
      actions.push({ 
        name: "System Settings", 
        icon: Settings, 
        action: () => setIsSettingsOpen(true)
      });
    }
    
    // Only super admin can generate admin key and manage admins
    if (adminType === "super") {
      actions.push({ 
        name: "Generate Admin Key", 
        icon: KeyRound, 
        action: handleGenerateKey
      });
    }
    
    return actions;
  };

  const quickActions = getQuickActions();

  // Check if admin has permission
  const hasPermission = (permissionKey: string): boolean => {
    if (adminType === "super") return true;
    
    const currentAdmin = admins.find(admin => admin.username === adminName);
    if (!currentAdmin) return false;
    
    return currentAdmin.permissions[permissionKey as keyof typeof currentAdmin.permissions];
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              {adminType === "super" ? "Super Admin" : "Admin"} Control Panel
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary"
              onClick={createTestUser}
              disabled={isTestUserLoading}
              className="flex items-center"
            >
              {isTestUserLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating test user...
                </span>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Create Test User
                </>
              )}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>

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
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-8">
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
        <Tabs defaultValue="orders" className="mt-6">
          <TabsList className={`grid w-full ${adminType === "super" ? "grid-cols-5" : "grid-cols-4"}`}>
            {hasPermission("manageUsers") && <TabsTrigger value="users">Users</TabsTrigger>}
            {hasPermission("manageRdps") && <TabsTrigger value="rdps">RDP Configurations</TabsTrigger>}
            {hasPermission("manageOrders") && <TabsTrigger value="orders" id="orders-tab">Orders</TabsTrigger>}
            {hasPermission("viewAnalytics") && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
            {adminType === "super" && <TabsTrigger value="admins">Admin Management</TabsTrigger>}
          </TabsList>

          {/* Users Tab */}
          {hasPermission("manageUsers") && (
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
          )}

          {/* RDPs Tab */}
          {hasPermission("manageRdps") && (
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
          )}

          {/* Orders Tab */}
          {hasPermission("manageOrders") && (
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
          )}

          {/* Analytics Tab */}
          {hasPermission("viewAnalytics") && (
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
          )}

          {/* Admin Management Tab - Only visible to super admins */}
          {adminType === "super" && (
            <TabsContent value="admins" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" /> Admin Management
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={handleGenerateKey} 
                        className="flex items-center gap-2"
                      >
                        <KeyRound className="h-4 w-4" />
                        Generate Admin Key
                      </Button>
                      <Button 
                        onClick={() => {
                          if (!isKeyGenerated) {
                            toast({
                              title: "No key generated",
                              description: "Please generate an admin key first",
                              variant: "destructive",
                            });
                            return;
                          }
                          setIsAddAdminOpen(true);
                        }} 
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Admin
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Manage administrator accounts and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell className="font-medium">{admin.id}</TableCell>
                          <TableCell>{admin.username}</TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              admin.type === 'super' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {admin.type === 'super' ? 'Super Admin' : 'Regular Admin'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              admin.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {admin.status}
                            </span>
                          </TableCell>
                          <TableCell>{admin.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(admin.permissions).map(([key, value]) => 
                                value && (
                                  <span key={key} className="inline-flex px-1.5 py-0.5 text-[10px] bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                )
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    disabled={admin.username === adminName} // Can't edit yourself
                                  >
                                    <PencilLine className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Admin Permissions</DialogTitle>
                                    <DialogDescription>
                                      Update permissions for {admin.username}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-4">
                                      {Object.entries(admin.permissions).map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-2">
                                          <input
                                            type="checkbox" 
                                            id={`perm-${admin.id}-${key}`}
                                            checked={value}
                                            onChange={(e) => handleUpdateAdminPermissions(admin.id, key, e.target.checked)}
                                            className="form-checkbox h-4 w-4 text-rdp-blue"
                                            disabled={admin.type === 'super' && key === 'manageAdmins'} // Super admins always have manageAdmins
                                          />
                                          <Label htmlFor={`perm-${admin.id}-${key}`}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor={`status-${admin.id}`} className="text-right">
                                        Status
                                      </Label>
                                      <Select 
                                        defaultValue={admin.status}
                                        onValueChange={(value) => handleUpdateAdminStatus(admin.id, value)}
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
                                    <Button onClick={() => toast({
                                      title: "Permissions updated",
                                      description: `Permissions for ${admin.username} have been updated`
                                    })}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="destructive" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => handleDeleteAdmin(admin.id)}
                                disabled={admin.username === adminName} // Can't delete yourself
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
          )}
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

      {/* Add Admin Dialog */}
      <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>
              Create a new administrator account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin-username" className="text-right">
                Username
              </Label>
              <Input
                id="admin-username"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin-password" className="text-right">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin-key" className="text-right">
                Admin Key
              </Label>
              <Input
                id="admin-key"
                value={newAdmin.adminKey}
                onChange={(e) => setNewAdmin({...newAdmin, adminKey: e.target.value})}
                className="col-span-3"
                placeholder="Enter the generated admin key"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin-type" className="text-right">
                Admin Type
              </Label>
              <Select 
                defaultValue={newAdmin.type}
                onValueChange={(value) => {
                  // If super, ensure manageAdmins is true
                  const updatedPermissions = {...newAdmin.permissions};
                  if (value === "super") {
                    updatedPermissions.manageAdmins = true;
                  }
                  
                  setNewAdmin({
                    ...newAdmin, 
                    type: value,
                    permissions: updatedPermissions
                  });
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular Admin</SelectItem>
                  <SelectItem value="super">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-4 mt-2">
              <Label className="font-medium mb-2 block">Permissions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(newAdmin.permissions).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox" 
                      id={`new-perm-${key}`}
                      checked={value}
                      onChange={(e) => setNewAdmin({
                        ...newAdmin,
                        permissions: {
                          ...newAdmin.permissions,
                          [key]: e.target.checked
                        }
                      })}
                      className="form-checkbox h-4 w-4 text-rdp-blue"
                      disabled={newAdmin.type === 'super' && key === 'manageAdmins'} // Super admins always have manageAdmins
                    />
                    <Label htmlFor={`new-perm-${key}`}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddAdmin}>Add Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Admin Key Dialog */}
      <Dialog open={isViewKeyOpen} onOpenChange={setIsViewKeyOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generated Admin Key</DialogTitle>
            <DialogDescription>
              Save this key securely. It will be required to create new admin accounts.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-center break-all">
            {adminKey}
          </div>
          <DialogFooter>
            <Button onClick={() => {
              // Copy to clipboard
              navigator.clipboard.writeText(adminKey);
              toast({
                title: "Copied to clipboard",
                description: "Admin key has been copied to your clipboard",
              });
            }}>
              Copy to Clipboard
            </Button>
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
