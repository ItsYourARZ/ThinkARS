const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const secretKey = "y6LdDOqIqAAAAALSk_QWSZSK9Gfn5b8iz-clRwc0Q";  // Replace with your actual reCAPTCHA secret key
  const { token } = JSON.parse(event.body);

  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing reCAPTCHA token" }),
    };
  }

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success && data.score > 0.5) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, score: data.score }),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ success: false, error: "Verification failed", score: data.score }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
