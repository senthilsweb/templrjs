import { e as eventHandler, r as readBody } from './nitro/node-server.mjs';
import lodash from 'lodash';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/cloudflare-kv-http';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'node:fs';
import 'node:url';
import 'pathe';
import '@octokit/graphql';
import 'remark-github';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';

const email = eventHandler(async (event) => {
  const body = await readBody(event);
  const template = await $fetch("https://gist.githubusercontent.com/zynomilabs/14becc809c0c9f4d53cc782c33d785b5/raw/eb0117b41feab006766d49543a097548b203835f/email-contact-us.html");
  lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var compiled = lodash.template(template);
  var email_body = compiled(body.dynamic_template_data);
  body.email_data.content[0].value = email_body;
  const result = await $fetch("https://mailer.zynomi.workers.dev", {
    method: "post",
    headers: {
      //Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: body.email_data
  });
  return {
    status: "Success",
    sendgrid_response: result,
    message: "Email has been queued to be sent"
  };
});

export { email as default };
