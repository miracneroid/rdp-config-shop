
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mbvsottvfclwoswykxfy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1idnNvdHR2ZmNsd29zd3lreGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MzA0NTIsImV4cCI6MjA2MDAwNjQ1Mn0.FylA99zKt2mE2-GJ1AyKSlE5lG04S43T6XZK_gFGqUw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
    detectSessionInUrl: true,
    flowType: 'pkce',
  }
});

// Helper function to safely cast database results
export function safeSupabaseCast<T>(data: any): T[] {
  return (data || []) as T[];
}

// Helper function to validate UUID for Supabase
export function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// Helper function to safely cast UUIDs for Supabase queries
export function asSupabaseUUID(id: string): string {
  if (!isValidUUID(id)) {
    console.error(`Invalid UUID format: ${id}`);
    // Return a fallback valid UUID format to prevent runtime errors
    // This would likely result in no data found, which is better than a crash
    return '00000000-0000-0000-0000-000000000000';
  }
  return id;
}

// Get the current site URL for OAuth redirects
export function getSiteUrl() {
  return window.location.origin;
}
