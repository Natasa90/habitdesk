import { useState, FC } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert 
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { LoginProps } from "../../../Types/AuthTypes";

export const LoginForm: FC<LoginProps>= ( { signUp, resetPassword } ) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signInWithEmail = async () => {
	    try {
			const { error } = await supabase.auth.signInWithPassword({
			    email,
			    password,
			});
			
			if (error) {
                Alert.alert("Demo login error! :)");
			} else {
                Alert.alert("Demo login success! :)");
			}
		} catch (error) {
		    console.log(error);
		}
	};

    return (
        <View className="p-6 bg-white rounded-xl shadow-md"style={{
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.25, 
            shadowRadius: 3.5, 
            elevation: 5, 
        }}>
            <View className="flex-row">
                <Text className="text-xl font-bold text-gray-900 mb-4">Sign in</Text>
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
            </View>
            <Text className="text-center text-gray-500 mt-4">
                Don’t have an account?{" "}
                <TouchableOpacity onPress={signUp} className="mt-2">
                    <Text className="font-bold text-gray-900">
                        Join now
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>
      );
    };