import { View } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "./screens/splashScreen";
import { HomeScreen } from "./screens/home";
import { UserProfileScreen } from "./screens/userProfile";
import { PorchScreen } from "./screens/porch";
import { FreeResourcesScreen } from "./screens/freeResources";
import { LoginScreen } from "./screens/login";
import { CreateAccountScreen } from "./screens/createAccount";
import { ResetPasswordScreen } from "./screens/resetPassword";
import { UserInfoContext } from "./context/UserInfoContext";
import { UserContextProps } from "./Types/User";
import { Footer } from "./components/Footer";
import { useFonts } from "./lib/hooks/useFonts";
import { BackgroundWrapper } from "./components/Layout/BackgroundWrapper";

const Stack = createNativeStackNavigator();

export default function App() {
 const [userInfo, setUserInfo] = useState<UserContextProps["userInfo"]>(null);

 const fonts = useFonts();

 return (
  <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
   <BackgroundWrapper>
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
     <NavigationContainer>
      <Stack.Navigator
       initialRouteName="Splash"
       screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        animation: "fade",
       }}
      >
       <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
         headerShown: false,
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
       <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
         headerShown: false,
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
       <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
         headerStyle: {
          backgroundColor: "#f8f8f8",
         },
         headerTitle: "",
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
       <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
         headerShown: false, // This removes the header completely
        }}
       />
       <Stack.Screen
        name="Porch"
        component={PorchScreen}
        options={{
         headerStyle: {
          backgroundColor: "#f8f8f8",
         },
         headerTitle: "",
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
       <Stack.Screen
        name="FreeResources"
        component={FreeResourcesScreen}
        options={{
         headerStyle: {
          backgroundColor: "#f8f8f8",
         },
         headerTitle: "",
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
       <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{
         headerStyle: {
          backgroundColor: "#f8f8f8",
         },
         headerTitle: "",
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
       <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
         headerStyle: {
          backgroundColor: "#f8f8f8",
         },
         headerTitle: "",
         contentStyle: { backgroundColor: "transparent" },
        }}
       />
      </Stack.Navigator>
      <StatusBar style="dark" />
      <Footer />
     </NavigationContainer>
    </View>
   </BackgroundWrapper>
  </UserInfoContext.Provider>
 );
}
