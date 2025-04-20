
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Card component for feature showcases
const FeatureCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="puzzle-card p-6 flex flex-col h-full">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

// Circular progress component
const CircleProgress = ({ 
  percent, 
  color,
  size = 80,
  label
}: { 
  percent: number; 
  color: string;
  size?: number;
  label: string;
}) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  
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
            className="text-white/10" 
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
            className="circle-progress"
            style={{ '--percent': percent } as React.CSSProperties}
          />
          <text 
            x="50" 
            y="50" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="text-lg font-medium" 
            fill="white"
          >
            {percent}%
          </text>
        </svg>
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
};

const PuzzleHero = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-puzzle-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-puzzle-circles opacity-10"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-40 right-10 w-96 h-96 bg-puzzle-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-puzzle-green/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Remote Desktop <span className="text-puzzle-green">That</span><br/>
            Exceeds Expectations
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            Secure, high-performance remote desktop environments tailored to your needs.
          </p>
          <div className="text-sm text-white/50 mb-6">Built native to <span className="text-puzzle-green font-medium">secure networks</span></div>
          
          <div className="flex justify-center gap-4 mb-16">
            <Link to="/configure" className="puzzle-btn-primary inline-flex items-center">
              Get started for free
            </Link>
            <Link to="/login" className="puzzle-btn-secondary inline-flex items-center">
              Log in
            </Link>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard title="Be tax ready">
            <div className="bg-puzzle-dark p-4 rounded-lg mb-4">
              <div className="flex flex-col space-y-2">
                <div className="bg-puzzle-green/20 text-puzzle-green text-sm px-3 py-1 rounded w-max">
                  Cash
                </div>
                <div className="bg-white/5 text-white/70 text-sm px-3 py-1 rounded w-max">
                  Accrual
                </div>
                <div className="bg-white/5 text-white/70 text-sm px-3 py-1 rounded w-max">
                  Cash
                </div>
              </div>
            </div>
          </FeatureCard>
          
          <FeatureCard title="Be fundraise ready">
            <div className="mb-3">
              <div className="inline-flex items-center space-x-1 bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
                <span>Revenue Recognition</span>
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="h-32 flex items-end justify-center space-x-3">
              {[20, 30, 45, 60, 70, 85].map((height, i) => (
                <div 
                  key={i} 
                  className="w-4 bg-puzzle-green/80 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="text-xs text-white/40 mt-2">Real-time key metrics</div>
          </FeatureCard>
          
          <FeatureCard title="Get accurate connections, faster">
            <div className="space-y-4 mt-4">
              <CircleProgress 
                percent={98} 
                color="#60A5FA" 
                label="auto-categorized" 
              />
              <CircleProgress 
                percent={90} 
                color="#9B87F5" 
                label="finalized" 
              />
            </div>
          </FeatureCard>
          
          <FeatureCard title="Build a better business">
            <div className="space-y-3 mt-4">
              {[
                { from: '$16,328', to: '$14,069' },
                { from: '$500', to: '$212' },
                { from: '$350', to: '$58' },
                { from: '$125', to: '$212' },
                { from: '$14', to: '$212' },
              ].map((item, i) => (
                <div key={i} className="flex items-center text-xs">
                  <div className="text-white/70 w-16">{item.from}</div>
                  <div className="mx-2 flex-grow border-t border-dashed border-white/20"></div>
                  <div className="text-puzzle-green w-16">{item.to}</div>
                </div>
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default PuzzleHero;
