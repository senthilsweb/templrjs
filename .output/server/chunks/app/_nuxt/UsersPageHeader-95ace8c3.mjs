import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  data() {
    return {};
  },
  props: {
    heading: String,
    showbutton: String,
    guide: String,
    addClickEvent: String
  },
  methods: {
    created() {
    },
    beforeMount() {
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex"><div class="flex-1 flex justify-between px-2 sm:px-2"><div class="flex-1 min-w-0"><h2 class="text-lg leading-7 font-medium">${ssrInterpolate(this.heading)}</h2><div><p class="text-sm leading-5 text-gray-400">${ssrInterpolate(this.guide)}</p></div></div>`);
  if (this.showbutton == "true") {
    _push(`<div class="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6"><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg></button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></header>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/UsersPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UsersPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { UsersPageHeader as default };
