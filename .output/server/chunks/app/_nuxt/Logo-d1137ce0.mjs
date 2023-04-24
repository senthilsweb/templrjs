import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { E as usePropertiesStore } from '../server.mjs';

const _sfc_main = {
  __name: "Logo",
  __ssrInlineRender: true,
  props: {
    logo_url: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({ href: "/" }, _attrs))}><img tag="img" to="#" alt="Logo"${ssrRenderAttr("src", __props.logo_url ? __props.logo_url : unref(usePropertiesStore)().logo_url ? unref(usePropertiesStore)().logo_url : "/logo.svg")} class="${ssrRenderClass([unref(usePropertiesStore)().logo_css ? unref(usePropertiesStore)().logo_css : "h-10 mx-auto w-auto"])}"></a>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Icon/Logo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main;

export { __nuxt_component_1 as _ };
