import { useState, FC } from "react";
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { CreateAccountProps } from "../../../Types/AuthTypes";
import { TermsAgreement } from "../TermsAgreement";
import Icon from 'react-native-vector-icons/FontAwesome';

export const CreateAccount: FC<CreateAccountProps> = ({ signIn }) => {

    const [newUserEmail, setNewUserEmail] = useState<string>("");
    const [newUserPassword, setNewUserPassword] = useState<string>("");
    const [signUpError, setSignUpError] = useState<string>("");
    const [emailConfirmationSent, setEmailConfirmationSent] = useState<boolean>(false);
    const [matchingPassword, setMatchingPassword] = useState<string>("");

    const signUpWithEmail = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: newUserEmail,
                password: newUserPassword,
            });
        if (error) {
            let customMessage;
                if (error.message === "User already registered") {
                    customMessage = "There is already an account registered with this email.";
                } else {
                    console.log("This is the Error:", error.message);
                    customMessage =
                    "The email or password given is not valid. Please try again. ";
                }
            setSignUpError(customMessage);
        } else {
            const user = JSON.stringify(data);
            setEmailConfirmationSent(true);
            Alert.alert("Demo signUp success! :)");
        }
        } catch (error) {
            console.log("Error during signUp: ", error);
        }
    };

    return (
        <View
            className="p-6 bg-gray-50 rounded-xl shadow-md"
            style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
            }}
        >
            {emailConfirmationSent ? (
                <View className="flex-1 items-center justify-center bg-blue-600">
                    <Text className="text-white text-2xl font-bold mb-2">
                        THANKS FOR SIGNING UP!
                    </Text>
                     <Text className="text-white text-lg mb-1">
                        Check your email to verify your account.
                    </Text>
                    <Text className="text-slate-300 text-base italic">
                         You will be redirected to the home page soon.
                     </Text>
                </View>
                ) : (
                <ScrollView>
                    <Text className="text-xl text-center font-semibold text-gray-900 mb-4">
                        Create free account
                    </Text>
                    <Text className="text-center pb-8 text-gray-500">
                        You can create a free Celebration account in 2 minutes
                    </Text>
                    <Text className="p-1">Email address</Text>
                    <TextInput
                        placeholder="Enter email to get started"
                        className="border border-gray-300 rounded-md p-4 mb-4 text-gray-700"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={newUserEmail}
                        onChangeText={setNewUserEmail}
                    />
                    <Text className="p-1">Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        className="border border-gray-300 rounded-md p-4 mb-4 text-gray-700"
                        secureTextEntry
                        value={newUserPassword}
                        onChangeText={setNewUserPassword}
                    />
                    <Text className="p-1">Confirm Password</Text>
                    <TextInput
                        placeholder="Confirm Password"
                        className="border border-gray-300 rounded-md p-4 mb-6 text-gray-700"
                        secureTextEntry
                        value={matchingPassword}
                        onChangeText={setMatchingPassword}
                    />
                    <TermsAgreement />
                    <TouchableOpacity
                        className="bg-blue-600 rounded-md py-4 items-center mt-5"
                        onPress={signUpWithEmail}
                    >
                        <Text className="text-white text-lg font-bold">Create account</Text>
                    </TouchableOpacity>
                    {signUpError ? (
                        <Text className="text-red-500 mb-4 text-center mt-4">{signUpError}</Text>
                    ) : null}
                    <View className="flex-row justify-center mt-4">
                        <Text className="text-gray-700">Already have an account? </Text>
                        <TouchableOpacity onPress={signIn}>
                             <Text className="text-orange-500">Login here</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
