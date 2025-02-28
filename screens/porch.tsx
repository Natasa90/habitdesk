import { useState, useEffect, useContext } from "react";
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
import {
 usePorchLearningDays,
 usePorchs,
 useFilteredPorchs,
} from "@/lib/hooks";
import { UserInfoContext } from "@/context/UserInfoContext";

export const PorchScreen = () => {
 const { userInfo } = useContext(UserInfoContext);
 const learningDays = usePorchLearningDays(userInfo?.email);
 const { porchs, loading, hasMore, loadMore, setPorchs, refetchAllPorchs } = usePorchs();
 const {
  porchs: userPorchs,
  loading: userLoading,
  filtering,
  loadUserPorchs,
  setPorchs: setUserPorchs,
 } = useFilteredPorchs(userInfo?.email);

 const [isFiltering, setIsFiltering] = useState(false);

   const handleFiltering = async () => {
  if (!isFiltering) {
    await loadUserPorchs();  // Load user-specific porches
  } else {
    refetchAllPorchs(); // This will refetch all porches from the beginning
  }
  setIsFiltering(!isFiltering);
};
 return (
  <ScrollView className="flex-1 p-5">
   <PorchHeader />
   <PorchListHeader
    learningDays={learningDays}
    buttonTitle={isFiltering ? "Show All Updates" : "Show My Updates"} // Dynamic Button Text
    handleFiltering={handleFiltering}
   />
   {loading || userLoading ? (
    <View className="flex items-center justify-center mt-10">
     <ActivityIndicator size="large" color="#3b82f6" />
     <TextWrapper className="mt-4 text-gray-600">
      Loading updates...
     </TextWrapper>
    </View>
   ) : (
    <PorchList
     porchs={filtering ? userPorchs : porchs}
     setPorchs={filtering ? setUserPorchs : setPorchs}
    />
   )}
   {hasMore && !loading && !filtering && (
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
      {filtering ? "Showing only your updates" : "You have seen it all!"}
     </TextWrapper>
    </View>
   )}
  </ScrollView>
 );
};
