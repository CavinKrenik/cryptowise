import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://mkzswizhwsxfsefosnhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1renN3aXpod3N4ZnNlZm9zbmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTc5MjgsImV4cCI6MjA2MzU5MzkyOH0.zc_DOBDwT9HSxKAn52Exi_m4lqnLNnSSgE9NkihyW-4';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };