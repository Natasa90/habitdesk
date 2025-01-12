import { ScrollView } from "react-native";
import { UserProfileTitle } from "@/components/userProfileElements/userProfileTitle";
import { UserProfileButtons } from "@/components/userProfileElements/userProfileButtons";

export const UserProfileScreen = () => {
 return (
  <ScrollView className="flex-1 space-y-6 p-6">
   <UserProfileTitle />
   <UserProfileButtons />
  </ScrollView>
 );
};
