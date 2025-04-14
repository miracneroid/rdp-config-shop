
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { asUUID, processArrayResult, processQueryResult } from "@/utils/typeGuards";

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
    queryFn: () => Promise<{ data: any; error: PostgrestError | null }>
  ) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { data, error } = await queryFn();
      
      if (error) {
        console.error("Supabase query error:", error);
        setState({ data: null, error, loading: false });
        return null;
      }
      
      // Handle array results
      if (Array.isArray(data)) {
        const processedData = processArrayResult<T>(data);
        setState({ data: processedData as T, error: null, loading: false });
        return processedData;
      }
      
      // Handle single results
      setState({ data: data as T, error: null, loading: false });
      return data as T;
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

  /**
   * Helper function to execute queries with UUID-based parameters
   */
  const executeQueryWithUUID = async (
    tableName: string,
    idField: string,
    idValue: string,
    selectFields: string = '*'
  ) => {
    return executeQuery(() => 
      supabase
        .from(tableName)
        .select(selectFields)
        .eq(idField, asUUID(idValue))
        .maybeSingle()
    );
  };

  return {
    ...state,
    executeQuery,
    executeQueryWithUUID
  };
}
