import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, computed, unref, withCtx, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppSocialIcons",
  __ssrInlineRender: true,
  setup(__props) {
    const socials = ["twitter", "facebook", "instagram", "youtube", "github", "medium"];
    const { config } = useDocus();
    const icons = computed(() => {
      return Object.entries(config.value.socials || {}).map(([key, value]) => {
        if (typeof value === "object") {
          return value;
        } else if (typeof value === "string" && value && socials.includes(key)) {
          return {
            href: `https://${key}.com/${value}`,
            icon: `fa-brands:${key}`,
            label: value
          };
        } else {
          return null;
        }
      }).filter(Boolean);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = NuxtLink;
      const _component_Icon = __nuxt_component_2;
      _push(`<!--[-->`);
      ssrRenderList(unref(icons), (icon) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: icon.label,
          rel: "noopener noreferrer",
          title: icon.label,
          "aria-label": icon.label,
          href: icon.href,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (icon.icon) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: icon.icon
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                icon.icon ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  name: icon.icon
                }, null, 8, ["name"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-224b171c"]]);

export { __nuxt_component_6 as default };
