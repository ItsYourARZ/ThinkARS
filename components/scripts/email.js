// Initialize EmailJS with your Public Key
emailjs.init("A8olTuRB06ukMNMNa"); // Replace with your EmailJS Public Key
var formSent = false;

// Automatically send the form when completed

  document.getElementById("contact-form").addEventListener("input", () => {
    const form = document.getElementById("contact-form");
    if (form.checkValidity() && !formSent) { // Ensure it sends only once
        formSent = true;
        setTimeout(() => { // Wait 5 seconds before sending
            const formData = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };

            emailjs.send("service_5a3kvoe", "template_epn83bh", formData)
            .then(() => {
                alert("Message sent successfully!");
                form.reset(); // Clear the form after sending
                formSent = false; // Reset to allow another submission
            })
            .catch((err) => {
                console.error("Failed to send message:", err);
                formSent = false; // Reset on error
            });
        }, 5000);
    }
  });

/**
 * <!-- The Touch Section -->
    <div class="section fade-in" aria-labelledby="song">
      <h2 id="touch"><span class="highme"><a onclick="toggleInfoforTouch(this)">Get in touch!</a></span></h2>
      <div class="hidden-info">
        <form id="contact-form">
            <div class="input-box">
                <input type="text" required>
                <label>Name</label>
            </div>

            <div class="input-box">
              <input type="email" required>
              <label>Email</label>
            </div>

            <div class="input-box">
              <textarea required></textarea>
              <label>Message</label>
            </div>

            <button type="submit" class="form">Send</button>

        </form>
      </div>
    </div>

    <form id="contact-form">
        <h2>Contact Me</h2>
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
    </form>

 */