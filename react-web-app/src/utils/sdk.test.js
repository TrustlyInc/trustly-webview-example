import { exposeEnvVariables, loadScript } from './sdk';

beforeEach(() => {
  global.window = {};
});

afterEach(() => {
  global.window = undefined;
});

describe('exposeEnvVariables', () => {
  test('should expose environment variables from URLSearchParams', () => {
    Object.defineProperty(global.window, 'location', {
      value: { search: '?accessId=123&merchantId=456&serverUrl=example.com' },
      writable: true,
    });

    exposeEnvVariables();

    expect(window.env).toEqual({
      ACCESS_ID: '123',
      MERCHANT_ID: '456',
      SERVER_URL: 'example.com',
      SIGNATURE_API_URL: null,
    });
  });

  test('should prioritize process.env over URLSearchParams', () => {
    process.env.REACT_APP_TRUSTLY_ACCESS_ID = 'processEnvAccessId';

    Object.defineProperty(global.window, 'location', {
      value: { search: '?accessId=urlSearchParamsAccessId' },
      writable: true,
    });

    exposeEnvVariables();

    expect(window.env).toEqual({
      ACCESS_ID: 'processEnvAccessId',
      MERCHANT_ID: null,
      SERVER_URL: null,
      SIGNATURE_API_URL: null,
    });
  });
});

describe('loadScript', () => {
  test('should load script with the correct accessId', () => {
    window.env = { ACCESS_ID: 'testAccessId' };

    document.head.appendChild = jest.fn();

    loadScript(() => {});

    expect(document.head.appendChild).toHaveBeenCalled();

    const scriptTagExpected =
      '<script type="text/javascript" src="https://sandbox.trustly.one/start/scripts/trustly.js?accessId=testAccessId"></script>';
    const [scriptTagReceivedCall] = document.head.appendChild.mock.calls[0];
    const scriptTagReceived = scriptTagReceivedCall.outerHTML;

    expect(scriptTagReceived).toEqual(scriptTagExpected);
  });
});
