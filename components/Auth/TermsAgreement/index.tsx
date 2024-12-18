import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Checkbox } from 'react-native-paper'; 

export const TermsAgreement = () => {

    const openUrl = (url: string) => {
        Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    };

    return (
    <View className="flex-row">
        <Checkbox
            status="checked"
            color="green"
            disabled
        />
        <Text className="text-xs text-gray-600 ml-2">
            I agree to Postcraft’s{' '}
            <TouchableOpacity onPress={() => openUrl('https://your-terms-url.com')}>
                <Text className="text-xs text-blue-600 ">Terms of Service</Text>
            </TouchableOpacity>
                {'\n'} {/* Line break here */}
                and{' '}
            <TouchableOpacity onPress={() => openUrl('https://your-privacy-policy-url.com')}>
                <Text className="text-xs text-blue-600">Privacy Policy</Text>
            </TouchableOpacity>
        </Text>
    </View>
  );
};

