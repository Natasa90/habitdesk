import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { LogoutButton } from "../components/Auth/LogoutButton";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";
import { Ionicons } from '@expo/vector-icons';

export const UserProfileScreen = () => {

    const navigation = useTypedNavigation(); 

     return (
        <ScrollView className="flex-1 space-y-6 p-6">
            <TouchableOpacity
                onPress={() => navigation.navigate("Porch")}
                className="bg-gray-300 p-6 rounded-xl shadow-md flex-row justify-center items-center"
            >
                <Text className="text-lg text-gray-900">Go to Porch Screen</Text>
                <Ionicons name="arrow-forward" size={18} color="black" style={{marginLeft: 5, marginTop: 3}} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("FreeResources")}
                className="bg-gray-300 p-6 rounded-xl shadow-md flex-row justify-center items-center mb-6"
            >
                <Text className="text-lg text-gray-900">Go to Free Resources</Text>
                <Ionicons name="arrow-forward" size={18} color="black" style={{marginLeft: 5, marginTop: 3}} />
            </TouchableOpacity>
            <LogoutButton />
        </ScrollView>
    );
};