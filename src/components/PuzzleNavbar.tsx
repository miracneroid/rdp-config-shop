import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const PuzzleNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-puzzle-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-puzzle-blue" />
              <span className="text-xl font-bold font-mono text-black dark:text-white">
                Puzzle RDP
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/product" className="font-mono text-black dark:text-white hover:text-puzzle-blue dark:hover:text-puzzle-blue transition-colors">
              Product
            </Link>
            <Link to="/features" className="font-mono text-black dark:text-white hover:text-puzzle-blue dark:hover:text-puzzle-blue transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="font-mono text-black dark:text-white hover:text-puzzle-blue dark:hover:text-puzzle-blue transition-colors">
              Pricing
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-puzzle-blue focus:outline-none"
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
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-puzzle-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/product" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-puzzle-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </Link>
            <Link 
              to="/features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-puzzle-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-puzzle-blue hover:bg-gray-50"
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

export default PuzzleNavbar;
