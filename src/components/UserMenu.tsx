
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut, 
  Settings, 
  History, 
  CreditCard, 
  Server
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data - would be replaced with actual user data from auth context
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    initials: "JD"
  };
  
  const handleLogout = () => {
    // Mock logout - would be replaced with actual logout functionality
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // In a real app, this would clear auth state before navigating
    navigate("/");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-rdp-blue/10 text-rdp-blue dark:bg-rdp-blue-light/10 dark:text-rdp-blue-light">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Server className="mr-2 h-4 w-4" />
            <span>My RDPs</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <History className="mr-2 h-4 w-4" />
            <span>Order History</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
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
