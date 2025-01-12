import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import quotesData from "../../../data/quotes.json";

export const Quotes = () => {
 const [currentIndex, setCurrentIndex] = useState<number>(0);
 const [loadingState, setLoadingState] = useState<"loading" | "loaded" | null>(
  null
 );

 useEffect(() => {
  setLoadingState("loaded");

  const interval = setInterval(() => {
   setCurrentIndex((prevIndex) => (prevIndex + 1) % quotesData.length);
  }, 8000);

  return () => clearInterval(interval);
 }, []);

 const currentQuote = quotesData[currentIndex];

 return (
  <View className="mt-6 mb-12">
   {loadingState === "loading" ? (
    <ActivityIndicator size="large" color="#0000ff" />
   ) : loadingState === "loaded" && currentQuote ? (
    <View className="text-center">
     <Text className="font-extralight text-lg italic text-center">
      "{currentQuote.quote}"
     </Text>
     <Text className="text-sm text-gray-600 text-center">
      - {currentQuote.author}
     </Text>
    </View>
   ) : (
    <Text className="text-center text-red-500">Failed to load quote</Text>
   )}
  </View>
 );
};
