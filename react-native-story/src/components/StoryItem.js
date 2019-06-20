// @flow
import React, { Fragment, Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";

import Avatar from "./Avatar";
import StoryButton from "./StoryButton";

export default class StoryItem extends Component {
  state = {
    isPlaying: false
  };
  videoRef = null;
  _handleVideoRef = async component => {
    this.videoRef = component;
  };
  async componentDidUpdate() {
    const {
      story: { id },
      multiplier
    } = this.props;

    if (this.videoRef !== null) {
      if (id && id === multiplier) {
        this.videoRef.setStatusAsync({ shouldPlay: true });
      } else {
        this.videoRef.setStatusAsync({ shouldPlay: false, positionMillis: 0 });
      }
    }
  }
  render() {
    const {
      story: { items, user, avatar, id },
      selectedStory,
      handleSelectedStoryOnLoaded,
      footerComponent,
      multiplier
    } = this.props;

    //Todo create slideshow/multiple stories
    let firstStory = items[0];
    const { length, link, linkText, preview, seen, source, type } = firstStory;
    return (
      <Fragment>
        <View style={styles.container}>
          {type === "photo" ? (
            <Image
              onLoad={() => {
                if (firstStory && firstStory.id === id) {
                  handleSelectedStoryOnLoaded();
                }
              }}
              style={styles.image}
              source={{ uri: source }}
            />
          ) : (
            <Video
              onLoad={() => {
                if (firstStory && firstStory.id === id) {
                  handleSelectedStoryOnLoaded();
                }
              }}
              ref={this._handleVideoRef}
              source={{
                uri: source
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              // shouldPlay
              isLooping
              style={styles.image}
            />
          )}
          <Avatar {...{ user, avatar }} />
          <StoryButton />
        </View>
        {/* {footerComponent && (
          <View style={styles.footer}>{footerComponent}</View>
        )} */}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: Dimensions.get("window").height
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16
  }
});
