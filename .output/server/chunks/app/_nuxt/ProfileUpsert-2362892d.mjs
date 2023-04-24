import { ref, unref, mergeProps, useSSRContext } from 'vue';
import { d as useNuxtApp, C as useSupabaseUser, F as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { r as render } from './XMarkIcon-293bebc4.mjs';
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
  __name: "ProfileUpsert",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref({});
    const progress = ref(false);
    const isUpsertProfileVisible = ref(false);
    const isDeleteButtonVisible = ref(false);
    const api = "/api/profiles/";
    useNuxtApp().$bus.$on("evtUpsertProfile", (args) => {
      isUpsertProfileVisible.value = !isUpsertProfileVisible.value;
      getProfile(useSupabaseUser().value.id);
    });
    useNuxtApp().$bus.$on("evtDeleteProfile", (data2) => {
      deleteProfile(useSupabaseUser().value.id);
    });
    async function getProfile(id) {
      progress.value = true;
      useFetch(api + id + "?*", {
        method: "get",
        initialCache: false,
        onResponse({ request, response, options }) {
          data.value = response._data[0];
          progress.value = false;
        }
      }, "$enGUScRdcg");
    }
    async function deleteProfile(id) {
      try {
        await useFetch(api + id, {
          method: "delete",
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response._data.status == 200) {
              useNuxtApp().$toast.show({ type: "success", message: `Delete [${response._data.data[0].email}] was successful`, timeout: 6 });
              useNuxtApp().$bus.$emit("evtSearchProfiles");
              data.value = {};
            } else {
              useNuxtApp().$toast.show({ type: "danger", message: "Failure during delete", timeout: 6 });
            }
          }
        }, "$Zwsi1WiWO8");
      } catch (error) {
      } finally {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isUpsertProfileVisible)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-primary-700 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-white">Profile</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><span class="sr-only">Close panel</span>`);
        _push(ssrRenderComponent(unref(render), {
          class: "h-6 w-6",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</button></div></div><div><p class="text-sm leading-5 text-primary-300">Your basic profile details visible to general public.</p></div></header>`);
        if (unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmProfiles" id="frmProfiles" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="sm:col-span-6"><div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">`);
          if (unref(data).avatar_url) {
            _push(`<img class="aspect-[3/2] w-full rounded-2xl object-cover"${ssrRenderAttr("src", unref(data).avatar_url)}${ssrRenderAttr("alt", unref(data).last_name + " " + unref(data).first_name)}>`);
          } else {
            _push(`<img class="aspect-[3/2] w-full rounded-2xl object-cover" src="https://via.placeholder.com/100.png" alt="Placeholder image">`);
          }
          if (unref(data).first_name) {
            _push(`<div class="sm:col-span-2"><div class="space-y-1 text-lg font-medium leading-6"><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(unref(data).last_name + "," + unref(data).first_name)}</h3><p class="text-base leading-7 text-gray-600">System Analyst</p></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><label for="email" class="block text-sm font-medium text-gray-700">Email</label><div class="mt-1"><input type="text" id="email" name="email"${ssrRenderAttr("value", unref(data).email)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label><div class="mt-1"><input type="text" id="first_name" name="first_name"${ssrRenderAttr("value", unref(data).first_name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label><div class="mt-1"><input type="text" id="last_name" name="last_name"${ssrRenderAttr("value", unref(data).last_name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div></div></div></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/ProfileUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
