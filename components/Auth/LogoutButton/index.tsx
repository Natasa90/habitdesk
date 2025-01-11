import { useContext, useState } from "react";
import { TouchableOpacity, Text, Alert, View, ActivityIndicator } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useTypedNavigation } from "../../../lib/hooks/useTypedNavigation";
import { UserInfoContext } from "@/context/UserInfoContext";

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
            routes: [{ name: 'Home' }],
        });
      } catch (error) {
          Alert.alert("Logout Error");
      } finally {
          setLoading(false);       
      }
  };

  return (
    <View className="flex-1 justify-center items-center">
      {loading ? (
        <ActivityIndicator size="large" color="#0B65C2" />
      ) : (
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-[#0B65C2] w-40 py-2 px-4 rounded-md"
        >
          <Text className="text-white text-center">Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
