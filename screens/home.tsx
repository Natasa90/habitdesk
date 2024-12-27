import { View } from "react-native";
import { HomeIntroduction } from "@/components/HomePageElements/HomeIntroduction";

export const HomeScreen = () => {

  return (
    <View className="bg-grayScreen p-10">
      <HomeIntroduction />      
    </View>
   );
};