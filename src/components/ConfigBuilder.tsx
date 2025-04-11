
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/context/CartContext';

interface Configuration {
  cpu: number;
  ram: number;
  storage: number;
  os: string;
  region: string;
  applications: string[];
  duration: number;
}

const ConfigBuilder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const searchParams = new URLSearchParams(location.search);
  const planParam = searchParams.get('plan');
  
  const [activeTab, setActiveTab] = useState("specs");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [configuration, setConfiguration] = useState<Configuration>({
    cpu: 4,
    ram: 8,
    storage: 128,
    os: 'windows-10-pro',
    region: 'us-east',
    applications: [],
    duration: 1
  });
  
  // Set initial configuration based on URL plan parameter
  useEffect(() => {
    if (planParam) {
      switch(planParam) {
        case 'basic':
          setConfiguration({
            ...configuration,
            cpu: 2,
            ram: 4,
            storage: 64
          });
          break;
        case 'standard':
          setConfiguration({
            ...configuration,
            cpu: 4,
            ram: 8,
            storage: 128
          });
          break;
        case 'premium':
          setConfiguration({
            ...configuration,
            cpu: 8,
            ram: 16,
            storage: 256
          });
          break;
        case 'enterprise':
          setConfiguration({
            ...configuration,
            cpu: 16,
            ram: 32,
            storage: 512
          });
          break;
      }
    }
  }, [planParam]);
  
  // Calculate price based on configuration
  useEffect(() => {
    let basePrice = 10; // Base price
    
    // CPU price
    basePrice += configuration.cpu * 5;
    
    // RAM price
    basePrice += configuration.ram * 2;
    
    // Storage price
    basePrice += configuration.storage * 0.2;
    
    // OS price
    if (configuration.os.includes('pro')) {
      basePrice += 10;
    } else if (configuration.os.includes('enterprise')) {
      basePrice += 20;
    }
    
    // Applications
    basePrice += configuration.applications.length * 5;
    
    // Duration discount/markup
    if (configuration.duration === 3) {
      basePrice = basePrice * 2.5;
    } else if (configuration.duration === 6) {
      basePrice = basePrice * 5;
    } else if (configuration.duration === 12) {
      basePrice = basePrice * 9;
    }
    
    setCurrentPrice(Math.round(basePrice));
  }, [configuration]);
  
  const handleAddToCart = () => {
    const rdpProduct = {
      id: Date.now().toString(),
      name: `Custom RDP (${configuration.cpu} CPU, ${configuration.ram}GB RAM)`,
      configuration,
      price: currentPrice
    };
    
    addToCart(rdpProduct);
    
    toast({
      title: "Added to cart",
      description: "Your custom RDP configuration has been added to the cart.",
    });
    
    navigate('/cart');
  };
  
  const applications = [
    { id: 'office', label: 'Microsoft Office Suite' },
    { id: 'adobe', label: 'Adobe Creative Cloud' },
    { id: 'dev-tools', label: 'Development Tools' },
    { id: 'db-server', label: 'Database Server' },
    { id: 'web-server', label: 'Web Server' },
    { id: 'antivirus', label: 'Enterprise Antivirus' }
  ];
  
  const handleApplicationToggle = (appId: string) => {
    setConfiguration(prev => {
      if (prev.applications.includes(appId)) {
        return {
          ...prev,
          applications: prev.applications.filter(id => id !== appId)
        };
      } else {
        return {
          ...prev,
          applications: [...prev.applications, appId]
        };
      }
    });
  };
  
  return (
    <div className="rdp-card p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-rdp-dark mb-6">Configure Your RDP</h2>
      
      <Tabs defaultValue="specs" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="specs">Hardware Specs</TabsTrigger>
          <TabsTrigger value="os">OS & Location</TabsTrigger>
          <TabsTrigger value="software">Software & Duration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specs" className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">CPU Cores: {configuration.cpu}</label>
              <span className="text-sm text-gray-500">${configuration.cpu * 5}/mo</span>
            </div>
            <Slider 
              value={[configuration.cpu]} 
              min={1} 
              max={32} 
              step={1} 
              onValueChange={(value) => setConfiguration({...configuration, cpu: value[0]})}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 Core</span>
              <span>32 Cores</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">RAM: {configuration.ram}GB</label>
              <span className="text-sm text-gray-500">${configuration.ram * 2}/mo</span>
            </div>
            <Slider 
              value={[configuration.ram]} 
              min={1} 
              max={64} 
              step={1} 
              onValueChange={(value) => setConfiguration({...configuration, ram: value[0]})}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1GB</span>
              <span>64GB</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Storage: {configuration.storage}GB SSD</label>
              <span className="text-sm text-gray-500">${(configuration.storage * 0.2).toFixed(2)}/mo</span>
            </div>
            <Slider 
              value={[configuration.storage]} 
              min={32} 
              max={1024} 
              step={32} 
              onValueChange={(value) => setConfiguration({...configuration, storage: value[0]})}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>32GB</span>
              <span>1TB</span>
            </div>
          </div>
          
          <Button className="w-full" onClick={() => setActiveTab("os")}>
            Next: OS & Location
          </Button>
        </TabsContent>
        
        <TabsContent value="os" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
            <Select 
              value={configuration.os} 
              onValueChange={(value) => setConfiguration({...configuration, os: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="windows-10-home">Windows 10 Home</SelectItem>
                <SelectItem value="windows-10-pro">Windows 10 Pro</SelectItem>
                <SelectItem value="windows-11-home">Windows 11 Home</SelectItem>
                <SelectItem value="windows-11-pro">Windows 11 Pro</SelectItem>
                <SelectItem value="windows-server-2019">Windows Server 2019</SelectItem>
                <SelectItem value="windows-server-2022">Windows Server 2022</SelectItem>
                <SelectItem value="ubuntu-20-04">Ubuntu 20.04 LTS</SelectItem>
                <SelectItem value="ubuntu-22-04">Ubuntu 22.04 LTS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <Select 
              value={configuration.region} 
              onValueChange={(value) => setConfiguration({...configuration, region: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                <SelectItem value="us-west">US West (Oregon)</SelectItem>
                <SelectItem value="eu-central">EU Central (Frankfurt)</SelectItem>
                <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                <SelectItem value="ap-south">Asia Pacific (Mumbai)</SelectItem>
                <SelectItem value="ap-southeast">Asia Pacific (Singapore)</SelectItem>
                <SelectItem value="ap-northeast">Asia Pacific (Tokyo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="w-1/2" onClick={() => setActiveTab("specs")}>
              Back
            </Button>
            <Button className="w-1/2" onClick={() => setActiveTab("software")}>
              Next: Software & Duration
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="software" className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Applications</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={app.id} 
                    checked={configuration.applications.includes(app.id)} 
                    onCheckedChange={() => handleApplicationToggle(app.id)}
                  />
                  <label 
                    htmlFor={app.id} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {app.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Save with longer terms)</label>
            <Select 
              value={configuration.duration.toString()} 
              onValueChange={(value) => setConfiguration({...configuration, duration: parseInt(value)})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month (Standard Price)</SelectItem>
                <SelectItem value="3">3 Months (Save 17%)</SelectItem>
                <SelectItem value="6">6 Months (Save 17%)</SelectItem>
                <SelectItem value="12">12 Months (Save 25%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="w-1/2" onClick={() => setActiveTab("os")}>
              Back
            </Button>
            <Button className="w-1/2 rdp-btn-primary" onClick={handleAddToCart}>
              Add to Cart - ${currentPrice}
              {configuration.duration > 1 ? ` (${configuration.duration} months)` : ''}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigBuilder;
