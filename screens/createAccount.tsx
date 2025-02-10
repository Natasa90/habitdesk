import { CreateAccount } from "@/components/Auth";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const CreateAccountScreen = () => {
 const navigation = useTypedNavigation();

 const handleLogin = () => {
  navigation.navigate("Login");
 };

 return (
    <CreateAccount signIn={handleLogin} />
 );
};
