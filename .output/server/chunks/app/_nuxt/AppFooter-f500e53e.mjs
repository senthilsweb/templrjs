import __nuxt_component_0 from './Container-c39ca67d.mjs';
import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import __nuxt_component_2$1 from './Icon-7255ab8c.mjs';
import __nuxt_component_6 from './AppSocialIcons-7f7e643f.mjs';
import { u as useDocus } from './useDocus-7de053e3.mjs';
import { useSSRContext, defineComponent, ref, computed, unref, withCtx, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderVNode, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { config } = useDocus();
    const socialIcons = ref(null);
    const icons = computed(() => {
      var _a, _b;
      return ((_b = (_a = config.value) == null ? void 0 : _a.footer) == null ? void 0 : _b.iconLinks) || [];
    });
    const textLinks = computed(() => {
      var _a, _b;
      return ((_b = (_a = config.value) == null ? void 0 : _a.footer) == null ? void 0 : _b.textLinks) || [];
    });
    const socialIconsCount = computed(() => {
      var _a;
      return Object.entries(((_a = config.value) == null ? void 0 : _a.socials) || {}).filter(([_, v]) => v).length;
    });
    const nbSocialIcons = computed(() => socialIcons.value ? socialIconsCount.value : 0);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Container = __nuxt_component_0;
      const _component_NuxtLink = NuxtLink;
      const _component_Icon = __nuxt_component_2$1;
      const _component_AppSocialIcons = __nuxt_component_6;
      _push(`<footer${ssrRenderAttrs(_attrs)} data-v-b7f6389b>`);
      _push(ssrRenderComponent(_component_Container, {
        fluid: (_b = (_a = unref(config)) == null ? void 0 : _a.footer) == null ? void 0 : _b.fluid,
        padded: "",
        class: "footer-container"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
          if (_push2) {
            _push2(`<div class="left" data-v-b7f6389b${_scopeId}>`);
            if ((_b2 = (_a2 = unref(config)) == null ? void 0 : _a2.footer) == null ? void 0 : _b2.credits) {
              _push2(`<a${ssrRenderAttr("href", ((_e = (_d = (_c = unref(config)) == null ? void 0 : _c.footer) == null ? void 0 : _d.credits) == null ? void 0 : _e.href) || "#")} rel="noopener" target="_blank" data-v-b7f6389b${_scopeId}>`);
              if ((_h = (_g = (_f = unref(config)) == null ? void 0 : _f.footer) == null ? void 0 : _g.credits) == null ? void 0 : _h.icon) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent((_k = (_j = (_i = unref(config)) == null ? void 0 : _i.footer) == null ? void 0 : _j.credits) == null ? void 0 : _k.icon), { class: "left-icon" }, null), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if ((_n = (_m = (_l = unref(config)) == null ? void 0 : _l.footer) == null ? void 0 : _m.credits) == null ? void 0 : _n.text) {
                _push2(`<p data-v-b7f6389b${_scopeId}>${ssrInterpolate(unref(config).footer.credits.text)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="center" data-v-b7f6389b${_scopeId}><!--[-->`);
            ssrRenderList(unref(textLinks), (link) => {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                key: link.href,
                class: "text-link",
                "aria-label": link.text,
                href: link.href,
                target: link.target || "_self"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(link.text)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(link.text), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="right" data-v-b7f6389b${_scopeId}><!--[-->`);
            ssrRenderList(unref(icons).slice(0, 6 - unref(nbSocialIcons)), (icon) => {
              _push2(`<a class="icon-link" rel="noopener"${ssrRenderAttr("aria-label", icon.label)}${ssrRenderAttr("href", icon.href)} target="_blank" data-v-b7f6389b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: icon.icon
              }, null, _parent2, _scopeId));
              _push2(`</a>`);
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_AppSocialIcons, {
              ref_key: "socialIcons",
              ref: socialIcons
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "left" }, [
                ((_p = (_o = unref(config)) == null ? void 0 : _o.footer) == null ? void 0 : _p.credits) ? (openBlock(), createBlock("a", {
                  key: 0,
                  href: ((_s = (_r = (_q = unref(config)) == null ? void 0 : _q.footer) == null ? void 0 : _r.credits) == null ? void 0 : _s.href) || "#",
                  rel: "noopener",
                  target: "_blank"
                }, [
                  ((_v = (_u = (_t = unref(config)) == null ? void 0 : _t.footer) == null ? void 0 : _u.credits) == null ? void 0 : _v.icon) ? (openBlock(), createBlock(resolveDynamicComponent((_y = (_x = (_w = unref(config)) == null ? void 0 : _w.footer) == null ? void 0 : _x.credits) == null ? void 0 : _y.icon), {
                    key: 0,
                    class: "left-icon"
                  })) : createCommentVNode("", true),
                  ((_B = (_A = (_z = unref(config)) == null ? void 0 : _z.footer) == null ? void 0 : _A.credits) == null ? void 0 : _B.text) ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(config).footer.credits.text), 1)) : createCommentVNode("", true)
                ], 8, ["href"])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "center" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(textLinks), (link) => {
                  return openBlock(), createBlock(_component_NuxtLink, {
                    key: link.href,
                    class: "text-link",
                    "aria-label": link.text,
                    href: link.href,
                    target: link.target || "_self"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(link.text), 1)
                    ]),
                    _: 2
                  }, 1032, ["aria-label", "href", "target"]);
                }), 128))
              ]),
              createVNode("div", { class: "right" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(icons).slice(0, 6 - unref(nbSocialIcons)), (icon) => {
                  return openBlock(), createBlock("a", {
                    key: icon.label,
                    class: "icon-link",
                    rel: "noopener",
                    "aria-label": icon.label,
                    href: icon.href,
                    target: "_blank"
                  }, [
                    createVNode(_component_Icon, {
                      name: icon.icon
                    }, null, 8, ["name"])
                  ], 8, ["aria-label", "href"]);
                }), 128)),
                createVNode(_component_AppSocialIcons, {
                  ref_key: "socialIcons",
                  ref: socialIcons
                }, null, 512)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7f6389b"]]);

export { __nuxt_component_2 as default };
