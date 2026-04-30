import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Fallback to hardcoded values if env vars are not present
const supabaseUrl = 'https://rjeynhydlljfvwslumyd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZXluaHlkbGxqZnZ3c2x1bXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Mjg0MDgsImV4cCI6MjA5MzEwNDQwOH0.tyfVRCt1lywXpclrRBYGq67BZLU38tpq-tvXjZm8y5Q';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);