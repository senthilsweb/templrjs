import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { p as useAsyncData, F as useFetch, d as useNuxtApp } from '../server.mjs';
import { withAsyncContext, mergeProps, unref, useSSRContext, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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

let api = "/api/departments/";
const __default__ = {
  components: {},
  data() {
    return {
      isUpsertDepartmentVisible: false,
      isDeleteButtonVisible: false,
      data: {},
      date: /* @__PURE__ */ new Date(),
      progress: false
    };
  },
  methods: {
    /*Get a single role*/
    getDepartment(id) {
      this.progress = true;
      const { data: role } = useFetch(api + id, {
        method: "post",
        initialCache: false,
        onResponse({ request, response, options }) {
          console.log("Response from promise", response._data.document);
          this.data = response._data.document;
          this.progress = false;
        }
      }, "$RUOItkB3Oh");
      watch(role, () => {
        console.log("Department = ", JSON.stringify(role));
        this.data = role._rawValue.document;
        this.isDeleteButtonVisible = true;
        this.progress = false;
      });
    },
    /*Add a new role or Update an existing role*/
    async upsertDepartment(args) {
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
                useNuxtApp().$toast.show({ type: "success", message: `Department [${response._data.insertedId}] added successfully`, timeout: 6 });
              }
            }
          }, "$p26WCDi8ZV");
        } else {
          const { data: res } = await useFetch(api + this.data._id, {
            method: "put",
            body: _.omit(this.data, "_id"),
            //omit the mongo object id before the upsert
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data.modifiedCount > 0) {
                useNuxtApp().$toast.show({ type: "success", message: `Record has been updated successfully`, timeout: 6 });
              }
            }
          }, "$Z5CtyEykGF");
        }
        this.progress = false;
        useNuxtApp().$bus.$emit("evtSearchDepartment", { filter: {}, limit: 10 });
        this.data = {};
        this.isUpsertDepartmentVisible = !this.isUpsertDepartmentVisible;
      } catch (error) {
        console.log(error);
        this.progress = false;
      } finally {
      }
    },
    /*Delete a role */
    async deleteDepartment() {
      try {
        await useFetch("/api/departments/" + this.data._id, {
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
              this.progress = false;
              this.isUpsertDepartmentVisible = false;
              useNuxtApp().$bus.$emit("evtSearchDepartment", { filter: {}, limit: 10 });
              this.data = {};
            } else {
              this.progress = false;
              useNuxtApp().$toast.show({
                type: "error",
                message: "The delete failed...",
                timeout: 6
              });
            }
          }
        }, "$vOrERZ30c7");
      } catch (error) {
      } finally {
      }
    },
    async closeDepartmentPanel() {
      this.data = {};
      this.isUpsertDepartmentVisible = !this.isUpsertDepartmentVisible;
    },
    handleSelectedInDepartment_record_status(e) {
      this.data.record_status = e.target.value;
    },
    handleSelectedInDepartment_mark_as_delete(e) {
      this.data.mark_as_delete = e.target.value;
    }
  },
  created() {
    useNuxtApp().$bus.$on("evtUpsertDepartment", (data) => {
      if (data !== void 0) {
        this.getDepartment(data._cells[0].data);
      }
      this.isUpsertDepartmentVisible = !this.isUpsertDepartmentVisible;
    });
    useNuxtApp().$bus.$on("evtDeleteDepartment", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.deleteDepartment();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off("evtUpsertDepartment");
    useNuxtApp().$bus.$off("evtDeleteDepartment");
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "DepartmentUpsert",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: record_status } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "record_status-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "record_status" } }, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$KLWgsEOEsI"
    )), __temp = await __temp, __restore(), __temp);
    const { data: mark_as_delete } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "mark_as_delete-list-" + Math.random,
      () => $fetch("/api/generic", {
        initialCache: false,
        method: "post",
        body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "mark_as_delete" } }, limit: 1e4 },
        onResponse({ request, response, options }) {
        }
      }),
      "$Bh0vhbAoug"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dropdownlist = Dropdownlist;
      if (_ctx.isUpsertDepartmentVisible) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-primary-200 bg-opacity-50 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Department</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Create or update Department</p></div></header>`);
        if (_ctx.progress) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!_ctx.progress) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmDepartment" id="frmDepartment" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><label for="first_name" class="block text-sm font-medium text-gray-700">Name</label><div class="mt-1"><input type="text" id="name" name="name"${ssrRenderAttr("value", _ctx.data.name)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div></div><div class="sm:col-span-6"><label for="first_name" class="block text-sm font-medium text-gray-700">Code</label><div class="mt-1"><input type="text" id="code" name="code"${ssrRenderAttr("value", _ctx.data.code)} class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"></div><p class="mt-2 text-sm text-gray-500">Custom code used as unique constraint. If the same string exists will be thrown duplicate record error.</p></div><div class="sm:col-span-6">`);
          _push(ssrRenderComponent(_component_Dropdownlist, {
            data: { data: unref(record_status).documents },
            onChange: _ctx.handleSelectedInDepartment_record_status,
            show_label: "true",
            modelValue: _ctx.data.record_status,
            "onUpdate:modelValue": ($event) => _ctx.data.record_status = $event,
            name: "record_status",
            label: "Record Status",
            selected_value: _ctx.data.record_status
          }, null, _parent));
          _push(`</div><div class="sm:col-span-6">`);
          _push(ssrRenderComponent(_component_Dropdownlist, {
            data: { data: unref(mark_as_delete).documents },
            onChange: _ctx.handleSelectedInDepartment_mark_as_delete,
            show_label: "true",
            modelValue: _ctx.data.mark_as_delete,
            "onUpdate:modelValue": ($event) => _ctx.data.mark_as_delete = $event,
            name: "mark_as_delete",
            label: "Mark for Deletion",
            selected_value: _ctx.data.mark_as_delete
          }, null, _parent));
          _push(`</div></div></div></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/departments/DepartmentUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
