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

const baseUrls = ["paywithmybank.com", "trustly.one", "192.168.0.9"];
const oauthLoginPaths = ["/oauth/login"];

const hasAllowedLocations = (url): boolean => {
    let hasLocation = false;

    baseUrls.forEach(function(value) {
        if(url.includes(value)) {
            hasLocation = true;
        }
    });

    return hasLocation;
}

const hasAllowedPath = (url): boolean => {
    let hasPath = false;

    oauthLoginPaths.forEach(function(value) {
        if(url.includes(value)) {
            hasPath = true;
        }
    });

    return hasPath;
}

export const shouldOpenInAppBrowser = (url): boolean => {
    return hasAllowedLocations(url) && hasAllowedPath(url);
}