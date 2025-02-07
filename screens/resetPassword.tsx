import { View } from "react-native";
import { ResetPassword } from "../components/Auth/ResetPasswordForm";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";
import { ImageBackground } from "react-native";

export const ResetPasswordScreen = () => {
 const navigation = useTypedNavigation();

 const handleCancelReset = () => {
  navigation.navigate("Login");
 };

 return (
   <ResetPassword resetPassword={handleCancelReset} />
 );
};
