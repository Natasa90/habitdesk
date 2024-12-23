import { Platform } from "react-native";
import { 
    NINJA_QUOTES_KEY, 
    NINJA_QUOTES_URL, 
    SUPABASE_KEY, 
} from "@env";

let SUPABASE_URL; 


if (Platform.OS === 'android') {
    SUPABASE_URL = 'http://10.0.2.2:8000'; 
} else {
    SUPABASE_URL = 'http://192.168.1.15'; 
}

export const CONFIG = {
    supabase: {
        url: SUPABASE_URL,
        key: SUPABASE_KEY,
    },
    ninjaQuotes: {
        url: NINJA_QUOTES_URL,
        key: NINJA_QUOTES_KEY,
    }
  };

  