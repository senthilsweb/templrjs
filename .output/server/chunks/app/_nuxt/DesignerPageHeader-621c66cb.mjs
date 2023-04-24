import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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
  },
  methods: {
    created() {
    },
    beforeMount() {
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex"><div class="flex-1 flex justify-between px-2 sm:px-2"></div></div></header>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/utilities/designer/DesignerPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DesignerPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { DesignerPageHeader as default };
