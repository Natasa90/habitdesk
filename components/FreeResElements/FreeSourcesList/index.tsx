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
   <View className="items-center">
    <TextWrapper>No Content for this category yet.</TextWrapper>
    <TextWrapper>Add your own Source!</TextWrapper>
   </View>
  );
 return (
  <View className="border-t-4 border-[#e5e7eb]">
   <ScrollView className="mt-8">
    {facts.map((fact) => (
     <FreeSource key={fact.id} fact={fact} setFacts={setFacts} />
    ))}
    <TextWrapper className="pb-2 text-lg font-medium text-center">
     There are {facts.length} sources. Add your own source!
    </TextWrapper>
   </ScrollView>
  </View>
 );
};
