import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { ref, withAsyncContext, onUnmounted, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { h as useRoute, p as useAsyncData, r as queryContent, n as navigateTo } from '../server.mjs';
import { findIndex } from 'lodash-es';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { RadioGroup, RadioGroupLabel, RadioGroupOption, RadioGroupDescription } from '@headlessui/vue';
import 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
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

const _sfc_main = {
  __name: "[\u2026slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const plans = [
      {
        name: "Tamara Tirj\xE1k",
        title: "Odissi Instructor",
        href: "/team/tamara"
      },
      {
        name: "Santoshi Iyer",
        title: "Carnatic Music Instructor",
        href: "/team/santoshi"
      },
      {
        name: "Sangeetha Subramanian",
        title: "Artistic Director and Bollywood Dance Instructor",
        href: "/team/sangeetha"
      },
      {
        name: "Bhargavi Anand",
        title: "Bharatanatyam Instructor",
        href: "/team/bhargavi"
      }
    ];
    const selected = ref(plans[0]);
    const { path } = useRoute();
    let selected_idx = findIndex(plans, function(o) {
      return o.href == path;
    });
    selected.value = plans[selected_idx];
    const { data: instructor } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`content-${path}`, () => {
      return queryContent().where({ _path: `/instructors/${path.split("/").pop()}` }).findOne();
    })), __temp = await __temp, __restore(), __temp);
    function hop(href) {
      navigateTo(href);
    }
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "landing" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-screen flex overflow-hidden"${_scopeId}><div class="hidden lg:flex lg:flex-shrink-0"${_scopeId}><div class="flex flex-col w-64"${_scopeId}><div class="flex flex-col h-0 flex-1 bg-white"${_scopeId}><div class="px-4 py-16"${_scopeId}><div class="mx-auto w-full fixed max-w-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(RadioGroup), {
              modelValue: selected.value,
              "onUpdate:modelValue": ($event) => selected.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(RadioGroupLabel), { class: "sr-only" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Server size`);
                      } else {
                        return [
                          createTextVNode("Server size")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(plans, (plan) => {
                    _push3(ssrRenderComponent(unref(RadioGroupOption), {
                      as: "template",
                      key: plan.name,
                      value: plan
                    }, {
                      default: withCtx(({ active, checked }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="${ssrRenderClass([[active ? "ring-2 ring-primary-800 ring-opacity-60 ring-offset-2 ring-offset-sky-300" : "", checked ? "bg-primary-900 bg-opacity-75 text-white " : "bg-primary-200 "], "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"])}"${_scopeId3}><div class="flex items-center justify-between"${_scopeId3}><div class="flex items-center"${_scopeId3}><div class="text-sm"${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(RadioGroupLabel), {
                            as: "p",
                            class: [checked ? "text-white" : "text-gray-900", "font-medium"]
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(plan.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(plan.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(RadioGroupDescription), {
                            as: "span",
                            class: [checked ? "text-sky-100" : "text-gray-500", "inline"]
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span${_scopeId4}>${ssrInterpolate(plan.title)}</span>`);
                              } else {
                                return [
                                  createVNode("span", null, toDisplayString(plan.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div></div></div></div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => hop(plan.href),
                              class: [[active ? "ring-2 ring-primary-800 ring-opacity-60 ring-offset-2 ring-offset-sky-300" : "", checked ? "bg-primary-900 bg-opacity-75 text-white " : "bg-primary-200 "], "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"]
                            }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "text-sm" }, [
                                    createVNode(unref(RadioGroupLabel), {
                                      as: "p",
                                      class: [checked ? "text-white" : "text-gray-900", "font-medium"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(plan.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]),
                                    createVNode(unref(RadioGroupDescription), {
                                      as: "span",
                                      class: [checked ? "text-sky-100" : "text-gray-500", "inline"]
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, toDisplayString(plan.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])
                                  ])
                                ])
                              ])
                            ], 10, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode(unref(RadioGroupLabel), { class: "sr-only" }, {
                      default: withCtx(() => [
                        createTextVNode("Server size")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(plans, (plan) => {
                        return createVNode(unref(RadioGroupOption), {
                          as: "template",
                          key: plan.name,
                          value: plan
                        }, {
                          default: withCtx(({ active, checked }) => [
                            createVNode("div", {
                              onClick: ($event) => hop(plan.href),
                              class: [[active ? "ring-2 ring-primary-800 ring-opacity-60 ring-offset-2 ring-offset-sky-300" : "", checked ? "bg-primary-900 bg-opacity-75 text-white " : "bg-primary-200 "], "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"]
                            }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "text-sm" }, [
                                    createVNode(unref(RadioGroupLabel), {
                                      as: "p",
                                      class: [checked ? "text-white" : "text-gray-900", "font-medium"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(plan.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]),
                                    createVNode(unref(RadioGroupDescription), {
                                      as: "span",
                                      class: [checked ? "text-sky-100" : "text-gray-500", "inline"]
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, toDisplayString(plan.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])
                                  ])
                                ])
                              ])
                            ], 10, ["onClick"])
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"${_scopeId}><div class="flex-1 relative z-0 flex overflow-hidden"${_scopeId}><main class="flex-1 flex overflow-hidden"${_scopeId}><div class="flex-1 overflow-y-auto"${_scopeId}><div class="w-full p-2"${_scopeId}><section id="author" aria-labelledby="author-title" class="relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16"${_scopeId}><div class="relative mx-auto max-w-5xl pt-16 sm:px-6"${_scopeId}><div class="bg-primary-50 pt-px sm:rounded-6xl"${_scopeId}><div class="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72"${_scopeId}><img class="absolute inset-0 h-full w-full object-cover"${ssrRenderAttr("src", unref(instructor).instructor_picture)} alt="" sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"${_scopeId}></div><div class="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32"${_scopeId}><h2 class="inline-flex items-center rounded-full py-1 px-4 text-primary-600 ring-1 ring-inset ring-primary-600"${_scopeId}><span class="font-mono text-sm" aria-hidden="true"${_scopeId}>${ssrInterpolate(unref(instructor).instructor_id)}</span><span class="ml-3 h-3.5 w-px bg-primary-600/20"${_scopeId}></span><span class="ml-3 text-base font-medium tracking-tight"${_scopeId}>${ssrInterpolate(unref(instructor).instructor_designation)}</span></h2><p class="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"${_scopeId}><span class="block text-primary-600"${_scopeId}>${ssrInterpolate(unref(instructor).instructor_full_name)} \u2013</span> ${ssrInterpolate(unref(instructor).instructor_punch_title)}</p><!--[-->`);
            ssrRenderList(unref(instructor).instructor_content_paragraphs, (instructor2) => {
              _push2(`<p class="mt-8 text-md tracking-tight text-gray-500"${_scopeId}>${ssrInterpolate(instructor2)}</p>`);
            });
            _push2(`<!--]--></div></div></div></section></div></div></main></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "h-screen flex overflow-hidden" }, [
                createVNode("div", { class: "hidden lg:flex lg:flex-shrink-0" }, [
                  createVNode("div", { class: "flex flex-col w-64" }, [
                    createVNode("div", { class: "flex flex-col h-0 flex-1 bg-white" }, [
                      createVNode("div", { class: "px-4 py-16" }, [
                        createVNode("div", { class: "mx-auto w-full fixed max-w-sm" }, [
                          createVNode(unref(RadioGroup), {
                            modelValue: selected.value,
                            "onUpdate:modelValue": ($event) => selected.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RadioGroupLabel), { class: "sr-only" }, {
                                default: withCtx(() => [
                                  createTextVNode("Server size")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(plans, (plan) => {
                                  return createVNode(unref(RadioGroupOption), {
                                    as: "template",
                                    key: plan.name,
                                    value: plan
                                  }, {
                                    default: withCtx(({ active, checked }) => [
                                      createVNode("div", {
                                        onClick: ($event) => hop(plan.href),
                                        class: [[active ? "ring-2 ring-primary-800 ring-opacity-60 ring-offset-2 ring-offset-sky-300" : "", checked ? "bg-primary-900 bg-opacity-75 text-white " : "bg-primary-200 "], "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"]
                                      }, [
                                        createVNode("div", { class: "flex items-center justify-between" }, [
                                          createVNode("div", { class: "flex items-center" }, [
                                            createVNode("div", { class: "text-sm" }, [
                                              createVNode(unref(RadioGroupLabel), {
                                                as: "p",
                                                class: [checked ? "text-white" : "text-gray-900", "font-medium"]
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(plan.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode(unref(RadioGroupDescription), {
                                                as: "span",
                                                class: [checked ? "text-sky-100" : "text-gray-500", "inline"]
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("span", null, toDisplayString(plan.title), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])
                                            ])
                                          ])
                                        ])
                                      ], 10, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col min-w-0 flex-1 overflow-hidden" }, [
                  createVNode("div", { class: "flex-1 relative z-0 flex overflow-hidden" }, [
                    createVNode("main", { class: "flex-1 flex overflow-hidden" }, [
                      createVNode("div", { class: "flex-1 overflow-y-auto" }, [
                        createVNode("div", { class: "w-full p-2" }, [
                          createVNode("section", {
                            id: "author",
                            "aria-labelledby": "author-title",
                            class: "relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16"
                          }, [
                            createVNode("div", { class: "relative mx-auto max-w-5xl pt-16 sm:px-6" }, [
                              createVNode("div", { class: "bg-primary-50 pt-px sm:rounded-6xl" }, [
                                createVNode("div", { class: "relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72" }, [
                                  createVNode("img", {
                                    class: "absolute inset-0 h-full w-full object-cover",
                                    src: unref(instructor).instructor_picture,
                                    alt: "",
                                    sizes: "(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
                                  }, null, 8, ["src"])
                                ]),
                                createVNode("div", { class: "px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32" }, [
                                  createVNode("h2", { class: "inline-flex items-center rounded-full py-1 px-4 text-primary-600 ring-1 ring-inset ring-primary-600" }, [
                                    createVNode("span", {
                                      class: "font-mono text-sm",
                                      "aria-hidden": "true"
                                    }, toDisplayString(unref(instructor).instructor_id), 1),
                                    createVNode("span", { class: "ml-3 h-3.5 w-px bg-primary-600/20" }),
                                    createVNode("span", { class: "ml-3 text-base font-medium tracking-tight" }, toDisplayString(unref(instructor).instructor_designation), 1)
                                  ]),
                                  createVNode("p", { class: "mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl" }, [
                                    createVNode("span", { class: "block text-primary-600" }, toDisplayString(unref(instructor).instructor_full_name) + " \u2013", 1),
                                    createTextVNode(" " + toDisplayString(unref(instructor).instructor_punch_title), 1)
                                  ]),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(instructor).instructor_content_paragraphs, (instructor2) => {
                                    return openBlock(), createBlock("p", { class: "mt-8 text-md tracking-tight text-gray-500" }, toDisplayString(instructor2), 1);
                                  }), 256))
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/team/[\u2026slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
