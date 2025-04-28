
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import PuzzleIcon from './ui/puzzle-icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const NotionNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handlePricingMouseEnter = () => setIsPricingOpen(true);
  const handlePricingMouseLeave = () => setIsPricingOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-[#1A1F2C]/90 border-b border-gray-100 dark:border-gray-800 transition-shadow px-0 m-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded">
              <PuzzleIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-black dark:text-[#9b87f5] hidden sm:inline-block">
              Puzzle RDP
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] text-base px-2 py-1.5 rounded transition-colors duration-150">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={handlePricingMouseEnter}
              onMouseLeave={handlePricingMouseLeave}
            >
              <DropdownMenu open={isPricingOpen} onOpenChange={setIsPricingOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] text-base font-normal px-2 py-1.5 rounded transition-colors flex items-center gap-1 bg-transparent"
                    tabIndex={0}
                  >
                    Pricing
                    <span className="ml-1 flex items-center">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-[300px] p-3 z-[150] bg-[#1A1F2C] text-gray-200 border border-gray-700 rounded-md shadow-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link to="/pricing?type=windows" className="flex flex-col px-3 py-3 w-full hover:bg-gray-700 rounded-md transition-colors">
                      <span className="font-medium text-white text-base">Windows Server</span>
                      <span className="text-xs text-gray-300 mt-1">Unmetered Windows RDPs</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pricing?type=linux" className="flex flex-col px-3 py-3 w-full hover:bg-gray-700 rounded-md transition-colors">
                      <span className="font-medium text-white text-base">Linux VPS</span>
                      <span className="text-xs text-gray-300 mt-1">Unmetered Linux Servers</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/help" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] text-base px-2 py-1.5 rounded transition-colors duration-150">
              Help
            </Link>
            <Link to="/contact" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] text-base px-2 py-1.5 rounded transition-colors duration-150">
              Contact
            </Link>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-3 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="ml-2">
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2 min-w-[80px] transition-all duration-200"
              >
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              className="ml-1 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
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
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold text-gray-900 px-3 pt-2 pb-1">Pricing</span>
            <Link
              to="/pricing?type=windows"
              className="flex flex-col px-4 py-2 rounded text-gray-800 hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-medium">Windows Server</span>
              <span className="text-xs text-gray-500 -mt-0.5">Unmetered Windows RDPs</span>
            </Link>
            <Link
              to="/pricing?type=linux"
              className="flex flex-col px-4 py-2 rounded text-gray-800 hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-base font-medium">Linux VPS</span>
              <span className="text-xs text-gray-500 -mt-0.5">Unmetered Linux Servers</span>
            </Link>
          </div>
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
