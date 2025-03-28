const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const { recaptchaResponse } = JSON.parse(event.body);

    if (!recaptchaResponse) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing reCAPTCHA response.' }),
        };
    }

    console.log('reCAPTCHA Response Token:', recaptchaResponse);

    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';

    try {
        const response = await fetch(verificationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: recaptchaResponse,
            }),
        });

        const verificationData = await response.json();
        console.log('Google reCAPTCHA API Response:', verificationData);

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
