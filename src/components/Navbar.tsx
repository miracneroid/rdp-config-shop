
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Menu, X, LogIn, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
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
          
          {/* Pricing Dropdown */}
          <div className="relative">
            <DropdownMenu open={isPricingOpen} onOpenChange={setIsPricingOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium flex items-center gap-1"
                >
                  <span>Pricing</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-white dark:bg-gray-900 border dark:border-gray-800">
                <DropdownMenuItem asChild>
                  <Link to="/windows" className="flex flex-col w-full">
                    <span className="font-medium">Windows Server</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Unmetered Windows RDPs</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/linux" className="flex flex-col w-full">
                    <span className="font-medium">Linux VPS</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Unmetered Linux Servers</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
            <Link
              to="/pricing"
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
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
