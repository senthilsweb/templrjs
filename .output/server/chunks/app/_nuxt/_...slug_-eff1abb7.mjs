import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { _ as _sfc_main$1 } from './ContentRendererMarkdown-19dabe14.mjs';
import { ref, withAsyncContext, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, useSSRContext, nextTick } from 'vue';
import { f as useState, h as useRoute, C as useSupabaseUser } from '../server.mjs';
import { p as parseMarkdown, e as exportToPDF } from './exportToPDF-37893482.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import 'vue-router';
import 'destr';
import 'scule';
import 'property-information';
import 'ofetch';
import 'hookable';
import 'unctx';
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
import './path-meta-de2c7c38.mjs';
import 'jspdf';

const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const editor = ref(null);
    const editing = ref(false);
    const saving = ref(false);
    const page = useState("page");
    const { path } = useRoute();
    console.log("path = ", path.split("/").pop());
    const pdfSection = ref(null);
    console.log("path = ", path);
    const pathArray = path.split("/");
    const folder = pathArray[pathArray.length - 2];
    const cms_page = pathArray.pop();
    const storage_key = `${folder}:${cms_page}`;
    const edit = ref(useRoute().query.edit || false);
    if (!page.value) {
      page.value = ([__temp, __restore] = withAsyncContext(() => $fetch(`/api/cms/${storage_key}`)), __temp = await __temp, __restore(), __temp);
      page.value.parsed = ([__temp, __restore] = withAsyncContext(() => parseMarkdown(page.value.body)), __temp = await __temp, __restore(), __temp);
    }
    if (page.value && false)
      ;
    async function editMode() {
      editing.value = true;
      await nextTick();
      editor.value.focus();
      autogrow();
    }
    function autogrow() {
      if (!editor.value)
        return;
      editor.value.style.height = "5px";
      editor.value.style.height = `${editor.value.scrollHeight}px`;
    }
    function save() {
      if (!editing.value || saving.value)
        return;
      saving.value = true;
      $fetch(`/api/cms/${storage_key}`, {
        method: "PUT",
        body: page.value.body
      }).then(async () => {
        page.value.parsed = await parseMarkdown(page.value.body);
        editing.value = saving.value = false;
      }).catch((err) => {
        editing.value = saving.value = false;
        alert(err.data.message);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_ContentRendererMarkdown = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "landing" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : &#39;lg:max-w-7xl mx-auto&#39;]"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl"${_scopeId}>`);
            if (("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value && edit.value) {
              _push2(`<header class="relative isolate pt-16"${_scopeId}><div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true"${_scopeId}><div class="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80"${_scopeId}><div class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]" style="${ssrRenderStyle({ "clip-path": "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)" })}"${_scopeId}></div></div><div class="absolute inset-x-0 bottom-0 h-px bg-gray-900/5"${_scopeId}></div></div><div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-teal-100"${_scopeId}><div class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none"${_scopeId}><div class="flex items-center gap-x-6"${_scopeId}><a href="#" class="rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered"${_scopeId}>Export to PDF</a></div><div class="flex items-center gap-x-4 sm:gap-x-6"${_scopeId}><a href="#" class="rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered"${_scopeId}>${ssrInterpolate(editing.value ? "Editing" : "Edit")} this page</a>`);
              if (editing.value) {
                _push2(`<a href="#" class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"${_scopeId}>${ssrInterpolate(saving.value ? "Saving" : "Save")}</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></header>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}>`);
            if (editing.value) {
              _push2(`<form class="editor-wrapper"${_scopeId}><textarea${_scopeId}>${ssrInterpolate(unref(page).body)}</textarea><div class="block w-full pt-2 pb-2"${_scopeId}><button class="w-full zyn-button zyn-login-button zyn-button-contrast"${_scopeId}>${ssrInterpolate(saving.value ? "Saving" : "Save")}</button></div></form>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ContentRendererMarkdown, {
                value: unref(page).parsed,
                class: "p-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']" }, [
                createVNode("div", { class: "mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl" }, [
                  ("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value && edit.value ? (openBlock(), createBlock("header", {
                    key: 0,
                    class: "relative isolate pt-16"
                  }, [
                    createVNode("div", {
                      class: "absolute inset-0 -z-10 overflow-hidden",
                      "aria-hidden": "true"
                    }, [
                      createVNode("div", { class: "absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80" }, [
                        createVNode("div", {
                          class: "aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]",
                          style: { "clip-path": "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)" }
                        })
                      ]),
                      createVNode("div", { class: "absolute inset-x-0 bottom-0 h-px bg-gray-900/5" })
                    ]),
                    createVNode("div", { class: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-teal-100" }, [
                      createVNode("div", { class: "mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none" }, [
                        createVNode("div", { class: "flex items-center gap-x-6" }, [
                          createVNode("a", {
                            href: "#",
                            onClick: ($event) => unref(exportToPDF)(`${unref(page).parsed.title}.pdf`, pdfSection.value, void 0, { html2canvas: { margin: 1, scale: 0.5, width: 793.92, height: 1122.24, useCORS: true } }),
                            class: "rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered"
                          }, "Export to PDF", 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-x-4 sm:gap-x-6" }, [
                          createVNode("a", {
                            href: "#",
                            onClick: editMode,
                            class: "rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered"
                          }, toDisplayString(editing.value ? "Editing" : "Edit") + " this page", 1),
                          editing.value ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: "#",
                            class: "rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                          }, toDisplayString(saving.value ? "Saving" : "Save"), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { onDblclick: editMode }, [
                    editing.value ? (openBlock(), createBlock("form", {
                      key: 0,
                      class: "editor-wrapper",
                      onSubmit: withModifiers(save, ["prevent"])
                    }, [
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(page).body = $event,
                        ref_key: "editor",
                        ref: editor,
                        onBlur: save,
                        onInput: autogrow
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, unref(page).body]
                      ]),
                      createVNode("div", { class: "block w-full pt-2 pb-2" }, [
                        createVNode("button", { class: "w-full zyn-button zyn-login-button zyn-button-contrast" }, toDisplayString(saving.value ? "Saving" : "Save"), 1)
                      ])
                    ], 40, ["onSubmit"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      ref_key: "pdfSection",
                      ref: pdfSection
                    }, [
                      createVNode(_component_ContentRendererMarkdown, {
                        value: unref(page).parsed,
                        class: "p-2"
                      }, null, 8, ["value"])
                    ], 512))
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cms/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
