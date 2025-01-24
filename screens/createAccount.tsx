import { View, ImageBackground } from "react-native";
import { CreateAccount } from "../components/Auth/CreateAccountForm";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const CreateAccountScreen = () => {
 const navigation = useTypedNavigation();

 const handleLogin = () => {
  navigation.navigate("Login");
 };

 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")}
   style={{ flex: 1, alignItems: "center" }}
  >
   <View className="p-9">
    <CreateAccount signIn={handleLogin} />
   </View>
  </ImageBackground>
 );
};
