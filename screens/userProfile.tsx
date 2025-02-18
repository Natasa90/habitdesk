import { useState } from "react";
import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth";
import {
 UserProfileTitle,
 ToDoList,
 UserProfileButtons,
} from "@/components/userProfileElements";
import { UserWeeklyGoalsForm } from "@/components/userProfileElements/WeeklyGoals";

export const UserProfileScreen = () => {
 const [showForm, setShowForm] = useState(false);
 return (
  <ScrollView className="flex-1 mt-10 px-9">
   <FormTitle />
   <UserProfileTitle />
   <UserWeeklyGoalsForm setShowUserForm={setShowForm} />
   <ToDoList />
   <UserProfileButtons />
  </ScrollView>
 );
};
