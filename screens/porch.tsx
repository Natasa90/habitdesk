import { useState, useEffect } from "react";
import {
 ScrollView,
 View,
 ActivityIndicator,
 TouchableOpacity,
} from "react-native";
import { TextWrapper } from "@/components/Layout";
import supabase from "@/lib/supabase";
import { PorchHeader, PorchList } from "@/components/PorchElements";
import { PorchType } from "@/Types/PorchTypes";


export const PorchScreen = () => {
 const [porchs, setPorchs] = useState<PorchType[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [page, setPage] = useState<number>(1);
 const [hasMore, setHasMore] = useState<boolean>(true);

 const loadPorchs = async (currentPage: number) => {
  try {
   const { data: newPorchs, error } = await supabase
    .from("porch")
    .select("*")
    .order("created_at", { ascending: false })
    .range((currentPage - 1) * 10, currentPage * 10 - 1);
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
  loadPorchs(page);
 }, [page]);

 const handleLoadMore = () => {
  if (!loading && hasMore) {
   setPage((prevPage) => prevPage + 1);
  }
 };

 return (
  <ScrollView className="flex-1 p-7">
   <PorchHeader />
   {loading ? (
    <View className="flex items-center justify-center mt-10">
     <ActivityIndicator size="large" color="#3b82f6" />
     <TextWrapper className="mt-4 text-gray-600">
      Loading updates...
     </TextWrapper>
    </View>
   ) : (
    <PorchList porchs={porchs} setPorchs={setPorchs} />
   )}
   {hasMore && !loading && (
    <View className="items-center">
     <TouchableOpacity
      className="bg-customBlue p-2 rounded-xl shadow-xl justify-center items-center mb-10 w-40"
      onPress={handleLoadMore}
     >
      <TextWrapper className="text-white">Load More Updates</TextWrapper>
     </TouchableOpacity>
    </View>
   )}
   {!hasMore && (
    <View className="mt-10 border-gray-1">
     <TextWrapper className="text-center text-gray-500">
      You have seen it all!
     </TextWrapper>
    </View>
   )}
  </ScrollView>
 );
};
