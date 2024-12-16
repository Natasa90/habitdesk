import { FC } from 'react'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { CardLayoutProps } from '../../../Types/LayoutTypes';
import { GradientText } from '../../GradientText';
import { GradientButton } from '../../GradientButton';

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
}) => {
  return (
    <View className="p-4 bg-white rounded-xl shadow-md mb-4">
       <GradientText text={title}/>
        {/* Email and Source Links */}
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
            onPress={() => Linking.openURL(porch.source.includes("http") ? porch.source : `//${porch.source}`)}
          >
            <Text className="pl-2 text-gray-900 text-sm font-medium">
              <Text className="font-bold">Source: </Text>
              <Text className="whitespace-normal">{porch.source}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Comment Section */}
        <View className="py-6 px-1 mt-auto sm:px-1">
              <Text className="pl-1 text-base font-medium text-gray-900">
                {displayComment}
                {!showMore && commentText.length > 90 && (
                  <TouchableOpacity onPress={handleMore}>
                    <Text>... read more</Text>
                  </TouchableOpacity>
                )}
              </Text>
        </View>

        {/* Like Button Section */}
        <View className="p-2">
          <Text className="text-sm text-black pl-1">
            <Text className="font-bold">Likes: </Text> {porch.excellent}
          </Text>
          <GradientButton onPress={() => handleVote("excellent")}>
            <View className='px-9 py-1'>
            <Icon name="thumbs-up-outline" size={18} color="white"/>
            </View>
          </GradientButton>
          <Text className="pt-2 pl-0.5 text-sm">{formattedDate}</Text>
        </View>

        {/* Extra Content Section */}
        {extraContent && <View className="py-5">{extraContent}</View>}
  </View>
  );
};
