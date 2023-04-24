import { _ as __nuxt_component_1$2 } from './Logo-d1137ce0.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { C as useSupabaseUser, h as useRoute, D as useNavigationsStore, f as useState, E as usePropertiesStore, d as useNuxtApp, B as useSupabaseToken, l as useRuntimeConfig, p as useAsyncData, r as queryContent } from '../server.mjs';
import { useSSRContext, unref, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, Transition, ref, openBlock, createElementBlock, createElementVNode, withAsyncContext } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { defu } from 'defu';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { filter, lowerCase, sortBy } from 'lodash-es';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
      "clip-rule": "evenodd"
    })
  ]);
}
const _sfc_main$3 = {
  __name: "FooterSupportNav",
  __ssrInlineRender: true,
  props: {
    api_end_point: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { data: navigation } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("links_" + props.api_end_point, () => {
      return queryContent().where({ _path: props.api_end_point }).findOne();
    }, "$vAjL4gx0HW")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center space-x-4 md:order-2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(navigation).menu, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="text-gray-400 hover:text-gray-500"><span class="sr-only">${ssrInterpolate(item.name)}</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: item.icon,
          class: "h-6 w-6",
          alt: item.name
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/management/FooterSupportNav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = _sfc_main$3;
const useSupabaseClient = () => {
  var _a;
  const nuxtApp = useNuxtApp();
  const token = useSupabaseToken();
  const Authorization = token.value ? `Bearer ${token.value}` : void 0;
  const { supabase: { url, key, client: clientOptions } } = useRuntimeConfig().public;
  const options = Authorization ? defu(clientOptions, { global: { headers: { Authorization } } }) : clientOptions;
  const recreateClient = ((_a = nuxtApp._supabaseClient) == null ? void 0 : _a.headers.Authorization) !== Authorization;
  if (!nuxtApp._supabaseClient || recreateClient) {
    nuxtApp._supabaseClient = createClient(url, key, options);
  }
  return nuxtApp._supabaseClient;
};
const __default__$1 = {
  components: {},
  data() {
    return {
      data: []
    };
  },
  created() {
  },
  beforeUpdate() {
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "UserAccountDropdownMenu",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseUser();
    const client = useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      if (("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value) {
        _push(ssrRenderComponent(unref(Menu), mergeProps({
          as: "div",
          class: "relative inline-block px-3 text-left"
        }, _attrs), {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MenuButton), { class: "group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100" }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="flex w-full items-center justify-between"${_scopeId2}><span class="flex min-w-0 items-center justify-between space-x-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "icon-park-twotone:avatar",
                      class: "h-6 w-6 text-gray-500"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="flex min-w-0 flex-1 flex-col"${_scopeId2}><span class="truncate text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email)}</span></span></span>`);
                    _push3(ssrRenderComponent(unref(render), {
                      class: "h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "flex w-full items-center justify-between" }, [
                        createVNode("span", { class: "flex min-w-0 items-center justify-between space-x-3" }, [
                          createVNode(_component_Icon, {
                            name: "icon-park-twotone:avatar",
                            class: "h-6 w-6 text-gray-500"
                          }),
                          createVNode("span", { class: "flex min-w-0 flex-1 flex-col" }, [
                            createVNode("span", { class: "truncate text-sm font-medium text-gray-900" }, toDisplayString(("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email), 1)
                          ])
                        ]),
                        createVNode(unref(render), {
                          class: "h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                          "aria-hidden": "true"
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="py-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a${ssrRenderAttr("href", `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`)} class="${ssrRenderClass([active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "icon-park-twotone:id-card-h",
                            class: "h-6 w-6 text-primary-500"
                          }, null, _parent4, _scopeId3));
                          _push4(` profile </a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`,
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:id-card-h",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" profile ")
                            ], 10, ["href"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a${ssrRenderAttr("href", `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`)} class="${ssrRenderClass([active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "icon-park-twotone:setting",
                            class: "h-6 w-6 text-primary-500"
                          }, null, _parent4, _scopeId3));
                          _push4(` Personalization </a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`,
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:setting",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" Personalization ")
                            ], 10, ["href"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a href="/organization" class="${ssrRenderClass([active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "icon-park-twotone:building-one",
                            class: "h-6 w-6 text-primary-500"
                          }, null, _parent4, _scopeId3));
                          _push4(` Organization </a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: "/organization",
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:building-one",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" Organization ")
                            ], 2)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a href="#" class="${ssrRenderClass([active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "icon-park-twotone:book-open",
                            class: "h-6 w-6 text-primary-500"
                          }, null, _parent4, _scopeId3));
                          _push4(` Documentation </a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: "#",
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:book-open",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" Documentation ")
                            ], 2)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="py-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<a href="#" class="${ssrRenderClass([active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_Icon, {
                            name: "icon-park-outline:power",
                            class: "h-6 w-6 text-red-500"
                          }, null, _parent4, _scopeId3));
                          _push4(` Logout </a>`);
                        } else {
                          return [
                            createVNode("a", {
                              href: "#",
                              onClick: ($event) => unref(client).auth.signOut(),
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-outline:power",
                                class: "h-6 w-6 text-red-500"
                              }),
                              createTextVNode(" Logout ")
                            ], 10, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "py-1" }, [
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode("a", {
                              href: `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`,
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:id-card-h",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" profile ")
                            ], 10, ["href"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode("a", {
                              href: `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`,
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:setting",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" Personalization ")
                            ], 10, ["href"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode("a", {
                              href: "/organization",
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:building-one",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" Organization ")
                            ], 2)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode("a", {
                              href: "#",
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-twotone:book-open",
                                class: "h-6 w-6 text-primary-500"
                              }),
                              createTextVNode(" Documentation ")
                            ], 2)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "py-1" }, [
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode("a", {
                              href: "#",
                              onClick: ($event) => unref(client).auth.signOut(),
                              class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                            }, [
                              createVNode(_component_Icon, {
                                name: "icon-park-outline:power",
                                class: "h-6 w-6 text-red-500"
                              }),
                              createTextVNode(" Logout ")
                            ], 10, ["onClick"])
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", null, [
                  createVNode(unref(MenuButton), { class: "group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "flex w-full items-center justify-between" }, [
                        createVNode("span", { class: "flex min-w-0 items-center justify-between space-x-3" }, [
                          createVNode(_component_Icon, {
                            name: "icon-park-twotone:avatar",
                            class: "h-6 w-6 text-gray-500"
                          }),
                          createVNode("span", { class: "flex min-w-0 flex-1 flex-col" }, [
                            createVNode("span", { class: "truncate text-sm font-medium text-gray-900" }, toDisplayString(("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email), 1)
                          ])
                        ]),
                        createVNode(unref(render), {
                          class: "h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                          "aria-hidden": "true"
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode(Transition, {
                  "enter-active-class": "transition ease-out duration-100",
                  "enter-from-class": "transform opacity-0 scale-95",
                  "enter-to-class": "transform opacity-100 scale-100",
                  "leave-active-class": "transition ease-in duration-75",
                  "leave-from-class": "transform opacity-100 scale-100",
                  "leave-to-class": "transform opacity-0 scale-95"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(MenuItems), { class: "absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "py-1" }, [
                          createVNode(unref(MenuItem), null, {
                            default: withCtx(({ active }) => [
                              createVNode("a", {
                                href: `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`,
                                class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                              }, [
                                createVNode(_component_Icon, {
                                  name: "icon-park-twotone:id-card-h",
                                  class: "h-6 w-6 text-primary-500"
                                }),
                                createTextVNode(" profile ")
                              ], 10, ["href"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), null, {
                            default: withCtx(({ active }) => [
                              createVNode("a", {
                                href: `/account/${("useSupabaseUser" in _ctx ? _ctx.useSupabaseUser : unref(useSupabaseUser))().value.email}`,
                                class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                              }, [
                                createVNode(_component_Icon, {
                                  name: "icon-park-twotone:setting",
                                  class: "h-6 w-6 text-primary-500"
                                }),
                                createTextVNode(" Personalization ")
                              ], 10, ["href"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), null, {
                            default: withCtx(({ active }) => [
                              createVNode("a", {
                                href: "/organization",
                                class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                              }, [
                                createVNode(_component_Icon, {
                                  name: "icon-park-twotone:building-one",
                                  class: "h-6 w-6 text-primary-500"
                                }),
                                createTextVNode(" Organization ")
                              ], 2)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), null, {
                            default: withCtx(({ active }) => [
                              createVNode("a", {
                                href: "#",
                                class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                              }, [
                                createVNode(_component_Icon, {
                                  name: "icon-park-twotone:book-open",
                                  class: "h-6 w-6 text-primary-500"
                                }),
                                createTextVNode(" Documentation ")
                              ], 2)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "py-1" }, [
                          createVNode(unref(MenuItem), null, {
                            default: withCtx(({ active }) => [
                              createVNode("a", {
                                href: "#",
                                onClick: ($event) => unref(client).auth.signOut(),
                                class: [active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm"]
                              }, [
                                createVNode(_component_Icon, {
                                  name: "icon-park-outline:power",
                                  class: "h-6 w-6 text-red-500"
                                }),
                                createTextVNode(" Logout ")
                              ], 10, ["onClick"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/management/UserAccountDropdownMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1$1 = _sfc_main$2;
const primaryNavLinks = [
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    ],
    event: "evtNoops",
    icon: "icon-park-twotone:data-sheet",
    title: "Dashboard",
    link: "/dashboard",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park-twotone:building-one",
    title: "Organization",
    link: "/organization",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park-twotone:circle-three",
    title: "CRM",
    link: "/clients",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      ""
    ],
    icon: "icon-park-twotone:four-point-connection",
    title: "Things",
    link: "/things",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park-twotone:more-app",
    title: "Products",
    link: "/products",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park-twotone:rocket-one",
    title: "Sales",
    link: "/sales",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park-twotone:paper-money",
    title: "Accounting",
    link: "/accounting",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park:fingerprint-three",
    title: "Identity & Access control",
    link: "/iam",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      ""
    ],
    icon: "icon-park-twotone:multi-circular",
    title: "Utilities",
    link: "/utilities/designer/business-card",
    event: "evtNoops",
    children: []
  },
  {
    hidden: false,
    selected: false,
    img: "",
    icons: [
      "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    ],
    icon: "icon-park-twotone:setting-two",
    title: "Setups",
    link: "/setups",
    event: "evtNoops",
    children: []
  },
  {
    hidden: true,
    selected: false,
    img: "",
    icons: [
      "M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ],
    title: "Version",
    link: "javascript:void()",
    event: "evtAboutZyn",
    children: []
  }
];
const lefNavLinks = {
  primaryNavLinks
};
const __default__ = {
  components: {},
  data() {
    return {
      leftNavLinks: lefNavLinks,
      mainNav: []
    };
  },
  methods: {},
  created() {
  },
  beforeMount() {
    let r_name = this.$route.name;
    _.map(this.leftNavLinks.primaryNavLinks, function(link) {
      if (link.title.toLowerCase() == r_name.split("-")[r_name.split("-").length - 1].toLowerCase()) {
        return link.selected = true;
      }
    });
    this.mainNav = this.leftNavLinks.primaryNavLinks;
  }
  //
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__, {
  __name: "LeftNavBar",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseUser();
    useSupabaseClient();
    const { path } = useRoute();
    const left_nav = filter(useNavigationsStore().navigatioins_by_module("primary-left-nav"), { is_action_button: false, is_active: true });
    useState("selected", () => ref({}));
    left_nav.forEach((item) => {
      useState("selected").value[item.name] = lowerCase(item.name) == lowerCase(path.split("/").pop());
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconLogo = __nuxt_component_1$2;
      const _component_ManagementUserAccountDropdownMenu = __nuxt_component_1$1;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex overflow-hidden bg-gray-100" }, _attrs))}><div class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-200 bg-opacity-75" aria-hidden="true"></div><div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-200"><div class="absolute top-0 right-0 -mr-12 pt-2"><button class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"><span class="sr-only">Close sidebar</span><svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="flex-shrink-0 flex items-center px-4"><a href="/#" class="font-medium text-primary-600 hover:text-primary-500">`);
      _push(ssrRenderComponent(_component_IconLogo, {
        logo_url: unref(usePropertiesStore)().logo_url_dark,
        class: "w-14 h-14 object-contain"
      }, null, _parent));
      _push(`</a></div><div class="mt-5 flex-1 h-0 overflow-y-auto"><nav class="px-2 space-y-1"><!--[-->`);
      ssrRenderList(unref(lefNavLinks).primaryNavLinks, (menu, index) => {
        _push(`<a${ssrRenderAttr("href", menu.link)} class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"><svg class="text-gray-300 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", menu.icon)}></path></svg> ${ssrInterpolate(menu.title)}</a>`);
      });
      _push(`<!--]--></nav></div></div><div class="flex-shrink-0 w-14" aria-hidden="true"></div></div><div class="hidden md:flex md:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1"><div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-100"><a href="/#" class="font-medium text-primary-600 hover:text-primary-500">`);
      _push(ssrRenderComponent(_component_IconLogo, {
        logo_url: unref(usePropertiesStore)().logo_url_dark
      }, null, _parent));
      _push(`</a></div>`);
      _push(ssrRenderComponent(_component_ManagementUserAccountDropdownMenu, { class: "pt-8" }, null, _parent));
      _push(`<div class="flex-1 flex flex-col overflow-y-auto"><nav class="flex-1 px-2 py-4 space-y-1"><!--[-->`);
      ssrRenderList(("useSortBy" in _ctx ? _ctx.useSortBy : unref(sortBy))(unref(left_nav), ["sort_order"]), (menu) => {
        _push(`<!--[-->`);
        if (menu.is_active) {
          _push(`<a${ssrRenderAttr("href", menu.href)} class="${ssrRenderClass([[("useLowerCase" in _ctx ? _ctx.useLowerCase : unref(lowerCase))(menu.name) == ("useLowerCase" in _ctx ? _ctx.useLowerCase : unref(lowerCase))(unref(path).split("/").pop()) ? "text-gray-900 bg-gray-200 font-bold" : "text-gray-700"], "hover:text-gray-900 hover:bg-gray-50 group group flex items-center px-2 py-2 text-sm font-medium rounded-md"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: menu.icon,
            class: "mr-3 h-6 w-6 flex-shrink-0"
          }, null, _parent));
          _push(` ${ssrInterpolate(menu.name)}</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav></div></div></div></div><div class="flex flex-col w-0 flex-1 overflow-hidden"><div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow"><button class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"><span class="sr-only">Open sidebar</span><svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg></button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/management/LeftNavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ManagementFooterSupportNav = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex-shrink-0 flex border-t border-gray-300 p-4">`);
  _push(ssrRenderComponent(_component_ManagementFooterSupportNav, { api_end_point: "/_navigation/footer-support-nav" }, null, _parent));
  _push(`</div><div class="flex-shrink-0 w-14"></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/management/SoftwareVersion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _, __nuxt_component_1 as a, lefNavLinks as l };
