import { FC, useState, useContext } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    Alert, 
    ActivityIndicator,
    Modal, 
    TouchableOpacity 
} from "react-native";
import { UserInfoContext } from "@/context/UserInfoContext";
import { isValidHttpUrl } from "lib/constants";
import { PorchType } from "@/Types/PorchTypes";
import { PorchFormProps } from "@/Types/PorchTypes";
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from "expo-blur";
import { supabase } from "@/lib/supabase";

export const PorchUpdateForm: FC<PorchFormProps> = ({ setPorchs, setShowForm }) => {

  const [text, setText] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [responseUpdate, setResponseUpdate] = useState<string>("");

  const { userInfo } = useContext(UserInfoContext);

  async function handleSubmit() {
  if (text && isValidHttpUrl(source)) {
    const payload = { text, source, email: userInfo?.email };
    setIsUploading(true);

    try {
      const { data: newUpdate, error } = await supabase
        .from('porch')  
        .insert([payload])  
        .select();

      if (error) {
        console.error("Error inserting data:", error);
        setIsUploading(false);
        return;
      }

      console.log("Success:", newUpdate);

      setPorchs((porchs: PorchType[]) => [newUpdate[0], ...porchs]);

      setTimeout(() => {
        setText("");
        setSource("");
        setIsUploading(false);
        setShowForm(false);
        setResponseUpdate(""); 
      }, 500);

    } catch (error) {
      console.error("Request failed:", error);
      setIsUploading(false);
    }
  } else {
    Alert.alert(
      "Submission Failed",
      `Please ensure all text fields are filled correctly, and your URL is valid. Double-check your entries and try again!\n Your input: \n source: ${source}\n text: ${text}`
    );
  }
}
return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowForm(false)}
    >
      <View className="flex-1 items-center justify-center bg-opacity-70">
  <BlurView
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          intensity={80} // Use intensity prop for controlling blur amount
          tint="dark"
        />
        <View className="bg-white px-5 pt-4 pb-10 rounded-xl w-4/5 ">
          {responseUpdate ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => setShowForm(false)}
                className="absolute right-2 z-10"
              >
                <Icon name="close" size={30} color="#555" />
              </TouchableOpacity>
              <Text className="text-lg mb-10">Progress Update</Text>
              <TextInput
                className="bg-gray-200 p-3 rounded-md mb-8 text-base"
                placeholder="Share your update with the world..."
                value={text}
                onChangeText={setText}
                editable={!isUploading}
              />

              <TextInput
                className={`${
                  !isValidHttpUrl(source) && source.length > 0 ? "bg-red-100" : "bg-gray-200"
                } p-3 rounded-md mb-8 text-base`}
                value={source}
                placeholder="Share your learning source"
                onChangeText={setSource}
                editable={!isUploading}
              />

              <Button
                title={isUploading ? "Uploading..." : "Update"}
                onPress={handleSubmit}
                disabled={isUploading}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

