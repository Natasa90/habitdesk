import { useState, FC, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { LoginProps } from "../../../Types/AuthTypes";
import { useTypedNavigation } from "../../../lib/hooks/useTypedNavigation";
import { UserInfoContext } from "@/context/UserInfoContext";
import { AccountButton } from "@/components/AccountButton";
import { GitHubButton } from "../GitHubLoginButton";
import { FontAwesome } from "@expo/vector-icons";

export const LoginForm: FC<LoginProps> = ({ signUp, resetPassword }) => {
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const [isEmailValid, setIsEmailValid] = useState(true);
 const [isPasswordValid, setIsPasswordValid] = useState(true);
 const navigation = useTypedNavigation();

 const { setUserInfo } = useContext(UserInfoContext);

 const handleEmailChange = (text: string) => {
  setEmail(text);
  setIsEmailValid(true);
 };

 const handlePasswordChange = (text: string) => {
  setPassword(text);
  setIsPasswordValid(true);
 };

 const signInWithEmail = async () => {
  if (!email.trim()) {
   setIsEmailValid(false);
  }

  if (password.length < 8) {
   setIsPasswordValid(false);
  }

  try {
   const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
   });

   if (error) {
    console.log("Login Error:", error.message);
    Alert.alert("Login failed!", error.message);
    setIsEmailValid(false);
    setIsPasswordValid(false);
   } else {
    const user = data?.user;
    const session = data?.session;

    if (user) {
     setUserInfo({ email: user.email });
     navigation.navigate("UserProfile");
    } else {
     console.log("No user data found.");
    }
   }
  } catch (error) {
   console.log("Unexpected error:", error);
  }
 };

 return (
  <View
   className="p-6 bg-white rounded-xl shadow-md"
   style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
   }}
  >
   <View className="flex-row">
    <FontAwesome
     name="envelope-o"
     size={24}
     color="gray"
     style={{ paddingLeft: 3 }}
    />
    <Text className="text-base font-medium text-gray-900 pl-2">Email</Text>
   </View>
   <TextInput
    placeholder="Email address"
    keyboardType="email-address"
    value={email}
    onChangeText={handleEmailChange}
    className={`px-3 py-3 border ${
     isEmailValid ? "border-gray-300" : "border-red-500"
    } rounded-md text-gray-900 mt-2 mb-5`}
   />
   <View className="flex-row">
    <FontAwesome
     name="lock"
     size={26}
     color="gray"
     style={{ paddingLeft: 3 }}
    />
    <Text className="text-base font-medium text-gray-900 pl-2">Password</Text>
   </View>
   <TextInput
    placeholder="Password (min. 8 characters)"
    secureTextEntry
    value={password}
    onChangeText={handlePasswordChange}
    className={`px-3 py-3 mt-1 mb-5 border ${
     isPasswordValid ? "border-gray-300" : "border-red-500"
    } rounded-md text-gray-900`}
   />
   <TouchableOpacity onPress={resetPassword}>
    <Text className="text-sm text-gray-500 pb-3">Forgot Password?</Text>
   </TouchableOpacity>
   <AccountButton onPress={signInWithEmail}>
    <Text className="text-white">Log In</Text>
   </AccountButton>
   <GitHubButton />
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
