const SIGNATURE_API_URL = process.env.REACT_APP_TRUSTLY_SIGNATURE_API_URL;

export async function getRequestSignature(establishData) {
  let requestSignature = null;

  await fetch(SIGNATURE_API_URL, {
    method: 'POST',
    body: JSON.stringify(establishData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (!data.ok) throw new Error();

      requestSignature = data.json();
    })
    .catch(() => {
      console.error('Error: Failed signing your request');
    });

  return requestSignature;
}

const signature = {
  getRequestSignature,
};

export default signature;
