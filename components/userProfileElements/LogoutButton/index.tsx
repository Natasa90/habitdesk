import { useContext, useState } from "react";
import {
 Text,
 Alert,
 View,
 ActivityIndicator,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { useTypedNavigation } from "../../../lib/hooks/useTypedNavigation";
import { UserInfoContext } from "@/context/UserInfoContext";
import { AccountButton } from "@/components/AccountButton";

export const LogoutButton = () => {
 const navigation = useTypedNavigation();
 const { setUserInfo } = useContext(UserInfoContext);
 const [loading, setLoading] = useState(false);

 const handleLogout = async () => {
  try {
   setLoading(true);
   const { error } = await supabase.auth.signOut();
   if (error) throw error;
   setUserInfo(null);
   navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
   });
  } catch (error) {
   Alert.alert("Logout Error");
  } finally {
   setLoading(false);
  }
 };

 return (
  <View className="ml-6">
   {loading ? (
    <ActivityIndicator size="large" color="#0B65C2" />
   ) : (
    <AccountButton onPress={handleLogout}>
     <Text className="text-white text-center">Logout</Text>
    </AccountButton>
   )}
  </View>
 );
};
