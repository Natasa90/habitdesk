import { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './lib/supabase';
import { HomeScreen } from './screens/home';
import { UserProfileScreen } from './screens/userProfile';
import { PorchScreen } from './screens/porch';
import { FreeResourcesScreen } from './screens/freeResources';
import { LoginScreen } from './screens/login';
import { CreateAccountScreen } from './screens/createAccount';
import { ResetPasswordScreen } from './screens/resetPassword';
import { HeaderWithIcon } from './components/HeaderWithIcon';
import { UserInfoContext } from './context/UserInfoContext';
import { UserContextProps } from './Types/User';
import { Footer } from './components/Footer';

const Stack = createNativeStackNavigator(); 

export default function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<{} | null>(null);
  const [userInfo, setUserInfo] = useState<UserContextProps["userInfo"]>(null);

  useEffect(() => {
    const initializeSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        setSession(null);
      } else {
        setSession(data.session);
      }
    } catch (err) {
      console.error("Unexpected error fetching session:", err);
    } finally {
      setLoading(false);
    }
  };

  initializeSession();

  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
  });

  return () => {
    authListener.subscription.unsubscribe();
    };
  }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={session ? "UserProfile" : "Home"}>
                    <Stack.Screen 
                        name="Home" 
                        component={HomeScreen}
                        options={{
                            headerStyle: {
                            backgroundColor: '#f8f8f8',
                            },
                            headerTitle: () => (
                                <HeaderWithIcon icon="people-group" title="Habit Desk" />
                            ),
                        }}
                    />
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen}
                        options={{
                            headerStyle: {
                            backgroundColor: '#f8f8f8',
                            },
                            headerTitle: () => (
                                <HeaderWithIcon icon="" title="" />
                            ),
                        }}
                    />
                    <Stack.Screen 
                        name="UserProfile" 
                        component={UserProfileScreen}
                        options={{
                            headerStyle: {
                            backgroundColor: '#f8f8f8',
                            },
                            headerTitle: () => (
                                <HeaderWithIcon icon="user-circle" title="Welcome!" />
                            ),
                        }}
                    />
                    <Stack.Screen 
                        name="Porch" 
                        component={PorchScreen}
                        options={{
                            headerStyle: {
                            backgroundColor: '#f8f8f8',
                            },
                        headerTitle: () => (
                            <HeaderWithIcon icon="bar-chart" title="Porch" />
                            ),
                        }}
                    />
                    <Stack.Screen 
                        name="FreeResources" 
                        component={FreeResourcesScreen}
                        options={{
                            headerStyle: {
                            backgroundColor: '#f8f8f8',
                            },
                        headerTitle: () => (
                            <HeaderWithIcon icon="book" title="Free Resources" />
                            ),
                        }}
                    />
                        <Stack.Screen 
                            name="CreateAccount" 
                            component={CreateAccountScreen}
                            options={{
                                headerStyle: {
                                backgroundColor: '#f8f8f8',
                                },
                            headerTitle: () => (
                                <HeaderWithIcon icon="" title="" />
                                ),
                            }}
                        />
                        <Stack.Screen 
                            name="ResetPassword" 
                            component={ResetPasswordScreen}
                            options={{
                                headerStyle: {
                                backgroundColor: '#f8f8f8',
                                },
                                headerTitle: () => (
                                    <HeaderWithIcon icon="" title="" />
                                ),
                            }}
                        />
                </Stack.Navigator>
                <StatusBar style="dark" />
                <Footer />
            </NavigationContainer>
       </UserInfoContext.Provider>
    );
}

