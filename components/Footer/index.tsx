import { View, Text, Image } from "react-native";

export const Footer = () => {
 return (
  <View className="flex-row w-full items-center justify-center space-x-4 bg-footerBlue py-4 border-t border-gray-300">
    <Image
     source={require("../../assets/images/habitdesk.png")}
     style={{ width: 100, height: 60 }}
     resizeMode="contain"
    />
    <View className="w-[1px] h-10 bg-gray-300" />
    <Text className="text-gray-400 text-xs text-left">
     © 2024. All rights reserved.{"\n"}
     Designed by <Text className="font-semibold text-gray-500">Prototype.NEXT</Text>
    </Text>
  </View>
 );
};
