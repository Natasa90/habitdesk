import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

export const usePorchs = () => {
  const [porchs, setPorchs] = useState<PorchType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadPorchs = async (currentPage: number) => {
    try {
      setLoading(true);
      const { data: newPorchs, error } = await supabase
        .from("porch")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * 10, currentPage * 10 - 1);

      if (error) {
        throw new Error(error.message);
      }

      setPorchs((prevPorchs) => [...prevPorchs, ...newPorchs]);
      setHasMore(newPorchs.length === 10);
    } catch (err) {
      console.error("Failed to load porchs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPorchs(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { porchs, loading, hasMore, handleLoadMore, setPorchs };
};
