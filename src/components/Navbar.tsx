
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Menu, X, LogIn } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Monitor className="h-8 w-8 text-black dark:text-white" />
          <span className="text-xl font-bold text-black dark:text-white font-mono">RDP Config</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-4 font-mono text-sm md:text-base">
          {["Home", "Pricing", "Help", "Contact"].map((item, idx) => (
            <li key={idx}>
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative px-3 py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}

          {/* Divider */}
          <li className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

          {/* Theme toggle */}
          <li>
            <ThemeToggle />
          </li>

          {/* Login / User */}
          <li>
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : isLoggedIn ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-mono text-sm px-4 py-2 rounded-md flex gap-2 items-center transition-all duration-200 shadow-sm">
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Button>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-3 space-y-2 font-mono text-sm">
            {["Home", "Pricing", "Help", "Contact"].map((item, idx) => (
              <Link
                key={idx}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {!isLoading && !isLoggedIn && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
