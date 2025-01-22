import { FC } from 'react'; 
import { View, Text } from "react-native";
import { FormTitleProps } from "@/Types/AuthTypes";

export const FormTitle: FC <FormTitleProps> = ({ title }) => {

 return (
   <View className="mt-10 mb-6">
   <Text className="text-2xl text-customBlue text-center">
    {title}
   </Text>
  </View>
 );
};
