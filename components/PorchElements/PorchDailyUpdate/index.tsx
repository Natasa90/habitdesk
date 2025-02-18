import { FC, useState, useContext, useEffect } from "react";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { PorchDailyUpdateProps } from "@/Types/PorchTypes";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";

export const PorchDailyUpdate: FC<PorchDailyUpdateProps> = ({
 porch,
 setPorchs,
}) => {
 const [isUpdating, setIsUpdating] = useState<boolean>(false);
 const [showMore, setShowMore] = useState<boolean>(false);
 const [hasVoted, setHasVoted] = useState<boolean>(false);
 const { userInfo } = useContext(UserInfoContext);

 useEffect(() => {
  if (userInfo?.email) {
   const userHasVoted = porch.likes.includes(userInfo.email);
   setHasVoted(userHasVoted);
  }
 }, [userInfo, porch.likes]);

 const date = new Date(porch.created_at);
 const formattedDate = `${(date.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${date
  .getDate()
  .toString()
  .padStart(2, "0")}-${date.getFullYear()}`;

 const handleVote = async () => {
  setIsUpdating(true);
   try {
    if (!userInfo?.email) {
      console.error('User not logged in');
      return;
    } 
   let updatedLikes = [...porch.likes];
   if (hasVoted) {
    updatedLikes = updatedLikes.filter((email) => email !== userInfo.email);
   } else {
    updatedLikes.push(userInfo.email);
   }
   const { error } = await supabase
    .from("porch")
    .update({ likes: updatedLikes })
    .eq("new_id", porch.new_id);

   if (error) {
    console.error("Error fetching current value:", error);
    setIsUpdating(false);
    return;
   }

   setPorchs((porchs) =>
    porchs.map((p) =>
     p.new_id === porch.new_id ? { ...p, likes: updatedLikes } : p
    )
   );

   setHasVoted(!hasVoted);
   setIsUpdating(false);
  } catch (err) {
   console.error("Unexpected error:", err);
   alert("An unexpected error occurred. Please try again.");
   setIsUpdating(false);
  }
 };

 const commentText = porch.text;
 const displayComment = showMore ? commentText : commentText.slice(0, 90);
 const handleMore = () => setShowMore(true);

 return (
  <>
   <CardLayout
    title="Daily Update"
    porch={porch}
    displayComment={displayComment}
    commentText={porch.text}
    showMore={showMore}
    handleMore={handleMore}
    handleVote={handleVote}
    isUpdating={isUpdating}
    formattedDate={formattedDate}
    isVoteDisabled={false}
    hasVoted={hasVoted}
   />
  </>
 );
};
