fetch("/.netlify/functions/getSiteKey")
    .then(response => response.json())
    .then(data => {
      document.querySelector(".g-recaptcha").setAttribute("data-sitekey", data.siteKey);
    });