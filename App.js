/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, BackHandler } from "react-native";

import { WebView } from "react-native-webview";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.backHandler);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
    }
  }

  backHandler = () => {
    this.WEBVIEW_REF.current.goBack();
    return true;
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
  render() {
    return (
      <WebView
        ref={this.WEBVIEW_REF}
        source={{ uri: "https://google.com/" }}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
