/*
This program uses sendgrid web api and requires the following
1. email domain setup
2. Sendgrid API Key
3. Sendgrid email template (template id.)
4. Request body with payload and other details

Refer https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates
*/
import lodash from 'lodash';
export default eventHandler(async (event) => {
  const body = await readBody(event);
  const template = await $fetch('https://gist.githubusercontent.com/zynomilabs/14becc809c0c9f4d53cc782c33d785b5/raw/eb0117b41feab006766d49543a097548b203835f/email-contact-us.html');

  //console.log(template);
  lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var compiled = lodash.template(template);
  var email_body = compiled(body.dynamic_template_data);
  body.email_data.content[0].value = email_body;
  const result = await $fetch('https://mailer.zynomi.workers.dev', {
    method: 'post',
    headers: {
      //Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: body.email_data,
  });

  return {
    status: 'Success',
    sendgrid_response: result,
    message: 'Email has been queued to be sent',
  };
});
