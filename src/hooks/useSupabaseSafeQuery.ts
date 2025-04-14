
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

interface QueryState<T> {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
}

/**
 * A hook for safely performing Supabase queries with proper type handling
 */
export function useSupabaseSafeQuery<T>() {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    loading: false
  });

  const executeQuery = async (
    queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>
  ) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { data, error } = await queryFn();
      
      if (error) {
        console.error("Supabase query error:", error);
        setState({ data: null, error, loading: false });
        return null;
      }
      
      setState({ data, error: null, loading: false });
      return data;
    } catch (err) {
      console.error("Unexpected error during query:", err);
      setState({ 
        data: null, 
        error: { message: 'Unexpected error occurred', details: '', hint: '', code: '500' } as PostgrestError, 
        loading: false 
      });
      return null;
    }
  };

  return {
    ...state,
    executeQuery
  };
}
