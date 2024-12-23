/** const https = require('https');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const secretKey = '6Lc5VKIqAAAAACtOhKGuf_ER2r7Jcsqdig1oSC6N';
    const { recaptchaResponse } = JSON.parse(event.body);

    if (!recaptchaResponse) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing reCAPTCHA response.' }),
        };
    }

    console.log('reCAPTCHA Response Token:', recaptchaResponse);

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    return new Promise((resolve, reject) => {
        https.get(verificationUrl, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                console.log('Google reCAPTCHA API Response:', data);
                const verificationData = JSON.parse(data);

                if (verificationData.success) {
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Verification successful!' }),
                    });
                } else {
                    resolve({
                        statusCode: 400,
                        body: JSON.stringify({
                            message: 'Verification failed.',
                            errors: verificationData['error-codes'],
                        }),
                    });
                }
            });
        }).on('error', (err) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error', error: err.message }),
            });
        });
    });
}; **/

const secretKey = process.env.RECAPTCHA_SECRET_KEY;

const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const { response } = JSON.parse(event.body);
    // const secretKey = '*'; // Replace with your reCAPTCHA Secret Key
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

    try {
        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response,
            }),
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'Verification failed' }),
            };
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Internal server error' }),
        };
    }
};

