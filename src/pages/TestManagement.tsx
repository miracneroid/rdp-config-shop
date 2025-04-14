
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw, Users, UserPlus, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TestManagement = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if current user is admin on component load
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      const isAdmin = email === 'admin@example.com' || email === 'test@gmail.com';
      
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
  }, [navigate, toast]);

  const loadTestUsers = async () => {
    try {
      setIsLoadingUsers(true);
      
      // In a real scenario, we would use an admin API to get the list of users
      // For this demo, we'll use a hardcoded list including testing@gmail.com
      const mockUsers = [
        { email: "testing@gmail.com", created_at: new Date().toISOString() }
      ];
      
      setUserList(mockUsers);
      toast({
        title: "Users Loaded",
        description: `Loaded ${mockUsers.length} test users`,
      });
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load test users",
        variant: "destructive",
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const createTestUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please provide both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Call our edge function to create a test user
      const { data, error } = await supabase.functions.invoke("generate-test-data", {
        body: { email, password },
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: data.message || "Test user created successfully",
      });
      
      // Clear form
      setEmail("");
      setPassword("");
      
      // Refresh user list
      loadTestUsers();
    } catch (error: any) {
      console.error("Error creating test user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create test user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-rdp-dark dark:text-white">
          Admin Test Management
        </h1>
        
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            A default active RDP will be created automatically only for users with the email <strong>testing@gmail.com</strong>. 
            Other test users will not receive a default RDP.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Test User Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create Test User
              </CardTitle>
              <CardDescription>
                Generate a new test user with sample data
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={createTestUser}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="test.user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {email === "testing@gmail.com" && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      This email will receive a default active RDP
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {email === "testing@gmail.com" && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Default password for testing@gmail.com is "password123"
                    </p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Test User"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Test Users List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Test Users
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadTestUsers}
                  disabled={isLoadingUsers}
                >
                  {isLoadingUsers ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <CardDescription>
                Manage existing test users
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {userList.length === 0 ? (
                <div className="text-center p-4 text-gray-500">
                  {isLoadingUsers ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-10 w-10 animate-spin mb-2" />
                      <p>Loading users...</p>
                    </div>
                  ) : (
                    <p>No test users found. Click refresh to load users.</p>
                  )}
                </div>
              ) : (
                <ul className="divide-y dark:divide-gray-700">
                  {userList.map((user, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.email}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Created: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                        {user.email === "test@gmail.com" && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            Has default RDP
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-100">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestManagement;
