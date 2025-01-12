import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CardLayout } from "../../Layout/CardsLayout";
import { FreeResListProps } from "@/Types/FreeResourcesTypes";

export const FreeResList: FC<FreeResListProps> = ({
 resources,
 isLoading,
 handleVote,
 handleShowComments,
 loadMore,
}) => {
 if (isLoading && resources.length === 0) {
  return (
   <View>
    <Text>Loading...</Text>
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
     isUpdating={isLoading}
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
    onPress={loadMore} // Increment page number
    disabled={isLoading} // Disable while loading
    className="bg-blue-500 rounded-full py-2 mt-4"
   >
    <Text className="text-white text-center">Load More</Text>
   </TouchableOpacity>
  </View>
 );
};
