
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div className={`rdp-card p-6 flex flex-col ${plan.popular ? 'border-rdp-blue ring-2 ring-rdp-blue' : ''}`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-rdp-blue text-white py-1 px-4 text-sm font-medium rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-rdp-dark">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold text-rdp-dark">${plan.price}</span>
        <span className="ml-1 text-gray-500">/month</span>
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 w-20">CPU</span>
            <span className="text-sm font-semibold text-rdp-dark">{plan.cpu}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 w-20">RAM</span>
            <span className="text-sm font-semibold text-rdp-dark">{plan.ram}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 w-20">Storage</span>
            <span className="text-sm font-semibold text-rdp-dark">{plan.storage}</span>
          </div>
        </div>
      </div>
      
      <ul className="mt-6 space-y-3 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        to={`/configure?plan=${plan.name.toLowerCase().replace(' ', '-')}`}
        className={`mt-8 ${plan.popular ? 'rdp-btn-primary' : 'rdp-btn-secondary'} w-full justify-center`}
      >
        Choose Plan
      </Link>
    </div>
  );
};

export default PricingCard;
