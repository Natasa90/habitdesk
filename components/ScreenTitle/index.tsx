import { FC } from "react";
import { View } from "react-native";
import TextWrapper from "../Layout/TextWrapper";
import { TitleProps } from "../../Types/FreeResourcesTypes";

export const ScreenTitle: FC<TitleProps> = ({ title, description }) => {
 return (
  <View className="gap-3 items-center">
   <TextWrapper className="font-IBM_medium">{title}</TextWrapper>
   <TextWrapper className="font-IBM_bold">{description}</TextWrapper>
  </View>
 );
};
