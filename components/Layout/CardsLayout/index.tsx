import { FC } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CardLayoutProps } from "../../../Types/LayoutTypes";
import { GradientText } from "../../GradientText";
import { LikeButton } from "@/components/LikeButton";

export const CardLayout: FC<CardLayoutProps> = ({
 title,
 porch,
 displayComment,
 commentText,
 showMore,
 handleMore,
 handleVote,
 isUpdating,
 formattedDate,
 extraContent,
 isVoteDisabled,
 hasVoted
}) => {

 return (
  <View
   className="p-4 bg-white rounded-xl shadow-md mb-4"
   style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
   }}
  >
   <GradientText text={title} />
   <View className="border-4 border-gray-200 rounded-xl bg-gray-200">
    {porch.email && (
     <TouchableOpacity onPress={() => Linking.openURL(`mailto:${porch.email}`)}>
      <Text className="pl-2 text-sm font-medium">
       <Text className="font-bold">User Email: </Text>
       <Text className="whitespace-normal">{porch.email}</Text>
      </Text>
     </TouchableOpacity>
    )}
    <TouchableOpacity
     onPress={() =>
      Linking.openURL(
       porch.source.includes("http") ? porch.source : `//${porch.source}`
      )
     }
    >
     <Text className="pl-2 text-gray-900 text-sm font-medium">
      <Text className="font-bold">Source: </Text>
      <Text className="whitespace-normal">{porch.source}</Text>
     </Text>
    </TouchableOpacity>
   </View>
   <View className="py-6 px-1 mt-auto">
    <Text className="pl-1 text-base font-medium text-gray-900">
     {displayComment}
     {!showMore && commentText.length > 90 && (
      <TouchableOpacity onPress={handleMore}>
       <Text>... read more</Text>
      </TouchableOpacity>
     )}
    </Text>
   </View>
   <View className="p-2">
    <Text className="text-sm text-black pl-1 mb-2">
     <Text className="font-bold">Likes: </Text> {porch.likes.length}
    </Text>
    <TouchableOpacity 
      onPress={handleVote} 
      disabled={isUpdating}
      className="mt-1">
     <View className="w-10 h-10 ml-1">
      {isUpdating ? (
                  <View></View>
                ) : hasVoted ? (
                  <Icon name="heart" size={20} color="#F87171" className="text-red-400 w-5 h-5 transform scale-125 hover:scale-150 hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <Icon name="check" size={20} className="text-blue-500 w-5 h-5 transform scale-125 hover:scale-150 hover:rotate-12 transition-transform duration-300" />
                )}
              </View>
    </TouchableOpacity>
    <Text className="pt-2 pl-0.5 text-sm">{formattedDate}</Text>
   </View>
   {extraContent && <View className="py-2">{extraContent}</View>}
  </View>
 );
};
