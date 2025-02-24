import { useState, useEffect } from "react";
import supabase from "../supabase";
import { PorchType } from "@/Types/PorchTypes";

export const useFilteredDailyUpdates = (email?: string) => {
  const [dailyUpdates, setDailyUpdates] = useState<PorchType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserUpdates = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("daily_updates") 
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDailyUpdates(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (email) fetchUserUpdates();
  }, [email]);

  return { dailyUpdates, loading, error, fetchUserUpdates };
};
