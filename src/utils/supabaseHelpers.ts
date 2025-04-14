
import { supabase } from "@/integrations/supabase/client";
import { asUUID } from "./typeGuards";

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
          return query.select(columns).eq(column, asUUID(value));
        },
        match: (criteria: Record<string, any>) => {
          let builtQuery = query.select(columns);
          
          for (const [key, value] of Object.entries(criteria)) {
            const safeValue = typeof value === 'string' ? asUUID(value) : value;
            builtQuery = builtQuery.eq(key, safeValue);
          }
          
          return builtQuery;
        }
      };
    },
    update: (data: Record<string, any>) => {
      return {
        ...query.update(data),
        match: (criteria: Record<string, any>) => {
          let builtQuery = query.update(data);
          
          for (const [key, value] of Object.entries(criteria)) {
            const safeValue = typeof value === 'string' ? asUUID(value) : value;
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
          acc[key] = asUUID(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
      
      return query.insert(processedData);
    },
    delete: () => {
      return {
        ...query.delete(),
        match: (criteria: Record<string, any>) => {
          let builtQuery = query.delete();
          
          for (const [key, value] of Object.entries(criteria)) {
            const safeValue = typeof value === 'string' ? asUUID(value) : value;
            builtQuery = builtQuery.eq(key, safeValue);
          }
          
          return builtQuery;
        }
      };
    }
  };
}
