import { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import { PorchHeader } from "../components/PorchElements/PorchHeader";
import { PorchList } from "../components/PorchElements/PorchList";
import { PorchType } from "@/Types/PorchTypes";
import { ScreenTitle } from "@/components/ScreenTitle";

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
    .range((page - 1) * 100, page * 100 - 1);
   if (error) {
    throw new Error(error.message);
   }
   setPorchs((prevPorchs) => [...prevPorchs, ...newPorchs]);
   setHasMore(newPorchs.length === 100);
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
  <ScrollView className="flex-1 bg-grayScreen p-9">
    <ScreenTitle title="Porch - Your Growth Dashboard" description="" />
   <PorchHeader />
   {loading ? (
    <View className="flex items-center justify-center mt-10">
     <ActivityIndicator size="large" color="#3b82f6" />
     <Text className="mt-4 text-gray-600">Loading updates...</Text>
    </View>
   ) : (
    <PorchList porchs={porchs} setPorchs={setPorchs} />
   )}
   {hasMore && !loading && (
    <View className="mt-4">
     <Text className="text-blue-600 underline text-center" onPress={loadPorchs}>
      Load More Updates
     </Text>
    </View>
   )}
   {!hasMore && (
    <View className="mt-4">
     <Text className="text-center text-gray-500">You have seen it all!</Text>
    </View>
   )}
  </ScrollView>
 );
};
