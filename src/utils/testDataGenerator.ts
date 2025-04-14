
import { supabase } from "@/integrations/supabase/client";

export const generateTestUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-test-data', {
      body: { email, password }
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error generating test data:", error);
    return { success: false, error };
  }
};
