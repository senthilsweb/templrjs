import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import ContentSlot from './ContentSlot-51ed8bb6.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_ContentSlot = ContentSlot;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-ba21ed10>`);
      if (__props.icon) {
        _push(ssrRenderComponent(_component_Icon, { name: __props.icon }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div data-v-ba21ed10><h3 class="title" data-v-ba21ed10>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.title,
        unwrap: "p"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Card title `);
          } else {
            return [
              createTextVNode(" Card title ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="description" data-v-ba21ed10>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.description,
        unwrap: "p"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Card description `);
          } else {
            return [
              createTextVNode(" Card description ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/landing/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba21ed10"]]);

export { Card as default };
