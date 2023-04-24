/*
This program uses sendgrid web api and requires the following
1. email domain setup
2. Sendgrid API Key
3. Sendgrid email template (template id.)
4. Request body with payload and other details

Refer https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates
*/
export default eventHandler(async (event) => {
  const body = await readBody(event);
  const result = await $fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: body,
  });

  return {
    status: 'Success',
    sendgrid_response: result,
    message: 'Email has been queued to be sent',
  };
});
