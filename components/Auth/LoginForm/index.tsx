import { useRef, FC } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../../lib/supabase";
import { LoginProps } from "../../../Types/AuthTypes";

export const LoginForm: FC<LoginProps>= ( { signIn, resetPassword} ) => {

    const userEmailRef = useRef<TextInput>(null); 
	const userPasswordRef = useRef<TextInput>(null);

    const signInWithEmail = async () => {
		try {
            const email = userEmailRef.current?.props.value || "";
            const password = userPasswordRef.current?.props.value || "";

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
        <View className="flex-1 justify-center p-6 bg-white rounded-xl shadow-md">
          <Text className="text-xl font-bold text-gray-900 mb-4">Sign in</Text>
    
          <View className="space-y-4">
            <View>
              <Text className="text-base font-medium text-gray-900">Email</Text>
              <TextInput
                ref={userEmailRef}
                placeholder="Email address"
                keyboardType="email-address"
                className="block w-full px-4 py-3 mt-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </View>
    
            <View>
              <Text className="text-base font-medium text-gray-900">Password</Text>
              <TextInput
                ref={userPasswordRef}
                placeholder="Password (min. 8 characters)"
                secureTextEntry
                className="block w-full px-4 py-3 mt-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
            </View>
    
            <TouchableOpacity
              onPress={signInWithEmail}
              className="w-full px-4 py-3 mt-4 bg-gray-900 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            >
              <Text className="text-white text-center">Sign in</Text>
            </TouchableOpacity>
          </View>
    
          <Text className="mt-6 text-center text-gray-500">
            Don’t have an account?{" "}
            <TouchableOpacity onPress={signIn}>
              <Text className="font-bold text-gray-900 hover:underline">
                Join now
              </Text>
            </TouchableOpacity>
          </Text>
    
          <TouchableOpacity onPress={resetPassword} className="mt-4 text-center">
            <Text className="text-sm text-gray-500 hover:text-gray-900 hover:underline">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      );
    };