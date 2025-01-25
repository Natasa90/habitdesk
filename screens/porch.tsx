import { useState, useEffect } from "react";
import { ScrollView, View, ActivityIndicator, ImageBackground } from "react-native";
import TextWrapper from "@/components/TextWrapper";
import { supabase } from "@/lib/supabase";
import { PorchHeader } from "../components/PorchElements/PorchHeader";
import { PorchList } from "../components/PorchElements/PorchList";
import { PorchType } from "@/Types/PorchTypes";

export const PorchScreen = () => {

 const [porchs, setPorchs] = useState<PorchType[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [page, setPage] = useState<number>(1);
 const [hasMore, setHasMore] = useState<boolean>(true);

 const loadPorchs = async () => {
  try {
   const { data: newPorchs, error } = await supabase
    .from("porch")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * 10, page * 10 - 1);
   if (error) {
    throw new Error(error.message);
   }
   setPorchs((prevPorchs) => [...prevPorchs, ...newPorchs]);
   setHasMore(newPorchs.length === 10);
  } catch (err) {
   console.error("Failed to load porchs:", err);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  loadPorchs();
 }, [page]);

 return (
<ImageBackground
   source={require("../assets/images/home-bg.jpeg")}
   style={{ flex: 1, alignItems: "center" }}
  >
  <ScrollView className="flex-1 p-9">
   <PorchHeader />
   {loading ? (
    <View className="flex items-center justify-center mt-10">
     <ActivityIndicator size="large" color="#3b82f6" />
     <TextWrapper className="mt-4 text-gray-600">Loading updates...</TextWrapper>
    </View>
   ) : (
    <PorchList porchs={porchs} setPorchs={setPorchs} />
   )}
   {hasMore && !loading && (
    <View className="mt-4">
     <TextWrapper className="text-blue-600 underline text-center" onPress={loadPorchs}>
      Load More Updates
     </TextWrapper>
    </View>
   )}
   {!hasMore && (
    <View className="mt-4">
     <TextWrapper className="text-center text-gray-500">You have seen it all!</TextWrapper>
    </View>
   )}
  </ScrollView>
</ImageBackground>
 );
};
