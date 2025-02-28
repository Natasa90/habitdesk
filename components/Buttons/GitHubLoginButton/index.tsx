import { useState, useEffect } from "react";
import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { AccountButton } from "@/components/Buttons/AccountButton";
import { useGitHubAuth } from "@/lib/helpers";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import supabase from "@/lib/supabase";

export const GitHubButton = () => {
  const [signinError, setSigninError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigation = useTypedNavigation();
  const { response, promptAsync, handleGitHubSignIn } = useGitHubAuth();

  useEffect(() => {
    handleGitHubSignIn(
      (user) => {
        setUserInfo(user);
        navigation.navigate("UserProfile");
      },
      (error) => {
        setSigninError(error);
      }
    );
  }, [response]);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUserInfo(session.user);
          navigation.navigate("UserProfile");
        } else if (event === "SIGNED_OUT") {
          setUserInfo(null);
        }
      }
    );

    return () => {
    subscription?.subscription?.unsubscribe(); 
  };
  }, []);

  return (
    <View>
      <AccountButton onPress={() => promptAsync()}>
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
