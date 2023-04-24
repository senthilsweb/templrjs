import __nuxt_component_0$1 from './Container-c39ca67d.mjs';
import __nuxt_component_1 from './DocsAside-14ade949.mjs';
import __nuxt_component_2 from './Alert-def351b5.mjs';
import __nuxt_component_1$1 from './ProseCodeInline-7380c63e.mjs';
import __nuxt_component_4 from './DocsPageBottom-2978540e.mjs';
import __nuxt_component_5 from './DocsPrevNext-8476f060.mjs';
import __nuxt_component_2$1 from './Icon-7255ab8c.mjs';
import __nuxt_component_7 from './DocsToc-903ccbdb.mjs';
import { g as useContent, h as useRoute, f as useState } from '../server.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, renderSlot, Fragment } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
import './DocsAsideTree-d44b48dc.mjs';
import './nuxt-link-fccebd7d.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './ContentSlot-51ed8bb6.mjs';
import './EditOnLink-673ff70a.mjs';
import './ProseA-3bfe7592.mjs';
import './DocsTocLinks-2f9a65ed.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocsPageLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useContent();
    const { config, tree } = useDocus();
    const route = useRoute();
    const fallbackValue = (value, fallback = true) => {
      var _a;
      if (typeof ((_a = page.value) == null ? void 0 : _a[value]) !== "undefined") {
        return page.value[value];
      }
      return fallback;
    };
    const hasBody = computed(() => {
      var _a, _b, _c;
      return !page.value || ((_c = (_b = (_a = page.value) == null ? void 0 : _a.body) == null ? void 0 : _b.children) == null ? void 0 : _c.length) > 0;
    });
    const hasToc = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_a = page.value) == null ? void 0 : _a.toc) !== false && ((_e = (_d = (_c = (_b = page.value) == null ? void 0 : _b.body) == null ? void 0 : _c.toc) == null ? void 0 : _d.links) == null ? void 0 : _e.length) >= 2;
    });
    const hasAside = computed(() => {
      var _a, _b, _c, _d, _e;
      return ((_a = page.value) == null ? void 0 : _a.aside) !== false && (((_b = tree.value) == null ? void 0 : _b.length) > 1 || ((_e = (_d = (_c = tree.value) == null ? void 0 : _c[0]) == null ? void 0 : _d.children) == null ? void 0 : _e.length));
    });
    const bottom = computed(() => fallbackValue("bottom", true));
    const isOpen = ref(false);
    const asideNav = ref(null);
    const getParentPath = () => route.path.split("/").slice(0, 2).join("/");
    useState("asideScroll", () => {
      var _a;
      return {
        parentPath: getParentPath(),
        scrollTop: ((_a = asideNav.value) == null ? void 0 : _a.scrollTop) || 0
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_Container = __nuxt_component_0$1;
      const _component_DocsAside = __nuxt_component_1;
      const _component_Alert = __nuxt_component_2;
      const _component_ProseCodeInline = __nuxt_component_1$1;
      const _component_DocsPageBottom = __nuxt_component_4;
      const _component_DocsPrevNext = __nuxt_component_5;
      const _component_Icon = __nuxt_component_2$1;
      const _component_DocsToc = __nuxt_component_7;
      _push(ssrRenderComponent(_component_Container, mergeProps({
        fluid: (_b = (_a = unref(config)) == null ? void 0 : _a.main) == null ? void 0 : _b.fluid,
        padded: (_d = (_c = unref(config)) == null ? void 0 : _c.main) == null ? void 0 : _d.padded,
        class: ["docs-page-content", {
          fluid: (_f = (_e = unref(config)) == null ? void 0 : _e.main) == null ? void 0 : _f.fluid,
          "has-toc": unref(hasToc),
          "has-aside": unref(hasAside)
        }]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(hasAside)) {
              _push2(`<aside class="aside-nav" data-v-fa18c501${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DocsAside, { class: "app-aside" }, null, _parent2, _scopeId));
              _push2(`</aside>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<article class="page-body" data-v-fa18c501${_scopeId}>`);
            if (unref(hasBody)) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_component_Alert, { type: "info" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Start writing in `);
                    _push3(ssrRenderComponent(_component_ProseCodeInline, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`content/${ssrInterpolate(unref(page)._file)}`);
                        } else {
                          return [
                            createTextVNode("content/" + toDisplayString(unref(page)._file), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` to see this page taking shape. `);
                  } else {
                    return [
                      createTextVNode(" Start writing in "),
                      createVNode(_component_ProseCodeInline, null, {
                        default: withCtx(() => [
                          createTextVNode("content/" + toDisplayString(unref(page)._file), 1)
                        ]),
                        _: 1
                      }),
                      createTextVNode(" to see this page taking shape. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            if (unref(hasBody) && unref(page) && unref(bottom)) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_DocsPageBottom, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_DocsPrevNext, null, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</article>`);
            if (unref(hasToc)) {
              _push2(`<div class="toc" data-v-fa18c501${_scopeId}><div class="toc-wrapper" data-v-fa18c501${_scopeId}><button data-v-fa18c501${_scopeId}><span class="title" data-v-fa18c501${_scopeId}>Table of Contents</span>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons-outline:chevron-right",
                class: ["icon", [unref(isOpen) && "rotate"]]
              }, null, _parent2, _scopeId));
              _push2(`</button><div class="${ssrRenderClass([[unref(isOpen) && "opened"], "docs-toc-wrapper"])}" data-v-fa18c501${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DocsToc, {
                onMove: ($event) => isOpen.value = false
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(hasAside) ? (openBlock(), createBlock("aside", {
                key: 0,
                ref_key: "asideNav",
                ref: asideNav,
                class: "aside-nav"
              }, [
                createVNode(_component_DocsAside, { class: "app-aside" })
              ], 512)) : createCommentVNode("", true),
              createVNode("article", { class: "page-body" }, [
                unref(hasBody) ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createBlock(_component_Alert, {
                  key: 1,
                  type: "info"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Start writing in "),
                    createVNode(_component_ProseCodeInline, null, {
                      default: withCtx(() => [
                        createTextVNode("content/" + toDisplayString(unref(page)._file), 1)
                      ]),
                      _: 1
                    }),
                    createTextVNode(" to see this page taking shape. ")
                  ]),
                  _: 1
                })),
                unref(hasBody) && unref(page) && unref(bottom) ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                  createVNode(_component_DocsPageBottom),
                  createVNode(_component_DocsPrevNext)
                ], 64)) : createCommentVNode("", true)
              ]),
              unref(hasToc) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "toc"
              }, [
                createVNode("div", { class: "toc-wrapper" }, [
                  createVNode("button", {
                    onClick: ($event) => isOpen.value = !unref(isOpen)
                  }, [
                    createVNode("span", { class: "title" }, "Table of Contents"),
                    createVNode(_component_Icon, {
                      name: "heroicons-outline:chevron-right",
                      class: ["icon", [unref(isOpen) && "rotate"]]
                    }, null, 8, ["class"])
                  ], 8, ["onClick"]),
                  createVNode("div", {
                    class: ["docs-toc-wrapper", [unref(isOpen) && "opened"]]
                  }, [
                    createVNode(_component_DocsToc, {
                      onMove: ($event) => isOpen.value = false
                    }, null, 8, ["onMove"])
                  ], 2)
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa18c501"]]);

export { __nuxt_component_0 as default };
