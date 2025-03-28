fetch("/.netlify/functions/recaptcha-verify")
    .then(response => response.json())
    .then(data => {
      document.querySelector(".g-recaptcha").setAttribute("data-sitekey", data.siteKey);
    });