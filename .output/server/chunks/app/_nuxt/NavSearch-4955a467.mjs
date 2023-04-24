import { p as useAsyncData, E as usePropertiesStore, d as useNuxtApp } from '../server.mjs';
import { ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
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
import './_plugin-vue_export-helper-cc2b3d55.mjs';

const __default__ = {
  props: {
    heading: String
  },
  components: {
    Dropdownlist
  },
  data() {
    return {
      isShowSearchNavigationVisible: false,
      data: {}
    };
  },
  created() {
    useNuxtApp().$bus.$on("evtShowSearchNavigation", (data) => {
      this.isShowSearchNavigationVisible = !this.isShowSearchNavigationVisible;
    });
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "NavSearch",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const data = ref({});
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      "record_status-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "record_status" } }, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$Dc5t9lDxoc"
    )), __temp = await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      "limits-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "limit" } }, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$MfqNAds7Bd"
    )), __temp = await __temp, __restore();
    const { data: nav_parents } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "navigations-list-" + Math.random,
      () => $fetch("/api/nav?parent_code=is.null", {
        initialCache: false,
        method: "get"
      }),
      "$P01vaYoGxy"
    )), __temp = await __temp, __restore(), __temp);
    function handleSelectedInNavigation_Parent(e) {
      data.value.parent_code = e.target.value;
    }
    function handleSelectedInNavigationSearch_module(e) {
      data.value.nav_module_code = e.target.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><form name="frmSearchNavigation" id="frmSearchNavigation" class="space-y-8 divide-y divide-gray-200">`);
      if (_ctx.isShowSearchNavigationVisible) {
        _push(`<div class="px-2 pt-2 border-b space-y-2">`);
        if (this.heading) {
          _push(`<h2 class="text-lg leading-7 font-medium">${ssrInterpolate(this.heading)}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> Name </label><div class="relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div><input type="search" name="name" id="name"${ssrRenderAttr("value", unref(data).name)} class="focus:ring-lime-600 focus:border-lime-600 block w-full pl-10 sm:text-sm border-gray-300" placeholder="Search"></div><div class="sm:col-span-6">`);
        _push(ssrRenderComponent(Dropdownlist, {
          data: { data: unref(usePropertiesStore)().properties_by_parent_code("navigation-by-modules") },
          onChange: handleSelectedInNavigationSearch_module,
          show_label: "true",
          modelValue: unref(data).nav_module_code,
          "onUpdate:modelValue": ($event) => unref(data).nav_module_code = $event,
          name: "nav_module_code",
          label: "Module",
          selected_value: unref(data).nav_module_code
        }, null, _parent));
        _push(`</div><div class="sm:col-span-6">`);
        _push(ssrRenderComponent(Dropdownlist, {
          data: { data: unref(nav_parents) },
          onChange: handleSelectedInNavigation_Parent,
          show_label: "true",
          modelValue: unref(data).parent_code,
          "onUpdate:modelValue": ($event) => unref(data).parent_code = $event,
          name: "parent_code",
          label: "Parent",
          selected_value: unref(data).parent_code
        }, null, _parent));
        _push(`</div></div><div class="py-3 text-right space-x-4"><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Reset</button><button type="submit" class="zyn-button">Search</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/navigation/NavSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
