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

// Ensure we're using ES modules
import fetch from 'node-fetch';

export const handler = async (event) => {
    try {
        const { recaptchaResponse } = JSON.parse(event.body);
        const secretKey = '6Lcge_sqAAAAAF5IlWsOf6jvPRxBW6_MhmalENHz'; // Replace with your reCAPTCHA secret key

        // Call Google's reCAPTCHA verification API
        const googleVerifyURL = 'https://www.google.com/recaptcha/api/siteverify';
        const response = await fetch(googleVerifyURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${recaptchaResponse}`
        });

        const data = await response.json();

        // Return success if score is decent (Google recommends 0.5+)
        if (data.success && data.score > 0.5) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, score: data.score, message: "reCAPTCHA verified successfully!" })
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, score: data.score, message: "reCAPTCHA verification failed!" })
            };
        }

    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Server error during reCAPTCHA verification" })
        };
    }
};


