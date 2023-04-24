import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import '../server.mjs';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  __name: "UsersPageHeader",
  __ssrInlineRender: true,
  props: ["heading", "showbutton", "guide", "addClickEvent", "searchClickEvent"],
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_icon = __nuxt_component_2;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex"><div class="flex-1 flex justify-between px-2 sm:px-2"><div class="flex-1 min-w-0"><h2 class="text-lg leading-7 font-medium">${ssrInterpolate(props.heading)}</h2><div><p class="text-sm leading-5 text-gray-400">${ssrInterpolate(props.guide)}</p></div></div>`);
      if (props.showbutton == "true") {
        _push(`<div class="ml-2 mt-2 pr-6 flex items-center space-x-4 sm:ml-6 sm:space-x-6"><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button><button type="button" class="zyn-button gap-x-2">`);
        _push(ssrRenderComponent(_component_icon, {
          name: "ph:user-plus-bold",
          class: "h-6 w-6 text-white flex-shrink-0"
        }, null, _parent));
        _push(` User Sign Up </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></header>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organization/users/UsersPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
