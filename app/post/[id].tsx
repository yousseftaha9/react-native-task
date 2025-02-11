import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "../api/services";
const dummyComments = [
  {
    id: 138101,
    post_id: 192071,
    name: "Dandak Nambeesan",
    email: "dandak@quitzon-mosciski.test",
    body: "Great post, very insightful!",
  },
  {
    id: 138102,
    post_id: 192071,
    name: "Jane Doe",
    email: "jane.doe@sample.test",
    body: "I completely agree with this.",
  },
  {
    id: 138103,
    post_id: 192072,
    name: "John Smith",
    email: "john.smith@sample.test",
    body: "This really helped me out.",
  },
  {
    id: 138104,
    post_id: 192072,
    name: "Sara Khan",
    email: "sara.khan@sample.test",
    body: "Very informative, thanks!",
  },
  {
    id: 138105,
    post_id: 192073,
    name: "Ali Youssef",
    email: "ali@test.com",
    body: "Keep up the good content.",
  },
  {
    id: 138106,
    post_id: 192074,
    name: "Emma Watson",
    email: "emma@test.com",
    body: "I learned a lot.",
  },
  {
    id: 138107,
    post_id: 192075,
    name: "Carlos Reyes",
    email: "carlos@test.com",
    body: "Looking forward to more posts.",
  },
  {
    id: 138108,
    post_id: 192075,
    name: "Fatima Noor",
    email: "fatima.noor@sample.test",
    body: "Nice perspective.",
  },
  {
    id: 138109,
    post_id: 192076,
    name: "Tom Holland",
    email: "tom.holland@test.com",
    body: "Helpful post, thanks.",
  },
  {
    id: 138110,
    post_id: 192077,
    name: "Michael Green",
    email: "michael@test.com",
    body: "Very detailed write-up.",
  },
];

const Post = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  // const comments = dummyComments.filter((comment) => id === comment.post_id);
  // console.log(comments);

  const {
    data: comments,
    isLoading: loadingComments,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getPostComments,
  });

  if (loadingComments) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (commentsError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Post</Text>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
