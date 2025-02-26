import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { TextWrapper } from "@/components/Layout";

export const ToDoList = () => {
 const [toDo, setToDo] = useState<string[]>([]);
 const [input, setInput] = useState<string>("");
 const [error, setError] = useState<string>("");

 const addTask = () => {
  if (input.trim()) {
   setToDo([...toDo, input]);
   setInput("");
   setError("");
  } else {
   setError("Please Write A Task to Add.");
  }
 };

 const deleteTask = (index: number) => {
  setToDo(toDo.filter((_, i) => i !== index));
 };

 const getCurrentDay = () => {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
 };

 return (
  <View className="items-center bg-white rounded-xl shadow-md p-5 mb-5">
   <TextWrapper className="text-2xl font-IBM_light pb-2 tracking-widest text-center">
    {getCurrentDay()}'s Tasks
   </TextWrapper>
   <Image
    source={require("../../../assets/images/tasks.png")}
    style={{ width: 230, height: 192 }}
   />
   <View className="flex-row space-x-4 w-full max-w-md mt-6">
    <TextInput
     placeholder="New task..."
     value={input}
     onChangeText={setInput}
     className="flex-1 p-3 rounded-lg bg-gray-200 text-gray-800 font-IBM_italic"
    />
    <TouchableOpacity
     onPress={addTask}
     className="p-3 bg-blue-500 rounded-lg flex justify-center items-center"
    >
     <TextWrapper className="text-white font-semibold">Add</TextWrapper>
    </TouchableOpacity>
   </View>
   <View className="mt-6 w-full max-w-md">
    {toDo.map((item, index) => (
     <View
      key={index}
      className="flex-row items-center justify-between p-3 mb-2 bg-listBlue rounded-lg shadow-sm"
     >
      <TextWrapper className="text-gray-800">{item}</TextWrapper>
      <TouchableOpacity onPress={() => deleteTask(index)}>
       <TextWrapper className="text-red-500 font-semibold">x</TextWrapper>
      </TouchableOpacity>
     </View>
    ))}
    {error && (
     <TextWrapper className="text-center text-orange-300">
      Please write a Task to add.
     </TextWrapper>
    )}
   </View>
  </View>
 );
};
