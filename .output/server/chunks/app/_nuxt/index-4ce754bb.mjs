import { l as lefNavLinks, _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import RolePageHeader from './RolePageHeader-61c540f5.mjs';
import RoleSearch from './RoleSearch-fc378ac1.mjs';
import _sfc_main$1 from './RoleGrid-57a46ab3.mjs';
import RoleUpsert from './RoleUpsert-2053f722.mjs';
import './Logo-d1137ce0.mjs';
import '../server.mjs';
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
import './Icon-7255ab8c.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import '@headlessui/vue';
import './Dropdownlist-5dbe543b.mjs';

const __default__ = {
  layout: "app",
  components: {
    RolePageHeader,
    RoleSearch,
    RoleDataTable: _sfc_main$1,
    //RoleGrid,
    RoleUpsert
  },
  data() {
    return {
      role: {},
      api: "",
      lefNavLinks,
      pageHeading: "Roles",
      searchHeading: ""
    };
  },
  methods: {
    async getrole(email) {
    }
  },
  async asyncData({ params }) {
  },
  created() {
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex overflow-hidden bg-gray-50" }, _attrs))}><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><nav aria-label="Breadcrumb" class="bg-white border-b border-blue-gray-200 xl:hidden"><div class="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8"><a href="#" class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"><svg class="h-5 w-5 text-blue-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg><span>Profile information</span></a></div></nav><div class="flex-1 flex xl:overflow-hidden"><div class="flex-1 xl:overflow-y-auto">`);
      _push(ssrRenderComponent(RolePageHeader, {
        heading: _ctx.pageHeading,
        showbutton: "true",
        guide: "Manage roleship subscriptions i.e. search, add/modify/delete/activate/de-activate roleships",
        addClickEvent: "evtUpsertRole"
      }, null, _parent));
      _push(ssrRenderComponent(RoleSearch, { heading: _ctx.searchHeading }, null, _parent));
      _push(`<div class="w-full"><div class="space-y-8 divide-y divide-gray sm:space-y-5 pt-5"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div></div></div></div></div></main></div></div>`);
      _push(ssrRenderComponent(RoleUpsert, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/management/roles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
