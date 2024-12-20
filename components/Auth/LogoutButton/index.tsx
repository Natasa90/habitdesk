import { TouchableOpacity, Text, Alert, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useTypedNavigation } from "../../../lib/hooks/useTypedNavigation";

export const LogoutButton = () => {

     const navigation = useTypedNavigation(); 

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        } catch (error) {
            Alert.alert("Logout Error");
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
        <TouchableOpacity
            onPress={handleLogout}
            className="bg-[#0B65C2] w-40 py-2 px-4 rounded-md"
        >
            <Text className="text-white text-center">Logout</Text>
        </TouchableOpacity>
        </View>
    );
};
