import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth/FormTitle";
import { UserProfileTitle } from "@/components/userProfileElements/userProfileTitle";
import { UserProfileButtons } from "@/components/userProfileElements/userProfileButtons";
import { UserWeeklyGoalsForm } from "@/components/userProfileElements/UserWeeklyGoals";
import { ToDoList } from "@/components/userProfileElements/ToDoList";

export const UserProfileScreen = () => {
 return (
  <ScrollView className="flex-1 mt-10 px-9">
   <FormTitle />
   <UserProfileTitle />
   <UserWeeklyGoalsForm />
   <ToDoList />
   <UserProfileButtons />
  </ScrollView>
 );
};
