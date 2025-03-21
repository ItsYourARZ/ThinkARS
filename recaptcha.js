/** let recaptchaToken = null; // Store the reCAPTCHA token

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
  }); **/

  // Check if the user has already passed reCAPTCHA (cookie exists)
  window.onload = function () {
    const recaptchaVerified = getCookie('recaptcha_verified');
    if (recaptchaVerified) {
        // Show the message instead of the reCAPTCHA widget
        document.querySelector('.g-recaptcha').style.display = 'none'; // Hide the widget
        document.getElementById('recaptcha-message').style.display = 'block'; // Show the message
        console.log('User already verified via reCAPTCHA');
    }
};

// Callback function when reCAPTCHA is successfully completed
function onRecaptchaSuccess(response) {
    if (response) {
        // Set a cookie to remember that the user passed the reCAPTCHA
        setCookie('recaptcha_verified', 'true', 7); // 7 days expiration
        // Optionally, you can send the response to your Netlify function or server for verification
        verifyRecaptcha(response); // If you want to verify server-side as well
    }
}

// Function to send reCAPTCHA response to Netlify function for verification (optional)
async function verifyRecaptcha(recaptchaResponse) {
    try {
        const res = await fetch('/.netlify/functions/verify-recaptcha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recaptchaResponse })
        });

        const data = await res.json();
        if (data.success) {
            console.log('reCAPTCHA verified server-side!');
        } else {
            console.log('reCAPTCHA verification failed.');
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
    }
}

// Function to set a cookie
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiry time
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value by name
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// Function to delete a cookie (e.g., when the user decides to log out)
function deleteCookie(name) {
    setCookie(name, "", -1); // Set expiration to past date to delete the cookie
}