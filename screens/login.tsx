import { View } from "react-native";
import { LoginForm } from "../components/Auth/LoginForm";

export const LoginScreen = () => {

    return (
        <View>
          <LoginForm 
            signIn={() => {}}
            resetPassword={() => {}} /> 
        </View>
      );
    };