import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import { _ as __nuxt_component_1$2 } from './Logo-d1137ce0.mjs';
import __nuxt_component_2$2 from './Icon-7255ab8c.mjs';
import { defineComponent, ref, unref, useSSRContext, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, Transition, createTextVNode, withModifiers, withDirectives, vModelText, createElementBlock, createElementVNode } from 'vue';
import { h as useRoute, H as useCompanyStore, E as usePropertiesStore, D as useNavigationsStore, f as useState, d as useNuxtApp, K as useCountryStore, F as useFetch } from '../server.mjs';
import { sortBy } from 'lodash-es';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderVNode, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { Popover, PopoverPanel, TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue';
import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { r as render$1 } from './XMarkIcon-293bebc4.mjs';
import 'ufo';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
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

function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
      "clip-rule": "evenodd"
    })
  ]);
}
const _sfc_main$7 = {
  __name: "ZynomiFooterLinks",
  __ssrInlineRender: true,
  props: ["module_name"],
  setup(__props) {
    const props = __props;
    const footer_links = useNavigationsStore().navigatioins_by_module(props.module_name);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 gap-8 xl:col-span-2" }, _attrs))}><div class="grid auto-cols-max gap-y-8 md:gap-x-2 lg:gap-x-8 lg:grid-flow-col"><!--[-->`);
      ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(unref(footer_links), ["sort_order"]), (item, idx) => {
        _push(`<div class=""><h4 class="text-md leading-5 font-bold tracking-wider text-white uppercase">${ssrInterpolate(item.name)}</h4><ul class="mt-4"><!--[-->`);
        ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(item.children, ["sort_order"]), (sm) => {
          _push(`<li class="mt-4"><a${ssrRenderAttr("href", sm.href)} class="text-base leading-6 text-white hover:text-primary-500">${ssrInterpolate(sm.name)}</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ZynomiFooterLinks.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$1 = _sfc_main$7;
const _sfc_main$6 = {
  __name: "ZynomiContactUs",
  __ssrInlineRender: true,
  props: ["organization"],
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      if (props.organization) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-flow-row auto-rows-max" }, _attrs))}><div class="mt-8 xl:mt-0 bg-primary-600 pl-6 pr-4 pb-2 rounded-xl"><div class="md:grid md:grid-cols-1"><div class=""><dl class="mt-2 text-base text-white"><div><h4 class="text-md leading-5 font-bold tracking-wider text-white uppercase pt-4 lg:pt-0">Contact Us</h4><dt class="sr-only">Postal address</dt><dd class="pt-3"><p>${ssrInterpolate(props.organization.company_name)}</p><p>${ssrInterpolate(props.organization.address.apartment)} ${ssrInterpolate(props.organization.address.street)}</p><p>${ssrInterpolate(props.organization.address.city)} - ${ssrInterpolate(props.organization.address.postal_code)}</p><p>${ssrInterpolate(props.organization.address.state)} ${ssrInterpolate(props.organization.address.country_name)}</p></dd><dt class="sr-only">Phone number</dt><dd class="flex"><svg class="flex-shrink-0 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><span class="ml-3">${ssrInterpolate(props.organization.phone_number)}</span></dd><dt class="sr-only">Email</dt><dd class="flex"><svg class="flex-shrink-0 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><span class="ml-3">${ssrInterpolate(props.organization.company_email)}</span></dd></div></dl></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ZynomiContactUs.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1$1 = _sfc_main$6;
const _sfc_main$5 = {
  __name: "ZynomiSocialLinks",
  __ssrInlineRender: true,
  props: ["module_name"],
  setup(__props) {
    const props = __props;
    const social_links = useNavigationsStore().navigatioins_by_module(props.module_name);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex md:order-2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(social_links), (link) => {
        _push(`<a${ssrRenderAttr("href", link.href)} class="ml-6 text-white hover:text-primary-500"><span class="sr-only">${ssrInterpolate(link.name)}</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: link.icon,
          class: "h-6 w-6"
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ZynomiSocialLinks.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2$1 = _sfc_main$5;
const _sfc_main$4 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ZynomiFooterLinks = __nuxt_component_0$1;
      const _component_ZynomiContactUs = __nuxt_component_1$1;
      const _component_ZynomiSocialLinks = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-footer-900 via-primary-800 to-footer-900 ... lg:max-w-8xl" }, _attrs))}><div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"><div class="xl:grid xl:grid-cols-3 xl:gap-3">`);
      _push(ssrRenderComponent(_component_ZynomiFooterLinks, { module_name: "footer-links" }, null, _parent));
      _push(ssrRenderComponent(_component_ZynomiContactUs, {
        organization: unref(useCompanyStore)().organization
      }, null, _parent));
      _push(`</div><div class="mt-8 border-t border-white pt-8 md:flex md:items-center md:justify-between">`);
      _push(ssrRenderComponent(_component_ZynomiSocialLinks, { module_name: "social-media-links" }, null, _parent));
      _push(`<p class="mt-8 text-white text-base leading-6 md:mt-0 md:order-1">${ssrInterpolate(unref(usePropertiesStore)().app_copyright)}</p></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const navs = useNavigationsStore().navigatioins_by_module("landing-page");
    useState("isVisible", () => ref({}));
    navs.forEach((item) => {
      useState("isVisible").value[item.name] = false;
    });
    const buttons = sortBy(useNavigationsStore().navigatioins_by_module("landing-page"), ["sort_order"]);
    useState("isMobileNavVisible", () => ref(false));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = NuxtLink;
      const _component_IconLogo = __nuxt_component_1$2;
      const _component_Icon = __nuxt_component_2$2;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["sticky top-0 z-50 flex flex-wrap items-center justify-between px-4 py-5 transition duration-500 sm:px-6 lg:px-8 h-20", [unref(usePropertiesStore)().megamenu_bg_color ? unref(usePropertiesStore)().megamenu_bg_color : "bg-white", unref(usePropertiesStore)().layout_width ? unref(usePropertiesStore)().layout_width : "lg:max-w-8xl"]]
      }, _attrs))}><div class="relative flex flex-grow basis-0 items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_IconLogo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_IconLogo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-4 md:ml-4 md:flex -my-5 mr-6 sm:mr-8 md:mr-0"><!--[-->`);
      ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(unref(navs), ["sort_order"]), (menu, idx) => {
        _push(`<div>`);
        if (menu.children && menu.is_active) {
          _push(`<div><div class="flex items-center"><a${ssrRenderAttr("href", menu.href)} class="${ssrRenderClass([[unref(usePropertiesStore)().megamenu_text_style ? unref(usePropertiesStore)().megamenu_text_style : "text-gray-600 hover:bg-gray-200"], "inline-flex items-center rounded-full px-3 py-2 text-lg font-semibold hover:text-primary-700"])}">${ssrInterpolate(menu.name)} `);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(render), {
            class: "h-6 w-6",
            "aria-hidden": "true"
          }, null), _parent);
          _push(`</a>`);
          _push(ssrRenderComponent(unref(Popover), { class: "relative" }, {
            default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(``);
                if (("useState" in _ctx ? _ctx.useState : unref(useState))("isVisible").value[menu.name]) {
                  _push2(ssrRenderComponent(unref(PopoverPanel), {
                    class: ["absolute left-1/2 z-50 mt-3 w-screen max-w-md -translate-x-1/2 transform py-4 px-2 sm:px-0", [unref(usePropertiesStore)().megamenu_popover_style == "narrow" ? "lg:max-sm" : "lg:max-w-2xl"]],
                    static: ""
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="${ssrRenderClass([[unref(usePropertiesStore)().megamenu_bg_color ? "rounded-xl" : "rounded-b-xl"], "overflow-hidden shadow-xl"])}"${_scopeId2}><div class="${ssrRenderClass([[unref(usePropertiesStore)().megamenu_popover_style == "narrow" ? "" : "lg:grid-cols-2"], "relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"])}"${_scopeId2}><!--[-->`);
                        ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(menu.children, ["sort_order"]), (item) => {
                          _push3(`<div${_scopeId2}>`);
                          if (item.is_footer_description == false) {
                            _push3(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([[item.selected == true ? "text-gray-900 bg-primary-50 bg-opacity-50" : "text-gray-800", `hover:${item.iconBackground}`], "-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out"])}"${_scopeId2}>`);
                            if (item.icon) {
                              _push3(`<div class="bg-primary-50 rounded-lg inline-flex p-3"${_scopeId2}>`);
                              _push3(ssrRenderComponent(_component_Icon, {
                                name: item.icon,
                                class: "h-6 w-6 flex-shrink-0 text-primary-600"
                              }, null, _parent3, _scopeId2));
                              _push3(`</div>`);
                            } else {
                              _push3(`<!---->`);
                            }
                            _push3(`<div class="ml-4"${_scopeId2}><p class="text-small font-normal text-gray-800 hover:text-primary-700"${_scopeId2}>${ssrInterpolate(item.name)}</p><p class="mt-1 text-sm text-gray-500 hover:text-primary-600"${_scopeId2}>${ssrInterpolate(item.description)}</p></div></a>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        });
                        _push3(`<!--]--></div><!--[-->`);
                        ssrRenderList(menu.children, (item) => {
                          _push3(`<div${_scopeId2}>`);
                          if (item.is_footer_description) {
                            _push3(`<div class="bg-primary-600 p-5 sm:p-8"${_scopeId2}><a${ssrRenderAttr("href", item.href)} class="-m-3 flow-root rounded-md p-3 transition duration-150 ease-in-out"${_scopeId2}><span class="flex items-center"${_scopeId2}><span class="text-lg font-bold text-white hover:text-primary-300"${_scopeId2}>${ssrInterpolate(item.name)}</span></span><span class="mt-1 block text-sm text-white"${_scopeId2}>${ssrInterpolate(item.description)}</span></a></div>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: ["overflow-hidden shadow-xl", [unref(usePropertiesStore)().megamenu_bg_color ? "rounded-xl" : "rounded-b-xl"]]
                          }, [
                            createVNode("div", {
                              class: ["relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8", [unref(usePropertiesStore)().megamenu_popover_style == "narrow" ? "" : "lg:grid-cols-2"]]
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(menu.children, ["sort_order"]), (item) => {
                                return openBlock(), createBlock("div", null, [
                                  item.is_footer_description == false ? (openBlock(), createBlock("a", {
                                    key: item.code,
                                    href: item.href,
                                    class: ["-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out", [item.selected == true ? "text-gray-900 bg-primary-50 bg-opacity-50" : "text-gray-800", `hover:${item.iconBackground}`]]
                                  }, [
                                    item.icon ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "bg-primary-50 rounded-lg inline-flex p-3"
                                    }, [
                                      createVNode(_component_Icon, {
                                        name: item.icon,
                                        class: "h-6 w-6 flex-shrink-0 text-primary-600"
                                      }, null, 8, ["name"])
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", { class: "ml-4" }, [
                                      createVNode("p", { class: "text-small font-normal text-gray-800 hover:text-primary-700" }, toDisplayString(item.name), 1),
                                      createVNode("p", { class: "mt-1 text-sm text-gray-500 hover:text-primary-600" }, toDisplayString(item.description), 1)
                                    ])
                                  ], 10, ["href"])) : createCommentVNode("", true)
                                ]);
                              }), 256))
                            ], 2),
                            (openBlock(true), createBlock(Fragment, null, renderList(menu.children, (item) => {
                              return openBlock(), createBlock("div", null, [
                                item.is_footer_description ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "bg-primary-600 p-5 sm:p-8"
                                }, [
                                  createVNode("a", {
                                    href: item.href,
                                    class: "-m-3 flow-root rounded-md p-3 transition duration-150 ease-in-out"
                                  }, [
                                    createVNode("span", { class: "flex items-center" }, [
                                      createVNode("span", { class: "text-lg font-bold text-white hover:text-primary-300" }, toDisplayString(item.name), 1)
                                    ]),
                                    createVNode("span", { class: "mt-1 block text-sm text-white" }, toDisplayString(item.description), 1)
                                  ], 8, ["href"])
                                ])) : createCommentVNode("", true)
                              ]);
                            }), 256))
                          ], 2)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode(Transition, {
                    "enter-active-class": "transition ease-out duration-200",
                    "enter-from-class": "opacity-0 translate-y-1",
                    "enter-to-class": "opacity-100 translate-y-0",
                    "leave-active-class": "transition ease-in duration-150",
                    "leave-from-class": "opacity-100 translate-y-0",
                    "leave-to-class": "opacity-0 translate-y-1"
                  }, {
                    default: withCtx(() => [
                      ("useState" in _ctx ? _ctx.useState : unref(useState))("isVisible").value[menu.name] ? (openBlock(), createBlock(unref(PopoverPanel), {
                        key: 0,
                        class: ["absolute left-1/2 z-50 mt-3 w-screen max-w-md -translate-x-1/2 transform py-4 px-2 sm:px-0", [unref(usePropertiesStore)().megamenu_popover_style == "narrow" ? "lg:max-sm" : "lg:max-w-2xl"]],
                        static: ""
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: ["overflow-hidden shadow-xl", [unref(usePropertiesStore)().megamenu_bg_color ? "rounded-xl" : "rounded-b-xl"]]
                          }, [
                            createVNode("div", {
                              class: ["relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8", [unref(usePropertiesStore)().megamenu_popover_style == "narrow" ? "" : "lg:grid-cols-2"]]
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(menu.children, ["sort_order"]), (item) => {
                                return openBlock(), createBlock("div", null, [
                                  item.is_footer_description == false ? (openBlock(), createBlock("a", {
                                    key: item.code,
                                    href: item.href,
                                    class: ["-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out", [item.selected == true ? "text-gray-900 bg-primary-50 bg-opacity-50" : "text-gray-800", `hover:${item.iconBackground}`]]
                                  }, [
                                    item.icon ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "bg-primary-50 rounded-lg inline-flex p-3"
                                    }, [
                                      createVNode(_component_Icon, {
                                        name: item.icon,
                                        class: "h-6 w-6 flex-shrink-0 text-primary-600"
                                      }, null, 8, ["name"])
                                    ])) : createCommentVNode("", true),
                                    createVNode("div", { class: "ml-4" }, [
                                      createVNode("p", { class: "text-small font-normal text-gray-800 hover:text-primary-700" }, toDisplayString(item.name), 1),
                                      createVNode("p", { class: "mt-1 text-sm text-gray-500 hover:text-primary-600" }, toDisplayString(item.description), 1)
                                    ])
                                  ], 10, ["href"])) : createCommentVNode("", true)
                                ]);
                              }), 256))
                            ], 2),
                            (openBlock(true), createBlock(Fragment, null, renderList(menu.children, (item) => {
                              return openBlock(), createBlock("div", null, [
                                item.is_footer_description ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "bg-primary-600 p-5 sm:p-8"
                                }, [
                                  createVNode("a", {
                                    href: item.href,
                                    class: "-m-3 flow-root rounded-md p-3 transition duration-150 ease-in-out"
                                  }, [
                                    createVNode("span", { class: "flex items-center" }, [
                                      createVNode("span", { class: "text-lg font-bold text-white hover:text-primary-300" }, toDisplayString(item.name), 1)
                                    ]),
                                    createVNode("span", { class: "mt-1 block text-sm text-white" }, toDisplayString(item.description), 1)
                                  ], 8, ["href"])
                                ])) : createCommentVNode("", true)
                              ]);
                            }), 256))
                          ], 2)
                        ]),
                        _: 2
                      }, 1032, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!menu.is_action_button && !menu.children && menu.is_active) {
          _push(`<div class="flex items-center"><a${ssrRenderAttr("href", menu.href)} class="${ssrRenderClass([[unref(usePropertiesStore)().megamenu_text_style ? unref(usePropertiesStore)().megamenu_text_style : "text-gray-600 hover:bg-gray-200"], "inline-flex items-center rounded-full px-3 py-2 text-lg font-semibold hover:text-primary-700"])}">${ssrInterpolate(menu.name)}</a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="hidden relative lg:flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow"><!--[-->`);
      ssrRenderList(unref(buttons).filter((o) => {
        return o.is_action_button && o.is_active;
      }), (cta, idx) => {
        _push(`<div class="relative z-10"><a${ssrRenderAttr("href", cta.href)} class="${ssrRenderClass([cta.css_class, "flex px-5 py-2 text-md items-center justify-center rounded-full transition-all duration-300"])}">${ssrInterpolate(cta.name)}</a></div>`);
      });
      _push(`<!--]--></div>`);
      if (("useState" in _ctx ? _ctx.useState : unref(useState))("isMobileNavVisible").value) {
        _push(`<div id="mobile_sidebar" class="fixed z-40 inset-0 flex-none h-full bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 md:hidden"><div id="navwrapper" class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden shadow-2xl lg:top-18 bg-white mr-24 lg:mr-0"><div class="lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div><div class="px-5 pt-4 flex items-center justify-between"><div>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_IconLogo, {
                class: "w-14 h-14 text-center",
                logo_url: unref(usePropertiesStore)().logo_url_dark
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_IconLogo, {
                  class: "w-14 h-14 text-center",
                  logo_url: unref(usePropertiesStore)().logo_url_dark
                }, null, 8, ["logo_url"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="-mr-2"><button type="button" class="bg-primary-200 rounded-full p-2 inline-flex items-center justify-center text-primary-400 hover:bg-primary-100 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"><span class="sr-only">Close menu</span><svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><nav id="nav" class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"><div class="mt-5 flex-grow flex flex-col"><nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar"><!--[-->`);
        ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(unref(navs), ["sort_order"]), (menu, idx) => {
          _push(`<ul>`);
          if (!menu.is_action_button) {
            _push(`<li class="mt-2"><h5 class="mb-4 lg:mb-3 font-semibold text-gray-900 dark:text-gray-200">`);
            if (menu.icon) {
              _push(ssrRenderComponent(_component_Icon, {
                name: menu.icon,
                class: "h-4 w-4 flex-shrink-0 text-primary-600 mr-2"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`<a${ssrRenderAttr("href", menu.href)}>${ssrInterpolate(menu.name)}</a></h5>`);
            if (menu.children) {
              _push(`<div><!--[-->`);
              ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(menu.children, ["sort_order"]), (c_menu, c_idx) => {
                _push(`<ul${ssrRenderAttr("href", c_menu.href)} class="space-y-2 lg:space-y-2 border-l border-gray-100 dark:border-gray-800"><li><a class="block border-l pl-4 -ml-px border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"${ssrRenderAttr("href", c_menu.href)}>${ssrInterpolate(c_menu.name)}</a></li></ul>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</ul>`);
        });
        _push(`<!--]--></nav></div></nav></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="-mr-2 items-center sm:hidden"><button type="button" class="fixed z-50 top-4 right-4 rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-primary-500" aria-expanded="false"><span class="sr-only">Open main menu</span><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-300 hover:text-primary-500" fill="fill-white" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg></button></div></header>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$3;
const _sfc_main$2 = {
  __name: "InquiryForm",
  __ssrInlineRender: true,
  props: {
    form_title: {
      type: String,
      required: true
    },
    form_description: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const isInquiryFormOpen = ref(false);
    const progress = ref(false);
    const data = ref({});
    useNuxtApp().$bus.$on("evtInquiryForm", (data2) => {
      isInquiryFormOpen.value = !isInquiryFormOpen.value;
      data2.value = {};
      progress.value = false;
    });
    function handleSelectedInInquiry_Reason(e) {
      data.value.inquiry_reason = e.target.value;
    }
    async function saveInquiryForm(args) {
      try {
        if (!modelValidate(data.value)) {
          useNuxtApp().$toast.show({
            type: "error",
            message: "Please fill all required inputs",
            timeout: 10
          });
          return;
        }
        progress.value = true;
        data.value.tenant = "www.xyz-company.com";
        await useFetch("/api/inquiries/create", {
          method: "post",
          body: data.value,
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response._data) {
              if (!response._data.code) {
                useNuxtApp().$toast.show({ type: "success", message: `Thank you for your inquiry, one of our associate will contact you soon`, timeout: 6 });
                data.value = {};
                isInquiryFormOpen.value = !isInquiryFormOpen.value;
              } else {
                useNuxtApp().$toast.show({ type: "danger", message: `Failure during inquiry save`, timeout: 6 });
              }
              progress.value = false;
            }
          }
        }, "$f47QMhOoCq");
      } catch (error) {
        useNuxtApp().$toast.show({
          type: "error",
          message: `Oops!... Something went wrong....<br/>[${error.message}]`,
          timeout: 6
        });
        progress.value = false;
      } finally {
      }
    }
    function modelValidate(args) {
      let name = data.value.name != void 0 && data.value.name != "";
      let phone_number = data.value.phone_number != void 0 && data.value.phone_number != "";
      let email = data.value.email != void 0 && data.value.email != "";
      let description = data.value.description != void 0 && data.value.description != "";
      return name && phone_number && email && description;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dropdownlist = Dropdownlist;
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        as: "template",
        show: isInquiryFormOpen.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="fixed inset-0"${_scopeId2}></div><div class="fixed inset-0 overflow-hidden"${_scopeId2}><div class="absolute inset-0 overflow-hidden"${_scopeId2}><div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transform transition ease-in-out duration-500 sm:duration-700",
                    "enter-from": "translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transform transition ease-in-out duration-500 sm:duration-700",
                    "leave-from": "translate-x-0",
                    "leave-to": "translate-x-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"${_scopeId4}><div class="h-0 flex-1 overflow-y-auto"${_scopeId4}><div class="bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 py-6 px-4 sm:px-6"${_scopeId4}><div class="flex items-center justify-between"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(__props.form_title ? __props.form_title : "Contact us")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Contact us"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="ml-3 flex h-7 items-center"${_scopeId4}><button type="button" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"${_scopeId4}><span class="sr-only"${_scopeId4}>Close panel</span>`);
                              _push5(ssrRenderComponent(unref(render$1), {
                                class: "h-6 w-6",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(`</button></div></div><div class="mt-1"${_scopeId4}><p class="text-sm text-primary-300"${_scopeId4}>${ssrInterpolate(__props.form_description ? __props.form_description : "Find out how we can help you?")}</p></div></div>`);
                              if (progress.value) {
                                _push5(`<div class="z-50 h-full overflow-hidden flex flex-col items-center justify-center"${_scopeId4}><div class="loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4"${_scopeId4}></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              if (!progress.value) {
                                _push5(`<div class="flex-1 flex-col justify-between"${_scopeId4}><div class="divide-y divide-gray-200 px-4 sm:px-6"${_scopeId4}><div class="space-y-6 pt-6 pb-5"${_scopeId4}><div class="sm:col-span-3"${_scopeId4}><label for="name" class="block text-sm font-medium text-gray-700"${_scopeId4}>Fullname </label><div class="mt-1"${_scopeId4}><input${ssrRenderAttr("value", data.value.name)} type="text" name="name" id="name" autocomplete="name" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="Email" class="block text-sm font-medium text-gray-700"${_scopeId4}> Email </label><div class="mt-1 rounded-md shadow-sm"${_scopeId4}><input${ssrRenderAttr("value", data.value.email)} type="text" id="email" name="email" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="phone_number" class="block text-sm font-medium text-gray-700"${_scopeId4}>Phone Number</label><div class="mt-1 relative"${_scopeId4}><input${ssrRenderAttr("value", data.value.phone_number)} type="text" name="phone_number" id="phone_number" autocomplete="tel" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" placeholder="(+1) 123-123-1234"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_Dropdownlist, {
                                  data: { data: unref(usePropertiesStore)().properties_by_parent_code("pick-list-inquiry-reason") },
                                  onChange: handleSelectedInInquiry_Reason,
                                  show_label: "true",
                                  modelValue: data.value.inquiry_reason,
                                  "onUpdate:modelValue": ($event) => data.value.inquiry_reason = $event,
                                  name: "inquiry_reason",
                                  label: "Reason for enquiry",
                                  selected_value: data.value.inquiry_reason
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="sm:col-span-6"${_scopeId4}><label for="description" class="block text-sm font-medium text-gray-700"${_scopeId4}> How we can help you? </label><div class="mt-1"${_scopeId4}><textarea id="description" name="description" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"${_scopeId4}>${ssrInterpolate(data.value.description)}</textarea></div><p class="mt-2 text-sm text-gray-500"${_scopeId4}>Tell us your requirements in few lines.</p></div></div></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="flex flex-shrink-0 justify-end px-4 py-4"${_scopeId4}><button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"${_scopeId4}>Cancel</button><button type="submit" class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"${_scopeId4}>Submit</button></div></form>`);
                            } else {
                              return [
                                createVNode("form", {
                                  class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                  onSubmit: withModifiers(saveInquiryForm, ["prevent"])
                                }, [
                                  createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                    createVNode("div", { class: "bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 py-6 px-4 sm:px-6" }, [
                                      createVNode("div", { class: "flex items-center justify-between" }, [
                                        createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Contact us"), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                          createVNode("button", {
                                            type: "button",
                                            class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                            onClick: ($event) => isInquiryFormOpen.value = false
                                          }, [
                                            createVNode("span", { class: "sr-only" }, "Close panel"),
                                            createVNode(unref(render$1), {
                                              class: "h-6 w-6",
                                              "aria-hidden": "true"
                                            })
                                          ], 8, ["onClick"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "mt-1" }, [
                                        createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                      ])
                                    ]),
                                    progress.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                    }, [
                                      createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                    ])) : createCommentVNode("", true),
                                    !progress.value ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex-1 flex-col justify-between"
                                    }, [
                                      createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                        createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                          createVNode("div", { class: "sm:col-span-3" }, [
                                            createVNode("label", {
                                              for: "name",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Fullname "),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.name = $event,
                                                type: "text",
                                                name: "name",
                                                id: "name",
                                                autocomplete: "name",
                                                class: "py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.name]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "Email",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Email "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.email = $event,
                                                type: "text",
                                                id: "email",
                                                name: "email",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.email]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "phone_number",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Phone Number"),
                                            createVNode("div", { class: "mt-1 relative" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                                type: "text",
                                                name: "phone_number",
                                                id: "phone_number",
                                                autocomplete: "tel",
                                                class: "py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300",
                                                placeholder: "(+1) 123-123-1234"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.phone_number]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode(_component_Dropdownlist, {
                                              data: { data: unref(usePropertiesStore)().properties_by_parent_code("pick-list-inquiry-reason") },
                                              onChange: handleSelectedInInquiry_Reason,
                                              show_label: "true",
                                              modelValue: data.value.inquiry_reason,
                                              "onUpdate:modelValue": ($event) => data.value.inquiry_reason = $event,
                                              name: "inquiry_reason",
                                              label: "Reason for enquiry",
                                              selected_value: data.value.inquiry_reason
                                            }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "description",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " How we can help you? "),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("textarea", {
                                                "onUpdate:modelValue": ($event) => data.value.description = $event,
                                                id: "description",
                                                name: "description",
                                                rows: "3",
                                                class: "shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.description]
                                              ])
                                            ]),
                                            createVNode("p", { class: "mt-2 text-sm text-gray-500" }, "Tell us your requirements in few lines.")
                                          ])
                                        ])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                      onClick: ($event) => isInquiryFormOpen.value = false
                                    }, "Cancel", 8, ["onClick"]),
                                    createVNode("button", {
                                      type: "submit",
                                      class: "ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    }, "Submit")
                                  ])
                                ], 40, ["onSubmit"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                            default: withCtx(() => [
                              createVNode("form", {
                                class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                onSubmit: withModifiers(saveInquiryForm, ["prevent"])
                              }, [
                                createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                  createVNode("div", { class: "bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 py-6 px-4 sm:px-6" }, [
                                    createVNode("div", { class: "flex items-center justify-between" }, [
                                      createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Contact us"), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                          onClick: ($event) => isInquiryFormOpen.value = false
                                        }, [
                                          createVNode("span", { class: "sr-only" }, "Close panel"),
                                          createVNode(unref(render$1), {
                                            class: "h-6 w-6",
                                            "aria-hidden": "true"
                                          })
                                        ], 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "mt-1" }, [
                                      createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                    ])
                                  ]),
                                  progress.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                  }, [
                                    createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                  ])) : createCommentVNode("", true),
                                  !progress.value ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex-1 flex-col justify-between"
                                  }, [
                                    createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                      createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                        createVNode("div", { class: "sm:col-span-3" }, [
                                          createVNode("label", {
                                            for: "name",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "Fullname "),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.name = $event,
                                              type: "text",
                                              name: "name",
                                              id: "name",
                                              autocomplete: "name",
                                              class: "py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.name]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "Email",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " Email "),
                                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.email = $event,
                                              type: "text",
                                              id: "email",
                                              name: "email",
                                              autocomplete: "name",
                                              class: "py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.email]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "phone_number",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "Phone Number"),
                                          createVNode("div", { class: "mt-1 relative" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                              type: "text",
                                              name: "phone_number",
                                              id: "phone_number",
                                              autocomplete: "tel",
                                              class: "py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300",
                                              placeholder: "(+1) 123-123-1234"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.phone_number]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode(_component_Dropdownlist, {
                                            data: { data: unref(usePropertiesStore)().properties_by_parent_code("pick-list-inquiry-reason") },
                                            onChange: handleSelectedInInquiry_Reason,
                                            show_label: "true",
                                            modelValue: data.value.inquiry_reason,
                                            "onUpdate:modelValue": ($event) => data.value.inquiry_reason = $event,
                                            name: "inquiry_reason",
                                            label: "Reason for enquiry",
                                            selected_value: data.value.inquiry_reason
                                          }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "description",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " How we can help you? "),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("textarea", {
                                              "onUpdate:modelValue": ($event) => data.value.description = $event,
                                              id: "description",
                                              name: "description",
                                              rows: "3",
                                              class: "shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.description]
                                            ])
                                          ]),
                                          createVNode("p", { class: "mt-2 text-sm text-gray-500" }, "Tell us your requirements in few lines.")
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                    onClick: ($event) => isInquiryFormOpen.value = false
                                  }, "Cancel", 8, ["onClick"]),
                                  createVNode("button", {
                                    type: "submit",
                                    class: "ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                  }, "Submit")
                                ])
                              ], 40, ["onSubmit"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "fixed inset-0" }),
                    createVNode("div", { class: "fixed inset-0 overflow-hidden" }, [
                      createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                        createVNode("div", { class: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16" }, [
                          createVNode(unref(TransitionChild), {
                            as: "template",
                            enter: "transform transition ease-in-out duration-500 sm:duration-700",
                            "enter-from": "translate-x-full",
                            "enter-to": "translate-x-0",
                            leave: "transform transition ease-in-out duration-500 sm:duration-700",
                            "leave-from": "translate-x-0",
                            "leave-to": "translate-x-full"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                                default: withCtx(() => [
                                  createVNode("form", {
                                    class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                    onSubmit: withModifiers(saveInquiryForm, ["prevent"])
                                  }, [
                                    createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                      createVNode("div", { class: "bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 py-6 px-4 sm:px-6" }, [
                                        createVNode("div", { class: "flex items-center justify-between" }, [
                                          createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Contact us"), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                            createVNode("button", {
                                              type: "button",
                                              class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                              onClick: ($event) => isInquiryFormOpen.value = false
                                            }, [
                                              createVNode("span", { class: "sr-only" }, "Close panel"),
                                              createVNode(unref(render$1), {
                                                class: "h-6 w-6",
                                                "aria-hidden": "true"
                                              })
                                            ], 8, ["onClick"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "mt-1" }, [
                                          createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                        ])
                                      ]),
                                      progress.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                      }, [
                                        createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                      ])) : createCommentVNode("", true),
                                      !progress.value ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex-1 flex-col justify-between"
                                      }, [
                                        createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                          createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                            createVNode("div", { class: "sm:col-span-3" }, [
                                              createVNode("label", {
                                                for: "name",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "Fullname "),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.name = $event,
                                                  type: "text",
                                                  name: "name",
                                                  id: "name",
                                                  autocomplete: "name",
                                                  class: "py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.name]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "Email",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " Email "),
                                              createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.email = $event,
                                                  type: "text",
                                                  id: "email",
                                                  name: "email",
                                                  autocomplete: "name",
                                                  class: "py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.email]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "phone_number",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "Phone Number"),
                                              createVNode("div", { class: "mt-1 relative" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                                  type: "text",
                                                  name: "phone_number",
                                                  id: "phone_number",
                                                  autocomplete: "tel",
                                                  class: "py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300",
                                                  placeholder: "(+1) 123-123-1234"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.phone_number]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode(_component_Dropdownlist, {
                                                data: { data: unref(usePropertiesStore)().properties_by_parent_code("pick-list-inquiry-reason") },
                                                onChange: handleSelectedInInquiry_Reason,
                                                show_label: "true",
                                                modelValue: data.value.inquiry_reason,
                                                "onUpdate:modelValue": ($event) => data.value.inquiry_reason = $event,
                                                name: "inquiry_reason",
                                                label: "Reason for enquiry",
                                                selected_value: data.value.inquiry_reason
                                              }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "description",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " How we can help you? "),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("textarea", {
                                                  "onUpdate:modelValue": ($event) => data.value.description = $event,
                                                  id: "description",
                                                  name: "description",
                                                  rows: "3",
                                                  class: "shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.description]
                                                ])
                                              ]),
                                              createVNode("p", { class: "mt-2 text-sm text-gray-500" }, "Tell us your requirements in few lines.")
                                            ])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4" }, [
                                      createVNode("button", {
                                        type: "button",
                                        class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                        onClick: ($event) => isInquiryFormOpen.value = false
                                      }, "Cancel", 8, ["onClick"]),
                                      createVNode("button", {
                                        type: "submit",
                                        class: "ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                      }, "Submit")
                                    ])
                                  ], 40, ["onSubmit"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-10"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "fixed inset-0" }),
                  createVNode("div", { class: "fixed inset-0 overflow-hidden" }, [
                    createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                      createVNode("div", { class: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "transform transition ease-in-out duration-500 sm:duration-700",
                          "enter-from": "translate-x-full",
                          "enter-to": "translate-x-0",
                          leave: "transform transition ease-in-out duration-500 sm:duration-700",
                          "leave-from": "translate-x-0",
                          "leave-to": "translate-x-full"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                              default: withCtx(() => [
                                createVNode("form", {
                                  class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                  onSubmit: withModifiers(saveInquiryForm, ["prevent"])
                                }, [
                                  createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                    createVNode("div", { class: "bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 py-6 px-4 sm:px-6" }, [
                                      createVNode("div", { class: "flex items-center justify-between" }, [
                                        createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Contact us"), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                          createVNode("button", {
                                            type: "button",
                                            class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                            onClick: ($event) => isInquiryFormOpen.value = false
                                          }, [
                                            createVNode("span", { class: "sr-only" }, "Close panel"),
                                            createVNode(unref(render$1), {
                                              class: "h-6 w-6",
                                              "aria-hidden": "true"
                                            })
                                          ], 8, ["onClick"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "mt-1" }, [
                                        createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                      ])
                                    ]),
                                    progress.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                    }, [
                                      createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                    ])) : createCommentVNode("", true),
                                    !progress.value ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex-1 flex-col justify-between"
                                    }, [
                                      createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                        createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                          createVNode("div", { class: "sm:col-span-3" }, [
                                            createVNode("label", {
                                              for: "name",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Fullname "),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.name = $event,
                                                type: "text",
                                                name: "name",
                                                id: "name",
                                                autocomplete: "name",
                                                class: "py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.name]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "Email",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Email "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.email = $event,
                                                type: "text",
                                                id: "email",
                                                name: "email",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.email]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "phone_number",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Phone Number"),
                                            createVNode("div", { class: "mt-1 relative" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                                type: "text",
                                                name: "phone_number",
                                                id: "phone_number",
                                                autocomplete: "tel",
                                                class: "py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300",
                                                placeholder: "(+1) 123-123-1234"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.phone_number]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode(_component_Dropdownlist, {
                                              data: { data: unref(usePropertiesStore)().properties_by_parent_code("pick-list-inquiry-reason") },
                                              onChange: handleSelectedInInquiry_Reason,
                                              show_label: "true",
                                              modelValue: data.value.inquiry_reason,
                                              "onUpdate:modelValue": ($event) => data.value.inquiry_reason = $event,
                                              name: "inquiry_reason",
                                              label: "Reason for enquiry",
                                              selected_value: data.value.inquiry_reason
                                            }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "description",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " How we can help you? "),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("textarea", {
                                                "onUpdate:modelValue": ($event) => data.value.description = $event,
                                                id: "description",
                                                name: "description",
                                                rows: "3",
                                                class: "shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.description]
                                              ])
                                            ]),
                                            createVNode("p", { class: "mt-2 text-sm text-gray-500" }, "Tell us your requirements in few lines.")
                                          ])
                                        ])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                      onClick: ($event) => isInquiryFormOpen.value = false
                                    }, "Cancel", 8, ["onClick"]),
                                    createVNode("button", {
                                      type: "submit",
                                      class: "ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    }, "Submit")
                                  ])
                                ], 40, ["onSubmit"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/commons/InquiryForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "SignUpForm",
  __ssrInlineRender: true,
  props: {
    form_title: {
      type: String,
      required: true
    },
    form_description: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const isSignUpFormVisible = ref(false);
    const progress = ref(false);
    const data = ref({ address: { street: "", apartment: "", city: "", postal_code: "", state: "", district_county: "" }, date_of_birth: /* @__PURE__ */ new Date() });
    const months = {
      data: useNuxtApp().$dayjs().localeData().months().map(function(mon, idx) {
        return { code: (idx + 1).toString(), name: mon };
      })
    };
    let daysArr = [];
    for (let i = 1; i <= 31; i++) {
      daysArr.push({ code: i.toString(), name: i.toString() });
    }
    const days = { data: daysArr };
    useNuxtApp().$bus.$on("evtSignUpForm", (data2) => {
      isSignUpFormVisible.value = !isSignUpFormVisible.value;
      progress.value = false;
    });
    function handleSelectedInStar(e) {
      data.value.star = e.target.value;
    }
    function handleSelectedInMemberPoosai_time(e) {
      data.value.poosai_time = e.target.value;
    }
    function handleSelectedInMemberSalutation_in_tamil(e) {
      data.value.salutation_in_tamil = e.target.value;
    }
    function handleSelectedInMemberPoosai_month(e) {
      data.value.poosai_month = e.target.value;
    }
    function handleSelectedInMemberPoosai_date(e) {
      data.value.poosai_date = e.target.value;
    }
    function handleSelectedInSignUpForm_country(e) {
      data.value.address.country = e.target.value;
      data.value.address.country_name = e.target.options[e.target.selectedIndex].text;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dropdownlist = Dropdownlist;
      if (unref(isSignUpFormVisible)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-xl"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-2xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-white">New Registration</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="text-primary-200 hover:text-white transition ease-in-out duration-150"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-white">The information that you have provided in this registration form will be stored securly as per GDPR requirements and will be used to notify you about temple events i.e. Festivals, Pooja related details etc.</p></div></header><div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pb-6"><form name="SignUp" id="SignUp" class="space-y-8" method="POST"><input type="hidden" name="form-name" value="SignUp"><div class="sm:overflow-hidden"><section aria-labelledby="Personal-Information"><div class="sm:col-span-6"><h2 class="text-xl font-medium text-gray-900">Personal Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-6"><label for="full_name_english" class="block text-sm font-medium text-gray-700">Full name with initials</label><div class="mt-1"><input type="text" id="full_name_english" name="full_name_english"${ssrRenderAttr("value", unref(data).full_name_english)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6">`);
        _push(ssrRenderComponent(_component_Dropdownlist, {
          onChange: handleSelectedInMemberSalutation_in_tamil,
          modelValue: unref(data).salutation_in_tamil,
          "onUpdate:modelValue": ($event) => unref(data).salutation_in_tamil = $event,
          show_label: "true",
          name: "salutation_in_tamil",
          label: "Salutation | \u0B85\u0B9F\u0BC8\u0BAE\u0BCA\u0BB4\u0BBF",
          data: {
            data: [
              { code: "\u0BA4\u0BBF\u0BB0\u0BC1", name: "\u0BA4\u0BBF\u0BB0\u0BC1" },
              { code: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA4\u0BBF", name: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA4\u0BBF" },
              { code: "\u0BB8\u0BCD\u0BB0\u0BC0\u0BAE\u0BA4\u0BBF", name: "\u0BB8\u0BCD\u0BB0\u0BC0\u0BAE\u0BA4\u0BBF" },
              { code: "\u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BB0\u0BCD", name: "\u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BB0\u0BCD" },
              { code: "\u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF", name: "\u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF" }
            ]
          },
          selected_value: unref(data).salutation_in_tamil
        }, null, _parent));
        _push(`</div><div class="sm:col-span-6"><label for="full_name_tamil " class="block text-medium font-medium text-gray-700">\u0BAE\u0BC1\u0BB4\u0BC1 \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD</label><div class="mt-1"><input type="text" id="full_name_tamil" name="full_name_tamil"${ssrRenderAttr("value", unref(data).full_name_tamil)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6">`);
        _push(ssrRenderComponent(_component_Dropdownlist, {
          data: { data: unref(usePropertiesStore)().properties_by_parent_code("zodiac-star-code") },
          onChange: handleSelectedInStar,
          show_label: "true",
          modelValue: unref(data).star,
          "onUpdate:modelValue": ($event) => unref(data).star = $event,
          name: "star",
          label: "Star",
          selected_value: unref(data).star
        }, null, _parent));
        _push(`</div></div></section><section aria-labelledby="Poosai-Information" class="mt-10"><div class="sm:col-span-6"><h2 class="text-xl font-medium text-gray-900">Poosai Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-6"><div class="mt-1">`);
        _push(ssrRenderComponent(_component_Dropdownlist, {
          onChange: handleSelectedInMemberPoosai_month,
          modelValue: unref(data).poosai_month,
          "onUpdate:modelValue": ($event) => unref(data).poosai_month = $event,
          name: "poosai_month",
          label: "Month",
          show_label: "true",
          data: months,
          selected_value: unref(data).poosai_month
        }, null, _parent));
        _push(`</div></div><div class="sm:col-span-6"><div class="mt-1">`);
        _push(ssrRenderComponent(_component_Dropdownlist, {
          onChange: handleSelectedInMemberPoosai_date,
          modelValue: unref(data).poosai_date,
          "onUpdate:modelValue": ($event) => unref(data).poosai_date = $event,
          name: "poosai_date",
          label: "Day",
          show_label: "true",
          data: days,
          selected_value: unref(data).poosai_date
        }, null, _parent));
        _push(`</div></div><div class="sm:col-span-6">`);
        _push(ssrRenderComponent(_component_Dropdownlist, {
          onChange: handleSelectedInMemberPoosai_time,
          modelValue: unref(data).poosai_time,
          "onUpdate:modelValue": ($event) => unref(data).poosai_time = $event,
          name: "kattalai",
          label: "Time",
          show_label: "true",
          data: {
            data: [
              { code: "Arthajamam", name: "Arthajamam" },
              { code: "Uchikkalam", name: "Uchikkalam" }
            ]
          },
          selected_value: unref(data).poosai_time
        }, null, _parent));
        _push(`</div></div></section><section aria-labelledby="Contact-Information" class="mt-10"><div class="sm:col-span-6"><h2 class="text-xl font-medium text-gray-900">Contact Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-6"><label for="email" class="block text-sm font-medium text-gray-700">Email</label><div class="mt-1"><input type="text" id="email" name="email"${ssrRenderAttr("value", unref(data).email)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="cell_phone_number" class="block text-sm font-medium text-gray-700">Cell #.</label><div class="mt-1"><input type="text" id="cell_phone_number" name="cell_phone_number"${ssrRenderAttr("value", unref(data).cell_phone_number)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="whatsapp_number" class="block text-sm font-medium text-gray-700">WhatsApp Phone #.</label><div class="mt-1"><input type="text" id="whatsapp_number" name="whatsapp_number"${ssrRenderAttr("value", unref(data).whatsapp_number)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div></div></section><section aria-labelledby="Address-Information" class="mt-10"><div class="sm:col-span-6"><h2 class="text-xl font-medium text-gray-900">Address Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-6"><label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label><div class="mt-1"><input type="text" id="apartment" name="apartment"${ssrRenderAttr("value", unref(data).address.apartment)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="street" class="block text-sm font-medium text-gray-700">Street</label><div class="mt-1"><input type="text" id="street" name="street"${ssrRenderAttr("value", unref(data).address.street)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="city" class="block text-sm font-medium text-gray-700">City</label><div class="mt-1"><input type="text" id="city" name="city"${ssrRenderAttr("value", unref(data).address.city)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="district_county" class="block text-sm font-medium text-gray-700">District</label><div class="mt-1"><input type="text" id="district_county" name="state"${ssrRenderAttr("value", unref(data).address.district_county)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6">`);
        _push(ssrRenderComponent(_component_Dropdownlist, {
          data: { data: unref(useCountryStore)().list_all("") },
          onChange: handleSelectedInSignUpForm_country,
          show_label: "true",
          modelValue: unref(data).address.country,
          "onUpdate:modelValue": ($event) => unref(data).address.country = $event,
          name: "country",
          label: "Country",
          selected_value: unref(data).address.country
        }, null, _parent));
        _push(`</div><div class="sm:col-span-6"><label for="state" class="block text-sm font-medium text-gray-700">State / Province</label><div class="mt-1"><input type="text" id="state" name="state"${ssrRenderAttr("value", unref(data).address.state)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="postal_code" class="block text-sm font-medium text-gray-700">Postal code</label><div class="mt-1"><input type="text" id="postal_code" name="postal_code"${ssrRenderAttr("value", unref(data).address.postal_code)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><input type="hidden" name="country_name" id="country_name"${ssrRenderAttr("value", unref(data).address.country_name)}></div></section><div class="pt-2 space-y-4 sm:pt-2 sm:space-y-4 sm:col-span-6"><section aria-labelledby="Consent-Information" class="mt-10"><div class="sm:col-span-6"><h2 class="text-xl font-medium text-gray-900">User Consent</h2></div><div class="mt-6"><div class="space-y-6 sm:space-y-5"><div class="pt-6 sm:pt-2"><div role="group" aria-labelledby="label-email"><div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline"><div class="mt-4 sm:mt-0 sm:col-span-6"><div class="max-w-lg space-y-4 ml-2"><div class="relative flex items-start"><div class="flex items-center h-5"><input id="poosai_consent_data_privacy" name="poosai_consent_data_privacy"${ssrIncludeBooleanAttr(Array.isArray(unref(data).poosai_consent_data_privacy) ? ssrLooseContain(unref(data).poosai_consent_data_privacy, null) : unref(data).poosai_consent_data_privacy) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="poosai_consent_data_privacy" class="text-sm text-gray-700">I hereby agree to receive pooja related details thru SMS and/or WhatsApp</label></div></div></div></div></div></div></div><div class="sm:col-span-6"><div class="flex items-center ml-2 pb-2"><input id="terms_and_conditions" name="terms_and_conditions" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(data).terms_and_conditions) ? ssrLooseContain(unref(data).terms_and_conditions, null) : unref(data).terms_and_conditions) ? " checked" : ""} class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"><label for="terms_and_conditions" class="ml-2 block text-sm leading-5 text-gray-900"> I agree to <a href="/legal/tc" target="_blank" class="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"> terms &amp; conditions. </a></label></div></div></div></div></section></div></div></form></div></div></div></div><div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"><span class="inline-flex rounded-md shadow-sm"><button type="reset" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button></span><span class="inline-flex rounded-md shadow-sm"><button type="submit" class="zyn-button">Save</button></span></div></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/commons/SignUpForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$1;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "landing",
  __ssrInlineRender: true,
  setup(__props) {
    const print = ref(useRoute().query.print || false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_Footer = __nuxt_component_1;
      const _component_CommonsInquiryForm = __nuxt_component_2;
      const _component_CommonsSignUpForm = __nuxt_component_3;
      _push(`<!--[--><div class="max-w-8xl mx-auto">`);
      if (!unref(print)) {
        _push(ssrRenderComponent(_component_Header, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mx-auto"><div class="min-h-screen relative"><div class="h-full relative">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
      if (!unref(print)) {
        _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_CommonsInquiryForm, {
        form_title: "Enquiry Form",
        form_description: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonsSignUpForm, {
        form_title: "Sign Up Form",
        form_description: ""
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/landing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
