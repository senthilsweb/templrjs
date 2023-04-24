import { _ as __nuxt_component_1 } from './CheckBoxGroup-e8533126.mjs';
import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { d as useNuxtApp } from '../server.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  components: {},
  data() {
    return {
      isUpsertUsersVisible: false,
      data: {},
      api: ""
    };
  },
  methods: {
    async upsertUsers(args) {
      try {
        if (this.$_.isUndefined(this.data.id)) {
          const { data } = await this.$axios.post(this.$config.apiURL + "Users", this.data);
        } else {
          const { data } = await this.$axios.put(this.$config.apiURL + "Users/" + this.data.id, this.data);
        }
        this.data = {};
        this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
        useNuxtApp().$bus.$emit("evtRefreshUsersDatatable");
        this.$toast.success("Record saved successfully");
      } catch (error) {
        console.log(error);
        this.$toast.error("Oops!Save failed...");
      } finally {
      }
    },
    async deleteUsers() {
      try {
        this.data.is_enabled = false;
        const { data } = await this.$axios.delete(this.$config.apiURL + "Users/" + this.data.id);
        $nuxt.$emit("evtRefreshUsersDatatable");
        this.$toast.success("Record has been deleted successfully");
      } catch (error) {
        this.$toast.error("Oops! delete failed...");
      } finally {
      }
    },
    async bindUsers() {
    },
    async closeUsersPanel() {
      this.data = {};
      this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
    },
    handleSelectedInStatus(data) {
      this.data.is_enabled = data;
    },
    handleSelectedInMarkAsDelete(data) {
      this.data.mark_as_delete = data;
    },
    handleCheckedInRole(data) {
    }
  },
  computed: {},
  mounted() {
  },
  created() {
    useNuxtApp().$bus.$on("evtUpsertUsers", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
        return this.data;
      }
      this.isUpsertUsersVisible = !this.isUpsertUsersVisible;
    });
    useNuxtApp().$bus.$on("evtDeleteUsers", (data) => {
      if (data !== void 0) {
        this.data = data;
        this.deleteUsers();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off("evtUpsertUsers");
    useNuxtApp().$bus.$off("evtDeleteUsers");
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CheckBoxGroup = __nuxt_component_1;
  const _component_Dropdownlist = Dropdownlist;
  if ($data.isUpsertUsersVisible) {
    _push(`<section${ssrRenderAttrs(mergeProps({
      class: "fixed inset-0 overflow-hidden",
      "aria-labelledby": "slide-over-title",
      role: "dialog",
      "aria-modal": "true"
    }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-md"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-gray-200 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Users</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="text-gray-600 hover:text-white transition ease-in-out duration-150"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">Create or update user</p></div></header><div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="frmUsers" id="frmUsers" class="space-y-8 divide-y divide-gray-200"><div class="sm:overflow-hidden"><div class="bg-white space-y-6"><div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6"><div class="sm:col-span-6"><h2 class="text-xl font-medium text-blue-gray-900">Profile Information</h2></div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> First name </label><div class="mt-1 rounded-md shadow-sm"><input${ssrRenderAttr("value", $data.data.firstname)} type="text" id="firstname" name="firstname" autocomplete="firstname" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"></div></div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> Last name </label><div class="mt-1 rounded-md shadow-sm"><input${ssrRenderAttr("value", $data.data.lastname)} type="text" id="lastname" name="lastname" autocomplete="lastname" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"></div></div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> Username </label><div class="mt-1 rounded-md shadow-sm"><input${ssrRenderAttr("value", $data.data.login)} type="text" id="login" name="login" autocomplete="login" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"></div></div><div class="sm:col-span-6"><h2 class="text-xl font-medium text-blue-gray-900">Personal Information</h2></div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> Email </label><div class="mt-1 rounded-md shadow-sm"><input${ssrRenderAttr("value", $data.data.email)} type="text" id="email" name="email" autocomplete="email" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"></div></div><div class="sm:col-span-6"><label for="name" class="block text-sm font-medium text-gray-700"> Phone </label><div class="mt-1 rounded-md shadow-sm"><input${ssrRenderAttr("value", $data.data.phone)} type="text" id="phone" name="phone" autocomplete="phone" class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"></div></div><div class="sm:col-span-6"><h2 class="text-xl font-medium text-blue-gray-900">Roles &amp; Administration</h2></div><div class="sm:col-span-6">`);
    _push(ssrRenderComponent(_component_CheckBoxGroup, {
      onChecked_item: $options.handleCheckedInRole,
      modelValue: $data.data.role,
      "onUpdate:modelValue": ($event) => $data.data.role = $event,
      id: "user_role",
      name: "user_role",
      label: "Roles",
      api: "role",
      checked_value: _ctx.Agent
    }, null, _parent));
    _push(`</div><div class="sm:col-span-6">`);
    _push(ssrRenderComponent(_component_Dropdownlist, {
      modelValue: $data.data.is_enabled,
      "onUpdate:modelValue": ($event) => $data.data.is_enabled = $event,
      onSelected_item: $options.handleSelectedInStatus,
      name: "is_enabled",
      label: "Status",
      data: {
        data: [
          { code: "true", name: "Active" },
          { code: "false", name: "In-active" }
        ]
      },
      selected_value: $data.data.is_enabled
    }, null, _parent));
    _push(`</div><div class="sm:col-span-6">`);
    _push(ssrRenderComponent(_component_Dropdownlist, {
      modelValue: $data.data.mark_as_delete,
      "onUpdate:modelValue": ($event) => $data.data.mark_as_delete = $event,
      onSelected_item: $options.handleSelectedInMarkAsDelete,
      name: "mark_as_delete",
      label: "Mark as delete?",
      data: {
        data: [
          { code: "true", name: "Yes" },
          { code: "false", name: "No" }
        ]
      },
      selected_value: $data.data.mark_as_delete
    }, null, _parent));
    _push(`</div></div></div></div></form></div></div></div></div><div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"><span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button></span><span class="inline-flex rounded-md shadow-sm"><button type="submit" class="zyn-button">Save</button></span></div></div></div></div></div></section>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/UsersUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UsersUpsert = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { UsersUpsert as default };
