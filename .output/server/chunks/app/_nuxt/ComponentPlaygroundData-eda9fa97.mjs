import __nuxt_component_0 from './TabsHeader-6c552869.mjs';
import __nuxt_component_1 from './ComponentPlaygroundProps-44da5d2f.mjs';
import _sfc_main$1 from './ComponentPlaygroundSlots-0dbd767a.mjs';
import _sfc_main$2 from './ComponentPlaygroundTokens-548a0a2d.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as useVModel } from './index-fccd5feb.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import './ProseH4-6ac4a84c.mjs';
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
import './ProseCodeInline-7380c63e.mjs';
import './Badge-6b0751b1.mjs';
import './ContentSlot-51ed8bb6.mjs';
import './ProseP-a278c4f1.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComponentPlaygroundData",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      required: false,
      default: () => ({})
    },
    componentData: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const formData = useVModel(props, "modelValue", emits);
    const activeTabIndex = ref(0);
    const tabs = [
      {
        label: "Props"
      },
      {
        label: "Slots"
      },
      {
        label: "Design Tokens"
      }
    ];
    const updateTab = (i) => activeTabIndex.value = i;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TabsHeader = __nuxt_component_0;
      const _component_ComponentPlaygroundProps = __nuxt_component_1;
      const _component_ComponentPlaygroundSlots = _sfc_main$1;
      const _component_ComponentPlaygroundTokens = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "component-playground-data" }, _attrs))} data-v-ff75821c>`);
      _push(ssrRenderComponent(_component_TabsHeader, {
        "active-tab-index": unref(activeTabIndex),
        tabs,
        "onUpdate:activeTabIndex": updateTab
      }, null, _parent));
      if (unref(activeTabIndex) === 0) {
        _push(ssrRenderComponent(_component_ComponentPlaygroundProps, {
          modelValue: unref(formData),
          "onUpdate:modelValue": ($event) => isRef(formData) ? formData.value = $event : null,
          "component-data": __props.componentData
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTabIndex) === 1) {
        _push(ssrRenderComponent(_component_ComponentPlaygroundSlots, { "component-data": __props.componentData }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTabIndex) === 2) {
        _push(ssrRenderComponent(_component_ComponentPlaygroundTokens, { "component-data": __props.componentData }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ComponentPlaygroundData = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff75821c"]]);

export { ComponentPlaygroundData as default };
