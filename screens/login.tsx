import { View } from "react-native";
import { LoginForm } from "../components/Auth/LoginForm";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const LoginScreen = () => {

    const navigation = useTypedNavigation(); 

    const handleSignUp = () => {
        navigation.navigate("CreateAccount");
    };

    const handleResetPassword = () => {
        navigation.navigate("ResetPassword");
    };

    return (
        <View className="bg-grayScreen p-10">
            <LoginForm 
                signUp={handleSignUp}
                resetPassword={handleResetPassword}
            />
        </View>
    );
};