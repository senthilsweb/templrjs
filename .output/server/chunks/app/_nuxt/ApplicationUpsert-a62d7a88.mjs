import { ref, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { d as useNuxtApp, F as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { Switch } from '@headlessui/vue';
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

const _sfc_main = {
  __name: "ApplicationUpsert",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref({ is_active: true, is_archived: false });
    const progress = ref(false);
    const isUpsertApplicationsVisible = ref(false);
    const isDeleteButtonVisible = ref(false);
    const api = "/api/things/applications/";
    useNuxtApp().$bus.$on("evtUpsertApplications", (args) => {
      isUpsertApplicationsVisible.value = !isUpsertApplicationsVisible.value;
      if (args !== void 0) {
        getApplications(args._cells[0].data);
      } else {
        data.value = { is_active: true, is_archived: false };
      }
    });
    useNuxtApp().$bus.$on("evtDeleteApplications", (data2) => {
      deleteApplications(data2._cells[0].data);
    });
    async function getApplications(id) {
      progress.value = true;
      useFetch(api + id, {
        method: "get",
        initialCache: false,
        onResponse({ request, response, options }) {
          data.value = response._data[0];
          progress.value = false;
        }
      }, "$pxkFerdApf");
    }
    async function deleteApplications(id) {
      try {
        await useFetch(api + id, {
          method: "delete",
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response.status == 200) {
              useNuxtApp().$toast.show({ type: "success", message: "Delete was successful", timeout: 6 });
              useNuxtApp().$bus.$emit("evtSearchApplications");
              data.value = { is_active: true, is_archived: false };
            } else {
              useNuxtApp().$toast.show({ type: "danger", message: "Failure during delete", timeout: 6 });
            }
          }
        }, "$VxIDIDJVhC");
      } catch (error) {
      } finally {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isUpsertApplicationsVisible)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-gray-200 bg-opacity-50 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Applications</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Manage...</p></div></header>`);
        if (unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmApplications" id="frmApplications" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700">Code</label><div class="mt-1"><input${ssrIncludeBooleanAttr(unref(data).id) ? " readonly" : ""} type="text" id="code" name="code"${ssrRenderAttr("value", unref(data).code)} class="${ssrRenderClass([[unref(data).id ? "bg-gray-100" : ""], "block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"])}"></div></div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700">Name</label><div class="mt-1"><input type="text" id="name" name="name"${ssrRenderAttr("value", unref(data).name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="description" class="block text-sm font-medium text-gray-700">Description</label><textarea id="description" name="description" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300">${ssrInterpolate(unref(data).description)}</textarea></div><div class="sm:col-span-3 mt-1"><label for="is_active" class="block text-sm font-medium text-gray-700">Is-active?</label></div><div class="sm:col-span-3"><div class="mt-1">`);
          _push(ssrRenderComponent(unref(Switch), {
            id: "is_active",
            name: "is_active",
            modelValue: unref(data).is_active,
            "onUpdate:modelValue": ($event) => unref(data).is_active = $event,
            class: unref(data).is_active ? "zyn-swatch-button zyn-swatch-selected" : "zyn-swatch-button zyn-swatch-unselected"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="sr-only"${_scopeId}>Is-active?</span><span aria-hidden="true" class="${ssrRenderClass([unref(data).is_active ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"])}"${_scopeId}></span>`);
              } else {
                return [
                  createVNode("span", { class: "sr-only" }, "Is-active?"),
                  createVNode("span", {
                    "aria-hidden": "true",
                    class: [unref(data).is_active ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"]
                  }, null, 2)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div><div class="sm:col-span-3 mt-1"><label for="is_archived" class="block text-sm font-medium text-gray-700">Is-archived?</label></div><div class="sm:col-span-3"><div class="mt-1">`);
          _push(ssrRenderComponent(unref(Switch), {
            id: "is_archived",
            name: "is_archived",
            modelValue: unref(data).is_archived,
            "onUpdate:modelValue": ($event) => unref(data).is_archived = $event,
            class: unref(data).is_archived ? "zyn-swatch-button zyn-swatch-selected" : "zyn-swatch-button zyn-swatch-unselected"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="sr-only"${_scopeId}>Is-archived?</span><span aria-hidden="true" class="${ssrRenderClass([unref(data).is_archived ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"])}"${_scopeId}></span>`);
              } else {
                return [
                  createVNode("span", { class: "sr-only" }, "Is-archived?"),
                  createVNode("span", {
                    "aria-hidden": "true",
                    class: [unref(data).is_archived ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"]
                  }, null, 2)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div></div></div></div></form></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"><span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button></span>`);
        if (unref(isDeleteButtonVisible)) {
          _push(`<span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="inline-flex rounded-md shadow-sm"><button type="submit" class="zyn-button">Save</button></span></div></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/things/applications/ApplicationUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
