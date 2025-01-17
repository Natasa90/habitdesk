import { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { ScreenTitle } from "@/components/ScreenTitle";
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
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4">Loading resources...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-grayScreen p-9">
      <ScreenTitle
        title="Explore & Share Free Learning Resources"
        description="Browse a curated collection of free resources to support your learning journey. Explore by category, access trusted links, and share your insights in the comment section. Have a favorite resource? Add your own and help others learn."
      />
      <LearningSource sources={sources} />
    </ScrollView>
  );
};
