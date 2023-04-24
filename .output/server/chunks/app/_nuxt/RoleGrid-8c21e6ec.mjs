import { f as useState, p as useAsyncData, d as useNuxtApp, F as useFetch } from '../server.mjs';
import { ref, withAsyncContext, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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

const __default__ = {
  components: {},
  data() {
    return {
      data: [],
      filter: {}
    };
  },
  methods: {
    /*To-be customized for each entity and your need*/
    buildMongoQueryFilterCriteria(args) {
      let filter = {};
      if (_.isString(args.name) && !useNuxtApp().$s.isBlank(args.name)) {
        filter["name"] = { $regex: ".*" + args.name + ".*", $options: "i" };
      }
      if (_.isString(args.record_status) && !useNuxtApp().$s.isBlank(args.record_status)) {
        filter["record_status"] = { $eq: args.record_status };
      }
      if (_.isString(args.mark_as_delete) && !useNuxtApp().$s.isBlank(args.mark_as_delete)) {
        filter["mark_as_delete"] = { $eq: args.mark_as_delete };
      }
      return filter;
    },
    /*Search [Role]*/
    async searchRoles() {
      this.progress = true;
      try {
        let consultant_list = await useFetch("/api/roles", {
          method: "post",
          initialCache: false,
          body: {
            projection: useState("mongo_query").value.projection,
            filter: this.buildMongoQueryFilterCriteria(this.filter),
            limit: _.isNumber(this.filter.limit) ? parseInt(this.filter.limit) : 1e4
          }
        }, "$xp0GdtT1Uz");
        setTimeout(() => {
          useState("grid").value.updateConfig({ data: consultant_list.data._rawValue.documents }).forceRender();
          this.progress = false;
        }, 2e3);
      } catch (err) {
        this.progress = false;
        useNuxtApp().$toast.show({
          type: "danger",
          message: err.message,
          timeout: 6
        });
      }
    }
  },
  created() {
    useNuxtApp().$bus.$on("evtSearchRole", (data) => {
      this.filter = data;
      this.searchRoles();
    });
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "RoleGrid",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const api = "/api/roles/";
    useState("grid");
    const mongo_query = useState("mongo_query", () => ({
      projection: {},
      filter: {},
      limit: 25
    }));
    ref();
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      "Roles-list-" + Math.random,
      () => $fetch(api, {
        initialCache: false,
        method: "post",
        body: mongo_query.value,
        onResponse({ request, response, options }) {
          this.data = response._data.documents;
        }
      }),
      "$6qE7zQx9Nd"
    )), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 sm:px-4 lg:px-4" }, _attrs))}><div class="sm:flex sm:items-center"></div><div class="mt-2 flex flex-col"><div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"><div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/menus/RoleGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
