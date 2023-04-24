import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import _sfc_main$1 from './EditOnLink-673ff70a.mjs';
import __nuxt_component_2$1 from './ProseA-3bfe7592.mjs';
import { g as useContent } from '../server.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, unref, mergeProps, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocsPageBottom",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useContent();
    const { config } = useDocus();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Icon = __nuxt_component_2;
      const _component_EditOnLink = _sfc_main$1;
      const _component_ProseA = __nuxt_component_2$1;
      if (unref(page)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "docs-page-bottom" }, _attrs))} data-v-c70c0152>`);
        if ((_b = (_a = unref(config)) == null ? void 0 : _a.github) == null ? void 0 : _b.edit) {
          _push(`<div class="edit-link" data-v-c70c0152>`);
          _push(ssrRenderComponent(_component_Icon, { name: "uil:edit" }, null, _parent));
          _push(ssrRenderComponent(_component_EditOnLink, { page: unref(page) }, {
            default: withCtx(({ url }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_ProseA, { to: url }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-c70c0152${_scopeId2}> Edit this page on GitHub </span>`);
                    } else {
                      return [
                        createVNode("span", null, " Edit this page on GitHub ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_ProseA, { to: url }, {
                    default: withCtx(() => [
                      createVNode("span", null, " Edit this page on GitHub ")
                    ]),
                    _: 2
                  }, 1032, ["to"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_c = unref(page)) == null ? void 0 : _c.mtime) {
          _push(`<span data-v-c70c0152>Updated on <b data-v-c70c0152>${ssrInterpolate(new Intl.DateTimeFormat("en-US").format(Date.parse(unref(page).mtime)))}</b></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c70c0152"]]);

export { __nuxt_component_4 as default };
