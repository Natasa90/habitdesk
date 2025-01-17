import { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { CategoryTagsProps } from "../../Types/FreeResourcesTypes";
import { MaterialIcons } from "@expo/vector-icons";

export const CategoryTags: FC<CategoryTagsProps> = ({
 categories,
 handleCategoryClick,
 isActive,
}) => {
 return (
  <View className="mt-6">
   <View className="flex-row justify-center gap-2">
    <MaterialIcons name="category" size={24} color="#FF6347" />
    <Text className="text-xl text-center color-gray-700">Categories</Text>
   </View>
   <View className="flex-row flex-wrap gap-4 justify-center mt-1 mb-6">
    {categories.map((category) => {
     const categoryName =
      typeof category === "string" ? category : category.name;
     const isActiveCategory = isActive(categoryName);

     return (
      <Pressable
       key={categoryName}
       onPress={() => handleCategoryClick(categoryName)}
       className={`border border-indigo-300 rounded-full px-2.5 py-1 ${
        isActive(categoryName)
         ? "bg-blue-500 text-white"
         : "bg-indigo-50 text-indigo-600"
       }`}
      >
       <Text
        className={`text-xs font-semibold ${
         isActiveCategory ? "text-white" : "text-indigo-700"
        }`}
       >
        {categoryName === "all" ? "ALL" : categoryName}
       </Text>
      </Pressable>
     );
    })}
   </View>
  </View>
 );
};
