import React, { useEffect, useRef, useContext } from "react";
import { View, Image, Animated, StatusBar } from "react-native";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { UserInfoContext } from "@/context/UserInfoContext";
import supabase from "@/lib/supabase";

export const SplashScreen = () => {
 const navigation = useTypedNavigation();
 const logoBounce = useRef(new Animated.Value(0)).current;
 const { userInfo, setUserInfo } = useContext(UserInfoContext);

 useEffect(() => {
  const fetchSessionAndUser = async () => {
   try {
    const { data, error } = await supabase.auth.getSession();
    if (!data.session) {
     console.log("No active session found. Redirecting to Home.");
     setUserInfo(null);
     navigation.replace("Home");
     return;
    }

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
     console.error("Error fetching user:", userError.message);
     setUserInfo(null);
     navigation.replace("Home");
     return;
    }

    setUserInfo({
     email: user?.user?.email || undefined,
    });

    navigation.replace("UserProfile");
   } catch (err) {
    console.error("Unexpected error fetching session or user:", err);
    setUserInfo(null);
    navigation.replace("Home");
   }
  };
  const startAnimation = () => {
   Animated.sequence([
    Animated.timing(logoBounce, {
     toValue: -30,
     duration: 500,
     useNativeDriver: true,
    }),
    Animated.timing(logoBounce, {
     toValue: 0,
     duration: 500,
     useNativeDriver: true,
    }),
   ]).start(() => {
    fetchSessionAndUser();
   });
  };

  startAnimation();
 }, [logoBounce, navigation, setUserInfo]);

 return (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
   <StatusBar barStyle="light-content" />

   <Animated.View
    style={{
     justifyContent: "center",
     alignItems: "center",
     transform: [{ translateY: logoBounce }],
    }}
   >
    <Image
     source={require("../assets/images/slavoio-logo.png")}
     style={{ width: 192, height: 192 }}
    />
   </Animated.View>
  </View>
 );
};
