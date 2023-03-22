import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Animated,
  Linking,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { widget } from "./trustly";
import { shouldOpenInAppBrowser } from "./oauthUtils";

import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  trustlyWebView = null;

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
      integrationContext: "InAppBrowserNotify",
      urlScheme: "in-app-browser-native://"
    },
    requestSignature: "HT5mVOqBXa8ZlvgX2USmPeLns5o=",
  };

  state = {
    bounceValue: new Animated.Value(1000),
  };

  constructor(props) {
    super(props);
  }

  LoadingIndicatorView() {
    return (
      <ActivityIndicator color="#333" size="small" style={styles.loading} />
    );
  }


  handleWidgetStateChange = (newNavState) => {
    console.log("handleWidgetStateChange: ", newNavState);
    const { url } = newNavState;
    if (!url) return;

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
        
      }
      else Linking.openURL(url)
    } catch (error) {
      console.log(error);
    }
  }

  handleOauthMessage = (message: any) => {
    const data = message.nativeEvent.data

    if ( typeof data !== 'string') return;

    var [command, ...params] = data.split("|");

    if(command.includes("ExternalBrowserIntegration")) {
      var messageUrl = params[1]
      
      if( shouldOpenInAppBrowser(messageUrl) ) {
        this.openLink(messageUrl);
      }      
    }

  }

  handleOAuthResult = (result: any) =>{
    if (result.type === 'success') {
      this.trustlyWebView.injectJavaScript('window.Trustly.proceedToChooseAccount();');
    }
  }

  render() {
    const { bounceValue } = this.state;

    const backgroundStyle = {
      backgroundColor: Colors.lighter,
      flex: 1,
      height: '100%',
    };

    const postMessageForOauth = `
        window.addEventListener(
          "message",
          function (event) {
            var data = (event || {}).data || {}
            window.ReactNativeWebView.postMessage(event.data);
          },
          false
        );
    `;

    return (

        <SafeAreaView style={backgroundStyle}>
          <WebView
              ref={(ref) => (this.trustlyWebView = ref)}
              source={{ html: widget(this.widgetData) }}
              renderLoading={this.LoadingIndicatorView}
              onNavigationStateChange={this.handleWidgetStateChange}
              injectedJavaScript={postMessageForOauth}
              onMessage={this.handleOauthMessage}
              javaScriptEnabled={true}
              startInLoadingState
              style={styles.widget}
            />

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

});