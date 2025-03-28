fetch('https://thinkars.netlify.app/.netlify/functions/recaptcha-verify')
    .then(response => response.json())
    .then(data => {
        document.getElementById("siteKey").innerHTML = data.siteKey;
    })
    .catch(error => console.error("Error fetching JSON:", error));
