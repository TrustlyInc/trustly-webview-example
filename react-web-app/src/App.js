import { AppBar, Toolbar, Typography } from '@mui/material';
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
      currency: 'USD',
      paymentType: 'Deferred',
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
    <div className='App'>
      <AppBar position='static' style={{backgroundColor: '#003140'}}>
        <Toolbar>
          <Typography variant='h5'>
            Trustly Demo App
          </Typography>
        </Toolbar>
      </AppBar>
        <SelectBankCard
          establishData={returnEstablishData} 
          TrustlyOptions={TrustlyOptions}
        >
        </SelectBankCard>
        <PayCard 
          establishData={returnEstablishData} 
          TrustlyOptions={TrustlyOptions}
        ></PayCard>
    </div>
  );
}

export default App;
