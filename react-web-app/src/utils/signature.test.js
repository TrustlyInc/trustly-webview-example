import { getRequestSignature } from './signature';

// This is just a mockup
const isHmacSha1Base64Hash = (str) => {
  if (!str) return;

  // Regular expression for Base64 encoding
  const isValidBase64 = (str) => /^[A-Za-z0-9+/]+={0,2}$/.test(str);

  // Check if the length is 28 characters (without padding) or 40 characters (with padding)
  const isLengthValid = [28, 40].includes(str.length);

  // Check if the string matches the Base64 encoding pattern
  const isBase64Valid = isValidBase64(str);

  return isLengthValid && isBase64Valid;
};

describe('getRequestSignature', () => {
  test('returns a Base64 encoded HMAC-SHA1-like data if request succeeds', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve('v0LmRqCUqgBTVV7fd7wWp0ZFLQQ='),
      })
    );

    const requestSignature = await getRequestSignature({});
    const requestSignatureTest = isHmacSha1Base64Hash(requestSignature);

    expect(requestSignatureTest).toBeTruthy();
  });

  test('returns an error if request fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      })
    );

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const requestSignature = await getRequestSignature({});
    const requestSignatureTest = isHmacSha1Base64Hash(requestSignature);

    expect(requestSignatureTest).toBeFalsy();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
