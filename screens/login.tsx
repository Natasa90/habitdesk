import { ImageBackground } from "react-native";
import { LoginForm } from "../components/Auth/LoginForm";
import { FormTitle } from "@/components/Auth/FormTitle";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const LoginScreen = () => {
 const navigation = useTypedNavigation();

 const handleSignUp = () => {
  navigation.navigate("CreateAccount");
 };

 const handleResetPassword = () => {
  navigation.navigate("ResetPassword");
 };

 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")} 
   style={{ flex: 1, alignItems: "center" }} 
  >
   <FormTitle/>
   <LoginForm signUp={handleSignUp} resetPassword={handleResetPassword} />
  </ImageBackground>
 );
};
