import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Story from 'react-native-story';

const stories = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/300",
    user: "Bruce Wayne",
    link: "",
    seen: false,
    items: [
      {
        id: 1,
        type: "photo",
        length: 3,
        preview:
          "https://images.unsplash.com/photo-1560850038-f95de6e715b3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        source:
          "https://images.unsplash.com/photo-1560850038-f95de6e715b3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        link: "",
        linkText: "",
        seen: false
      }
    ]
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/300",
    user: "Alfred P.",
    link: "",
    seen: false,
    items: [
      {
        id: 1,
        type: "video",
        length: 3,
        preview:
          "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        source:
          "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        link: "",
        linkText: "",
        seen: false
      }
    ]
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/300",
    user: "Clark Kent",
    link: "",
    seen: false,
    items: [
      {
        id: 1,
        type: "photo",
        length: 3,
        preview:
          "https://images.unsplash.com/photo-1558376939-7d6cb3025d5c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        source:
          "https://images.unsplash.com/photo-1558376939-7d6cb3025d5c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        link: "",
        linkText: "",
        seen: false
      }
    ]
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/300",
    user: "Alfred P.",
    link: "",
    seen: false,
    items: [
      {
        id: 1,
        type: "video",
        length: 3,
        preview:
          "https://firebasestorage.googleapis.com/v0/b/personal-standup.appspot.com/o/6b76cfb7-3496-4741-a5b2-04b1b69c5ce6?alt=media&token=029c52c4-8617-48d4-b195-456692e184d9.mp4",
        source:
          "https://firebasestorage.googleapis.com/v0/b/personal-standup.appspot.com/o/6b76cfb7-3496-4741-a5b2-04b1b69c5ce6?alt=media&token=029c52c4-8617-48d4-b195-456692e184d9.mp4",
        link: "",
        linkText: "",
        seen: false
      }
    ]
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Story
        unPressedBorderColor="#e95950"
        pressedBorderColor="#ebebeb"
        stories={stories}
        footerComponent={
          <TextInput placeholder="Send message" placeholderTextColor="white" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
