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
  ShieldX,
  Lightbulb
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// Initialize with empty arrays, will be populated from database
const initialUsers = [];
const initialRdps = [];
const initialOrders = [];
const initialAdmins = [];

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
  const [adminId, setAdminId] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [rdps, setRdps] = useState(initialRdps);
  const [orders, setOrders] = useState(initialOrders);
  const [admins, setAdmins] = useState(initialAdmins);
  const [adminKey, setAdminKey] = useState("");
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  // Stats with default values
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: "$0.00",
    rdps: 0,
    admins: 0
  });

  // Check authentication status and load data
  useEffect(() => {
    const checkAuth = async () => {
      // Check admin status
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      const storedAdminType = localStorage.getItem("adminType");
      const storedAdminName = localStorage.getItem("adminName");
      const storedAdminId = localStorage.getItem("adminId");
      
      if (isAdmin) {
        setIsAuthenticated(true);
        setAdminType(storedAdminType || "");
        setAdminName(storedAdminName || "");
        setAdminId(storedAdminId || "");
        
        // Load data from Supabase
        await loadData();
      } else {
        setIsAuthenticated(false);
        navigate("/admin-login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Load all data from Supabase
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load admin users
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*');
      
      if (adminError) throw adminError;
      
      // Transform admin data to match our existing format
      const transformedAdmins = adminData.map(admin => ({
        id: admin.id,
        username: admin.admin_id,
        password: admin.password, // In a real app, you wouldn't expose this
        type: admin.admin_type,
        status: 'Active',
        lastLogin: admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never',
        permissions: {
          manageAdmins: admin.admin_type === 'super',
          manageUsers: true,
          manageRdps: true,
          manageOrders: true,
          viewAnalytics: true,
          systemSettings: admin.admin_type === 'super',
        }
      }));
      
      setAdmins(transformedAdmins);
      
      // For demo purposes, we'll keep using the mock data for other entities
      // In a real application, you would fetch this data from Supabase as well
      setStats({
        users: initialUsers.length,
        orders: initialOrders.length,
        revenue: `$${initialOrders.reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0).toFixed(2)}`,
        rdps: initialRdps.length,
        admins: transformedAdmins.length
      });
      
      // Log this admin action
      if (adminId) {
        try {
          await supabase
            .from('admin_actions')
            .insert([
              { 
                admin_id: adminId, 
                action: 'Dashboard access', 
                admin_type: adminType,
                details: { timestamp: new Date().toISOString() }
              }
            ]);
        } catch (logError) {
          console.error("Error logging admin action:", logError);
        }
      }
      
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Log this admin action
      if (adminId) {
        await supabase
          .from('admin_actions')
          .insert([
            { 
              admin_id: adminId, 
              action: 'Admin logout', 
              admin_type: adminType,
              details: { timestamp: new Date().toISOString() }
            }
          ]);
      }
      
      setIsAuthenticated(false);
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminType");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminId");
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out of the admin portal.",
      });
      
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logging the action fails, proceed with the logout
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminType");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminId");
      navigate("/admin-login");
    }
  };

  // Removing the actual test user creation functionality
  const createTestUser = async () => {
    setIsTestUserLoading(true);
    
    try {
      toast({
        title: "Test functionality removed",
        description: "The test user creation functionality has been removed from the application.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
      console.error("Error:", error);
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
    
    // Log this admin action
    if (adminId) {
      try {
        supabase
          .from('admin_actions')
          .insert([
            { 
              admin_id: adminId, 
              action: 'Generated admin key', 
              admin_type: adminType,
              details: { timestamp: new Date().toISOString() }
            }
          ])
          .then(() => {
            toast({
              title: "Admin key generated",
              description: "A new admin key has been generated successfully.",
            });
          });
      } catch (error) {
        console.error("Error logging action:", error);
        // Still show the toast even if logging failed
        toast({
          title: "Admin key generated",
          description: "A new admin key has been generated successfully.",
        });
      }
    } else {
      toast({
        title: "Admin key generated",
        description: "A new admin key has been generated successfully.",
      });
    }
  };

  // Handle admin actions
  const handleAddAdmin = async () => {
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
    
    try {
      // Add new admin to Supabase
      const { data, error } = await supabase
        .from('admin_users')
        .insert([
          { 
            admin_id: newAdmin.username, 
            password: newAdmin.password, 
            admin_type: newAdmin.type
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      // Add to local state
      const newAdminWithPermissions = {
        id: data.id,
        username: data.admin_id,
        password: data.password,
        type: data.admin_type,
        status: 'Active',
        lastLogin: 'Never',
        permissions: newAdmin.permissions
      };
      
      setAdmins([...admins, newAdminWithPermissions]);
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
      
      // Log this admin action
      await supabase
        .from('admin_actions')
        .insert([
          { 
            admin_id: adminId, 
            action: 'Added new admin', 
            admin_type: adminType,
            details: { 
              new_admin_id: data.admin_id,
              new_admin_type: data.admin_type
            }
          }
        ]);
      
      toast({
        title: "Admin added",
        description: `${data.admin_id} has been added successfully`,
      });
      
      // Reset the admin key after use for security
      setAdminKey("");
      setIsKeyGenerated(false);
      
    } catch (error) {
      console.error("Error adding admin:", error);
      toast({
        title: "Error",
        description: "Failed to add new admin",
        variant: "destructive",
      });
    }
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
    // In a real app, you would also update these in Supabase
  };

  const handleUpdateAdminStatus = async (id: string, status: string) => {
    try {
      // In a real app, you would have a status column in the admin_users table
      // For now we'll just update our local state
      
      setAdmins(admins.map(admin => {
        if (admin.id === id) {
          return { ...admin, status };
        }
        return admin;
      }));
      
      // Log this admin action
      await supabase
        .from('admin_actions')
        .insert([
          { 
            admin_id: adminId, 
            action: 'Updated admin status', 
            admin_type: adminType,
            details: { 
              target_admin_id: id,
              new_status: status
            }
          }
        ]);
      
      toast({
        title: "Admin status updated",
        description: `Admin status changed to ${status}`,
      });
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAdmin = async (id: string) => {
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
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setAdmins(admins.filter(admin => admin.id !== id));
      
      // Log this admin action
      await supabase
        .from('admin_actions')
        .insert([
          { 
            admin_id: adminId, 
            action: 'Deleted admin', 
            admin_type: adminType,
            details: { deleted_admin_id: id }
          }
        ]);
      
      toast({
        title: "Admin deleted",
        description: "Admin has been removed from the system",
      });
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive",
      });
    }
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
    // In a production app, you would add the user to Supabase here
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: "User has been removed from the system",
    });
    // In a production app, you would delete the user from Supabase here
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
    // In a production app, you would add the RDP to Supabase here
  };

  const handleDeleteRdp = (id: number) => {
    setRdps(rdps.filter(rdp => rdp.id !== id));
    toast({
      title: "RDP deleted",
      description: "RDP configuration has been removed from the system",
    });
    // In a production app, you would delete the RDP from Supabase here
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
    // In a production app, you would update the order in Supabase here
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
    // In a production app, you would store these settings in Supabase
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

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 mx-auto mb-4 text-rdp-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-xl font-semibold">Loading Admin Dashboard...</h2>
            <p className="text-muted-foreground">Fetching the latest data from the database</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Admin heading */}
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
                                variant="outline"
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
                <CardFooter className="border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Total {users.length} users in the system.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          )}

          {/* RDP Configurations Tab */}
          {hasPermission("manageRdps") && (
            <TabsContent value="rdps" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Server className="mr-2 h-5 w-5" /> RDP Configurations
                    </div>
                    <Button onClick={() => setIsAddRdpOpen(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add RDP
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Manage RDP configurations, resources, and availability.
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
                              rdp.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
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
                                variant="outline"
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
                <CardFooter className="border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Total {rdps.length} RDP configurations in the system.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          )}

          {/* Orders Tab */}
          {hasPermission("manageOrders") && (
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PackageOpen className="mr-2 h-5 w-5" /> Order Management
                  </CardTitle>
                  <CardDescription>
                    Manage customer orders, payments, and RDP provisioning.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>RDP</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
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
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Select
                                onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                                defaultValue={order.status}
                              >
                                <SelectTrigger className="h-8 w-28">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Processing">Processing</SelectItem>
                                  <SelectItem value="Completed">Completed</SelectItem>
                                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleGenerateInvoice(order)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              {order.rdpCredentials && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => sendRdpCredentials(order.email, order.rdpCredentials.username, order.rdpCredentials.password, order)}
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
                <CardFooter className="border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Total {orders.length} orders in the system.
                  </p>
                </CardFooter>
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
                    View system analytics, user statistics, and revenue reports.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
                      <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Analytics charts will be available in the next update</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">User Growth</h3>
                      <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Analytics charts will be available in the next update</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Admin Management Tab */}
          {adminType === "super" && (
            <TabsContent value="admins" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShieldAlert className="mr-2 h-5 w-5" /> Admin Management
                    </div>
                    <Button onClick={() => setIsAddAdminOpen(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Admin
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Manage admin accounts, permissions, and access levels.
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
                              admin.type === 'super' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
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
                            <div className="flex space-x-1">
                              {admin.permissions.manageAdmins && <ShieldCheck className="h-4 w-4 text-purple-500" aria-label="Can manage admins" />}
                              {admin.permissions.systemSettings && <Settings className="h-4 w-4 text-blue-500" aria-label="Can change system settings" />}
                              {admin.permissions.manageUsers && <User className="h-4 w-4 text-green-500" aria-label="Can manage users" />}
                              {admin.permissions.manageRdps && <Server className="h-4 w-4 text-orange-500" aria-label="Can manage RDPs" />}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Select
                                onValueChange={(value) => handleUpdateAdminStatus(admin.id, value)}
                                defaultValue={admin.status}
                              >
                                <SelectTrigger className="h-8 w-28">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                  <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  // Show permissions dialog
                                  toast({
                                    title: "Edit Permissions",
                                    description: "Permission editing will be available in the next update"
                                  });
                                }}
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeleteAdmin(admin.id)}
                                disabled={admin.username === adminName}
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
                <CardFooter className="border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Total {admins.length} admins in the system.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Add User Dialog */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent>
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
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Reseller">Reseller</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newUser.status}
                  onValueChange={(value) => setNewUser({ ...newUser, status: value })}
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
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add RDP Dialog */}
        <Dialog open={isAddRdpOpen} onOpenChange={setIsAddRdpOpen}>
          <DialogContent>
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
                  onChange={(e) => setNewRdp({ ...newRdp, name: e.target.value })}
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
                  onChange={(e) => setNewRdp({ ...newRdp, cpu: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 4 vCPU"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rdp-ram" className="text-right">
                  RAM
                </Label>
                <Input
                  id="rdp-ram"
                  value={newRdp.ram}
                  onChange={(e) => setNewRdp({ ...newRdp, ram: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 8 GB"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rdp-storage" className="text-right">
                  Storage
                </Label>
                <Input
                  id="rdp-storage"
                  value={newRdp.storage}
                  onChange={(e) => setNewRdp({ ...newRdp, storage: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 256 GB SSD"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rdp-price" className="text-right">
                  Price
                </Label>
                <Input
                  id="rdp-price"
                  value={newRdp.price}
                  onChange={(e) => setNewRdp({ ...newRdp, price: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. $29.99"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rdp-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newRdp.status}
                  onValueChange={(value) => setNewRdp({ ...newRdp, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRdpOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRdp}>Add RDP</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Admin Dialog */}
        <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>
                Create a new admin account with specific permissions.
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
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
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
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="admin-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newAdmin.type}
                  onValueChange={(value) => setNewAdmin({ ...newAdmin, type: value })}
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="admin-key" className="text-right">
                  Admin Key
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="admin-key"
                    type="password"
                    value={newAdmin.adminKey}
                    onChange={(e) => setNewAdmin({ ...newAdmin, adminKey: e.target.value })}
                    placeholder="Enter the admin key"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleGenerateKey}
                    title="Generate a new admin key"
                  >
                    <KeyRound className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Permissions
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="manage-users"
                      checked={newAdmin.permissions.manageUsers}
                      onCheckedChange={(checked) => 
                        setNewAdmin({
                          ...newAdmin,
                          permissions: {
                            ...newAdmin.permissions,
                            manageUsers: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor="manage-users">Manage Users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="manage-rdps"
                      checked={newAdmin.permissions.manageRdps}
                      onCheckedChange={(checked) => 
                        setNewAdmin({
                          ...newAdmin,
                          permissions: {
                            ...newAdmin.permissions,
                            manageRdps: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor="manage-rdps">Manage RDPs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="manage-orders"
                      checked={newAdmin.permissions.manageOrders}
                      onCheckedChange={(checked) => 
                        setNewAdmin({
                          ...newAdmin,
                          permissions: {
                            ...newAdmin.permissions,
                            manageOrders: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor="manage-orders">Manage Orders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="view-analytics"
                      checked={newAdmin.permissions.viewAnalytics}
                      onCheckedChange={(checked) => 
                        setNewAdmin({
                          ...newAdmin,
                          permissions: {
                            ...newAdmin.permissions,
                            viewAnalytics: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor="view-analytics">View Analytics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="system-settings"
                      checked={newAdmin.permissions.systemSettings}
                      onCheckedChange={(checked) => 
                        setNewAdmin({
                          ...newAdmin,
                          permissions: {
                            ...newAdmin.permissions,
                            systemSettings: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor="system-settings">System Settings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="manage-admins"
                      checked={newAdmin.permissions.manageAdmins}
                      onCheckedChange={(checked) => 
                        setNewAdmin({
                          ...newAdmin,
                          permissions: {
                            ...newAdmin.permissions,
                            manageAdmins: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor="manage-admins">Manage Admins</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAdmin}>Add Admin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Admin Key Dialog */}
        <Dialog open={isViewKeyOpen} onOpenChange={setIsViewKeyOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Key Generated</DialogTitle>
              <DialogDescription>
                This key is required to add new admin users. Copy it now - it will not be shown again.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 bg-muted rounded-md font-mono text-center break-all">
              {adminKey}
            </div>
            <DialogFooter>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(adminKey);
                  toast({
                    title: "Copied to clipboard",
                    description: "The admin key has been copied to your clipboard",
                  });
                }}
              >
                Copy to Clipboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsViewKeyOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* System Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>System Settings</DialogTitle>
              <DialogDescription>
                Configure global system settings and preferences.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Checkbox 
                  id="email-notifications"
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      emailNotifications: checked === true
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-provisioning">Automatic RDP Provisioning</Label>
                <Checkbox 
                  id="auto-provisioning"
                  checked={systemSettings.automaticProvisioning}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      automaticProvisioning: checked === true
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <Checkbox 
                  id="maintenance-mode"
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => 
                    setSystemSettings({
                      ...systemSettings,
                      maintenanceMode: checked === true
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="backup-frequency" className="col-span-1">
                  Backup Frequency
                </Label>
                <Select
                  value={systemSettings.backupFrequency}
                  onValueChange={(value) => 
                    setSystemSettings({
                      ...systemSettings,
                      backupFrequency: value
                    })
                  }
                >
                  <SelectTrigger className="col-span-2">
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
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="default-currency" className="col-span-1">
                  Default Currency
                </Label>
                <Select
                  value={systemSettings.defaultCurrency}
                  onValueChange={(value) => 
                    setSystemSettings({
                      ...systemSettings,
                      defaultCurrency: value
                    })
                  }
                >
                  <SelectTrigger className="col-span-2">
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
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSettings}>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
