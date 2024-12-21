const siteKey = "6LdDOqIqAAAAAL4mV96yLBJLrVGkKP1rFuYYTapZ"; // Replace with your Site Key

    document.getElementById("verifyButton").addEventListener("click", async () => {
      const resultElement = document.getElementById("result");

      try {
        // Execute reCAPTCHA
        const token = await grecaptcha.execute(siteKey, { action: "verify" });
        console.log("reCAPTCHA Token:", token);

        // Send token to serverless function
        const response = await fetch("/.netlify/functions/recaptcha-verify.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          resultElement.textContent = `Verification successful! Score: ${result.score}`;
        } else {
          resultElement.textContent = `Verification failed: ${result.error}`;
        }
      } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        resultElement.textContent = "An error occurred while verifying.";
      }
    });