import React, { FC, useState, useEffect, useMemo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";
import { UserInfoContext } from "@/context/UserInfoContext";
import supabase from "@/lib/supabase";
import { UserCalendar } from "@/components/PorchElements/Calendar";
import { WeeklyGoalForm } from "../WeeklyGoalsForm";
import { WeeklyGoalFormProps } from "@/Types/UserProfileTypes";

export const UserWeeklyGoalsForm: FC<WeeklyGoalFormProps> = ({
 setShowUserForm,
}) => {
 const [showUpdateGoals, setShowUpdateGoals] = useState<boolean>(false);
 const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
 const [currentStreak, setCurrentStreak] = useState<number>(0);
 const [longestStreak, setLongestStreak] = useState<number>(0);
 const [weeklyLearningDays, setWeeklyLearningDays] = useState<number>(0);
 const [learningDates, setLearningDates] = useState<
  { date: string; count: number }[]
 >([]);
 const { userInfo } = useContext(UserInfoContext);

 useEffect(() => {
  if (userInfo?.email) {
   fetchUserAndLearningData();
  }
 }, [userInfo?.email]);

 const fetchUserAndLearningData = async () => {
  try {
   const { data: userActivityData, error: activityError } = await supabase
    .from("user_activity")
    .select("weekly_goal, longest_streak")
    .eq("user_email", userInfo?.email)
    .maybeSingle();

   if (!userActivityData) {
    console.log("No data found for this user.");
    return;
   }
   if (activityError) {
    console.error("Error fetching user activity:", activityError);
    return;
   }

   if (userActivityData?.weekly_goal) {
    setWeeklyGoal(userActivityData.weekly_goal);
   }
   setLongestStreak(userActivityData?.longest_streak ?? 0);

   const { data: learningData, error: learningError } = await supabase
    .from("porch")
    .select("created_at")
    .eq("email", userInfo?.email)
    .order("created_at", { ascending: true });

   if (learningError) {
    console.error("Error fetching learning data:", learningError);
    return;
   }

   if (learningData && learningData.length > 0) {
    calculateStreaks(learningData);
    calculateWeeklyLearningDays(learningData);
    setLearningDates(
     learningData.map((entry) => ({
      date: new Date(entry.created_at).toISOString().split("T")[0],
      count: 1,
     }))
    );
   } else {
    setCurrentStreak(0);
    setWeeklyLearningDays(0);
    setLearningDates([]);
   }
  } catch (error) {
   console.error("Unexpected error in fetchUserAndLearningData:", error);
  }
 };

 const calculateStreaks = (data: { created_at: string }[]) => {
  if (data.length === 0) {
   setCurrentStreak(0);
   setLongestStreak(0);
   return;
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let lastDate: Date | null = null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const uniqueDates = Array.from(
   new Set(
    data.map((entry) => {
     const date = new Date(entry.created_at);
     date.setHours(0, 0, 0, 0);
     return date.toISOString().split("T")[0];
    })
   )
  ).sort();

  const sortedUniqueDates: Date[] = [
   ...new Set(
    data.map((entry) => new Date(entry.created_at).toISOString().split("T")[0])
   ),
  ]
   .map((date) => new Date(date))
   .sort((a, b) => a.getTime() - b.getTime());

  sortedUniqueDates.forEach((currentDate: Date) => {
   if (!lastDate) {
    currentStreak = 1;
    lastDate = currentDate;
    return;
   }

   const differenceInDays = Math.floor(
    (currentDate.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24)
   );

   if (differenceInDays === 1) {
    currentStreak += 1;
   } else if (differenceInDays > 1) {
    currentStreak = 1;
   }

   lastDate = currentDate;
   longestStreak = Math.max(longestStreak, currentStreak);
  });

  if (lastDate !== null) {
   const differenceToToday = Math.floor(
    (today.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24)
   );
   if (differenceToToday > 1) {
    currentStreak = 0;
   }
  }

  setCurrentStreak(currentStreak);
  setLongestStreak(longestStreak);
 };

 const calculateWeeklyLearningDays = (data: { created_at: string }[]) => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysToSubtract);
  startOfWeek.setHours(0, 0, 0, 0);

  today.setHours(23, 59, 59, 999);

  const currentWeekLearningDays = new Set<string>();

  data.forEach((entry: { created_at: string }) => {
   const learningDate = new Date(entry.created_at);
   if (learningDate >= startOfWeek && learningDate <= today) {
    currentWeekLearningDays.add(learningDate.toDateString());
   }
  });

  setWeeklyLearningDays(currentWeekLearningDays.size);
 };

 const updateUserActivity = async (
  updatedData: Partial<Record<string, any>>
 ) => {
  if (!userInfo?.email) {
   console.warn("No user email provided for update.");
   return;
  }

  try {
   const dataToUpsert = {
    user_email: userInfo.email,
    longest_streak: updatedData.longestStreak,
    weekly_goal: updatedData.weeklyGoal,
   };

   const { data, error } = await supabase
    .from("user_activity")
    .upsert([dataToUpsert], {
     onConflict: "user_email",
     ignoreDuplicates: false,
    })
    .select();

   if (error) {
    throw error;
   }
   setShowUserForm(false);

   console.log("Update response:", data);
  } catch (err) {
   console.error("Error updating user activity:", err);
   throw err;
  }
 };

 useEffect(() => {
  fetchUserAndLearningData();
 }, [userInfo?.email]);

 const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

 if (showUpdateGoals) {
  return <WeeklyGoalForm setShowUserForm={setShowUserForm} />;
 }

 return (
  <View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
    <View className="flex-row justify-between mb-3">
     <TextWrapper>Weekly Learning Goals</TextWrapper>
     <TouchableOpacity onPress={() => setShowUpdateGoals(true)}>
      <TextWrapper className="font-IBM_light">Edit Goal ➡️</TextWrapper>
     </TouchableOpacity>
    </View>
    <TextWrapper className="text-4xl text-center my-2">
     {weeklyLearningDays} / {weeklyGoal}
    </TextWrapper>
    <TextWrapper className="text-center">days</TextWrapper>
    <View className="text-center my-2">
     {weeklyLearningDays >= weeklyGoal ? (
      <TextWrapper className="text-green-500 text-sm">Nice! 🚀</TextWrapper>
     ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
      <TextWrapper className="text-yellow-500 text-sm text-center">
       On Track
      </TextWrapper>
     ) : (
      <TextWrapper className="text-red-500 text-sm text-center">Off Track</TextWrapper>
     )}
    </View>
   </View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
    <TextWrapper>Current Streak</TextWrapper>
    <TextWrapper className="text-2xl font-bold pt-2">
     {currentStreak} <TextWrapper className="text-sm">days</TextWrapper>
    </TextWrapper>
    <View className="border-t border-gray-200 my-2 flex-row justify-between pt-2">
     <TextWrapper>✅ Longest Streak</TextWrapper>
     <TextWrapper>{longestStreak}</TextWrapper>
    </View>
   </View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
    <TextWrapper className="text-center pb-2">Learning Charts</TextWrapper>
    <UserCalendar learningDates={memoizedLearningDates} />
   </View>
  </View>
 );
};
