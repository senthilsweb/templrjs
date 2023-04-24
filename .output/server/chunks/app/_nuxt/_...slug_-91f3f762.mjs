import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { _ as _sfc_main$1 } from './ContentRendererMarkdown-19dabe14.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { ref, withAsyncContext, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, useSSRContext, nextTick } from 'vue';
import { f as useState, h as useRoute, C as useSupabaseUser } from '../server.mjs';
import { p as parseMarkdown, e as exportToPDF } from './exportToPDF-37893482.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
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
      const _component_Icon = __nuxt_component_2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "landing" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]"${_scopeId}><div class="py-4 sm:px-2 lg:relative lg:px-0 lg:py-8"${_scopeId}><div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8"${_scopeId}><div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8"${_scopeId}><div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8"${_scopeId}><div class="relative"${_scopeId}><p class="inline bg-clip-text font-display text-5xl tracking-tight text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300"${_scopeId}>${ssrInterpolate(unref(page).parsed.title)}</p><p class="mt-3 text-2xl tracking-tight text-slate-400"${_scopeId}>${ssrInterpolate(unref(page).parsed.excerpt)}</p></div></div><div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents"${_scopeId}><div class="z-10 relative mb-12 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-300 to-orange-500"${_scopeId}><div class="w-full h-[392px]"${_scopeId}><div class="absolute inset-0"${_scopeId}><div class="divide-y divide-gray-300/50"${_scopeId}><div class="space-y-6 py-8 text-base leading-7 p-2 m-2"${_scopeId}><p class="text-3xl font-bold tracking-tight text-gray-900"${_scopeId}>The Client</p><!--[-->`);
            ssrRenderList(unref(page).parsed.about_client, (item) => {
              _push2(`<p${_scopeId}>${ssrInterpolate(item)}</p>`);
            });
            _push2(`<!--]--></div></div></div></div></div></div></div><div class="relative lg:static xl:pl-10"${_scopeId}><div class="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]"${_scopeId}><svg aria-hidden="true" viewBox="0 0 668 1069" width="668" height="1069" fill="none" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]"${_scopeId}><defs${_scopeId}><clipPath id=":R6km:-clip-path"${_scopeId}><path fill="#fff" transform="rotate(-180 334 534.4)" d="M0 0h668v1068.8H0z"${_scopeId}></path></clipPath></defs><g opacity=".4" clip-path="url(#:R6km:-clip-path)" stroke-width="4"${_scopeId}><path opacity=".3" d="M584.5 770.4v-474M484.5 770.4v-474M384.5 770.4v-474M283.5 769.4v-474M183.5 768.4v-474M83.5 767.4v-474" stroke="#334155"${_scopeId}></path><path d="M83.5 221.275v6.587a50.1 50.1 0 0 0 22.309 41.686l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M83.5 716.012v6.588a50.099 50.099 0 0 0 22.309 41.685l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M183.7 584.5v6.587a50.1 50.1 0 0 0 22.31 41.686l55.581 37.054a50.097 50.097 0 0 1 22.309 41.685v6.588M384.101 277.637v6.588a50.1 50.1 0 0 0 22.309 41.685l55.581 37.054a50.1 50.1 0 0 1 22.31 41.686v6.587M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588" stroke="#334155"${_scopeId}></path><path d="M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588M484.3 594.937v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054A50.1 50.1 0 0 0 384.1 721.95v6.587M484.3 872.575v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054a50.098 50.098 0 0 0-22.309 41.686v6.582M584.501 663.824v39.988a50.099 50.099 0 0 1-22.31 41.685l-55.581 37.054a50.102 50.102 0 0 0-22.309 41.686v6.587M283.899 945.637v6.588a50.1 50.1 0 0 1-22.309 41.685l-55.581 37.05a50.12 50.12 0 0 0-22.31 41.69v6.59M384.1 277.637c0 19.946 12.763 37.655 31.686 43.962l137.028 45.676c18.923 6.308 31.686 24.016 31.686 43.962M183.7 463.425v30.69c0 21.564 13.799 40.709 34.257 47.529l134.457 44.819c18.922 6.307 31.686 24.016 31.686 43.962M83.5 102.288c0 19.515 13.554 36.412 32.604 40.645l235.391 52.309c19.05 4.234 32.605 21.13 32.605 40.646M83.5 463.425v-58.45M183.699 542.75V396.625M283.9 1068.8V945.637M83.5 363.225v-141.95M83.5 179.524v-77.237M83.5 60.537V0M384.1 630.425V277.637M484.301 830.824V594.937M584.5 1068.8V663.825M484.301 555.275V452.988M584.5 622.075V452.988M384.1 728.537v-56.362M384.1 1068.8v-20.88M384.1 1006.17V770.287M283.9 903.888V759.85M183.699 1066.71V891.362M83.5 1068.8V716.012M83.5 674.263V505.175" stroke="#334155"${_scopeId}></path><circle cx="83.5" cy="384.1" r="10.438" transform="rotate(-180 83.5 384.1)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="83.5" cy="200.399" r="10.438" transform="rotate(-180 83.5 200.399)" stroke="#334155"${_scopeId}></circle><circle cx="83.5" cy="81.412" r="10.438" transform="rotate(-180 83.5 81.412)" stroke="#334155"${_scopeId}></circle><circle cx="183.699" cy="375.75" r="10.438" transform="rotate(-180 183.699 375.75)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="183.699" cy="563.625" r="10.438" transform="rotate(-180 183.699 563.625)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="384.1" cy="651.3" r="10.438" transform="rotate(-180 384.1 651.3)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="484.301" cy="574.062" r="10.438" transform="rotate(-180 484.301 574.062)" fill="#0EA5E9" fill-opacity=".42" stroke="#0EA5E9"${_scopeId}></circle><circle cx="384.1" cy="749.412" r="10.438" transform="rotate(-180 384.1 749.412)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="384.1" cy="1027.05" r="10.438" transform="rotate(-180 384.1 1027.05)" stroke="#334155"${_scopeId}></circle><circle cx="283.9" cy="924.763" r="10.438" transform="rotate(-180 283.9 924.763)" stroke="#334155"${_scopeId}></circle><circle cx="183.699" cy="870.487" r="10.438" transform="rotate(-180 183.699 870.487)" stroke="#334155"${_scopeId}></circle><circle cx="283.9" cy="738.975" r="10.438" transform="rotate(-180 283.9 738.975)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="83.5" cy="695.138" r="10.438" transform="rotate(-180 83.5 695.138)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="83.5" cy="484.3" r="10.438" transform="rotate(-180 83.5 484.3)" fill="#0EA5E9" fill-opacity=".42" stroke="#0EA5E9"${_scopeId}></circle><circle cx="484.301" cy="432.112" r="10.438" transform="rotate(-180 484.301 432.112)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="584.5" cy="432.112" r="10.438" transform="rotate(-180 584.5 432.112)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="584.5" cy="642.95" r="10.438" transform="rotate(-180 584.5 642.95)" fill="#1E293B" stroke="#334155"${_scopeId}></circle><circle cx="484.301" cy="851.699" r="10.438" transform="rotate(-180 484.301 851.699)" stroke="#334155"${_scopeId}></circle><circle cx="384.1" cy="256.763" r="10.438" transform="rotate(-180 384.1 256.763)" stroke="#334155"${_scopeId}></circle></g></svg></div><div class="relative"${_scopeId}></div></div></div></div></div><div class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : &#39;lg:max-w-7xl mx-auto&#39;]"${_scopeId}><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl"${_scopeId}>`);
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
            _push2(`<div class="mt-2"${_scopeId}>`);
            if (editing.value) {
              _push2(`<form class="editor-wrapper"${_scopeId}><textarea${_scopeId}>${ssrInterpolate(unref(page).body)}</textarea><div class="block w-full pt-2 pb-2"${_scopeId}><button class="w-full zyn-button zyn-login-button zyn-button-contrast"${_scopeId}>${ssrInterpolate(saving.value ? "Saving" : "Save")}</button></div></form>`);
            } else {
              _push2(`<div${_scopeId}><div class="relative"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ContentRendererMarkdown, {
                value: unref(page).parsed
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div></div></div><div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8"${_scopeId}><div class="py-4 w-full sm:px-2 lg:relative lg:px-0"${_scopeId}><h2 class="text-3xl font-bold text-gray-900"${_scopeId}>Technology Stack</h2><ul role="list" class="mt-6 grid grid-cols-1 gap-6 py-6 sm:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(page).parsed.technologies, (item, itemIdx) => {
              _push2(`<li class="flow-root"${_scopeId}><div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: "h-12 w-12"
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><h3 class="text-sm font-medium text-gray-900"${_scopeId}><span${_scopeId}>${ssrInterpolate(item.name)}</span></h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(item.version)}</p></div></div></li>`);
            });
            _push2(`<!--]--></ul></div></div><div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl pb-4"${_scopeId}><h2 class="text-3xl font-bold text-gray-900 pb-6"${_scopeId}>The Results</h2><div class="bg-gray-900 rounded-xl"${_scopeId}><div class="mx-auto max-w-7xl"${_scopeId}><div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(page).parsed.stats, (stat) => {
              _push2(`<div class="px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><p class="text-sm font-medium leading-6 text-gray-400"${_scopeId}>${ssrInterpolate(stat.name)}</p><p class="mt-2 flex items-baseline gap-x-2"${_scopeId}><span class="text-4xl font-semibold inline bg-clip-text font-display tracking-tight text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300"${_scopeId}>${ssrInterpolate(stat.value)}</span>`);
              if (stat.unit) {
                _push2(`<span class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(stat.unit)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p></div>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]" }, [
                createVNode("div", { class: "py-4 sm:px-2 lg:relative lg:px-0 lg:py-8" }, [
                  createVNode("div", { class: "mx-auto max-w-7xl px-6 lg:flex lg:px-8" }, [
                    createVNode("div", { class: "mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8" }, [
                      createVNode("div", { class: "lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8" }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode("p", { class: "inline bg-clip-text font-display text-5xl tracking-tight text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300" }, toDisplayString(unref(page).parsed.title), 1),
                          createVNode("p", { class: "mt-3 text-2xl tracking-tight text-slate-400" }, toDisplayString(unref(page).parsed.excerpt), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents" }, [
                        createVNode("div", { class: "z-10 relative mb-12 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-300 to-orange-500" }, [
                          createVNode("div", { class: "w-full h-[392px]" }, [
                            createVNode("div", { class: "absolute inset-0" }, [
                              createVNode("div", { class: "divide-y divide-gray-300/50" }, [
                                createVNode("div", { class: "space-y-6 py-8 text-base leading-7 p-2 m-2" }, [
                                  createVNode("p", { class: "text-3xl font-bold tracking-tight text-gray-900" }, "The Client"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(page).parsed.about_client, (item) => {
                                    return openBlock(), createBlock("p", null, toDisplayString(item), 1);
                                  }), 256))
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative lg:static xl:pl-10" }, [
                      createVNode("div", { class: "absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]" }, [
                        (openBlock(), createBlock("svg", {
                          "aria-hidden": "true",
                          viewBox: "0 0 668 1069",
                          width: "668",
                          height: "1069",
                          fill: "none",
                          class: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]"
                        }, [
                          createVNode("defs", null, [
                            createVNode("clipPath", { id: ":R6km:-clip-path" }, [
                              createVNode("path", {
                                fill: "#fff",
                                transform: "rotate(-180 334 534.4)",
                                d: "M0 0h668v1068.8H0z"
                              })
                            ])
                          ]),
                          createVNode("g", {
                            opacity: ".4",
                            "clip-path": "url(#:R6km:-clip-path)",
                            "stroke-width": "4"
                          }, [
                            createVNode("path", {
                              opacity: ".3",
                              d: "M584.5 770.4v-474M484.5 770.4v-474M384.5 770.4v-474M283.5 769.4v-474M183.5 768.4v-474M83.5 767.4v-474",
                              stroke: "#334155"
                            }),
                            createVNode("path", {
                              d: "M83.5 221.275v6.587a50.1 50.1 0 0 0 22.309 41.686l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M83.5 716.012v6.588a50.099 50.099 0 0 0 22.309 41.685l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M183.7 584.5v6.587a50.1 50.1 0 0 0 22.31 41.686l55.581 37.054a50.097 50.097 0 0 1 22.309 41.685v6.588M384.101 277.637v6.588a50.1 50.1 0 0 0 22.309 41.685l55.581 37.054a50.1 50.1 0 0 1 22.31 41.686v6.587M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588",
                              stroke: "#334155"
                            }),
                            createVNode("path", {
                              d: "M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588M484.3 594.937v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054A50.1 50.1 0 0 0 384.1 721.95v6.587M484.3 872.575v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054a50.098 50.098 0 0 0-22.309 41.686v6.582M584.501 663.824v39.988a50.099 50.099 0 0 1-22.31 41.685l-55.581 37.054a50.102 50.102 0 0 0-22.309 41.686v6.587M283.899 945.637v6.588a50.1 50.1 0 0 1-22.309 41.685l-55.581 37.05a50.12 50.12 0 0 0-22.31 41.69v6.59M384.1 277.637c0 19.946 12.763 37.655 31.686 43.962l137.028 45.676c18.923 6.308 31.686 24.016 31.686 43.962M183.7 463.425v30.69c0 21.564 13.799 40.709 34.257 47.529l134.457 44.819c18.922 6.307 31.686 24.016 31.686 43.962M83.5 102.288c0 19.515 13.554 36.412 32.604 40.645l235.391 52.309c19.05 4.234 32.605 21.13 32.605 40.646M83.5 463.425v-58.45M183.699 542.75V396.625M283.9 1068.8V945.637M83.5 363.225v-141.95M83.5 179.524v-77.237M83.5 60.537V0M384.1 630.425V277.637M484.301 830.824V594.937M584.5 1068.8V663.825M484.301 555.275V452.988M584.5 622.075V452.988M384.1 728.537v-56.362M384.1 1068.8v-20.88M384.1 1006.17V770.287M283.9 903.888V759.85M183.699 1066.71V891.362M83.5 1068.8V716.012M83.5 674.263V505.175",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "83.5",
                              cy: "384.1",
                              r: "10.438",
                              transform: "rotate(-180 83.5 384.1)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "83.5",
                              cy: "200.399",
                              r: "10.438",
                              transform: "rotate(-180 83.5 200.399)",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "83.5",
                              cy: "81.412",
                              r: "10.438",
                              transform: "rotate(-180 83.5 81.412)",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "183.699",
                              cy: "375.75",
                              r: "10.438",
                              transform: "rotate(-180 183.699 375.75)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "183.699",
                              cy: "563.625",
                              r: "10.438",
                              transform: "rotate(-180 183.699 563.625)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "384.1",
                              cy: "651.3",
                              r: "10.438",
                              transform: "rotate(-180 384.1 651.3)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "484.301",
                              cy: "574.062",
                              r: "10.438",
                              transform: "rotate(-180 484.301 574.062)",
                              fill: "#0EA5E9",
                              "fill-opacity": ".42",
                              stroke: "#0EA5E9"
                            }),
                            createVNode("circle", {
                              cx: "384.1",
                              cy: "749.412",
                              r: "10.438",
                              transform: "rotate(-180 384.1 749.412)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "384.1",
                              cy: "1027.05",
                              r: "10.438",
                              transform: "rotate(-180 384.1 1027.05)",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "283.9",
                              cy: "924.763",
                              r: "10.438",
                              transform: "rotate(-180 283.9 924.763)",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "183.699",
                              cy: "870.487",
                              r: "10.438",
                              transform: "rotate(-180 183.699 870.487)",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "283.9",
                              cy: "738.975",
                              r: "10.438",
                              transform: "rotate(-180 283.9 738.975)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "83.5",
                              cy: "695.138",
                              r: "10.438",
                              transform: "rotate(-180 83.5 695.138)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "83.5",
                              cy: "484.3",
                              r: "10.438",
                              transform: "rotate(-180 83.5 484.3)",
                              fill: "#0EA5E9",
                              "fill-opacity": ".42",
                              stroke: "#0EA5E9"
                            }),
                            createVNode("circle", {
                              cx: "484.301",
                              cy: "432.112",
                              r: "10.438",
                              transform: "rotate(-180 484.301 432.112)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "584.5",
                              cy: "432.112",
                              r: "10.438",
                              transform: "rotate(-180 584.5 432.112)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "584.5",
                              cy: "642.95",
                              r: "10.438",
                              transform: "rotate(-180 584.5 642.95)",
                              fill: "#1E293B",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "484.301",
                              cy: "851.699",
                              r: "10.438",
                              transform: "rotate(-180 484.301 851.699)",
                              stroke: "#334155"
                            }),
                            createVNode("circle", {
                              cx: "384.1",
                              cy: "256.763",
                              r: "10.438",
                              transform: "rotate(-180 384.1 256.763)",
                              stroke: "#334155"
                            })
                          ])
                        ]))
                      ]),
                      createVNode("div", { class: "relative" })
                    ])
                  ])
                ])
              ]),
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
                  createVNode("div", {
                    onDblclick: editMode,
                    class: "mt-2"
                  }, [
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
                      createVNode("div", { class: "relative" }, [
                        createVNode(_component_ContentRendererMarkdown, {
                          value: unref(page).parsed
                        }, null, 8, ["value"])
                      ])
                    ], 512))
                  ], 32)
                ])
              ]),
              createVNode("div", { class: "mx-auto max-w-7xl px-6 lg:flex lg:px-8" }, [
                createVNode("div", { class: "py-4 w-full sm:px-2 lg:relative lg:px-0" }, [
                  createVNode("h2", { class: "text-3xl font-bold text-gray-900" }, "Technology Stack"),
                  createVNode("ul", {
                    role: "list",
                    class: "mt-6 grid grid-cols-1 gap-6 py-6 sm:grid-cols-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).parsed.technologies, (item, itemIdx) => {
                      return openBlock(), createBlock("li", {
                        key: itemIdx,
                        class: "flow-root"
                      }, [
                        createVNode("div", { class: "relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50" }, [
                          createVNode(_component_Icon, {
                            name: item.icon,
                            class: "h-12 w-12"
                          }, null, 8, ["name"]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-sm font-medium text-gray-900" }, [
                              createVNode("span", null, toDisplayString(item.name), 1)
                            ]),
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(item.version), 1)
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("div", { class: "mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl pb-4" }, [
                createVNode("h2", { class: "text-3xl font-bold text-gray-900 pb-6" }, "The Results"),
                createVNode("div", { class: "bg-gray-900 rounded-xl" }, [
                  createVNode("div", { class: "mx-auto max-w-7xl" }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).parsed.stats, (stat) => {
                        return openBlock(), createBlock("div", {
                          key: stat.title,
                          class: "px-4 py-6 sm:px-6 lg:px-8"
                        }, [
                          createVNode("p", { class: "text-sm font-medium leading-6 text-gray-400" }, toDisplayString(stat.name), 1),
                          createVNode("p", { class: "mt-2 flex items-baseline gap-x-2" }, [
                            createVNode("span", { class: "text-4xl font-semibold inline bg-clip-text font-display tracking-tight text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300" }, toDisplayString(stat.value), 1),
                            stat.unit ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-sm text-gray-400"
                            }, toDisplayString(stat.unit), 1)) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/casestudy/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
