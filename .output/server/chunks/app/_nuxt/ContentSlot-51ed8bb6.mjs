import { useSSRContext, defineComponent, getCurrentInstance, useSlots, computed, h } from 'vue';
import { m as useUnwrap } from '../server.mjs';
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
import 'vue/server-renderer';
import 'lodash-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "ContentSlot",
  functional: true,
  props: {
    /**
      * A slot name or function
     */
    use: {
      type: Function,
      default: void 0
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {
    const { parent } = getCurrentInstance();
    const { between, default: fallbackSlot } = useSlots();
    const tags = computed(() => {
      if (typeof props.unwrap === "string") {
        return props.unwrap.split(" ");
      }
      return ["*"];
    });
    return {
      fallbackSlot,
      tags,
      between,
      parent
    };
  },
  render({ use, unwrap, fallbackSlot, between, tags, parent }) {
    var _a;
    try {
      let slot = use;
      if (typeof use === "string") {
        slot = (parent == null ? void 0 : parent.slots[use]) || ((_a = parent == null ? void 0 : parent.parent) == null ? void 0 : _a.slots[use]);
        console.warn(`Please set :use="$slots.${use}" in <ContentSlot> component to enable reactivity`);
      }
      if (!slot) {
        return fallbackSlot ? fallbackSlot() : h("div");
      }
      if (!unwrap) {
        return [slot()];
      }
      const { flatUnwrap } = useUnwrap();
      const unwrapped = flatUnwrap(slot(), tags);
      if (between) {
        return unwrapped.flatMap(
          (vnode, index) => index === 0 ? [vnode] : [between(), vnode]
        );
      }
      return unwrapped.reduce((acc, item) => {
        if (typeof item.children === "string") {
          if (typeof acc[acc.length - 1] === "string") {
            acc[acc.length - 1] += item.children;
          } else {
            acc.push(item.children);
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    } catch (e) {
      return h("div");
    }
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContentSlot = _sfc_main;

export { ContentSlot as default };
