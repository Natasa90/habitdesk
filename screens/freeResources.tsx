import { useEffect, useState } from "react";
import {
 ScrollView,
 View,
 ActivityIndicator,
 ImageBackground,
} from "react-native";
import TextWrapper from "@/components/TextWrapper";
import { FreeResHeader } from "@/components/FreeResElements/FreeSourcesHeader";
import { LearningSource } from "@/components/FreeResElements/LearningSource";
import { supabase } from "@/lib/supabase";

export const FreeResourcesScreen = () => {
 const [sources, setSources] = useState<any[]>([]); // Adjust type as needed
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchSources = async () => {
   try {
    const { data, error } = await supabase
     .from("sources")
     .select("*")
     .order("like", { ascending: false });

    if (error) {
     throw new Error("There was a problem getting data");
    }

    setSources(data);
   } catch (err) {
    console.log(err);
   } finally {
    setLoading(false);
   }
  };

  fetchSources();
 }, []);

 if (loading) {
  return (
   <ImageBackground
    source={require("../assets/images/home-bg.jpeg")}
    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
   >
    <ActivityIndicator size="large" color="#0000ff" />
    <TextWrapper className="mt-4">Loading resources...</TextWrapper>
   </ImageBackground>
  );
 }

 if (error) {
  return (
   <View className="flex-1 justify-center items-center bg-gray-100">
    <TextWrapper className="text-red-500">{error}</TextWrapper>
   </View>
  );
 }

 return (
  <ImageBackground
   source={require("../assets/images/home-bg.jpeg")}
   style={{ flex: 1, alignItems: "center" }}
  >
   <ScrollView className="flex-1 p-9">
    <FreeResHeader />
    <LearningSource sources={sources} />
   </ScrollView>
  </ImageBackground>
 );
};
