import { View } from "react-native";
import { LoginForm } from "../components/Auth/LoginForm";

export const LoginScreen = () => {

    return (
        <View className="bg-grayScreen p-10">
            <LoginForm 
                signUp={() => {}} 
                resetPassword={() => {}} /> {/* navigate to CreateAccount screen and ResetPassword Screen*/}
        </View>
    );
};