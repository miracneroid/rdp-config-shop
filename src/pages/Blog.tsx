
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
const Blog = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p>RDP tips, server updates, and product news coming soon.</p>
      </div>
    </div>
    <SimpleFooter />
  </div>
);
export default Blog;
