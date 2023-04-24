import _sfc_main$1 from './ContentDoc-1e5d313e.mjs';
import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { h as useRoute, p as useAsyncData, r as queryContent } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import 'ufo';
import './head-b030f6a1.mjs';
import './ContentRenderer-31636ced.mjs';
import './ContentRendererMarkdown-19dabe14.mjs';
import 'destr';
import 'scule';
import 'property-information';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
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
import './ContentQuery-334f2a49.mjs';

const _sfc_main = {
  __name: "[\u2026slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { path } = useRoute();
    const { data: article } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`content-${path}`, () => {
      return queryContent().where({ _path: path }).findOne();
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentDoc = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-4 gap-2" }, _attrs))}><div class="..."></div><div class="overflow-hidden col-span-3"><div class="relative max-w-7xl mx-auto py-16 m-6"><div class="mx-auto text-base max-w-prose lg:grid lg:gap-4 lg:max-w-none"><div><h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">${ssrInterpolate(unref(article).title)}</h3></div></div><div class="lg:mt-0"><article class="prose md:prose-md">`);
      _push(ssrRenderComponent(_component_ContentDoc, null, null, _parent));
      _push(`</article></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/legal/[\u2026slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
