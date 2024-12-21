const siteKey = "6LdDOqIqAAAAAL4mV96yLBJLrVGkKP1rFuYYTapZ"; // Replace with your actual site key

document.getElementById("recaptchaButton").addEventListener("click", async () => {
  const resultElement = document.getElementById("result");

  try {
    // Execute reCAPTCHA v3
    const token = await grecaptcha.execute(siteKey, { action: "submit" });
    console.log("reCAPTCHA Token:", token); // Log token for debugging

    // Call the backend function to verify the token
    const verificationResult = await verifyRecaptchaToken(token);

    // Display the result
    if (verificationResult.success) {
      resultElement.textContent = `Verification successful! Score: ${verificationResult.score}`;
    } else {
      resultElement.textContent = `Verification failed: ${verificationResult.error}`;
    }
  } catch (error) {
    console.error("Error executing reCAPTCHA:", error);
    resultElement.textContent = "An error occurred while verifying.";
  }
});

// Function to send token to the server for verification
async function verifyRecaptchaToken(token) {
  try {
    const response = await fetch("/.netlify/functions/recaptcha-verify.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying reCAPTCHA token:", error);
    return { success: false, error: error.message };
  }
}
