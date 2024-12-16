import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CardLayout } from "../../Layout/CardsLayout";// Assuming you have this component

export const FreeResList = () => {

    const demoResource = {
        id: 1,
        like: 20,
        exelent: 5,
        false: 0,
        text: "This is an interesting fact about something related to the source.",
        source: "Some Source",
        category: "Science",
      };

  return (
    <View>
      <CardLayout
        title={demoResource.category || "Unknown Category"}
        porch={{
          source: demoResource.source,
          excellent: demoResource.exelent,
        }}
        displayComment={demoResource.text.slice(0, 90)}
        commentText={demoResource.text}
        showMore={false}
        handleVote={() => {}
        }
        isUpdating={false}
        extraContent={
            <View className="py-5">
              <TouchableOpacity
                onPress={() => {}}
              >
                <Text className="self-start bg-gray-200 rounded-full px-8 py-2 text-sm font-semibold text-gray-700">Show Comments</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  };

