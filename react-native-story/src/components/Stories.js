import React, { PureComponent } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  View,
  ActivityIndicator
} from "react-native";
import StoryItem from "./StoryItem";

const { width } = Dimensions.get("window");
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === "ios" ? 2 : 1.2;

export default class Stories extends PureComponent {
  stories = [];

  state = {
    x: new Animated.Value(0),
    ready: false,
    currentIndexMultiplier: 1
  };

  constructor(props) {
    super(props);
    this.stories = props.stories.map(() => React.createRef());
  }

  async componentDidMount() {
    this.setState({ currentIndexMultiplier: this.props.selectedStory.id });
    const { x } = this.state;
    await x.addListener(() =>
      this.stories.forEach((story, index) => {
        const offset = index * width;
        const inputRange = [offset - width, offset + width];
        const translateX = x
          .interpolate({
            inputRange,
            outputRange: [width / ratio, -width / ratio],
            extrapolate: "clamp"
          })
          .__getValue();

        const rotateY = x
          .interpolate({
            inputRange,
            outputRange: [`${angle}rad`, `-${angle}rad`],
            extrapolate: "clamp"
          })
          .__getValue();

        const parsed = parseFloat(
          rotateY.substr(0, rotateY.indexOf("rad")),
          10
        );
        const alpha = Math.abs(parsed);
        const gamma = angle - alpha;
        const beta = Math.PI - alpha - gamma;
        const w = width / 2 - ((width / 2) * Math.sin(gamma)) / Math.sin(beta);
        const translateX2 = parsed > 0 ? w : -w;

        const style = {
          transform: [
            { perspective },
            { translateX },
            { rotateY },
            { translateX: translateX2 }
          ]
        };
        story.current.setNativeProps({ style });
      })
    );
  }

  _handleSelectedStoryOnLoaded = () => {
    this.setState({ ready: true });
  };

  _handleSwipeLeftRight = () => {
    alert("swipe");
  };

  _animateScrollView = evt => {
    let currentIndex = evt.nativeEvent.contentOffset.x / width;
    if (Number.isInteger(currentIndex)) {
      this.setState({
        currentIndexMultiplier: currentIndex + this.props.selectedStory.id
      });
    }
  };

  render() {
    const { x, ready, currentIndexMultiplier } = this.state;
    const { stories, selectedStory, footerComponent } = this.props;

    return (
      <View style={styles.container}>
        {!ready && (
          <View
            style={{
              flex: 1,
              zIndex: 9999,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <ActivityIndicator size="large" color="gray" />
          </View>
        )}
        {stories
          .map((story, i) => (
            <Animated.View
              ref={this.stories[i]}
              style={StyleSheet.absoluteFill}
              key={story.id}
            >
              <StoryItem
                footerComponent={footerComponent}
                handleSelectedStoryOnLoaded={this._handleSelectedStoryOnLoaded}
                selectedStory={selectedStory}
                multiplier={currentIndexMultiplier}
                {...{ story }}
              />
            </Animated.View>
          ))
          .reverse()}
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          contentContainerStyle={{ width: width * stories.length }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x }
                }
              }
            ],
            {
              useNativeDriver: true,
              listener: event => {
                this._animateScrollView(event);
              }
            }
          )}
          decelerationRate={0.99}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
