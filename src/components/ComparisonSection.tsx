
import { Clock, Timer, CircleDollarSign } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <div className="w-full bg-black/95 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-white">Results In </span>
          <span className="text-puzzle-blue">5 Minutes</span>
          <span className="text-gray-400">, Not 5 Days</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* With Puzzle */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-puzzle-blue mb-8">With Puzzle</h3>
            <div className="flex items-center gap-4 text-white">
              <Timer className="w-5 h-5" />
              <span>3 - 5 Min</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <Clock className="w-5 h-5" />
              <span>4 Steps</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <CircleDollarSign className="w-5 h-5" />
              <span>Free</span>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(42,125,222,0.1)] transition-all">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Instant metrics and insights</h4>
                <div className="bg-puzzle-blue/20 text-puzzle-blue text-sm px-3 py-1 rounded-full w-max">
                  Auto-generated results
                </div>
              </div>
            </div>
          </div>

          {/* Without Puzzle */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">Without Puzzle</h3>
            <div className="flex items-center gap-4 text-gray-400">
              <Timer className="w-5 h-5" />
              <span>5 Days</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <Clock className="w-5 h-5" />
              <span>15 Steps</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <CircleDollarSign className="w-5 h-5" />
              <span>$400 - $1500</span>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="space-y-4">
                <h4 className="text-gray-400 font-medium">Manual process</h4>
                <div className="bg-gray-800 text-gray-400 text-sm px-3 py-1 rounded-full w-max">
                  No automation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
