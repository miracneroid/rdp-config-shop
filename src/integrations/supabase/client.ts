// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mbvsottvfclwoswykxfy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1idnNvdHR2ZmNsd29zd3lreGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MzA0NTIsImV4cCI6MjA2MDAwNjQ1Mn0.FylA99zKt2mE2-GJ1AyKSlE5lG04S43T6XZK_gFGqUw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);