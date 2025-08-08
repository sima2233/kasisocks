import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whwdkbomvzifsduvevfx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indod2RrYm9tdnppZnNkdXZldmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg4NTAsImV4cCI6MjA3MDI0NDg1MH0.OzVfi9sLKySbUueC-b7T580-93tLE_a_bqzfN7xrDII';

export const supabase = createClient(supabaseUrl, supabaseKey);
