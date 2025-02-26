import { useState } from "react";
import { View, Image } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { PorchUserButtonGoals } from "../PorchUserButtonGoals";
import { PorchUserButtonUpdates } from "../PorchUserButtonUpdates";
import { Quotes } from "../Quotes";
import { PorchUpdateForm } from "../PorchUpdateForm";

export const PorchHeader = () => {
 const [showForm, setShowForm] = useState(false);

 const handleButtonClick = () => {
  setShowForm(true);
 };

 return (
  <View>
   <View className="items-center">
    <TextWrapper className="text-3xl font-IBM_semibold text-gray-700">Porch</TextWrapper>
    <TextWrapper className="text-lg font-IBM_lightItalic color-blue-700">
     - Your Growth Dashboard -
    </TextWrapper>
 <Image
    source={require("../../../assets/images/progress_team_transparent.png")}
    style={{ width: 250, height: 300 }}
   />
   </View>
   <View>
    <PorchUserButtonGoals />

    <PorchUserButtonUpdates setShowForm={handleButtonClick} />
   </View>
   <Quotes />

   {showForm && (
    <PorchUpdateForm setShowForm={setShowForm} setPorchs={() => {}} />
   )}
  </View>
 );
};
