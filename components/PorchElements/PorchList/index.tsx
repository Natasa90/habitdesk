import { FC, useState, useEffect, useMemo, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { PorchListProps } from "@/Types/PorchTypes";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";
import { PorchType } from "@/Types/PorchTypes";
import { PorchDailyUpdate } from "../PorchDailyUpdate";

export const PorchList: FC<PorchListProps> = ({ porchs, setPorchs }) => {
 const { userInfo } = useContext(UserInfoContext);
 const [filtered, setFiltered] = useState<boolean>(false);
 const [dailyUpdates, setDailyUpdates] = useState<PorchType[]>(porchs);
 const [buttonTitle, setButtonTitle] = useState<string>(
  "Track Your Daily Updates"
 );
 const [learningDays, setLearningDays] = useState<number>(0);

 useEffect(() => {
  setDailyUpdates(porchs);
 }, [porchs]);

 const filteringUpdatesPerUser = useMemo(() => {
  const updates = filtered
   ? dailyUpdates.filter((porch) => {
      return (
       porch.email?.toLowerCase().trim() ===
       userInfo?.email?.toLowerCase().trim()
      );
     })
   : dailyUpdates;

  return updates
   .slice()
   .sort(
    (a, b) =>
     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
   );
 }, [dailyUpdates, userInfo?.email, filtered]);
 useEffect(() => {
  const fetchLearningDays = async () => {
   if (userInfo?.email) {
    const { count, error } = await supabase
     .from("porch")
     .select("*", { count: "exact" })
     .eq("email", userInfo.email);
    if (error) {
     console.error("Error fetching learning days from Supabase:", error);
    } else {
     setLearningDays(count || 0);
    }
   }
  };
  fetchLearningDays();
 }, [userInfo?.email]);

 const handleFiltering = () => {
  setFiltered((prevState) => {
   const newFiltered = !prevState;
   setButtonTitle(
    newFiltered ? "All Daily Updates" : "Track Your Daily Updates"
   );
   return newFiltered;
  });
 };

 return (
  <View className="pt-6 border-t-4 border-[#e5e7eb]">
   <TextWrapper className="text-lg font-IBM_semibold ml-2">
    Daily Highlights
   </TextWrapper>
   <TextWrapper className="mt-1 font-IBM_light ml-2">
    Growth and Learning News
   </TextWrapper>
   {userInfo?.email && (
    <>
     <TextWrapper className="mt-5 text-lg ml-2">
      You've been dedicated to learning for{" "}
      <TextWrapper className="font-IBM_semibold">{learningDays}</TextWrapper>{" "}
      days!
     </TextWrapper>
     <TouchableOpacity onPress={handleFiltering} className="mt-3">
      <TextWrapper className="bg-customBlue rounded-xl ml-2 font-IBM_medium text-white self-start p-3">
       {buttonTitle}
      </TextWrapper>
     </TouchableOpacity>
    </>
   )}
   <View className="mt-6">
    {filteringUpdatesPerUser.map((porch, index) => (
     <PorchDailyUpdate
      key={porch.id || index}
      porch={porch}
      setPorchs={setPorchs}
     />
    ))}
   </View>
  </View>
 );
};
