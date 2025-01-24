import { ImageBackground, View } from "react-native";
import { ResetPassword } from "../components/Auth/ResetPasswordForm";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const ResetPasswordScreen = () => {
 const navigation = useTypedNavigation();

 const handleCancelReset = () => {
  navigation.navigate("Login");
 };

 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")}
   style={{ flex: 1, alignItems: "center" }}
  >
   <View className="p-9">
    <ResetPassword resetPassword={handleCancelReset} />
   </View>
  </ImageBackground>
 );
};
