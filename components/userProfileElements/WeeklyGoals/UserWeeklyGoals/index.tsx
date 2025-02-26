import { useState, useMemo } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur"; 
import { TextWrapper } from "@/components/Layout";
import { UserCalendar } from "@/components/PorchElements/Calendar";
import { GoalsForm } from "../GoalsForm";
import { useUserLearningData } from "@/lib/hooks";

export const UserWeeklyGoals = () => {
 const [showGoalsForm, setShowGoalsForm] = useState<boolean>(false);
 const {
  weeklyGoal: initialWeeklyGoal,
  currentStreak,
  longestStreak,
  weeklyLearningDays,
  learningDates,
 } = useUserLearningData();

 const [weeklyGoal, setWeeklyGoal] = useState(initialWeeklyGoal);
 const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

 return (
  <View>
   <View className="bg-white rounded-lg p-4 mb-4 shadow-lg">
    <View className="flex-row justify-between mb-3">
     <TextWrapper>Weekly Learning Goals</TextWrapper>
     <TouchableOpacity onPress={() => setShowGoalsForm(true)}>
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
   <View className="bg-white rounded-lg p-4 mb-4 shadow-lg">
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
   <View className="bg-white rounded-lg p-4 mb-4 shadow-lg">
    <TextWrapper className="text-center pb-2">Learning Charts</TextWrapper>
    <UserCalendar learningDates={memoizedLearningDates} />
   </View>
   <Modal
    visible={showGoalsForm}
    transparent
    animationType="fade"
    onRequestClose={() => setShowGoalsForm(false)}
   >
    <View className="flex-1 justify-center items-center">
     <BlurView
      intensity={20}
      tint="light"
      style={{ position: "absolute", width: "100%", height: "100%" }}
     />
     <View className="bg-gray-300 rounded-lg p-4 shadow-xl w-10/12 max-w-xs min-h-[280px]">
      <GoalsForm
       onClose={() => setShowGoalsForm(false)}
       updateGoal={setWeeklyGoal}
      />
     </View>
    </View>
   </Modal>
  </View>
 );
};
