import { ScrollView } from "react-native";
import { FreeResHeader } from "../components/FreeResElements/FreeResHeader";
import { FreeResList } from "../components/FreeResElements/FreeResources";

export const FreeResourcesScreen = () => {

    return (
        <ScrollView className="flex-1 bg-grayScreen p-10">
            <FreeResHeader />
            <FreeResList />
            <FreeResList /> 
        </ScrollView>
    );
};