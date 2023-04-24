import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main = {
  components: {},
  data() {
    return {
      //lefNavLinks,
      items: this.data
    };
  },
  props: {
    api: String,
    data: Array
  },
  methods: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({
    "aria-label": "Sections",
    class: "hidden flex-shrink-0 w-96 bg-white border-r border-primary-gray-200 xl:flex xl:flex-col"
  }, _attrs))}><div class="flex-shrink-0 h-16 px-6 border-b border-primary-200 flex items-center"><p class="text-lg font-medium text-gray-900">Settings</p></div><div class="flex-1 min-h-0 overflow-y-auto"><!--[-->`);
  ssrRenderList($data.items, (menu) => {
    _push(`<!--[-->`);
    if (!menu.hidden) {
      _push(`<a${ssrRenderAttr("href", menu.link)} class="${ssrRenderClass([[menu.selected == true ? "text-primary-900 bg-primary-50 bg-opacity-50" : "text-primary-700"], "flex p-6 border-b border-primary-200"])}" aria-current="page"><svg class="text-gray-800 mr-4 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><!--[-->`);
      ssrRenderList(menu.icons, (icon, index) => {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", icon)}></path>`);
      });
      _push(`<!--]--></svg><div class="ml-3 text-sm"><p class="${ssrRenderClass([[menu.selected == true ? "font-bold" : "font-medium"], "font-medium text-primary-gray-900"])}">${ssrInterpolate(menu.title)}</p><p class="mt-1 text-gray-500">${ssrInterpolate(menu.description)}</p></div></a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></div></nav>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/management/LeftNavSecondary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_2 as _ };
