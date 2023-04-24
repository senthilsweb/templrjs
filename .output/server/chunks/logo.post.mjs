import { e as eventHandler, r as readBody } from './nitro/node-server.mjs';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
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

const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);
const logo_post = eventHandler(async (event) => {
  const body = await readBody(event);
  const fileData = body.fileData;
  const fileName = body.fileName;
  const code = body.code;
  let logo_url = "";
  const { data, error } = await supabase.storage.from("logo").upload(fileName, decode(fileData), {
    contentType: "image/png",
    upsert: true
  });
  if (error) {
    return { status: error.statusCode, message: error.message, stack_trace: error };
  } else {
    logo_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
    const { db_data, db_error } = await supabase.from("properties").update({
      logo_url
    }).eq("code", code);
    if (db_error) {
      return { status: db_error.statusCode, message: db_error.message, stack_trace: db_error };
    }
  }
  return { status: 200, message: "File uploaded", logo_url };
});

export { logo_post as default };
