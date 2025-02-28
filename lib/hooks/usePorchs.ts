import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { PorchType } from "@/Types/PorchTypes";

export const usePorchs = () => {
  const [porchs, setPorchs] = useState<PorchType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadPorchs = async (currentPage: number) => {
    console.log(`Loading porchs for page ${currentPage}`); // Debugging

    try {
      const { data: newPorchs, error } = await supabase
        .from("porch")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * 10, currentPage * 10 - 1);

      if (error) throw new Error(error.message);

      console.log("Fetched porchs:", newPorchs); // Debugging

      // Append new porchs to the existing porchs state
      setPorchs((prev) => {
        const updatedPorchs = [...newPorchs]; // Reset the porch list when refetching all
        console.log("Updated porchs after reset:", updatedPorchs); // Debugging
        return updatedPorchs;
      });

      // Set hasMore based on the number of fetched items
      setHasMore(newPorchs.length === 10);
      console.log("Has more porchs?", newPorchs.length === 10); // Debugging

    } catch (err) {
      console.error("Failed to load porchs:", err);
    } finally {
      setLoading(false);
      console.log("Loading state set to false"); // Debugging
    }
  };

  // Effect to load porchs initially or when the page changes
  useEffect(() => {
    console.log(`useEffect triggered, current page: ${page}`); // Debugging
    loadPorchs(page);
  }, [page]);

  // Function to load more porchs when scrolling or triggering load more
  const loadMore = () => {
    console.log("loadMore triggered"); // Debugging
    console.log("Loading:", loading, "Has More:", hasMore); // Debugging

    if (!loading && hasMore) {
      console.log("Incrementing page..."); // Debugging
      setPage((prev) => prev + 1);
    }
  };

  // Function to handle when you need to reset and refetch all porches (e.g., toggle filter)
  const refetchAllPorchs = () => {
    setPage(1); // Reset to page 1
    setPorchs([]); // Clear existing porch data
    loadPorchs(1); // Fetch all porches from page 1
  };

  return { porchs, loading, hasMore, loadMore, setPorchs, refetchAllPorchs };
};
