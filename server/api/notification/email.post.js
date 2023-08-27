import nodemailer from 'nodemailer';

/**
 * This code is modeled for SendGrid and matches the SendGrid API request body.
 * The email body is HTML, and the template is fetched from a valid HTTP URL passed as input to the function.
 */

export default eventHandler(async (event) => {
  let template = ''; // Initialize the template variable outside the try block

  try {
    // Extract data from the request body
    const body = await readBody(event);
    const {
      from: { email: mail_from, name: mail_name },
      personalizations: [
        {
          to: [{ email: mail_to }],
          data: mail_data,
          subject: mail_subject,
        },
      ],
      template_id: mail_template_id,
    } = body;

    // Fetch the template
    const templateResponse = await $fetch(mail_template_id, {
      method: 'get',
      initialCache: true,
    });
   

    // Interpolate the template with the data
    function interpolate(template, data) {
      return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => data[key.trim()] || match);
    }

    const template_html = interpolate(templateResponse, mail_data);

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.NUXT_MAILER_USER}`,
        pass: `${process.env.NUXT_MAILER_PASS}`,
      },
      port: 587, // Specify the TLS/STARTTLS port
      secure: false, // Set to true if you want to use TLS
    });

    // Define email options
    const mailOptions = {
      from: `${mail_name} <${mail_from}>`,
      to: mail_to,
      subject: mail_subject,
      html: template_html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return {
      status: 'Success',
      message: 'Email sent successfully',
      code: 200,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      status: 'Failed',
      message: 'Error sending email',
      code: 500,
    };
  }
});
