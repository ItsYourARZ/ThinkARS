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

    // Get the reCAPTCHA response
    const recaptchaResponse = grecaptcha.getResponse();

    console.log("Client reCAPTCHA Response:", recaptchaResponse);

    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/recaptcha-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaResponse }),
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

// Function called when reCAPTCHA succeeds
function onRecaptchaSuccess() {
  console.log("reCAPTCHA completed successfully.");
  document.getElementById("recaptcha-form").submit(); // Automatically submit the form
}
