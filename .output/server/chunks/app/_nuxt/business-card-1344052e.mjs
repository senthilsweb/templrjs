import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import __nuxt_component_2 from './Icon-7255ab8c.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { d as useNuxtApp } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import _sfc_main$1 from './BusinessCardForm-218077de.mjs';
import DesignerPageHeader from './DesignerPageHeader-621c66cb.mjs';
import './Logo-d1137ce0.mjs';
import '@supabase/supabase-js';
import 'defu';
import '@headlessui/vue';
import 'lodash-es';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'mitt';
import 'vue-i18n';
import 'underscore.string';

const _sfc_main = {
  __name: "business-card",
  __ssrInlineRender: true,
  setup(__props) {
    const businessCard = ref({});
    ref("");
    const showBusinessCardPlaceholder = ref(true);
    useNuxtApp().$bus.$on("evtBusinessCardRender", (data) => {
      showBusinessCardPlaceholder.value = false;
      const image_url_parts = [`https://res.cloudinary.com`, `nathansweb`, `image`, "upload"].join("/");
      const name = `g_south_west,x_${data.name_x},y_${data.name_y},l_text:Arial_45_bold:${data.name}`;
      const designation = `g_south_west,x_${data.designation_x},y_${data.designation_y},l_text:Arial_28_bold:${data.designation}`;
      const email = `g_south_west,x_${data.email_x},y_${data.email_y},co_rgb:ffffff,l_text:open%20sans_18:${data.email}`;
      const mobile = `g_south_west,x_${data.mobile_x},y_${data.mobile_y},co_rgb:ffffff,l_text:open%20sans_18:${data.mobile}`;
      businessCard.value = [image_url_parts, name, designation, email, mobile, data.cloudinary_image_version, data.cloudinary_image_public_id].join("/");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex overflow-hidden bg-gray-50" }, _attrs))}><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex-1 xl:overflow-y-auto">`);
      _push(ssrRenderComponent(DesignerPageHeader, {
        showbutton: "true",
        guide: "Management screen to keep Client(s) up-to-date",
        addClickEvent: "evtUpsertClient"
      }, null, _parent));
      _push(`<div class="w-full"><div class="m-10 grid">`);
      if (unref(showBusinessCardPlaceholder)) {
        _push(`<button type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "icon-park-twotone:color-card",
          class: "h-12 w-12 text-gray-400"
        }, null, _parent));
        _push(`<span class="mt-2 block text-sm font-medium text-gray-900">Business Card</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(showBusinessCardPlaceholder)) {
        _push(`<div class="grid grid-cols-1 lg:gap-8 rounded-lg border-2 border-dashed border-gray-300"><img${ssrRenderAttr("src", unref(businessCard))} class="lg:col-span-2 lg:row-span-2 rounded-lg"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></main></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/utilities/designer/business-card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
