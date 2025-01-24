import { ImageSourcePropType } from "react-native";

export interface LoginProps {
    signUp: () => void
    resetPassword: () => void; 
};

export interface CreateAccountProps {
    signIn: () => void; 
};

export interface ResetPasswordProps {
  resetPassword: () => void; 
};

export interface FormTitleProps {
  title: string
  logo: ImageSourcePropType; 
};
