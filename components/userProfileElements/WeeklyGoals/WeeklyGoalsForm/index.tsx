import { FC, useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { WeeklyGoalFormProps } from "@/Types/UserProfileTypes";
import { UserWeeklyGoalsForm } from "../index";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";

export const WeeklyGoalForm: FC<WeeklyGoalFormProps> = ({
 setShowUserForm,
}) => {
 const [close, setClose] = useState<boolean>(false);
 const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
 const [loading, setLoading] = useState<boolean>(true);
 const { userInfo } = useContext(UserInfoContext);

 useEffect(() => {
  const fetchWeeklyGoal = async () => {
   if (userInfo?.email) {
    try {
     const { data: userActivityData, error } = await supabase
      .from("user_activity")
      .select("weekly_goal")
      .eq("user_email", userInfo.email)
      .single(); 

     if (error) {
      throw new Error(error.message);
     }

     if (userActivityData?.weekly_goal) {
      setWeeklyGoal(userActivityData.weekly_goal);
     }
    } catch (err) {
     console.error("Error during fetch:", err);
    } finally {
     setLoading(false);
    }
   }
  };

  fetchWeeklyGoal();
 }, [userInfo?.email]);

 const getRemainingDaysInWeek = (): number => {
  const today = new Date();
  let dayOfWeek = today.getDay();
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  return 8 - dayOfWeek;
 };

 const handleNewGoal = async (newGoal: number) => {
  setWeeklyGoal(newGoal); // Update local state
  if (!userInfo?.email) return;

  try {
    // Try to fetch the user's activity data
    const { data: userActivityData, error: fetchError } = await supabase
      .from("user_activity")
      .select("id")
      .eq("user_email", userInfo.email)
      .single(); // This ensures only one row is fetched

    if (fetchError && fetchError.code === "PGRST116") {
      // If no row is found (PGRST116 error), we need to insert a new record
      const { error: insertError } = await supabase
        .from("user_activity")
        .insert([{ user_email: userInfo.email, weekly_goal: newGoal }]);

      if (insertError) throw insertError;
    } else if (userActivityData) {
      // If the row exists, we update it
      const { error: updateError } = await supabase
        .from("user_activity")
        .update({ weekly_goal: newGoal })
        .eq("user_email", userInfo.email);

      if (updateError) throw updateError;
    }
  } catch (err) {
    console.error("Error setting weekly goal:", err);
  }
};

 const committed = () => {
  setClose(true);
  console.log("Selected Weekly Goal:", weeklyGoal);
 };

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
    selectedValue={weeklyGoal}
    onValueChange={(itemValue) => handleNewGoal(Number(itemValue))}
    className="border rounded-lg p-1 mb-2"
   >
    {Array.from({ length: getRemainingDaysInWeek() }, (_, i) => (
     <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
    ))}
   </Picker>
   <Text className="text-xs text-gray-500 mb-4">days learned per week</Text>
   <View className="flex-row justify-between">
    <TouchableOpacity
     onPress={() => setClose(true)}
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
