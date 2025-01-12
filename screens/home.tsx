import { ScrollView } from "react-native";
import { HomeIntroduction } from "@/components/HomePageElements/HomeIntroduction";

export const HomeScreen = () => {

 return (
  <ScrollView className="bg-grayScreen p-9">
   <HomeIntroduction />
  </ScrollView>
 );
};
