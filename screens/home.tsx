import { ImageBackground } from "react-native";
import { HomeIntroduction } from "@/components/HomePageElements/HomeIntroduction";

export const HomeScreen = () => {
 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")} 
   style={{ flex: 1, justifyContent: "center", alignItems: "center" }} 
  >
   <HomeIntroduction />
  </ImageBackground>
 );
};
