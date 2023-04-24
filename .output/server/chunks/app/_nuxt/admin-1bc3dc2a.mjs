import { d as useNuxtApp } from '../server.mjs';
import { useSSRContext, ref, unref, mergeProps, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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

const _sfc_main$1 = {
  __name: "AboutZynomi",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    useNuxtApp().$bus.$on("evtAboutZynomi", (data) => {
      isOpen.value = true;
    });
    function closeModal() {
      isOpen.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        appear: "",
        show: isOpen.value,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              onClose: closeModal,
              class: "relative z-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-50 p-6 text-left align-middle shadow-xl transition-all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DialogTitle), {
                                as: "h3",
                                class: "text-md font-medium leading-6 text-gray-900"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Zytes, Modern ERP software with programmable bots for small and medium businesses`);
                                  } else {
                                    return [
                                      createTextVNode("Zytes, Modern ERP software with programmable bots for small and medium businesses")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="mt-2"${_scopeId4}><p class="text-sm text-gray-500"${_scopeId4}>version 1.1.20220917.23</p></div><div class="mt-4"${_scopeId4}><button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2"${_scopeId4}>Got it, thanks!</button></div>`);
                            } else {
                              return [
                                createVNode(unref(DialogTitle), {
                                  as: "h3",
                                  class: "text-md font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Zytes, Modern ERP software with programmable bots for small and medium businesses")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("p", { class: "text-sm text-gray-500" }, "version 1.1.20220917.23")
                                ]),
                                createVNode("div", { class: "mt-4" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2",
                                    onClick: closeModal
                                  }, "Got it, thanks!")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-50 p-6 text-left align-middle shadow-xl transition-all" }, {
                            default: withCtx(() => [
                              createVNode(unref(DialogTitle), {
                                as: "h3",
                                class: "text-md font-medium leading-6 text-gray-900"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Zytes, Modern ERP software with programmable bots for small and medium businesses")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "version 1.1.20220917.23")
                              ]),
                              createVNode("div", { class: "mt-4" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2",
                                  onClick: closeModal
                                }, "Got it, thanks!")
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-50 p-6 text-left align-middle shadow-xl transition-all" }, {
                              default: withCtx(() => [
                                createVNode(unref(DialogTitle), {
                                  as: "h3",
                                  class: "text-md font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Zytes, Modern ERP software with programmable bots for small and medium businesses")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("p", { class: "text-sm text-gray-500" }, "version 1.1.20220917.23")
                                ]),
                                createVNode("div", { class: "mt-4" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2",
                                    onClick: closeModal
                                  }, "Got it, thanks!")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
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
                onClose: closeModal,
                class: "relative z-50"
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-50 p-6 text-left align-middle shadow-xl transition-all" }, {
                            default: withCtx(() => [
                              createVNode(unref(DialogTitle), {
                                as: "h3",
                                class: "text-md font-medium leading-6 text-gray-900"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Zytes, Modern ERP software with programmable bots for small and medium businesses")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "version 1.1.20220917.23")
                              ]),
                              createVNode("div", { class: "mt-4" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-700 focus-visible:ring-offset-2",
                                  onClick: closeModal
                                }, "Got it, thanks!")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutZynomi.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {
  components: {},
  methods: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AboutZynomi = __nuxt_component_0;
  _push(`<!--[--><div id="app"><main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0" x-data x-init="$el.focus()"><div class="max-w-8xl mx-auto">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main></div>`);
  _push(ssrRenderComponent(_component_AboutZynomi, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { admin as default };
