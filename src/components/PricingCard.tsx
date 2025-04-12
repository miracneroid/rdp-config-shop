
import { CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export interface PricingPlan {
  name: string;
  price: number;
  cpu: string;
  ram: string;
  storage: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleChoosePlan = () => {
    // Create a configured RDP item based on the plan
    const rdpConfig = {
      id: `plan-${plan.name.toLowerCase().replace(' ', '-')}`,
      name: `${plan.name} RDP`,
      price: plan.price,
      cpu: plan.cpu,
      ram: plan.ram,
      storage: plan.storage,
      operatingSystem: "Windows 10 Pro",
      region: "North America",
      quantity: 1
    };
    
    // Add to cart and navigate to cart page
    addToCart(rdpConfig);
    navigate('/cart');
  };
  
  return (
    <div className={`rdp-card p-6 flex flex-col ${plan.popular ? 'border-rdp-blue ring-2 ring-rdp-blue' : ''}`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-rdp-blue text-white py-1 px-4 text-sm font-medium rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-rdp-dark dark:text-white">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold text-rdp-dark dark:text-white">${plan.price}</span>
        <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
      </div>
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">CPU</span>
            <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.cpu}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">RAM</span>
            <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.ram}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Storage</span>
            <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.storage}</span>
          </div>
        </div>
      </div>
      
      <ul className="mt-6 space-y-3 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={handleChoosePlan}
        className={`mt-8 ${plan.popular ? 'rdp-btn-primary' : 'rdp-btn-secondary'} w-full justify-center`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
