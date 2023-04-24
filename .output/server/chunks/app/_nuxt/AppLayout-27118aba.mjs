import _sfc_main$1 from './AppLoadingBar-094105ed.mjs';
import __nuxt_component_1 from './AppHeader-49197120.mjs';
import __nuxt_component_2 from './AppFooter-f500e53e.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { k as useHead } from '../server.mjs';
import { useSSRContext, defineComponent, watch, mergeProps } from 'vue';
import { u as useContentHead } from './head-b030f6a1.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import './Container-c39ca67d.mjs';
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
import './AppHeaderDialog-2bccc5d0.mjs';
import './Icon-7255ab8c.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './AppSocialIcons-7f7e643f.mjs';
import './nuxt-link-fccebd7d.mjs';
import './DocsAsideTree-d44b48dc.mjs';
import './AppHeaderLogo-a47208ff.mjs';
import './Logo-cce25469.mjs';
import './AppHeaderNavigation-2f3ce41f.mjs';
import './AppSearch-594ba01e.mjs';
import './ThemeSelect-410f73c4.mjs';
import './client-only-7e9de0b5.mjs';
import './composables-1193a3b3.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { config } = useDocus();
    useHead({
      titleTemplate: config.value.titleTemplate,
      meta: [
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    watch(
      () => config.value.titleTemplate,
      () => useHead({ titleTemplate: config.value.titleTemplate })
    );
    useContentHead(config.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLoadingBar = _sfc_main$1;
      const _component_AppHeader = __nuxt_component_1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-5c2f7786>`);
      _push(ssrRenderComponent(_component_AppLoadingBar, null, null, _parent));
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main data-v-5c2f7786>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c2f7786"]]);

export { AppLayout as default };
