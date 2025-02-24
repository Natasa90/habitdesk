import { FC, useState, useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";
import { UserCalendar } from "@/components/PorchElements/Calendar";
import { WeeklyGoalForm } from "../WeeklyGoalsForm";
import { WeeklyGoalFormProps } from "@/Types/UserProfileTypes";
import { useUserLearningData } from "@/lib/hooks";

export const UserWeeklyGoalsForm: FC<WeeklyGoalFormProps> = ({
 setShowUserForm,
}) => {
  const [showUpdateGoals, setShowUpdateGoals] = useState<boolean>(false);
  const { weeklyGoal, currentStreak, longestStreak, weeklyLearningDays, learningDates } =
    useUserLearningData();

  const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

  if (showUpdateGoals) {
    return <WeeklyGoalForm setShowUserForm={setShowUserForm} />;
  }

 return (
  <View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-xl">
    <View className="flex-row justify-between mb-3">
     <TextWrapper>Weekly Learning Goals</TextWrapper>
     <TouchableOpacity onPress={() => setShowUpdateGoals(true)}>
      <TextWrapper className="font-IBM_light">Edit Goal ➡️</TextWrapper>
     </TouchableOpacity>
    </View>
    <TextWrapper className="text-4xl text-center my-2">
     {weeklyLearningDays} / {weeklyGoal}
    </TextWrapper>
    {weeklyGoal > 1 ? (
     <TextWrapper className="text-center">days</TextWrapper>
    ) : (
     <TextWrapper className="text-center">day</TextWrapper>
    )}
    <View className="text-center my-2">
     {weeklyLearningDays >= weeklyGoal ? (
      <TextWrapper className="text-green-500 text-sm text-center">
       Nice! 🚀
      </TextWrapper>
     ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
      <TextWrapper className="text-yellow-500 text-sm text-center">
       On Track
      </TextWrapper>
     ) : (
      <TextWrapper className="text-red-500 text-sm text-center">
       Off Track
      </TextWrapper>
     )}
    </View>
   </View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-xl">
    <TextWrapper>Current Streak</TextWrapper>
    <TextWrapper className="text-2xl font-bold pt-2 ">
     {currentStreak}
     {currentStreak === 1 ? (
        <TextWrapper className="text-sm">{` ${" "}day`}</TextWrapper>
     ) : (
         <TextWrapper className="text-sm">{` ${" "}days`}</TextWrapper>
     )}
    </TextWrapper>
    <View className="border-t border-gray-200 my-2 flex-row justify-between pt-2">
     <TextWrapper>✅ Longest Streak</TextWrapper>
     <TextWrapper>{longestStreak}</TextWrapper>
    </View>
   </View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-xl">
    <TextWrapper className="text-center pb-2">Learning Charts</TextWrapper>
    <UserCalendar learningDates={memoizedLearningDates} />
   </View>
  </View>
 );
};
