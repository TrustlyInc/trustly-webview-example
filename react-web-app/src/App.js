import { useEffect, useState } from 'react';

import { exposeEnvVariables, loadScript } from './utils/sdk';
// import { getRequestSignature } from './utils/signature';
import HeaderBar from './HeaderBar';
import PayCard from './PayCard';
import SelectBankCard from './SelectBankCard';

const params = new URLSearchParams(window.location.search);

function App() {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    exposeEnvVariables();
    loadScript(() => {
      setSdkLoaded(true);
    });
  }, []);

  const TrustlyOptions = {
    closeButton: false,
    dragAndDrop: true,
    widgetContainerId: 'widget',
  };

  const returnEstablishData = async () => {
    const { ACCESS_ID, MERCHANT_ID, SERVER_URL } = window.env;
    const lightboxRedirectURL = SERVER_URL || '#';

    let data = {
      accessId: ACCESS_ID,
      amount: '1.00',
      cancelUrl: `${lightboxRedirectURL}/cancel`,
      currency: 'USD',
      customer: {
        address: {
          country: 'US',
        },
        email: 'john@us.com',
        name: 'John',
      },
      description: 'transaction description',
      merchantId: MERCHANT_ID,
      merchantReference: 'merchant reference',
      metadata: {},
      paymentType: 'Deferred',
      returnUrl: `${lightboxRedirectURL}/return`,
    };

    // check query params for mobile
    if (params.get('integrationContext') && params.get('urlScheme')) {
      if (!data.metadata) data.metadata = {};
      data.metadata.urlScheme = `${params.get('urlScheme')}://`;
      data.metadata.integrationContext = params.get('integrationContext');
    }

    // sign request - instructions available in readme.md
    // await (async () => {
    //   const requestSignature = await getRequestSignature(data);
    //   data.requestSignature = requestSignature;
    // })();

    return data;
  };

  return (
    <div className='App'>
      {sdkLoaded && (
        <>
          <HeaderBar />
          <SelectBankCard
            establishData={returnEstablishData}
            TrustlyOptions={TrustlyOptions}
          />
          <PayCard
            establishData={returnEstablishData}
            TrustlyOptions={TrustlyOptions}
          />
        </>
      )}
    </div>
  );
}

export default App;
