import { FC } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { BackgroundWrapperProps } from "@/Types/LayoutTypes";

export const BackgroundWrapper: FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/home-bg.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%", 
  },
  container: {
    flex: 1,
  },
});
