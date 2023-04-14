import PayCard from './PayCard';

const ACCESS_ID = process.env.REACT_APP_TRUSTLY_ACCESS_ID;
const MERCHANT_ID = process.env.REACT_APP_TRUSTLY_MERCHANT_ID;
const serverURL = process.env.SERVER_URL ? process.env.SERVER_URL : null;

const params = new URLSearchParams(window.location.search);

function App() {
  const TrustlyOptions = {
    closeButton: false,
    dragAndDrop: true,
    widgetContainerId: "widget"
  };

  const returnEstablishData = () => {
    let lightboxRedirectURL = serverURL ? serverURL : "#";
    let data = {
      accessId: ACCESS_ID,
      // requestSignature: REQUEST_SIGNATURE,
      merchantId: MERCHANT_ID,
      description: 'transaction description',
      merchantReference: 'merchant reference',
      paymentType: 'Retrieval',
      returnUrl: `${lightboxRedirectURL}/return`,
      cancelUrl: `${lightboxRedirectURL}/cancel`,
      metadata: {}  
    };
    // check query params for mobile
    if (params.get("integrationContext") && params.get("urlScheme")) {
			if (!data.metadata) data.metadata = {};
      data.metadata.urlScheme = `${params.get("urlScheme")}://`;
      data.metadata.integrationContext = params.get("integrationContext");
    }
    return data;
  };

  return (
    <div className="App">
        <PayCard 
          establishData={returnEstablishData} 
          TrustlyOptions={TrustlyOptions}
        ></PayCard>
    </div>
  );
}

export default App;
