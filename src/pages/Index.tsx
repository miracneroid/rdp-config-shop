
import Navbar from "@/components/Navbar";
import GamingHero from "@/components/GamingHero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      <Navbar />
      <GamingHero />
      
      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Features</h2>
          <p className="text-gaming-text">Easy game by trade skin and earn up to 30% more value</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gaming-card-dark border-gaming-accent p-6">
            <img src="/feature-1.png" alt="Trading Feature" className="mb-4 rounded-lg w-full" />
            <Badge className="bg-gaming-blue text-white mb-2">TRADE</Badge>
            <h3 className="text-xl font-bold mb-2">Upgrade your skins to the newest collections</h3>
            <p className="text-gaming-text">Trade your skins instantly and get the best deals available on the market</p>
          </Card>
          
          <Card className="bg-gaming-card-dark border-gaming-accent p-6">
            <img src="/feature-2.png" alt="Market Feature" className="mb-4 rounded-lg w-full" />
            <Badge className="bg-gaming-purple text-white mb-2">MARKET</Badge>
            <h3 className="text-xl font-bold mb-2">The best place to buy CS:GO skins</h3>
            <p className="text-gaming-text">Access to thousands of skins with competitive prices</p>
          </Card>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-20 bg-gaming-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Our Popular CS:GO Weapon</h2>
            <Button variant="outline" className="border-gaming-accent">
              Show all now
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* We'll add the weapon cards here in the next iteration */}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
