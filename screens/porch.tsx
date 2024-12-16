import { View } from "react-native";
import { PorchHeader } from "../components/PorchElements/PorchHeader";
import { PorchList } from "../components/PorchElements/PorchList";

export const Porch = () => {

    return (
        <View className="flex-1 bg-porch-bg p-10">
          <PorchHeader /> 
          <PorchList /> 
        </View>
      );
    };