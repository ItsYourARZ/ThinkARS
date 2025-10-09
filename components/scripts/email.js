emailjs.init("A8olTuRB06ukMNMNa");
var formSent = false;

  document.getElementById("contact-form").addEventListener("input", () => {
    const form = document.getElementById("contact-form");
    if (form.checkValidity() && !formSent) {
        formSent = true;
        setTimeout(() => { 
            const formData = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };

            emailjs.send("service_5a3kvoe", "template_epn83bh", formData)
            .then(() => {
                alert("Message sent successfully!");
                form.reset();
                formSent = false;
            })
            .catch((err) => {
                console.error("Failed to send message:", err);
                formSent = false;
            });
        }, 5000);
    }
  });