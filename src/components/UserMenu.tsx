import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut, 
  ShoppingCart,
  Heart,
  Ticket,
  Gift,
  Bell,
  History
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
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          let displayName = user.email?.split('@')[0] || "User";
          let avatarUrl = null;
          
          // Check if user has avatar from Google
          const { provider_id, user_metadata } = user.app_metadata || {};
          if (provider_id === 'google' && user_metadata) {
            // Google users often have avatar and name in metadata
            if (user_metadata.avatar_url) {
              avatarUrl = user_metadata.avatar_url;
            }
            if (user_metadata.full_name) {
              displayName = user_metadata.full_name;
            }
          }
          
          // Fetch user profile from profiles table as a fallback
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          
          if (profileData) {
            displayName = profileData.display_name || displayName;
            avatarUrl = profileData.avatar_url || avatarUrl;
          }
          
          const initials = getInitialsFromName(displayName);
          
          setUserProfile({
            name: displayName,
            email: user.email || "",
            initials: initials,
            avatar_url: avatarUrl
          });
          
          // If this is a new Google user, ensure they have a profile
          if (provider_id === 'google' && !profileData) {
            const firstName = user_metadata?.given_name || displayName.split(' ')[0] || '';
            const lastName = user_metadata?.family_name || (displayName.split(' ').length > 1 ? displayName.split(' ').slice(1).join(' ') : '');
            
            await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                display_name: displayName,
                first_name: firstName,
                last_name: lastName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString()
              });
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
  
  const handleNavigation = (path: string) => {
    // Close the dropdown menu and navigate
    navigate(path);
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
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=rdp-management')}>
            <User className="mr-2 h-4 w-4" />
            <span>RDP Management</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=orders')}>
            <History className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=wishlist')}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Wishlist</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=coupons')}>
            <Ticket className="mr-2 h-4 w-4" />
            <span>Coupons</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=giftcards')}>
            <Gift className="mr-2 h-4 w-4" />
            <span>Gift Cards</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=notifications')}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/cart')}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
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
