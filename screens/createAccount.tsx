import { View } from "react-native";
import { CreateAccount } from "../components/Auth/CreateAccountForm";

export const CreateAccountScreen = () => {

    return (
        <View className="bg-grayScreen p-10">
            <CreateAccount signIn={() => {}} /> {/* func for navigation */}
        </View>
    );
};