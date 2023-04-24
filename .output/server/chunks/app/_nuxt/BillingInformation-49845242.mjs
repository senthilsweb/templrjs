import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  components: {},
  data() {
    return {};
  },
  methods: {},
  async asyncData({ params }) {
  },
  created() {
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<form${ssrRenderAttrs(mergeProps({ class: "pt-4 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1" }, _attrs))}><div class="max-w-lg mx-auto lg:max-w-none"><section aria-labelledby="payment-heading" class=""><h2 id="payment-heading" class="text-lg font-medium text-gray-900">Billing information</h2><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-3"><label for="company" class="block text-sm font-medium text-gray-700">Company</label><div class="mt-1"><input type="text" id="company" name="company" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div class="sm:col-span-3"><label for="address" class="block text-sm font-medium text-gray-700">Address</label><div class="mt-1"><input type="text" id="address" name="address" autocomplete="street-address" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div class="sm:col-span-3"><label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label><div class="mt-1"><input type="text" id="apartment" name="apartment" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div><label for="city" class="block text-sm font-medium text-gray-700">City</label><div class="mt-1"><input type="text" id="city" name="city" autocomplete="address-level2" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div><label for="region" class="block text-sm font-medium text-gray-700">State / Province</label><div class="mt-1"><input type="text" id="region" name="region" autocomplete="address-level1" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div><label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label><div class="mt-1"><input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div></div></section></div></form>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/BillingInformation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BillingInformation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { BillingInformation as default };
