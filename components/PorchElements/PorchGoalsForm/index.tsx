/* import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Picker } from 'react-native';
import PorchUserDataForm from '../PorchUserDataForm'; // Assuming this is a React Native component
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const WeeklyGoalForm = () => {
  const [close, setClose] = useState<boolean>(false);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1); // Default value is 1

  // Load the goal from AsyncStorage when the component mounts
  useEffect(() => {
    const loadGoal = async () => {
      const storedGoal = await AsyncStorage.getItem('weeklyGoal');
      if (storedGoal) {
        setWeeklyGoal(Number(storedGoal)); // If goal is found, set it
      } else {
        // If no goal is found in AsyncStorage, initialize it to 1
        await AsyncStorage.setItem('weeklyGoal', '1');
      }
    };

    loadGoal();
  }, []);

  // Save the goal to AsyncStorage whenever it changes
  useEffect(() => {
    const saveGoal = async () => {
      await AsyncStorage.setItem('weeklyGoal', String(weeklyGoal));
    };

    saveGoal();
  }, [weeklyGoal]);

  const committed = () => {
    setClose(true);
    console.log('Selected Weekly Goal:', weeklyGoal);
  };

  const handleNewGoal = (value: string) => {
    setWeeklyGoal(Number(value));
  };

  if (close) {
    return <PorchUserDataForm />;
  }

  return (
    <View className="p-4 m-2 bg-white border-2 rounded-xl">
      <Text className="mb-2 text-lg font-semibold">Set your goal</Text>
      <View className="border-b mb-6" />
      
      <Text className="font-semibold text-sm mb-2">New Goal</Text>
      <View className="flex-row items-center">
        <Picker
          selectedValue={String(weeklyGoal)}
          onValueChange={handleNewGoal}
          style={tw`flex-1 h-10 border border-gray-300 rounded-md`}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        <Text className="pl-2 pt-3 text-xs italic">days learned per week</Text>
      </View>
      
      <View className="flex-row justify-between mt-8 space-x-5"> */ 
    
