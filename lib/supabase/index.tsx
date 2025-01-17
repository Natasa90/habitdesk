import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { CONFIG } from "../config";

const SUPABASE_CONFIG = CONFIG.supabase;

if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.key) {
  throw new Error("Supabase URL or Key is missing from the configuration.");
}

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, {
    auth: {
        storage: AsyncStorage, 
        autoRefreshToken: false,
        persistSession: true,
        detectSessionInUrl: false, 
        },
    global: {
        headers: {
        apikey: SUPABASE_CONFIG.key,
        },
    },
});
