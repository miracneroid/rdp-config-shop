import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';

const PuzzleNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);
    };

    checkAuth();

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
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-puzzle-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-puzzle-green rounded-full">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-puzzle-dark" fill="currentColor">
                  <path d="M19.5,3c-0.3,0-0.5,0.2-0.5,0.5V7c0,0.3-0.2,0.5-0.5,0.5h-3c-0.3,0-0.5-0.2-0.5-0.5V3.5C15,3.2,14.8,3,14.5,3h-5
                    C9.2,3,9,3.2,9,3.5V7c0,0.3-0.2,0.5-0.5,0.5h-3C5.2,7.5,5,7.3,5,7V3.5C5,3.2,4.8,3,4.5,3C4.2,3,4,3.2,4,3.5v17
                    C4,20.8,4.2,21,4.5,21S5,20.8,5,20.5V17c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v3.5c0,0.3,0.2,0.5,0.5,0.5h5
                    c0.3,0,0.5-0.2,0.5-0.5V17c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v3.5c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5v-17
                    C20,3.2,19.8,3,19.5,3z M8.5,16.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-3c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v3
                    C9,16.3,8.8,16.5,8.5,16.5z M8.5,11.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-3C5,7.7,5.2,7.5,5.5,7.5h3C8.8,7.5,9,7.7,9,8v3
                    C9,11.3,8.8,11.5,8.5,11.5z M15.5,16.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-3c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v3
                    C16,16.3,15.8,16.5,15.5,16.5z M15.5,11.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-3c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v3
                    C16,11.3,15.8,11.5,15.5,11.5z M18.5,16.5h-3c-0.3,0-0.5-0.2-0.5-0.5v-3c0-0.3,0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v3
                    C19,16.3,18.8,16.5,18.5,16.5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-puzzle-dark dark:text-white">Puzzle RDP</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/product" className="nav-link">
              Product
            </Link>
            <Link to="/customers" className="nav-link">
              Customers
            </Link>
            <Link to="/company" className="nav-link">
              Company
            </Link>
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
            
            <ThemeToggle />
            
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse"></div>
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 px-5 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  Log in
                </Link>
                <Link to="/pricing" className="bg-puzzle-green text-puzzle-dark px-5 py-2 rounded-lg hover:bg-puzzle-green-dark transition-colors">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-white hover:text-puzzle-green focus:outline-none"
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
        <div className="md:hidden bg-white dark:bg-puzzle-dark border-t border-gray-200 dark:border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/product" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </Link>
            <Link 
              to="/customers" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Customers
            </Link>
            <Link 
              to="/company" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Company
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {!isLoggedIn && (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/pricing" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-puzzle-green text-puzzle-dark hover:bg-puzzle-green-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PuzzleNavbar;
