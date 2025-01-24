import { View, Text, Image } from "react-native";

export const Footer = () => {
 return (
  <View className="bg-footerBlue py-4 border-t border-gray-300 mb-2">
   {/* Horizontal Layout: Logo and Text */}
   <View className="flex-row items-center justify-center space-x-4 px-4">
    {/* Logo */}
    <Image
     source={require("../../assets/images/habitdesk.png")} // Update the path to your logo
     style={{ width: 100, height: 60 }}
     resizeMode="contain"
    />

    {/* Divider Line */}
    <View className="w-[1px] h-10 bg-gray-300" />

    {/* Text Section */}
    <Text className="text-gray-400 text-xs text-left">
     © 2024. All rights reserved.{"\n"}
     Designed by <Text className="font-semibold text-gray-500">Prototype.NEXT</Text>
    </Text>
   </View>
  </View>
 );
};
