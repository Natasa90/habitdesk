import { useState } from "react";
import { View } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";
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
   <View className="items-center mb-4">
    <TextWrapper className="text-3xl font-IBM_semibold">Porch</TextWrapper>
    <TextWrapper className="text-lg font-IBM_mediumc color-blue-700">
     - Your Growth Dashboard -
    </TextWrapper>
   </View>
   <View className="gap-2 mt-4">
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
