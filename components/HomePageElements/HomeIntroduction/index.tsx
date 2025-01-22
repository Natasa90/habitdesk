import { useState, useEffect } from "react";
import { View, Text } from "react-native"
import * as Font from "expo-font"; 
import { Team } from '../../index'
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation"
import { HomeButton } from "../HomeButton";

export const HomeIntroduction = () => {
  const navigation = useTypedNavigation(); 

  return (
    <View className="p-2">
      <Text className="text-3xl color-customBlue" style={{ fontFamily: "Kanit" }}>Welcome to HabitDesk!</Text>
      <Text className="text-center mt-2 italic"style={{ fontFamily: "Kanit" }}>
        Your personal space for tracking and improving your learning habits.
      </Text>
      <Team />
      <Text className="text-center">
        At HabitDesk, we provide free resources, a goal-setting porch, and progress tracking to help you stay motivated and focused on your learning journey.
      </Text>
      <Text className="text-center my-2">
        Whether you're looking for study materials, tracking your growth, or reading insightful blogs, we’ve got you covered!
      </Text>

      <HomeButton onPress={() => navigation.navigate('Login')}>
     <Text className="text-white text-xl">Get Started</Text>
    </HomeButton>
    </View>
  )
}
