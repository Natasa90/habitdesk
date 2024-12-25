// UserContext.tsx
import { createContext } from "react";
import { UserContextProps } from "../Types/User";

export const UserInfoContext = createContext<UserContextProps>({
	userInfo: null,
	setUserInfo: () => {}, 
});
