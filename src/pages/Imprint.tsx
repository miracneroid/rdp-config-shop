
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
const Imprint = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Imprint</h1>
        <p>Our company imprint and contact details will be available here.</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
);
export default Imprint;
