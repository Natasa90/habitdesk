import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { CONFIG } from "../config";

const { url, key } = CONFIG.supabase;

if (!url || !key) {
  throw new Error("Supabase URL or Key is missing from the configuration.");
};

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, 
  },
});
