import { useContext } from "react";
import {
 ScrollView,
 View,
 ActivityIndicator,
 TouchableOpacity,
} from "react-native";
import { TextWrapper } from "@/components/Layout";
import {
 PorchHeader,
 PorchList,
 PorchListHeader,
} from "@/components/PorchElements";
import { usePorchs, usePorchLearningDays } from "@/lib/hooks";
import { UserInfoContext } from "@/context/UserInfoContext";

export const PorchScreen = () => {
 const { userInfo } = useContext(UserInfoContext);
 const { porchs, setPorchs, loading, hasMore, loadMore, toggleFilter, isFiltering } =
  usePorchs(userInfo?.email);
 const learningDays = usePorchLearningDays(userInfo?.email);

 return (
  <ScrollView className="flex-1 p-5">
   <PorchHeader />
   <PorchListHeader
    learningDays={learningDays}
    buttonTitle={isFiltering ? "All Daily Updates" : "Track your Daily Updates"}
    handleFiltering={toggleFilter}
   />

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
      className="bg-customBlue p-2 rounded-xl shadow-md justify-center items-center mb-10 w-40"
      onPress={loadMore}
     >
      <TextWrapper className="text-white">Load More Updates</TextWrapper>
     </TouchableOpacity>
    </View>
   )}

   {!hasMore && (
    <View className="mt-10 border-gray-1">
     <TextWrapper className="text-center text-gray-500">
      {isFiltering ? "Showing only your updates" : "You have seen it all!"}
     </TextWrapper>
    </View>
   )}
  </ScrollView>
 );
};
