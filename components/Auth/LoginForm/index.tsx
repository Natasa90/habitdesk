import { useState, FC, useContext } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert 
} from "react-native";
import { supabase } from "@/lib/supabase";
import { LoginProps } from "../../../Types/AuthTypes";
import { useTypedNavigation } from "../../../lib/hooks/useTypedNavigation";
import { UserInfoContext } from "@/context/UserInfoContext";

export const LoginForm: FC<LoginProps> = ({ signUp, resetPassword }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigation = useTypedNavigation(); 

    const { setUserInfo } = useContext(UserInfoContext);

       const signInWithEmail = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.log('Login Error:', error.message); 
                Alert.alert("Login failed!", error.message);
            } else {
                const user = data?.user;
                const session = data?.session;

                if (user) {
                    Alert.alert("Login successful!");

                    console.log("User:", user);
                    console.log("Session:", session);

                    // Update userInfo context
                    setUserInfo({ email: user.email });

                    // Navigate to UserProfile or other protected pages
                    navigation.navigate("UserProfile");
                } else {
                    console.log("No user data found.");
                }
            }
        } catch (error) {
            console.log('Unexpected error:', error);  
        }
    };

    return (
        <View className="p-6 bg-white rounded-xl shadow-md" style={{
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.25, 
            shadowRadius: 3.5, 
            elevation: 5, 
        }}>
            <View className="flex-row">
                <Text className="text-xl font-bold text-gray-900 mb-6">Sign in</Text>
            </View>
            <View className="space-y-4">
                <Text className="text-base font-medium text-gray-900">Email</Text>
                <TextInput
                    placeholder="Email address"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    className="px-3 py-3 mt-2 border border-gray-300 rounded-md text-gray-900"
                />
                <Text className="text-base font-medium text-gray-900">Password</Text>
                <TextInput
                    placeholder="Password (min. 8 characters)"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className="px-3 py-3 mt-2 border border-gray-300 rounded-md text-gray-900"
                />
                <TouchableOpacity onPress={resetPassword}>
                    <Text className="text-sm text-gray-500 pb-3">
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signInWithEmail}
                    className="py-3 mt-4 bg-gray-900 rounded-md"
                >
                    <Text className="text-white text-center">Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    className="py-3 mt-4 bg-[#24292e] rounded-md"
                >
                    <Text className="text-white text-center">Sign in with GitHub</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-center text-gray-500 my-6">
                Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={signUp}>
                <Text className="text-center font-bold text-xl text-[#0B65C2]">
                    Join now
                </Text>
            </TouchableOpacity>
        </View>
    );
};
