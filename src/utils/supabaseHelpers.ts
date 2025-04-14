
import { supabase } from "@/integrations/supabase/client";
import { asSupabaseUUID, safeSupabaseCast } from "./typeGuards";

/**
 * Helper function to correctly handle the UUID/string type issues with Supabase queries
 */
export function supabaseQueryBuilder(table: string) {
  const query = supabase.from(table);
  
  return {
    select: (columns: string = '*') => {
      return {
        ...query.select(columns),
        // Override standard methods to handle UUID conversions
        eq: (column: string, value: string) => {
          return query.select(columns).eq(column, asSupabaseUUID(value));
        },
        match: (criteria: Record<string, any>) => {
          let builtQuery = query.select(columns);
          
          for (const [key, value] of Object.entries(criteria)) {
            const safeValue = typeof value === 'string' ? asSupabaseUUID(value) : value;
            builtQuery = builtQuery.eq(key, safeValue);
          }
          
          return builtQuery;
        }
      };
    },
    update: (data: Record<string, any>) => {
      return {
        ...query.update(data as any),
        match: (criteria: Record<string, any>) => {
          let builtQuery = query.update(data as any);
          
          for (const [key, value] of Object.entries(criteria)) {
            const safeValue = typeof value === 'string' ? asSupabaseUUID(value) : value;
            builtQuery = builtQuery.eq(key, safeValue);
          }
          
          return builtQuery;
        }
      };
    },
    insert: (data: Record<string, any>) => {
      // Process any ID fields to ensure UUID compatibility
      const processedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (key.endsWith('_id') && typeof value === 'string') {
          acc[key] = asSupabaseUUID(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
      
      return query.insert(processedData as any);
    },
    delete: () => {
      return {
        ...query.delete(),
        match: (criteria: Record<string, any>) => {
          let builtQuery = query.delete();
          
          for (const [key, value] of Object.entries(criteria)) {
            const safeValue = typeof value === 'string' ? asSupabaseUUID(value) : value;
            builtQuery = builtQuery.eq(key, safeValue);
          }
          
          return builtQuery;
        }
      };
    }
  };
}

/**
 * Helper function for common Supabase operations with proper TypeScript typing
 */
export function supabaseHelper<T = any>(tableName: string) {
  return {
    getAll: async (): Promise<T[]> => {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return [];
      }
      return safeSupabaseCast<T[]>(data || []);
    },
    
    getById: async (id: string): Promise<T | null> => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', asSupabaseUUID(id))
        .maybeSingle();
        
      if (error) {
        console.error(`Error fetching ${tableName} by id:`, error);
        return null;
      }
      return safeSupabaseCast<T>(data);
    },
    
    getByField: async (field: string, value: any): Promise<T[]> => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(field, typeof value === 'string' ? asSupabaseUUID(value) : value);
        
      if (error) {
        console.error(`Error fetching ${tableName} by ${field}:`, error);
        return [];
      }
      return safeSupabaseCast<T[]>(data || []);
    },
    
    insert: async (item: Partial<T>): Promise<T | null> => {
      const { data, error } = await supabase
        .from(tableName)
        .insert(item as any)
        .select()
        .single();
        
      if (error) {
        console.error(`Error inserting into ${tableName}:`, error);
        return null;
      }
      return safeSupabaseCast<T>(data);
    },
    
    update: async (id: string, updates: Partial<T>): Promise<T | null> => {
      const { data, error } = await supabase
        .from(tableName)
        .update(updates as any)
        .eq('id', asSupabaseUUID(id))
        .select()
        .single();
        
      if (error) {
        console.error(`Error updating ${tableName}:`, error);
        return null;
      }
      return safeSupabaseCast<T>(data);
    },
    
    delete: async (id: string): Promise<boolean> => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', asSupabaseUUID(id));
        
      if (error) {
        console.error(`Error deleting from ${tableName}:`, error);
        return false;
      }
      return true;
    }
  };
}
