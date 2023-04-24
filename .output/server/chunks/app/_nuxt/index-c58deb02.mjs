import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { _ as __nuxt_component_2 } from './SecondaryNav-60cd97a1.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { d as useNuxtApp, F as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import './Logo-d1137ce0.mjs';
import './Icon-7255ab8c.mjs';
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
import '@headlessui/vue';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const progress = ref(false);
    const data = ref({});
    useNuxtApp().$bus.$on("evtUploadSuccess", (data2) => {
      let attributes = {};
      attributes.logo_url = data2.url;
      attributes.logo_metadata = data2;
      upsertTenant(attributes, "upload");
    });
    useNuxtApp().$bus.$on("evtCompanyFormSubmit", (data2) => {
      upsertTenant(data2, "company");
    });
    async function upsertTenant(args, module) {
      try {
        progress.value = true;
        data.value = args;
        data.value.tenant = "www.xycc-company.com";
        data.value.updatedAt = useNuxtApp().$dayjs().utc();
        if (settings.value.documents.length == 0) {
          data.value.createdAt = useNuxtApp().$dayjs().utc();
          const { data: res } = await useFetch("/api/settings/create", {
            method: "post",
            body: data.value,
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data.insertedId) {
                useNuxtApp().$toast.show({ type: "success", message: `Record has been inserted successfully`, timeout: 6 });
              } else {
                useNuxtApp().$toast.show({ type: "error", message: `Failure`, timeout: 6 });
              }
              progress.value = false;
            }
          }, "$s0abt0FO5M");
        } else {
          await useFetch("/api/settings/" + settings.value.documents[0]._id, {
            //await useFetch("/api/upload", {
            method: "put",
            body: data.value,
            //omit the mongo object id before the upsert
            onResponse({ request, response, options }) {
              if (response._data.modifiedCount > 0) {
                console.log("response._data.modifiedCount=", response._data.modifiedCount);
                useNuxtApp().$toast.show({ type: "success", message: `Record has been updated successfully`, timeout: 6 });
              } else {
                useNuxtApp().$toast.show({ type: "error", message: `Failure`, timeout: 6 });
              }
              if (module == "upload") {
                store.updateLogoUrl(args.logo_url);
                store.updateLogoMetadata(args.logo_metadata);
              }
              progress.value = false;
            }
          }, "$1njNDVGn6C");
        }
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_CommonsSecondaryNav = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex overflow-hidden bg-gray-50" }, _attrs))}><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden">`);
      _push(ssrRenderComponent(_component_CommonsSecondaryNav, {
        title: "Organization",
        api_end_point: "/_navigation/organization"
      }, null, _parent));
      _push(`<div class="flex-1 xl:overflow-y-auto"><div class="w-full"></div></div></div></div></main></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organization/banks/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
