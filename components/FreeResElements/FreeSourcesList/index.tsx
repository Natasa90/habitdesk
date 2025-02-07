import { FC } from "react";
import { FlatList } from "react-native";
import { FreeSource } from "./FreeSources";
import { FreeSourcesListProps } from "@/Types/FreeResourcesTypes";

export const FreeSourcesList: FC<FreeSourcesListProps> = ({ facts }) => {
 return (
  <FlatList
   data={facts}
   keyExtractor={(item) => item.id.toString()}
   renderItem={({ item }) => <FreeSource fact={item} />}
   className="border-t-4 border-[#e5e7eb] pt-8"
  />
 );
};
