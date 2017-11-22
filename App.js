import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  Animated
} from "react-native";
import InfinityPicker from "./src/components/InfinityPicker";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  render() {
    return <InfinityPicker />;
  }
}
