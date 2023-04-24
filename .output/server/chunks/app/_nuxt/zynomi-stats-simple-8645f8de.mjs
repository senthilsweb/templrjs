import { isObject, capitalize, lowerCase } from 'lodash-es';
import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';

const _sfc_main$1 = {
  __name: "ZynomiDynamicDataDisplay",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: false
    },
    title_description: {
      type: String,
      required: false
    },
    api_end_point: {
      type: String,
      required: false
    },
    data: {
      type: Object,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden bg-white shadow sm:rounded-lg" }, _attrs))}><div class="px-4 py-5 sm:px-6"><h3 class="text-base font-semibold leading-6 text-gray-900">${ssrInterpolate(props.title ? props.title : "")}</h3><p class="mt-1 max-w-2xl text-sm text-gray-500">${ssrInterpolate(props.title_description ? props.title_description : "")}</p></div><div class="border-t border-gray-200"><dl class="mt-2 divide-y divide-gray-200 border-b border-gray-200"><!--[-->`);
      ssrRenderList(Object.keys(props.data), (key, idx) => {
        _push(`<div class="${ssrRenderClass([idx % 2 == 0 ? "bg-white" : "bg-gray-50", "px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"])}">`);
        if (!("isObject" in _ctx ? _ctx.isObject : unref(isObject))(props.data[key])) {
          _push(`<!--[--><dt class="text-sm font-medium whitespace-nowrap text-gray-900">${ssrInterpolate(("useCapitalize" in _ctx ? _ctx.useCapitalize : unref(capitalize))(("useLowerCase" in _ctx ? _ctx.useLowerCase : unref(lowerCase))(key)))}</dt><dd class="mt-1 mx-10 text-sm text-gray-500 sm:col-span-2 sm:mt-0">${ssrInterpolate(props.data[key])}</dd><!--]-->`);
        } else if (("isObject" in _ctx ? _ctx.isObject : unref(isObject))(props.data[key])) {
          _push(`<!--[--><dt class="text-sm font-medium text-gray-900">${ssrInterpolate(("useCapitalize" in _ctx ? _ctx.useCapitalize : unref(capitalize))(("useLowerCase" in _ctx ? _ctx.useLowerCase : unref(lowerCase))(key)))}</dt><dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"><dl class="mt-2 divide-y divide-gray-200 border-b border-gray-200"><!--[-->`);
          ssrRenderList(Object.keys(props.data[key]), (key2, idx2) => {
            _push(`<div class="${ssrRenderClass([idx2 % 2 == 0 ? "bg-white" : "bg-gray-50", "py-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"])}"><dt class="text-sm font-medium whitespace-nowrap text-gray-900">${ssrInterpolate(("useCapitalize" in _ctx ? _ctx.useCapitalize : unref(capitalize))(("useLowerCase" in _ctx ? _ctx.useLowerCase : unref(lowerCase))(key2)))}</dt><dd class="mt-1 text-sm text-gray-500 sm:col-span-1 sm:mt-0">${ssrInterpolate(props.data[key][key2])}</dd></div>`);
          });
          _push(`<!--]--></dl></dd><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></dl></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ZynomiDynamicDataDisplay.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main$1;
const _sfc_main = {
  __name: "zynomi-stats-simple",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: false
    },
    api_end_point: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      _push(`<dl${ssrRenderAttrs(mergeProps({ class: "mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" }, _attrs))}><!--[-->`);
      ssrRenderList(props.data, (item, index) => {
        _push(`<div>`);
        if (!item.hidden) {
          _push(`<div><div class="${ssrRenderClass([[item.links ? "pb-12" : ""], "relative bg-white pt-6 px-6 shadow overflow-hidden"])}"><dt><div class="${ssrRenderClass([item.iconBackground, item.iconForeground, "absolute rounded-lg p-3 ring-4 ring-white"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: item.icon,
            class: "h-6 w-6"
          }, null, _parent));
          _push(`</div><p class="ml-16 text-md font-medium text-gray-500 truncate">${ssrInterpolate(item.title)}</p></dt><dd class="ml-16 pb-6 flex items-baseline sm:pb-7"><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(_ctx.$s.isBlank(item.value) ? "\xA0" : item.value)}</p>`);
          if (item.links) {
            _push(`<div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6"><div class="relative flex items-start"><div class="flex items-center h-5"><ul><!--[-->`);
            ssrRenderList(item.links, (link, index2) => {
              _push(`<li class="text-sm"><a href="#" class="font-medium text-primary-600 hover:text-primary-500">${ssrInterpolate(link.title)}<span class="sr-only">${ssrInterpolate(link.title)}</span></a></li>`);
            });
            _push(`<!--]--></ul></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</dd></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></dl>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/zynomi-stats-simple.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main;

export { __nuxt_component_3 as _, __nuxt_component_4 as a };
