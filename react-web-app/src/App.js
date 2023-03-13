import PayCard from './PayCard';

const ACCESS_ID = 'A48B73F694C4C8EE6306';
const MERCHANT_ID = '110005514';
const serverURL = 'https://sandbox.paywithmybank.com'; // YOUR_SERVER_URL
const REQUEST_SIGNATURE = 'HT5mVOqBXa8ZlvgX2USmPeLns5o=';

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
      requestSignature: REQUEST_SIGNATURE,
      merchantId: MERCHANT_ID,
      description: 'transaction description',
      merchantReference: 'merchant reference',
      paymentType: 'Retrieval',
      returnUrl: `${lightboxRedirectURL}/return`,
      cancelUrl: `${lightboxRedirectURL}/cancel`,
      metadata: {},
      customer: {
        name: 'Marcos',
        address: {
          country: 'US'
        }
        
      }
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
