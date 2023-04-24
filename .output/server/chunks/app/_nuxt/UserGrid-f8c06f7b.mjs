import { ref, withAsyncContext, mergeProps, useSSRContext } from 'vue';
import { p as useAsyncData } from '../server.mjs';
import { ssrRenderAttrs } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
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
import 'nanoid';
import '@supabase/supabase-js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'mitt';
import 'vue-i18n';
import 'underscore.string';
import 'lodash-es';

const __default__ = {
  components: {},
  data() {
    return {
      data: []
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "UserGrid",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    ref();
    ref([]);
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      "Users-list-" + Math.random,
      () => $fetch("/api/users", {
        initialCache: false,
        method: "post",
        body: {
          projection: {
            last_name: 1,
            first_name: 1,
            email: 1,
            mobile_phone: 1,
            hand_phone: 1,
            subscription: 1,
            roles: 1
          },
          filter: {},
          limit: 500
        }
      }),
      "$LJE3P3MjaA"
    )), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 sm:px-4 lg:px-4" }, _attrs))}><div class="sm:flex sm:items-center"></div><div class="mt-2 flex flex-col"><div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"><div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/management/users/UserGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
