
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
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      const { data: isAdmin } = await supabase.rpc('has_role', { role_param: 'admin' });
      
      if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    checkAdmin();
    loadUsers();
  }, [navigate, toast]);

  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);
      
      // Fetch actual users from the database
      const { data: users, error } = await supabase
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
      
      if (error) throw error;
      
      // Fetch user roles information
      const usersWithRoles: UserWithRole[] = await Promise.all(
        (users || []).map(async (user) => {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();
          
          // Create properly typed user object
          return {
            ...user,
            email: user.display_name || 
                  `${user.first_name || ''} ${user.last_name || ''}`.trim() || 
                  'Unknown user',
            role: roleData?.role || 'user'
          };
        })
      );
      
      setUserList(usersWithRoles || []);
      toast({
        title: "Users Loaded",
        description: `Loaded ${users?.length || 0} users`,
      });
    } catch (error: any) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load users: " + (error.message || "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Admin User Management
        </h1>
        
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
                View registered users
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
                          Created: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Badge variant="outline">{user.role}</Badge>
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
