import { l as lefNavLinks, _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { _ as __nuxt_component_2 } from './LeftNavSecondary-d3e7e79e.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const __default__ = {
  components: {},
  data() {
    return {
      user: {},
      api: "",
      lefNavLinks
    };
  },
  methods: {
    async getUser(email) {
      try {
        let api = "users?email=" + email;
        const { data } = await this.$axios.get(api);
        return this.user = data.data[0];
      } catch (error) {
        console.log(error);
      }
    }
  },
  async asyncData({ params }) {
  },
  created() {
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Security",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_ManagementLeftNavSecondary = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex overflow-hidden bg-gray-50" }, _attrs))}><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavSecondary, {
        data: unref(lefNavLinks).navAccount,
        api: _ctx.api
      }, null, _parent));
      _push(`<div class="flex-1 xl:overflow-y-auto"><div class="mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8"><h1 class="text-3xl font-bold tracking-tight text-primary-gray-900 p-4">Change Password</h1><form class="divide-y-primary-gray-200 mt-6 space-y-8 divide-y"><div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6"><div class="sm:col-span-6"><label for="first-name" class="block text-sm font-medium text-primary-gray-900">Old Password</label><input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border-primary-gray-300 text-primary-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div><div class="sm:col-span-6"><label for="last-name" class="block text-sm font-medium text-primary-gray-900">New Password </label><input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-primary-gray-300 text-primary-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div><div class="sm:col-span-6"><label for="last-name" class="block text-sm font-medium text-primary-gray-900">Re-enter New Password </label><input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-primary-gray-300 text-primary-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></div></div><div class="flex justify-end pt-8"><button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-primary-gray-900 shadow-sm hover:bg-primary-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Cancel</button><button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Save</button></div></form></div></div></div></div></main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/Security.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
