const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const secretKey = '6LdgKp0qAAAAANytDJ5K3-mk83M3iiuOMDHw26TK';
    const { recaptchaResponse } = JSON.parse(event.body);

    if (!recaptchaResponse) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing reCAPTCHA response.' }),
        };
    }

    // Verify reCAPTCHA response with Google's API
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
        const verificationResponse = await fetch(verificationUrl, { method: 'POST' });
        const verificationData = await verificationResponse.json();

        if (verificationData.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Verification successful!' }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Verification failed.',
                    errors: verificationData['error-codes'],
                }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
