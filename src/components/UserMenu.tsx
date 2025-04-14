
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut, 
  History, 
  CreditCard, 
  Server,
  LayoutDashboard,
  HelpCircle,
  ShoppingCart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

const UserMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<{
    name: string,
    email: string,
    initials: string,
    avatar_url: string | null
  }>({
    name: "User",
    email: "",
    initials: "U",
    avatar_url: null
  });
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch user profile from profiles table
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        const displayName = profileData?.display_name || user.email?.split('@')[0] || "User";
        const initials = getInitialsFromName(displayName);
        
        setUserProfile({
          name: displayName,
          email: user.email || "",
          initials: initials,
          avatar_url: profileData?.avatar_url
        });
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const getInitialsFromName = (name: string) => {
    if (!name) return "U";
    
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return name.charAt(0).toUpperCase();
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Avatar className="h-8 w-8">
            {userProfile.avatar_url ? (
              <AvatarImage src={userProfile.avatar_url} alt={userProfile.name} />
            ) : (
              <AvatarFallback className="bg-rdp-blue/10 text-rdp-blue dark:bg-rdp-blue-light/10 dark:text-rdp-blue-light">
                {userProfile.initials}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userProfile.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userProfile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard?tab=profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard?tab=rdp-management')}>
            <Server className="mr-2 h-4 w-4" />
            <span>My RDPs</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard?tab=orders')}>
            <History className="mr-2 h-4 w-4" />
            <span>Order History</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard?tab=system-usage')}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>System Usage</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/cart')}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Shopping Cart</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/faq')}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & FAQ</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
