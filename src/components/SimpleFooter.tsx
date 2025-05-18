
import { Link } from "react-router-dom";

const SimpleFooter = () => {
  const footerLinks = {
    "Windows RDP": [
      { name: "Windows Server", path: "/windows" },
      { name: "Remote Desktop", path: "/windows" },
      { name: "Enterprise Solutions", path: "/windows" },
      { name: "Security Features", path: "/windows" }
    ],
    "Linux VPS": [
      { name: "Linux Servers", path: "/linux" },
      { name: "VPS Hosting", path: "/linux" },
      { name: "High Performance", path: "/linux" },
      { name: "Root Access", path: "/linux" }
    ],
    "Resources": [
      { name: "Documentation", path: "/docs" },
      { name: "API", path: "/api" },
      { name: "Status", path: "/status" },
      { name: "System Requirements", path: "/docs" }
    ],
    "Company": [
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/legal" }
    ]
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-left">
      <div className="max-w-7xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.path} 
                      className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-base text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} RDP Config. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
