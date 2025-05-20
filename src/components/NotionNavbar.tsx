
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Moon, Sun, Terminal, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import PuzzleIcon from './ui/puzzle-icon';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NotionNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-[#1A1F2C]/90 dark:border-none border-b border-gray-100 transition-shadow px-0 m-0">
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
            
            {/* New Pricing Dropdown using NavigationMenu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="mx-2 text-gray-600 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#9b87f5] text-base font-normal bg-transparent hover:bg-transparent focus:bg-transparent">
                    Pricing
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[400px] bg-white dark:bg-[#1A1F2C] p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                    <ul className="grid gap-3 p-2">
                      <li className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link to="/pricing?type=windows" className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                              <Monitor className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">Windows Servers</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Unmetered Windows RDPs</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="row-span-1">
                        <NavigationMenuLink asChild>
                          <Link to="/pricing?type=linux" className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                              <Terminal className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">Linux VPS</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Unmetered Linux servers</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
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
        className={`md:hidden fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white dark:bg-[#1A1F2C] dark:border-gray-800 border-l border-gray-100 shadow-lg transform transition-transform duration-300 z-50
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="font-semibold text-base text-black dark:text-white">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col text-base p-5 gap-2 dark:bg-[#1A1F2C]">
          <Link
            to="/"
            className="py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold text-gray-900 dark:text-gray-200 px-3 pt-2 pb-1">Pricing</span>
            <Link
              to="/pricing?type=windows"
              className="flex items-start gap-2 px-3 py-2 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Monitor className="h-5 w-5 mt-0.5 text-gray-600 dark:text-gray-400" />
              <div>
                <div>Windows Server</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Unmetered Windows RDPs</div>
              </div>
            </Link>
            <Link
              to="/pricing?type=linux"
              className="flex items-start gap-2 px-3 py-2 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Terminal className="h-5 w-5 mt-0.5 text-gray-600 dark:text-gray-400" />
              <div>
                <div>Linux VPS</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Unmetered Linux servers</div>
              </div>
            </Link>
          </div>
          <Link
            to="/help"
            className="py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </Link>
          <Link
            to="/contact"
            className="py-2 px-3 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
