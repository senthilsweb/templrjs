import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { _ as __nuxt_component_1 } from './client-only-7e9de0b5.mjs';
import { F as useFetch, p as useAsyncData, f as useState, d as useNuxtApp } from '../server.mjs';
import { watch, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Switch } from '@headlessui/vue';
import { Calendar } from 'v-calendar';
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

let api_allocations = "/api/employees/allocations/";
const __default__ = {
  components: {
    Calendar,
    DatePicker
  },
  data() {
    return {
      isUpsertClientAllocationVisible: false,
      isDeleteButtonVisible: false,
      allocation: {},
      data: {},
      date: /* @__PURE__ */ new Date(),
      progress: false
    };
  },
  methods: {
    /*Get a single employee*/
    getEmployee(id) {
      this.progress = true;
      const { data: employee } = useFetch("api/mongodb/query/aggregate", {
        method: "post",
        initialCache: false,
        body: { collection: "vwEmployees", pipeline: [{ $match: { _id: { $oid: id } } }] }
      }, "$UhEpIeLIWK");
      watch(employee, () => {
        console.log("employee", employee._rawValue);
        this.data = employee._rawValue.documents[0];
        this.progress = false;
      });
    },
    getEmployeeAllocations(emp_id) {
      useAsyncData(
        "allocations-list-" + Math.random,
        () => $fetch(api_allocations, {
          initialCache: false,
          method: "post",
          body: { collection: "allocations", projection: {}, filter: { emp_id: { $eq: emp_id } }, limit: 100 },
          onResponse({ request, response, options }) {
            if (response._data.documents) {
              console.log("allocations=", response._data);
              this.allocation = response._data.documents[0];
            }
            this.progress = false;
          }
        }),
        "$YIa8lLLpsH"
      );
    },
    async filterClientManagers(client) {
      await useAsyncData(
        "client_managers-list-" + Math.random,
        () => $fetch("/api/contacts", {
          initialCache: false,
          method: "post",
          body: { collection: "contacts", projection: { _id: 1, client: 1, name: 1, first_name: 1, last_name: 1, code: "$_id" }, filter: { client: { $eq: client } }, limit: 1e4 },
          onResponse({ request, response, options }) {
            useState("managers").value = response._data;
            useState("componentKey").value += 1;
          }
        }),
        "$V8OHxgIYWk"
      );
    },
    /*Add a new employee or Update an existing employee*/
    async upsertEmployeeAllocation(args) {
      try {
        this.progress = true;
        if (this.allocation.emp_id === void 0) {
          this.allocation.emp_id = this.data._id;
          this.data.createdAt = useNuxtApp().$dayjs().utc();
          this.data.updatedAt = useNuxtApp().$dayjs().utc();
          const { data: res } = await useFetch(api_allocations + "create", {
            method: "post",
            body: this.allocation,
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data.insertedId) {
                useNuxtApp().$toast.show({ type: "success", message: `Allocation [${response._data.insertedId}] added successfully`, timeout: 6 });
              }
            }
          }, "$ehkPhoEW26");
        } else {
          const { data: res } = await useFetch(api_allocations + this.data._id, {
            method: "put",
            //body: _.omit(this.allocation, "_id"), //omit the mongo object id before the upsert
            initialCache: false,
            onResponse({ request, response, options }) {
            }
          }, "$4jCGttUiQe");
        }
        this.progress = false;
        this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
      } catch (error) {
        console.log(error);
        this.progress = false;
      } finally {
      }
    },
    /*Delete a employee */
    async deleteClientAllocation() {
      try {
        await useFetch(api_allocations + this.data._id, {
          method: "delete",
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response._data.deletedCount == 1) {
              useNuxtApp().$toast.show({
                type: "success",
                message: "Delete was successful",
                timeout: 6
              });
            } else {
              useNuxtApp().$toast.show({
                type: "error",
                message: "The delete failed...",
                timeout: 6
              });
            }
            this.progress = false;
            this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
          }
        }, "$hXf0v3fdKe");
      } catch (error) {
      } finally {
      }
    },
    async closeEmployeeAllocationPanel() {
      this.data = {};
      this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
    },
    handleSelectedInEmployeeClient(e) {
      this.allocation.client = e.target.value;
      this.filterClientManagers(this.allocation.client);
    },
    handleSelectedInEmployee_client_reporting_manager(e) {
      this.allocation.client_reporting_manager = e.target.value;
    }
  },
  created() {
    useNuxtApp().$bus.$on("evtUpsertClientAllocation", (data) => {
      this.getEmployeeAllocations(data._cells[0].data);
      this.getEmployee(data._cells[0].data);
      const date = ref(/* @__PURE__ */ new Date());
      date.value.setDate(Number((/* @__PURE__ */ new Date()).getDate()) + 35);
      if (data._cells[3].data) {
        this.filterClientManagers(data._cells[3].data);
      }
      this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
    });
    useNuxtApp().$bus.$on("evtDeleteEmployee", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.deleteEmployee();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off("evtUpsertClientAllocation");
    useNuxtApp().$bus.$off("evtDeleteEmployee");
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "ClientAllocationUpsert",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const past_tab = ref(false);
    useState("componentKey", () => ref(0));
    useState("managers");
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      "departments-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "departments", projection: {}, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$64Puolh6QD"
    )), __temp = await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      "roles-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "roles", projection: {}, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$I3iK74hRdd"
    )), __temp = await __temp, __restore();
    const { data: clients } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "clients-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "clients", projection: {}, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$rxZjvqmPYh"
    )), __temp = await __temp, __restore(), __temp);
    const { data: client_managers } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "client_managers-list-" + Math.random,
      () => $fetch("/api/contacts", {
        initialCache: false,
        method: "post",
        body: { collection: "contacts", projection: { _id: 1, client: 1, name: 1, first_name: 1, last_name: 1, code: "$_id" }, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$lIBjffX3cc"
    )), __temp = await __temp, __restore(), __temp);
    useState("managers").value = client_managers;
    const categories = ref({
      Current: [],
      Past: [
        {
          id: 1,
          title: "Is tech making coffee better or worse?",
          date: "Jan 7",
          commentCount: 29,
          shareCount: 16,
          role: "Mobile application developer",
          start_date: "14-JAN-2022",
          end_date: "22-SEP-2022",
          location: "Tampa, FL"
        },
        {
          id: 1,
          title: "Is tech making coffee better or worse?",
          date: "Jan 7",
          commentCount: 29,
          shareCount: 16,
          role: "IOS Architect",
          start_date: "23-SEP-2022",
          end_date: "CURRENT",
          location: "Tucson, AZ"
        }
      ]
    });
    function changeTab(index) {
      console.log("Changed active tab to:", index);
      past_tab.value = index == 1 ? true : false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dropdownlist = Dropdownlist;
      const _component_ClientOnly = __nuxt_component_1;
      if (_ctx.isUpsertClientAllocationVisible) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-primary-200 bg-opacity-50 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Client/Project Allocation </h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Manage client and project allocations</p> ${ssrInterpolate(_ctx.allocations)}</div></header>`);
        if (_ctx.progress) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="w-full max-w-md px-2 sm:px-0">`);
        _push(ssrRenderComponent(unref(TabGroup), { onChange: changeTab }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(TabList), { class: "flex space-x-1 bg-blue-900/20 p-1" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(Object.keys(unref(categories)), (category) => {
                      _push3(ssrRenderComponent(unref(Tab), {
                        as: "template",
                        key: category
                      }, {
                        default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<button class="${ssrRenderClass(["w-full py-2.5 text-sm font-medium leading-5 text-blue-700", "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2", selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"])}"${_scopeId3}>${ssrInterpolate(category)}</button>`);
                          } else {
                            return [
                              createVNode("button", {
                                class: ["w-full py-2.5 text-sm font-medium leading-5 text-blue-700", "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2", selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"]
                              }, toDisplayString(category), 3)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(Object.keys(unref(categories)), (category) => {
                        return openBlock(), createBlock(unref(Tab), {
                          as: "template",
                          key: category
                        }, {
                          default: withCtx(({ selected }) => [
                            createVNode("button", {
                              class: ["w-full py-2.5 text-sm font-medium leading-5 text-blue-700", "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2", selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"]
                            }, toDisplayString(category), 3)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(TabPanels), { class: "mt-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(Object.values(unref(categories)), (posts, idx) => {
                      _push3(ssrRenderComponent(unref(TabPanel), {
                        key: idx,
                        class: ["bg-white p-3", ""]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<ul${_scopeId3}><!--[-->`);
                            ssrRenderList(posts, (post) => {
                              _push4(`<li class="relative rounded-md p-3 hover:bg-gray-100"${_scopeId3}><h3 class="text-sm font-medium leading-5"${_scopeId3}>${ssrInterpolate(post.role)}</h3><ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"${_scopeId3}><li${_scopeId3}>${ssrInterpolate(post.start_date)}</li><li${_scopeId3}>-</li><li${_scopeId3}>${ssrInterpolate(post.end_date)}</li><li${_scopeId3}>\xB7</li><li${_scopeId3}>${ssrInterpolate(post.location)}</li></ul><a href="#" class="${ssrRenderClass(["absolute inset-0 rounded-md", "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"])}"${_scopeId3}></a></li>`);
                            });
                            _push4(`<!--]--></ul>`);
                          } else {
                            return [
                              createVNode("ul", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(posts, (post) => {
                                  return openBlock(), createBlock("li", {
                                    key: post.id,
                                    class: "relative rounded-md p-3 hover:bg-gray-100"
                                  }, [
                                    createVNode("h3", { class: "text-sm font-medium leading-5" }, toDisplayString(post.role), 1),
                                    createVNode("ul", { class: "mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500" }, [
                                      createVNode("li", null, toDisplayString(post.start_date), 1),
                                      createVNode("li", null, "-"),
                                      createVNode("li", null, toDisplayString(post.end_date), 1),
                                      createVNode("li", null, "\xB7"),
                                      createVNode("li", null, toDisplayString(post.location), 1)
                                    ]),
                                    createVNode("a", {
                                      href: "#",
                                      class: ["absolute inset-0 rounded-md", "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"]
                                    })
                                  ]);
                                }), 128))
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(Object.values(unref(categories)), (posts, idx) => {
                        return openBlock(), createBlock(unref(TabPanel), {
                          key: idx,
                          class: ["bg-white p-3", ""]
                        }, {
                          default: withCtx(() => [
                            createVNode("ul", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(posts, (post) => {
                                return openBlock(), createBlock("li", {
                                  key: post.id,
                                  class: "relative rounded-md p-3 hover:bg-gray-100"
                                }, [
                                  createVNode("h3", { class: "text-sm font-medium leading-5" }, toDisplayString(post.role), 1),
                                  createVNode("ul", { class: "mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500" }, [
                                    createVNode("li", null, toDisplayString(post.start_date), 1),
                                    createVNode("li", null, "-"),
                                    createVNode("li", null, toDisplayString(post.end_date), 1),
                                    createVNode("li", null, "\xB7"),
                                    createVNode("li", null, toDisplayString(post.location), 1)
                                  ]),
                                  createVNode("a", {
                                    href: "#",
                                    class: ["absolute inset-0 rounded-md", "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"]
                                  })
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(TabList), { class: "flex space-x-1 bg-blue-900/20 p-1" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(Object.keys(unref(categories)), (category) => {
                      return openBlock(), createBlock(unref(Tab), {
                        as: "template",
                        key: category
                      }, {
                        default: withCtx(({ selected }) => [
                          createVNode("button", {
                            class: ["w-full py-2.5 text-sm font-medium leading-5 text-blue-700", "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2", selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"]
                          }, toDisplayString(category), 3)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                }),
                createVNode(unref(TabPanels), { class: "mt-2" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(Object.values(unref(categories)), (posts, idx) => {
                      return openBlock(), createBlock(unref(TabPanel), {
                        key: idx,
                        class: ["bg-white p-3", ""]
                      }, {
                        default: withCtx(() => [
                          createVNode("ul", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(posts, (post) => {
                              return openBlock(), createBlock("li", {
                                key: post.id,
                                class: "relative rounded-md p-3 hover:bg-gray-100"
                              }, [
                                createVNode("h3", { class: "text-sm font-medium leading-5" }, toDisplayString(post.role), 1),
                                createVNode("ul", { class: "mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500" }, [
                                  createVNode("li", null, toDisplayString(post.start_date), 1),
                                  createVNode("li", null, "-"),
                                  createVNode("li", null, toDisplayString(post.end_date), 1),
                                  createVNode("li", null, "\xB7"),
                                  createVNode("li", null, toDisplayString(post.location), 1)
                                ]),
                                createVNode("a", {
                                  href: "#",
                                  class: ["absolute inset-0 rounded-md", "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"]
                                })
                              ]);
                            }), 128))
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (!unref(past_tab)) {
          _push(`<div>`);
          if (!_ctx.progress) {
            _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmEmployee" id="frmEmployee" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">`);
            if (_ctx.data.profile_picture) {
              _push(`<div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"><img class="rounded-lg object-cover shadow-lg"${ssrRenderAttr("src", _ctx.data.profile_picture)}${ssrRenderAttr("alt", _ctx.data.last_name + " " + _ctx.data.first_name)}></div>`);
            } else {
              _push(`<div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"><img class="rounded-lg object-cover shadow-lg" src="https://via.placeholder.com/100.png" alt="Placeholder image"></div>`);
            }
            if (_ctx.data.first_name) {
              _push(`<div class="sm:col-span-2"><div class="space-y-4"><div class="space-y-1 leading-6"><h3 class="text-xl font-bold">${ssrInterpolate(_ctx.data.last_name + "," + _ctx.data.first_name)}</h3><p class="text-primary-600">${ssrInterpolate(_ctx.data.role)}</p></div></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900"> Client/Project Information</h2></div><div class="sm:col-span-6">`);
            _push(ssrRenderComponent(_component_Dropdownlist, {
              data: { data: unref(clients).documents },
              onChange: _ctx.handleSelectedInEmployeeClient,
              modelValue: _ctx.allocation.client,
              "onUpdate:modelValue": ($event) => _ctx.allocation.client = $event,
              show_label: "true",
              name: "client",
              label: "Client",
              selected_value: _ctx.data.allocations[0].client
            }, null, _parent));
            _push(`</div><div class="sm:col-span-6">`);
            _push(ssrRenderComponent(_component_Dropdownlist, {
              key: ("useState" in _ctx ? _ctx.useState : unref(useState))("componentKey").value,
              data: { data: ("useState" in _ctx ? _ctx.useState : unref(useState))("managers").value.documents },
              onChange: _ctx.handleSelectedInEmployee_client_reporting_manager,
              modelValue: _ctx.data.allocations[0].client_reporting_manager,
              "onUpdate:modelValue": ($event) => _ctx.data.allocations[0].client_reporting_manager = $event,
              show_label: "true",
              name: "client_reporting_manager",
              label: "Client Reporting Manager",
              selected_value: _ctx.data.allocations[0].client_reporting_manager
            }, null, _parent));
            _push(`</div><div class="sm:col-span-6"><label for="percentage_allocation" class="block text-sm font-medium text-gray-700">Percentage (%) Allocation</label><div class="mt-1"><input type="text" id="percentage_allocation" name="percentage_allocation"${ssrRenderAttr("value", _ctx.data.allocations[0].percentage_allocation)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="work_location" class="block text-sm font-medium text-gray-700">Work Location </label><div class="mt-1"><input type="text" id="work_location" name="work_location"${ssrRenderAttr("value", _ctx.data.allocations[0].work_location)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="first_name" class="block text-sm font-medium text-gray-700 pb-1">Duration</label>`);
            _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
            _push(`</div><div class="sm:col-span-3 mt-1"><label for="billable" class="block text-sm font-medium text-gray-700">Billable</label></div><div class="sm:col-span-3"><div class="mt-1">`);
            _push(ssrRenderComponent(unref(Switch), {
              modelValue: _ctx.data.allocations[0].billable,
              "onUpdate:modelValue": ($event) => _ctx.data.allocations[0].billable = $event,
              class: [_ctx.data.billable ? "bg-primary-900" : "bg-primary-700", "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="sr-only"${_scopeId}>Billable</span><span aria-hidden="true" class="${ssrRenderClass([_ctx.data.allocations[0].billable ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"])}"${_scopeId}></span>`);
                } else {
                  return [
                    createVNode("span", { class: "sr-only" }, "Billable"),
                    createVNode("span", {
                      "aria-hidden": "true",
                      class: [_ctx.data.allocations[0].billable ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"]
                    }, null, 2)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</div></div></div></div></div></form></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"><span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button></span>`);
        if (_ctx.isDeleteButtonVisible) {
          _push(`<span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="inline-flex rounded-md shadow-sm"><button type="submit" class="zyn-button">Save</button></span></div></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/employees/ClientAllocationUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
