import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { _ as __nuxt_component_3, a as __nuxt_component_4 } from './zynomi-stats-simple-8645f8de.mjs';
import { f as useState, G as useCompany, H as useCompanyStore, d as useNuxtApp, p as useAsyncData, C as useSupabaseUser } from '../server.mjs';
import { ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { omit, capitalize } from 'lodash-es';
import { ssrRenderComponent } from 'vue/server-renderer';
import AccountPageHeader from './AccountPageHeader-e61b473f.mjs';
import _sfc_main$2 from './ProfileUpsert-2362892d.mjs';
import _sfc_main$1 from './Avatar-da605b7b.mjs';
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
import '@headlessui/vue';
import './XMarkIcon-293bebc4.mjs';

const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const api = "/api/profiles/";
    useState("user_profile");
    useState("avatar_url");
    useState("componentKey", () => ref(0));
    const company = ([__temp, __restore] = withAsyncContext(() => useCompany()), __temp = await __temp, __restore(), __temp);
    if (company.data._rawValue.length > 0)
      useCompanyStore().updateCompany(company.data._rawValue[0]);
    ref(false);
    ref({});
    useNuxtApp().$bus.$on("evtUploadSuccess", (data) => {
      data.url;
    });
    const { data: profile } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "profile" + Math.random,
      () => (
        //Customized query string as compared to supabase/PostgREST convention to retrieve only the required fields
        // If you want all fields then replace it with "*"
        $fetch(api + useSupabaseUser().value.id + "?email,first_name,last_name,avatar_url", {
          initialCache: false,
          method: "get",
          onResponse({ request, response, options }) {
          }
        })
      ),
      "$GRLahErCZK"
    )), __temp = await __temp, __restore(), __temp);
    useState("avatar_url").value = profile.value[0].avatar_url;
    useState("user_profile").value = omit(profile.value[0], "avatar_url");
    useState("componentKey").value += 1;
    const stats = [
      {
        hidden: false,
        title: "Username",
        description: "",
        value: useSupabaseUser().value.email,
        icon: "icon-park-twotone:avatar",
        iconForeground: "text-purple-700",
        iconBackground: "bg-purple-50",
        links: [
          {
            title: "Profile",
            clickEvent: "evtUpsertProfile"
          },
          {
            title: "Change Password",
            clickEvent: "evtChangePassword"
          }
        ]
      },
      {
        hidden: false,
        title: "Role",
        description: "",
        value: capitalize(useSupabaseUser().value.role),
        icon: "icon-park-twotone:id-card-h",
        iconForeground: "text-teal-700",
        iconBackground: "bg-teal-50",
        links: [
          {
            title: "",
            clickEvent: "noops"
          },
          {
            title: "",
            clickEvent: "noops"
          }
        ]
      },
      {
        hidden: false,
        title: "Member Since",
        description: "",
        value: useNuxtApp().$dayjs(useSupabaseUser().value.created_at).format("DD-MMM-YYYY"),
        icon: "icon-park-twotone:calendar",
        iconForeground: "text-yellow-700",
        iconBackground: "bg-yellow-50",
        links: [
          {
            title: "",
            clickEvent: "noops"
          },
          {
            title: "",
            clickEvent: "noops"
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_zynomi_stats_simple = __nuxt_component_3;
      const _component_zynomi_dynamic_data_display = __nuxt_component_4;
      _push(`<!--[--><div class="h-screen flex overflow-hidden bg-gray-50"><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden"><div class="flex-1 xl:overflow-y-auto">`);
      _push(ssrRenderComponent(AccountPageHeader, {
        heading: "Account",
        showbutton: "false",
        guide: "Manage your profile settings and personalizations",
        addClickEvent: "",
        buttonText: "Add"
      }, null, _parent));
      _push(`<div class="mx-auto max-w-full px-4 sm:px-6 lg:px-8"><div class="pb-4">`);
      _push(ssrRenderComponent(_component_zynomi_stats_simple, { data: stats }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 gap-4 lg:grid-cols-3"><div class="grid grid-cols-1">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        image_src: ("useState" in _ctx ? _ctx.useState : unref(useState))("avatar_url").value
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 col-span-2">`);
      _push(ssrRenderComponent(_component_zynomi_dynamic_data_display, {
        title: "Personal Details",
        title_description: "User personal details and custom attributes",
        data: ("useState" in _ctx ? _ctx.useState : unref(useState))("user_profile").value,
        key: ("useState" in _ctx ? _ctx.useState : unref(useState))("componentKey").value
      }, null, _parent));
      _push(`</div></div></div></div></div></div></main></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
