
import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart3,
  Users,
  Server,
  ShoppingCart,
  TicketCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Home,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  description
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    { title: "Dashboard", icon: BarChart3, href: "/admin" },
    { title: "Users", icon: Users, href: "/admin/users" },
    { title: "RDP Instances", icon: Server, href: "/admin/rdp" },
    { title: "Orders", icon: ShoppingCart, href: "/admin/orders" },
    { title: "Support", icon: TicketCheck, href: "/admin/tickets" },
    { title: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminType");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminId");
      
      toast({
        title: "Logged out",
        description: "You have been logged out of the admin panel",
      });
      
      navigate("/admin-login");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out: " + error.message,
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-800/90">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden p-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleSidebar}
            className="bg-white dark:bg-gray-800"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'block' : 'hidden'} md:block
          w-full md:w-64 bg-white dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-100 dark:border-gray-700
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-rdp-blue dark:text-rdp-blue-light" />
                <h2 className="font-bold text-xl">Admin Panel</h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-2 pb-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate("/")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Site
                </Button>
                
                {sidebarItems.map((item) => (
                  <Button 
                    key={item.title}
                    variant={location.pathname === item.href ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.href);
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </Button>
                ))}
                
                <Separator className="my-4" />
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </ScrollArea>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                {title}
              </h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            
            {children}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
