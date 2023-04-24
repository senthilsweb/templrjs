import { d as defineEventHandler, r as readBody, s as sendStream } from './nitro/node-server.mjs';
import { createReport } from 'docx-templates';
import { Readable } from 'stream';
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

const word_post = defineEventHandler(
  async (event) => {
    const body = await readBody(event);
    const file_name = body.file_name;
    const template_path = body.template_path;
    let res_message = "";
    if (file_name == void 0 || file_name == "") {
      res_message = "Filename is invalid or missing";
    }
    if (template_path == void 0 || template_path == "") {
      res_message = "Template path is invalid or missing";
    }
    if (res_message != "") {
      return {
        status: "Failure",
        message: res_message
      };
    }
    try {
      const template = await fetch(template_path).then((res) => res.arrayBuffer());
      const buffer = await createReport({
        template,
        data: body.payload
      });
      var stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      event.res.setHeader("Content-Disposition", "attachment; filename=" + file_name);
      return sendStream(event, stream);
    } catch (e) {
      event.res.statusCode = 500;
      return {
        status: "Failure",
        exception: e.message,
        message: `Please check the template path is correct and it is accessible over the wire or check for any missing fields in the payload`
      };
    }
  }
);

export { word_post as default };
