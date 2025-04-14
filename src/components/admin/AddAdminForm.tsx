
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AddAdminForm = () => {
  const [email, setEmail] = useState("");
  const [adminType, setAdminType] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const { toast } = useToast();

  // Load existing admins on component mount
  useState(() => {
    loadAdmins();
  });

  const loadAdmins = async () => {
    try {
      setLoadingAdmins(true);
      
      // Find all users with admin role
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          profiles(
            display_name,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('role', 'admin');
      
      if (error) throw error;
      
      // Format the admin data
      const formattedAdmins = (data || []).map(admin => ({
        id: admin.user_id,
        role: admin.role,
        name: admin.profiles?.display_name || 
              `${admin.profiles?.first_name || ''} ${admin.profiles?.last_name || ''}`.trim() || 
              'Unknown Admin',
        avatar: admin.profiles?.avatar_url
      }));
      
      setAdmins(formattedAdmins);
    } catch (error: any) {
      console.error("Error loading admins:", error);
      toast({
        title: "Error",
        description: "Failed to load admin users: " + (error.message || "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setLoadingAdmins(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Validation error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // First, check if the user exists in auth.users
      const { data: userData, error: userCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('display_name', email)
        .single();
      
      if (userCheckError || !userData) {
        toast({
          title: "User not found",
          description: "No user found with that email address. User must be registered first.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Add admin role to the user_roles table
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userData.id,
          role: adminType as any
        });
      
      if (roleError) {
        if (roleError.code === '23505') { // Unique violation
          toast({
            title: "User is already an admin",
            description: "This user already has the admin role assigned.",
            variant: "destructive",
          });
        } else {
          throw roleError;
        }
      } else {
        toast({
          title: "Success",
          description: `User ${email} has been granted admin privileges`,
        });
        
        // Log the admin action
        await supabase
          .from('admin_actions')
          .insert({
            admin_id: (await supabase.auth.getUser()).data.user?.id,
            action: 'assign_admin_role',
            details: { target_user: email, role: adminType }
          });
        
        // Clear form and reload admins
        setEmail("");
        setAdminType("admin");
        loadAdmins();
      }
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add admin",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Admin Users</h2>
          <p className="text-sm text-muted-foreground">
            Manage admin users for the platform
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Admin Form */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
              Add New Admin
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Grant admin privileges to an existing user
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">User Email/Username</Label>
                <Input
                  id="email"
                  placeholder="Enter user's email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminType" className="text-foreground">Admin Type</Label>
                <Select
                  value={adminType}
                  onValueChange={setAdminType}
                >
                  <SelectTrigger id="adminType" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-foreground">
                    <SelectValue placeholder="Select admin type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-rdp-blue hover:bg-rdp-blue/90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Add Admin
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Admin List */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
                Current Admins
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadAdmins}
                disabled={loadingAdmins}
                className="bg-white dark:bg-gray-800 text-foreground dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {loadingAdmins ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardDescription className="text-muted-foreground">
              Users with administrative privileges
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {admins.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">
                {loadingAdmins ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 animate-spin mb-2" />
                    <p>Loading admins...</p>
                  </div>
                ) : (
                  <p>No admin users found.</p>
                )}
              </div>
            ) : (
              <ul className="divide-y dark:divide-gray-700">
                {admins.map((admin) => (
                  <li key={admin.id} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      {admin.avatar ? (
                        <img 
                          src={admin.avatar} 
                          alt={admin.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      ) : (
                        <User className="w-8 h-8 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-2" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{admin.name}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={admin.role === 'super_admin' ? "destructive" : "default"}
                      className={admin.role === 'super_admin' ? "" : "bg-rdp-blue"}
                    >
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddAdminForm;
