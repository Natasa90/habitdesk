import { View, ImageBackground } from "react-native";
import { HomeIntroduction } from "@/components/HomePageElements/HomeIntroduction";

export const HomeScreen = () => {

 return (
<ImageBackground
   source={require("../assets/images/home-bg.jpeg")} // Update the path to your background image
   style={{ flex: 1, justifyContent: "center", alignItems: "center" }} // Make the background fill the screen
  >
  <View className="p-9 mt-14">
   <HomeIntroduction />
  </View>
</ImageBackground>
 );
};
