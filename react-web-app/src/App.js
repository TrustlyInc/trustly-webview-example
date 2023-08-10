import HeaderBar from './HeaderBar';
import PayCard from './PayCard';
import ReturnCard from './ReturnCard';
import SelectBankCard from './SelectBankCard';

const ACCESS_ID = process.env.REACT_APP_TRUSTLY_ACCESS_ID;
const MERCHANT_ID = process.env.REACT_APP_TRUSTLY_MERCHANT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const params = new URLSearchParams(window.location.search);

function App() {
  const TrustlyOptions = {
    closeButton: false,
    dragAndDrop: true,
    widgetContainerId: "widget"
  };

  const returnEstablishData = () => {
    let data = {
      accessId: ACCESS_ID,
      // requestSignature: REQUEST_SIGNATURE,
      merchantId: MERCHANT_ID,
      description: 'transaction description',
      merchantReference: 'merchant reference',
      currency: 'USD',
      paymentType: 'Deferred',
      returnUrl: `/return`,
      cancelUrl: `/cancel`,
    };
    // check query params for mobile
    if (params.get("integrationContext") && params.get("urlScheme")) {
			if (!data.metadata) data.metadata = {};
      data.metadata.urlScheme = `${params.get("urlScheme")}://`;
      data.metadata.integrationContext = params.get("integrationContext");
    }
    // add URLs if configured
    if (BACKEND_URL) {
      data.notificationUrl = `${BACKEND_URL}/trustly-webhooks`;
      data.returnUrl = `${BACKEND_URL}/return`;
      data.cancelUrl = `${BACKEND_URL}/cancel`;
    }
    return data;
  };

  return (
    <div className='App'>
        <HeaderBar />
        <SelectBankCard
          establishData={returnEstablishData} 
          TrustlyOptions={TrustlyOptions}
        >
        </SelectBankCard>
        <PayCard 
          establishData={returnEstablishData} 
          TrustlyOptions={TrustlyOptions}
        ></PayCard>
        <ReturnCard params={params}/>
    </div>
  );
}

export default App;
