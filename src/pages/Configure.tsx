
import Navbar from "@/components/Navbar";
import ConfigBuilder from "@/components/ConfigBuilder";
import Footer from "@/components/Footer";

const Configure = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-rdp-dark sm:text-4xl">
              Build Your Custom RDP
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Configure your remote desktop with the exact specifications you need.
            </p>
          </div>
          
          <ConfigBuilder />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Configure;
