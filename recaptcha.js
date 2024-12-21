document.getElementById("recaptchaButton").addEventListener("click", async () => {
  const resultElement = document.getElementById("result");

  try {
    // Execute reCAPTCHA
    const token = await grecaptcha.execute(siteKey, { action: "submit" });
    console.log("reCAPTCHA Token:", token); // Check if the token is generated correctly

    // Call the verification function
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
