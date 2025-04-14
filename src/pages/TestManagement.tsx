import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddAdminForm from "@/components/admin/AddAdminForm";
import AdminEditButton from "@/components/admin/AdminEditButton";

interface UserWithRole {
  id: string;
  display_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  created_at: string;
  updated_at: string;
  avatar_url?: string | null;
  email: string;
  role: string;
}

const TestManagement = () => {
  const [userList, setUserList] = useState<UserWithRole[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        
        const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', { role_param: 'admin' });
        
        if (roleError) {
          console.error("Error checking admin role:", roleError);
          throw roleError;
        }
        
        if (!isAdmin) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        loadUsers();
      } catch (error: any) {
        console.error("Admin check error:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to verify admin permissions",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    checkAdmin();
  }, [navigate, toast]);

  const fetchUserEmail = async (userId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return "Unknown";

      const response = await fetch(`https://mbvsottvfclwoswykxfy.supabase.co/functions/v1/get-user-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();
      
      if (response.ok && data.email) {
        return data.email;
      } else {
        console.error("Error fetching user email:", data.error);
        return "Unknown";
      }
    } catch (error) {
      console.error("Error in fetchUserEmail:", error);
      return "Unknown";
    }
  };

  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);
      setError(null);
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          display_name,
          first_name,
          last_name,
          created_at,
          updated_at,
          avatar_url
        `)
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      
      const usersWithRoles: UserWithRole[] = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id)
            .maybeSingle();
          
          const email = await fetchUserEmail(profile.id);
          
          return {
            ...profile,
            email,
            role: roleData?.role || 'user'
          };
        })
      );
      
      setUserList(usersWithRoles || []);
      
      toast({
        title: "Users Loaded",
        description: `Loaded ${profiles?.length || 0} users`,
      });
    } catch (error: any) {
      console.error("Error loading users:", error);
      setError(error.message || "Failed to load users");
      toast({
        title: "Error",
        description: "Failed to load users: " + (error.message || "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const updateUserProfile = async (userId: string, updatedFields: Record<string, any>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: updatedFields.display_name,
          first_name: updatedFields.first_name,
          last_name: updatedFields.last_name
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      if (updatedFields.role) {
        const { data: existingRole } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        
        if (existingRole) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .update({ role: updatedFields.role })
            .eq('user_id', userId);
          
          if (roleError) throw roleError;
        } else {
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({ user_id: userId, role: updatedFields.role });
          
          if (roleError) throw roleError;
        }
      }
      
      await loadUsers();
      
      toast({
        title: "User Updated",
        description: "The user profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating user profile:", error.message);
      toast({
        title: "Error updating user profile",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Admin User Management
        </h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
                  Users
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadUsers}
                  disabled={isLoadingUsers}
                  className="bg-white dark:bg-gray-800 text-foreground dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isLoadingUsers ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <CardDescription className="text-muted-foreground">
                View and manage registered users
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {userList.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">
                  {isLoadingUsers ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-10 w-10 animate-spin mb-2" />
                      <p>Loading users...</p>
                    </div>
                  ) : (
                    <p>No users found. Click refresh to load users.</p>
                  )}
                </div>
              ) : (
                <ul className="divide-y dark:divide-gray-700">
                  {userList.map((user) => (
                    <li key={user.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.display_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unnamed User'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{user.role}</Badge>
                        <AdminEditButton
                          entityId={user.id}
                          entityName="User"
                          fields={[
                            { name: "display_name", label: "Display Name", value: user.display_name || "" },
                            { name: "first_name", label: "First Name", value: user.first_name || "" },
                            { name: "last_name", label: "Last Name", value: user.last_name || "" },
                            { 
                              name: "role", 
                              label: "Role", 
                              value: user.role || "user"
                            }
                          ]}
                          onSave={updateUserProfile}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        
        <AddAdminForm />
      </div>
      <Footer />
    </div>
  );
};

export default TestManagement;
