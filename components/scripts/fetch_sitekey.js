fetch("/.netlify/functions/verify-recaptcha")
.then(response => response.json())
.then(data => {
    document.getElementById("recaptcha-container").innerHTML = 
        `<div class="g-recaptcha" data-sitekey="${data.siteKey}" data-callback="onRecaptchaSuccess"></div>`;
});