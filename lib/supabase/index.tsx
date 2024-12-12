import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'; 

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for React Native
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable as React Native does not use URLs
  },
});
