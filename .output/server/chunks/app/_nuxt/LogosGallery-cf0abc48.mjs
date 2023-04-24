import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { p as useAsyncData, l as useRuntimeConfig } from '../server.mjs';
import { withAsyncContext, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "LogosGallery",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const bucket = "brand-assets";
    const { data: gallery } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "storage-list-" + Math.random,
      () => $fetch("/api/storage/" + bucket, {
        initialCache: false,
        method: "get"
      }),
      "$gCTl88aEET"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col min-w-0 flex-1 overflow-hidden"${_scopeId}><div class="flex-1 relative z-0 flex overflow-hidden"${_scopeId}><main class="flex-1 overflow-y-auto"${_scopeId}><div class="mx-auto max-w-8xl px-4 pt-8 sm:px-6 lg:px-8"${_scopeId}><section class="mt-8 pb-16" aria-labelledby="gallery-heading"${_scopeId}><h2 id="gallery-heading" class="sr-only"${_scopeId}>Photo Gallery</h2><ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"${_scopeId}><!--[-->`);
            ssrRenderList(unref(gallery), (file) => {
              _push2(`<li class="relative"${_scopeId}><div class="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", `${("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.SUPABASE_STORAGE_URL}/${bucket}/${file.name}`)} alt="" class="group-hover:opacity-75 object-cover pointer-events-none"${_scopeId}></div><p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(file.name)}</p><p class="pointer-events-none block text-sm font-medium text-gray-500"${_scopeId}>${ssrInterpolate(file.metadata.size)}</p></li>`);
            });
            _push2(`<!--]--></ul></section></div></main></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col min-w-0 flex-1 overflow-hidden" }, [
                createVNode("div", { class: "flex-1 relative z-0 flex overflow-hidden" }, [
                  createVNode("main", { class: "flex-1 overflow-y-auto" }, [
                    createVNode("div", { class: "mx-auto max-w-8xl px-4 pt-8 sm:px-6 lg:px-8" }, [
                      createVNode("section", {
                        class: "mt-8 pb-16",
                        "aria-labelledby": "gallery-heading"
                      }, [
                        createVNode("h2", {
                          id: "gallery-heading",
                          class: "sr-only"
                        }, "Photo Gallery"),
                        createVNode("ul", {
                          role: "list",
                          class: "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(gallery), (file) => {
                            return openBlock(), createBlock("li", {
                              key: file.name,
                              class: "relative"
                            }, [
                              createVNode("div", { class: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden" }, [
                                createVNode("img", {
                                  src: `${("useRuntimeConfig" in _ctx ? _ctx.useRuntimeConfig : unref(useRuntimeConfig))().public.SUPABASE_STORAGE_URL}/${bucket}/${file.name}`,
                                  alt: "",
                                  class: "group-hover:opacity-75 object-cover pointer-events-none"
                                }, null, 8, ["src"])
                              ]),
                              createVNode("p", { class: "pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900" }, toDisplayString(file.name), 1),
                              createVNode("p", { class: "pointer-events-none block text-sm font-medium text-gray-500" }, toDisplayString(file.metadata.size), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organization/logos/LogosGallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
