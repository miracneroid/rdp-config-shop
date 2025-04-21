
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-rdp-dark w-full">
      <Navbar />
      <div className="bg-white dark:bg-rdp-dark py-16 flex-grow w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Documentation</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-4xl">
              Learn how to use our RDP services
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Everything you need to know about setting up and managing your RDP instances.
            </p>
          </div>

          <Tabs defaultValue="quickstart" className="w-full">
            <TabsList className="w-full justify-start border-b mb-8">
              <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="quickstart">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Getting Started with RDP Config</h2>
                <p>Follow these simple steps to set up your first RDP instance:</p>
                <ol>
                  <li>Choose your plan from our pricing page</li>
                  <li>Configure your RDP specifications</li>
                  <li>Complete the payment process</li>
                  <li>Access your RDP credentials</li>
                  <li>Connect to your new RDP instance</li>
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="configuration">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Configuring Your RDP Instance</h2>
                <p>Learn how to customize your RDP environment:</p>
                <ul>
                  <li>Operating System Selection</li>
                  <li>Resource Allocation</li>
                  <li>Network Settings</li>
                  <li>Software Installation</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Security Best Practices</h2>
                <p>Protect your RDP instance with our security guidelines:</p>
                <ul>
                  <li>Password Management</li>
                  <li>Two-Factor Authentication</li>
                  <li>IP Whitelisting</li>
                  <li>Regular Updates</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="api">
              <div className="prose dark:prose-invert max-w-none">
                <h2>API Documentation</h2>
                <p>Integrate our services with your applications:</p>
                <ul>
                  <li>Authentication</li>
                  <li>Instance Management</li>
                  <li>Monitoring</li>
                  <li>Automation</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Documentation;
