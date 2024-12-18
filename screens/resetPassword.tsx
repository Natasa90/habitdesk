import { View } from "react-native";
import { ResetPassword } from "../components/Auth/ResetPasswordForm";

export const ResetPasswordScreen = () => {

    return (
        <View className="flex-1 bg-grayScreen p-10">
            <ResetPassword resetPassword={() => {}} />
        </View>
    );
};