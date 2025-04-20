import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import PricingSection from './PricingSection';

const CircleProgress = ({ 
  percent, 
  color,
  size = 80,
  label,
  animate = true
}: { 
  percent: number; 
  color: string;
  size?: number;
  label: string;
  animate?: boolean;
}) => {
  const [currentPercent, setCurrentPercent] = useState(0);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setCurrentPercent(percent);
      }, 500);
      return () => clearTimeout(timer);
    }
    setCurrentPercent(percent);
  }, [percent, animate]);

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;
  
  return (
    <div className="flex items-center space-x-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 100 100" className="transform -rotate-90">
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="none" 
            stroke="currentColor" 
            className="text-gray-200 dark:text-white/10" 
            strokeWidth="6"
          />
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="none" 
            stroke={color} 
            strokeWidth="6" 
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <text 
            x="50" 
            y="50" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="text-lg font-medium" 
            fill="currentColor"
          >
            {Math.round(currentPercent)}%
          </text>
        </svg>
      </div>
      <div className="text-sm text-black dark:text-white">{label}</div>
    </div>
  );
};

const ConnectedCirclesBackground = () => {
  const circleNodes = [
    { x: '10%', y: '20%', size: '80px', delay: '0s' },
    { x: '20%', y: '60%', size: '120px', delay: '1s' },
    { x: '40%', y: '30%', size: '100px', delay: '2s' },
    { x: '65%', y: '15%', size: '70px', delay: '3s' },
    { x: '80%', y: '40%', size: '90px', delay: '4s' },
    { x: '30%', y: '80%', size: '110px', delay: '5s' },
    { x: '85%', y: '75%', size: '95px', delay: '6s' },
    { x: '50%', y: '50%', size: '150px', delay: '7s' },
  ];

  return (
    <div className="connected-circles">
      {circleNodes.map((node, i) => (
        <div 
          key={i} 
          className="circle-node animate-pulse-connection"
          style={{ 
            top: node.y, 
            left: node.x, 
            width: node.size, 
            height: node.size,
            animationDelay: node.delay,
            opacity: 0.3,
          }}
        ></div>
      ))}
      
      {/* Connection lines */}
      {circleNodes.map((node, i) => {
        if (i < circleNodes.length - 1) {
          const nextNode = circleNodes[i + 1];
          const angle = Math.atan2(
            parseInt(nextNode.y) - parseInt(node.y),
            parseInt(nextNode.x) - parseInt(node.x)
          );
          const length = Math.sqrt(
            Math.pow(parseInt(nextNode.x) - parseInt(node.x), 2) + 
            Math.pow(parseInt(nextNode.y) - parseInt(node.y), 2)
          );
          
          return (
            <div 
              key={`line-${i}`}
              className="circle-connection"
              style={{
                top: `calc(${node.y} + ${parseInt(node.size) / 2}px)`,
                left: `calc(${node.x} + ${parseInt(node.size) / 2}px)`,
                width: `${length}px`,
                transform: `rotate(${angle}rad)`,
                transformOrigin: 'left center',
              }}
            ></div>
          );
        }
        return null;
      })}
    </div>
  );
};

const InteractiveGraph = () => {
  const [isVisible, setIsVisible] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (graphRef.current) {
      observer.observe(graphRef.current);
    }

    return () => {
      if (graphRef.current) {
        observer.unobserve(graphRef.current);
      }
    };
  }, []);

  return (
    <div ref={graphRef} className="h-32 flex items-end justify-center space-x-3 mt-4">
      {[20, 35, 50, 65, 80, 95].map((height, i) => (
        <div 
          key={i} 
          className={`w-4 bg-puzzle-blue/80 rounded-t transition-all duration-1000 animate-bounce-graph`}
          style={{ 
            height: isVisible ? `${height}%` : '0%',
            animationDelay: `${i * 0.2}s`,
            animationDuration: '2s'
          }}
        ></div>
      ))}
    </div>
  );
};

const PuzzleHero = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-white dark:bg-puzzle-dark">
      <ConnectedCirclesBackground />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-mono text-black dark:text-white mb-6">
            Remote Desktop<br/>
            <span className="text-puzzle-blue">Made Simple</span>
          </h1>
          <p className="text-xl font-mono text-black dark:text-white max-w-2xl mx-auto mb-8">
            Deploy secure, high-performance remote desktop environments tailored to your needs.
          </p>
          
          <div className="flex justify-center gap-4 mb-16">
            <Link to="/pricing" className="bg-puzzle-blue hover:bg-puzzle-blue-dark text-white font-mono px-6 py-3 rounded-lg inline-flex items-center transition-all">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="puzzle-card p-6">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Instant Deployment</h3>
            <div className="bg-puzzle-blue/10 dark:bg-puzzle-blue/5 p-4 rounded-lg mb-4">
              <div className="flex flex-col space-y-2">
                <div className="bg-puzzle-blue/20 text-puzzle-blue text-sm px-3 py-1 rounded w-max">
                  5 Minutes Setup
                </div>
                <div className="bg-puzzle-blue/20 text-puzzle-blue text-sm px-3 py-1 rounded w-max">
                  Quick Configuration
                </div>
                <div className="bg-puzzle-blue/20 text-puzzle-blue text-sm px-3 py-1 rounded w-max">
                  Instant Access
                </div>
              </div>
            </div>
          </div>
          
          <div className="puzzle-card p-6">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Global Infrastructure</h3>
            <div className="mb-3">
              <div className="inline-flex items-center bg-gray-100 dark:bg-white/10 text-black dark:text-white text-xs px-2 py-1 rounded">
                <span>Worldwide Availability</span>
              </div>
            </div>
            <InteractiveGraph />
            <div className="text-xs text-black dark:text-white mt-2">Multi-region deployment</div>
          </div>
          
          <div className="puzzle-card p-6">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Performance Metrics</h3>
            <div className="flex flex-col space-y-4 mt-4">
              <CircleProgress 
                percent={98} 
                color="#2A7DDE" 
                label="uptime guarantee" 
              />
              <CircleProgress 
                percent={96} 
                color="#2A7DDE" 
                label="connection speed" 
              />
            </div>
          </div>
          
          <div className="puzzle-card p-6">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Resource Optimization</h3>
            <div className="space-y-3 mt-4">
              {[
                { from: 'CPU', to: 'Optimized' },
                { from: 'Memory', to: 'Balanced' },
                { from: 'Storage', to: 'Fast SSD' },
                { from: 'Network', to: 'High Speed' },
                { from: 'Security', to: 'Enhanced' },
              ].map((item, i) => (
                <div key={i} className="flex items-center text-xs">
                  <div className="text-black dark:text-white w-16">{item.from}</div>
                  <div className="mx-2 flex-grow border-t border-dashed border-gray-300 dark:border-white/20"></div>
                  <div className="text-puzzle-blue w-20">{item.to}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <PricingSection plans={[
          {
            name: "Basic",
            price: 29,
            cpu: "2 vCPU",
            ram: "4 GB RAM",
            storage: "80 GB SSD",
            features: ["Windows/Linux OS", "24/7 Support", "99.9% Uptime"],
          },
          {
            name: "Standard",
            price: 59,
            cpu: "4 vCPU",
            ram: "8 GB RAM",
            storage: "160 GB SSD",
            features: ["Windows/Linux OS", "Priority Support", "99.9% Uptime", "Automated Backups"],
            popular: true
          },
          {
            name: "Premium",
            price: 99,
            cpu: "8 vCPU",
            ram: "16 GB RAM",
            storage: "320 GB SSD",
            features: ["Windows/Linux OS", "24/7 Priority Support", "99.99% Uptime", "Daily Backups", "Dedicated Resources"],
          },
          {
            name: "Enterprise",
            price: 299,
            cpu: "16 vCPU",
            ram: "32 GB RAM",
            storage: "640 GB SSD",
            features: ["Custom OS Options", "Dedicated Support Team", "99.99% Uptime", "Hourly Backups", "Dedicated Resources", "Custom Network Config"],
          }
        ]} />
      </div>
    </div>
  );
};

export default PuzzleHero;
