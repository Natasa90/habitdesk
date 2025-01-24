import { FC } from "react";
import { View, Image } from "react-native";

export const FormTitle: FC = () => {
 return (
  <View className="mt-2">
   <Image
    source={require("../../../assets/images/habitdesk.png")} 
    className="w-[110px] h-[110px]"
   />
  </View>
 );
};
