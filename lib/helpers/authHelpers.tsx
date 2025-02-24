import { Alert } from "react-native";
import supabase from "../supabase";
import { NavigationProp } from "@react-navigation/native";

export const handlePasswordReset = async (
  email: string,
  setIsEmailValid: (valid: boolean) => void,
  navigation: NavigationProp<any>
) => {
  if (!email.trim()) {
    setIsEmailValid(false);
    Alert.alert("Please add an email.");
    return;
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      Alert.alert(
        "Account Not Found",
        "No account found with this email address."
      );
    } else {
      Alert.alert("Success", `A password reset email has been sent to ${email}.`, [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    }
  } catch (error: any) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.log(`<ResetPassword Request>Error Msg: ${error.message}`);
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  setSignUpError: (message: string) => void,
  setEmailConfirmationSent: (status: boolean) => void
) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      let customMessage =
        error.message === "User already registered"
          ? "There is already an account registered with this email."
          : "The email or password given is not valid. Please try again.";

      setSignUpError(customMessage);
    } else {
      setEmailConfirmationSent(true);
      Alert.alert("SignUp success!");
    }
  } catch (error) {
    console.log("Error during sign-up: ", error);
  }
};


export const signInWithEmail = async (
  email: string,
  password: string,
  setUserInfo: (userInfo: { email?: string }) => void
) => {
  if (!email.trim()) {
    Alert.alert("Email is required!");
    return;
  }

  if (password.length < 8) {
    Alert.alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login Error:", error.message);
      Alert.alert("Login failed!", error.message);
    } else {
      const user = data?.user;
      const session = data?.session;

      if (user) {
        setUserInfo({ email: user.email });
        return true;
      } else {
        console.log("No user data found.");
      }
    }
  } catch (error) {
    console.log("Unexpected error:", error);
    Alert.alert("Unexpected error occurred. Please try again.");
  }
  return false;
};
