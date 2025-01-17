import { FC } from "react";
import { View, Text, ScrollView } from "react-native";
import { FreeSource } from "./FreeSources";
import { FreeSourcesListProps } from "@/Types/FreeResourcesTypes";

export const FreeSourcesList: FC<FreeSourcesListProps> = ({
 facts,
 setFacts,
}) => {
 if (!facts || facts.length === 0)
  return (
   <View>
    <Text>No Content for this category yet!</Text>
   </View>
  );
 return (
  <View className="border-y-4">
   <ScrollView className="mt-8">
    {facts.map((fact) => (
     <FreeSource key={fact.id} fact={fact} setFacts={setFacts} />
    ))}
    <View className="px-4">
     <Text className="mt-5 text-lg font-medium text-gray-800 text-center">
      There are {facts.length} sources. Add your own source!
     </Text>
    </View>
   </ScrollView>
  </View>
 );
};
