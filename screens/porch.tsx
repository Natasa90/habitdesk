import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";
import PorchUserButton from "../components/PorchElements/PorchInteractivity";

export const Porch = () => {
    const [ showUserForm, setShowUserForm ] = useState( false );

    return (
        <View className="flex-row items-center">
          <PorchUserButton
            showUserForm={showUserForm}
            setShowUserForm={setShowUserForm}
          />
          <Icon name="arrow-back" size={22} color="#4A4A4A" className="pl-2 pb-2" />
          <Text className="pl-2 pb-2 text-s mt-2">
            Check your{" "}
            <Text className="font-bold text-blue-700">stats</Text> and update your{" "}
            <Text className="font-bold text-blue-700">goals!</Text>
          </Text>
        </View>
      );
    };