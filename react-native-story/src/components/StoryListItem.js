import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

// Constants
import DEFAULT_AVATAR from "../assets/avatars/no_avatar.png";

export default class StoryListItem extends Component {
  _handleItemPress = item => {
    const { handleStoryItemPress } = this.props;

    if (handleStoryItemPress) handleStoryItemPress(item);
  };

  render() {
    const { item, unPressedBorderColor, pressedBorderColor } = this.props;

    /**
     * Possible - use the "preview" image to showcase
     */
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._handleItemPress(item)}
          style={[
            styles.avatarWrapper,
            !item.seen
              ? {
                  borderColor: unPressedBorderColor
                    ? unPressedBorderColor
                    : "#e95950"
                }
              : {
                  borderColor: pressedBorderColor
                    ? pressedBorderColor
                    : "#ebebeb"
                }
          ]}
        >
          <Image
            style={styles.avatar}
            source={{ uri: item.avatar }}
            defaultSource={DEFAULT_AVATAR}
          />
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.user}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  unPressedAvatar: {
    borderColor: "#e95950"
  },
  pressedAvatar: {
    borderColor: "#ebebeb"
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e95950",
    margin: 8,
    borderRadius: 57 / 2,
    height: 57,
    width: 57
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderColor: "white",
    borderWidth: 1
  },
  itemText: {
    textAlign: "center",
    fontSize: 9
  }
});
