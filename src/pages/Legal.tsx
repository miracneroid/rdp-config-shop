
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
const Legal = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Legal</h1>
        <p>Read our Terms of Service and Legal information here soon.</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
);
export default Legal;
