import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";

interface UserInfo {
    email?: string; // Only include what you need
}

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
};