import { View } from "react-native";
import TextWrapper from "@/components/TextWrapper";

export const FreeResHeader = () => {
 return (
  <View className="items-center">
   <TextWrapper className="text-3xl font-IBM_semibold text-center">Free Learning Resources</TextWrapper>
   <TextWrapper className=" text-center font-IBM_lightItalic">
    Explore by category, access trusted links, and share your insights in the
    comment section. Have a favorite resource? Add your own and help others
    learn.
   </TextWrapper>
  </View>
 );
};
