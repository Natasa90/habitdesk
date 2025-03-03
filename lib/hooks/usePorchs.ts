import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

export const usePorchs = (userEmail?: string) => {
  const [porchs, setPorchs] = useState<PorchType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const loadPorchs = async (currentPage: number, filterUser: boolean) => {
    setLoading(true);
    try {
      let query = supabase
        .from("porch")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * 10, currentPage * 10 - 1);

      if (filterUser && userEmail) {
        console.log("Filtering by email:", userEmail);
        query = query.eq("email", userEmail);
      }

      const { data: fetchedPorchs, error } = await query;

      if (error) throw new Error(error.message);

      console.log("Fetched porchs:", fetchedPorchs);

      if (currentPage === 1) {
        setPorchs(fetchedPorchs); 
      } else {
        setPorchs((prev) => [...prev, ...fetchedPorchs]); 
      }

      setHasMore(fetchedPorchs.length === 10);

    } catch (err) {
      console.error("Failed to load porchs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered. Page:", page, "Is Filtering:", isFiltering);
    loadPorchs(page, isFiltering);
  }, [page, isFiltering]);

  const loadMore = () => {
    console.log("Load More triggered");
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const toggleFilter = () => {
    console.log("Toggle filter");
    setIsFiltering((prev) => !prev);
    setPage(1);
  };

  return { porchs, setPorchs, loading, hasMore, loadMore, toggleFilter, isFiltering };
};
