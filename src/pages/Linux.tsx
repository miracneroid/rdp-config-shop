
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
const Linux = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Linux VPS</h1>
        <p>Welcome to the Linux VPS page! More info coming soon.</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
);
export default Linux;
