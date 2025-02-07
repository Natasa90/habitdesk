import { useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList } from "react-native";
import TextWrapper from "@/components/Layout/TextWrapper";

export const ToDoList = () => {
 const [toDo, setToDo] = useState<string[]>([]);
 const [input, setInput] = useState<string>("");
 const [error, setError] = useState<string>("");

 const usersInput = (e: any) => {
  const savedTask = e.target.value;
  setInput(savedTask);
 };

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

 return (
  <View className="items-center bg-gray-100 p-5 mb-5">
   <TextWrapper className="text-3xl font-IBM_italic mb-6">
    To Do List
   </TextWrapper>
   <View className="flex-row space-x-4 w-full max-w-md">
    <TextInput
     placeholder="New task..."
     value={input}
     onChangeText={setInput}
     className="flex-1 p-3 rounded-lg bg-gray-200 text-gray-800"
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
      className="flex-row items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm"
     >
      <TextWrapper className="text-gray-800">{item}</TextWrapper>
      <TouchableOpacity onPress={() => deleteTask(index)}>
       <TextWrapper className="text-red-500 font-semibold">x</TextWrapper>
      </TouchableOpacity>
     </View>
    ))}
{error && (
<TextWrapper className="text-center text-orange-300">Please write a Task to add.</TextWrapper>)}
   </View>
  </View>
 );
};
