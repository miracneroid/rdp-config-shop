
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Monitor, Menu, X, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const NotionNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Monitor className="h-6 w-6" />
              <span className="text-lg font-medium">Puzzle RDP</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                Home
              </Link>
              <Link to="/pricing" className="text-sm text-gray-600 hover:text-black transition-colors">
                Pricing
              </Link>
              <Link to="/help" className="text-sm text-gray-600 hover:text-black transition-colors">
                Help
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
                Contact
              </Link>
              
              {/* Divider */}
              <div className="h-5 w-px bg-gray-300" />
              
              {/* Theme toggle button */}
              <button
                onClick={() => setTheme('dark')}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Switch to dark mode"
              >
                <Moon className="h-5 w-5" />
              </button>
              
              {/* Login button */}
              <Link to="/login">
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-black transition-colors"
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
              className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/help" 
              className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NotionNavbar;
