import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getPostComments, getPosts, getUsers } from "../api/services";

const Post = () => {
  const { id } = useLocalSearchParams();

  const {
    data: comments,
    isLoading: loadingComments,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getPostComments(id),
  });

  const {
    data: posts,
    isLoading: loadingPosts,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const {
    data: users,
    isLoading: loadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (loadingComments || loadingPosts || loadingUsers) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (commentsError || postsError || usersError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }

  const post = posts.find(
    (p: { id: { toString: () => string | string[] } }) => p.id.toString() === id
  );
  if (!post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  const user = users.find((u: { id: any }) => u.id === post.user_id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postContainer}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri: `https://ui-avatars.com/api/?name=${user?.name}`,
            }}
          />
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>

      <Text style={styles.commentsHeader}>Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <View style={styles.userInfo}>
              <Image
                style={styles.avatar}
                source={{
                  uri: `https://ui-avatars.com/api/?name=${item.name}`,
                }}
              />
              <Text style={styles.userName}>{item.name}</Text>
            </View>
            <Text style={styles.commentBody}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
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
  postContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  body: {
    fontSize: 16,
    marginTop: 4,
    color: "#555",
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 12,
  },
  commentCard: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  commentBody: {
    fontSize: 14,
    color: "#333",
  },
});
