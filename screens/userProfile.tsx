import { ScrollView } from "react-native";
import { UserProfileTitle } from "@/components/userProfileElements/userProfileTitle";
import { UserProfileButtons } from "@/components/userProfileElements/userProfileButtons";
import { UserWeeklyGoalsForm } from "@/components/userProfileElements/UserWeeklyGoals";

export const UserProfileScreen = () => {
 return (
  <ScrollView className="flex-1 mt-10 px-9">
   <UserProfileTitle />
   <UserWeeklyGoalsForm />
   <UserProfileButtons />
  </ScrollView>
 );
};
