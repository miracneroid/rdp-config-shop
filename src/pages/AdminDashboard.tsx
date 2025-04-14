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
        })
        .catch(error => {
          console.error("Error logging action:", error);
          // Still show the toast even if logging failed
          toast({
            title: "Admin key generated",
            description: "A new admin key has been generated successfully.",
          });
        });
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
                                <PencilLine
