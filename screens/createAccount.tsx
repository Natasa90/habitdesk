import { View } from "react-native";
import { CreateAccount } from "../components/Auth/CreateAccountForm";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const CreateAccountScreen = () => {

    const navigation = useTypedNavigation(); 

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View className="bg-grayScreen p-9">
            <CreateAccount signIn={handleLogin} />
        </View>
    );
};