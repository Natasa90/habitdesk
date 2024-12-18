import { 
    NINJA_QUOTES_KEY, 
    NINJA_QUOTES_URL, 
    SUPABASE_KEY, 
    SUPABASE_URL
} from "@env";

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
  