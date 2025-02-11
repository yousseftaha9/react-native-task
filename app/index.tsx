import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPosts, getUsers } from "./api/services";
import logo from "../assets/images/logo.jpg";
import { Link, router } from "expo-router";

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  avatar?: string;
}

const Index = () => {
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

  if (loadingPosts || loadingUsers) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (postsError || usersError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }
  console.log(posts);
  console.log(users);

  const mergedData = posts.map((post: Post) => {
    const user = users.find((u: User) => u.id === post.user_id);
    return {
      ...post,
      userName: user?.name || "Unknown User",
      avatar: user?.name.substring(0, 1) || null,
    };
  });
  console.log(mergedData);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/post/${item.id}`)}
    >
      {/* <Image
        source={item.avatar ? { uri: item.avatar } : logo}
        style={styles.avatar}
      /> */}
      <View style={styles.avatar}>
        <Text>{item.avatar}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <FlatList
        data={mergedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
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
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  postTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  postBody: {
    fontSize: 12,
    color: "#666",
  },
});
