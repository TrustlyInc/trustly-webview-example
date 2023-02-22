# Trustly OAuth Webview iOS and Android Sample Apps

This project is provided as an example of integration between a web app serving the Trustly Lightbox checkout experience and mobile apps that renders that web app from a webview. Specifically, this example focuses on successfully handling OAuth and App-to-App bank authorization user flows. There is no sample functionality beyond successfully authorizing a user with a bank.

## The Web App

The `react-web-app` directory contains a simple React app that displays a "Pay with Trustly" button which launches the Lightbox. Instructions for running this app can be found in that directory's [ReadMe](./react-web-app/README.md).

## The iOS App

The `ios-app` directory contains a simple Swift app that renders a Webview of a given URL. With the above React app running, the iOS app can be pointed to the resulting URL to demonstrate the webview and secure-in-app-browser functionality required to successfully integrate the two applications. Additional instructions can be found in that directory's [ReadMe](./ios-app/README.md).

## The Android App

The `android-app` directory contains a simple Kotlin app that renders a Webview of a given URL. With the above React app running, the Android app can be pointed to the resulting URL to demonstrate the webview and secure-in-app-browser functionality required to successfully integrate the two applications. Additional instructions can be found in that directory's [ReadMe](./android-app/README.md).