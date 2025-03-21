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
}; */

const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { token } = JSON.parse(event.body);
    const secretKey = '6LcNd_sqAAAAAD4QjB_FzPTjwKTi9_lwQp7VtvN3';

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: data.success && data.score > 0.5,
            score: data.score,
            message: data.success ? "Verification passed" : "Verification failed"
        })
    };
};

