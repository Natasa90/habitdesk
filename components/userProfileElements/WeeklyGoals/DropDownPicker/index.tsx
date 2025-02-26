import { FC, useState } from "react";
import { View, TouchableOpacity, Modal, FlatList } from "react-native";
import { BlurView } from "expo-blur"; 
import { TextWrapper } from "@/components/Layout";
import { DropDownPickerProps } from "@/Types/UserProfileTypes";

export const DropDownPicker: FC<DropDownPickerProps> = ({ selectedValue, onValueChange, options }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="p-2 w-40">
      <TouchableOpacity 
        onPress={() => setModalVisible(true)} 
        className="bg-blue-500 p-3 rounded-full w-full items-center"
      >
        <TextWrapper className="text-white text-xl font-bold">
          {selectedValue || "Select a goal"}
        </TextWrapper>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center">
          <BlurView intensity={20} tint="light" style={{ position: "absolute", width: "100%", height: "100%" }} />
          <View className="bg-white p-4 rounded-lg w-64 shadow-lg">
            <TextWrapper className="text-lg font-semibold text-center mb-4">Select Days</TextWrapper>
            <FlatList
              data={options}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item);
                    setModalVisible(false);
                  }}
                  className="p-2 border-b border-gray-300 hover:bg-gray-200"
                >
                  {item === 1 ? (<TextWrapper className="text-center">{item} day</TextWrapper>) : (<TextWrapper className="text-center">{item} days</TextWrapper>)}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2">
              <TextWrapper className="text-center text-red-500">Close</TextWrapper>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
