import { View } from "react-native";
import { LoginForm } from "../components/Auth/LoginForm";
import { FormTitle } from "@/components/Auth/FormTitle";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";
import { ImageBackground } from "react-native";

export const LoginScreen = () => {
 const navigation = useTypedNavigation();

 const handleSignUp = () => {
  navigation.navigate("CreateAccount");
 };

 const handleResetPassword = () => {
  navigation.navigate("ResetPassword");
 };

 return (
  <>
   <FormTitle />
   <LoginForm signUp={handleSignUp} resetPassword={handleResetPassword} />
  </>
 );
};
