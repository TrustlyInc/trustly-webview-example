This web app renders an example of the Select Bank Widget and a button that launches the Lightbox directly. It is meant to be used with this repository's Android and iOS example apps to test and demonstrate the use of a WebView to integrate Trustly with a mobile app.

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Install dependencies

`npm install`

2. Add your Trustly sandbox credentials

Copy the `.env.sample` file to a new `.env.local` file and fill out your environment variables.

3. Run

`npm start`

This command runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Server Side Features

This example project can be run entirely as a frontend app in order to quickly test basic Trustly functions. However, your application will likely require backend integration with Trustly as well. Check out our [trustly-nestjs-example](https://github.com/TrustlyInc/trustly-nestjs-example) project to learn more and follow the steps below to integrate it with this app.

## Request Signature

Documentation: [Securing Requests](https://amer.developers.trustly.com/payments/docs/securing-requests)

1. Clone and run the [trustly-nestjs-example](https://github.com/TrustlyInc/trustly-nestjs-example), in case you don't have a request signature server set
2. Add the request signature endpoint (e.g. `http://localhost:8080/signature` in the NestJS Example) into `REACT_APP_TRUSTLY_SIGNATURE_API_URL` variable of the `.env.local` file
3. Uncomment the `getRequestSignature` code snippet in the `App.js` file
4. Run your app
