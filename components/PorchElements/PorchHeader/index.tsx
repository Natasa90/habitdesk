import { useState, useContext } from "react";
import { View, Alert } from "react-native";
import { PorchUserButtonGoals } from "../PorchUserButtonGoals";
import { PorchUserButtonUpdates } from "../PorchUserButtonUpdates";
import { Quotes } from "../Quotes";
import { UserInfoContext } from "@/context/UserInfoContext";
import { PorchUpdateForm } from "../PorchUpdateForm";

export const PorchHeader = () => {
 const [showForm, setShowForm] = useState(false);
 const [showUserForm, setShowUserForm] = useState(false);

 const { userInfo } = useContext(UserInfoContext);
 const isUserLoggedIn = Boolean(userInfo?.email);

 const handleButtonClick = () => {
  if (isUserLoggedIn) {
   setShowForm(true);
  } else {
   Alert.alert("Please log in to submit an update!");
  }
 };

 return (
  <View>
   <PorchUserButtonGoals
    showForm={showUserForm}
    setShowForm={setShowUserForm}
   />

   <PorchUserButtonUpdates
    showForm={showForm}
    setShowForm={handleButtonClick}
   />

   <Quotes />

   {showForm && (
    <PorchUpdateForm setShowForm={setShowForm} setPorchs={() => {}} />
   )}
  </View>
 );
};
