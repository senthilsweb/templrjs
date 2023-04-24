import { l as lefNavLinks, _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { _ as __nuxt_component_2 } from './LeftNavSecondary-d3e7e79e.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import UsersUpsert from './UsersUpsert-6b804780.mjs';
import _sfc_main$1 from './ProfileUpsert-2362892d.mjs';
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
import './CheckBoxGroup-e8533126.mjs';
import './Dropdownlist-5dbe543b.mjs';
import './XMarkIcon-293bebc4.mjs';

const __default__ = {
  components: {
    //UsersPageHeader,
    //UsersSearch,
    UsersUpsert,
    ProfileUpsert: _sfc_main$1
  },
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
  __name: "Account",
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
      _push(`<div class="flex-1 xl:overflow-y-auto"><div class="max-w-5xl"><div class="space-y-8 divide-y divide-gray sm:space-y-5 pt-2"><div class="md:flex md:items-center md:justify-between"><h2 class="text-xl font-medium text-blue-gray-900 mx-4">Profile information </h2><p class="mt-1 max-w-2xl text-sm text-gray-500"></p><div class="mt-4 flex md:mt-0 md:ml-4"><button type="submit" class="bg-primary-500 border border-transparent shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">Edit</button></div></div><div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "w-2/4 mx-4" }, null, _parent));
      _push(`</div></div></div></div></main></div></div>`);
      _push(ssrRenderComponent(UsersUpsert, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/Account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
