import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { withAsyncContext, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { h as useRoute, p as useAsyncData, r as queryContent, s as fetchContentNavigation, g as useContent } from '../server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { _ as _sfc_main$3 } from './ContentRendererMarkdown-19dabe14.mjs';
import 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
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
import 'property-information';

const _sfc_main$2 = {
  name: "toc",
  data() {
    return {};
  },
  props: {
    data: Array
  },
  methods: {},
  created() {
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h5 class="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">On this page</h5><ol role="list" class="mt-4 space-y-3 text-sm"><!--[-->`);
  ssrRenderList($props.data, (link) => {
    _push(`<li><h3><a${ssrRenderAttr("href", `#${link.id}`)} class="text-sky-500">${ssrInterpolate(link.text)}</a></h3>`);
    if (link.children) {
      _push(`<ol role="list" class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"><!--[-->`);
      ssrRenderList(link.children, (link2) => {
        _push(`<li><a${ssrRenderAttr("href", `#${link2.id}`)} class="hover:text-slate-600 dark:hover:text-slate-300">${ssrInterpolate(link2.text)}</a></li>`);
      });
      _push(`<!--]--></ol>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</li>`);
  });
  _push(`<!--]--></ol></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toc.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  name: "doc-nav",
  data() {
    return {};
  },
  props: {
    data: Array,
    title: String
  },
  methods: {},
  created() {
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h5 class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">${ssrInterpolate($props.title)}</h5><ul role="list" class="mt-2 space-y-2 border-l-2 border-gray-100 dark:border-gray-800 lg:mt-4 lg:space-y-4 lg:border-gray-200"><!--[-->`);
  ssrRenderList($props.data, (item) => {
    _push(`<li class="relative"><a${ssrRenderAttr("href", item._path)} class="${ssrRenderClass([{ "font-semibold text-sky-500 before:bg-sky-500": item._path === ("useRoute" in _ctx ? _ctx.useRoute : unref(useRoute))().path }, "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-trangray-y-1/2 before:rounded-full text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300"])}">${ssrInterpolate(item.title)}</a></li>`);
  });
  _push(`<!--]--></ul></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docnav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { path } = useRoute();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`content`, () => {
      return queryContent().where({ _path: path }).findOne();
    })), __temp = await __temp, __restore(), __temp);
    [__temp, __restore] = withAsyncContext(() => useAsyncData("navigation", () => {
      return fetchContentNavigation();
    })), __temp = await __temp, __restore();
    const {
      // Global references
      globals,
      navigation,
      surround,
      page,
      // Computed properties from `page` key
      excerpt,
      toc,
      type,
      layout,
      // Computed properties from `surround` key
      next,
      prev
    } = useContent();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_docnav = __nuxt_component_1;
      const _component_ContentRendererMarkdown = _sfc_main$3;
      const _component_Toc = __nuxt_component_3;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "public" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative mx-auto flex max-w-8xl justify-center sm:px-2"${_scopeId}><div class="hidden lg:relative lg:block lg:flex-none"${_scopeId}><div class="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden"${_scopeId}></div><div class="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block"${_scopeId}></div><div class="absolute top-28 bottom-0 right-0 hidden w-px bg-gray-800 dark:block"${_scopeId}></div><div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5"${_scopeId}><nav class="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_docnav, {
              data: unref(navigation)[1].children,
              title: unref(page).title
            }, null, _parent2, _scopeId));
            _push2(`</nav></div></div><div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16"${_scopeId}><article${_scopeId}><header class="mb-9 space-y-1"${_scopeId}><h1 class="font-display text-3xl tracking-tight text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(page).title)}</h1></header><div class=""${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ContentRendererMarkdown, { value: unref(data) }, null, _parent2, _scopeId));
            _push2(`</div></article><dl class="mt-12 flex border-t border-gray-200 pt-6 dark:border-gray-800"${_scopeId}><div${_scopeId}><dt class="font-display text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Previous</dt><dd class="mt-1"${_scopeId}><a class="text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"${ssrRenderAttr("href", unref(prev)._path)}${_scopeId}><span aria-hidden="true"${_scopeId}>\u2190</span> ${ssrInterpolate(unref(prev).title)}</a></dd></div><div class="ml-auto text-right"${_scopeId}><dt class="font-display text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Next</dt><dd class="mt-1"${_scopeId}><a class="text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"${ssrRenderAttr("href", unref(next)._path)}${_scopeId}>${ssrInterpolate(unref(next).title)} <span aria-hidden="true"${_scopeId}>\u2192</span></a></dd></div></dl></div><div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16"${_scopeId}><nav aria-labelledby="on-this-page-title" class="w-56"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Toc, {
              data: unref(toc).links
            }, null, _parent2, _scopeId));
            _push2(`</nav></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative mx-auto flex max-w-8xl justify-center sm:px-2" }, [
                createVNode("div", { class: "hidden lg:relative lg:block lg:flex-none" }, [
                  createVNode("div", { class: "absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden" }),
                  createVNode("div", { class: "absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block" }),
                  createVNode("div", { class: "absolute top-28 bottom-0 right-0 hidden w-px bg-gray-800 dark:block" }),
                  createVNode("div", { class: "sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5" }, [
                    createVNode("nav", { class: "text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16" }, [
                      createVNode(_component_docnav, {
                        data: unref(navigation)[1].children,
                        title: unref(page).title
                      }, null, 8, ["data", "title"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16" }, [
                  createVNode("article", null, [
                    createVNode("header", { class: "mb-9 space-y-1" }, [
                      createVNode("h1", { class: "font-display text-3xl tracking-tight text-gray-900 dark:text-white" }, toDisplayString(unref(page).title), 1)
                    ]),
                    createVNode("div", { class: "" }, [
                      createVNode(_component_ContentRendererMarkdown, { value: unref(data) }, null, 8, ["value"])
                    ])
                  ]),
                  createVNode("dl", { class: "mt-12 flex border-t border-gray-200 pt-6 dark:border-gray-800" }, [
                    createVNode("div", null, [
                      createVNode("dt", { class: "font-display text-sm font-medium text-gray-900 dark:text-white" }, "Previous"),
                      createVNode("dd", { class: "mt-1" }, [
                        createVNode("a", {
                          class: "text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
                          href: unref(prev)._path
                        }, [
                          createVNode("span", { "aria-hidden": "true" }, "\u2190"),
                          createTextVNode(" " + toDisplayString(unref(prev).title), 1)
                        ], 8, ["href"])
                      ])
                    ]),
                    createVNode("div", { class: "ml-auto text-right" }, [
                      createVNode("dt", { class: "font-display text-sm font-medium text-gray-900 dark:text-white" }, "Next"),
                      createVNode("dd", { class: "mt-1" }, [
                        createVNode("a", {
                          class: "text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
                          href: unref(next)._path
                        }, [
                          createTextVNode(toDisplayString(unref(next).title) + " ", 1),
                          createVNode("span", { "aria-hidden": "true" }, "\u2192")
                        ], 8, ["href"])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16" }, [
                  createVNode("nav", {
                    "aria-labelledby": "on-this-page-title",
                    class: "w-56"
                  }, [
                    createVNode(_component_Toc, {
                      data: unref(toc).links
                    }, null, 8, ["data"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/docs/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
