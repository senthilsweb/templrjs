import { _ as __nuxt_component_1 } from './client-only-7e9de0b5.mjs';
import { j as componentName } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, unref, openBlock, createBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { u as useColorMode } from './composables-1193a3b3.mjs';
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

const _sfc_main$1 = {
  name: componentName,
  props: {
    placeholder: String,
    tag: {
      type: String,
      default: "span"
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = __nuxt_component_1;
  _push(ssrRenderComponent(_component_ClientOnly, mergeProps({
    placeholder: $props.placeholder,
    "placeholder-tag": $props.tag
  }, _attrs), {}, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThemeSelect",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ColorScheme = __nuxt_component_0;
      const _component_Icon = __nuxt_component_2;
      _push(`<button${ssrRenderAttrs(mergeProps({ "aria-label": "Color Mode" }, _attrs))} data-v-4a6c39b0>`);
      _push(ssrRenderComponent(_component_ColorScheme, { placeholder: "..." }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(colorMode).preference === "dark") {
              _push2(ssrRenderComponent(_component_Icon, { name: "uil:moon" }, null, _parent2, _scopeId));
            } else if (unref(colorMode).preference === "light") {
              _push2(ssrRenderComponent(_component_Icon, { name: "uil:sun" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, { name: "uil:desktop" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(colorMode).preference === "dark" ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "uil:moon"
              })) : unref(colorMode).preference === "light" ? (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "uil:sun"
              })) : (openBlock(), createBlock(_component_Icon, {
                key: 2,
                name: "uil:desktop"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a6c39b0"]]);

export { __nuxt_component_5 as default };
