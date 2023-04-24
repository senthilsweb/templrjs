import { d as useNuxtApp, l as useRuntimeConfig, e as useAppConfig, f as useState, v as useCookie, w as callWithNuxt, x as updateAppConfig, y as refreshNuxtData } from '../server.mjs';
import { useSSRContext, inject, defineComponent, ref, watch, onUnmounted, computed, createApp } from 'vue';
import { ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentPreviewMode",
  __ssrInlineRender: true,
  props: {
    previewToken: {
      type: Object,
      required: true
    },
    apiURL: {
      type: String,
      required: true
    },
    storageReady: {
      type: Object,
      required: true
    },
    refresh: {
      type: Function,
      required: true
    },
    init: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const previewClasses = ["__nuxt_preview", "__preview_enabled"];
    const nuxtApp = useNuxtApp();
    const open = ref(true);
    const refreshing = ref(false);
    const apiReady = ref(false);
    const previewReady = ref(false);
    watch(() => apiReady.value, () => {
      if (props.storageReady.value) {
        props.refresh().then(() => {
          previewReady.value = true;
          nuxtApp.callHook("nuxt-studio:preview:ready");
        });
      }
    });
    watch(() => props.storageReady.value, () => {
      if (apiReady.value) {
        props.refresh().then(() => {
          previewReady.value = true;
          nuxtApp.callHook("nuxt-studio:preview:ready");
        });
      }
    });
    onUnmounted(() => {
      document.body.classList.remove(...previewClasses);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e47e8f36>`);
      if (open.value) {
        _push(`<div id="__nuxt_preview" class="${ssrRenderClass({ __preview_ready: previewReady.value, __preview_refreshing: refreshing.value })}" data-v-e47e8f36>`);
        if (previewReady.value) {
          _push(`<!--[--><svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e47e8f36><path d="M50.0016 71.0999h29.2561c.9293.0001 1.8422-.241 2.6469-.6992.8047-.4582 1.4729-1.1173 1.9373-1.9109.4645-.7936.7088-1.6939.7083-2.6102-.0004-.9162-.2455-1.8163-.7106-2.6095L64.192 29.713c-.4644-.7934-1.1325-1.4523-1.937-1.9105-.8046-.4581-1.7173-.6993-2.6463-.6993-.9291 0-1.8418.2412-2.6463.6993-.8046.4582-1.4726 1.1171-1.937 1.9105l-5.0238 8.5861-9.8224-16.7898c-.4648-.7934-1.1332-1.4522-1.938-1.9102-.8047-.4581-1.7176-.6992-2.6468-.6992-.9292 0-1.842.2411-2.6468.6992-.8048.458-1.4731 1.1168-1.9379 1.9102L6.56062 63.2701c-.46512.7932-.71021 1.6933-.71061 2.6095-.00041.9163.24389 1.8166.70831 2.6102.46443.7936 1.1326 1.4527 1.93732 1.9109.80473.4582 1.71766.6993 2.64686.6992h18.3646c7.2763 0 12.6422-3.1516 16.3345-9.3002l8.9642-15.3081 4.8015-8.1925 14.4099 24.6083H54.8058l-4.8042 8.1925ZM29.2077 62.899l-12.8161-.0028L35.603 30.0869l9.5857 16.4047-6.418 10.9645c-2.4521 3.9894-5.2377 5.4429-9.563 5.4429Z" fill="currentColor" data-v-e47e8f36></path></svg><span data-v-e47e8f36>Preview mode enabled</span><button data-v-e47e8f36> Close </button><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (open.value && !previewReady.value) {
        _push(`<div data-v-e47e8f36><div id="__preview_background" data-v-e47e8f36></div><div id="__preview_loader" data-v-e47e8f36><svg id="__preview_loading_icon" width="32" height="32" viewBox="0 0 24 24" data-v-e47e8f36><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" data-v-e47e8f36></path></svg><p data-v-e47e8f36>Initializing the preview...</p><button data-v-e47e8f36> Cancel </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContentPreviewMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e47e8f36"]]);
const mergeDraft = (dbFiles, draftAdditions, draftDeletions) => {
  const additions = [...draftAdditions || []];
  const deletions = [...draftDeletions || []];
  const mergedFiles = [...dbFiles || []];
  for (const addition of additions) {
    if (addition.oldPath) {
      deletions.splice(deletions.findIndex((d) => d.path === addition.oldPath), 1);
      const oldPathExistInCache = additions.find((a) => a.path === addition.oldPath);
      if (oldPathExistInCache) {
        mergedFiles.push({ path: addition.path, parsed: addition.parsed });
      } else {
        const file = mergedFiles.find((f) => f.path === addition.oldPath);
        if (file) {
          file.path = addition.path;
          if (addition.parsed) {
            file.parsed = addition.parsed;
          } else if (addition.pathMeta) {
            ["_file", "_path", "_id", "_locale"].forEach((key) => {
              file.parsed[key] = addition.pathMeta[key];
            });
          }
        }
      }
    } else if (addition.new) {
      mergedFiles.push({ path: addition.path, parsed: addition.parsed });
    } else {
      const file = mergedFiles.find((f) => f.path === addition.path);
      if (file) {
        Object.assign(file, { path: addition.path, parsed: addition.parsed });
      }
    }
  }
  for (const deletion of deletions) {
    mergedFiles.splice(mergedFiles.findIndex((f) => f.path === deletion.path), 1);
  }
  return mergedFiles;
};
const useStudio = () => {
  const nuxtApp = useNuxtApp();
  const runtimeConfig = useRuntimeConfig().public.studio || {};
  const initialAppConfig = JSON.parse(JSON.stringify(useAppConfig()));
  const themeSheet = inject("pinceauTheme");
  const initialTokensConfig = themeSheet && (themeSheet == null ? void 0 : themeSheet.theme) ? themeSheet.theme.value : {};
  const storage = useState("client-db", () => null);
  const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
  const syncPreviewFiles = async (contentStorage, files, ignoreBuiltContents = true) => {
    const keys = await contentStorage.getKeys(`${previewToken.value}:`);
    await Promise.all(keys.map((key) => contentStorage.removeItem(key)));
    await contentStorage.setItem(
      `${previewToken.value}$`,
      JSON.stringify({
        ignoreBuiltContents
      })
    );
    await Promise.all(
      files.map((item) => {
        var _a;
        return contentStorage.setItem(`${previewToken.value}:${(_a = item.parsed) == null ? void 0 : _a._id}`, JSON.stringify(item.parsed));
      })
    );
  };
  const syncPreviewAppConfig = (appConfig) => {
    callWithNuxt(nuxtApp, updateAppConfig, [appConfig || initialAppConfig]);
  };
  const syncPreviewTokensConfig = (tokensConfig) => {
    if (!themeSheet || !(themeSheet == null ? void 0 : themeSheet.updateTheme)) {
      return;
    }
    callWithNuxt(nuxtApp, themeSheet.updateTheme, tokensConfig || initialTokensConfig);
  };
  const syncPreview = async (contentStorage) => {
    const data = await $fetch("api/projects/preview", {
      baseURL: runtimeConfig.apiURL,
      params: {
        token: previewToken.value
      }
    });
    const mergedFiles = mergeDraft(data.files, data.additions, data.deletions);
    const contentFiles = mergedFiles.filter((item) => item.path.startsWith("content"));
    await syncPreviewFiles(contentStorage, contentFiles, (data.files || []).length !== 0);
    const dotStudioFiles = mergedFiles.filter((item) => item.path.startsWith(".studio"));
    const appConfig = dotStudioFiles.find((item) => item.path === ".studio/app.config.json");
    syncPreviewAppConfig(appConfig == null ? void 0 : appConfig.parsed);
    const tokensConfig = dotStudioFiles.find((item) => item.path === ".studio/tokens.config.json");
    syncPreviewAppConfig(tokensConfig == null ? void 0 : tokensConfig.parsed);
  };
  const requestPreviewSynchronization = async () => {
    await $fetch("api/projects/preview/sync", {
      baseURL: runtimeConfig.apiURL,
      method: "POST",
      params: {
        token: previewToken.value
      }
    });
  };
  const mountPreviewUI = (storage2) => {
    const storageReady = computed(() => !!storage2.value);
    const el = document.createElement("div");
    el.id = "__nuxt_preview_wrapper";
    document.body.appendChild(el);
    createApp(ContentPreviewMode, {
      previewToken,
      apiURL: runtimeConfig.apiURL,
      storageReady,
      refresh: () => syncPreview(storage2.value).then(() => refreshNuxtData()),
      init: requestPreviewSynchronization
    }).mount(el);
  };
  const findContentWithId = async (path) => {
    var _a, _b;
    if (!path) {
      return null;
    }
    path = path.replace(/\/$/, "");
    let content = await ((_a = storage.value) == null ? void 0 : _a.getItem(`${previewToken.value}:${path}`));
    if (!content) {
      content = await ((_b = storage.value) == null ? void 0 : _b.getItem(path));
    }
    return content;
  };
  return {
    apiURL: runtimeConfig.apiURL,
    previewToken,
    contentStorage: storage,
    syncPreview,
    syncPreviewFiles,
    syncPreviewAppConfig,
    syncPreviewTokensConfig,
    requestPreviewSynchronization,
    mountPreviewUI,
    findContentWithId
  };
};

export { useStudio };
