import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPosts, getUsers } from "./api/services";
import logo from "../assets/images/logo.jpg";
import { Link } from "expo-router";

const dummyUsers = [
  {
    id: 7691711,
    name: "Ahmed",
    email: "ahmed1@test.com",
    gender: "male",
    status: "active",
  },
  {
    id: 7691712,
    name: "Sarah",
    email: "sarah2@test.com",
    gender: "female",
    status: "inactive",
  },
  {
    id: 7691713,
    name: "John",
    email: "john3@test.com",
    gender: "male",
    status: "active",
  },
  {
    id: 7691714,
    name: "Fatima",
    email: "fatima4@test.com",
    gender: "female",
    status: "active",
  },
  {
    id: 7691715,
    name: "Ali",
    email: "ali5@test.com",
    gender: "male",
    status: "inactive",
  },
  {
    id: 7691716,
    name: "Zainab",
    email: "zainab6@test.com",
    gender: "female",
    status: "active",
  },
  {
    id: 7691717,
    name: "Hassan",
    email: "hassan7@test.com",
    gender: "male",
    status: "active",
  },
  {
    id: 7691718,
    name: "Amira",
    email: "amira8@test.com",
    gender: "female",
    status: "inactive",
  },
  {
    id: 7691719,
    name: "Mohamed",
    email: "mohamed9@test.com",
    gender: "male",
    status: "active",
  },
  {
    id: 7691720,
    name: "Layla",
    email: "layla10@test.com",
    gender: "female",
    status: "active",
  },
];
const dummyPosts = [
  {
    id: 192071,
    user_id: 7691711,
    title: "First Post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 192072,
    user_id: 7691712,
    title: "Second Post",
    body: "Curabitur ac felis arcu. Sed quis eros et quam blandit finibus.",
  },
  {
    id: 192073,
    user_id: 7691713,
    title: "Third Post",
    body: "Mauris malesuada velit sit amet risus suscipit venenatis.",
  },
  {
    id: 192074,
    user_id: 7691714,
    title: "Fourth Post",
    body: "Donec at nibh id velit fringilla scelerisque.",
  },
  {
    id: 192075,
    user_id: 7691715,
    title: "Fifth Post",
    body: "Pellentesque nec velit et erat venenatis volutpat.",
  },
  {
    id: 192076,
    user_id: 7691716,
    title: "Sixth Post",
    body: "Aliquam vestibulum risus id tincidunt tincidunt.",
  },
  {
    id: 192077,
    user_id: 7691717,
    title: "Seventh Post",
    body: "Proin feugiat magna sit amet tellus suscipit fermentum.",
  },
  {
    id: 192078,
    user_id: 7691718,
    title: "Eighth Post",
    body: "Nunc tincidunt justo ac libero venenatis, vitae viverra sem.",
  },
  {
    id: 192079,
    user_id: 7691719,
    title: "Ninth Post",
    body: "Vestibulum ac tellus a nisl gravida auctor.",
  },
  {
    id: 192080,
    user_id: 7691720,
    title: "Tenth Post",
    body: "Quisque non dui eget ligula porttitor ultricies.",
  },
];

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

  const mergedData = dummyPosts.map((post: Post) => {
    const user = dummyUsers.find((u: User) => u.id === post.user_id);
    return {
      ...post,
      userName: user?.name || "Unknown User",
      avatar: user?.name.substring(0, 1) || null,
    };
  });
  console.log(mergedData);
  //   const mergedData = posts.map((post: Post) => {
  //     const user = users.find((u: User) => u.id === post.user_id);
  //     return {
  //       ...post,
  //       userName: user?.name || "Unknown User",
  //       avatar: user?.avatar || null,
  //     };
  //   });

  const renderItem = ({ item }: { item: any }) => (
    <Link style={styles.card} href={`/post/${item.id}`}>
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
    </Link>
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
