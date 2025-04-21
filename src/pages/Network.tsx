
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
const Network = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Our Network</h1>
        <p>Details about data centers and network infrastructure coming soon.</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
);
export default Network;
