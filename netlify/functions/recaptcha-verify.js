const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Replace with your actual reCAPTCHA secret key
  const secretKey = "6LdDOqIqAAAAALSk_QWSZSK9Gfn5b8iz-clRwc0Q"; // <-- hard-code the secret key here

  const { token } = JSON.parse(event.body);
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing reCAPTCHA token" }),
    };
  }

  try {
    console.log("Verifying token with Google reCAPTCHA API:", token);

    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    console.log("Google reCAPTCHA API Response:", data);

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
    console.error("Error during verification:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
