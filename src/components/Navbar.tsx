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
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
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

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-rdp-blue" />
              <span className="text-xl font-bold bg-gradient-to-r from-rdp-blue to-rdp-accent-purple text-transparent bg-clip-text">
                RDP Config
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/product" className="text-gray-600 hover:text-rdp-blue transition-colors">
              Product
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-rdp-blue transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-rdp-blue transition-colors">
              Pricing
            </Link>
            <ThemeToggle />
            
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <Button variant="default" className="bg-rdp-blue hover:bg-rdp-blue-dark text-white">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-rdp-blue focus:outline-none"
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
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rdp-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/product" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rdp-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </Link>
            <Link 
              to="/features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rdp-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rdp-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
