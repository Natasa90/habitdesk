import { ResetPassword } from "@/components/Auth";
import { useTypedNavigation } from "../lib/hooks/useTypedNavigation";

export const ResetPasswordScreen = () => {
 const navigation = useTypedNavigation();

 const handleCancelReset = () => {
  navigation.navigate("Login");
 };

 return (
   <ResetPassword resetPassword={handleCancelReset} />
 );
};
