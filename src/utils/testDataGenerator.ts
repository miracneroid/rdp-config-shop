
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
    return { success: true, data };
  } catch (error) {
    console.error("Error generating test data:", error);
    return { success: false, error };
  }
};

// Check if user is admin
export const isUserAdmin = (): boolean => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin;
};
