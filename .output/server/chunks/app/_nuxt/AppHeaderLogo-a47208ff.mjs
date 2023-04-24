import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import __nuxt_component_1 from './Logo-cce25469.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'ufo';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeaderLogo",
  __ssrInlineRender: true,
  setup(__props) {
    const { config } = useDocus();
    const logo = computed(() => {
      var _a;
      return ((_a = config.value.header) == null ? void 0 : _a.logo) || false;
    });
    const title = computed(() => {
      var _a;
      return ((_a = config.value.header) == null ? void 0 : _a.title) || config.value.title;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = NuxtLink;
      const _component_Logo = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "navbar-logo",
        to: "/",
        "aria-label": unref(title)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(logo) && typeof unref(logo) === "string") {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(logo)), null, null), _parent2, _scopeId);
            } else if (unref(logo)) {
              _push2(ssrRenderComponent(_component_Logo, null, null, _parent2, _scopeId));
            } else {
              _push2(`<span data-v-0e437bbb${_scopeId}>${ssrInterpolate(unref(title))}</span>`);
            }
          } else {
            return [
              unref(logo) && typeof unref(logo) === "string" ? (openBlock(), createBlock(resolveDynamicComponent(unref(logo)), { key: 0 })) : unref(logo) ? (openBlock(), createBlock(_component_Logo, { key: 1 })) : (openBlock(), createBlock("span", { key: 2 }, toDisplayString(unref(title)), 1))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e437bbb"]]);

export { __nuxt_component_2 as default };
