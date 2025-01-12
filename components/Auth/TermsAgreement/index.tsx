import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Checkbox } from "react-native-paper";

export const TermsAgreement = () => {
 const openUrl = (url: string) => {
  Linking.openURL(url).catch((err) =>
   console.error("Failed to open URL:", err)
  );
 };

 return (
  <View className="flex-row">
   <Checkbox status="checked" color="green" disabled />
   <Text className="text-xs text-gray-600 ml-2">
    I agree to Postcraft’s{" "}
    <Text
     className="text-xs text-blue-600"
     onPress={() => openUrl("https://your-terms-url.com")}
    >
     Terms of Service
    </Text>
    {"\n"}and{" "}
    <Text
     className="text-xs text-blue-600"
     onPress={() => openUrl("https://your-privacy-policy-url.com")}
    >
     Privacy Policy
    </Text>
   </Text>
  </View>
 );
};
