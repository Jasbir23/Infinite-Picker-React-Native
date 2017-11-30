import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  StatusBar,
  Alert,
  Platform
} from "react-native";
const { height, width } = Dimensions.get("window");
const optnHeight = height / 12;

export default class NoFlatScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { key: 1, name: "Batman" },
        { key: 2, name: "Thor" },
        { key: 3, name: "Hulk" },
        { key: 4, name: "Spiderman" },
        { key: 5, name: "Aquaman" },
        { key: 6, name: "Wonder Woman" }
      ],
      nextKey: 7,
      ani: new Animated.Value(0),
      momentum: false,
      scrollEnabled: true,
      momentumStart: 0,
      images: [
        {
          key: 1,
          url:
            "https://i.pinimg.com/736x/ba/94/64/ba9464177dd23692898b217ac10af411--batman-wallpaper-iphone-phone-wallpapers.jpg"
        },
        {
          key: 2,
          url:
            "https://vignette4.wikia.nocookie.net/theavengersmovie/images/0/0b/Thor.png/revision/latest?cb=20130508060041"
        },
        {
          key: 3,
          url: "https://mfiles.alphacoders.com/553/553648.jpg"
        },
        {
          key: 4,
          url:
            "https://i1.wp.com/cdn.wallpapersafari.com/82/92/hUTDFu.jpg?resize=640%2C1136"
        },
        {
          key: 5,
          url:
            "https://orig00.deviantart.net/015c/f/2017/103/6/5/aquaman___justice_league___iphone_hd_wallpaper_by_prkrdesigns-db5po51.jpg"
        },
        { key: 6, url: "https://mfiles.alphacoders.com/671/671241.jpg" }
      ],
      scrollPos: 120 * optnHeight,
      componentReady: false
    };
  }
  componentDidMount() {
    this.addItems(0);
    for (var i = 1; i < 40; i++) {
      setTimeout(() => {
        this.addItems(i);
      }, 0);
    }
  }
  addItems(i) {
    let arr = this.state.data;
    let arr2 = [
      { key: this.state.nextKey, name: "Batman" },
      { key: this.state.nextKey + 1, name: "Thor" },
      { key: this.state.nextKey + 2, name: "Hulk" },
      { key: this.state.nextKey + 3, name: "Spiderman" },
      { key: this.state.nextKey + 4, name: "Aquaman" },
      { key: this.state.nextKey + 5, name: "Wonder Woman" }
    ];
    let parr = this.state.images;
    let parr2 = [
      {
        key: this.state.nextKey,
        url:
          "https://i.pinimg.com/736x/ba/94/64/ba9464177dd23692898b217ac10af411--batman-wallpaper-iphone-phone-wallpapers.jpg"
      },
      {
        key: this.state.nextKey + 1,
        url:
          "https://vignette4.wikia.nocookie.net/theavengersmovie/images/0/0b/Thor.png/revision/latest?cb=20130508060041"
      },
      {
        key: this.state.nextKey + 2,
        url: "https://mfiles.alphacoders.com/553/553648.jpg"
      },
      {
        key: this.state.nextKey + 3,
        url:
          "https://i1.wp.com/cdn.wallpapersafari.com/82/92/hUTDFu.jpg?resize=640%2C1136"
      },
      {
        key: this.state.nextKey + 4,
        url:
          "https://orig00.deviantart.net/015c/f/2017/103/6/5/aquaman___justice_league___iphone_hd_wallpaper_by_prkrdesigns-db5po51.jpg"
      },
      {
        key: this.state.nextKey + 5,
        url: "https://mfiles.alphacoders.com/671/671241.jpg"
      }
    ];
    this.setState({
      nextKey: this.state.nextKey + 6,
      data: arr.concat(arr2),
      images: parr.concat(parr2),
      componentReady: this.state.nextKey + 6 === 247 ? true : false
    });
    if (this.state.nextKey + 6 === 247) {
      Alert.alert(
        "Note",
        "Images might take a while to load depending on wifi speed"
      );
      setTimeout(() => {
        this.refs.flatlist._component.scrollTo({
          y: 120 * optnHeight,
          animated: false
        });
      }, 1);
    }
  }
  render() {
    let len = 40 * 6 * optnHeight;
    let imgFac = 0.666666666666666666 * (height / optnHeight);
    const movImg = this.state.ani.interpolate({
      inputRange: [0, len],
      outputRange: [0, -imgFac * len]
    });
    if (!this.state.componentReady) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black"
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
            Loading
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 2, backgroundColor: "black" }}>
          <Animated.View
            style={{
              transform: [{ translateY: movImg }]
            }}
          >
            {this.state.images.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={{
                    width: width,
                    height: height * (2 / 3)
                  }}
                  source={{ uri: item.url }}
                />
              );
            })}
          </Animated.View>
        </View>
        <View style={{ flex: 1, backgroundColor: "rgb(60,67,79)" }}>
          <View
            style={{
              height: optnHeight,
              width: width,
              backgroundColor: "#1abc9c",
              position: "absolute",
              top: 0
            }}
          />
          <Animated.ScrollView
            bounces={false}
            scrollEnabled={this.state.scrollEnabled}
            scrollEventThrottle={16}
            style={{
              flex: 1
            }}
            contentContainerStyle={{
              justifyContent: "flex-start",
              alignItems: "center"
            }}
            showsVerticalScrollIndicator={false}
            ref="flatlist"
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: this.state.ani } }
                }
              ],
              {
                useNativeDriver: true // <- Native Driver used for animated events
              }
            )}
            onMomentumScrollBegin={e => {
              this.setState({
                momentum: true
              });
            }}
            onScrollEndDrag={e => {
              let pos = e.nativeEvent.contentOffset.y;
              setTimeout(() => {
                if (!this.state.momentum) {
                  this.setState(
                    {
                      scrollPos: Math.round(pos / optnHeight) * optnHeight
                    },
                    () => {
                      this.refs.flatlist._component.scrollTo({
                        y: Math.round(pos / optnHeight) * optnHeight,
                        animated: true
                      });
                    }
                  );
                }
              }, 0);
            }}
            onMomentumScrollEnd={e => {
              let ptr = Math.round(e.nativeEvent.contentOffset.y / optnHeight);
              if (ptr > 180 || ptr < 60) {
                let overFac = Math.abs(ptr - 120);
                overFac = overFac % 6;
                if (ptr > 180) {
                  this.refs.flatlist._component.scrollTo({
                    y: (120 + overFac) * optnHeight,
                    animated: false
                  });
                  this.setState({
                    scrollPos: (120 + overFac) * optnHeight
                  });
                } else if (ptr < 60) {
                  this.refs.flatlist._component.scrollTo({
                    y: (120 - overFac) * optnHeight,
                    animated: false
                  });
                  this.setState({
                    scrollPos: (120 - overFac) * optnHeight
                  });
                }
              }
              if (
                e.nativeEvent.contentOffset.y % optnHeight !== 0 &&
                ptr < 180 &&
                ptr > 60 &&
                this.state.momentum
              ) {
                this.setState(
                  {
                    scrollPos: ptr * optnHeight
                  },
                  () => {
                    this.refs.flatlist._component.scrollTo({
                      y: ptr * optnHeight,
                      animated: true
                    });
                  }
                );
              }
              this.setState({
                momentum: false
              });
            }}
          >
            {this.state.data.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    height: optnHeight,
                    width: width
                  }}
                  key={index}
                  onPress={() => {
                    this.setState(
                      {
                        scrollPos: (item.key - 1) * optnHeight
                      },
                      () => {
                        this.refs.flatlist._component.scrollTo({
                          y: (item.key - 1) * optnHeight,
                          animated: true
                        });
                      }
                    );
                  }}
                >
                  <View
                    style={{
                      height: optnHeight,
                      width: width,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize:
                          Math.abs(
                            (item.key - 1) * optnHeight - this.state.scrollPos
                          ) < 5
                            ? 25
                            : 18,
                        backgroundColor: "transparent",
                        padding: 0,
                        fontWeight:
                          Math.abs(
                            (item.key - 1) * optnHeight - this.state.scrollPos
                          ) < 5
                            ? "bold"
                            : "normal",
                        color: "white"
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
        </View>
      </View>
    );
  }
}
