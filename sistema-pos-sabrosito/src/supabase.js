import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntvkanbmodphjkwnqdmx.supabase.co'; // ← tu URL real
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dmthbmJtb2RwaGprd25xZG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NTAxNzgsImV4cCI6MjA3NjMyNjE3OH0.Hm399k9V8qMzit_AR6Cp5jENO13_Y7tLSLbbrawoiYk';

export const supabase = createClient(supabaseUrl, supabaseKey);