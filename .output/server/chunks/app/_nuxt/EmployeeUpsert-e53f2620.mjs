import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { p as useAsyncData, F as useFetch, d as useNuxtApp } from '../server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext, watch, ref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { Switch } from '@headlessui/vue';
import { Calendar, DatePicker } from 'v-calendar';
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

let api = "/api/employees/";
const __default__ = {
  components: {
    Calendar,
    DatePicker
  },
  data() {
    return {
      isUpsertEmployeeVisible: false,
      isDeleteButtonVisible: false,
      data: {},
      date: /* @__PURE__ */ new Date(),
      progress: false
    };
  },
  methods: {
    /*Get a single employee*/
    getEmployee(id) {
      this.progress = true;
      const { data: employee } = useFetch(api + id, {
        method: "post",
        initialCache: false,
        onResponse({ request, response, options }) {
          this.data = response._data.document;
          this.progress = false;
        }
      }, "$OetVO5ytl7");
      watch(employee, () => {
        this.data = employee._rawValue.document;
        this.isDeleteButtonVisible = true;
        this.progress = false;
      });
    },
    /*Add a new employee or Update an existing employee*/
    async upsertEmployee(args) {
      try {
        this.progress = true;
        if (this.data._id === void 0) {
          this.data.createdAt = useNuxtApp().$dayjs().utc();
          this.data.updatedAt = useNuxtApp().$dayjs().utc();
          const { data: res } = await useFetch(api + "create", {
            method: "post",
            body: this.data,
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data.insertedId) {
                useNuxtApp().$toast.show({ type: "success", message: `Employee [${response._data.insertedId}] added successfully`, timeout: 6 });
              }
            }
          }, "$hFXhc3hzyV");
        } else {
          const { data: res } = await useFetch(api + this.data._id, {
            method: "put",
            body: _.omit(this.data, "_id"),
            //omit the mongo object id before the upsert
            initialCache: false,
            onResponse({ request, response, options }) {
            }
          }, "$redmV7lYIE");
        }
        this.progress = false;
        useNuxtApp().$bus.$emit("evtSearchEmployee", { filter: {}, limit: 10 });
        this.data = {};
        this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
      } catch (error) {
        console.log(error);
        this.progress = false;
      } finally {
      }
    },
    /*Delete a employee */
    async deleteEmployee() {
      try {
        await useFetch("/api/employees/" + this.data._id, {
          method: "delete",
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response._data.deletedCount == 1) {
              console.log("deletedCount = ", response._data.deletedCount);
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
            useNuxtApp().$bus.$emit("evtSearchEmployee", { filter: {}, limit: 10 });
            this.data = {};
            this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
          }
        }, "$o4ZO6Vkfyn");
      } catch (error) {
      } finally {
      }
    },
    async closeEmployeePanel() {
      this.data = {};
      this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
    },
    handleSelectedInEmployeeDepartment(e) {
      this.data.department = e.target.value;
    },
    handleSelectedInEmployeeRole(e) {
      this.data.role = e.target.value;
    },
    handleSelectedInEmployeeClient(e) {
      this.data.client = e.target.value;
    }
  },
  created() {
    useNuxtApp().$bus.$on("evtUpsertEmployee", (data) => {
      if (data !== void 0) {
        this.getEmployee(data._cells[0].data);
      } else {
        this.data.billable = ref(false);
      }
      this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
    });
    useNuxtApp().$bus.$on("evtDeleteEmployee", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.deleteEmployee();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off("evtUpsertEmployee");
    useNuxtApp().$bus.$off("evtDeleteEmployee");
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "EmployeeUpsert",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: departments } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "departments-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "departments", projection: {}, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$J1Rf4eF9T8"
    )), __temp = await __temp, __restore(), __temp);
    const { data: roles } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "roles-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "roles", projection: {}, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$YYiRvjO0Fa"
    )), __temp = await __temp, __restore(), __temp);
    const { data: clients } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "clients-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "clients", projection: {}, filter: {}, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$FhKsGT1X0u"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dropdownlist = Dropdownlist;
      if (_ctx.isUpsertEmployeeVisible) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-primary-200 bg-opacity-50 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Employee</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Create or update Employee ${ssrInterpolate(_ctx.data.billable)}</p></div></header>`);
        if (_ctx.progress) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!_ctx.progress) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmEmployee" id="frmEmployee" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">`);
          if (_ctx.isDeleteButtonVisible) {
            _push(`<div class="sm:col-span-6"><div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">`);
            if (_ctx.data.profile_picture) {
              _push(`<div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"><img class="rounded-lg object-cover shadow-lg"${ssrRenderAttr("src", _ctx.data.profile_picture)}${ssrRenderAttr("alt", _ctx.data.last_name + " " + _ctx.data.first_name)}></div>`);
            } else {
              _push(`<div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"><img class="rounded-lg object-cover shadow-lg" src="https://via.placeholder.com/100.png" alt="Placeholder image"></div>`);
            }
            if (_ctx.data.first_name) {
              _push(`<div class="sm:col-span-2"><div class="space-y-4"><div class="space-y-1 text-lg font-medium leading-6"><h3>${ssrInterpolate(_ctx.data.last_name + "," + _ctx.data.first_name)}</h3><p class="text-primary-600">${ssrInterpolate(_ctx.data.role)}</p></div></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Personal Information</h2></div><div class="sm:col-span-6"><label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label><div class="mt-1"><input type="text" id="first_name" name="first_name"${ssrRenderAttr("value", _ctx.data.first_name)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label><div class="mt-1"><input type="text" id="last_name" name="branchNameArabic"${ssrRenderAttr("value", _ctx.data.last_name)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="last_name" class="block text-sm font-medium text-gray-700">Picture </label><div class="mt-1"><input type="text" id="profile_picture" name="profile_picture"${ssrRenderAttr("value", _ctx.data.profile_picture)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="email" class="block text-sm font-medium text-gray-700">Email</label><div class="mt-1"><input type="text" id="email" name="email"${ssrRenderAttr("value", _ctx.data.email)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="mobile_phone" class="block text-sm font-medium text-gray-700">Mobile phone</label><div class="mt-1"><input type="text" id="mobile_phone" name="mobile_phone"${ssrRenderAttr("value", _ctx.data.mobile_phone)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Professional Information</h2></div><div class="sm:col-span-6">`);
          _push(ssrRenderComponent(_component_Dropdownlist, {
            data: { data: unref(departments).documents },
            onChange: _ctx.handleSelectedInEmployeeDepartment,
            modelValue: _ctx.data.department,
            "onUpdate:modelValue": ($event) => _ctx.data.department = $event,
            show_label: "true",
            name: "department",
            label: "Department",
            selected_value: _ctx.data.department
          }, null, _parent));
          _push(`</div><div class="sm:col-span-6">`);
          _push(ssrRenderComponent(_component_Dropdownlist, {
            data: { data: unref(roles).documents },
            onChange: _ctx.handleSelectedInEmployeeRole,
            modelValue: _ctx.data.role,
            "onUpdate:modelValue": ($event) => _ctx.data.role = $event,
            show_label: "true",
            name: "role",
            label: "Role",
            selected_value: _ctx.data.role
          }, null, _parent));
          _push(`</div><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Client/Project Information</h2></div><div class="sm:col-span-6">`);
          _push(ssrRenderComponent(_component_Dropdownlist, {
            data: { data: unref(clients).documents },
            onChange: _ctx.handleSelectedInEmployeeClient,
            modelValue: _ctx.data.client,
            "onUpdate:modelValue": ($event) => _ctx.data.client = $event,
            show_label: "true",
            name: "client",
            label: "Client",
            selected_value: _ctx.data.client
          }, null, _parent));
          _push(`</div><div class="sm:col-span-3 mt-1"><label for="billable" class="block text-sm font-medium text-gray-700">Billable</label></div><div class="sm:col-span-3"><div class="mt-1">`);
          _push(ssrRenderComponent(unref(Switch), {
            modelValue: _ctx.data.billable,
            "onUpdate:modelValue": ($event) => _ctx.data.billable = $event,
            class: [_ctx.data.billable ? "bg-primary-900" : "bg-primary-700", "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"]
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="sr-only"${_scopeId}>Billable</span><span aria-hidden="true" class="${ssrRenderClass([_ctx.data.billable ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"])}"${_scopeId}></span>`);
              } else {
                return [
                  createVNode("span", { class: "sr-only" }, "Billable"),
                  createVNode("span", {
                    "aria-hidden": "true",
                    class: [_ctx.data.billable ? "translate-x-9" : "translate-x-0", "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/employees/EmployeeUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
