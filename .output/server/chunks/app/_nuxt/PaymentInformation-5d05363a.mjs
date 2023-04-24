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
  _push(`<form${ssrRenderAttrs(mergeProps({ class: "pt-4 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1" }, _attrs))}><div class="max-w-lg mx-auto lg:max-w-none"><section aria-labelledby="payment-heading" class=""><h2 id="payment-heading" class="text-lg font-medium text-gray-900">Payment Information</h2><div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4"><div class="col-span-3 sm:col-span-4"><label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label><div class="mt-1"><input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div class="col-span-3 sm:col-span-4"><label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label><div class="mt-1"><input type="text" id="card-number" name="card-number" autocomplete="cc-number" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div class="col-span-2 sm:col-span-3"><label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label><div class="mt-1"><input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div><label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label><div class="mt-1"><input type="text" name="cvc" id="cvc" autocomplete="csc" class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"></div></div><div><label class="block text-sm font-medium text-white mt-1">.</label><input type="text" readonly class="block w-full border-white focus:ring-white focus:border-white sm:text-sm"></div></div></section></div></form>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/PaymentInformation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PaymentInformation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { PaymentInformation as default };
