import { useState, useEffect, useContext } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";
import supabase from "../supabase";

const useVote = (fact: any) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [likes, setLikes] = useState(fact.likes); 

  useEffect(() => {
    if (userInfo?.email) {
      setHasVoted(likes.includes(userInfo.email));
    }
  }, [userInfo, likes]); 

  const handleVote = async () => {
    if (!userInfo?.email) {
      console.error("User not logged in");
      return;
    }

    setIsUpdating(true);

    try {
      let updatedLikes = [...likes];

      if (hasVoted) {
        updatedLikes = updatedLikes.filter((email) => email !== userInfo.email);
      } else {
        updatedLikes.push(userInfo.email);
      }

      const { error } = await supabase
        .from("sources")
        .update({ likes: updatedLikes })
        .eq("id", fact.id);

      if (error) {
        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
      } else {
        setLikes(updatedLikes); 
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, hasVoted, handleVote, likes };
};

export default useVote;
