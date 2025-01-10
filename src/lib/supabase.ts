import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://edukromjbphooiprhjjh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdWtyb21qYnBob29pcHJoampoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzkzNDYsImV4cCI6MjA1MTc1NTM0Nn0.Lbq5sX-JsHwVcYjTESBePy4HuOrcp6upz08Cyqa9t80';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 