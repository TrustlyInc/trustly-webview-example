This web app simply renders a "Pay with Trustly" button that is used to launch the [Trustly Lightbox](developers.trustly.com/payments/sdk). It is meant to be used together with this iOS Sample app to test and demonstrate the use of a Webview to integrate Trustly with a mobile app.

# Getting Started

In the app.js file, add your Access ID, Merchant ID and a server URL to be included in the [establish](https://developers.trustly.com/payments/docs/establish-data) object.

```
// src/app.js

const ACCESS_ID = 'YOUR_ACCESS_ID';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const serverURL = 'YOUR_SERVER_URL';

function App() {
  ...
```
Then start it up:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
