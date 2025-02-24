import { useState, useEffect, useMemo } from "react";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

export const useLearningDaysWithUpdates = (email?: string, dailyUpdates: PorchType[] = [], filtered: boolean = false) => {
  const [learningDays, setLearningDays] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch learning days from Supabase
  useEffect(() => {
    if (!email) return;

    const fetchLearningDays = async () => {
      setLoading(true);
      setError(null);

      try {
        const { count, error } = await supabase
          .from("porch")
          .select("*", { count: "exact" })
          .eq("email", email);

        if (error) {
          throw new Error("Error fetching learning days from Supabase.");
        }

        setLearningDays(count || 0);
      } catch (err) {
        setError("Error fetching learning days.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningDays();
  }, [email]);

  // Handle filtering and sorting updates by email and created_at
  const filteringUpdatesPerUser = useMemo(() => {
    const updates = filtered
      ? dailyUpdates.filter((porch) => porch.email?.toLowerCase().trim() === email?.toLowerCase().trim())
      : dailyUpdates;

    return updates.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [dailyUpdates, filtered, email]);

  return { learningDays, loading, error, filteringUpdatesPerUser };
};
