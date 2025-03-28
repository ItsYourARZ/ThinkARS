fetch("/.netlify/functions/recaptcha-verify")
.then(response => response.json())
.then(data => {
    document.getElementById("recaptcha-container").innerHTML = data.siteKey;
});