
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/context/SettingsContext";
import { Json } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, DollarSign, IndianRupee, EuroIcon, PoundSterling } from "lucide-react";

interface BillingAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  billing_address: BillingAddress | null;
  preferred_currency: string;
}

// Define an interface that matches what comes from Supabase
interface SupabaseProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  billing_address: Json | null;
  preferred_currency: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
  });
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const { settings, updateCurrency } = useSettings();
  const { toast } = useToast();

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee", icon: IndianRupee },
    { code: "USD", symbol: "$", name: "US Dollar", icon: DollarSign },
    { code: "EUR", symbol: "€", name: "Euro", icon: EuroIcon },
    { code: "GBP", symbol: "£", name: "British Pound", icon: PoundSterling },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) throw new Error("User not found");
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        const supabaseProfile = data as SupabaseProfile;
        
        // Convert from Supabase Json type to our BillingAddress type
        let billingAddressData: BillingAddress | null = null;
        if (supabaseProfile.billing_address) {
          const billingAddressJson = supabaseProfile.billing_address as any;
          billingAddressData = {
            address1: billingAddressJson.address1 || "",
            address2: billingAddressJson.address2 || "",
            city: billingAddressJson.city || "",
            state: billingAddressJson.state || "",
            zip: billingAddressJson.zip || "",
            country: billingAddressJson.country || "",
          };
        }
        
        const formattedProfile: Profile = {
          ...supabaseProfile,
          billing_address: billingAddressData
        };
        
        setProfile(formattedProfile);
        setUserDetails({
          firstName: formattedProfile.first_name || "",
          lastName: formattedProfile.last_name || "",
          displayName: formattedProfile.display_name || "",
        });
        
        if (formattedProfile.billing_address) {
          setBillingAddress(formattedProfile.billing_address);
        }
        
        if (formattedProfile.preferred_currency) {
          const currency = currencies.find(c => c.code === formattedProfile.preferred_currency);
          if (currency) {
            updateCurrency(currency.code, currency.symbol, currency.name);
          }
        }
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) throw new Error("User not found");
      
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
          display_name: userDetails.displayName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userData.user.id);

      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      fetchProfile();
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateBillingAddress = async () => {
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) throw new Error("User not found");
      
      // Convert BillingAddress to Json-compatible object
      const billingAddressJson = billingAddress as unknown as Json;
      
      const { error } = await supabase
        .from("profiles")
        .update({
          billing_address: billingAddressJson,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userData.user.id);

      if (error) throw error;
      
      toast({
        title: "Billing address updated",
        description: "Your billing address has been updated successfully.",
      });
      
      fetchProfile();
    } catch (error: any) {
      toast({
        title: "Error updating billing address",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePreferredCurrency = async (code: string, symbol: string, name: string) => {
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) throw new Error("User not found");
      
      const { error } = await supabase
        .from("profiles")
        .update({
          preferred_currency: code,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userData.user.id);

      if (error) throw error;
      
      updateCurrency(code, symbol, name);
      
      toast({
        title: "Currency preference updated",
        description: `Your preferred currency has been set to ${name}.`,
      });
      
      fetchProfile();
    } catch (error: any) {
      toast({
        title: "Error updating currency preference",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (userDetails.firstName && userDetails.lastName) {
      return `${userDetails.firstName.charAt(0)}${userDetails.lastName.charAt(0)}`;
    } else if (userDetails.displayName) {
      const parts = userDetails.displayName.split(' ');
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`;
      }
      return userDetails.displayName.charAt(0);
    }
    return "U";
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="account">Account Information</TabsTrigger>
          <TabsTrigger value="billing">Billing Address</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input 
                    value={userDetails.firstName} 
                    onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                    placeholder="Your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input 
                    value={userDetails.lastName} 
                    onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input 
                  value={userDetails.displayName} 
                  onChange={(e) => setUserDetails({ ...userDetails, displayName: e.target.value })}
                  placeholder="How you want to be addressed"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={(supabase.auth.getUser().then(({data}) => data.user?.email) as unknown) as string} 
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <p className="text-xs text-muted-foreground">
                  Email address cannot be changed
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={updateProfile} 
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>
                Update your billing information for invoices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Address Line 1</label>
                <Input 
                  value={billingAddress.address1} 
                  onChange={(e) => setBillingAddress({ ...billingAddress, address1: e.target.value })}
                  placeholder="Street address, P.O. box, company name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Address Line 2</label>
                <Input 
                  value={billingAddress.address2} 
                  onChange={(e) => setBillingAddress({ ...billingAddress, address2: e.target.value })}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input 
                    value={billingAddress.city} 
                    onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State / Province</label>
                  <Input 
                    value={billingAddress.state} 
                    onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                    placeholder="State or province"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ZIP / Postal Code</label>
                  <Input 
                    value={billingAddress.zip} 
                    onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
                    placeholder="ZIP or postal code"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input 
                    value={billingAddress.country} 
                    onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                    placeholder="Country"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={updateBillingAddress} 
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Address"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Preferred Currency</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select your preferred currency for payments and invoices
                </p>
                <div className="flex flex-wrap gap-2">
                  {currencies.map((currency) => (
                    <Button
                      key={currency.code}
                      variant={settings.currency.code === currency.code ? "default" : "outline"}
                      className="flex items-center"
                      onClick={() => updatePreferredCurrency(currency.code, currency.symbol, currency.name)}
                      disabled={saving}
                    >
                      <currency.icon className="w-4 h-4 mr-2" />
                      {currency.code} - {currency.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Current Settings</h3>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Currency</span>
                    <span className="font-medium">
                      {settings.currency.name} ({settings.currency.code}) {settings.currency.symbol}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
