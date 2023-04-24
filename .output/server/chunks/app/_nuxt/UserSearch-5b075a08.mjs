import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { d as useNuxtApp } from '../server.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  layout: "app",
  props: {
    heading: String
  },
  components: {
    Dropdownlist
  },
  data() {
    return {
      isFilterUserVisible: false,
      mark_as_delete: ""
    };
  },
  methods: {
    searchUser() {
      let args = {};
      args.name = this.$refs.search_name.value;
      args.mark_as_delete = this.mark_as_delete;
      useNuxtApp().$bus.$emit("evtSearchUser", args);
    },
    handleSelectedForMarkAsDeleteInSearch(data) {
      this.mark_as_delete = data;
    }
  },
  created() {
    useNuxtApp().$bus.$on("evtFilterUser", (data) => {
      this.isFilterUserVisible = !this.isFilterUserVisible;
    });
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dropdownlist = Dropdownlist;
  _push(`<div${ssrRenderAttrs(_attrs)}><form name="frmSearchUser" id="frmSearchUser" class="space-y-8 divide-y divide-gray-200">`);
  if ($data.isFilterUserVisible) {
    _push(`<div class="px-2 pt-2 border-b space-y-2">`);
    if (this.heading) {
      _push(`<h2 class="text-lg leading-7 font-medium">${ssrInterpolate(this.heading)}</h2>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="sm:col-span-6">`);
    _push(ssrRenderComponent(_component_Dropdownlist, {
      onSelected_item: $options.handleSelectedForMarkAsDeleteInSearch,
      name: "search_mark_as_delete",
      label: "Marked as delete",
      data: {
        data: [
          { code: "true", name: "Yes" },
          { code: "false", name: "No" }
        ]
      }
    }, null, _parent));
    _push(`</div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> Name </label><div class="relative rounded-md shadow-sm"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div><input type="search" name="search_name" id="search_name" class="focus:ring-lime-600 focus:border-lime-600 block w-full pl-10 sm:text-sm border-gray-300" placeholder="Search"></div></div><div class="py-3 text-right space-x-4"><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"> Reset </button><button type="submit" class="zyn-button"> Search </button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</form></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/management/users/UserSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UserSearch = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { UserSearch as default };
