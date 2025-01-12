import { View, Text } from "react-native";
import { useContext } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";

export const UserProfileTitle = () => {

  const { userInfo } = useContext(UserInfoContext)

  return (
  <View className="mb-4">
   <Text className="text-gray-500 text-center">Welcome, {userInfo?.email}</Text>
  </View>
 );
};
