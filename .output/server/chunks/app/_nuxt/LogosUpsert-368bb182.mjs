import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { ref, unref, mergeProps, useSSRContext } from 'vue';
import { d as useNuxtApp, E as usePropertiesStore } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
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
  __name: "LogosUpsert",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref({ parent_code: "logo" });
    ref([]);
    const progress = ref(false);
    const isUpsertLogoVisible = ref(false);
    const isDeleteButtonVisible = ref(false);
    useNuxtApp().$bus.$on("evtUpsertLogo", (args) => {
      isUpsertLogoVisible.value = !isUpsertLogoVisible.value;
    });
    useNuxtApp().$bus.$on("evtDeleteLogo", (data2) => {
    });
    function handleSelectedInProperties_Parent(e) {
      data.value.parent_code = e.target.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_Dropdownlist = Dropdownlist;
      if (unref(isUpsertLogoVisible)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-primary-700 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-white">Logos</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><span class="sr-only">Close panel</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:close",
          class: "h-6 w-6",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</button></div></div><div><p class="text-sm leading-5 text-primary-300">Create | Manage brand assets</p></div></header>`);
        if (unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmLogos" id="frmLogos" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="sm:col-span-6">`);
          _push(ssrRenderComponent(_component_Dropdownlist, {
            data: { data: unref(usePropertiesStore)().parent_properties },
            onChange: handleSelectedInProperties_Parent,
            show_label: "true",
            modelValue: unref(data).parent_code,
            "onUpdate:modelValue": ($event) => unref(data).parent_code = $event,
            name: "parent_code",
            label: "Parent code",
            selected_value: unref(data).parent_code,
            readonly: ""
          }, null, _parent));
          _push(`<p class="mt-1 text-xs text-gray-500">Preconfigured parent code assigned for all brand-assets</p></div><div class="sm:col-span-6"><label for="code" class="block text-sm font-medium text-gray-700">Code</label><div class="mt-1"><input type="text" id="code" name="code"${ssrRenderAttr("value", unref(data).code)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"><p class="mt-1 text-xs text-gray-500">Must be an unique string within the Parent Code.</p></div></div><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><div class="mt-2 sm:col-span-2 sm:mt-0"><div class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"><div class="space-y-1 text-center"><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div class="flex text-sm text-gray-600"><label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" class="sr-only"></label><p class="pl-1">or drag and drop</p></div><p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p></div></div></div></div><div class="sm:col-span-6"><label for="file_name" class="block text-sm font-medium text-gray-700">File Name</label><div class="mt-1"><input type="text" id="file_name" name="file_name"${ssrRenderAttr("value", unref(data).file_name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"><p class="mt-1 text-xs text-gray-500">Auto assign from uploaded file name which can be modified to any name of your choice.</p></div></div><div class="sm:col-span-6"><label for="metadata" class="block text-sm font-medium text-gray-700">Metadata</label><textarea id="metadata" name="metadata" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300">${ssrInterpolate(unref(data).metadata)}</textarea><p class="mt-1 text-xs text-gray-500">Any additional data in JSON format.</p></div></div></div></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organization/logos/LogosUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
