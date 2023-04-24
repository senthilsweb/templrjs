import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import __nuxt_component_6 from './AppSocialIcons-7f7e643f.mjs';
import __nuxt_component_0 from './DocsAsideTree-d44b48dc.mjs';
import { g as useContent, d as useNuxtApp } from '../server.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, computed, watch, unref } from 'vue';
import { ssrRenderComponent, ssrRenderTeleport } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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
import './nuxt-link-fccebd7d.mjs';

const useMenu = () => {
  const { $menu } = useNuxtApp();
  return $menu;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeaderDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const { navigation } = useContent();
    const { config } = useDocus();
    const filtered = computed(() => {
      var _a;
      return ((_a = config.value.aside) == null ? void 0 : _a.exclude) || [];
    });
    const links = computed(() => {
      return (navigation.value || []).filter((item) => {
        if (filtered.value.includes(item._path)) {
          return false;
        }
        return true;
      });
    });
    const { visible, open, close } = useMenu();
    watch(visible, (v) => v ? open() : close());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_AppSocialIcons = __nuxt_component_6;
      const _component_DocsAsideTree = __nuxt_component_0;
      _push(`<!--[--><button aria-label="Menu" data-v-291983a4>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons-outline:menu",
        "aria-hidden": "\u201Dtrue\u201D"
      }, null, _parent));
      _push(`</button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(visible)) {
          _push2(`<nav class="dialog" data-v-291983a4><div data-v-291983a4><div class="wrapper" data-v-291983a4><button aria-label="Menu" data-v-291983a4>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons-outline:x",
            "aria-hidden": "\u201Dtrue\u201D"
          }, null, _parent));
          _push2(`</button><div class="icons" data-v-291983a4>`);
          _push2(ssrRenderComponent(_component_AppSocialIcons, null, null, _parent));
          _push2(`</div></div>`);
          _push2(ssrRenderComponent(_component_DocsAsideTree, { links: unref(links) }, null, _parent));
          _push2(`</div></nav>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-291983a4"]]);

export { __nuxt_component_1 as default };
