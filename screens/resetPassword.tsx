import { View } from "react-native";
import { ResetPassword } from "../components/Auth/ResetPasswordForm";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const ResetPasswordScreen = () => {

 const navigation = useTypedNavigation();

 const handleCancelReset = () => {
  navigation.navigate("Login");
 };

 return (
  <View className="bg-grayScreen p-9">
   <ResetPassword resetPassword={handleCancelReset} />
  </View>
 );
};
