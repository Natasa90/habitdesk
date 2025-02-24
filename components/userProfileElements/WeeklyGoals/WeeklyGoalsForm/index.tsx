import { FC, useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { WeeklyGoalFormProps } from "@/Types/UserProfileTypes";
import { UserWeeklyGoalsForm } from "../index";
import { UserInfoContext } from "@/context/UserInfoContext";
import { useWeeklyGoal } from "@/lib/hooks";

export const WeeklyGoalForm: FC<WeeklyGoalFormProps> = ({
 setShowUserForm,
}) => {
 const [close, setClose] = useState<boolean>(false);
 const { userInfo } = useContext(UserInfoContext);

 const { weeklyGoal, loading, updateWeeklyGoal } = useWeeklyGoal(userInfo);
 const [selectedGoal, setSelectedGoal] = useState(weeklyGoal);

 const getRemainingDaysInWeek = (): number => {
  const today = new Date();
  let dayOfWeek = today.getDay();
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  return 8 - dayOfWeek;
 };

 const committed = () => {
  setClose(true);
  console.log("Selected Weekly Goal:", selectedGoal);
 };

useEffect(() => {
 updateWeeklyGoal(selectedGoal); 
}, [selectedGoal]);

const handleClose = () => {
  setClose(true);}

 if (close) {
  return <UserWeeklyGoalsForm setShowUserForm={setShowUserForm} />;
 }

 if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
 }

 return (
  <View className="border-2 p-4 m-2 rounded-xl bg-white">
   <Text className="text-lg font-bold mb-2">Set your goal</Text>
   <View className="border-b mb-4" />
   <Text className="text-sm font-semibold mb-1">New Goal</Text>
   <Picker
    selectedValue={selectedGoal}
    onValueChange={(itemValue) => setSelectedGoal(Number(itemValue))}
   >
    {Array.from({ length: getRemainingDaysInWeek() }, (_, i) => (
     <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
    ))}
   </Picker>
   <Text className="text-xs text-gray-500 mb-4">days learned per week</Text>
   <View className="flex-row justify-between">
    <TouchableOpacity
     onPress={handleClose}
     className="border p-1.5 px-3 rounded-full"
    >
     <Text className="text-sm text-center">Close</Text>
    </TouchableOpacity>
    <TouchableOpacity
     onPress={committed}
     className="bg-blue-200 p-1.5 px-3 rounded-full"
    >
     <Text className="text-sm text-center">I'm Committed</Text>
    </TouchableOpacity>
   </View>
  </View>
 );
};
