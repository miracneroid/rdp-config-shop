
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Monitor, Menu, X, ShoppingCart, LogIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, getTotalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const totalItems = getTotalItems();
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 dark:bg-rdp-dark/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Monitor className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light" />
              <span className="ml-2 text-xl font-bold text-rdp-dark dark:text-white">RDP Config</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
              Home
            </Link>
            <Link to="/configure" className="text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
              Configure
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
              About
            </Link>
            <Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
              FAQ
            </Link>
            <ThemeToggle />
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rdp-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="default" size="sm" className="flex items-center gap-2">
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
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rdp-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            {isLoggedIn ? (
              <div className="mr-4">
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center mr-4 space-x-2">
                <Link to="/login">
                  <Button variant="default" size="sm" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only">Login</span>
                  </Button>
                </Link>
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-rdp-blue dark:hover:text-rdp-blue-light focus:outline-none"
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
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-rdp-dark shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/configure" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Configure
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            {!isLoggedIn && (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rdp-blue dark:hover:text-rdp-blue-light hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
