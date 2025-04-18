
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut, 
  Ticket,
  Gift,
  Bell,
  History,
  Camera
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
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AvatarSelector from "./AvatarSelector";

const UserMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<{
    name: string,
    email: string,
    initials: string,
    avatar_url: string | null,
    avatar_character: string | null
  }>({
    name: "User",
    email: "",
    initials: "U",
    avatar_url: null,
    avatar_character: null
  });
  
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          let displayName = user.email?.split('@')[0] || "User";
          let avatarUrl = null;
          let avatarCharacter = null;
          
          // Check for Google provider metadata
          const { app_metadata, user_metadata } = user;
          
          if (app_metadata && app_metadata.provider === 'google') {
            if (user_metadata) {
              console.log("Google user metadata:", user_metadata);
              
              if (user_metadata.avatar_url) {
                avatarUrl = user_metadata.avatar_url;
              }
              
              if (user_metadata.full_name) {
                displayName = user_metadata.full_name;
              } else if (user_metadata.name) {
                displayName = user_metadata.name;
              }
            }
          }
          
          // Get profile data from our profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          
          if (profileError) {
            console.error("Error fetching profile:", profileError);
          }
          
          if (profileData) {
            displayName = profileData.display_name || displayName;
            avatarUrl = profileData.avatar_url || avatarUrl;
            avatarCharacter = profileData.avatar_character || null;
          }
          
          const initials = getInitialsFromName(displayName);
          
          setUserProfile({
            name: displayName,
            email: user.email || "",
            initials: initials,
            avatar_url: avatarUrl,
            avatar_character: avatarCharacter
          });
          
          // If user signed up with Google and doesn't have a profile yet, create one with Google data
          if ((app_metadata?.provider === 'google' && !profileData) || 
              (app_metadata?.provider === 'google' && profileData && !profileData.avatar_url && avatarUrl)) {
            
            const firstName = user_metadata?.given_name || displayName.split(' ')[0] || '';
            const lastName = user_metadata?.family_name || (displayName.split(' ').length > 1 ? displayName.split(' ').slice(1).join(' ') : '');
            
            console.log("Creating/updating profile for Google user:", {
              id: user.id,
              display_name: displayName,
              first_name: firstName,
              last_name: lastName,
              avatar_url: avatarUrl
            });
            
            const { error: upsertError } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                display_name: displayName,
                first_name: firstName,
                last_name: lastName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString()
              });
              
            if (upsertError) {
              console.error("Error upserting profile:", upsertError);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    
    fetchUserProfile();
    
    // Set up auth state listener to refresh profile when session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserProfile();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const getInitialsFromName = (name: string) => {
    if (!name) return "U";
    
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return name.charAt(0).toUpperCase();
  };
  
  const handleAvatarSelected = async (avatarUrl: string, character: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Check if profile exists before updating
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
        
      if (profileCheckError) {
        console.error("Error checking profile:", profileCheckError);
      }
      
      if (existingProfile) {
        // Profile exists, update it
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            avatar_url: avatarUrl,
            avatar_character: character,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (updateError) throw updateError;
      } else {
        // Profile doesn't exist, insert it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            avatar_url: avatarUrl,
            avatar_character: character,
            updated_at: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      setUserProfile({
        ...userProfile,
        avatar_url: avatarUrl,
        avatar_character: character
      });
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated."
      });
      
      setAvatarDialogOpen(false);
    } catch (error: any) {
      console.error("Error updating avatar:", error);
      toast({
        title: "Error updating avatar",
        description: error.message,
        variant: "destructive",
      });
    }
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
    navigate(path);
  };
  
  return (
    <>
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
            <DropdownMenuItem onClick={() => handleNavigation('/dashboard?tab=orders')}>
              <History className="mr-2 h-4 w-4" />
              <span>Orders</span>
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
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
