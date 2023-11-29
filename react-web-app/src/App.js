import HeaderBar from './HeaderBar';
import PayCard from './PayCard';
import SelectBankCard from './SelectBankCard';

const ACCESS_ID = process.env.REACT_APP_TRUSTLY_ACCESS_ID;
const MERCHANT_ID = process.env.REACT_APP_TRUSTLY_MERCHANT_ID;
const serverURL = process.env.SERVER_URL ? process.env.SERVER_URL : null;

const params = new URLSearchParams(window.location.search);

function App() {
  const TrustlyOptions = {
    closeButton: false,
    dragAndDrop: true,
    widgetContainerId: 'widget',
  };

  const returnEstablishData = () => {
    let lightboxRedirectURL = serverURL ? serverURL : '#';
    let data = {
      accessId: ACCESS_ID,
      cancelUrl: `${lightboxRedirectURL}/cancel`,
      currency: 'USD',
      description: 'transaction description',
      merchantId: MERCHANT_ID,
      merchantReference: 'merchant reference',
      metadata: {},
      paymentType: 'Deferred',
      // requestSignature: REQUEST_SIGNATURE,
      returnUrl: `${lightboxRedirectURL}/return`,
    };
    // check query params for mobile
    if (params.get('integrationContext') && params.get('urlScheme')) {
      if (!data.metadata) data.metadata = {};
      data.metadata.urlScheme = `${params.get('urlScheme')}://`;
      data.metadata.integrationContext = params.get('integrationContext');
    }
    return data;
  };

  return (
    <div className='App'>
      <HeaderBar />
      <SelectBankCard
        establishData={returnEstablishData}
        TrustlyOptions={TrustlyOptions}
      />
      <PayCard
        establishData={returnEstablishData}
        TrustlyOptions={TrustlyOptions}
      />
    </div>
  );
}

export default App;
