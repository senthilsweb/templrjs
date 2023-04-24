import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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

const _sfc_main = {
  data() {
    return {
      pgHead: this.heading,
      pgGuide: this.guide,
      pgShowbutton: this.showbutton
    };
  },
  props: {
    heading: String,
    showbutton: String,
    guide: String,
    addClickEvent: String
  },
  methods: {
    created() {
    },
    beforeMount() {
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_2;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex"><div class="flex-1 flex justify-between px-2 sm:px-2"><div class="flex-1 min-w-0"><h2 class="text-lg leading-7 font-medium">${ssrInterpolate($data.pgHead)}</h2><div><p class="text-sm leading-5 text-gray-400">${ssrInterpolate($data.pgGuide)}</p></div></div></div>`);
  if ($data.pgShowbutton == "true") {
    _push(`<div class="ml-2 mt-2 pr-6 flex items-center space-x-4 sm:ml-6 sm:space-x-6"><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zyn_primary-500">`);
    _push(ssrRenderComponent(_component_Icon, {
      name: "icon-park-twotone:search",
      class: "h-6 w-6"
    }, null, _parent));
    _push(`</button><button type="button" class="zyn-button zyn-button-contrast">`);
    _push(ssrRenderComponent(_component_Icon, {
      name: "heroicons:plus-20-solid",
      class: "h-6 w-6 text-white"
    }, null, _parent));
    _push(` Add a Navigation </button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></header>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/navigation/NavigationPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NavigationPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { NavigationPageHeader as default };
