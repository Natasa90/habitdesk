import { FC } from "react";
import { View, ScrollView } from "react-native";
import TextWrapper from "@/components/TextWrapper";
import { FreeSource } from "./FreeSources";
import { FreeSourcesListProps } from "@/Types/FreeResourcesTypes";

export const FreeSourcesList: FC<FreeSourcesListProps> = ({
 facts,
 setFacts,
}) => {
 if (!facts || facts.length === 0)
  return (
   <View>
    <TextWrapper>No Content for this category yet!</TextWrapper>
   </View>
  );
 return (
  <View className="border-y-4 border-[#e5e7eb]">
   <ScrollView className="mt-8">
    {facts.map((fact) => (
     <FreeSource key={fact.id} fact={fact} setFacts={setFacts} />
    ))}
    <View className="px-4">
     <TextWrapper className="mt-5 text-lg font-medium text-gray-800 text-center">
      There are {facts.length} sources. Add your own source!
     </TextWrapper>
    </View>
   </ScrollView>
  </View>
 );
};
