import { View, Text } from "react-native";
import React from "react";

const index = () => {
  return (
    <View>
      <Text className="text-white">index</Text>
      <Text className="text-blue-600">index</Text>
      <Text
        style={{
          color: "red",
        }}
      >
        index
      </Text>
      <Text className="text-white">index</Text>
    </View>
  );
};

export default index;
