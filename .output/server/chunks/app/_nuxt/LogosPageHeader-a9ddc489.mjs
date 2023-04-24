import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  data() {
    return {
      pgHead: this.heading,
      pgGuide: this.guide,
      pgShowbutton: this.showbutton
    };
  },
  props: {
    heading: String,
    showbutton: String,
    guide: String,
    addClickEvent: String
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex"><div class="flex-1 flex justify-between px-2 sm:px-2"><div class="flex-1 min-w-0"><h2 class="text-lg leading-7 font-medium">${ssrInterpolate($data.pgHead)}</h2><div><p class="text-sm leading-5 text-gray-400">${ssrInterpolate($data.pgGuide)}</p></div></div>`);
  if ($data.pgShowbutton == "true") {
    _push(`<div class="ml-2 mt-2 pr-6 flex items-center space-x-4 sm:ml-6 sm:space-x-6"><button type="button" class="zyn-button">Add</button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></header>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organization/logos/LogosPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LogosPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { LogosPageHeader as default };
