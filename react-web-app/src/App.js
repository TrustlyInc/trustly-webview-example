// import logo from './logo.svg';
// import './App.css';
import PayCard from './PayCard';

const ACCESS_ID = 'YOUR_ACCESS_ID';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const serverURL = 'YOUR_SERVER_URL';

function App() {

  // const params = new URLSearchParams(window.location.search);
  
  const TrustlyOptions = {
    closeButton: false,
    dragAndDrop: true,
    widgetContainerId: "widget"
  };

  const establishData = {
    accessId: ACCESS_ID,
    // requestSignature: REQUEST_SIGNATURE,
    merchantId: MERCHANT_ID,
    description: 'transaction description',
    merchantReference: 'merchant reference',
    paymentType: 'Retrieval',
    returnUrl: `${serverURL}/return`,
    cancelUrl: `${serverURL}/cancel`,
    metadata: {
	    urlScheme: "in-app-browser-ios",
	    integrationContext: "InAppBrowser",
	  }
  };

  return (
    <div className="App">
      <div id="widget"></div>
        <PayCard 
          establishData={establishData} 
          TrustlyOptions={TrustlyOptions}
        ></PayCard>
    </div>
  );
}

export default App;
