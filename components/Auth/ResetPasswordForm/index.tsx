import { FC, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../../lib/supabase";
import { ResetPasswordProps } from "../../../Types/AuthTypes";
import { AccountButton } from "@/components/AccountButton";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { FontAwesome } from "@expo/vector-icons";

export const ResetPassword: FC<ResetPasswordProps> = ({ resetPassword }) => {
 const [email, setEmail] = useState("");
 const [isEmailValid, setIsEmailValid] = useState(true);
 const navigation = useTypedNavigation();

 const handlePasswordReset = async () => {
  if (!email.trim()) {
   setIsEmailValid(false); 
    Alert.alert("Resseting password failed!/n Please enter your email address to reset the password.");
    return;
  }

  try {
   const { data, error } = await supabase.auth.resetPasswordForEmail(email);

   if (error) {
    Alert.alert(
     "Account Not Found",
     "No account found with this email address."
    );
   } else {
    Alert.alert(
     "Success",
     `A password reset email has been sent to ${email}.`,
     [
      {
       text: "OK",
       onPress: () => navigation.navigate("Login"),
      },
     ]
    );
   }
  } catch (error: any) {
   Alert.alert("Error", "Something went wrong. Please try again later.");
   console.log(`<ResetPassword Request>Error Msg: ${error.message}`);
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
   <Text className="mx-4 text-center mt-3 mb-2 italic text-sm text-gray-600">
    Enter your email address below, and we'll send you a link to reset your
    password.
   </Text>
   <View className="px-4 py-6">
    <View className="space-y-5">
     <View>
      <View className="flex-row items-center">
       <FontAwesome
        name="envelope-o"
        size={24}
        color="gray"
        style={{ paddingLeft: 3 }}
       />
       <Text className="text-base font-medium text-gray-900 pl-2">Email</Text>
      </View>
      <View className="mt-2.5">
       <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
         setEmail(text);
         if (!text.trim()) setIsEmailValid(false);
         else setIsEmailValid(true);
        }}
        className="w-full py-4 pl-3 text-black placeholder-gray-500 bg-white border rounded-md"
        style={{
         borderColor: isEmailValid ? "gray" : "red",
         borderWidth: 1,
        }}
       />
      </View>
     </View>
     <View className="flex items-center justify-between">
      <TouchableOpacity onPress={() => resetPassword()}>
       <Text className="text-base font-medium text-orange-500">Cancel</Text>
      </TouchableOpacity>
     </View>
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
