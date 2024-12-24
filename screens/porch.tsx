import { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
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
    // Fetch the first 10 posts from the 'porch' table
    const { data: newPorchs, error } = await supabase
      .from('porch')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1); 

    if (error) {
      throw new Error(error.message); // Handle Supabase error
    }

    setPorchs(newPorchs);  // Set the fetched posts
    setHasMore(newPorchs.length === 10);  // Check if more posts are available
  } catch (err) {
    console.error('Failed to load porchs:', err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadPorchs();
  }, []);

    return (
        <ScrollView className="flex-1 bg-grayScreen p-10">
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
          <Text
            className="text-blue-600 underline text-center"
            onPress={loadPorchs}
          >
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