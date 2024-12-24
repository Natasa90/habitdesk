import { FC, useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PorchDailyUpdate } from "../PorchDailyUpdate";
import { PorchListProps } from "@/Types/PorchTypes";

export const PorchList: FC<PorchListProps> = ({porchs, setPorchs}) => {

  const [filtered, setFiltered] = useState<boolean>(false);
  const [buttonTitle, setButtonTitle] = useState<string>("Track Your Daily Updates");

   const sortedUpdates = useMemo(() => {
    return porchs.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [porchs]);

  const handleFiltering = () => {
    setFiltered((prevState) => {
      const newFiltered = !prevState;
      setButtonTitle(
        newFiltered ? "All Daily Updates" : "Track Your Daily Updates"
      );
      return newFiltered;
    });
  }; 

    return (
        <View className="py-1 border-y-4 border-[#e5e7eb]">
            <View className="mx-auto">
                <View className="py-5 bg-gray-100 rounded-xl">  
                    <View className="ml-2">
                        <Text className="text-lg font-bold text-gray-900">Daily Highlights</Text>
                        <Text className="mt-1 text-sm font-medium text-gray-500">Growth and Learning News</Text>
                        <>
                            <Text className="mt-5 text-lg font-medium text-gray-800">
                                 You've been dedicated to learning for <Text className="font-bold">5</Text> days!
                            </Text>
                            <TouchableOpacity
                                onPress={() => {}}
                                className="mt-3 w-48"
                            >
                                <Text className="bg-customBlue rounded-xl py-2.5 px-4 text-sm font-medium text-white self-start">Track Your Daily Updates</Text>
                            </TouchableOpacity>
                        </>
                    </View>
                    <View className="mt-6 space-y-3">
                        {sortedUpdates.map((porch, index) => (
                            <PorchDailyUpdate
                            key={porch.id || index}
                            porch={porch}
                            setPorchs={setPorchs}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};
