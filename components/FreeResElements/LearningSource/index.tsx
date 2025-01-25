/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo, useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { FreeSourcesList } from "../FreeSourcesList";
import { FreeResCats } from "../CategoryFilter";
import { UserInfoContext } from "@/context/UserInfoContext";
import { Source } from "@/Types/FreeResourcesTypes";
import { LearningSourcesProps } from "@/Types/FreeResourcesTypes";

export const LearningSource: FC<LearningSourcesProps> = ({ sources }) => {
 const { userInfo } = useContext(UserInfoContext);
 const [facts, setFacts] = useState<Source[]>(sources);
 const [currentCategory, setCurrentCategory] = useState<string>("all");

 const filteredFacts = useMemo(() => {
  if (currentCategory === "all") {
   return facts;
  }

  return facts.filter((facts: any) => facts.category === currentCategory);
 }, [currentCategory, facts]);

 return (
  <ScrollView>
    <FreeResCats
     currentCategory={currentCategory}
     setCurrentCategory={setCurrentCategory}
    />
    <View className="mt-4">
     <FreeSourcesList facts={filteredFacts} setFacts={setFacts} />
    </View>
  </ScrollView>
 );
};
