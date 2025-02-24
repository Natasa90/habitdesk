import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

export const usePorchs = (userEmail?: string) => {
  const [porchs, setPorchs] = useState<PorchType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filtered, setFiltered] = useState<boolean>(false);

  const loadPorchs = async (currentPage: number, isFiltered: boolean) => {
    try {
      setLoading(true);
      let query = supabase
      .from("porch")
      .select("*")
      .order("created_at", { ascending: false });

      if (isFiltered && userEmail) {
        query = query.eq("email", userEmail).limit(10); 
      } else {
        query = query.range((currentPage - 1) * 10, currentPage * 10 - 1); 
      }

      const { data: newPorchs, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      setPorchs((prev) => (isFiltered ? newPorchs : [...prev, ...newPorchs]));
      setHasMore(newPorchs.length === 10);
    } catch (err) {
      console.error("Failed to load porchs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPorchs(page, filtered);
  }, [page, filtered, userEmail]);

  const handleLoadMore = () => {
    if (!loading && hasMore && !filtered) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const toggleFilter = () => {
    setFiltered((prevFiltered) => !prevFiltered);
  };

  return { porchs, loading, hasMore, handleLoadMore, setPorchs, toggleFilter, filtered };
};
