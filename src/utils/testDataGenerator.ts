
import { supabase } from "@/integrations/supabase/client";

export const generateTestUser = async (email: string, password: string) => {
  try {
    // Log the attempt to generate test data
    console.log("Attempting to generate test data for:", email);
    
    const { data, error } = await supabase.functions.invoke('generate-test-data', {
      body: { email, password }
    });

    if (error) {
      console.error("Error from edge function:", error);
      throw error;
    }
    
    console.log("Test data generation successful:", data);
    
    // If test@gmail.com is created, add the default RDP
    if (email === "test@gmail.com") {
      await addTestRdp(email);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error generating test data:", error);
    return { success: false, error };
  }
};

// Add a specific test RDP for test@gmail.com
export const addTestRdp = async (email: string) => {
  try {
    console.log("Attempting to add test RDP for:", email);
    
    if (email !== "test@gmail.com") {
      return { success: false, error: "This function only works for test@gmail.com" };
    }
    
    // Get the user ID for test@gmail.com
    const { data: userData, error: userError } = await supabase.auth.signInWithPassword({
      email: "test@gmail.com",
      password: "password123"
    });
    
    if (userError || !userData.user) {
      console.error("Error finding test user:", userError);
      return { success: false, error: userError || "User not found" };
    }
    
    const userId = userData.user.id;
    
    // Create a test RDP instance with 59 EUR price
    const { data: rdpInstance, error: rdpError } = await supabase
      .from('rdp_instances')
      .insert({
        user_id: userId,
        name: "Windows 11 Enterprise",
        username: "admin",
        password: "Test123!",
        ip_address: "192.168.1.101",
        port: "3389",
        status: "active",
        expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        plan_details: {
          cpu: "8 vCPU",
          ram: "32 GB",
          storage: "500 GB SSD",
          os: "Windows 11 Enterprise",
          bandwidth: "Unlimited"
        }
      })
      .select()
      .single();

    if (rdpError) {
      console.error("Error creating RDP instance:", rdpError);
      return { success: false, error: rdpError };
    }
    
    // Create an order for this RDP
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        rdp_instance_id: rdpInstance.id,
        invoice_number: `INV-${Date.now().toString().substring(0, 10)}`,
        payment_status: "paid",
        currency: "EUR",
        amount: 59.00,
        order_details: {
          items: [
            {
              name: "Windows 11 Enterprise RDP",
              quantity: 1,
              price: "€59.00",
              subtotal: "€59.00"
            }
          ],
          subtotal: "€59.00",
          tax: "€0.00",
          total: "€59.00"
        }
      });
      
    if (orderError) {
      console.error("Error creating order:", orderError);
      return { success: false, error: orderError };
    }
    
    return { 
      success: true, 
      data: { 
        rdpInstance,
        message: "Test RDP added successfully for test@gmail.com" 
      }
    };
  } catch (error) {
    console.error("Error adding test RDP:", error);
    return { success: false, error };
  }
};

// Check if user is admin
export const isUserAdmin = (): boolean => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin;
};
