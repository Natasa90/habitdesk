import { useState } from "react"
import { View } from "react-native"
import { Title } from "../FreeResTitle"
import { FreeResCats } from "../CategoryFilter"

export const FreeResHeader = () => { 
    
    const [currentCategory, setCurrentCategory] = useState<string>("ALL");

    return (
        <View className="">
            <Title title="Learning Sources" /> 
            <FreeResCats 
                setCurrentCategory={setCurrentCategory}
                currentCategory={currentCategory}  // Pass currentCategory to FreeResCats
            />  
            {/* Free Resources List */}
        </View>
    )
}