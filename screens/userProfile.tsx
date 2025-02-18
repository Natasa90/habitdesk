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

 return (
  <ScrollView className="flex-1 mt-8 px-7">
   <FormTitle />
   <UserProfileTitle />
   <UserWeeklyGoalsForm setShowUserForm={() => {}} />
   <ToDoList />
   <UserProfileButtons />
  </ScrollView>
 );
};
