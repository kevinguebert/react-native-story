import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
// Components
import StoryListItem from "./StoryListItem";

export default class StoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      stories,
      handleStoryItemPress,
      unPressedBorderColor,
      pressedBorderColor
    } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={stories}
          extraData={this.props}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <StoryListItem
              handleStoryItemPress={() =>
                handleStoryItemPress && handleStoryItemPress(item, index)
              }
              unPressedBorderColor={unPressedBorderColor}
              pressedBorderColor={pressedBorderColor}
              item={item}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  }
});
