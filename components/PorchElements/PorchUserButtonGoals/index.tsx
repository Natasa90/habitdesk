import { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";
import { PorchUserButtonProps } from "../../../Types/PorchTypes";
import Icon from "react-native-vector-icons/Ionicons";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";

export const PorchUserButtonGoals: FC<PorchUserButtonProps> = () => {
 const navigation = useTypedNavigation();
 return (
  <View className="flex-row items-center mb-3">
   <TouchableOpacity
    onPress={() => {
     navigation.navigate("UserProfile");
    }}
   >
    <Icon name="add-circle-outline" size={40} color="black" />
   </TouchableOpacity>
   <View className="pl-2 pb-2 pt-2">
    <Icon name="arrow-back" size={18} color="#4A4A4A" />
   </View>
   <TextWrapper className="pl-2">
    Check your{" "}
    <TextWrapper className="font-IBM_italic text-blue-700 ">stats</TextWrapper>{" "}
    and update your{" "}
    <TextWrapper className="font-IBM_italic text-blue-700">goals!</TextWrapper>
   </TextWrapper>
  </View>
 );
};
