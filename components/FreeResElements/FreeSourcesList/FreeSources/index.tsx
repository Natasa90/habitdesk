import { FC, useContext, useEffect, useState } from "react";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { FreeSourceProps } from "@/Types/FreeResourcesTypes";
import { UserInfoContext } from "@/context/UserInfoContext";
import { supabase } from "@/lib/supabase";

export const FreeSource: FC<FreeSourceProps> = ({ fact, setFacts }) => {

 const [isUpdating, setIsUpdating] = useState(false);
 const { userInfo } = useContext(UserInfoContext);
 const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo?.email) {
      const userHasVoted = fact.likes.includes(userInfo.email);
      setHasVoted(userHasVoted);
    }
  }, [userInfo, fact.likes]);

  const handleVote = async () => {
    setIsUpdating(true);

    try {
    if (!userInfo?.email) {
      console.error('User not logged in');
      return;
    } 
      let updatedLikes = [...fact.likes];

      if (hasVoted) {
        updatedLikes = updatedLikes.filter((email) => email !== userInfo.email); // Unlike
      } else {
        updatedLikes.push(userInfo.email); // Like
      }

      const { error } = await supabase
        .from("sources")
        .update({ likes: updatedLikes })
        .eq("id", fact.id);

      if (error) {
        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
        setIsUpdating(false);
        return;
      }

      setFacts((prevFacts) =>
        prevFacts.map((f) => (f.id === fact.id ? { ...f, likes: updatedLikes } : f))
      );

      setHasVoted(!hasVoted);
      setIsUpdating(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
      setIsUpdating(false);
    }
  };

  const commentText = fact.text;
  const [showMore, setShowMore] = useState<boolean>(false);
  const displayComment = showMore ? commentText : commentText.slice(0, 90);
  const handleMore = () => setShowMore(true);

 return (
    <CardLayout
     title={fact.category || "Unknown Category"}
     porch={{
      source: fact.source,
      likes: fact.likes,
     }}
     displayComment={displayComment}
     commentText={fact.text}
     showMore={showMore}
     handleVote={handleVote}
     isUpdating={isUpdating}
     handleMore={() => {}}
     formattedDate={new Date().toLocaleDateString()}
     isVoteDisabled={false}
     hasVoted={hasVoted}
    />
  )
}

