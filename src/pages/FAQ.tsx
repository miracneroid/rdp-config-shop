
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full">
      <Navbar />
      <div className="bg-white py-16 flex-grow w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-[#1e2537] sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Find answers to common questions about our RDP services.
            </p>
          </div>
          
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
