import { FC, useState, useContext } from "react";
import { View } from "react-native";
import { CardLayout } from "../../Layout/CardsLayout";
import { PorchDailyUpdateProps } from "@/Types/PorchTypes";

export const PorchDailyUpdate: FC<PorchDailyUpdateProps> = ({porch, setPorchs}) => {
    
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    const date = new Date(porch.created_at);
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getFullYear()}`;

   /*  const handleVote = async (columnName: string) => {
      if (userInfo?.email) {
        setIsUpdating(true); 
  
      try {
        const { data, error: fetchError } = await supabase
          .from("porch")
          .select(columnName)
          .eq("id", porch.id)
          .single();
  
        if (fetchError) {
          console.error("Error fetching current value:", fetchError.message);
          return;
        }
  
        // Increment the value
        const newValue = data[columnName] + 1;
  
        // Update the value in the database
        const { data: updatedData, error: updateError } = await supabase
          .from("porch")
          .update({ [columnName]: newValue })
          .eq("id", porch.id);
  
        if (updateError) {
          console.error("Error updating vote:", updateError.message);
        } else {
          // Update the porch state with the new value
          setPorchs((porchs) =>
            porchs.map((p) => (p.id === porch.id ? { ...p, excellent: updatedData[0]?.excellent } : p))
          );
        }
      } catch (error) {
        console.error("Error voting:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };
 */
  const commentText = porch.text;
  const displayComment = showMore ? commentText : commentText.slice(0, 90);

  const handleMore = () => {
    setShowMore(true);
  }; 

 const handleVote = () => {}; 

    return (
        <View>
            <CardLayout
                title="Daily Update"
                porch={porch}
                displayComment={displayComment}
                commentText={commentText}
                showMore={showMore}
                handleMore={handleMore}
                handleVote={handleVote}
                isUpdating={isUpdating}
                formattedDate={formattedDate}
            />
        </View>
    );
};