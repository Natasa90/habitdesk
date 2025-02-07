import { FC, useState } from "react";
import { FlatList, View } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";
import { FreeSourcesList } from "../FreeSourcesList";
import { FreeResCats } from "../CategoryFilter";
import { LearningSourcesProps } from "@/Types/FreeResourcesTypes";

export const LearningSource: FC<LearningSourcesProps> = ({ sources }) => {
 const [currentCategory, setCurrentCategory] = useState<string>("all");

 const filteredFacts =
  currentCategory === "all"
   ? sources
   : sources.filter((fact) => fact.category === currentCategory);

 return (
  <View className="flex-1">
   <FreeResCats
    currentCategory={currentCategory}
    setCurrentCategory={setCurrentCategory}
   />
   <FlatList
    data={filteredFacts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <FreeSourcesList facts={[item]} />}
    ListFooterComponent={
     <TextWrapper className="pb-2 text-lg font-medium text-center">
      There are {filteredFacts.length} sources. Add your own source!
     </TextWrapper>
    }
    className="pb-8"
   />
  </View>
 );
};
