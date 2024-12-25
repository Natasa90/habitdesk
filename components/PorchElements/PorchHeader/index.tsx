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
      setShowForm(true); // Show the form if logged in
    } else {
      Alert.alert("Please log in to submit an update!"); // Alert if not logged in
    }
  };

  return (
    <View>
      {/* Button for Goals */}
      <PorchUserButtonGoals
        showForm={showUserForm}
        setShowForm={setShowUserForm}
      />

      {/* Button for Posting Updates */}
      <PorchUserButtonUpdates
        showForm={showForm}
        setShowForm={handleButtonClick} // Passing the function to handle button click
      />

      {/* Display Quotes */}
      <Quotes />

      {/* Display the form when showForm is true */}
      {showForm && <PorchUpdateForm setShowForm={setShowForm} setPorchs={() => {}} />}
    </View>
  );
};
