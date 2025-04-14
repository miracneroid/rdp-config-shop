
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 sm:py-24">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-20 sm:block">
        <svg
          className="h-full w-full"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 H60 M0 40 H60 M0 60 H60 M20 0 V60 M40 0 V60"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="1.5"
                fill="none"
                className="dark:stroke-blue-400/10"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-base font-semibold text-rdp-blue">Introducing</span>
              <span className="mt-2 block text-4xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-5xl xl:text-6xl">
                Custom RDP<br />
                <span className="gradient-text">Made Simple</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Deploy secure, high-performance remote desktop environments 
              tailored to your exact specifications within minutes.
              Choose your performance tier, region, and software setup
              with our easy-to-use configuration system.
            </p>
            <div className="mt-8 flex gap-4 sm:justify-center lg:justify-start">
              <Link to="/configure" className="rdp-btn-primary flex items-center">
                <span>Configure Your RDP</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/faq" className="rdp-btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="rdp-card overflow-hidden animate-float">
                <img
                  className="w-full object-cover"
                  src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Dashboard preview"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-rdp-dark dark:text-white">Professional RDP Solutions</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    High-performance virtual machines with Windows or Linux, 
                    fully configured for your business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
