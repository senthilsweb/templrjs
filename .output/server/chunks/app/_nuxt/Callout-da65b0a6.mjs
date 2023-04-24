import ContentSlot from './ContentSlot-51ed8bb6.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import 'ufo';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Callout",
  __ssrInlineRender: true,
  props: {
    /**
     * @values info, success, warning, danger
     */
    type: {
      type: String,
      default: "info",
      validator(value) {
        return ["info", "success", "warning", "danger", "primary"].includes(value);
      }
    },
    modelValue: {
      required: false,
      default: () => ref(false)
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const isOpen = ref(props.modelValue);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentSlot = ContentSlot;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["callout", [__props.type]]
      }, _attrs))} data-v-37e0bf51><span class="preview" data-v-37e0bf51><span class="summary" data-v-37e0bf51>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.summary
      }, null, _parent));
      _push(`</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons-outline:chevron-right",
        class: ["icon", [unref(isOpen) && "rotate"]]
      }, null, _parent));
      _push(`</span><div style="${ssrRenderStyle(unref(isOpen) ? null : { display: "none" })}" class="content" data-v-37e0bf51>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.content
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/globals/Callout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Callout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-37e0bf51"]]);

export { Callout as default };
