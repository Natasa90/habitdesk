import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { PorchUserButtonProps } from "../../../Types/PorchTypes";

export const PorchUserButtonUpdates: FC<PorchUserButtonProps> = ({ showForm, setShowForm }) => {

  const handlePress = () => {
      setShowForm((prevState: boolean) => !prevState); 
  };

  return (
    <View className="flex-row items-center">
      <TouchableOpacity className="pl-1" onPress={handlePress}>
        <View className="w-6 h-6 p-0.5 rounded-full border-[1.7px] border-black">
          <Icon name="trending-up" size={16} color="black" />
        </View>
      </TouchableOpacity>
      <View className="pl-2.5 pb-2 pt-2">
        <Icon name="arrow-back" size={18} color="#4A4A4A" />
      </View>
      <Text className="pl-2.5 pb-2 pt-1.5 text-xs">
        Post your{' '}
        <Text className="font-bold text-blue-700">progress!</Text>
      </Text>
    </View>
  );
};
