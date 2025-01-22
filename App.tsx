import { useState, useEffect } from "react";
import * as Font from "expo-font"; 
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

const Stack = createNativeStackNavigator();

export default function App() {

 const [userInfo, setUserInfo] = useState<UserContextProps["userInfo"]>(null);
 useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Raleway": require("./assets/fonts/Kanit-Regular.ttf"), 
      });
    }

    loadFonts();
  }, []);

 return (
  <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
     <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{
       headerShown: false,
      }}
     />
     <Stack.Screen
      name="Home"
      component={HomeScreen}
     options={{
       headerShown: false,
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
      }}
     />
     <Stack.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{
       headerLeft: () => null,
       headerStyle: {
        backgroundColor: "#f8f8f8",
       },
       headerTitle: "User Profile",
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
      }}
     />
    </Stack.Navigator>
    <StatusBar style="dark" />
    <Footer />
   </NavigationContainer>
  </UserInfoContext.Provider>
 );
}
