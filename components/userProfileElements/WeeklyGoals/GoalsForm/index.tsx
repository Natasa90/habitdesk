import { FC, useState, useContext } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { DropDownPicker } from "../DropDownPicker";
import { GoalsFormProps } from "@/Types/UserProfileTypes";
import { UserInfoContext } from "@/context/UserInfoContext";
import { useWeeklyGoal } from "@/lib/hooks";
import { getRemainingDaysInWeek } from "@/lib/helpers";
import { TextWrapper } from "@/components/Layout";
import Icon from "react-native-vector-icons/Feather";

export const GoalsForm: FC<GoalsFormProps> = ({ onClose, updateGoal }) => {
 const { userInfo } = useContext(UserInfoContext);
 const { weeklyGoal, loading, updateWeeklyGoal } = useWeeklyGoal(userInfo);
 const [selectedGoal, setSelectedGoal] = useState(weeklyGoal);

 const handleCommit = () => {
  updateWeeklyGoal(selectedGoal);
  updateGoal(selectedGoal);
  onClose();
 };

 if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
 }

 return (
  <View className="border-2 border-gray-400 bg-white rounded-lg min-h-[280px] p-4 relative">
   <TouchableOpacity onPress={onClose} className="absolute top-3 right-3">
    <Icon name="x" size={20} color="gray" />
   </TouchableOpacity>
   <View className="mt-8">
    <TextWrapper className="text-xl font-IBM_boldItalic text-customBlue mb-5 text-center">
     Your Weekly Goal
    </TextWrapper>
    <View className="border-b border-gray-300 mb-4" />
    <TextWrapper className="font-IBM_semibold text-center">
     Set up New Goal:
    </TextWrapper>
    <View className="py-3 items-center">
     <DropDownPicker
      selectedValue={selectedGoal}
      onValueChange={setSelectedGoal}
      options={Array.from(
       { length: getRemainingDaysInWeek() },
       (_, i) => i + 1
      )}
     />
     {selectedGoal === 1 ? (
      <TextWrapper className="text-gray-500 text-center">
       day learned per week
      </TextWrapper>
     ) : (
      <TextWrapper className="text-gray-500 text-center">
       days learned per week
      </TextWrapper>
     )}
    </View>
    <View className="flex-row justify-center mt-6">
     <TouchableOpacity
      onPress={handleCommit}
      className="bg-blue-500 py-2 px-5 rounded-full mt-2"
     >
      <TextWrapper className="text-white text-center p-1">
       I'm Committed
      </TextWrapper>
     </TouchableOpacity>
    </View>
   </View>
  </View>
 );
};
