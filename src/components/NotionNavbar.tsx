
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import PuzzleIcon from './ui/puzzle-icon';

const NotionNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full transition-shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded">
              <PuzzleIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-black hidden sm:inline-block">
              Puzzle RDP
            </span>
          </Link>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="mx-2 text-gray-600 hover:text-black text-base px-2 py-1.5 rounded transition-colors duration-150">
              Home
            </Link>
            <Link to="/pricing" className="mx-2 text-gray-600 hover:text-black text-base px-2 py-1.5 rounded transition-colors duration-150">
              Pricing
            </Link>
            <Link to="/help" className="mx-2 text-gray-600 hover:text-black text-base px-2 py-1.5 rounded transition-colors duration-150">
              Help
            </Link>
            <Link to="/contact" className="mx-2 text-gray-600 hover:text-black text-base px-2 py-1.5 rounded transition-colors duration-150">
              Contact
            </Link>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-3 p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="ml-2">
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 min-w-[80px]"
              >
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </Button>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              className="ml-1 p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu popover */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-200 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />
      <div
        className={`md:hidden fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white border-l border-gray-100 shadow-lg transform transition-transform duration-300 z-50
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-gray-100">
          <span className="font-semibold text-base text-black">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col text-base p-5 gap-2">
          <Link
            to="/"
            className="py-2 px-3 rounded text-gray-800 hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/pricing"
            className="py-2 px-3 rounded text-gray-800 hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/help"
            className="py-2 px-3 rounded text-gray-800 hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </Link>
          <Link
            to="/contact"
            className="py-2 px-3 rounded text-gray-800 hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="py-2 px-3 rounded text-white bg-blue-600 hover:bg-blue-700 transition mt-2 flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn className="h-5 w-5" />
            Log In
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default NotionNavbar;
