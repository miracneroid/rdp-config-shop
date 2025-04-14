
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
 * Processes Supabase query results and provides proper TypeScript typing
 */
export function processQueryResult<T>(data: T | null, error: any): { data: T | null, error: string | null } {
  if (error) {
    console.error('Query error:', error);
    return { data: null, error: error.message || 'Unknown error' };
  }
  return { data, error: null };
}
