import { FC, useState, useContext } from "react";
import { View } from "react-native";
import { CardLayout } from "../../Layout/CardsLayout";

export const PorchDailyUpdate: FC = () => {
    
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

  // FOR DEMO PURPOSE ONLY!  /////////////////////////////

    const demoPorch = {
        text: "This is a demo update to showcase how the PorchDailyUpdate component works in the UI. Additional content will be added later.",
        email: "demo@example.com",
        source: "Demo Source",
        excellent: 5,
    };

    const formattedDate = "12-15-2024";

    const handleVote = () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            alert("Demo vote submitted!");
        }, 1000);
    };

    const handleMore = () => {
        setShowMore((prev) => !prev);
    };

    const commentText = demoPorch.text;
    const displayComment = showMore ? commentText : commentText.slice(0, 90) + "...";
  
///////////////////////////////////////////////////////////////////////////////////////

  /* const date = new Date(porch.created_at);
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getFullYear()}`;
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

  const handleVote = async (columnName: string) => {
    if (userInfo?.email) {
      setIsUpdating(true);
  
      try {
        // Fetch the current value of the column (e.g., 'excellent')
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

  const commentText = porch.text;
  const displayComment = showMore ? commentText : commentText.slice(0, 90);

  const handleMore = () => {
    setShowMore(true);
  }; */

    return (
        <View>
            <CardLayout
                title="Daily Update"
                porch={demoPorch}
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