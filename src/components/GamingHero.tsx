
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GamingHero = () => {
  return (
    <div className="relative min-h-screen bg-gaming-dark overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gaming-darker opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gaming-dark"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The Best Skin Trade BOT
          </h1>
          <p className="text-gaming-text text-lg mb-8">
            Trade skin you already have for the best deals daily<br />
            and instantly trade more than 1000 skins in TF2 games
          </p>
          <div className="flex gap-4">
            <Button className="bg-gaming-blue hover:bg-gaming-blue/90 text-white px-8 py-6">
              Start Trading right away
            </Button>
            <Button variant="outline" className="border-gaming-accent text-white hover:bg-gaming-accent/10 px-8 py-6">
              Check latest trades
            </Button>
          </div>
        </div>

        {/* Game icons */}
        <div className="flex gap-8 mt-20 mb-32">
          <div className="w-16 h-16 bg-gaming-accent rounded-lg flex items-center justify-center">
            <img src="/game-icon-1.png" alt="Game 1" className="w-10 h-10" />
          </div>
          <div className="w-16 h-16 bg-gaming-accent rounded-lg flex items-center justify-center">
            <img src="/game-icon-2.png" alt="Game 2" className="w-10 h-10" />
          </div>
          <div className="w-16 h-16 bg-gaming-accent rounded-lg flex items-center justify-center">
            <img src="/game-icon-3.png" alt="Game 3" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingHero;
