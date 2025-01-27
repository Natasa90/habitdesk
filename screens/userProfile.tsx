import { ImageBackground, ScrollView } from "react-native";
import { UserProfileTitle } from "@/components/userProfileElements/userProfileTitle";
import { UserProfileButtons } from "@/components/userProfileElements/userProfileButtons";
import { UserWeeklyGoalsForm } from "@/components/userProfileElements/UserWeeklyGoals";

export const UserProfileScreen = () => {
 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")}
   style={{ flex: 1, alignItems: "center" }}
  >
   <ScrollView className="flex-1 mt-10 p-9">
    <UserProfileTitle />
    <UserWeeklyGoalsForm />
    <UserProfileButtons />
   </ScrollView>
  </ImageBackground>
 );
};
