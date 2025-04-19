
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Monitor, Menu, X, ShoppingCart, LogIn, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { supabase } from "@/integrations/supabase/client";
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, getTotalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  
  const totalItems = getTotalItems();
  
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      if (session) {
        const { data: userData } = await supabase.auth.getUser();
        const email = userData?.user?.email;
        setIsAdmin(email === 'admin@example.com');
      }
      
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      
      if (session) {
        const email = session.user?.email;
        setIsAdmin(email === 'admin@example.com');
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 dark:bg-rdp-dark/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-indigo-100 dark:border-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rdp-blue to-rdp-purple text-white">
                <Monitor className="h-5 w-5" />
              </div>
              <span className="ml-2 text-xl font-bold text-rdp-dark dark:text-white">RDP Config</span>
              {location.pathname === "/" && (
                <Badge className="ml-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 font-normal">New</Badge>
              )}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`nav-link ${isActive("/") ? "text-rdp-blue dark:text-rdp-blue-light font-semibold" : ""}`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="nav-link flex items-center">
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 dark:bg-rdp-dark-light/95 backdrop-blur-md border border-indigo-100 dark:border-indigo-800/40">
                <Link to="/windows-rdp">
                  <DropdownMenuItem className="cursor-pointer">Windows RDP</DropdownMenuItem>
                </Link>
                <Link to="/linux-vps">
                  <DropdownMenuItem className="cursor-pointer">Linux VPS</DropdownMenuItem>
                </Link>
                <Link to="/usa-vps">
                  <DropdownMenuItem className="cursor-pointer">USA VPS</DropdownMenuItem>
                </Link>
                <Link to="/europe-vps">
                  <DropdownMenuItem className="cursor-pointer">Europe VPS</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/pricing" 
              className={`nav-link ${isActive("/pricing") ? "text-rdp-blue dark:text-rdp-blue-light font-semibold" : ""}`}
            >
              Pricing
            </Link>
            
            <Link 
              to="/help" 
              className={`nav-link ${isActive("/help") ? "text-rdp-blue dark:text-rdp-blue-light font-semibold" : ""}`}
            >
              Help
            </Link>
            
            <Link 
              to="/contact" 
              className={`nav-link ${isActive("/contact") ? "text-rdp-blue dark:text-rdp-blue-light font-semibold" : ""}`}
            >
              Contact
            </Link>
            
            <ThemeToggle />
            
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon" className="border-indigo-200 dark:border-indigo-800/40 dark:bg-gray-800 rounded-xl">
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rdp-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="default" size="sm" className="flex items-center gap-2 bg-gradient-to-r from-rdp-blue to-rdp-purple text-white rounded-xl">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Link to="/cart" className="relative mr-4">
              <Button variant="outline" size="icon" className="border-indigo-200 dark:border-indigo-800/40 dark:bg-gray-800 rounded-xl">
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rdp-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse mr-4"></div>
            ) : isLoggedIn ? (
              <div className="mr-4">
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center mr-4 space-x-2">
                <Link to="/login">
                  <Button variant="default" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-rdp-blue to-rdp-purple text-white rounded-xl">
                    <LogIn className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only">Login</span>
                  </Button>
                </Link>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-rdp-dark/95 backdrop-blur-md shadow-lg border-t border-indigo-100 dark:border-indigo-950/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-xl text-base font-medium ${isActive('/') 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-rdp-blue dark:text-rdp-blue-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200">
              <div className="flex justify-between items-center">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="pl-4 mt-2 space-y-1 border-l-2 border-indigo-100 dark:border-indigo-800/40">
                <Link 
                  to="/windows-rdp" 
                  className="block py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Windows RDP
                </Link>
                <Link 
                  to="/linux-vps" 
                  className="block py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Linux VPS
                </Link>
                <Link 
                  to="/usa-vps" 
                  className="block py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  USA VPS
                </Link>
                <Link 
                  to="/europe-vps" 
                  className="block py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Europe VPS
                </Link>
              </div>
            </div>
            
            <Link 
              to="/pricing" 
              className={`block px-3 py-2 rounded-xl text-base font-medium ${isActive('/pricing') 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-rdp-blue dark:text-rdp-blue-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            
            <Link 
              to="/help" 
              className={`block px-3 py-2 rounded-xl text-base font-medium ${isActive('/help') 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-rdp-blue dark:text-rdp-blue-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-xl text-base font-medium ${isActive('/contact') 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-rdp-blue dark:text-rdp-blue-light' 
                : 'text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
