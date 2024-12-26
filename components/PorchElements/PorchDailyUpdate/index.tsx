import { FC, useState } from "react";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { PorchDailyUpdateProps } from "@/Types/PorchTypes";
import { supabase } from "@/lib/supabase";

export const PorchDailyUpdate: FC<PorchDailyUpdateProps> = ({ porch, setPorchs }) => {

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const date = new Date(porch.created_at);
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getFullYear()}`;

   const handleVote = async() => {
      setIsUpdating(true);
      try {
        // Fetch the current value of the "excellent" column
        const { data, error: fetchError } = await supabase
          .from("porch")
          .select("excellent")
          .eq("new_id", porch.new_id)
          .single();

        if (fetchError) {
          console.error("Error fetching current value:", fetchError.message);
          return;
        }

        // Increment the value of the "excellent" column
        const newValue = data.excellent + 1;

        // Update the value in the database
        const { data: updatedData, error: updateError } = await supabase
          .from("porch")
          .update({ excellent: newValue })
          .eq("new_id", porch.new_id)
          .select();

        if (updateError) {
          console.error("Error updating vote:", updateError.message);
        } else {
          // Update the porch state with the new "excellent" value
          setPorchs((porchs) =>
            porchs.map((f) => (f.new_id === porch.new_id ? { ...f, excellent: updatedData[0]?.excellent } : f))
          );
        }
      } catch (error) {
        console.error("Error voting:", error);
      } finally {
        setIsUpdating(false);
      }
  };

  const commentText = porch.text;
  const [showMore, setShowMore] = useState<boolean>(false);

  const displayComment = showMore ? commentText : commentText.slice(0, 90);

  const handleMore = () => {
    setShowMore(true);
  };

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
      />
    </>
  );
};