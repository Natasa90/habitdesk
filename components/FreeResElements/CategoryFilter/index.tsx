import { FC } from "react";
import { CategoryTags } from "../../../lib/helpers/categoryTags";
import { FreeResCategories } from "../../../lib/constants";
import { CategoryFilterProps } from "../../../Types/FreeResourcesTypes";

export const FreeResCats: FC<CategoryFilterProps> = ({
 currentCategory,
 setCurrentCategory,
}) => {
 const handleCategoryClick = (category: string) => {
  setCurrentCategory(category);
 };

 const isActive = (category: string) => currentCategory === category;

 return (
   <CategoryTags
    categories={FreeResCategories}
    handleCategoryClick={handleCategoryClick}
    isActive={isActive}
   />
 );
};
