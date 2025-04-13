
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, DollarSign, EuroIcon, PoundSterling } from 'lucide-react';

const Settings = () => {
  const { settings, updateCurrency } = useSettings();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currencyCode, setCurrencyCode] = useState(settings.currency.code);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currency.symbol);
  const [currencyName, setCurrencyName] = useState(settings.currency.name);
  
  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: IndianRupee },
    { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
    { code: 'EUR', symbol: '€', name: 'Euro', icon: EuroIcon },
    { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
  ];
  
  const handleSetCurrency = (code: string, symbol: string, name: string) => {
    setCurrencyCode(code);
    setCurrencySymbol(symbol);
    setCurrencyName(name);
  };
  
  const handleSaveSettings = () => {
    updateCurrency(currencyCode, currencySymbol, currencyName);
    
    toast({
      title: "Settings Updated",
      description: `Currency has been set to ${currencyName} (${currencyCode})`,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow py-12 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-rdp-dark dark:text-white">System Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Currency Settings</CardTitle>
                <CardDescription>
                  Configure the default currency for your RDP service.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currencyCode">Currency Code</Label>
                      <Input 
                        id="currencyCode" 
                        value={currencyCode} 
                        onChange={(e) => setCurrencyCode(e.target.value)} 
                        placeholder="INR"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currencySymbol">Currency Symbol</Label>
                      <Input 
                        id="currencySymbol" 
                        value={currencySymbol} 
                        onChange={(e) => setCurrencySymbol(e.target.value)} 
                        placeholder="₹"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currencyName">Currency Name</Label>
                    <Input 
                      id="currencyName" 
                      value={currencyName} 
                      onChange={(e) => setCurrencyName(e.target.value)} 
                      placeholder="Indian Rupee"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-3">Quick Select:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currencies.map((currency) => (
                        <Button
                          key={currency.code}
                          variant={currencyCode === currency.code ? "default" : "outline"}
                          className="flex items-center"
                          onClick={() => handleSetCurrency(currency.code, currency.symbol, currency.name)}
                        >
                          <currency.icon className="w-4 h-4 mr-2" />
                          {currency.code}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings} className="rdp-btn-primary">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Current Settings</CardTitle>
                <CardDescription>
                  Active system configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Currency</h3>
                    <p className="text-lg font-medium">
                      {settings.currency.name} ({settings.currency.code}) {settings.currency.symbol}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
