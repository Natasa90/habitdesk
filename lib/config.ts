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
    ninjasApiKey: NINJA_QUOTES_KEY,
    ninjasApiUrl: NINJA_QUOTES_URL,
  };
  