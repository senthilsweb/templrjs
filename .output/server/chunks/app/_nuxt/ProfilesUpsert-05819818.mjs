import { ref, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { d as useNuxtApp, F as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "ProfilesUpsert",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref({ is_active: true, is_archived: false });
    const progress = ref(false);
    const isUpsertProfilesVisible = ref(false);
    const isDeleteButtonVisible = ref(false);
    const api = "/api/profiles/";
    useNuxtApp().$bus.$on("evtUpsertProfiles", (args) => {
      isUpsertProfilesVisible.value = !isUpsertProfilesVisible.value;
      if (args !== void 0) {
        getProfiles(args._cells[0].data);
      } else {
        data.value = { is_active: true, is_archived: false };
      }
    });
    useNuxtApp().$bus.$on("evtDeleteProfiles", (data2) => {
      deleteProfiles(data2._cells[0].data);
    });
    async function getProfiles(id) {
      progress.value = true;
      useFetch(api + id, {
        method: "get",
        initialCache: false,
        onResponse({ request, response, options }) {
          data.value = response._data[0];
          progress.value = false;
        }
      }, "$Ev73gzTtyR");
    }
    async function deleteProfiles(id) {
      try {
        await useFetch(api + id, {
          method: "delete",
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            console.log("response._data=" + JSON.stringify(response._data));
            if (response._data.status == 200) {
              useNuxtApp().$toast.show({ type: "success", message: `Delete [${response._data.data[0].email}] was successful`, timeout: 6 });
              useNuxtApp().$bus.$emit("evtSearchProfiles");
              data.value = { is_active: true, is_archived: false };
            } else {
              useNuxtApp().$toast.show({ type: "danger", message: "Failure during delete", timeout: 6 });
            }
          }
        }, "$Ub56xInvVP");
      } catch (error) {
      } finally {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isUpsertProfilesVisible)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-gray-200 bg-opacity-50 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Profiles</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Manage...</p></div></header>`);
        if (unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmProfiles" id="frmProfiles" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><label for="username" class="block text-sm font-medium text-gray-700">Username</label><div class="mt-1"><input type="text" id="username" name="username"${ssrRenderAttr("value", unref(data).username)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="full_name" class="block text-sm font-medium text-gray-700">Full_name</label><div class="mt-1"><input type="text" id="full_name" name="full_name"${ssrRenderAttr("value", unref(data).full_name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="avatar_url" class="block text-sm font-medium text-gray-700">Avatar_url</label><div class="mt-1"><input type="text" id="avatar_url" name="avatar_url"${ssrRenderAttr("value", unref(data).avatar_url)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="website" class="block text-sm font-medium text-gray-700">Website</label><div class="mt-1"><input type="text" id="website" name="website"${ssrRenderAttr("value", unref(data).website)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="email" class="block text-sm font-medium text-gray-700">Email</label><div class="mt-1"><input type="text" id="email" name="email"${ssrRenderAttr("value", unref(data).email)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="is_sso_user" class="block text-sm font-medium text-gray-700">Is_sso_user</label><div class="mt-1"><input type="text" id="is_sso_user" name="is_sso_user"${ssrRenderAttr("value", unref(data).is_sso_user)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="f_name" class="block text-sm font-medium text-gray-700">F_name</label><div class="mt-1"><input type="text" id="f_name" name="f_name"${ssrRenderAttr("value", unref(data).f_name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="l_name" class="block text-sm font-medium text-gray-700">L_name</label><div class="mt-1"><input type="text" id="l_name" name="l_name"${ssrRenderAttr("value", unref(data).l_name)} class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300"></div></div><div class="sm:col-span-3 mt-1"><label for="is_active" class="block text-sm font-medium text-gray-700">Is-active?</label></div><div class="sm:col-span-3"><div class="mt-1">`);
          _push(ssrRenderComponent(unref(Switch), {
            id: "is_active",
            name: "is_active",
            modelValue: unref(data).is_active,
            "onUpdate:modelValue": ($event) => unref(data).is_active = $event,
            class: [unref(data).is_active ? "bg-primary-800" : "bg-primary-500", "relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"]
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
            class: [unref(data).is_archived ? "bg-primary-800" : "bg-primary-500", "relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profiles/ProfilesUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
