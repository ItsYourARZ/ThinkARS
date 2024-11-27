const fetch = require("node-fetch");

exports.handler = async (event) => {
  const secretKey = "6LfDZHsqAAAAACLAlt_aiaxL3vN0TFGyVkW5VEV-";
  const recaptchaResponse = JSON.parse(event.body).recaptchaResponse;

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
  const response = await fetch(verificationURL, { method: "POST" });
  const result = await response.json();

  if (result.success && result.score >= 0.5) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Verification successful" }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Verification failed", score: result.score }),
    };
  }
};
