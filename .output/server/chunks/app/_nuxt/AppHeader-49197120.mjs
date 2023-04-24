import __nuxt_component_0 from './Container-c39ca67d.mjs';
import __nuxt_component_1$1 from './AppHeaderDialog-2bccc5d0.mjs';
import __nuxt_component_2 from './AppHeaderLogo-a47208ff.mjs';
import __nuxt_component_3 from './AppHeaderNavigation-2f3ce41f.mjs';
import { u as useDocSearch, _ as __nuxt_component_4 } from './AppSearch-594ba01e.mjs';
import __nuxt_component_5 from './ThemeSelect-410f73c4.mjs';
import __nuxt_component_6 from './AppSocialIcons-7f7e643f.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { g as useContent } from '../server.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import './Icon-7255ab8c.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './DocsAsideTree-d44b48dc.mjs';
import './nuxt-link-fccebd7d.mjs';
import './Logo-cce25469.mjs';
import './client-only-7e9de0b5.mjs';
import './composables-1193a3b3.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  props: {},
  setup(__props) {
    const { config } = useDocus();
    const { navigation } = useContent();
    const { hasDocSearch } = useDocSearch();
    const hasDialog = computed(() => {
      var _a, _b, _c, _d;
      return ((_a = navigation.value) == null ? void 0 : _a.length) > 1 || ((_d = (_c = (_b = navigation.value) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) == null ? void 0 : _d.length);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Container = __nuxt_component_0;
      const _component_AppHeaderDialog = __nuxt_component_1$1;
      const _component_AppHeaderLogo = __nuxt_component_2;
      const _component_AppHeaderNavigation = __nuxt_component_3;
      const _component_AppSearch = __nuxt_component_4;
      const _component_ThemeSelect = __nuxt_component_5;
      const _component_AppSocialIcons = __nuxt_component_6;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: { "has-dialog": unref(hasDialog), "has-doc-search": unref(hasDocSearch) }
      }, _attrs))} data-v-6d394510>`);
      _push(ssrRenderComponent(_component_Container, {
        fluid: (_b = (_a = unref(config)) == null ? void 0 : _a.header) == null ? void 0 : _b.fluid
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="section left" data-v-6d394510${_scopeId}>`);
            if (unref(hasDialog)) {
              _push2(ssrRenderComponent(_component_AppHeaderDialog, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppHeaderLogo, null, null, _parent2, _scopeId));
            _push2(`</div><div class="section center" data-v-6d394510${_scopeId}>`);
            if (unref(hasDialog)) {
              _push2(ssrRenderComponent(_component_AppHeaderLogo, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppHeaderNavigation, null, null, _parent2, _scopeId));
            _push2(`</div><div class="section right" data-v-6d394510${_scopeId}>`);
            if (unref(hasDocSearch)) {
              _push2(ssrRenderComponent(_component_AppSearch, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_ThemeSelect, null, null, _parent2, _scopeId));
            _push2(`<div class="social-icons" data-v-6d394510${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppSocialIcons, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "section left" }, [
                unref(hasDialog) ? (openBlock(), createBlock(_component_AppHeaderDialog, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_AppHeaderLogo)
              ]),
              createVNode("div", { class: "section center" }, [
                unref(hasDialog) ? (openBlock(), createBlock(_component_AppHeaderLogo, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_AppHeaderNavigation)
              ]),
              createVNode("div", { class: "section right" }, [
                unref(hasDocSearch) ? (openBlock(), createBlock(_component_AppSearch, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_ThemeSelect),
                createVNode("div", { class: "social-icons" }, [
                  createVNode(_component_AppSocialIcons)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d394510"]]);

export { __nuxt_component_1 as default };
