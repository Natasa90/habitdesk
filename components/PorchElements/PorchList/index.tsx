import { FC, useState, useEffect, useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import UserInfoContext from "../../../context/UserInfoContext";
import { PorchType, PorchListProps } from "../../../Types/PorchTypes";
import { PorchDailyUpdate } from "../PorchDailyUpdate";

export const PorchList: FC = () => {
  /*  porchs = [], 
  setPorchs = () => {}, 
}) => {
  const { userInfo } = useContext(UserInfoContext);
  const [filtered, setFiltered] = useState<boolean>(false);
  const [dailyUpdates, setDailyUpdates] = useState<PorchType[]>(porchs);
  const [buttonTitle, setButtonTitle] = useState<string>("Track Your Daily Updates");

  useEffect(() => {
    setDailyUpdates(porchs);
  }, [porchs]);

  const filteringUpdatesPerUser = useMemo(() => {
    const updates = filtered
      ? dailyUpdates.filter((porch) => porch.email === userInfo?.email)
      : dailyUpdates;
    return updates.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [dailyUpdates, userInfo?.email, filtered]);

  const handleFiltering = () => {
    setFiltered((prevState) => {
      const newFiltered = !prevState;
      setButtonTitle(
        newFiltered ? "All Daily Updates" : "Track Your Daily Updates"
      );
      return newFiltered;
    });
  }; */

  return (
    <View className="py-1 sm:py-1 lg:py-1 border-y-4 border-[#e5e7eb]">
      <View className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <View className="max-w-mx-auto overflow-hidden bg-gray-100 rounded-xl">
          <View className="py-5 sm:p-6">
            <View className="ml-2">
              <Text className="text-lg font-bold text-gray-900">Daily Highlights</Text>
              <Text className="mt-1 text-sm font-medium text-gray-500">Growth and Learning News</Text>
              {/*userInfo?.email && ( */}
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
              {/*)*/} 
            </View>
            <View className="mt-6 space-y-3">
            <PorchDailyUpdate />
            <PorchDailyUpdate />
              {/*filteringUpdatesPerUser.map((porch) => (
                <PorchDailyUpdate
                  key={porch.id}
                  porch={porch}
                  setPorchs={setPorchs}
                />
              ))*/}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
