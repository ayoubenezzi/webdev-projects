export default async function getAccessToken() {
  const clientId = 'bG62EOPuCJLgFV9wmj30VJtH4h3YGsAP';
  const clientSecret = 'MJylzE6yxyOPK7w5';

  try {
    const response = await fetch(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Request failed with status code: ' + response.status);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Fetch Error:', error?.message || error);
    return null;
  }
}
