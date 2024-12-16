import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { CONFIG } from "../../../lib/config";

export const Quotes = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<"loading" | "loaded" | null>(
    null
  );

  const fetchQuote = async () => {
    setLoadingState("loading");

    try {
      const response = await fetch(CONFIG.ninjasApiUrl, {
        headers: {
          "x-api-key": CONFIG.ninjasApiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        const { quote, author } = data[0];
        setQuote(quote);
        setAuthor(author);
        setLoadingState("loaded");
      } else {
        throw new Error("No quote found in the response");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setLoadingState("loaded");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []); //need to refactor this for api that fetches arr of quotes

  /* useEffect(() => {
    getQuote();

    const interval = setInterval(() => {
      getQuote(); 
    }, 6000); 

    return () => clearInterval(interval);
  }, []);  */

  return (
    <View className="mt-6 mb-12">
      {loadingState === "loading" ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : loadingState === "loaded" && quote && author ? (
        <View className="text-center">
          <Text className="font-extralight text-lg italic text-center">
            "{quote}"
          </Text>
          <Text className="text-sm text-gray-600 text-center">- {author}</Text>
        </View>
      ) : (
        <Text className="text-center text-red-500">Failed to load quote</Text>
      )}
    </View>
  );
};
