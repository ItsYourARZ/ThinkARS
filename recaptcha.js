document.getElementById('recaptcha-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the reCAPTCHA response
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
        alert("Please complete the reCAPTCHA.");
        return;
    }

    try {
        // Send the reCAPTCHA response to the Netlify Function
        const response = await fetch('/.netlify/functions/recaptcha-verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recaptchaResponse }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(`Verification failed: ${result.message}`);
        }
    } catch (error) {
        alert("An error occurred while verifying reCAPTCHA.");
        console.error(error);
    }
});