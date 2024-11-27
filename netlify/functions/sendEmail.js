const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-dummy-email@gmail.com',
        pass: 'your-app-password',
      },
    });

    // Email to User
    await transporter.sendMail({
      from: 'your-dummy-email@gmail.com',
      to: email,
      subject: `Thank you, ${name}!`,
      text: `We have received your message: "${message}"`,
    });

    // Email to Admin
    await transporter.sendMail({
      from: 'your-dummy-email@gmail.com',
      to: 'your-admin-email@gmail.com',
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending emails' }),
    };
  }
};
