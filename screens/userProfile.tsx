import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth";
import {
 UserProfileTitle,
 UserWeeklyGoalsForm,
 ToDoList,
 UserProfileButtons,
} from "@/components/userProfileElements";

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
