
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Lock, LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  adminId: z.string().min(4, { message: "Admin ID must be at least 4 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminId: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      // Fetch admin user from database
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('admin_id', values.adminId)
        .eq('password', values.password)
        .single();
      
      if (adminError || !adminData) {
        toast({
          title: "Login failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Update last login time
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);
      
      // Log admin action
      await supabase
        .from('admin_actions')
        .insert([
          { 
            admin_id: adminData.id, 
            action: 'Admin login', 
            admin_type: adminData.admin_type,
            ip_address: 'Unknown', // In a real app, you'd get the IP
            details: { method: 'regular_login' }
          }
        ]);
      
      // Set admin status in localStorage
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminType", adminData.admin_type);
      localStorage.setItem("adminName", values.adminId);
      localStorage.setItem("adminId", adminData.id);
      
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard",
        variant: "default",
      });
      
      navigate('/admin');
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container max-w-md mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Shield className="h-12 w-12 mx-auto text-rdp-blue dark:text-rdp-blue-light mb-3" />
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Login to access administrative controls</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="adminId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Enter your admin ID" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Admin Login
                </span>
              )}
            </Button>

            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
