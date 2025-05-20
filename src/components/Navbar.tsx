
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Menu, X, LogIn, ChevronDown, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data?.session);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <nav className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Monitor className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">RDP Config</span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-4">
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

          {/* Divider */}
          <Separator orientation="vertical" className="h-6 bg-gray-300 dark:bg-gray-700 mx-2" />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Login / User */}
          <div>
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-3 space-y-2 font-mono text-sm">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Pricing section in mobile menu */}
            <div className="space-y-2 ml-3">
              <div className="px-3 py-2 font-medium text-gray-800 dark:text-gray-200">Pricing</div>
              <Link
                to="/windows"
                className="flex items-start gap-2 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Monitor className="h-5 w-5 mt-0.5" />
                <div>
                  <div>Windows Servers</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Unmetered Windows RDPs</div>
                </div>
              </Link>
              <Link
                to="/linux"
                className="flex items-start gap-2 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Terminal className="h-5 w-5 mt-0.5" />
                <div>
                  <div>Linux VPS</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Unmetered Linux servers</div>
                </div>
              </Link>
            </div>
            
            <Link
              to="/help"
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!isLoading && !isLoggedIn && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
