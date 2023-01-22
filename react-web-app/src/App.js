import PayCard from './PayCard';

const ACCESS_ID = 'YOUR_ACCESS_ID';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const serverURL = 'YOUR_SERVER_URL';

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
      paymentType: 'Retrieval',
      returnUrl: `${serverURL}/return`,
      cancelUrl: `${serverURL}/cancel`,
      metadata: {}  
    };
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
