import { View, Text, TouchableOpacity } from "react-native"
import { Team } from '../../index'
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation"

export const HomeIntroduction = () => {
  const navigation = useTypedNavigation(); 

  return (
    <View className="p-2">
      <Text className="text-3xl">Welcome to HabitDesk!</Text>
      <Text className="text-center my-2 italic">
        Your personal space for tracking and improving your learning habits.
      </Text>
      <Team />
      <Text className="text-center my-2">
        At HabitDesk, we provide free resources, a goal-setting porch, and progress tracking to help you stay motivated and focused on your learning journey.
      </Text>
      <Text className="text-center my-2">
        Whether you're looking for study materials, tracking your growth, or reading insightful blogs, we’ve got you covered!
      </Text>

      <TouchableOpacity
        className="bg-blue-600 py-4 px-8 rounded-xl mt-5"
        onPress={() => navigation.navigate('Login')} // Navigate to login screen
      >
        <Text className="text-center text-white text-lg font-semibold">
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  )
}
