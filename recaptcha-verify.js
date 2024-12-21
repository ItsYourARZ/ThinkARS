async function verifyRecaptchaToken(token) {
    try {
      const response = await fetch("/.netlify/functions/validate-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error verifying reCAPTCHA token:", error);
      return { success: false, error: error.message };
    }
  }
  