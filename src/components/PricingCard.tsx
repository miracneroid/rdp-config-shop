
import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';

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
  selected?: boolean;
  onClick?: () => void;
}

const PricingCard = ({ plan, selected = false, onClick }: PricingCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { settings } = useSettings();

  const handleChoosePlan = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent onClick
    
    const cpuCores = parseInt(plan.cpu.split(' ')[0]) || 2;
    const ramGB = parseInt(plan.ram.split(' ')[0]) || 4;
    const storageGB = parseInt(plan.storage.split(' ')[0]) || 64;

    const rdpItem = {
      id: `plan-${plan.name.toLowerCase().replace(' ', '-')}`,
      name: `${plan.name} RDP`,
      price: plan.price,
      configuration: {
        cpu: cpuCores,
        ram: ramGB,
        storage: storageGB,
        os: "Windows 10 Pro",
        region: "India",
        applications: [],
        duration: 1
      }
    };

    addToCart(rdpItem);
    navigate('/cart');
  };

  const handleCardClick = () => {
    console.log("Card clicked for plan:", plan.name);
    if (onClick) {
      onClick();
    }
  };

  // Determine if this is the Personal plan (free)
  const isFreePlan = plan.name === "Personal" || plan.price === 0;
  
  // Determine if this is the middle/popular plan
  const isPopularPlan = plan.popular === true;
  
  return (
    <div
      onClick={handleCardClick}
      className={`
        rounded-3xl p-8 flex flex-col h-full transition-all duration-300
        ${isPopularPlan 
          ? 'bg-[#171728]/90 transform md:scale-110 z-10 relative' 
          : 'bg-[#171728]'}
        ${selected 
          ? 'ring-2 ring-[#696cff]' 
          : ''}
        cursor-pointer
      `}
    >
      {isPopularPlan && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center">
          <div className="bg-[#696cff] bg-opacity-30 text-blue-300 px-4 py-1.5 rounded-full flex items-center text-sm font-medium">
            <Star className="w-4 h-4 mr-1.5" />
            Best Deal
          </div>
        </div>
      )}

      <div className="relative">
        {isPopularPlan ? (
          <div className="bg-[#696cff] bg-opacity-20 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6">
            <div className="bg-[#696cff] rounded-md w-5 h-5"></div>
          </div>
        ) : (
          <div className="bg-[#222233] rounded-full p-4 w-12 h-12 flex items-center justify-center mb-6">
            {isFreePlan ? (
              <div className="bg-white rounded-full w-4 h-4"></div>
            ) : (
              <div className="bg-white rounded-md transform rotate-45 w-4 h-4"></div>
            )}
          </div>
        )}
        
        {(isPopularPlan || (!isFreePlan && !isPopularPlan)) && (
          <div className="absolute top-0 right-0">
            <div className="bg-blue-500 text-xs rounded-full px-2 py-0.5 font-medium">
              Save {isPopularPlan ? '65%' : '75%'}
            </div>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
      <p className="text-gray-400 text-sm mb-4">
        {plan.name === "Personal" 
          ? "For individuals who want to securely connect personal devices, for free."
          : plan.name === "Starter"
            ? "For teams or organizations looking for an easy-to-use, secure, legacy VPN replacement."
            : "For companies who need service and resource level authentication and access control."}
      </p>

      <div className="mt-6 mb-2">
        {isFreePlan ? (
          <span className="text-5xl font-bold text-white">Free</span>
        ) : (
          <>
            <span className="text-5xl font-bold text-white">
              {settings.currency.symbol}{plan.price}
            </span>
            <span className="text-gray-400 ml-1">/ month</span>
          </>
        )}
      </div>
      
      {!isFreePlan && (
        <div className="text-[#696cff] mb-6 font-semibold">+3 EXTRA months</div>
      )}

      <div className="mt-4 space-y-3 flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">CPU</span>
          <span className="font-medium text-white">{plan.cpu}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">RAM</span>
          <span className="font-medium text-white">{plan.ram}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Storage</span>
          <span className="font-medium text-white">{plan.storage}</span>
        </div>
        
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-300 text-sm truncate">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleChoosePlan}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
          ${selected || isPopularPlan
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white/10 text-white border border-gray-800 hover:bg-blue-600 hover:border-blue-600'
          }`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
