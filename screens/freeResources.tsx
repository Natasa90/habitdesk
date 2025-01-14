import { ScrollView, View, Text } from "react-native";
import { ScreenTitle } from "@/components/ScreenTitle";
import { FreeResCats } from "@/components/FreeResElements/CategoryFilter";
import { FreeResList } from "../components/FreeResElements/FreeResources";
import { useFreeResources } from "@/lib/hooks/useFreeResources";

export const FreeResourcesScreen = () => {
 const {
  filteredResources,
  isLoading,
  handleVote,
  loadMore,
  currentCategory,
  setCurrentCategory,
  noContent,
 } = useFreeResources();

 const handleShowComments = (resourceId: number) => {
  // Needs to be added later
 };

 return (
  <ScrollView className="flex-1 bg-grayScreen p-9">
   <ScreenTitle
    title="Explore & Share Free Learning Resources"
    description="Browse a curated collection of free resources to support your learning journey. Explore by category, access trusted links, and share your insights in the comment section. Have a favorite resource? Add your own and help others learn."
   />
   <FreeResCats
    currentCategory={currentCategory}
    setCurrentCategory={setCurrentCategory}
   />
   {noContent ? (
    <View className="flex-1 justify-center items-center mt-4">
     <Text className="text-gray-500 text-center">
      No Content for this category yet! ✌️
     </Text>
    </View>
   ) : (
    <FreeResList
     resources={filteredResources}
     isLoading={isLoading}
     handleVote={handleVote}
     handleShowComments={handleShowComments}
     loadMore={loadMore}
    />
   )}
  </ScrollView>
 );
};
