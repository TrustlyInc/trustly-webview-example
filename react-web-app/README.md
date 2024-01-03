This web app simply renders a "Pay with Trustly" button that is used to launch the [Trustly Lightbox](developers.trustly.com/payments/sdk). It is meant to be used together with this iOS Sample app to test and demonstrate the use of a Webview to integrate Trustly with a mobile app.

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Install dependencies

### `npm install`

2. Add your Trustly sandbox credentials

Copy the `.env.sample` file to a new file `.env.local` and add your `AccessID` and `MerchantID`.

```
REACT_APP_TRUSTLY_ACCESS_ID=YOUR_ACCESS_ID
REACT_APP_TRUSTLY_MERCHANT_ID=YOUR_MERCHANT_ID
```

Your `AccessID` will now be included in the `./public/index.html` file to load the Trustly.js library and both properties will be used in the [establish](https://developers.trustly.com/payments/docs/establish-data) object.

```
./public/index.html
<script src="https://sandbox.trustly.one/start/scripts/trustly.js?accessId={YOUR_ACCESS_ID}"></script>
```

```
./src/app.js

const ACCESS_ID = 'YOUR_ACCESS_ID';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const serverURL = 'YOUR_SERVER_URL';

function App() {
  ...
```

Then start it up:

#### `npm start`

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
