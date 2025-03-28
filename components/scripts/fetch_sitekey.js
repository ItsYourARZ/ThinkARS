fetch("/.netlify/functions/verify-recaptcha")
.then(response => response.json())
.then(data => {
    document.getElementById("recaptcha-container").innerHTML = data.siteKey;
});