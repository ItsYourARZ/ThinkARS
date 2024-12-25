let recaptchaToken = null; // Store the reCAPTCHA token

// Function called when reCAPTCHA succeeds
function onRecaptchaSuccess(token) {
  console.log("reCAPTCHA completed successfully.");
  recaptchaToken = token; // Save the token for form submission
}

// Function called when reCAPTCHA token expires (hidden behavior)
function onRecaptchaExpired() {
  console.log("reCAPTCHA token expired.");
  recaptchaToken = null; // Clear the expired token

  // Reload reCAPTCHA widget without notifying the user
  grecaptcha.reset();  // Reset the widget to force the user to complete it again
}

// Form submission handler
document
  .getElementById("recaptcha-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Ensure reCAPTCHA library is loaded
    if (typeof grecaptcha === "undefined") {
      console.error("reCAPTCHA library not loaded.");
      alert("Failed to load reCAPTCHA. Please refresh the page.");
      return;
    }

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      // Send the reCAPTCHA token to your server for verification
      const response = await fetch("/.netlify/functions/recaptcha-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaResponse: recaptchaToken }),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert(result.message);
        document.getElementById("recaptcha-form").submit(); // Automatically submit the form
      } else {
        alert(`Verification failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while verifying reCAPTCHA.");
    }
  });
