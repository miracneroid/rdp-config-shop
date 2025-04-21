
import Navbar from "@/components/Navbar";
import StatsBanner from "@/components/StatsBanner";
import SimpleFooter from "@/components/SimpleFooter";

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-[#1e2537]">Help Center</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-rdp-blue">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-4">
              Find answers to the most common questions about our RDP services.
            </p>
            <a href="/faq" className="text-rdp-blue hover:underline">
              View FAQ
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-rdp-blue">Support Channels</h2>
            <ul className="space-y-2 text-gray-600">
              <li>📧 Email: support@rdpconfig.com</li>
              <li>💬 Live Chat: Available 24/7</li>
              <li>🌐 Knowledge Base: Comprehensive guides</li>
            </ul>
          </div>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Help;
