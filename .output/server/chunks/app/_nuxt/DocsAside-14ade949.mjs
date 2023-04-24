import __nuxt_component_0 from './DocsAsideTree-d44b48dc.mjs';
import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocsAside",
  __ssrInlineRender: true,
  setup(__props) {
    const { tree } = useDocus();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_DocsAsideTree = __nuxt_component_0;
      const _component_NuxtLink = NuxtLink;
      const _component_Icon = __nuxt_component_2;
      _push(`<nav${ssrRenderAttrs(_attrs)} data-v-4fc52927>`);
      if (((_a = unref(tree)) == null ? void 0 : _a.length) > 0) {
        _push(ssrRenderComponent(_component_DocsAsideTree, { links: unref(tree) }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "go-back-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons-outline:arrow-left",
                class: "icon"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text" data-v-4fc52927${_scopeId}>Go back</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons-outline:arrow-left",
                  class: "icon"
                }),
                createVNode("span", { class: "text" }, "Go back")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4fc52927"]]);

export { __nuxt_component_1 as default };
