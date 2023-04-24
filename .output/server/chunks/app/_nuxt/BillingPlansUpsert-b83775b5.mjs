import { d as useNuxtApp } from '../server.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import { ssrRenderAttrs } from 'vue/server-renderer';
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
  components: {
    Dropdownlist,
    VueCtkDateTimePicker
  },
  data() {
    return {
      isUpsertBillingVisible: false,
      data: {},
      api: ""
    };
  },
  methods: {},
  computed: {},
  mounted() {
  },
  created() {
    useNuxtApp().$bus.$on("evtUpsertBilling", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.isUpsertBillingVisible = !this.isUpsertBillingVisible;
        return this.data;
      }
      this.isUpsertBillingVisible = !this.isUpsertBillingVisible;
    });
    useNuxtApp().$bus.$on("evtDeleteBilling", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.deleteBilling();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off("evtUpsertBilling");
    useNuxtApp().$bus.$off("evtDeleteBilling");
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($data.isUpsertBillingVisible) {
    _push(`<section${ssrRenderAttrs(mergeProps({
      class: "fixed inset-0 overflow-hidden",
      "aria-labelledby": "slide-over-title",
      role: "dialog",
      "aria-modal": "true"
    }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-gray-200 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Billing &amp; plans</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="text-gray-600 hover:text-gray-900 transition ease-in-out duration-150"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Manage you Billing &amp; plans / Payment details.</p></div></header><div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmBilling" id="frmBilling" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><section aria-labelledby="payment-heading" class=""><h2 id="payment-heading" class="text-lg font-medium text-gray-900">Card information</h2><div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4"><div class="col-span-3 sm:col-span-4"><label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label><div class="mt-1"><input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div class="col-span-3 sm:col-span-4"><label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label><div class="mt-1"><input type="text" id="card-number" name="card-number" autocomplete="cc-number" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div class="col-span-2 sm:col-span-3"><label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label><div class="mt-1"><input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div><label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label><div class="mt-1"><input type="text" name="cvc" id="cvc" autocomplete="csc" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div></div></section><section aria-labelledby="shipping-heading" class="mt-10"><h2 id="shipping-heading" class="text-lg font-medium text-gray-900">Billing address</h2><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-3"><label for="address" class="block text-sm font-medium text-gray-700">Address</label><div class="mt-1"><input type="text" id="address" name="address" autocomplete="street-address" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div class="sm:col-span-3"><label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label><div class="mt-1"><input type="text" id="apartment" name="apartment" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div><label for="city" class="block text-sm font-medium text-gray-700">City</label><div class="mt-1"><input type="text" id="city" name="city" autocomplete="address-level2" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div><label for="region" class="block text-sm font-medium text-gray-700">State / Province</label><div class="mt-1"><input type="text" id="region" name="region" autocomplete="address-level1" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div><div><label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label><div class="mt-1"><input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"></div></div></div></section></div></form></div></div></div></div><div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"><span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button></span><span class="inline-flex rounded-md shadow-sm"><button type="submit" class="zyn-button">Save</button></span></div></div></div></div></div></section>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/management/billing/BillingPlansUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BillingPlansUpsert = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { BillingPlansUpsert as default };
