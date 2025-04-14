
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

const AddAdminForm = () => {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminType, setAdminType] = useState("regular");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminId || !adminPassword) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Add new admin to the database
      const { error } = await supabase
        .from("admin_users")
        .insert({
          admin_id: adminId,
          password: adminPassword, // Note: In a real app, should be hashed
          admin_type: adminType,
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Admin ${adminId} has been added successfully`,
      });
      
      // Clear form
      setAdminId("");
      setAdminPassword("");
      setAdminType("regular");
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
            Add new admin users to manage the platform
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
              Create a new admin user with custom permissions
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminId" className="text-foreground">Admin ID</Label>
                <Input
                  id="adminId"
                  placeholder="Enter admin username or ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminPassword" className="text-foreground">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Enter secure password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
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
                    <SelectItem value="regular">Regular Admin</SelectItem>
                    <SelectItem value="super">Super Admin</SelectItem>
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
        
        {/* Admin Management Information */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-rdp-blue dark:text-rdp-blue-light" />
              Admin Management
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Information about admin roles and permissions
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Admin Types</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Regular Admin</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Can manage orders, support tickets, and users. Cannot add other admins or change system settings.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
                  <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-1">Super Admin</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Full access to all system features, including adding other admins, system configuration, and sensitive operations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Important Notes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>Admin passwords are stored securely but should be strong and unique</li>
                <li>Create the minimum number of admin accounts necessary</li>
                <li>Regular admins are suitable for most day-to-day operations</li>
                <li>Super admins have full control over the entire system</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddAdminForm;
