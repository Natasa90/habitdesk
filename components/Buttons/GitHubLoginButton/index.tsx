import { useState, useEffect } from "react";
import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { AccountButton } from "@/components/Buttons/AccountButton";
import { signInWithGitHub } from "@/lib/helpers/authHelpers";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import supabase from "@/lib/supabase";

export const GitHubButton = () => {
  const [signinError, setSigninError] = useState<string | null>(null);



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
