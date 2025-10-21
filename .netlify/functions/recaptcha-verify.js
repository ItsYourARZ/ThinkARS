exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, password, token, action } = JSON.parse(event.body);
  const secret = '6LeJQfIrAAAAABC5fZ7Jvys4zgHg2nei1TXzxNN1';

  if (!token) {
    return { statusCode: 400, body: JSON.stringify({ message: 'No reCAPTCHA token provided' }) };
  }

  // Verify token with Google
  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  try {
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params
    });

    const result = await resp.json();

    if (!result.success || result.action !== action || (result.score || 0) < 0.5) {
      return { statusCode: 403, body: JSON.stringify({ message: 'reCAPTCHA verification failed' }) };
    }

    // Verified! Process the signup
    console.log('Signup:', email, password, result.score);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Signup successful!', score: result.score })
    };

  } catch (err) {
    console.error('Error verifying reCAPTCHA:', err);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) };
  }
};
