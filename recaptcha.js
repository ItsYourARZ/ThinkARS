/** document
  .getElementById("recaptcha-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

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
      } else {
        alert(`Verification failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while verifying reCAPTCHA.");
    }
  }); **/

  document.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.includes('captchaVerified=true')) {
        document.getElementById('captcha-container').innerHTML = 'Captcha already verified.';
    }
});

function verifyCaptcha(event) {
    event.preventDefault();
    const captchaResponse = grecaptcha.getResponse();
    if (captchaResponse) {
        fetch('/.netlify/functions/recaptcha-verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response: captchaResponse }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    document.cookie = 'captchaVerified=true; path=/; max-age=86400'; // 1 day
                    document.getElementById('captcha-container').innerHTML = 'Captcha verified!';
                } else {
                    alert('Captcha verification failed. Please try again.');
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                alert('Something went wrong. Please try again.');
            });
    } else {
        alert('Please complete the CAPTCHA.');
    }
}
