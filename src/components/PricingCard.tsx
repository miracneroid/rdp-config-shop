
import React, { useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const isStandard = plan.name === "Standard";

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
  
  // Mouse movement effect for spotlight
  useEffect(() => {
    if (!isStandard || !cardRef.current) return;
    
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isStandard]);

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`
        relative isolate overflow-hidden
        bg-white dark:bg-[#1e1e2d] rounded-xl p-8 flex flex-col h-full transition-all duration-300 
        shadow-sm hover:shadow-xl border border-transparent dark:border-gray-800
        ${isStandard ? 'before:absolute before:inset-0 before:bg-gradient-to-b before:from-spotlight-purple/30 before:via-spotlight-violet/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none' : ''}
        ${selected 
          ? 'border-blue-900 ring-2 ring-blue-500 dark:border-blue-700 dark:ring-blue-600' 
          : 'hover:border-blue-500 hover:ring-1 hover:ring-blue-500 dark:hover:border-blue-600 dark:hover:ring-blue-600'}
        group relative cursor-pointer
        ${isStandard ? 'after:absolute after:w-[250px] after:h-[250px] after:rounded-full after:bg-gradient-to-b after:from-spotlight-purple/20 after:to-spotlight-indigo/5 after:blur-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity after:pointer-events-none after:-z-10 after:left-[var(--x,50%)] after:top-[var(--y,50%)] after:transform after:-translate-x-1/2 after:-translate-y-1/2' : ''}
        ${isStandard ? 'hover:shadow-spotlight' : ''}
      `}
    >
      {isStandard && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20"></div>
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-b from-spotlight-purple/30 to-spotlight-indigo/5 blur-3xl rounded-full animate-blob opacity-30"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-t from-spotlight-violet/30 to-spotlight-indigo/5 blur-3xl rounded-full animate-blob opacity-30" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      {plan.popular && (
        <div className="absolute top-0 right-0 bg-spotlight-purple text-white text-sm font-medium px-4 py-1 rounded-tr-xl rounded-bl-xl z-10">
          Most Popular
        </div>
      )}

      <div className="relative z-10">
        <h3 className={`text-2xl font-bold mb-4 ${isStandard ? 'text-transparent bg-clip-text bg-gradient-to-r from-spotlight-purple to-spotlight-indigo' : 'text-[#1e2537] dark:text-white'}`}>
          {plan.name}
        </h3>
        <div className="flex items-baseline">
          <span className={`text-4xl font-bold ${isStandard ? 'text-transparent bg-clip-text bg-gradient-to-r from-spotlight-purple to-spotlight-indigo' : 'text-[#1e2537] dark:text-white'}`}>
            {settings.currency.symbol}{plan.price}
          </span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
        </div>

        <div className="mt-8 space-y-4 relative">
          {isStandard && (
            <div className="absolute inset-0 bg-gradient-to-r from-spotlight-purple/10 to-transparent rounded-lg blur-sm -z-10"></div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">CPU</span>
            <span className={`font-medium ${isStandard ? 'text-spotlight-purple' : 'text-[#1e2537] dark:text-white'}`}>
              {plan.cpu}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">RAM</span>
            <span className={`font-medium ${isStandard ? 'text-spotlight-purple' : 'text-[#1e2537] dark:text-white'}`}>
              {plan.ram}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Storage</span>
            <span className={`font-medium ${isStandard ? 'text-spotlight-purple' : 'text-[#1e2537] dark:text-white'}`}>
              {plan.storage}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3 flex-grow relative z-10">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className={`h-5 w-5 ${isStandard ? 'text-spotlight-purple' : 'text-green-500'} flex-shrink-0`} />
            <span className="text-gray-600 dark:text-gray-300 text-sm truncate">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleChoosePlan}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 z-10
          ${isStandard
            ? 'bg-gradient-to-r from-spotlight-purple to-spotlight-indigo text-white hover:shadow-lg hover:shadow-spotlight-purple/20'
            : selected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-[#1e2537] border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 dark:bg-[#2d2d3d] dark:text-white dark:border-gray-700'
          }`}
      >
        {isStandard ? (
          <span className="relative inline-flex items-center">
            <span className="animate-pulse absolute inset-0 rounded-lg bg-white/10"></span>
            Choose Plan
          </span>
        ) : (
          "Choose Plan"
        )}
      </button>
    </div>
  );
};

export default PricingCard;
