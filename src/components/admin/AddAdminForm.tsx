import { useState, useEffect } from "react";
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
import { Loader2, User, Shield, Users, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminUser {
  id: string;
  role: string;
  name: string;
  avatar?: string;
}

interface Profile {
  id: string;
  display_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

const AddAdminForm = () => {
  const [email, setEmail] = useState("");
  const [adminType, setAdminType] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoadingAdmins(true);
      
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('role', 'admin');
      
      if (rolesError) throw rolesError;
      
      if (!userRoles || userRoles.length === 0) {
        setAdmins([]);
        setLoadingAdmins(false);
        return;
      }
      
      const userIds = userRoles.map(admin => admin.user_id);
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, display_name, first_name, last_name, avatar_url')
        .in('id', userIds);
        
      if (profilesError) throw profilesError;
      
      const formattedAdmins: AdminUser[] = userRoles.map(role => {
        const profile = (profiles || []).find(p => p.id === role.user_id) || {} as Profile;
        
        return {
          id: role.user_id,
          role: role.role,
          name: profile.display_name || 
                `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 
                'Unknown Admin',
          avatar: profile.avatar_url || undefined
        };
      });
      
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
      
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userData.id,
          role: adminType as any
        });
      
      if (roleError) {
        if (roleError.code === '23505') {
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
        
        await supabase
          .from('admin_actions')
          .insert({
            admin_id: (await supabase.auth.getUser()).data.user?.id,
            action: 'assign_admin_role',
            details: { target_user: email, role: adminType }
          });
        
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
