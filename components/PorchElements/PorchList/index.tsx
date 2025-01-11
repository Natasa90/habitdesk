import { FC, useState, useEffect, useMemo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PorchListProps } from "@/Types/PorchTypes";
import { supabase } from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";
import { PorchType } from "@/Types/PorchTypes";
import { PorchDailyUpdate } from "../PorchDailyUpdate";

export const PorchList: FC<PorchListProps> = ({porchs, setPorchs}) => {

    const { userInfo } = useContext(UserInfoContext); 
    const [filtered, setFiltered] = useState<boolean>(false);
    const [dailyUpdates, setDailyUpdates] = useState<PorchType[]>(porchs);
    const [buttonTitle, setButtonTitle] = useState<string>("Track Your Daily Updates");
    const [learningDays, setLearningDays] = useState<number>(0);

    useEffect(() => {
        setDailyUpdates(porchs);        
    }, [porchs]);

const filteringUpdatesPerUser = useMemo(() => {
    const updates = filtered
        ? dailyUpdates.filter((porch) => {
            return porch.email?.toLowerCase().trim() === userInfo?.email?.toLowerCase().trim();
        })
        : dailyUpdates;

    return updates.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
                };
            };
        };
    fetchLearningDays()}, [userInfo?.email]);

    const handleFiltering = () => {
        setFiltered((prevState) => {
            const newFiltered = !prevState;
            setButtonTitle(newFiltered ? "All Daily Updates" : "Track Your Daily Updates");
            return newFiltered;
        });
    };

    return (
        <View className="py-1 border-y-4 border-[#e5e7eb]">
            <View className="mx-auto">
                <View className="py-5 bg-gray-100 rounded-xl">  
                    <View className="ml-2">
                        <Text className="text-lg font-bold text-gray-900">Daily Highlights</Text>
                        <Text className="mt-1 text-sm font-medium text-gray-500">Growth and Learning News</Text>
                        {userInfo?.email && (
                        <>
                            <Text className="mt-5 text-lg font-medium text-gray-800">
                                 You've been dedicated to learning for <Text className="font-bold">{learningDays}</Text> days!
                            </Text>
                            <TouchableOpacity
                                onPress={handleFiltering}
                                className="mt-3 w-48"
                            >
                                <Text className="bg-customBlue rounded-xl py-2.5 px-4 text-sm font-medium text-white self-start">{buttonTitle}</Text>
                            </TouchableOpacity>
                        </>
                        )}
                    </View>
                    <View className="mt-6 space-y-3">
                        {filteringUpdatesPerUser.map((porch, index) => (
                            <PorchDailyUpdate
                            key={porch.id || index}
                            porch={porch}
                            setPorchs={setPorchs}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};
