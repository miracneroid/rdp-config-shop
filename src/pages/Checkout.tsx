
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from '@/context/CartContext';
import { useSettings } from "@/context/SettingsContext";
import { supabase } from "@/integrations/supabase/client";
import { generateInvoice, emailInvoice, emailRdpCredentials } from "@/utils/invoiceGenerator";
import { CreditCard, ShieldCheck, ArrowRight } from "lucide-react";

const billingFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 characters" }),
  country: z.string().min(2, { message: "Please select a country" }),
});

const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, { message: "Please enter a valid card number" }).max(19),
  cardName: z.string().min(2, { message: "Please enter the name on the card" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Please enter a valid expiry date (MM/YY)" }),
  cvv: z.string().min(3, { message: "Please enter a valid CVV" }).max(4),
});

type BillingFormValues = z.infer<typeof billingFormSchema>;
type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<"billing" | "payment" | "processing">("billing");
  const [billingInfo, setBillingInfo] = useState<BillingFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const { cart, getTotal, clearCart } = useCart();
  const { settings } = useSettings();
  const { toast } = useToast();
  const navigate = useNavigate();

  const billingForm = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Check if user is authenticated and redirect if not
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to continue with checkout.",
          variant: "destructive",
        });
        navigate("/login", { state: { redirectTo: "/checkout" } });
        return;
      }

      // Get user profile data if available
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setUserData({
        ...session.user,
        profile: profileData || {},
      });

      // Pre-fill the form with user data if available
      if (profileData) {
        const billingAddress = profileData.billing_address || {};
        
        billingForm.reset({
          firstName: profileData.first_name || "",
          lastName: profileData.last_name || "",
          email: session.user.email || "",
          phone: billingAddress.phone || "",
          address: billingAddress.address || "",
          city: billingAddress.city || "",
          state: billingAddress.state || "",
          zipCode: billingAddress.zip_code || "",
          country: billingAddress.country || "",
        });
      } else {
        // Just fill the email if no profile data
        billingForm.setValue("email", session.user.email || "");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, toast, billingForm]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
      });
      navigate("/configure");
    }
  }, [cart, navigate, toast]);

  const onBillingSubmit = (values: BillingFormValues) => {
    setBillingInfo(values);
    setCurrentStep("payment");
  };

  const onPaymentSubmit = async (values: PaymentFormValues) => {
    if (!billingInfo) return;
    
    setCurrentStep("processing");
    
    try {
      // 1. Save order to database
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const orderDetails = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: `${settings.currency.symbol}${item.price.toFixed(2)}`,
          quantity: item.quantity,
          subtotal: `${settings.currency.symbol}${(item.price * item.quantity).toFixed(2)}`,
          configuration: item.configuration
        }))
      };

      // Create the order in the database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          amount: getTotal(),
          currency: settings.currency.code,
          order_details: orderDetails,
          payment_status: "completed",
        })
        .select()
        .single();

      if (orderError) {
        throw new Error(`Failed to create order: ${orderError.message}`);
      }
      
      // Create an RDP instance for each item in the cart
      const rdpInstances = [];
      
      for (const item of cart) {
        // Generate random credentials for the RDP
        const username = `user_${Math.random().toString(36).substring(2, 8)}`;
        const password = Math.random().toString(36).substring(2, 15);
        
        // Calculate expiry date based on duration
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + item.configuration.duration);
        
        // Create RDP instance
        const { data: rdpInstance, error: rdpError } = await supabase
          .from("rdp_instances")
          .insert({
            user_id: user.id,
            name: item.name,
            username: username,
            password: password,
            plan_details: item.configuration,
            expiry_date: expiryDate.toISOString(),
          })
          .select()
          .single();
          
        if (rdpError) {
          console.error("Error creating RDP instance:", rdpError);
          continue;
        }
        
        rdpInstances.push(rdpInstance);
        
        // Link RDP instance to order
        if (rdpInstance) {
          await supabase
            .from("orders")
            .update({ rdp_instance_id: rdpInstance.id })
            .eq("id", order.id);
        }
      }

      // 2. Generate and email invoice
      const invoiceData = {
        orderNumber: Math.floor(Math.random() * 1000000),
        customer: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: billingInfo.email,
        },
        items: cart.map(item => ({
          description: `${item.name} (${item.configuration.duration} months)`,
          price: `${settings.currency.symbol}${(item.price * item.quantity).toFixed(2)}`,
        })),
        total: `${settings.currency.symbol}${getTotal().toFixed(2)}`,
        date: new Date().toLocaleDateString(),
      };

      const invoiceBlob = generateInvoice(invoiceData);
      emailInvoice(billingInfo.email, invoiceBlob);
      
      // 3. Email RDP credentials
      for (const rdp of rdpInstances) {
        emailRdpCredentials(
          billingInfo.email, 
          { username: rdp.username, password: rdp.password },
          `${rdp.name} - ${JSON.stringify(rdp.plan_details)}`
        );
      }

      // 4. Update user profile with billing info if it doesn't exist
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      const billingAddress = {
        address: billingInfo.address,
        city: billingInfo.city,
        state: billingInfo.state,
        zip_code: billingInfo.zipCode,
        country: billingInfo.country,
        phone: billingInfo.phone,
      };

      if (profile) {
        await supabase
          .from("profiles")
          .update({
            first_name: billingInfo.firstName || profile.first_name,
            last_name: billingInfo.lastName || profile.last_name,
            billing_address: billingAddress,
          })
          .eq("id", user.id);
      }

      // 5. Clear cart and show success message
      toast({
        title: "Order Successful!",
        description: "Your RDP is being provisioned. Details have been sent to your email.",
      });
      
      clearCart();
      
      // 6. Redirect to dashboard
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      setCurrentStep("payment");
    }
  };

  const formatCurrency = (amount: number) => {
    return `${settings.currency.symbol}${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Navbar />
        <div className="bg-gray-50 dark:bg-gray-900 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rdp-blue mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-4xl">Checkout</h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Complete your purchase to get your RDP up and running
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              {currentStep === "billing" && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 text-rdp-dark dark:text-white">Billing Information</h2>
                  <Form {...billingForm}>
                    <form onSubmit={billingForm.handleSubmit(onBillingSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={billingForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={billingForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={billingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={billingForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={billingForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={billingForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={billingForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={billingForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP/Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={billingForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                                <SelectItem value="IN">India</SelectItem>
                                <SelectItem value="DE">Germany</SelectItem>
                                <SelectItem value="FR">France</SelectItem>
                                <SelectItem value="JP">Japan</SelectItem>
                                <SelectItem value="SG">Singapore</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full mt-6">
                        Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </div>
              )}

              {currentStep === "payment" && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-rdp-dark dark:text-white">Payment</h2>
                    <button 
                      onClick={() => setCurrentStep("billing")}
                      className="text-sm text-rdp-blue dark:text-rdp-blue-light hover:underline"
                    >
                      Back to Billing
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <h3 className="text-md font-medium mb-2 text-rdp-dark dark:text-white">Billing Details</h3>
                    {billingInfo && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <p>{billingInfo.firstName} {billingInfo.lastName}</p>
                        <p>{billingInfo.email}</p>
                        <p>{billingInfo.address}</p>
                        <p>{billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}</p>
                        <p>{billingInfo.country}</p>
                      </div>
                    )}
                  </div>

                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                      <FormField
                        control={paymentForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} placeholder="1234 5678 9012 3456" />
                                <div className="absolute right-3 top-2.5 flex items-center">
                                  <img src="https://cdn.jsdelivr.net/gh/creativetimofficial/public-assets@master/logos/visa.jpg" alt="visa" className="h-5 mr-2" />
                                  <img src="https://cdn.jsdelivr.net/gh/creativetimofficial/public-assets@master/logos/mastercard.jpg" alt="mastercard" className="h-5" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date (MM/YY)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="12/25" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={paymentForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" placeholder="123" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center mt-4 text-sm text-rdp-dark dark:text-gray-300">
                        <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                        <p>Your payment information is secure and encrypted</p>
                      </div>

                      <Button type="submit" className="w-full mt-6">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay {formatCurrency(getTotal())}
                      </Button>
                    </form>
                  </Form>
                </div>
              )}

              {currentStep === "processing" && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rdp-blue mx-auto mb-6"></div>
                  <h2 className="text-xl font-semibold mb-2 text-rdp-dark dark:text-white">Processing Your Order</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Please wait while we process your payment and set up your RDP...
                  </p>
                </div>
              )}
            </div>

            <div className="md:w-1/3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-rdp-dark dark:text-white">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium text-rdp-dark dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.configuration.cpu} CPU, {item.configuration.ram}GB RAM, {item.configuration.storage}GB SSD
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-medium text-rdp-dark dark:text-white">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                    <p className="text-rdp-dark dark:text-white">{formatCurrency(getTotal())}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Tax</p>
                    <p className="text-rdp-dark dark:text-white">{formatCurrency(0)}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold">
                  <p className="text-rdp-dark dark:text-white">Total</p>
                  <p className="text-rdp-blue dark:text-rdp-blue-light text-xl">
                    {formatCurrency(getTotal())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
