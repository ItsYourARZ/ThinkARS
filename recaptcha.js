// Callback function when reCAPTCHA is solved
function verifyCallback(response) {
    console.log("reCAPTCHA verified with response:", response);

    // Enable the button after successful verification
    document.getElementById('submitButton').disabled = false;

    // Optionally send the response token to the server using AJAX
    // You can call your backend API here
}

// Example button click handling
document.getElementById('submitButton').addEventListener('click', () => {
    alert("Action allowed! reCAPTCHA passed.");
});

function sendToServer(token) {
    fetch('script.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recaptchaResponse: token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Server-side verification passed!");
        } else {
            alert("Server-side verification failed.");
        }
    })
    .catch(error => console.error("Error verifying reCAPTCHA:", error));
}