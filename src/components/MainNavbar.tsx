
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogIn, Moon, Sun, Globe, Monitor, Terminal } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PuzzleIcon from './ui/puzzle-icon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const MainNavbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PuzzleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">rdp.sh</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Home
            </Link>
            
            {/* New Pricing Dropdown using NavigationMenu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium bg-transparent hover:bg-transparent focus:bg-transparent">
                    Pricing
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[400px] bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                    <ul className="grid gap-3 p-2">
                      <li className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link to="/windows" className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                              <Monitor className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">Windows Servers</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Unmetered Windows RDPs</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link to="/linux" className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                              <Terminal className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">Linux VPS</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Unmetered Linux servers</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/help" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Help
            </Link>
            
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            
            {/* This creates the vertical separator shown in the image */}
            <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-gray-700" />
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Language Dropdown */}
            <div className="relative">
              <DropdownMenu open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium flex items-center space-x-2"
                  >
                    <span className="flex items-center">
                      <img src="/lovable-uploads/fb311a82-3b56-4508-8911-f70cf16da1c6.png" alt="US Flag" className="w-5 h-5 mr-2" />
                      en
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-32 bg-white dark:bg-gray-900 border dark:border-gray-800">
                  <DropdownMenuItem className="cursor-pointer">
                    <img src="/lovable-uploads/fb311a82-3b56-4508-8911-f70cf16da1c6.png" alt="US Flag" className="w-5 h-5 mr-2" />
                    <span>English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Globe className="w-5 h-5 mr-2" />
                    <span>Deutsch</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Globe className="w-5 h-5 mr-2" />
                    <span>Français</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Login Button */}
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation - Could be expanded in a future iteration */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300"
              aria-label="Open menu"
            >
              <LogIn className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
