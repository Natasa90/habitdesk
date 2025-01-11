import { FC, useState } from "react";
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Alert,
 StyleSheet,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { ResetPasswordProps } from "../../../Types/AuthTypes";
import { AccountButton } from "@/components/AccountButton";

export const ResetPassword: FC<ResetPasswordProps> = ({ resetPassword }) => {
 const [email, setEmail] = useState("");
 const [errorMsg, setErrorMsg] = useState("");

 const handlePasswordReset = async () => {
  try {
   await supabase.auth.resetPasswordForEmail(email);
   Alert.alert(`Password reset email sent!\nPlease check your: ${email}`);
  } catch (error: any) {
   Alert.alert(`Password reset email sent\nPlease check your: ${email}`);
   console.log(`<ResetPassword Request>Error Msg: ${error.message}`);
   setErrorMsg(error.message);
  }
 };

 return (
  <View
   className="px-4 py-6 bg-gray-50 rounded-xl shadow-md"
   style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
   }}
  >
   <View className="flex-row gap-2 justify-center">
    <Text className="text-2xl text-center font-bold mt-1">
     Reset Your Password
    </Text>
   </View>
   <Text className="mx-auto text-center mt-3 text-base text-gray-600">
    Login to your account
   </Text>
   <View className="px-4 py-6">
    <View className="space-y-5">
     <View>
      <Text className="ml-1 text-base font-medium text-gray-900">Email</Text>
      <View className="mt-2.5 text-gray-400">
       <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        className="w-full py-4 pl-3 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md"
       />
      </View>
     </View>
     <View>
      <View className="flex items-center justify-between">
       <TouchableOpacity onPress={() => resetPassword()}>
        <Text className="text-sm font-medium text-orange-500">Cancel</Text>
       </TouchableOpacity>
      </View>
     </View>
     {errorMsg && <Text className="text-red-500">{errorMsg}</Text>}
     <View>
      <AccountButton onPress={handlePasswordReset}>
       <Text className="text-white">Reset Password</Text>
      </AccountButton>
     </View>
    </View>
   </View>
  </View>
 );
};
