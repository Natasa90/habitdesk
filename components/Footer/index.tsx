import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';

export const Footer = () => {
  const handleOpenUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
 console.log(`Can open URL (${url}):`, supported); 
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open this URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'An unexpected error occurred while opening the URL.');
    }
  }
  return (
    <View className="items-center justify-center bg-gray-100 py-4 border-t border-gray-300 mb-2">
      <View className="flex-row items-center space-x-6 mb-2">
        <TouchableOpacity onPress={() => handleOpenUrl('https://www.facebook.com')}>
          <FontAwesome name="facebook" size={24} color="#4267B2" className="text-blue-500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenUrl('https://www.instagram.com')}>
          <FontAwesome name="instagram" size={24} color="#C13584" className="text-pink-500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenUrl('https://www.linkedin.com')}>
          <FontAwesome name="linkedin" size={24} color="#0077B5" className="text-blue-700" />
        </TouchableOpacity>
      </View>
      <Text className="text-gray-500 text-xs">
        © 2024. All rights reserved. Designed by Prototype.NEXT
      </Text>
    </View>
  );
};
