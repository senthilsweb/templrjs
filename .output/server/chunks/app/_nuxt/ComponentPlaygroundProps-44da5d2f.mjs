import __nuxt_component_0 from './ProseH4-6ac4a84c.mjs';
import __nuxt_component_1$1 from './ProseCodeInline-7380c63e.mjs';
import __nuxt_component_2 from './Badge-6b0751b1.mjs';
import __nuxt_component_3 from './ProseP-a278c4f1.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a as useVModel } from './index-fccd5feb.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import './nuxt-link-fccebd7d.mjs';
import 'ufo';
import '../server.mjs';
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
import './Icon-7255ab8c.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './ContentSlot-51ed8bb6.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComponentPlaygroundProps",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    componentData: {
      type: Object,
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const formData = useVModel(props, "modelValue", emits);
    const componentProps = computed(() => {
      var _a, _b;
      return (_b = (_a = props == null ? void 0 : props.componentData) == null ? void 0 : _a.meta) == null ? void 0 : _b.props;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProseH4 = __nuxt_component_0;
      const _component_ProseCodeInline = __nuxt_component_1$1;
      const _component_Badge = __nuxt_component_2;
      const _component_ProseP = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "component-playground-data-section" }, _attrs))} data-v-acf5a6ce><!--[-->`);
      ssrRenderList(unref(componentProps), (prop) => {
        _push(`<div data-v-acf5a6ce><div${ssrRenderAttr("id", prop.name)} class="prop-title" data-v-acf5a6ce>`);
        _push(ssrRenderComponent(_component_ProseH4, {
          id: prop.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(prop.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(prop.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span data-v-acf5a6ce>`);
        _push(ssrRenderComponent(_component_ProseCodeInline, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(prop.type)}`);
            } else {
              return [
                createTextVNode(toDisplayString(prop.type), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (!prop.required) {
          _push(ssrRenderComponent(_component_Badge, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Required `);
              } else {
                return [
                  createTextVNode(" Required ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</span></div>`);
        if (prop.description) {
          _push(ssrRenderComponent(_component_ProseP, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(prop.description)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(prop.description), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<input${ssrRenderAttr("value", unref(formData)[prop.name])} data-v-acf5a6ce></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-acf5a6ce"]]);

export { __nuxt_component_1 as default };
