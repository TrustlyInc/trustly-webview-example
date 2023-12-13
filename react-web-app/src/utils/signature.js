export async function getRequestSignature(establishData) {
  const { SIGNATURE_API_URL } = window.env;
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
