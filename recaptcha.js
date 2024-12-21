// Check if the user has already verified reCAPTCHA
if (localStorage.getItem("recaptchaVerified") === "true") {
  document.getElementById("recaptcha-container").style.display = "none";
  document.getElementById("message").textContent = "You're verified!";
}

// Function triggered when reCAPTCHA is solved
function onRecaptchaSuccess(token) {
  fetch("/.netlify/functions/verify-recaptcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("recaptchaVerified", "true");
        document.getElementById("recaptcha-container").style.display = "none";
        document.getElementById("message").textContent = "You're verified!";
      } else {
        document.getElementById("message").textContent =
          "Verification failed. Please try again.";
      }
    });
}