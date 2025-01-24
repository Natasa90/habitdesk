import { View, ImageBackground } from "react-native";
import { UserProfileTitle } from "@/components/userProfileElements/userProfileTitle";
import { UserProfileButtons } from "@/components/userProfileElements/userProfileButtons";

export const UserProfileScreen = () => {
 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")}
   style={{ flex: 1, alignItems: "center" }}
  >
   <View className="flex-1 my-16 p-6">
    <UserProfileTitle />
    <UserProfileButtons />
   </View>
  </ImageBackground>
 );
};
