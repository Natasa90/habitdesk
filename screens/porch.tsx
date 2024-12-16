import { View } from "react-native";
import { PorchHeader } from "../components/PorchElements/PorchHeader";
import { PorchList } from "../components/PorchElements/PorchList";

export const PorchScreen = () => {

    return (
        <View className="flex-1 bg-grayScreen p-10">
          <PorchHeader /> 
          <PorchList /> 
        </View>
      );
    };