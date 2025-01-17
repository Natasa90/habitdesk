import { Dispatch, SetStateAction } from "react";

export interface UserInfo {
    email?: string; // Only include what you need
}

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
};