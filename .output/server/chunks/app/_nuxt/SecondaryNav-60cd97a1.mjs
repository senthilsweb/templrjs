import __nuxt_component_2$1 from './Icon-7255ab8c.mjs';
import { useSSRContext, withAsyncContext, mergeProps, unref } from 'vue';
import { p as useAsyncData, r as queryContent } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "SecondaryNav",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    api_end_point: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { data: links } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("links_" + props.api_end_point, () => {
      return queryContent().where({ _path: props.api_end_point }).findOne();
    }, "$vblitCBDSa")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-label": "Sections",
        class: "hidden flex-shrink-0 w-96 bg-white border-r border-primary-gray-200 xl:flex xl:flex-col"
      }, _attrs))}><div class="flex-shrink-0 justify-between space-x-3 h-16 px-6 border-b bg-gray-200 border-primary-200 flex items-center"><h2 class="text-lg leading-7 font-medium text-gray-700">${ssrInterpolate(__props.title)}</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "icon-park-twotone:align-text-both-one",
        class: "h-8 w-8 flex-shrink-0"
      }, null, _parent));
      _push(`</button></div></div><div class="flex-1 min-h-0 overflow-y-auto"><!--[-->`);
      ssrRenderList(unref(links).menu, (menu) => {
        _push(`<a${ssrRenderAttr("href", menu.href)} class="${ssrRenderClass([[menu.selected == true ? "text-gray-900 bg-primary-50 bg-opacity-50" : "text-gray-800", `hover:${menu.iconBackground}`], "flex p-6 border-b border-primary-200"])}" aria-current="page">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: menu.icon,
          class: "h-6 w-6 flex-shrink-0 text-lime-800"
        }, null, _parent));
        _push(`<div class="ml-3 text-sm"><p class="${ssrRenderClass([[menu.selected == true ? "font-bold" : "font-medium"], "font-medium text-gray-900"])}">${ssrInterpolate(menu.name)}</p><p class="mt-1 text-gray-500">${ssrInterpolate(menu.description)}</p></div></a>`);
      });
      _push(`<!--]--></div></nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/commons/SecondaryNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main;

export { __nuxt_component_2 as _ };
