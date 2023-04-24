import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import ContentSlot from './ContentSlot-51ed8bb6.mjs';
import { useSSRContext, defineComponent, useSlots, computed, h } from 'vue';
import { m as useUnwrap } from '../server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'vue/server-renderer';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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

const iconTypeMap = {
  primary: "heroicons-outline:check",
  info: "heroicons-outline:information-circle",
  success: "heroicons-outline:check-circle",
  warning: "heroicons-outline:exclamation",
  danger: "heroicons-outline:exclamation-circle"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    /**
     * Used to override the default <code>type</code> icon, check out the
     *  <a href="https://github.com/nuxt/content/tree/dev/packages/theme-docs/src/components/global/icons">icons available</a>
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * Type of list
     */
    type: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "info", "success", "warning", "danger"].includes(value)
    }
  },
  setup(props) {
    const slots = useSlots();
    const { flatUnwrap, unwrap } = useUnwrap();
    const iconName = computed(() => props.icon || iconTypeMap[props.type]);
    return () => {
      var _a;
      const items = flatUnwrap((_a = slots.default && slots.default()) != null ? _a : [], ["ul"]).map((li) => unwrap(li, ["li"]));
      return h(
        "ul",
        items.map(
          (item) => h("li", [
            h("span", { class: `list-icon ${props.type}` }, h(__nuxt_component_2, { name: iconName.value, class: "icon" })),
            h("span", h(ContentSlot, { use: () => item }))
          ])
        )
      );
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/globals/List.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f46a86d3"]]);

export { List as default };
