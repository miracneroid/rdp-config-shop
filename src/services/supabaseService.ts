
import { supabase } from "@/integrations/supabase/client";
import { asUUID, processArrayResult, processQueryResult } from "@/utils/typeGuards";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Safely fetches data from Supabase with proper error handling
 * @param tableName The name of the table to query
 * @param options Query options
 */
export async function fetchData<T>(
  tableName: string,
  options: {
    select?: string;
    match?: Record<string, any>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
    single?: boolean;
  } = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    let query = supabase.from(tableName).select(options.select || '*');

    // Apply filters
    if (options.match) {
      Object.entries(options.match).forEach(([key, value]) => {
        // Use asUUID for string IDs to help with TypeScript
        const safeValue = typeof value === 'string' ? asUUID(value) : value;
        query = query.eq(key, safeValue);
      });
    }

    // Apply ordering
    if (options.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending ?? false 
      });
    }

    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }

    // Execute the query
    const { data, error } = options.single 
      ? await query.maybeSingle() 
      : await query;

    if (error) throw error;
    
    // For single results, return as is
    if (options.single) {
      return processQueryResult<T>(data, null);
    }
    
    // For array results, ensure we return the proper type
    const processedData = processArrayResult<T>(data);
    return { data: processedData as T, error: null };
  } catch (error: any) {
    console.error(`Error in fetchData(${tableName}):`, error);
    return { data: null, error: error.message || 'Unknown error occurred' };
  }
}

/**
 * Safely inserts data into Supabase with proper error handling
 */
export async function insertData<T>(
  tableName: string, 
  data: Record<string, any>
): Promise<{ data: T | null; error: string | null }> {
  try {
    // Convert any string IDs to UUID format
    const processedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (key.endsWith('_id') && typeof value === 'string') {
        acc[key] = asUUID(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(processedData)
      .select()
      .single();

    return processQueryResult<T>(result, error);
  } catch (error: any) {
    console.error(`Error in insertData(${tableName}):`, error);
    return { data: null, error: error.message || 'Unknown error occurred' };
  }
}

/**
 * Safely updates data in Supabase with proper error handling
 */
export async function updateData<T>(
  tableName: string,
  match: Record<string, any>,
  data: Record<string, any>
): Promise<{ data: T | null; error: string | null }> {
  try {
    let query = supabase.from(tableName).update(data);
    
    // Apply match criteria for the update
    Object.entries(match).forEach(([key, value]) => {
      // Convert string IDs to UUID format
      const safeValue = typeof value === 'string' ? asUUID(value) : value;
      query = query.eq(key, safeValue);
    });
    
    const { data: result, error } = await query.select().single();
    
    return processQueryResult<T>(result, error);
  } catch (error: any) {
    console.error(`Error in updateData(${tableName}):`, error);
    return { data: null, error: error.message || 'Unknown error occurred' };
  }
}

/**
 * Safely deletes data from Supabase with proper error handling
 */
export async function deleteData(
  tableName: string,
  match: Record<string, any>
): Promise<{ success: boolean; error: string | null }> {
  try {
    let query = supabase.from(tableName).delete();
    
    // Apply match criteria for the delete
    Object.entries(match).forEach(([key, value]) => {
      // Convert string IDs to UUID format
      const safeValue = typeof value === 'string' ? asUUID(value) : value;
      query = query.eq(key, safeValue);
    });
    
    const { error } = await query;
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error(`Error in deleteData(${tableName}):`, error);
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
}

/**
 * Run a custom query using Supabase's PostgreSQL functions
 */
export async function runFunction<T>(
  functionName: string,
  params: Record<string, any>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const { data, error } = await supabase.rpc(functionName, params);
    return processQueryResult<T>(data, error);
  } catch (error: any) {
    console.error(`Error in runFunction(${functionName}):`, error);
    return { data: null, error: error.message || 'Unknown error occurred' };
  }
}
