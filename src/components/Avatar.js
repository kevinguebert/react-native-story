import * as React from "react";
import { View, Image, Text, SafeAreaView, StyleSheet } from "react-native";
import DEFAULT_AVATAR from "../assets/avatars/no_avatar.png";

export default class Avatar extends React.PureComponent {
  render() {
    const { user, avatar: source } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={{ uri: source }}
            defaultSource={DEFAULT_AVATAR}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center"
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 16,
  },
  username: {
    color: "white",
    fontSize: 16
  }
});
