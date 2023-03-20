import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Linking,
  Alert,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { widget, establish } from "./trustly";

import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  widgetWebview = null;
  establishWebview = null;

  widgetData = {
    accessId: "A48B73F694C4C8EE6306",
    merchantId: "110005514",
    currency: "USD",
    amount: "2.00",
    merchantReference: "cac73df7-52b4-47d7-89d3-9628d4cfb65e",
    paymentType: "Retrieval",
    returnUrl: "/returnUrl",
    cancelUrl: "/cancelUrl",
    customer: {
      name: "John",
      address: {
        country: "US",
      },
    },
    metadata:{
      integrationContext: "InAppBrowser",
      urlScheme: "in-app-browser-native://"
    },
    requestSignature: "HT5mVOqBXa8ZlvgX2USmPeLns5o=",
  };

  state = {
    bounceValue: new Animated.Value(1000),
    showWebView: false,
    establishData: null,
  };

  constructor(props) {
    super(props);
  }

  LoadingIndicatorView() {
    return (
      <ActivityIndicator color="#333" size="small" style={styles.loading} />
    );
  }

  showWebView = () => {
    Animated.spring(this.state.bounceValue, {
      toValue: 0,
      velocity: 1,
      tension: 0,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  hideWebView = () => {
    Animated.spring(this.state.bounceValue, {
      toValue: 1000,
      velocity: 1,
      tension: 0,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  handleWidgetStateChange = (newNavState) => {
    console.log("handleWidgetStateChange: ", newNavState);
    const { url } = newNavState;
    if (!url) return;

    if (url.includes("/select-bank-widget")) {
      const fragment = url.substr(url.indexOf("#") + 1);
      const data = JSON.parse(decodeURIComponent(fragment));
      this.setState({ establishData: data });
      this.showWebView()
      this.widgetWebview.stopLoading();
    }
  };

  handleEstablishStateChange = (newNavState) => {
    const baseUrls = ["paywithmybank.com", "trustly.one"];
    const oauthLoginPath = "/oauth/login";
    
    console.log("handleEstablishStateChange: ", newNavState);
    const { url } = newNavState;
    if (!url) return;

    if ( (url.includes(baseUrls[0]) || url.includes(baseUrls[1]) ) && 
      url.includes(oauthLoginPath) ) {
        this.openLink(url)

    }

    if (url.includes("/trustly-establish-success")) {
      console.log("Establish success: ", url);
      this.setState({ establishData: null });
      this.establishWebview.stopLoading();
      this.hideWebView();
      Alert.alert("Success!");
    }

    if (url.includes("/trustly-establish-cancel")) {
      console.log("Establish cancel: ", url);
      this.setState({ establishData: null });
      this.establishWebview.stopLoading();
      this.hideWebView();
      Alert.alert("Cancel!");
    }


  };

  async sleep(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }
  async openLink(url: string) {
    try {
      if (await InAppBrowser.isAvailable()) {

        const result = await InAppBrowser.openAuth(url, '', {
          // iOS Properties
          ephemeralWebSession: true,
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'automatic',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        }).then((response) => {
          this.handleOAuthResult(response);
        });

        // await this.sleep(800);
        
        
      }
      else Linking.openURL(url)
    } catch (error) {
      Alert.alert("Error: ", error.message)
    }
  }

  handleMessage = (message) =>{
    Alert.alert("Message: ", message)
  }

  handleOAuthResult = (result) =>{
    Alert.alert("Result: ", JSON.stringify(result))
    
    if (result.type === 'success') {
      this.establishWebview.injectJavaScript('window.Trustly.proceedToChooseAccount();');
    }
  }


  render() {
    const { bounceValue, showWebView, establishData } = this.state;

    const backgroundStyle = {
      backgroundColor: Colors.lighter,
      flex: 1,
      height: '100%',
    };

    return (

        <SafeAreaView style={backgroundStyle}>
          <WebView
              ref={(ref) => (this.widgetWebview = ref)}
              source={{ html: widget(this.widgetData) }}
              renderLoading={this.LoadingIndicatorView}
              onNavigationStateChange={this.handleWidgetStateChange}
              onMessage={this.handleMessage}
              javaScriptEnabled={true}
              startInLoadingState
              style={styles.widget}
            />

        <Animated.View
          style={[styles.subView, { transform: [{ translateY: bounceValue }] }]}
        >
          {establishData && (
            <WebView
              ref={(ref) => (this.establishWebview = ref)}
              source={{
                html: establish(establishData),
              }}
              renderLoading={this.LoadingIndicatorView}
              onNavigationStateChange={this.handleEstablishStateChange}
              javaScriptEnabled={true}
              startInLoadingState
            />
          )}
        </Animated.View>

        </SafeAreaView>



    );
  }
}

const styles = StyleSheet.create({

  header: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 50,
  },

  headerText: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 50,
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
    paddingTop: 10
  },

  widget: {
    width: '100%',
    height: '100%'
  },

  footer: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 40,
    textAlign: 'center',
    color: "#fff"
  },

  footerText: {
    alignSelf: 'stretch',
    backgroundColor: "#333",
    height: 40,
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
    paddingTop: 10
  },

  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: "100%",
    zIndex: 5,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
  },

  // button: {
  //   borderRadius: 100,
  //   borderWidth: 2,
  //   borderColor: "#333",
  //   color: "#333",
  //   padding: 15,
  // },
});