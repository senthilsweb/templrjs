import { l as lefNavLinks, _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { _ as __nuxt_component_2 } from './SecondaryNav-60cd97a1.mjs';
import { _ as __nuxt_component_1$1 } from './client-only-7e9de0b5.mjs';
import { unref, useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import BillingPlansUpsert from './BillingPlansUpsert-dd1728b0.mjs';
import BillingInformation from './BillingInformation-49845242.mjs';
import PaymentInformation from './PaymentInformation-5d05363a.mjs';
import { s as stats } from './billing-f3d38adf.mjs';
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
import '@headlessui/vue';
import './Dropdownlist-5dbe543b.mjs';

const _sfc_main$1 = {
  components: {},
  data() {
    return {
      items: this.data
    };
  },
  props: {
    type: String,
    label: String,
    name: String,
    selected_item: String,
    api: String,
    data: Array
  },
  methods: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = __nuxt_component_1$1;
  _push(`<dl${ssrRenderAttrs(mergeProps({ class: "mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
  _push(`</dl>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/stats-simple.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const __default__ = {
  components: {
    stats,
    BillingInformation,
    PaymentInformation,
    BillingPlansUpsert
  },
  data() {
    return {
      user: {},
      api: "",
      lefNavLinks,
      stats
    };
  },
  methods: {},
  async asyncData({ params }) {
  },
  created() {
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Billing",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_CommonsSecondaryNav = __nuxt_component_2;
      const _component_stats_simple = __nuxt_component_3;
      _push(`<!--[--><div class="h-screen flex overflow-hidden bg-gray-100"><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden">`);
      _push(ssrRenderComponent(_component_CommonsSecondaryNav, {
        title: "Account",
        api_end_point: "/_navigation/profile"
      }, null, _parent));
      _push(`<div class="flex-1 xl:overflow-y-auto"><div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold tracking-tight text-primary-gray-900 pt-4">Personal Billing</h1><div class="space-y-8 divide-y divide-gray sm:space-y-5">`);
      _push(ssrRenderComponent(_component_stats_simple, { data: unref(stats) }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4"><div><section aria-labelledby="applicant-information-title"><div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">`);
      _push(ssrRenderComponent(PaymentInformation, null, null, _parent));
      _push(`</div></section></div><div><section aria-labelledby="timeline-title"><div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">`);
      _push(ssrRenderComponent(BillingInformation, null, null, _parent));
      _push(`</div></section></div></div><div class="grid grid-cols-1 pt-4"><section aria-labelledby="timeline-title"><div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6"><div class="sm:flex sm:items-center sm:justify-between"><button type="submit" class="w-full bg-lime-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-lime-500 sm:ml-6 sm:order-last sm:w-auto">Continue</button><p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left"> You won&#39;t be charged until the next step.</p></div></div></section></div></div></div></div></div></main></div></div></div>`);
      _push(ssrRenderComponent(BillingPlansUpsert, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/Billing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
