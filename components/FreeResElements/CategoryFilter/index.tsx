import { FC } from "react";
import { View } from "react-native";
import { CategoryTags } from "../../../lib/helpers/categoryTags";
import { FreeResCategories } from "../../../lib/constants";
import { CategoryFilterProps } from "../../../Types/FreeResourcesTypes";

export const FreeResCats: FC<CategoryFilterProps> = ({ setCurrentCategory, currentCategory }) => {
    
    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
    };

    const isActive = (category: string) => currentCategory === category;

    return (
        <View className="mt-4">
            <CategoryTags
                categories={FreeResCategories}
                handleCategoryClick={handleCategoryClick}
                isActive={isActive}
            />
        </View>
    );
};
