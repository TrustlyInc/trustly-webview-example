export const exposeEnvVariables = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  window.env = {
    ACCESS_ID:
      (process.env && process.env.REACT_APP_TRUSTLY_ACCESS_ID) ||
      urlSearchParams.get('accessId'),
    MERCHANT_ID:
      (process.env && process.env.REACT_APP_TRUSTLY_MERCHANT_ID) ||
      urlSearchParams.get('merchantId'),
    SERVER_URL:
      (process.env && process.env.REACT_APP_TRUSTLY_SERVER_URL) ||
      urlSearchParams.get('serverUrl'),
    SIGNATURE_API_URL:
      (process.env && process.env.REACT_APP_TRUSTLY_SIGNATURE_API_URL) ||
      urlSearchParams.get('signatureApiUrl'),
  };
};

export const loadScript = (callback) => {
  const { ACCESS_ID } = window.env;
  const sdkScript = document.createElement('script');
  sdkScript.type = 'text/javascript';
  sdkScript.src = `https://sandbox.trustly.one/start/scripts/trustly.js?accessId=${ACCESS_ID}`;
  sdkScript.onload = callback;
  document.head.appendChild(sdkScript);
};

const sdk = {
  exposeEnvVariables,
  loadScript,
};

export default sdk;
