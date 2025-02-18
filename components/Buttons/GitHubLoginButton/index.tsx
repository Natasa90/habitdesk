import { useState, useEffect } from "react";
import { View } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { AccountButton } from "@/components/Buttons/AccountButton";
import supabase from "@/lib/supabase";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";

export const GitHubButton = () => {
 const [signinError, setSigninError] = useState<string | null>(null);
 const [userInfo, setUserInfo] = useState<any>(null);
 const redirectUri = makeRedirectUri({ scheme: "habitdesk", path: "user" });
 const navigation = useTypedNavigation();

 const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: "https://github.com/settings/applications",
 };

 const [request, response, promptAsync] = useAuthRequest(
  {
   clientId: "Ov23liZneoLCjKb7GG2q",
   scopes: ["user"],
   redirectUri,
  },
  discovery
 );

 useEffect(() => {
  if (response?.type === "success") {
   console.log("GitHub OAuth success:", response);

   const { code } = response.params;

   supabase.auth
    .signInWithOAuth({
     provider: "github",
     options: {
      redirectTo: redirectUri,
     },
    })
    .then(() => {
     supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
       if (session?.user) {
        console.log("User signed in with Supabase:", session.user);
        setUserInfo(session.user); 
        navigation.navigate("UserProfile"); 
       }
      })
      .catch((error) => {
       console.error("Error retrieving session:", error);
      });
    })
    .catch((error) => {
     setSigninError(error.message);
     console.error("Supabase OAuth error:", error);
    });
  }
 }, [response]);

 useEffect(() => {
  const {
   data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
   if (session?.user) {
    console.log("User logged in:", session.user);
    setUserInfo(session.user);
    navigation.navigate("UserProfile"); 
   } else if (event === "SIGNED_OUT") {
    setUserInfo(null); 
   }
  });

  return () => {
   subscription.unsubscribe(); 
  };
 }, []);

 const signInWithGitHub = async () => {
  try {
   await promptAsync(); 
  } catch (error) {
   console.error("Error during GitHub sign-in:", error);
  }
 };

 return (
  <View>
   <AccountButton onPress={signInWithGitHub}>
    <TextWrapper className="text-white font-IBM_semibold">
     Log In with GitHub
    </TextWrapper>
   </AccountButton>

   {signinError && (
    <TextWrapper className="text-red-500">{signinError}</TextWrapper>
   )}
  </View>
 );
};
