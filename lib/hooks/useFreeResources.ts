import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { Fact } from "@/Types/FreeResourcesTypes";

export const useFreeResources = () => {

  const [resources, setResources] = useState<Fact[]>([]);
  const [filteredResources, setFilteredResources] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<string>("all"); 

  const noContent = filteredResources.length === 0 && !isLoading;


  const fetchResources = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("sources")
        .select("*")
        .order("like", { ascending: false })
        .range(currentPage * 10, (currentPage + 1) * 10 - 1);

      if (error) {
        throw new Error("Could not load resources.");
      }

      setResources((prev) =>
        currentPage === 0 ? (data as Fact[]) : [...prev, ...(data as Fact[])]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

 const filterResources = () => {
    if (currentCategory === "all") {
      setFilteredResources(resources);
    } else {
      setFilteredResources(
        resources.filter((resource) => resource.category === currentCategory)
      );
    }
  };

  useEffect(() => {
    filterResources();
  }, [resources, currentCategory]);
console.log("Resources:", resources);

  const handleVote = async (columnName: keyof Fact, fact: Fact) => {
    try {
      const { data: updatedFact, error } = await supabase
        .from("sources")
        .update({ [columnName]: (fact[columnName] as number) + 1 })
        .eq("id", fact.id)
        .select();

      if (error) {
        throw new Error("Failed to update vote.");
      }

      if (updatedFact && updatedFact.length > 0) {
        setResources((prev) =>
          prev.map((f) => (f.id === fact.id ? (updatedFact[0] as Fact) : f))
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error occurred."
      );
    }
  };

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  useEffect(() => {
    fetchResources(page);
  }, [page]);

console.log("Current Category:", currentCategory);


  return {
    filteredResources,
    resources,
    isLoading,
    handleVote,
    loadMore,
    currentCategory,
    setCurrentCategory,
    noContent
  };
};
