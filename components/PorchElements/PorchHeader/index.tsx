import { useState } from "react";
import { View } from "react-native";
import { PorchUserButtonGoals } from "../PorchUserButtonGoals";
import { PorchUserButtonUpdates } from "../PorchUserButtonUpdates";
import { Quotes } from "../Quotes";

export const PorchHeader = () => {

    const [ showForm, setShowForm ] = useState(false);

    return (
        <View>
            <PorchUserButtonGoals
                showForm={showForm}
                setShowForm={setShowForm}
            />
            <PorchUserButtonUpdates
                showForm={showForm}
                setShowForm={setShowForm}
            />
            <Quotes />
        </View>
        
      );
};

