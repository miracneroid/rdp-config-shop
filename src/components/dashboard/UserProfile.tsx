
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { User, Loader2, Camera, Upload, ImagePlus } from "lucide-react";
import AvatarSelector from "../AvatarSelector";

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
  avatar_character: string | null;
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
  avatar_character: string | null;
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
  
  // Email change state
  const [userEmail, setUserEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  
  // Avatar dialog state
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  
  // Upload image state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) throw new Error("User not found");
      
      setUserEmail(userData.user.email || "");
      
      // Check if user has a Google profile picture
      const { provider_id, user_metadata } = userData.user.app_metadata || {};
      let googleAvatarUrl = null;
      
      if (provider_id === 'google' && user_metadata) {
        googleAvatarUrl = user_metadata.avatar_url || null;
      }
      
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
        
        // If there's a Google avatar and user doesn't have a custom avatar yet, update the profile
        if (googleAvatarUrl && !supabaseProfile.avatar_url) {
          await supabase
            .from('profiles')
            .update({ 
              avatar_url: googleAvatarUrl,
              updated_at: new Date().toISOString()
            })
            .eq('id', userData.user.id);
            
          supabaseProfile.avatar_url = googleAvatarUrl;
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

  const handleAvatarSelected = async (avatarUrl: string, character: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Update the user's profile with the new avatar
        await supabase
          .from('profiles')
          .update({ 
            avatar_url: avatarUrl,
            avatar_character: character,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
        
        // Update local state
        if (profile) {
          setProfile({
            ...profile,
            avatar_url: avatarUrl,
            avatar_character: character
          });
        }
        
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated."
        });
        
        setAvatarDialogOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error updating avatar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    setUploading(true);
    
    try {
      // Get current user before proceeding
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Upload the file to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      // Check if profile exists before updating
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
        
      if (profileCheckError) {
        console.error("Error checking profile:", profileCheckError);
      }
      
      // Update the profile with the new avatar URL
      if (existingProfile) {
        // Profile exists, update it
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            avatar_url: data.publicUrl,
            avatar_character: null, // Clear character since we're using a custom image
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (updateError) throw updateError;
      } else {
        // Profile doesn't exist, insert it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            avatar_url: data.publicUrl,
            avatar_character: null,
            updated_at: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          avatar_url: data.publicUrl,
          avatar_character: null
        });
      }
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been uploaded successfully."
      });
      
      setUploadDialogOpen(false);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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

  // Handle initiating email change
  const initiateEmailChange = async () => {
    if (!newEmail) {
      toast({
        title: "Error",
        description: "Please enter a new email address",
        variant: "destructive",
      });
      return;
    }
    
    if (newEmail === userEmail) {
      toast({
        title: "No change needed",
        description: "The new email address is the same as your current one",
        variant: "destructive",
      });
      return;
    }
    
    setIsChangingEmail(true);
    
    try {
      // Send OTP to the new email
      setOtpSending(true);
      
      const { error } = await supabase.auth.signInWithOtp({
        email: newEmail,
        options: {
          shouldCreateUser: false,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${newEmail}`,
      });
      
      // Open OTP verification dialog
      setOtpDialogOpen(true);
    } catch (error: any) {
      toast({
        title: "Error sending verification code",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setOtpSending(false);
      setIsChangingEmail(false);
    }
  };
  
  // Handle OTP verification and email change
  const verifyOtpAndChangeEmail = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    setOtpVerifying(true);
    
    try {
      // Verify OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email: newEmail,
        token: otpCode,
        type: 'email',
      });
      
      if (error) throw error;
      
      // Update the user's email in Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
      });
      
      if (updateError) throw updateError;
      
      toast({
        title: "Email updated",
        description: `Your email has been changed to ${newEmail}`,
      });
      
      // Refresh the profile data
      setUserEmail(newEmail);
      setNewEmail("");
      setOtpCode("");
      setOtpDialogOpen(false);
      
    } catch (error: any) {
      toast({
        title: "Error verifying code",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setOtpVerifying(false);
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

  const handleAvatarClick = () => {
    setAvatarDialogOpen(true);
  };
  
  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="account">Account Information</TabsTrigger>
          <TabsTrigger value="billing">Billing Address</TabsTrigger>
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
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-background"
                      onClick={handleAvatarClick}
                      title="Choose from avatars"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-background"
                      onClick={handleUploadClick}
                      title="Upload custom image"
                    >
                      <ImagePlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click the avatar to change your profile picture
                </p>
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
                <div className="flex flex-col space-y-4">
                  <Input 
                    value={userEmail}
                    disabled
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="New email address"
                    />
                    <Button 
                      onClick={initiateEmailChange}
                      disabled={otpSending || !newEmail}
                    >
                      {otpSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Change Email"
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    To change your email address, enter your new email and click "Change Email". 
                    A verification code will be sent to confirm the change.
                  </p>
                </div>
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
      </Tabs>
      
      {/* OTP Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Email Change</DialogTitle>
            <DialogDescription>
              Enter the 6-digit verification code sent to {newEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center space-y-4">
            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <Button 
              onClick={verifyOtpAndChangeEmail} 
              disabled={otpVerifying || otpCode.length !== 6}
              className="mt-4 w-full"
            >
              {otpVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify and Change Email"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Avatar Dialog */}
      <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose your avatar</DialogTitle>
          </DialogHeader>
          <AvatarSelector onAvatarSelected={handleAvatarSelected} currentCharacter={profile?.avatar_character || null} />
        </DialogContent>
      </Dialog>
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload profile picture</DialogTitle>
            <DialogDescription>
              Upload a custom image to use as your profile picture
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={triggerFileInput}
            >
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or GIF (max. 5MB)</p>
              
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            
            <Button 
              onClick={triggerFileInput}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Select Image"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
