
import Navbar from "@/components/Navbar";
import ConfigBuilder from "@/components/ConfigBuilder";
import StatsBanner from "@/components/StatsBanner";
import SimpleFooter from "@/components/SimpleFooter";

const Configure = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-[#1e2537] sm:text-4xl">
              Build Your Custom RDP
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Configure your remote desktop with the exact specifications you need.
            </p>
          </div>
          
          <ConfigBuilder />
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Configure;
