import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
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

const image2base64_post = defineEventHandler(
  async (event) => {
    const body = await readBody(event);
    const image_url = body.image_url;
    let res_message = "";
    console.log("body", JSON.stringify(body));
    if (image_url == void 0 || image_url == "") {
      res_message = "Image URI path is invalid or missing";
    }
    if (res_message != "") {
      return {
        status: "Failure",
        message: res_message
      };
    }
    try {
      const image_buffer = await fetch(image_url).then((res) => res.arrayBuffer());
      var binary = "";
      var bytes = new Uint8Array(image_buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } catch (e) {
      event.res.statusCode = 500;
      return {
        status: "Failure",
        exception: e.message,
        message: `Please check the image_buffer path is correct and it is accessible over the wire or check for any missing fields in the payload`
      };
    }
  }
);

export { image2base64_post as default };
