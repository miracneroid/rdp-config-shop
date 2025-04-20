
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotionComparison = () => {
  return (
    <div className="bg-notion-background-light dark:bg-gray-900 py-16">
      <div className="notion-page-container">
        <div className="text-center mb-12">
          <h2 className="notion-heading-2">Results in 5 Minutes, Not Days</h2>
          <p className="notion-paragraph max-w-2xl mx-auto">
            See how our solution compares to traditional methods
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="comparison-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">With Puzzle RDP</h3>
              <div className="bg-black text-white dark:bg-white dark:text-black rounded-full px-3 py-1 text-sm font-medium">Recommended</div>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Setup completed in under 5 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Pre-configured software packages</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Automatic security updates and patches</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Instant scaling of resources as needed</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>24/7 support and monitoring included</span>
              </li>
            </ul>
            
            <div className="mt-8 flex items-center">
              <Clock className="h-5 w-5 text-black dark:text-white mr-2" />
              <span className="font-medium">Ready in 5 minutes</span>
            </div>
            
            <div className="mt-6">
              <Link to="/configure">
                <Button className="notion-button w-full">Get Started Now</Button>
              </Link>
            </div>
          </div>
          
          <div className="comparison-card bg-gray-50 dark:bg-gray-900 border-dashed">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Traditional Setup</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Setup takes days or even weeks</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Manual software installation required</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Manual security management needed</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Difficult to scale when needs change</span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Support requires additional contracts</span>
              </li>
            </ul>
            
            <div className="mt-8 flex items-center">
              <Clock className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-medium">Takes 3-5 days minimum</span>
            </div>
            
            <div className="mt-6">
              <Button disabled className="w-full bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed">
                Complex Setup Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionComparison;
