
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProcessorCards from "./ProcessorCards";
import DashboardCarousel from "./DashboardCarousel";

const NotionHero = () => {
  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              100% privacy focused hosting
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Cloud provider backed by EU-legislation and high quality standards from The Netherlands 🇳🇱, Phoenix 🇺🇸 and Poland 🇵🇱
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/configure">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5">
                  Instant deployment →
                </Button>
              </Link>
            </div>
            
            <ProcessorCards />
          </div>

          <div className="relative">
            <DashboardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionHero;
