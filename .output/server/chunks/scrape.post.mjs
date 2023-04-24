import { r as readBody } from './nitro/node-server.mjs';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
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
const scrape_post = async (req, res) => {
  const body = await readBody(req);
  const profile_id = body.profile_id;
  const first = body.first;
  let posts = [];
  let base64 = "";
  let post, result, response = {};
  const url = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"' + profile_id + '","first":' + first + ',"after":null}';
  console.log(url);
  result = await $fetch(url, {
    "User- Agent": "Mozilla / 5.0(Macintosh; Intel Mac OS X 10_15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 90.0.4430.93 Safari / 537.36",
    initialCache: false
  });
  response.first = result.data.user.edge_owner_to_timeline_media.edges.length;
  response.total = result.data.user.edge_owner_to_timeline_media.count;
  for (let i = 0; i < response.first; i++) {
    async function getData() {
      const img = await fetch(result.data.user.edge_owner_to_timeline_media.edges[i].node.display_url).then((result2) => result2.arrayBuffer()).then((arrayBuffer) => Buffer.from(arrayBuffer)).then((buffer) => buffer.toString("base64"));
      return img;
    }
    base64 = await getData();
    post = {
      "id": i,
      "text": result.data.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text,
      "thumbnail_src": result.data.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_src,
      "display_url": result.data.user.edge_owner_to_timeline_media.edges[i].node.display_url,
      "shortcode": result.data.user.edge_owner_to_timeline_media.edges[i].node.shortcode,
      "base64": base64,
      "created_at": dayjs.unix(result.data.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp).format("DD-MMM-YYYY")
    };
    await supabase.from("instagram_posts").insert(post);
    posts.unshift(post);
  }
  const { data, error } = await supabase.from("instagram_posts").insert(posts);
  response.result = data;
  return response;
};

export { scrape_post as default };
