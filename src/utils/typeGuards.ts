
/**
 * Type guard to check if a value is not null or undefined
 */
export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard to check if a value has a specific property
 */
export function hasProperty<K extends string>(obj: unknown, prop: K): obj is { [key in K]: unknown } {
  return typeof obj === 'object' && obj !== null && prop in obj;
}

/**
 * Safely access properties that might not exist
 */
export function safelyAccessProperty<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  if (obj === null || obj === undefined) {
    return undefined;
  }
  return obj[key];
}

/**
 * Type guard for checking if an object has a specific structure
 * Useful for Supabase query results
 */
export function isQueryResultObject<T extends object>(obj: unknown, requiredProps: Array<keyof T>): obj is T {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  for (const prop of requiredProps) {
    if (!(prop in obj)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Type guard to check if an error object was returned
 */
export function isError(obj: any): obj is { error: string } {
  return typeof obj === 'object' && obj !== null && 'error' in obj;
}

/**
 * Type guard to check if value is array
 */
export function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

/**
 * Type guard for checking if an object is a single item (not an array)
 */
export function isSingleItem<T>(value: T | T[]): value is T {
  return !Array.isArray(value);
}

/**
 * Safely cast a value to the expected type using type assertion
 */
export function safeCast<T>(data: unknown): T {
  // This should be used with caution, preferably after validation
  return data as T;
}

/**
 * Convert a string value to a UUID-compatible format for Supabase
 * Use this before passing IDs to Supabase queries
 */
export function asUUID(id: string): string {
  // No actual conversion needed, just helps TypeScript know this is UUID-compatible
  return id;
}

/**
 * Process query results for Supabase with proper error handling
 */
export function processQueryResult<T>(data: unknown, error: any): { data: T | null, error: string | null } {
  if (error) {
    console.error('Query error:', error);
    return { data: null, error: error.message || 'Unknown error' };
  }
  
  // When data is null or undefined, return it as is
  if (data === null || data === undefined) {
    return { data: null, error: null };
  }
  
  // Safely cast to the expected type
  return { data: data as T, error: null };
}

/**
 * Safely process array results from Supabase
 */
export function processArrayResult<T>(data: unknown): T[] {
  if (!data) return [];
  if (!Array.isArray(data)) return [data as T];
  return data as T[];
}

/**
 * Safely cast Supabase query results to the expected type
 * This is useful when dealing with complex types from Supabase
 */
export function safeSupabaseCast<T>(data: any): T {
  return data as unknown as T;
}

/**
 * Helper function to safely handle UUID columns in Supabase
 */
export function asSupabaseUUID(id: string): any {
  // This is a workaround for TypeScript errors with UUID columns
  return id as any;
}
