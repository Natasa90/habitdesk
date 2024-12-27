import { ScrollView, View, Text } from "react-native";
import { FreeResTitle } from "@/components/FreeResElements/FreeResTitle";
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
      <FreeResTitle title="Free Resources" />
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
