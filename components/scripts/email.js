// Initialize EmailJS with your Public Key
emailjs.init("A8olTuRB06ukMNMNa"); // Replace with your EmailJS Public Key

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_5a3kvoe", "template_epn83bh", this)
        .then(() => {
            prompt("✅ Message sent successfully! Would you like to send another one?");
            this.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("❌ Failed to send message. Please try again.");
        });
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