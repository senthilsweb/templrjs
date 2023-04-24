import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { h as useRoute, f as useState } from '../server.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideTree",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    parent: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const route = useRoute();
    const { config } = useDocus();
    const collapsedMap = useState(`docus-docs-aside-collapse-map-${((_a = props.parent) == null ? void 0 : _a._path) || "/"}`, () => {
      if (props.level === 0) {
        return {};
      }
      return props.links.filter((link) => !!link.children).reduce((map, link) => {
        map[link._path] = true;
        return map;
      }, {});
    });
    const isActive = (link) => {
      return route.path === link._path;
    };
    const isCollapsed = (link) => {
      var _a2, _b, _c, _d;
      if (link.children) {
        if (typeof collapsedMap.value[link._path] !== "undefined") {
          return collapsedMap.value[link._path];
        }
        if ([true, false].includes((_a2 = link == null ? void 0 : link.aside) == null ? void 0 : _a2.collapsed)) {
          return link.aside.collapsed;
        }
        if (link == null ? void 0 : link.collapsed) {
          return link == null ? void 0 : link.collapsed;
        }
        if ((_c = (_b = config == null ? void 0 : config.value) == null ? void 0 : _b.aside) == null ? void 0 : _c.collapsed) {
          return (_d = config.value.aside) == null ? void 0 : _d.collapsed;
        }
      }
      return false;
    };
    const hasNesting = computed(() => props.links.some((link) => link.children));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_NuxtLink = NuxtLink;
      const _component_DocsAsideTree = __nuxt_component_0;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "docs-aside-tree" }, _attrs))} data-v-218d4f50><!--[-->`);
      ssrRenderList(__props.links, (link) => {
        var _a2, _b, _c, _d, _e;
        _push(`<li class="${ssrRenderClass({
          "has-parent-icon": (_a2 = __props.parent) == null ? void 0 : _a2.icon,
          "has-children": __props.level > 0 && link.children,
          "bordered": __props.level > 0 || !unref(hasNesting),
          "active": isActive(link)
        })}" data-v-218d4f50>`);
        if (link.children) {
          _push(`<button class="title-collapsible-button" data-v-218d4f50><span class="content" data-v-218d4f50>`);
          if (((_b = link == null ? void 0 : link.navigation) == null ? void 0 : _b.icon) || link.icon) {
            _push(ssrRenderComponent(_component_Icon, {
              name: ((_c = link == null ? void 0 : link.navigation) == null ? void 0 : _c.icon) || link.icon,
              class: "icon"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-218d4f50>${ssrInterpolate(((_d = link == null ? void 0 : link.navigation) == null ? void 0 : _d.title) || link.title || link._path)}</span></span><span data-v-218d4f50>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: isCollapsed(link) ? "lucide:chevrons-up-down" : "lucide:chevrons-down-up",
            class: "collapsible-icon"
          }, null, _parent));
          _push(`</span></button>`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: link.redirect ? link.redirect : link._path,
            class: ["link", {
              "padded": __props.level > 0 || !unref(hasNesting),
              "active": isActive(link)
            }],
            exact: link.exact
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b2, _c2, _d2, _e2, _f;
              if (_push2) {
                _push2(`<span class="content" data-v-218d4f50${_scopeId}>`);
                if (((_a3 = link == null ? void 0 : link.navigation) == null ? void 0 : _a3.icon) || link.icon) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: ((_b2 = link == null ? void 0 : link.navigation) == null ? void 0 : _b2.icon) || link.icon,
                    class: "icon"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span data-v-218d4f50${_scopeId}>${ssrInterpolate(((_c2 = link == null ? void 0 : link.navigation) == null ? void 0 : _c2.title) || link.title || link._path)}</span></span>`);
              } else {
                return [
                  createVNode("span", { class: "content" }, [
                    ((_d2 = link == null ? void 0 : link.navigation) == null ? void 0 : _d2.icon) || link.icon ? (openBlock(), createBlock(_component_Icon, {
                      key: 0,
                      name: ((_e2 = link == null ? void 0 : link.navigation) == null ? void 0 : _e2.icon) || link.icon,
                      class: "icon"
                    }, null, 8, ["name"])) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(((_f = link == null ? void 0 : link.navigation) == null ? void 0 : _f.title) || link.title || link._path), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        if (((_e = link.children) == null ? void 0 : _e.length) && (__props.max === null || __props.level + 1 < __props.max)) {
          _push(ssrRenderComponent(_component_DocsAsideTree, {
            style: !isCollapsed(link) ? null : { display: "none" },
            links: link.children,
            level: __props.level + 1,
            parent: link,
            max: __props.max,
            class: "recursive"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-218d4f50"]]);

export { __nuxt_component_0 as default };
