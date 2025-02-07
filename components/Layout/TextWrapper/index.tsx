import { FC } from 'react'
import { Text, TextProps } from "react-native";

const TextWrapper: FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[{ fontFamily: "IBMPlexSerif-Regular" }, style]}>
      {children}
    </Text>
  );
};

export default TextWrapper;
