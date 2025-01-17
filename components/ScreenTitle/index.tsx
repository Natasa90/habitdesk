import { FC } from "react";
import { View, Text } from "react-native";
import { TitleProps } from "../../Types/FreeResourcesTypes";

export const ScreenTitle: FC<TitleProps> = ({ title, description }) => {
 return (
  <View className="gap-3">
   <Text className="text-2xl text-gray-900 font-bold text-center">
    {title}
   </Text>
   <Text className="text-center text-gray-600 italic">{description}</Text>
  </View>
 );
};
