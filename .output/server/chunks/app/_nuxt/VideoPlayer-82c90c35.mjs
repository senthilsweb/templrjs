import _sfc_main$1 from './NuxtImg-94a7d593.mjs';
import { useSSRContext, defineComponent, computed, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VideoPlayer",
  __ssrInlineRender: true,
  props: {
    poster: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    sources: {
      type: Array,
      default: () => []
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const provider = computed(() => {
      if (props.src && props.src.includes("youtube.com/watch")) {
        const match = props.src.match(/\?v=([^&]*)/);
        return {
          name: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${(match == null ? void 0 : match[1]) || ""}?autoplay=1`,
          poster: props.poster || `https://i3.ytimg.com/vi/${(match == null ? void 0 : match[1]) || ""}/hqdefault.jpg`
        };
      }
    });
    const loaded = ref(false);
    if (!props.src && !props.sources.length) {
      throw new Error("VideoPlayer: you need to provide either `src` or `sources` props");
    }
    const src = computed(() => {
      var _a, _b;
      return props.src || ((_b = (_a = props.sources) == null ? void 0 : _a[0]) == null ? void 0 : _b.src) || false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["video-player", { loaded: unref(loaded) }]
      }, _attrs))} data-v-cfa5f079>`);
      if (unref(provider) ? unref(provider).poster : __props.poster) {
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(provider) ? unref(provider).poster : __props.poster
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(loaded)) {
        _push(`<div class="loaded" data-v-cfa5f079>`);
        if (!unref(provider)) {
          _push(`<video${ssrRenderAttr("poster", __props.poster)} controls autoplay data-v-cfa5f079>`);
          if (unref(src)) {
            _push(`<source${ssrRenderAttr("src", unref(src))} data-v-cfa5f079>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(__props.sources, (source) => {
            _push(`<source${ssrRenderAttr("src", source.src || source)}${ssrRenderAttr("type", source.type)} data-v-cfa5f079>`);
          });
          _push(`<!--]--></video>`);
        } else if (unref(provider).name === "youtube") {
          _push(`<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"${ssrIncludeBooleanAttr(__props.autoplay) ? " autoplay" : ""}${ssrRenderAttr("src", unref(provider).src)} data-v-cfa5f079></iframe>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loaded)) {
        _push(`<div class="play-button" data-v-cfa5f079><button data-v-cfa5f079></button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfa5f079"]]);

export { __nuxt_component_3 as default };
