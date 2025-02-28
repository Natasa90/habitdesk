import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { PorchListProps } from "@/Types/PorchTypes";
import { PorchType } from "@/Types/PorchTypes";
import { PorchDailyUpdate } from "../PorchDailyUpdate";

export const PorchList: FC<PorchListProps> = ({ porchs, setPorchs }) => {
  const [dailyUpdates, setDailyUpdates] = useState<PorchType[]>(porchs);

  useEffect(() => {
    setDailyUpdates(porchs);
  }, [porchs]);

  return (
    <View className="mt-6">
      {dailyUpdates
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((porch, index) => (
          <PorchDailyUpdate
            key={porch.id || index}
            porch={porch}
            setPorchs={setPorchs}
          />
        ))}
    </View>
  );
};
