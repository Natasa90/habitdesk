import { Text as RNText } from "react-native";

declare module "react-native" {

  interface TextProps {
    style?: any; 
  }

  interface Text {
    defaultProps: TextProps;
  }
}
