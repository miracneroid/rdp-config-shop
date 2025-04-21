
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
const Docs = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p>Technical documentation and guides coming soon.</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
);
export default Docs;
