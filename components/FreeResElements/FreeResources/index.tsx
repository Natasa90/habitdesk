import { FC, useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CardLayout } from "../../Layout/CardsLayout";
import { FreeSourceProps } from "@/Types/FreeResourcesTypes";
import { Fact } from "@/Types/FreeResourcesTypes";
import { supabase } from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";

export const FreeResList: FC<FreeSourceProps> = ({ setFacts }) => {
  const [resources, setResources] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [page, setPage] = useState(0); // Track the page number
  const { userInfo } = useContext(UserInfoContext);

  const handleShowComments = (resourceId: number) => {
    // Logic for showing comments
  };

  const handleVote = async (columnName: keyof Fact, fact: Fact) => {
    setIsUpdating(true);

    // Update the vote in Supabase
    const { data: updatedFact, error } = await supabase
      .from("sources")
      .update({ [columnName]: (fact[columnName] as number) + 1 })
      .eq("id", fact.id)
      .select();

    setIsUpdating(false);

    if (!error && updatedFact && updatedFact.length > 0) {
      // Update the state with the new data
      setFacts((prevFacts) =>
        prevFacts.map((f) => (f.id === fact.id ? (updatedFact[0] as Fact) : f))
      );
    }
  };

  // Fetch resources from the Supabase table
  const fetchResources = async (page: number) => {
console.log("Fetching page:", page);
    const { data, error } = await supabase
      .from("sources")
      .select("*")
      .order("like", { ascending: false })
      .range(page * 10, (page + 1) * 10 - 1); 

    if (error) {
      Alert.alert("Error", "Could not load resources.");
    } else {
 console.log("Fetched resources for page", page, ":", data);
      if (page === 0) {
        setResources(data as Fact[]); // Reset resources on first page
      } else {
        setResources((prevResources) => [...prevResources, ...(data as Fact[])]); // Append new resources
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchResources(page); // Fetch data based on the current page
  }, [page]); // Run this effect whenever the page changes

  // Show loading message only if data is not yet fetched
  if (isLoading && resources.length === 0) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  return (
    <View>
      {resources.map((resource) => (
        <CardLayout
          key={resource.id}
          title={resource.category || "Unknown Category"}
          porch={{
            source: resource.source,
            excellent: resource.exelent,
          }}
          displayComment={resource.text.slice(0, 90)}
          commentText={resource.text}
          showMore={false}
          handleVote={() => handleVote("exelent", resource)}
          isUpdating={isUpdating}
          extraContent={
            <View className="py-5">
              <TouchableOpacity onPress={() => handleShowComments(resource.id)}>
                <Text className="self-start bg-gray-200 rounded-full px-8 py-2 text-sm font-semibold text-gray-700">
                  Show Comments
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      ))}
      {/* Load more button */}
      <TouchableOpacity
        onPress={() => setPage((prevPage) => prevPage + 1)} // Increment page number
        disabled={isLoading} // Disable while loading
        className="bg-blue-500 rounded-full py-2 mt-4"
      >
        <Text className="text-white text-center">Load More</Text>
      </TouchableOpacity>
    </View>
  );
};
