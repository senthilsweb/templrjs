import { e as eventHandler, g as getQuery, r as readBody } from './nitro/node-server.mjs';
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

const _id__put = eventHandler(async (event) => {
  getQuery(event);
  const { id } = event.context.params;
  const body = await readBody(event);
  const recordset = await $fetch(`${process.env.MONGODB_ATLAS_REST_URL}/updateOne`, {
    method: "post",
    headers: {
      "api-key": `${process.env.MONGODB_ATLAS_REST_TOKEN}`
    },
    body: {
      collection: "configurations",
      database: `${process.env.MONGODB_ATLAS_DATABASE}`,
      dataSource: `${process.env.MONGODB_ATLAS_DATASOURCE}`,
      filter: {
        _id: {
          $oid: id
        }
      },
      update: {
        $set: body
      }
    }
  });
  return recordset;
});

export { _id__put as default };
