import { e as eventHandler, g as getQuery } from './nitro/node-server.mjs';
import { createClient } from '@supabase/supabase-js';
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

createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);
const index_get = eventHandler(async (event) => {
  const query = getQuery(event);
  var query_string = [];
  lodash.forEach(query, function(value, key) {
    query_string.push(key + "=" + value);
  });
  const data = await $fetch(`${process.env.SUPABASE_URL}/rest/v1/inquiries?${lodash.join(query_string, "&")}`, {
    method: "get",
    headers: {
      apikey: `${process.env.SUPABASE_KEY}`,
      "prefer": event.node.req.headers["prefer"] ? event.node.req.headers["prefer"] : "",
      "range": event.node.req.headers["range"] ? event.node.req.headers["range"] : ""
    }
  });
  return data;
});

export { index_get as default };
