import { d as useNuxtApp } from '../server.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    image_src: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const isUploaderFormOpen = ref(true);
    const progress = ref(false);
    ref({});
    const files = ref([]);
    const avatar_image_changed = ref(false);
    ref(0);
    useNuxtApp().$bus.$on("evtUploaderForm", (data) => {
      progress.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        show: isUploaderFormOpen.value,
        class: "space-y-8 divide-y divide-gray sm:space-y-5"
      }, _attrs))}><div class="mt-5 md:col-span-2 md:mt-0"><form><div class="shadow sm:overflow-hidden sm:rounded-md"><div class="space-y-6 bg-white px-4 py-5 sm:p-6"><div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0"><div class="relative hidden overflow-hidden lg:block"><img class="aspect-[4/5] w-52 h-52 flex-none rounded-2xl object-cover"${ssrRenderAttr("src", props.image_src ? props.image_src : "https://via.placeholder.com/100.png")} alt=""><label for="desktop-user-photo" class="absolute inset-0 flex w-52 h-52 rounded-2xl items-center justify-center bg-gray-700 bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"><span class="text-white">Change</span><span class="sr-only">user photo</span><input type="file" id="desktop-user-photo" class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"></label></div></div><div class="hidden"><label class="block text-sm font-medium text-gray-700">Cover photo</label><div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"><div class="space-y-1 text-center"><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div class="flex text-sm text-gray-600"><label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" multiple class="sr-only"></label><p class="pl-1">or drag and drop</p></div><p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p></div></div></div></div><div class="flex flex-shrink-0 justify-end gap-x-4 px-4 py-4">`);
      if (avatar_image_changed.value == true) {
        _push(`<p class="text-sm leading-5 text-gray-400 text-center">${ssrInterpolate(files.value[0].name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="${ssrRenderClass([[!avatar_image_changed.value ? "disabled:opacity-75" : ""], "zyn-button"])}"${ssrIncludeBooleanAttr(!avatar_image_changed.value) ? " disabled" : ""}>Upload</button></div></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/Avatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
