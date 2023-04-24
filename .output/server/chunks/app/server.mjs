import { getCurrentInstance, version, toRef, isRef, inject, ref, onServerPrefetch, unref, computed, reactive, h, watchEffect, watch, defineComponent, createApp, shallowReactive, useSSRContext, markRaw, effectScope, isReactive, toRaw, provide, onErrorCaptured, createVNode, resolveDynamicComponent, getCurrentScope, onScopeDispose, nextTick, shallowRef, isReadonly, defineAsyncComponent, toRefs, withAsyncContext, mergeProps, Suspense, Transition } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { renderSSRHead } from '@unhead/ssr';
import { composableNames, getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { createMemoryHistory, createRouter, RouterView } from 'vue-router';
import { b as useRuntimeConfig$1, j as sendRedirect, h as createError$1, c as setResponseStatus$1, k as appendHeader } from '../nitro/node-server.mjs';
import { hasProtocol, parseURL, joinURL, withoutTrailingSlash, withLeadingSlash, withBase, isEqual as isEqual$1 } from 'ufo';
import { nanoid } from 'nanoid';
import { kebabCase } from 'scule';
import { defu } from 'defu';
import { parse, serialize } from 'cookie-es';
import { hash, isEqual } from 'ohash';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import localeData from 'dayjs/plugin/localeData.js';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import utc from 'dayjs/plugin/utc.js';
import mitt from 'mitt';
import { createI18n } from 'vue-i18n';
import underscorestring from 'underscore.string';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs } from 'vue/server-renderer';
import { union } from 'lodash-es';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'radix3';
import 'unenv/runtime/fetch/index';
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

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.4.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      data: shallowReactive({}),
      state: shallowReactive({}),
      _errors: shallowReactive({}),
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtAppCtx.call(nuxtApp, () => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin2, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin2 of plugins2) {
    await applyPlugin(nuxtApp, plugin2);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin2 of _plugins2) {
    if (typeof plugin2 !== "function") {
      continue;
    }
    let _plugin = plugin2;
    if (plugin2.length > 1) {
      _plugin = (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a, _b;
    return (((_a = a.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin2, meta) {
  var _a;
  if (typeof plugin2 === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin2 }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin2.hooks) {
      nuxtApp.hooks.addHooks(plugin2.hooks);
    }
    if (plugin2.setup) {
      return plugin2.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin2.name || ((_a = plugin2.setup) == null ? void 0 : _a.name),
    order: (meta == null ? void 0 : meta.order) || plugin2.order || orderMap[plugin2.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const isVue2 = false;
/*!
  * pinia v2.0.34
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || currentInstance && inject(piniaSymbol, null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
const VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
};
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  const event = (_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
function setResponseStatus(arg1, arg2, arg3) {
  if (arg1 && typeof arg1 !== "number") {
    return setResponseStatus$1(arg1, arg2, arg3);
  }
  return setResponseStatus$1(useRequestEvent(), arg1, arg2);
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      if (isProcessingMiddleware() && !isExternal) {
        setResponseStatus(nuxtApp.ssrContext.event, (options == null ? void 0 : options.redirectCode) || 302);
        return to;
      }
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const getDefault = () => null;
function useAsyncData(...args) {
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? ((_a = options.default) == null ? void 0 : _a.call(options)) ?? null),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(((_a2 = options.default) == null ? void 0 : _a2.call(options)) ?? null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
async function refreshNuxtData(keys) {
  {
    return Promise.resolve();
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watch2,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: watch2 === false ? [] : [_fetchOptions, _request, ...watch2 || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const cfg0 = defineAppConfig({
  docus: {
    title: "Docus",
    description: "The best place to start your documentation.",
    image: "https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png",
    socials: {},
    layout: "default",
    header: {
      title: "",
      logo: false,
      showLinkIcon: false,
      fluid: false,
      exclude: []
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    footer: {
      credits: {
        icon: "IconDocus",
        text: "Powered by Docus",
        href: "https://docus.dev"
      },
      textLinks: [],
      iconLinks: [],
      fluid: false
    },
    github: {
      dir: void 0,
      branch: void 0,
      repo: void 0,
      owner: void 0,
      edit: false
    }
  }
});
const cfg1 = defineAppConfig({
  prose: {
    copyButton: {
      iconCopy: "ph:copy",
      iconCopied: "ph:check"
    },
    headings: {
      icon: "ph:link"
    }
  }
});
const cfg2 = defineAppConfig({});
const inlineConfig = {};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, cfg1, cfg2, inlineConfig);
function deepAssign(obj, newObj) {
  for (const key in newObj) {
    const val = newObj[key];
    if (val !== null && typeof val === "object") {
      obj[key] = obj[key] || {};
      deepAssign(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
}
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}
function updateAppConfig(appConfig2) {
  const _appConfig = useAppConfig();
  deepAssign(_appConfig, appConfig2);
}
const plugin_vue3_A0OWXRrUgq = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const components = {
  Hero: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Hero-4c4f91c9.mjs'
    /* webpackChunkName: "components/hero" */
  ).then((c) => c.default || c)),
  AppFooter: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppFooter-f500e53e.mjs'
    /* webpackChunkName: "components/app-footer" */
  ).then((c) => c.default || c)),
  AppHeader: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppHeader-49197120.mjs'
    /* webpackChunkName: "components/app-header" */
  ).then((c) => c.default || c)),
  AppHeaderDialog: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppHeaderDialog-2bccc5d0.mjs'
    /* webpackChunkName: "components/app-header-dialog" */
  ).then((c) => c.default || c)),
  AppHeaderLogo: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppHeaderLogo-a47208ff.mjs'
    /* webpackChunkName: "components/app-header-logo" */
  ).then((c) => c.default || c)),
  AppHeaderNavigation: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppHeaderNavigation-2f3ce41f.mjs'
    /* webpackChunkName: "components/app-header-navigation" */
  ).then((c) => c.default || c)),
  AppLayout: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppLayout-27118aba.mjs'
    /* webpackChunkName: "components/app-layout" */
  ).then((c) => c.default || c)),
  AppLoadingBar: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppLoadingBar-094105ed.mjs'
    /* webpackChunkName: "components/app-loading-bar" */
  ).then((c) => c.default || c)),
  AppSearch: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppSearch-594ba01e.mjs'
    /* webpackChunkName: "components/app-search" */
  ).then(function(n) {
    return n.A;
  }).then((c) => c.default || c)),
  AppSocialIcons: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/AppSocialIcons-7f7e643f.mjs'
    /* webpackChunkName: "components/app-social-icons" */
  ).then((c) => c.default || c)),
  Ellipsis: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Ellipsis-0794012f.mjs'
    /* webpackChunkName: "components/ellipsis" */
  ).then((c) => c.default || c)),
  Logo: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Logo-cce25469.mjs'
    /* webpackChunkName: "components/logo" */
  ).then((c) => c.default || c)),
  ThemeSelect: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ThemeSelect-410f73c4.mjs'
    /* webpackChunkName: "components/theme-select" */
  ).then((c) => c.default || c)),
  DocsAside: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsAside-14ade949.mjs'
    /* webpackChunkName: "components/docs-aside" */
  ).then((c) => c.default || c)),
  DocsAsideTree: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsAsideTree-d44b48dc.mjs'
    /* webpackChunkName: "components/docs-aside-tree" */
  ).then((c) => c.default || c)),
  DocsPageBottom: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsPageBottom-2978540e.mjs'
    /* webpackChunkName: "components/docs-page-bottom" */
  ).then((c) => c.default || c)),
  DocsPageLayout: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsPageLayout-3ca22bd3.mjs'
    /* webpackChunkName: "components/docs-page-layout" */
  ).then((c) => c.default || c)),
  DocsPrevNext: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsPrevNext-8476f060.mjs'
    /* webpackChunkName: "components/docs-prev-next" */
  ).then((c) => c.default || c)),
  DocsToc: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsToc-903ccbdb.mjs'
    /* webpackChunkName: "components/docs-toc" */
  ).then((c) => c.default || c)),
  DocsTocLinks: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/DocsTocLinks-2f9a65ed.mjs'
    /* webpackChunkName: "components/docs-toc-links" */
  ).then((c) => c.default || c)),
  EditOnLink: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/EditOnLink-673ff70a.mjs'
    /* webpackChunkName: "components/edit-on-link" */
  ).then((c) => c.default || c)),
  SourceLink: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/SourceLink-9550abd5.mjs'
    /* webpackChunkName: "components/source-link" */
  ).then((c) => c.default || c)),
  ProseA: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseA-3bfe7592.mjs'
    /* webpackChunkName: "components/prose-a" */
  ).then((c) => c.default || c)),
  ProseBlockquote: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseBlockquote-99914ccc.mjs'
    /* webpackChunkName: "components/prose-blockquote" */
  ).then((c) => c.default || c)),
  ProseCode: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseCode-f1788e75.mjs'
    /* webpackChunkName: "components/prose-code" */
  ).then((c) => c.default || c)),
  ProseCodeInline: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseCodeInline-7380c63e.mjs'
    /* webpackChunkName: "components/prose-code-inline" */
  ).then((c) => c.default || c)),
  ProseEm: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseEm-73af38c0.mjs'
    /* webpackChunkName: "components/prose-em" */
  ).then((c) => c.default || c)),
  ProseH1: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseH1-5252f0bd.mjs'
    /* webpackChunkName: "components/prose-h1" */
  ).then((c) => c.default || c)),
  ProseH2: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseH2-fb31c95c.mjs'
    /* webpackChunkName: "components/prose-h2" */
  ).then((c) => c.default || c)),
  ProseH3: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseH3-736e3a2a.mjs'
    /* webpackChunkName: "components/prose-h3" */
  ).then((c) => c.default || c)),
  ProseH4: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseH4-6ac4a84c.mjs'
    /* webpackChunkName: "components/prose-h4" */
  ).then((c) => c.default || c)),
  ProseH5: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseH5-fee4ccd4.mjs'
    /* webpackChunkName: "components/prose-h5" */
  ).then((c) => c.default || c)),
  ProseH6: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseH6-5d097846.mjs'
    /* webpackChunkName: "components/prose-h6" */
  ).then((c) => c.default || c)),
  ProseHr: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseHr-ef443763.mjs'
    /* webpackChunkName: "components/prose-hr" */
  ).then((c) => c.default || c)),
  ProseImg: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseImg-5b0df2e9.mjs'
    /* webpackChunkName: "components/prose-img" */
  ).then((c) => c.default || c)),
  ProseLi: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseLi-2524e31a.mjs'
    /* webpackChunkName: "components/prose-li" */
  ).then((c) => c.default || c)),
  ProseOl: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseOl-bd094fa4.mjs'
    /* webpackChunkName: "components/prose-ol" */
  ).then((c) => c.default || c)),
  ProseP: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseP-a278c4f1.mjs'
    /* webpackChunkName: "components/prose-p" */
  ).then((c) => c.default || c)),
  ProseStrong: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseStrong-c3bc9d35.mjs'
    /* webpackChunkName: "components/prose-strong" */
  ).then((c) => c.default || c)),
  ProseTable: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseTable-6a5226ca.mjs'
    /* webpackChunkName: "components/prose-table" */
  ).then((c) => c.default || c)),
  ProseTbody: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseTbody-23eebb3e.mjs'
    /* webpackChunkName: "components/prose-tbody" */
  ).then((c) => c.default || c)),
  ProseTd: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseTd-664762d9.mjs'
    /* webpackChunkName: "components/prose-td" */
  ).then((c) => c.default || c)),
  ProseTh: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseTh-2548f5cf.mjs'
    /* webpackChunkName: "components/prose-th" */
  ).then((c) => c.default || c)),
  ProseThead: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseThead-b4767c58.mjs'
    /* webpackChunkName: "components/prose-thead" */
  ).then((c) => c.default || c)),
  ProseTr: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseTr-469e8e0b.mjs'
    /* webpackChunkName: "components/prose-tr" */
  ).then((c) => c.default || c)),
  ProseUl: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ProseUl-228c4d92.mjs'
    /* webpackChunkName: "components/prose-ul" */
  ).then((c) => c.default || c)),
  Alert: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Alert-def351b5.mjs'
    /* webpackChunkName: "components/alert" */
  ).then((c) => c.default || c)),
  Badge: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Badge-6b0751b1.mjs'
    /* webpackChunkName: "components/badge" */
  ).then((c) => c.default || c)),
  ButtonLink: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ButtonLink-f3bb5764.mjs'
    /* webpackChunkName: "components/button-link" */
  ).then((c) => c.default || c)),
  Callout: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Callout-da65b0a6.mjs'
    /* webpackChunkName: "components/callout" */
  ).then((c) => c.default || c)),
  CodeBlock: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/CodeBlock-86013673.mjs'
    /* webpackChunkName: "components/code-block" */
  ).then((c) => c.default || c)),
  CodeGroup: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/CodeGroup-295c82eb.mjs'
    /* webpackChunkName: "components/code-group" */
  ).then((c) => c.default || c)),
  Container: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Container-c39ca67d.mjs'
    /* webpackChunkName: "components/container" */
  ).then((c) => c.default || c)),
  CopyButton: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/CopyButton-a91a0a6b.mjs'
    /* webpackChunkName: "components/copy-button" */
  ).then((c) => c.default || c)),
  List: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/List-624e63c7.mjs'
    /* webpackChunkName: "components/list" */
  ).then((c) => c.default || c)),
  NuxtImg: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/NuxtImg-94a7d593.mjs'
    /* webpackChunkName: "components/nuxt-img" */
  ).then((c) => c.default || c)),
  Props: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Props-3593f99f.mjs'
    /* webpackChunkName: "components/props" */
  ).then((c) => c.default || c)),
  Sandbox: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Sandbox-309e0bc3.mjs'
    /* webpackChunkName: "components/sandbox" */
  ).then((c) => c.default || c)),
  TabsHeader: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/TabsHeader-6c552869.mjs'
    /* webpackChunkName: "components/tabs-header" */
  ).then((c) => c.default || c)),
  Terminal: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Terminal-d6f257d8.mjs'
    /* webpackChunkName: "components/terminal" */
  ).then((c) => c.default || c)),
  VideoPlayer: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/VideoPlayer-82c90c35.mjs'
    /* webpackChunkName: "components/video-player" */
  ).then((c) => c.default || c)),
  IconCodeSandBox: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconCodeSandBox-0d7b1603.mjs'
    /* webpackChunkName: "components/icon-code-sand-box" */
  ).then((c) => c.default || c)),
  IconDocus: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconDocus-ec2c6448.mjs'
    /* webpackChunkName: "components/icon-docus" */
  ).then((c) => c.default || c)),
  IconNuxt: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconNuxt-1a5dd151.mjs'
    /* webpackChunkName: "components/icon-nuxt" */
  ).then((c) => c.default || c)),
  IconNuxtContent: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconNuxtContent-65c45446.mjs'
    /* webpackChunkName: "components/icon-nuxt-content" */
  ).then((c) => c.default || c)),
  IconNuxtLabs: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconNuxtLabs-0fc09086.mjs'
    /* webpackChunkName: "components/icon-nuxt-labs" */
  ).then((c) => c.default || c)),
  IconNuxtStudio: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconNuxtStudio-4ded5345.mjs'
    /* webpackChunkName: "components/icon-nuxt-studio" */
  ).then((c) => c.default || c)),
  IconStackBlitz: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconStackBlitz-1c94c75a.mjs'
    /* webpackChunkName: "components/icon-stack-blitz" */
  ).then((c) => c.default || c)),
  IconVueTelescope: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconVueTelescope-72470172.mjs'
    /* webpackChunkName: "components/icon-vue-telescope" */
  ).then((c) => c.default || c)),
  BlockHero: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/BlockHero-847993bd.mjs'
    /* webpackChunkName: "components/block-hero" */
  ).then((c) => c.default || c)),
  Card: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Card-935af505.mjs'
    /* webpackChunkName: "components/card" */
  ).then((c) => c.default || c)),
  CardGrid: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/CardGrid-e8892c7e.mjs'
    /* webpackChunkName: "components/card-grid" */
  ).then((c) => c.default || c)),
  VoltaBoard: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/VoltaBoard-98820156.mjs'
    /* webpackChunkName: "components/volta-board" */
  ).then((c) => c.default || c)),
  ComponentPlayground: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ComponentPlayground-d994d24d.mjs'
    /* webpackChunkName: "components/component-playground" */
  ).then((c) => c.default || c)),
  ComponentPlaygroundData: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ComponentPlaygroundData-eda9fa97.mjs'
    /* webpackChunkName: "components/component-playground-data" */
  ).then((c) => c.default || c)),
  ComponentPlaygroundProps: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ComponentPlaygroundProps-44da5d2f.mjs'
    /* webpackChunkName: "components/component-playground-props" */
  ).then((c) => c.default || c)),
  ComponentPlaygroundSlots: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ComponentPlaygroundSlots-0dbd767a.mjs'
    /* webpackChunkName: "components/component-playground-slots" */
  ).then((c) => c.default || c)),
  ComponentPlaygroundTokens: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ComponentPlaygroundTokens-548a0a2d.mjs'
    /* webpackChunkName: "components/component-playground-tokens" */
  ).then((c) => c.default || c)),
  PreviewLayout: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/PreviewLayout-8146f283.mjs'
    /* webpackChunkName: "components/preview-layout" */
  ).then((c) => c.default || c)),
  TokensPlayground: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/TokensPlayground-9e60f1ab.mjs'
    /* webpackChunkName: "components/tokens-playground" */
  ).then((c) => c.default || c)),
  ContentDoc: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentDoc-1e5d313e.mjs'
    /* webpackChunkName: "components/content-doc" */
  ).then((c) => c.default || c)),
  ContentList: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentList-306f7d7c.mjs'
    /* webpackChunkName: "components/content-list" */
  ).then((c) => c.default || c)),
  ContentNavigation: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentNavigation-266a8c35.mjs'
    /* webpackChunkName: "components/content-navigation" */
  ).then((c) => c.default || c)),
  ContentQuery: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentQuery-334f2a49.mjs'
    /* webpackChunkName: "components/content-query" */
  ).then((c) => c.default || c)),
  ContentRenderer: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentRenderer-31636ced.mjs'
    /* webpackChunkName: "components/content-renderer" */
  ).then((c) => c.default || c)),
  ContentRendererMarkdown: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentRendererMarkdown-19dabe14.mjs'
    /* webpackChunkName: "components/content-renderer-markdown" */
  ).then(function(n) {
    return n.C;
  }).then((c) => c.default || c)),
  ContentSlot: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/ContentSlot-51ed8bb6.mjs'
    /* webpackChunkName: "components/content-slot" */
  ).then((c) => c.default || c)),
  Markdown: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Markdown-d2c819b6.mjs'
    /* webpackChunkName: "components/markdown" */
  ).then((c) => c.default || c)),
  Icon: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/Icon-7255ab8c.mjs'
    /* webpackChunkName: "components/icon" */
  ).then((c) => c.default || c)),
  GithubRepository: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubRepository-35d27c42.mjs'
    /* webpackChunkName: "components/github-repository" */
  ).then((c) => c.default || c)),
  GithubLink: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubLink-9c98232d.mjs'
    /* webpackChunkName: "components/github-link" */
  ).then((c) => c.default || c)),
  GithubReadme: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubReadme-dbf01aaa.mjs'
    /* webpackChunkName: "components/github-readme" */
  ).then((c) => c.default || c)),
  GithubReleases: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubReleases-51034415.mjs'
    /* webpackChunkName: "components/github-releases" */
  ).then((c) => c.default || c)),
  GithubLastRelease: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubLastRelease-7128c852.mjs'
    /* webpackChunkName: "components/github-last-release" */
  ).then((c) => c.default || c)),
  GithubRelease: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubRelease-b3bcd635.mjs'
    /* webpackChunkName: "components/github-release" */
  ).then((c) => c.default || c)),
  GithubContributors: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubContributors-16678d29.mjs'
    /* webpackChunkName: "components/github-contributors" */
  ).then((c) => c.default || c)),
  GithubFileContributors: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubFileContributors-d2971f73.mjs'
    /* webpackChunkName: "components/github-file-contributors" */
  ).then((c) => c.default || c)),
  GithubCommits: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/GithubCommits-31fba6bb.mjs'
    /* webpackChunkName: "components/github-commits" */
  ).then((c) => c.default || c))
};
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const name in components) {
      nuxtApp.vueApp.component(name, components[name]);
      nuxtApp.vueApp.component("Lazy" + name, components[name]);
    }
  }
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const __nuxt_page_meta$C = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$B = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$A = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$z = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$y = {};
const __nuxt_page_meta$x = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$w = {};
const __nuxt_page_meta$v = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$u = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$t = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$s = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$r = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$q = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$p = {
  layout: "public"
};
const __nuxt_page_meta$o = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$n = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$m = {
  layout: ""
};
const __nuxt_page_meta$l = {};
const __nuxt_page_meta$k = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$j = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$i = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$h = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$g = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$f = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$e = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$d = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$c = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$b = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$a = {};
const __nuxt_page_meta$9 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$8 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$7 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$6 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$5 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$4 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$3 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$2 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta$1 = {
  layout: "admin",
  middleware: ["auth"]
};
const __nuxt_page_meta = {
  layout: "admin",
  middleware: ["auth"]
};
const _routes = [
  {
    name: "slug",
    path: "/:slug(.*)*",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/document-driven-40dff6b2.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$C == null ? void 0 : __nuxt_page_meta$C.name) ?? "account-Account",
    path: (__nuxt_page_meta$C == null ? void 0 : __nuxt_page_meta$C.path) ?? "/account/Account",
    meta: __nuxt_page_meta$C || {},
    alias: (__nuxt_page_meta$C == null ? void 0 : __nuxt_page_meta$C.alias) || [],
    redirect: (__nuxt_page_meta$C == null ? void 0 : __nuxt_page_meta$C.redirect) || void 0,
    component: () => import('./_nuxt/Account-8ad2694c.mjs').then((m) => m.default || m)
  },
  {
    name: "account-AccountPageHeader",
    path: "/account/AccountPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/AccountPageHeader-e61b473f.mjs').then((m) => m.default || m)
  },
  {
    name: "account-Avatar",
    path: "/account/Avatar",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/Avatar-da605b7b.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$B == null ? void 0 : __nuxt_page_meta$B.name) ?? "account-Billing",
    path: (__nuxt_page_meta$B == null ? void 0 : __nuxt_page_meta$B.path) ?? "/account/Billing",
    meta: __nuxt_page_meta$B || {},
    alias: (__nuxt_page_meta$B == null ? void 0 : __nuxt_page_meta$B.alias) || [],
    redirect: (__nuxt_page_meta$B == null ? void 0 : __nuxt_page_meta$B.redirect) || void 0,
    component: () => import('./_nuxt/Billing-46c5242b.mjs').then((m) => m.default || m)
  },
  {
    name: "account-BillingDisplay",
    path: "/account/BillingDisplay",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/BillingDisplay-b69138ad.mjs').then((m) => m.default || m)
  },
  {
    name: "account-BillingInformation",
    path: "/account/BillingInformation",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/BillingInformation-49845242.mjs').then((m) => m.default || m)
  },
  {
    name: "account-BillingPlansUpsert",
    path: "/account/BillingPlansUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/BillingPlansUpsert-dd1728b0.mjs').then((m) => m.default || m)
  },
  {
    name: "account-PaymentInformation",
    path: "/account/PaymentInformation",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/PaymentInformation-5d05363a.mjs').then((m) => m.default || m)
  },
  {
    name: "account-ProfileUpsert",
    path: "/account/ProfileUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ProfileUpsert-2362892d.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$A == null ? void 0 : __nuxt_page_meta$A.name) ?? "account-Security",
    path: (__nuxt_page_meta$A == null ? void 0 : __nuxt_page_meta$A.path) ?? "/account/Security",
    meta: __nuxt_page_meta$A || {},
    alias: (__nuxt_page_meta$A == null ? void 0 : __nuxt_page_meta$A.alias) || [],
    redirect: (__nuxt_page_meta$A == null ? void 0 : __nuxt_page_meta$A.redirect) || void 0,
    component: () => import('./_nuxt/Security-072ea9d0.mjs').then((m) => m.default || m)
  },
  {
    name: "account-UserProfile",
    path: "/account/UserProfile",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserProfile-148014b8.mjs').then((m) => m.default || m)
  },
  {
    name: "account-UsersPageHeader",
    path: "/account/UsersPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersPageHeader-95ace8c3.mjs').then((m) => m.default || m)
  },
  {
    name: "account-UsersSearch",
    path: "/account/UsersSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersSearch-d8a3f33e.mjs').then((m) => m.default || m)
  },
  {
    name: "account-UsersUpsert",
    path: "/account/UsersUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersUpsert-6b804780.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$z == null ? void 0 : __nuxt_page_meta$z.name) ?? "account-slug",
    path: (__nuxt_page_meta$z == null ? void 0 : __nuxt_page_meta$z.path) ?? "/account/:slug(.*)*",
    meta: __nuxt_page_meta$z || {},
    alias: (__nuxt_page_meta$z == null ? void 0 : __nuxt_page_meta$z.alias) || [],
    redirect: (__nuxt_page_meta$z == null ? void 0 : __nuxt_page_meta$z.redirect) || void 0,
    component: () => import('./_nuxt/_...slug_-e142d99f.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$y == null ? void 0 : __nuxt_page_meta$y.name) ?? "casestudy-slug",
    path: (__nuxt_page_meta$y == null ? void 0 : __nuxt_page_meta$y.path) ?? "/casestudy/:slug(.*)*",
    meta: __nuxt_page_meta$y || {},
    alias: (__nuxt_page_meta$y == null ? void 0 : __nuxt_page_meta$y.alias) || [],
    redirect: (__nuxt_page_meta$y == null ? void 0 : __nuxt_page_meta$y.redirect) || void 0,
    component: () => import('./_nuxt/_...slug_-91f3f762.mjs').then((m) => m.default || m)
  },
  {
    name: "clients-ClientGrid",
    path: "/clients/ClientGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ClientGrid-6ebd7fc0.mjs').then((m) => m.default || m)
  },
  {
    name: "clients-ClientPageHeader",
    path: "/clients/ClientPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ClientPageHeader-1777c481.mjs').then((m) => m.default || m)
  },
  {
    name: "clients-ClientSearch",
    path: "/clients/ClientSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ClientSearch-f254273d.mjs').then((m) => m.default || m)
  },
  {
    name: "clients-ClientUpsert",
    path: "/clients/ClientUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ClientUpsert-f011dc9c.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$x == null ? void 0 : __nuxt_page_meta$x.name) ?? "clients",
    path: (__nuxt_page_meta$x == null ? void 0 : __nuxt_page_meta$x.path) ?? "/clients",
    meta: __nuxt_page_meta$x || {},
    alias: (__nuxt_page_meta$x == null ? void 0 : __nuxt_page_meta$x.alias) || [],
    redirect: (__nuxt_page_meta$x == null ? void 0 : __nuxt_page_meta$x.redirect) || void 0,
    component: () => import('./_nuxt/index-9de73663.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$w == null ? void 0 : __nuxt_page_meta$w.name) ?? "cms-slug",
    path: (__nuxt_page_meta$w == null ? void 0 : __nuxt_page_meta$w.path) ?? "/cms/:slug(.*)*",
    meta: __nuxt_page_meta$w || {},
    alias: (__nuxt_page_meta$w == null ? void 0 : __nuxt_page_meta$w.alias) || [],
    redirect: (__nuxt_page_meta$w == null ? void 0 : __nuxt_page_meta$w.redirect) || void 0,
    component: () => import('./_nuxt/_...slug_-eff1abb7.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-ConfigurationGrid",
    path: "/configurations/ConfigurationGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ConfigurationGrid-981b9791.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-ConfigurationPageHeader",
    path: "/configurations/ConfigurationPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ConfigurationPageHeader-ef649b14.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-ConfigurationSearch",
    path: "/configurations/ConfigurationSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ConfigurationSearch-3930228e.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-ConfigurationUpsert",
    path: "/configurations/ConfigurationUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ConfigurationUpsert-052a511b.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$v == null ? void 0 : __nuxt_page_meta$v.name) ?? "configurations",
    path: (__nuxt_page_meta$v == null ? void 0 : __nuxt_page_meta$v.path) ?? "/configurations",
    meta: __nuxt_page_meta$v || {},
    alias: (__nuxt_page_meta$v == null ? void 0 : __nuxt_page_meta$v.alias) || [],
    redirect: (__nuxt_page_meta$v == null ? void 0 : __nuxt_page_meta$v.redirect) || void 0,
    component: () => import('./_nuxt/index-bf6587b1.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-types-TypeGrid",
    path: "/configurations/types/TypeGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/TypeGrid-cd437946.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-types-TypePageHeader",
    path: "/configurations/types/TypePageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/TypePageHeader-cdc7ec76.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-types-TypeSearch",
    path: "/configurations/types/TypeSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/TypeSearch-8d248e50.mjs').then((m) => m.default || m)
  },
  {
    name: "configurations-types-TypeUpsert",
    path: "/configurations/types/TypeUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/TypeUpsert-ab82eac9.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$u == null ? void 0 : __nuxt_page_meta$u.name) ?? "configurations-types",
    path: (__nuxt_page_meta$u == null ? void 0 : __nuxt_page_meta$u.path) ?? "/configurations/types",
    meta: __nuxt_page_meta$u || {},
    alias: (__nuxt_page_meta$u == null ? void 0 : __nuxt_page_meta$u.alias) || [],
    redirect: (__nuxt_page_meta$u == null ? void 0 : __nuxt_page_meta$u.redirect) || void 0,
    component: () => import('./_nuxt/index-864baba7.mjs').then((m) => m.default || m)
  },
  {
    name: "contacts-ContactGrid",
    path: "/contacts/ContactGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ContactGrid-aa32664f.mjs').then((m) => m.default || m)
  },
  {
    name: "contacts-ContactPageHeader",
    path: "/contacts/ContactPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ContactPageHeader-802c1c30.mjs').then((m) => m.default || m)
  },
  {
    name: "contacts-ContactSearch",
    path: "/contacts/ContactSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ContactSearch-6ae9eb9a.mjs').then((m) => m.default || m)
  },
  {
    name: "contacts-ContactUpsert",
    path: "/contacts/ContactUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ContactUpsert-f947f43f.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$t == null ? void 0 : __nuxt_page_meta$t.name) ?? "contacts",
    path: (__nuxt_page_meta$t == null ? void 0 : __nuxt_page_meta$t.path) ?? "/contacts",
    meta: __nuxt_page_meta$t || {},
    alias: (__nuxt_page_meta$t == null ? void 0 : __nuxt_page_meta$t.alias) || [],
    redirect: (__nuxt_page_meta$t == null ? void 0 : __nuxt_page_meta$t.redirect) || void 0,
    component: () => import('./_nuxt/index-103a41f7.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$s == null ? void 0 : __nuxt_page_meta$s.name) ?? "crm",
    path: (__nuxt_page_meta$s == null ? void 0 : __nuxt_page_meta$s.path) ?? "/crm",
    meta: __nuxt_page_meta$s || {},
    alias: (__nuxt_page_meta$s == null ? void 0 : __nuxt_page_meta$s.alias) || [],
    redirect: (__nuxt_page_meta$s == null ? void 0 : __nuxt_page_meta$s.redirect) || void 0,
    component: () => import('./_nuxt/index-73e59fa8.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$r == null ? void 0 : __nuxt_page_meta$r.name) ?? "dashboard",
    path: (__nuxt_page_meta$r == null ? void 0 : __nuxt_page_meta$r.path) ?? "/dashboard",
    meta: __nuxt_page_meta$r || {},
    alias: (__nuxt_page_meta$r == null ? void 0 : __nuxt_page_meta$r.alias) || [],
    redirect: (__nuxt_page_meta$r == null ? void 0 : __nuxt_page_meta$r.redirect) || void 0,
    component: () => import('./_nuxt/index-81ca0fc4.mjs').then((m) => m.default || m)
  },
  {
    name: "departments-DepartmentGrid",
    path: "/departments/DepartmentGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/DepartmentGrid-cc357ffe.mjs').then((m) => m.default || m)
  },
  {
    name: "departments-DepartmentPageHeader",
    path: "/departments/DepartmentPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/DepartmentPageHeader-d4f81d1d.mjs').then((m) => m.default || m)
  },
  {
    name: "departments-DepartmentSearch",
    path: "/departments/DepartmentSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/DepartmentSearch-f4246bde.mjs').then((m) => m.default || m)
  },
  {
    name: "departments-DepartmentUpsert",
    path: "/departments/DepartmentUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/DepartmentUpsert-ad08cd17.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$q == null ? void 0 : __nuxt_page_meta$q.name) ?? "departments",
    path: (__nuxt_page_meta$q == null ? void 0 : __nuxt_page_meta$q.path) ?? "/departments",
    meta: __nuxt_page_meta$q || {},
    alias: (__nuxt_page_meta$q == null ? void 0 : __nuxt_page_meta$q.alias) || [],
    redirect: (__nuxt_page_meta$q == null ? void 0 : __nuxt_page_meta$q.redirect) || void 0,
    component: () => import('./_nuxt/index-130c6ac2.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$p == null ? void 0 : __nuxt_page_meta$p.name) ?? "docs-slug",
    path: (__nuxt_page_meta$p == null ? void 0 : __nuxt_page_meta$p.path) ?? "/docs/:slug(.*)*",
    meta: __nuxt_page_meta$p || {},
    alias: (__nuxt_page_meta$p == null ? void 0 : __nuxt_page_meta$p.alias) || [],
    redirect: (__nuxt_page_meta$p == null ? void 0 : __nuxt_page_meta$p.redirect) || void 0,
    component: () => import('./_nuxt/_...slug_-b179cfd6.mjs').then((m) => m.default || m)
  },
  {
    name: "employees-ClientAllocationUpsert",
    path: "/employees/ClientAllocationUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ClientAllocationUpsert-fcb5b4c4.mjs').then((m) => m.default || m)
  },
  {
    name: "employees-EmployeeGrid",
    path: "/employees/EmployeeGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/EmployeeGrid-6104c5f1.mjs').then((m) => m.default || m)
  },
  {
    name: "employees-EmployeePageHeader",
    path: "/employees/EmployeePageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/EmployeePageHeader-6a894029.mjs').then((m) => m.default || m)
  },
  {
    name: "employees-EmployeeSearch",
    path: "/employees/EmployeeSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/EmployeeSearch-0723a993.mjs').then((m) => m.default || m)
  },
  {
    name: "employees-EmployeeUpsert",
    path: "/employees/EmployeeUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/EmployeeUpsert-e53f2620.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$o == null ? void 0 : __nuxt_page_meta$o.name) ?? "employees",
    path: (__nuxt_page_meta$o == null ? void 0 : __nuxt_page_meta$o.path) ?? "/employees",
    meta: __nuxt_page_meta$o || {},
    alias: (__nuxt_page_meta$o == null ? void 0 : __nuxt_page_meta$o.alias) || [],
    redirect: (__nuxt_page_meta$o == null ? void 0 : __nuxt_page_meta$o.redirect) || void 0,
    component: () => import('./_nuxt/index-0fe8517c.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-4de0d857.mjs').then((m) => m.default || m)
  },
  {
    name: "inquiries-InquiriesGrid",
    path: "/inquiries/InquiriesGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/InquiriesGrid-e5911e7d.mjs').then((m) => m.default || m)
  },
  {
    name: "inquiries-InquiriesPageHeader",
    path: "/inquiries/InquiriesPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/InquiriesPageHeader-81426abb.mjs').then((m) => m.default || m)
  },
  {
    name: "inquiries-InquiriesSearch",
    path: "/inquiries/InquiriesSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/InquiriesSearch-99f2c9ea.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$n == null ? void 0 : __nuxt_page_meta$n.name) ?? "inquiries",
    path: (__nuxt_page_meta$n == null ? void 0 : __nuxt_page_meta$n.path) ?? "/inquiries",
    meta: __nuxt_page_meta$n || {},
    alias: (__nuxt_page_meta$n == null ? void 0 : __nuxt_page_meta$n.alias) || [],
    redirect: (__nuxt_page_meta$n == null ? void 0 : __nuxt_page_meta$n.redirect) || void 0,
    component: () => import('./_nuxt/index-26dead70.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$m == null ? void 0 : __nuxt_page_meta$m.name) ?? "legal-slug",
    path: (__nuxt_page_meta$m == null ? void 0 : __nuxt_page_meta$m.path) ?? "/legal/:slug()",
    meta: __nuxt_page_meta$m || {},
    alias: (__nuxt_page_meta$m == null ? void 0 : __nuxt_page_meta$m.alias) || [],
    redirect: (__nuxt_page_meta$m == null ? void 0 : __nuxt_page_meta$m.redirect) || void 0,
    component: () => import('./_nuxt/_…slug_-ed4fbcd9.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$l == null ? void 0 : __nuxt_page_meta$l.name) ?? "login",
    path: (__nuxt_page_meta$l == null ? void 0 : __nuxt_page_meta$l.path) ?? "/login",
    meta: __nuxt_page_meta$l || {},
    alias: (__nuxt_page_meta$l == null ? void 0 : __nuxt_page_meta$l.alias) || [],
    redirect: (__nuxt_page_meta$l == null ? void 0 : __nuxt_page_meta$l.redirect) || void 0,
    component: () => import('./_nuxt/login-9833321d.mjs').then((m) => m.default || m)
  },
  {
    name: "management-billing-BillingDisplay",
    path: "/management/billing/BillingDisplay",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/BillingDisplay-dad74023.mjs').then((m) => m.default || m)
  },
  {
    name: "management-billing-BillingPlansUpsert",
    path: "/management/billing/BillingPlansUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/BillingPlansUpsert-b83775b5.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$k == null ? void 0 : __nuxt_page_meta$k.name) ?? "management-billing",
    path: (__nuxt_page_meta$k == null ? void 0 : __nuxt_page_meta$k.path) ?? "/management/billing",
    meta: __nuxt_page_meta$k || {},
    alias: (__nuxt_page_meta$k == null ? void 0 : __nuxt_page_meta$k.alias) || [],
    redirect: (__nuxt_page_meta$k == null ? void 0 : __nuxt_page_meta$k.redirect) || void 0,
    component: () => import('./_nuxt/index-173ceb00.mjs').then((m) => m.default || m)
  },
  {
    name: "management-roles-RoleGrid",
    path: "/management/roles/RoleGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleGrid-57a46ab3.mjs').then((m) => m.default || m)
  },
  {
    name: "management-roles-RoleGridTable",
    path: "/management/roles/RoleGridTable",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleGridTable-0a7f4a95.mjs').then((m) => m.default || m)
  },
  {
    name: "management-roles-RolePageHeader",
    path: "/management/roles/RolePageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RolePageHeader-61c540f5.mjs').then((m) => m.default || m)
  },
  {
    name: "management-roles-RoleSearch",
    path: "/management/roles/RoleSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleSearch-fc378ac1.mjs').then((m) => m.default || m)
  },
  {
    name: "management-roles-RoleUpsert",
    path: "/management/roles/RoleUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleUpsert-2053f722.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$j == null ? void 0 : __nuxt_page_meta$j.name) ?? "management-roles",
    path: (__nuxt_page_meta$j == null ? void 0 : __nuxt_page_meta$j.path) ?? "/management/roles",
    meta: __nuxt_page_meta$j || {},
    alias: (__nuxt_page_meta$j == null ? void 0 : __nuxt_page_meta$j.alias) || [],
    redirect: (__nuxt_page_meta$j == null ? void 0 : __nuxt_page_meta$j.redirect) || void 0,
    component: () => import('./_nuxt/index-4ce754bb.mjs').then((m) => m.default || m)
  },
  {
    name: "management-users-UserGrid",
    path: "/management/users/UserGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserGrid-f8c06f7b.mjs').then((m) => m.default || m)
  },
  {
    name: "management-users-UserGridTable",
    path: "/management/users/UserGridTable",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserGridTable-6f9563ed.mjs').then((m) => m.default || m)
  },
  {
    name: "management-users-UserPageHeader",
    path: "/management/users/UserPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserPageHeader-2e564de0.mjs').then((m) => m.default || m)
  },
  {
    name: "management-users-UserSearch",
    path: "/management/users/UserSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserSearch-5b075a08.mjs').then((m) => m.default || m)
  },
  {
    name: "management-users-UserUpsert",
    path: "/management/users/UserUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserUpsert-c89cca9e.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.name) ?? "management-users",
    path: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.path) ?? "/management/users",
    meta: __nuxt_page_meta$i || {},
    alias: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.alias) || [],
    redirect: (__nuxt_page_meta$i == null ? void 0 : __nuxt_page_meta$i.redirect) || void 0,
    component: () => import('./_nuxt/index-8db0bce3.mjs').then((m) => m.default || m)
  },
  {
    name: "menus-RoleGrid",
    path: "/menus/RoleGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleGrid-8c21e6ec.mjs').then((m) => m.default || m)
  },
  {
    name: "menus-RolePageHeader",
    path: "/menus/RolePageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RolePageHeader-485d033a.mjs').then((m) => m.default || m)
  },
  {
    name: "menus-RoleSearch",
    path: "/menus/RoleSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleSearch-34801144.mjs').then((m) => m.default || m)
  },
  {
    name: "menus-RoleUpsert",
    path: "/menus/RoleUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleUpsert-df7c34f4.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.name) ?? "menus",
    path: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.path) ?? "/menus",
    meta: __nuxt_page_meta$h || {},
    alias: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.alias) || [],
    redirect: (__nuxt_page_meta$h == null ? void 0 : __nuxt_page_meta$h.redirect) || void 0,
    component: () => import('./_nuxt/index-b4a9a457.mjs').then((m) => m.default || m)
  },
  {
    name: "navigation-NavSearch",
    path: "/navigation/NavSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/NavSearch-4955a467.mjs').then((m) => m.default || m)
  },
  {
    name: "navigation-NavigationGrid",
    path: "/navigation/NavigationGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/NavigationGrid-58e0f94b.mjs').then((m) => m.default || m)
  },
  {
    name: "navigation-NavigationPageHeader",
    path: "/navigation/NavigationPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/NavigationPageHeader-10fcd878.mjs').then((m) => m.default || m)
  },
  {
    name: "navigation-NavigationSearchForm",
    path: "/navigation/NavigationSearchForm",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/NavigationSearchForm-48c6d3ba.mjs').then((m) => m.default || m)
  },
  {
    name: "navigation-NavigationUpsert",
    path: "/navigation/NavigationUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/NavigationUpsert-b019c64e.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.name) ?? "navigation",
    path: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.path) ?? "/navigation",
    meta: __nuxt_page_meta$g || {},
    alias: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.alias) || [],
    redirect: (__nuxt_page_meta$g == null ? void 0 : __nuxt_page_meta$g.redirect) || void 0,
    component: () => import('./_nuxt/index-5966778a.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-OrganizationPageHeader",
    path: "/organization/OrganizationPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/OrganizationPageHeader-6409e8db.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.name) ?? "organization-banks",
    path: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.path) ?? "/organization/banks",
    meta: __nuxt_page_meta$f || {},
    alias: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.alias) || [],
    redirect: (__nuxt_page_meta$f == null ? void 0 : __nuxt_page_meta$f.redirect) || void 0,
    component: () => import('./_nuxt/index-c58deb02.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.name) ?? "organization-documents",
    path: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.path) ?? "/organization/documents",
    meta: __nuxt_page_meta$e || {},
    alias: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.alias) || [],
    redirect: (__nuxt_page_meta$e == null ? void 0 : __nuxt_page_meta$e.redirect) || void 0,
    component: () => import('./_nuxt/index-ace2f5dd.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.name) ?? "organization",
    path: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.path) ?? "/organization",
    meta: __nuxt_page_meta$d || {},
    alias: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.alias) || [],
    redirect: (__nuxt_page_meta$d == null ? void 0 : __nuxt_page_meta$d.redirect) || void 0,
    component: () => import('./_nuxt/index-53e037bc.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.name) ?? "organization-localization",
    path: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.path) ?? "/organization/localization",
    meta: __nuxt_page_meta$c || {},
    alias: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.alias) || [],
    redirect: (__nuxt_page_meta$c == null ? void 0 : __nuxt_page_meta$c.redirect) || void 0,
    component: () => import('./_nuxt/index-4c262958.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.name) ?? "organization-locations",
    path: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.path) ?? "/organization/locations",
    meta: __nuxt_page_meta$b || {},
    alias: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.alias) || [],
    redirect: (__nuxt_page_meta$b == null ? void 0 : __nuxt_page_meta$b.redirect) || void 0,
    component: () => import('./_nuxt/index-0cf2975a.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.name) ?? "organization-logos-LogosGallery",
    path: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.path) ?? "/organization/logos/LogosGallery",
    meta: __nuxt_page_meta$a || {},
    alias: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.alias) || [],
    redirect: (__nuxt_page_meta$a == null ? void 0 : __nuxt_page_meta$a.redirect) || void 0,
    component: () => import('./_nuxt/LogosGallery-cf0abc48.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-logos-LogosPageHeader",
    path: "/organization/logos/LogosPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/LogosPageHeader-a9ddc489.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-logos-LogosUpsert",
    path: "/organization/logos/LogosUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/LogosUpsert-368bb182.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.name) ?? "organization-logos",
    path: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.path) ?? "/organization/logos",
    meta: __nuxt_page_meta$9 || {},
    alias: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.alias) || [],
    redirect: (__nuxt_page_meta$9 == null ? void 0 : __nuxt_page_meta$9.redirect) || void 0,
    component: () => import('./_nuxt/index-519b08af.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.name) ?? "organization-tax-settings",
    path: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.path) ?? "/organization/tax-settings",
    meta: __nuxt_page_meta$8 || {},
    alias: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.alias) || [],
    redirect: (__nuxt_page_meta$8 == null ? void 0 : __nuxt_page_meta$8.redirect) || void 0,
    component: () => import('./_nuxt/index-7227e843.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-users-UserSignup",
    path: "/organization/users/UserSignup",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserSignup-832b3710.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-users-UsersGrid",
    path: "/organization/users/UsersGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersGrid-0f4c6222.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-users-UsersPageHeader",
    path: "/organization/users/UsersPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersPageHeader-021e44b9.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-users-UsersSearch",
    path: "/organization/users/UsersSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersSearch-16085172.mjs').then((m) => m.default || m)
  },
  {
    name: "organization-users-UsersUpsert",
    path: "/organization/users/UsersUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UsersUpsert-8f603acd.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.name) ?? "organization-users",
    path: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.path) ?? "/organization/users",
    meta: __nuxt_page_meta$7 || {},
    alias: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.alias) || [],
    redirect: (__nuxt_page_meta$7 == null ? void 0 : __nuxt_page_meta$7.redirect) || void 0,
    component: () => import('./_nuxt/index-a8352930.mjs').then((m) => m.default || m)
  },
  {
    name: "profiles-ProfilesGrid",
    path: "/profiles/ProfilesGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ProfilesGrid-07f7b3b7.mjs').then((m) => m.default || m)
  },
  {
    name: "profiles-ProfilesPageHeader",
    path: "/profiles/ProfilesPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ProfilesPageHeader-f5f49037.mjs').then((m) => m.default || m)
  },
  {
    name: "profiles-ProfilesSearch",
    path: "/profiles/ProfilesSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ProfilesSearch-d423ceab.mjs').then((m) => m.default || m)
  },
  {
    name: "profiles-ProfilesUpsert",
    path: "/profiles/ProfilesUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ProfilesUpsert-05819818.mjs').then((m) => m.default || m)
  },
  {
    name: "profiles-UserSignup",
    path: "/profiles/UserSignup",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/UserSignup-3b9be195.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.name) ?? "profiles",
    path: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.path) ?? "/profiles",
    meta: __nuxt_page_meta$6 || {},
    alias: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.alias) || [],
    redirect: (__nuxt_page_meta$6 == null ? void 0 : __nuxt_page_meta$6.redirect) || void 0,
    component: () => import('./_nuxt/index-11ae0f2a.mjs').then((m) => m.default || m)
  },
  {
    name: "properties-PropertiesGrid",
    path: "/properties/PropertiesGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/PropertiesGrid-67780cda.mjs').then((m) => m.default || m)
  },
  {
    name: "properties-PropertiesPageHeader",
    path: "/properties/PropertiesPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/PropertiesPageHeader-4c2921ee.mjs').then((m) => m.default || m)
  },
  {
    name: "properties-PropertiesSearch",
    path: "/properties/PropertiesSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/PropertiesSearch-683f067f.mjs').then((m) => m.default || m)
  },
  {
    name: "properties-PropertiesUpsert",
    path: "/properties/PropertiesUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/PropertiesUpsert-21a45b06.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.name) ?? "properties",
    path: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.path) ?? "/properties",
    meta: __nuxt_page_meta$5 || {},
    alias: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.alias) || [],
    redirect: (__nuxt_page_meta$5 == null ? void 0 : __nuxt_page_meta$5.redirect) || void 0,
    component: () => import('./_nuxt/index-ea0dfa87.mjs').then((m) => m.default || m)
  },
  {
    name: "registration-RegistrationGrid",
    path: "/registration/RegistrationGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RegistrationGrid-3f2f8e60.mjs').then((m) => m.default || m)
  },
  {
    name: "registration-RegistrationPageHeader",
    path: "/registration/RegistrationPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RegistrationPageHeader-587f9ec4.mjs').then((m) => m.default || m)
  },
  {
    name: "registration-RegistrationSearch",
    path: "/registration/RegistrationSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RegistrationSearch-cfc3cc06.mjs').then((m) => m.default || m)
  },
  {
    name: "registration-RegistrationUpsert",
    path: "/registration/RegistrationUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RegistrationUpsert-23d07428.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.name) ?? "registration",
    path: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.path) ?? "/registration",
    meta: __nuxt_page_meta$4 || {},
    alias: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.alias) || [],
    redirect: (__nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect) || void 0,
    component: () => import('./_nuxt/index-c9e4160a.mjs').then((m) => m.default || m)
  },
  {
    name: "roles-RoleGrid",
    path: "/roles/RoleGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleGrid-33f9dc05.mjs').then((m) => m.default || m)
  },
  {
    name: "roles-RolePageHeader",
    path: "/roles/RolePageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RolePageHeader-c86be62d.mjs').then((m) => m.default || m)
  },
  {
    name: "roles-RoleSearch",
    path: "/roles/RoleSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleSearch-c9de2dab.mjs').then((m) => m.default || m)
  },
  {
    name: "roles-RoleUpsert",
    path: "/roles/RoleUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/RoleUpsert-b5809fea.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) ?? "roles",
    path: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) ?? "/roles",
    meta: __nuxt_page_meta$3 || {},
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect) || void 0,
    component: () => import('./_nuxt/index-2eb0eb6b.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "settings",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/settings",
    meta: __nuxt_page_meta$2 || {},
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect) || void 0,
    component: () => import('./_nuxt/index-255de6cc.mjs').then((m) => m.default || m)
  },
  {
    name: "team-slug",
    path: "/team/:slug()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_…slug_-1b4ddf48.mjs').then((m) => m.default || m)
  },
  {
    name: "things-applications-ApplicationGrid",
    path: "/things/applications/ApplicationGrid",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ApplicationGrid-2bd4b59f.mjs').then((m) => m.default || m)
  },
  {
    name: "things-applications-ApplicationPageHeader",
    path: "/things/applications/ApplicationPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ApplicationPageHeader-1ceaf9e5.mjs').then((m) => m.default || m)
  },
  {
    name: "things-applications-ApplicationSearch",
    path: "/things/applications/ApplicationSearch",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ApplicationSearch-cbb51707.mjs').then((m) => m.default || m)
  },
  {
    name: "things-applications-ApplicationUpsert",
    path: "/things/applications/ApplicationUpsert",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/ApplicationUpsert-a62d7a88.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "things-applications",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/things/applications",
    meta: __nuxt_page_meta$1 || {},
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./_nuxt/index-a2a249a4.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "things",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/things",
    meta: __nuxt_page_meta || {},
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/index-0f71a4ef.mjs').then((m) => m.default || m)
  },
  {
    name: "utilities-designer-BusinessCardForm",
    path: "/utilities/designer/BusinessCardForm",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/BusinessCardForm-218077de.mjs').then((m) => m.default || m)
  },
  {
    name: "utilities-designer-DesignerPageHeader",
    path: "/utilities/designer/DesignerPageHeader",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/DesignerPageHeader-621c66cb.mjs').then((m) => m.default || m)
  },
  {
    name: "utilities-designer-business-card",
    path: "/utilities/designer/business-card",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/business-card-1344052e.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, _form, savedPosition) {
    if (history.state.stop) {
      return;
    }
    if (history.state.smooth) {
      return {
        el: history.state.smooth,
        behavior: "smooth"
      };
    }
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (!el) {
        return;
      }
      const { marginTop } = getComputedStyle(el);
      const marginTopValue = parseInt(marginTop);
      const offset = document.querySelector(to.hash).offsetTop - marginTopValue;
      return {
        top: offset,
        behavior: "smooth"
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useNuxtApp();
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {
  auth: () => import('./_nuxt/auth-f284e3e4.mjs')
};
const router_jmwsqit4Rs = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history2 = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      history: history2,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => callWithNuxt(nuxtApp, showError, [error2])), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
      for (const component of to.matched) {
        const componentMiddleware = component.meta.middleware;
        if (!componentMiddleware) {
          continue;
        }
        if (Array.isArray(componentMiddleware)) {
          for (const entry2 of componentMiddleware) {
            middlewareEntries.add(entry2);
          }
        } else {
          middlewareEntries.add(componentMiddleware);
        }
      }
      for (const entry2 of middlewareEntries) {
        const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
        if (!middleware) {
          throw new Error(`Unknown route middleware: '${entry2}'.`);
        }
        const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
        {
          if (result === false || result instanceof Error) {
            const error2 = result || createError$1({
              statusCode: 404,
              statusMessage: `Page Not Found: ${initialURL}`
            });
            await callWithNuxt(nuxtApp, showError, [error2]);
            return false;
          }
        }
        if (result || result === false) {
          return result;
        }
      }
    });
    router.afterEach(async (to) => {
      delete nuxtApp._processingMiddleware;
      if (to.matched.length === 0) {
        await callWithNuxt(nuxtApp, showError, [createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })]);
      } else {
        const currentURL = to.fullPath || "/";
        if (!isEqual$1(currentURL, initialURL, { trailingSlash: true })) {
          const event = await callWithNuxt(nuxtApp, useRequestEvent);
          const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
          await callWithNuxt(nuxtApp, navigateTo, [currentURL, options]);
        }
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #$4982
          force: true
        });
      } catch (error2) {
        await callWithNuxt(nuxtApp, showError, [error2]);
      }
    });
    return { provide: { router } };
  }
}, 1);
const referencesRegex = new RegExp(
  "\\{([^}]+)\\}",
  "g"
);
const DARK = "@dark";
const LIGHT = "@light";
const INITIAL = "@initial";
function set(object, paths, value, splitter = ".") {
  if (typeof paths === "string") {
    paths = paths.split(splitter);
  }
  const limit = paths.length - 1;
  for (let i = 0; i < limit; ++i) {
    const key2 = paths[i];
    object = object[key2] ?? (object[key2] = {});
  }
  const key = paths[limit];
  object[key] = value;
}
function get$1(object, paths, splitter = ".") {
  if (typeof paths === "string") {
    paths = paths.split(splitter);
  }
  const limit = paths.length - 1;
  for (let i = 0; i < limit; ++i) {
    const key2 = paths[i];
    object = object[key2] ?? (object[key2] = {});
  }
  const key = paths[limit];
  return object[key];
}
function walkTokens(obj, cb, paths = []) {
  let result = {};
  if (obj.value) {
    result = cb(obj, result, paths);
  } else {
    for (const k in obj) {
      if (obj[k] && typeof obj[k] === "object") {
        result[k] = walkTokens(obj[k], cb, [...paths, k]);
      }
    }
  }
  return result;
}
function normalizeConfig(obj, mqKeys, removeSchemaKeys = false) {
  let result = {};
  if (obj.value) {
    result = obj;
  } else {
    for (const k in obj) {
      if (k === "$schema") {
        if (!removeSchemaKeys) {
          result[k] = obj[k];
        }
        continue;
      }
      if (k === "utils") {
        result[k] = obj[k];
        continue;
      }
      if (obj[k] && (typeof obj[k] === "string" || typeof obj[k] === "number" || typeof obj[k] === "boolean" || typeof obj[k] === "symbol" || typeof obj[k] === "bigint")) {
        result[k] = { value: obj[k] };
      } else if (obj[k] && typeof obj[k] === "object") {
        const keys = Object.keys(obj[k]);
        if (keys.includes("initial") && keys.some((key) => mqKeys.includes(key))) {
          result[k] = { value: obj[k] };
          continue;
        }
        result[k] = normalizeConfig(obj[k], mqKeys, removeSchemaKeys);
      }
    }
  }
  return result;
}
function createTokensHelper(theme2 = {}, options = {}) {
  const defaultHelperOptions = {
    key: "attributes.variable",
    onNotFound: false,
    ...options
  };
  function $tokens(path = void 0, options2) {
    if (!path) {
      return unref(theme2);
    }
    const $tokensOptions = { ...defaultHelperOptions, ...options2 };
    const { key, onNotFound } = $tokensOptions;
    const token = get$1(unref(theme2), path);
    if (!token && typeof onNotFound === "function") {
      onNotFound(path, $tokensOptions);
      return;
    }
    return key ? token ? token[key] ? token[key] : get$1(token, key) : token : token;
  }
  return $tokens.bind(this);
}
function pathToVarName(path) {
  if (Array.isArray(path)) {
    path = path.join("-");
  }
  if (path.charAt(0) === "{" && path.charAt(path.length - 1) === "}") {
    path = path.substr(1, path.length - 2);
  }
  return `--${path.split(".").join("-")}`;
}
function resolveCssProperty(property, value, style, selectors, localTokens = [], ctx, loc) {
  var _a;
  const directive = resolveCustomDirectives(property, value, selectors, ctx, loc);
  if (directive) {
    return directive;
  }
  if ((_a = ctx == null ? void 0 : ctx.utils) == null ? void 0 : _a[property]) {
    if (typeof ctx.utils[property] === "function") {
      return ctx.utils[property](value);
    }
    return value ? ctx.utils[property] : {};
  }
  value = castValues(property, value, localTokens, ctx, loc);
  return {
    [property]: value
  };
}
function castValues(property, value, localTokens, ctx, loc) {
  if (Array.isArray(value) || typeof value === "string" || typeof value === "number") {
    if (Array.isArray(value)) {
      value = value.map((v) => castValue(property, v, localTokens, ctx, loc)).join(",");
    } else {
      value = castValue(property, value, localTokens, ctx, loc);
    }
  }
  return value;
}
function castValue(property, value, localTokens, ctx, loc) {
  if (typeof value === "number") {
    return value;
  }
  if (value.match(referencesRegex)) {
    value = resolveReferences(property, value, localTokens, ctx, loc);
  }
  if (value === "{}") {
    return "";
  }
  return value;
}
function resolveReferences(_, value, localTokens, ctx, loc) {
  if (!(typeof value === "string")) {
    return value;
  }
  value = value.replace(
    referencesRegex,
    (_2, tokenPath) => {
      const varName = pathToVarName(tokenPath);
      const variable = `var(${varName})`;
      if (localTokens.includes(varName)) {
        return variable;
      }
      const token = ctx.$tokens(tokenPath, { key: void 0, loc });
      const tokenValue = typeof token === "string" ? token : (token == null ? void 0 : token.variable) || (token == null ? void 0 : token.value);
      if (!tokenValue) {
        return variable;
      }
      return tokenValue;
    }
  );
  return value;
}
function resolveCustomDirectives(property, value, selectors, ctx, loc) {
  if (property.startsWith("@")) {
    const resolveColorScheme = (scheme) => {
      scheme = ctx.options.colorSchemeMode === "class" ? `:root.${scheme}` : `@media (prefers-color-scheme: ${scheme})`;
      const isMedia = scheme.startsWith("@media");
      if (ctx == null ? void 0 : ctx.runtime) {
        return {
          "@media": {
            [scheme]: value
          }
        };
      }
      return {
        [isMedia ? scheme : `${scheme} &`]: value
      };
    };
    if (property === DARK) {
      return resolveColorScheme("dark");
    }
    if (property === LIGHT) {
      return resolveColorScheme("light");
    }
    if (property === INITIAL) {
      const token = ctx.$tokens("media.initial", { key: "value", onNotFound: false, loc });
      return {
        [`@media${token ? ` ${token}` : ""}`]: value
      };
    }
    const mediaQueries = ctx.$tokens("media", { key: void 0, loc });
    if (mediaQueries) {
      const query = property.replace("@", "");
      if (mediaQueries[query]) {
        return {
          [`@media ${mediaQueries[query].value}`]: value
        };
      }
    }
    return {
      [property]: value
    };
  }
}
function resolveThemeRule(mq, content, theme2, colorSchemeMode) {
  var _a;
  let responsiveSelector = "";
  if (mq === "dark" || mq === "light") {
    if (colorSchemeMode === "class") {
      responsiveSelector = `:root.${mq}`;
    } else {
      responsiveSelector = `(prefers-color-scheme: ${mq})`;
    }
  } else if (mq !== "initial" && theme2) {
    const queryToken = (_a = theme2 == null ? void 0 : theme2.media) == null ? void 0 : _a[mq];
    if (queryToken) {
      responsiveSelector = queryToken.value;
    }
  }
  let prefix;
  if (!responsiveSelector) {
    prefix = "@media { :root {";
  } else if (responsiveSelector.startsWith(".")) {
    prefix = `@media { :root${responsiveSelector} {`;
  } else if (responsiveSelector.startsWith(":root")) {
    prefix = `@media { ${responsiveSelector} {`;
  } else {
    prefix = `@media ${responsiveSelector} { :root {`;
  }
  return `${`${`${prefix}--pinceau-mq: ${String(mq)}; ${content}`} } }`}
`;
}
const comma = /\s*,\s*(?![^()]*\))/;
const getResolvedSelectors = (parentSelectors, nestedSelectors) => parentSelectors.reduce(
  (resolvedSelectors, parentSelector) => {
    resolvedSelectors.push(
      ...nestedSelectors.map(
        (selector) => selector.includes("&") ? selector.replace(
          /&/g,
          /[ +>|~]/.test(parentSelector) && /&.*&/.test(selector) ? `:is(${parentSelector})` : parentSelector
        ) : `${parentSelector} ${selector}`
      )
    );
    return resolvedSelectors;
  },
  []
);
const { prototype: { toString } } = Object;
const stringify = (value, replacer = void 0) => {
  const used = /* @__PURE__ */ new WeakSet();
  const write = (cssText, selectors, conditions, name, data, isAtRuleLike, isVariableLike) => {
    for (let i = 0; i < conditions.length; ++i) {
      if (!used.has(conditions[i])) {
        used.add(conditions[i]);
        cssText += `${conditions[i]}{`;
      }
    }
    if (selectors.length && !used.has(selectors)) {
      used.add(selectors);
      cssText += `${selectors}{`;
    }
    if (isAtRuleLike) {
      name = `${name} `;
    } else if (isVariableLike) {
      name = `${name}:`;
    } else {
      name = `${kebabCase(name)}:`;
    }
    cssText += `${name + String(data)};`;
    return cssText;
  };
  const parse2 = (style, selectors, conditions, prevName, prevData) => {
    let cssText = "";
    for (const name in style) {
      const isAtRuleLike = name.charCodeAt(0) === 64;
      const isVariableLike = name.charCodeAt(0) === 45 && name.charCodeAt(1) === 45;
      for (const data of isAtRuleLike && Array.isArray(style[name]) ? style[name] : [style[name]]) {
        if (replacer && (name !== prevName || data !== prevData)) {
          const next = replacer(name, data, style, selectors);
          if (next !== null) {
            cssText += typeof next === "object" && next ? parse2(next, selectors, conditions, name, data) : next == null ? "" : next;
            continue;
          }
        }
        const isObjectLike = typeof data === "object" && data && data.toString === toString;
        if (isObjectLike) {
          if (used.has(selectors)) {
            used.delete(selectors);
            cssText += "}";
          }
          const usedName = Object(name);
          let nextSelectors;
          if (isAtRuleLike) {
            nextSelectors = selectors;
            cssText += parse2(
              data,
              nextSelectors,
              conditions.concat(usedName)
            );
          } else {
            nextSelectors = selectors.length ? getResolvedSelectors(selectors, name.split(comma)) : name.split(comma);
            cssText += parse2(
              data,
              nextSelectors,
              conditions
            );
          }
          if (used.has(usedName)) {
            used.delete(usedName);
            cssText += "}";
          }
          if (used.has(nextSelectors)) {
            used.delete(nextSelectors);
            cssText += "}";
          }
        } else {
          cssText = write(cssText, selectors, conditions, name, data, isAtRuleLike, isVariableLike);
        }
      }
    }
    return cssText;
  };
  return parse2(value, [], []);
};
const HYDRATION_SELECTOR = ".phy[--]";
function usePinceauRuntimeSheet($tokens, initialUtils = {}, colorSchemeMode, appId) {
  const sheet = ref();
  const utils2 = ref(initialUtils);
  const cache = {};
  const stringify$1 = (decl, loc) => stringify(
    decl,
    (property, value, style, selectors) => resolveCssProperty(
      property,
      value,
      style,
      selectors,
      [],
      { $tokens, utils: utils2.value, options: { colorSchemeMode, runtime: true } },
      loc
    )
  );
  function resolveStylesheet() {
    const global = globalThis || window;
    let style;
    let hydratableSheet;
    if (global && global.document) {
      const fullId = `pinceau-runtime${appId ? `-${appId}` : ""}`;
      const doc = global.document;
      style = doc.querySelector(`style#${fullId}`);
      if (!style) {
        const styleNode = doc.createElement("style");
        styleNode.id = fullId;
        styleNode.type = "text/css";
        style = doc.head.appendChild(styleNode);
      }
      hydratableSheet = doc.querySelector(`style#pinceau-runtime-hydratable${appId ? `-${appId}` : ""}`);
    }
    sheet.value = (style == null ? void 0 : style.sheet) || getSSRStylesheet();
    return hydratableSheet ? hydrateStylesheet(hydratableSheet) : void 0;
  }
  function hydrateStylesheet(el) {
    var _a, _b;
    const hydratableRules2 = {};
    for (const _rule of Object.entries(((_a = el == null ? void 0 : el.sheet) == null ? void 0 : _a.cssRules) || ((_b = sheet.value) == null ? void 0 : _b.cssRules) || {})) {
      const [index, rule] = _rule;
      const uids = resolveUid(rule);
      if (!uids || !uids.uid) {
        continue;
      }
      if (!hydratableRules2[uids.uid]) {
        hydratableRules2[uids.uid] = {};
      }
      const newIndex = sheet.value.insertRule(rule.cssText, Number(index));
      hydratableRules2[uids.uid][uids.type] = sheet.value.cssRules.item(newIndex);
    }
    if (el) {
      el.remove();
    }
    return hydratableRules2;
  }
  function toString2() {
    if (!sheet.value) {
      return "";
    }
    return Object.entries(sheet.value.cssRules).reduce(
      (acc, [, rule]) => {
        acc += `${rule == null ? void 0 : rule.cssText} ` || "";
        return acc;
      },
      ""
    );
  }
  function pushDeclaration(uid, type, declaration, previousRule, loc) {
    if (!Object.keys(declaration).length) {
      return;
    }
    const cssText = stringify$1(
      {
        "@media": {
          // Mark inserted declaration with unique id and type of runtime style
          [HYDRATION_SELECTOR]: { "--puid": `${uid}-${type}` },
          ...declaration
        }
      },
      loc
    );
    if (!cssText) {
      return;
    }
    if (previousRule) {
      deleteRule(previousRule);
    }
    const ruleId = sheet.value.insertRule(cssText);
    return sheet.value.cssRules[ruleId];
  }
  function deleteRule(rule) {
    const ruleIndex = Object.values(sheet.value.cssRules).indexOf(rule);
    if (typeof ruleIndex === "undefined" || isNaN(ruleIndex)) {
      return;
    }
    try {
      sheet.value.deleteRule(ruleIndex);
    } catch (e) {
    }
  }
  const hydratableRules = resolveStylesheet();
  return {
    stringify: stringify$1,
    cache,
    pushDeclaration,
    deleteRule,
    sheet,
    toString: toString2,
    hydratableRules
  };
}
function getSSRStylesheet() {
  return {
    cssRules: [],
    insertRule(cssText, index = this.cssRules.length) {
      this.cssRules.splice(index, 1, { cssText });
      return index;
    },
    deleteRule(index) {
      delete this.cssRules[index];
    }
  };
}
function resolveUid(rule) {
  const uidRule = rule.cssRules && rule.cssRules.length ? Object.entries(rule == null ? void 0 : rule.cssRules).find(([_, rule2]) => rule2.selectorText === HYDRATION_SELECTOR) : void 0;
  if (!uidRule) {
    return;
  }
  const uidRegex = /--puid:(.*)?-(c|v|p)?/m;
  const [, uid, type] = uidRule[1].cssText.match(uidRegex);
  if (!uid) {
    return;
  }
  return { uid, type };
}
function usePinceauRuntimeIds(instance, classes, _) {
  var _a, _b, _c;
  let uid;
  const el = (_a = instance == null ? void 0 : instance.vnode) == null ? void 0 : _a.el;
  if (el && el.classList) {
    el.classList.forEach(
      (elClass) => {
        if (uid) {
          return;
        }
        if (elClass.startsWith("pc-")) {
          uid = elClass.split("pc-")[1];
        }
      }
    );
  } else {
    uid = nanoid(6);
  }
  const scopeId = (_c = (_b = instance == null ? void 0 : instance.vnode) == null ? void 0 : _b.type) == null ? void 0 : _c.__scopeId;
  const ids = {
    uid,
    componentId: scopeId ? `[${scopeId}]` : "",
    uniqueClassName: `pc-${uid}`
  };
  classes.value.c = ids.uniqueClassName;
  return computed(() => ids);
}
function usePinceauThemeSheet(initialTheme, tokensHelperConfig = {}, colorSchemeMode) {
  const sheet = ref();
  const theme2 = ref(initialTheme || {});
  tokensHelperConfig = Object.assign(
    {
      key: "variable"
    },
    tokensHelperConfig || {}
  );
  const $tokens = createTokensHelper(
    theme2,
    tokensHelperConfig
  );
  let cache = {};
  resolveStylesheet();
  function findThemeSheet(document2) {
    var _a;
    for (const sheet2 of document2.styleSheets) {
      if ((_a = sheet2 == null ? void 0 : sheet2.ownerNode) == null ? void 0 : _a.textContent.includes("--pinceau-mq")) {
        return sheet2.ownerNode;
      }
    }
  }
  function resolveStylesheet() {
    var _a;
    const global = globalThis || window;
    if (global && global.document) {
      let sheetElement = document.querySelector("#pinceau-theme");
      if (!sheetElement) {
        sheetElement = findThemeSheet(document);
      }
      sheet.value = sheetElement == null ? void 0 : sheetElement.sheet;
      if (sheet.value) {
        hydrateStylesheet((_a = sheet.value) == null ? void 0 : _a.cssRules);
      }
    }
  }
  function hydrateStylesheet(cssRules) {
    cache = {};
    Object.entries(cssRules || {}).forEach(
      ([_, rule]) => {
        var _a, _b;
        if ((rule == null ? void 0 : rule.type) !== 4 && !((_a = rule == null ? void 0 : rule.cssText) == null ? void 0 : _a.includes("--pinceau-mq"))) {
          return false;
        }
        let currentTheme = "initial";
        (_b = rule.cssText.match(/--([\w-]+)\s*:\s*(.+?);/gm)) == null ? void 0 : _b.forEach((match) => {
          var _a2;
          const [variable, value] = match.replace(";", "").split(/:\s(.*)/s);
          if (variable === "--pinceau-mq") {
            currentTheme = value;
            if (!cache[value]) {
              const ruleReference = (_a2 = Object.entries((rule == null ? void 0 : rule.cssRules) || {}).find(([_2, cssRule]) => cssRule == null ? void 0 : cssRule.cssText.includes(`--pinceau-mq: ${value}`))) == null ? void 0 : _a2[1];
              if (ruleReference) {
                cache[value] = ruleReference;
              }
            }
            return;
          }
          const path = [...variable.substring(2).split("-")];
          set(theme2.value, path, getSetValue(path, value, variable, currentTheme));
        });
      }
    );
  }
  function updateTheme(value) {
    var _a;
    const mqKeys = Array.from(/* @__PURE__ */ new Set(["dark", "light", ...Object.keys((value == null ? void 0 : value.media) || {}), ...Object.keys(((_a = theme2.value) == null ? void 0 : _a.media) || {})]));
    const config = normalizeConfig(value || {}, mqKeys, true);
    walkTokens(config, (token, _, paths) => updateToken(paths, token.value));
  }
  function updateToken(path, value, mq = "initial") {
    var _a;
    if (typeof value === "object") {
      Object.entries(value).forEach(([mq2, mqValue]) => updateToken(path, mqValue, mq2));
      return;
    }
    const varName = pathToVarName(path);
    if (!(cache == null ? void 0 : cache[mq])) {
      createMqRule(mq);
    }
    const resolvedValue = resolveReferences(void 0, value, [], { $tokens });
    set(
      theme2.value,
      path,
      getSetValue(path, resolvedValue, varName, mq)
    );
    (_a = cache == null ? void 0 : cache[mq]) == null ? void 0 : _a.style.setProperty(varName, resolvedValue);
  }
  function reactiveToken(path) {
    return computed(
      {
        get() {
          return get$1(theme2.value, `${path}.value`);
        },
        set(v) {
          updateToken(path, v);
        }
      }
    );
  }
  function getSetValue(path, value, variable, mq = "initial") {
    const setValue = { value, variable: `var(${variable})` };
    const existingValue = get$1(theme2.value, path);
    if (existingValue && !variable.startsWith("--media")) {
      if (typeof (existingValue == null ? void 0 : existingValue.value) === "object") {
        setValue.value = { ...existingValue.value, [mq]: value };
      } else {
        setValue.value = { initial: existingValue.value, [mq]: value };
      }
    }
    return setValue;
  }
  function createMqRule(mq) {
    if (cache == null ? void 0 : cache[mq]) {
      return cache == null ? void 0 : cache[mq];
    }
    const mqRule = resolveThemeRule(mq, "", theme2.value, colorSchemeMode);
    const newRule = sheet.value.insertRule(mqRule, sheet.value.cssRules.length);
    cache[mq] = sheet.value.cssRules.item(newRule).cssRules[0];
    return cache[mq];
  }
  return {
    $tokens,
    updateToken,
    updateTheme,
    reactiveToken,
    resolveStylesheet,
    theme: theme2
  };
}
function usePinceauComputedStyles(ids, computedStyles, sheet, loc) {
  var _a, _b;
  let rule = (_b = (_a = sheet.hydratableRules) == null ? void 0 : _a[ids.value.uid]) == null ? void 0 : _b.c;
  watch(
    () => computedStyles,
    (newComputedStyles) => {
      newComputedStyles = computedStylesToDeclaration(ids.value, newComputedStyles);
      rule = sheet.pushDeclaration(
        ids.value.uid,
        "c",
        newComputedStyles,
        rule,
        { ...loc, type: "c" }
      );
    },
    {
      immediate: !rule,
      deep: true
    }
  );
  onScopeDispose(() => rule && sheet.deleteRule(rule));
}
function computedStylesToDeclaration(ids, computedStyles) {
  const declaration = {};
  const targetId = `.${ids.uniqueClassName}${ids.componentId}`;
  if (computedStyles && Object.keys(computedStyles).length) {
    declaration[targetId] = declaration[targetId] || {};
    for (const [varName, _value] of Object.entries(computedStyles)) {
      const value = unref(_value);
      if (varName === "css") {
        declaration[targetId] = Object.assign(declaration[targetId], value);
        continue;
      }
      if (typeof value === "object") {
        for (const [mqId, mqPropValue] of Object.entries(value)) {
          const _value2 = unref(mqPropValue);
          if (!_value2) {
            continue;
          }
          if (mqId === "initial") {
            if (!declaration[targetId]) {
              declaration[targetId] = {};
            }
            if (!declaration[targetId]) {
              declaration[targetId] = {};
            }
            declaration[targetId][`--${varName}`] = _value2;
          }
          const mediaId = `@${mqId}`;
          if (!declaration[mediaId]) {
            declaration[mediaId] = {};
          }
          if (!declaration[mediaId][targetId]) {
            declaration[mediaId][targetId] = {};
          }
          declaration[mediaId][targetId][`--${kebabCase(varName)}`] = _value2;
        }
      } else {
        const _value2 = unref(value);
        if (_value2) {
          declaration[targetId][`--${kebabCase(varName)}`] = _value2;
        }
      }
    }
  }
  return declaration;
}
const usePinceauVariants = (ids, variants, props, sheet, classes, loc) => {
  var _a, _b;
  let rule = (_b = (_a = sheet.hydratableRules) == null ? void 0 : _a[ids.value.uid]) == null ? void 0 : _b.v;
  const variantsState = computed(() => variants ? resolveVariantsState(ids.value, props, variants) : {});
  const variantsClasses = ref([]);
  watch(
    variantsState,
    ({ cacheId, variantsProps }) => {
      let variantClass;
      if (sheet.cache[cacheId]) {
        const cachedRule = sheet.cache[cacheId];
        rule = cachedRule.rule;
        variantClass = cachedRule.variantClass;
        if (cachedRule == null ? void 0 : cachedRule.classes) {
          variantsClasses.value = cachedRule.classes;
        }
        cachedRule.count++;
      } else {
        variantClass = `pv-${nanoid(6)}`;
        const { declaration, classes: classes2 } = variantsToDeclaration(variantClass, ids.value, variants, variantsProps);
        variantsClasses.value = classes2;
        rule = sheet.pushDeclaration(ids.value.uid, "v", declaration, void 0, { ...loc, type: "v" });
        sheet.cache[cacheId] = { rule, variantClass, classes: classes2, count: 1 };
      }
      classes.value.v = variantClass;
    },
    {
      immediate: true
    }
  );
  onScopeDispose(
    () => {
      var _a2;
      const state = variantsState == null ? void 0 : variantsState.value;
      const cachedRule = (_a2 = sheet.cache) == null ? void 0 : _a2[state.cacheId];
      if (cachedRule) {
        cachedRule.count--;
        if (cachedRule.count <= 0) {
          sheet.deleteRule(cachedRule.rule);
          delete sheet.cache[state.cacheId];
        }
      }
    }
  );
  return { variantsClasses };
};
function variantsToDeclaration(variantClass, ids, variants, props) {
  var _a, _b;
  let classes = [];
  const declaration = {};
  if (props && Object.keys(props).length) {
    const targetId = `.${variantClass}`;
    for (const [propName, propValue] of Object.entries(props)) {
      if (typeof propValue === "object") {
        for (const [mqId, mqPropValue] of Object.entries(propValue)) {
          const _value = (mqPropValue == null ? void 0 : mqPropValue.toString()) || mqPropValue;
          const variantValue = variants[propName][_value];
          if (!variantValue) {
            continue;
          }
          if (!declaration[targetId]) {
            declaration[targetId] = {};
          }
          if (typeof variantValue === "string" || Array.isArray(variantValue) || (variantValue == null ? void 0 : variantValue.$class)) {
            const classAttr = typeof variantValue === "string" || Array.isArray(variantValue) ? variantValue : variantValue.$class;
            classes = [
              ...classes,
              ...typeof classAttr === "string" ? classAttr.split(" ") : classAttr
            ];
            delete variantValue.$class;
          }
          if (mqId === "initial") {
            if (!declaration[targetId]) {
              declaration[targetId] = {};
            }
            declaration[targetId] = defu(declaration[targetId], variantValue);
          }
          const mediaId = `@${mqId}`;
          if (!declaration[mediaId]) {
            declaration[mediaId] = {};
          }
          if (!declaration[mediaId][targetId]) {
            declaration[mediaId][targetId] = {};
          }
          declaration[mediaId][targetId] = defu(declaration[mediaId][targetId], variantValue);
        }
      } else {
        const _value = ((_a = propValue == null ? void 0 : propValue.toString) == null ? void 0 : _a.call(propValue)) || propValue;
        const variantValue = (_b = variants == null ? void 0 : variants[propName]) == null ? void 0 : _b[_value];
        if (!variantValue) {
          continue;
        }
        if (!declaration[targetId]) {
          declaration[targetId] = {};
        }
        declaration[targetId] = defu(declaration[targetId], variantValue);
      }
    }
  }
  return { declaration, classes };
}
function resolveVariantsState(ids, props, variants) {
  if (!props || !variants) {
    return {};
  }
  let cacheId = ids.componentId;
  const variantsProps = Object.entries(props).reduce(
    (acc, [propName, propValue]) => {
      if (!variants[propName]) {
        return acc;
      }
      if (typeof propValue === "object") {
        Object.entries(propValue).forEach(([key, value]) => cacheId += `${propName}:${key}:${value}|`);
      } else {
        cacheId += `${propName}:${propValue}|`;
      }
      acc[propName] = propValue;
      return acc;
    },
    {}
  );
  return { cacheId, variantsProps };
}
function usePinceauCssProp(ids, props, sheet, loc) {
  var _a, _b;
  let rule = (_b = (_a = sheet.hydratableRules) == null ? void 0 : _a[ids.value.uid]) == null ? void 0 : _b.p;
  const css = computed(() => props == null ? void 0 : props.css);
  watch(
    css,
    (newCss) => {
      newCss = transformCssPropToDeclaration(ids.value, newCss);
      if (rule) {
        sheet.deleteRule(rule);
      }
      rule = sheet.pushDeclaration(
        ids.value.uid,
        "p",
        newCss,
        rule,
        { ...loc, type: "c" }
      );
    },
    {
      immediate: !rule
    }
  );
  onScopeDispose(() => rule && sheet.deleteRule(rule));
}
function transformCssPropToDeclaration(ids, css) {
  const declaration = {};
  if (css) {
    const targetId = `.${ids.uniqueClassName}${ids.componentId}`;
    declaration[targetId] = Object.assign(declaration[targetId] || {}, css);
  }
  return declaration;
}
const defaultRuntimeOptions = {
  theme: {},
  utils: {},
  tokensHelperConfig: {},
  multiApp: false,
  colorSchemeMode: "media",
  dev: "production" !== "production"
};
const plugin = {
  install(app, options) {
    options = Object.assign(defaultRuntimeOptions, options);
    const { theme: theme2, tokensHelperConfig, dev, multiApp, colorSchemeMode, utils: utils2 } = options;
    const themeSheet = usePinceauThemeSheet(theme2, tokensHelperConfig, colorSchemeMode);
    if (dev && true) {
      import('./_nuxt/debug-43adc91a.mjs').then(({ usePinceauRuntimeDebug }) => usePinceauRuntimeDebug(tokensHelperConfig));
    }
    const multiAppId = multiApp ? nanoid(6) : void 0;
    const runtimeSheet = usePinceauRuntimeSheet(themeSheet.$tokens, utils2, colorSchemeMode, multiAppId);
    function usePinceauRuntime2(props = {}, variants, computedStyles) {
      const instance = getCurrentInstance();
      let loc;
      if (dev && true) {
        const { __file: file, __name: name } = instance.vnode.type;
        loc = { file, name };
      }
      const classes = ref({
        // Variants class
        v: "",
        // Unique class
        c: ""
      });
      const ids = usePinceauRuntimeIds(instance, classes);
      if (computedStyles && Object.keys(computedStyles).length > 0) {
        usePinceauComputedStyles(ids, computedStyles, runtimeSheet, loc);
      }
      let dynamicVariantClasses;
      if (variants && Object.keys(variants).length > 0) {
        const { variantsClasses } = usePinceauVariants(ids, variants, props, runtimeSheet, classes, loc);
        dynamicVariantClasses = variantsClasses;
      }
      if ((props == null ? void 0 : props.css) && Object.keys(props == null ? void 0 : props.css).length > 0) {
        usePinceauCssProp(ids, props, runtimeSheet, loc);
      }
      return { $pinceau: computed(() => {
        var _a;
        return [classes.value.v, classes.value.c, (_a = dynamicVariantClasses == null ? void 0 : dynamicVariantClasses.value) == null ? void 0 : _a.join(" ")].join(" ");
      }) };
    }
    app.config.globalProperties.$pinceauRuntime = usePinceauRuntime2;
    app.config.globalProperties.$pinceauTheme = themeSheet;
    app.config.globalProperties.$pinceauSsr = { get: () => runtimeSheet.toString() };
    app.provide("pinceauRuntime", usePinceauRuntime2);
    app.provide("pinceauTheme", themeSheet);
  }
};
function usePinceauRuntime(props, variants, computedStyles) {
  return inject("pinceauRuntime")(props, variants, computedStyles);
}
function usePinceauTheme() {
  return inject("pinceauTheme");
}
function computedStyle(defaultValue, required = false) {
  return {
    type: [String, Object],
    default: defaultValue,
    required
  };
}
const my = (value) => {
  return {
    marginTop: value,
    marginBottom: value
  };
};
const mx = (value) => {
  return {
    marginLeft: value,
    marginRight: value
  };
};
const py = (value) => {
  return {
    paddingTop: value,
    paddingBottom: value
  };
};
const px = (value) => {
  return {
    paddingLeft: value,
    paddingRight: value
  };
};
const truncate = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
const lineClamp = (lines) => ({
  "overflow": "hidden",
  "display": "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": lines
});
const text = (size) => ({
  fontSize: `{text.${size}.fontSize}`,
  lineHeight: `{text.${size}.lineHeight}`
});
const stateColors = (value) => {
  return {
    color: `{elements.state.${value}.color.primary} !important`,
    backgroundColor: `{elements.state.${value}.backgroundColor.primary} !important`,
    borderColor: `{elements.state.${value}.borderColor.primary} !important`,
    ":deep(p code)": {
      color: `{elements.state.${value}.color.secondary} !important`,
      backgroundColor: `{elements.state.${value}.backgroundColor.secondary} !important`
    },
    ":deep(code)": {
      color: `{elements.state.${value}.color.primary} !important`,
      backgroundColor: `{elements.state.${value}.backgroundColor.secondary} !important`
    },
    ":deep(a code)": {
      borderColor: `{elements.state.${value}.borderColor.primary} !important`
    },
    ":deep(a)": {
      borderColor: "currentColor",
      code: {
        backgroundColor: `{elements.state.${value}.backgroundColor.primary} !important`
      },
      "&:hover": {
        color: `{elements.state.${value}.color.secondary} !important`,
        borderColor: "currentColor !important",
        code: {
          backgroundColor: `{elements.state.${value}.backgroundColor.secondary} !important`,
          color: `{elements.state.${value}.color.secondary} !important`,
          borderColor: `{elements.state.${value}.borderColor.secondary} !important`
        }
      }
    }
  };
};
const utils = { my, mx, py, px, truncate, lineClamp, text, stateColors };
const theme = {
  "media": {
    "xs": {
      "value": "(min-width: 475px)",
      "variable": "var(--media-xs)",
      "raw": "(min-width: 475px)"
    },
    "sm": {
      "value": "(min-width: 640px)",
      "variable": "var(--media-sm)",
      "raw": "(min-width: 640px)"
    },
    "md": {
      "value": "(min-width: 768px)",
      "variable": "var(--media-md)",
      "raw": "(min-width: 768px)"
    },
    "lg": {
      "value": "(min-width: 1024px)",
      "variable": "var(--media-lg)",
      "raw": "(min-width: 1024px)"
    },
    "xl": {
      "value": "(min-width: 1280px)",
      "variable": "var(--media-xl)",
      "raw": "(min-width: 1280px)"
    },
    "2xl": {
      "value": "(min-width: 1536px)",
      "variable": "var(--media-2xl)",
      "raw": "(min-width: 1536px)"
    },
    "rm": {
      "value": "(prefers-reduced-motion: reduce)",
      "variable": "var(--media-rm)",
      "raw": "(prefers-reduced-motion: reduce)"
    },
    "landscape": {
      "value": "only screen and (orientation: landscape)",
      "variable": "var(--media-landscape)",
      "raw": "only screen and (orientation: landscape)"
    },
    "portrait": {
      "value": "only screen and (orientation: portrait)",
      "variable": "var(--media-portrait)",
      "raw": "only screen and (orientation: portrait)"
    }
  },
  "color": {
    "white": {
      "value": "#ffffff",
      "variable": "var(--color-white)",
      "raw": "#ffffff"
    },
    "black": {
      "value": "#0B0A0A",
      "variable": "var(--color-black)",
      "raw": "#0B0A0A"
    },
    "gray": {
      "50": {
        "value": "#FBFBFB",
        "variable": "var(--color-gray-50)",
        "raw": "#FBFBFB"
      },
      "100": {
        "value": "#F6F5F4",
        "variable": "var(--color-gray-100)",
        "raw": "#F6F5F4"
      },
      "200": {
        "value": "#ECEBE8",
        "variable": "var(--color-gray-200)",
        "raw": "#ECEBE8"
      },
      "300": {
        "value": "#DBD9D3",
        "variable": "var(--color-gray-300)",
        "raw": "#DBD9D3"
      },
      "400": {
        "value": "#ADA9A4",
        "variable": "var(--color-gray-400)",
        "raw": "#ADA9A4"
      },
      "500": {
        "value": "#97948F",
        "variable": "var(--color-gray-500)",
        "raw": "#97948F"
      },
      "600": {
        "value": "#67635D",
        "variable": "var(--color-gray-600)",
        "raw": "#67635D"
      },
      "700": {
        "value": "#36332E",
        "variable": "var(--color-gray-700)",
        "raw": "#36332E"
      },
      "800": {
        "value": "#201E1B",
        "variable": "var(--color-gray-800)",
        "raw": "#201E1B"
      },
      "900": {
        "value": "#121110",
        "variable": "var(--color-gray-900)",
        "raw": "#121110"
      }
    },
    "green": {
      "50": {
        "value": "#ECFFF7",
        "variable": "var(--color-green-50)",
        "raw": "#ECFFF7"
      },
      "100": {
        "value": "#DEFFF1",
        "variable": "var(--color-green-100)",
        "raw": "#DEFFF1"
      },
      "200": {
        "value": "#C3FFE6",
        "variable": "var(--color-green-200)",
        "raw": "#C3FFE6"
      },
      "300": {
        "value": "#86FBCB",
        "variable": "var(--color-green-300)",
        "raw": "#86FBCB"
      },
      "400": {
        "value": "#3CEEA5",
        "variable": "var(--color-green-400)",
        "raw": "#3CEEA5"
      },
      "500": {
        "value": "#0DD885",
        "variable": "var(--color-green-500)",
        "raw": "#0DD885"
      },
      "600": {
        "value": "#00B467",
        "variable": "var(--color-green-600)",
        "raw": "#00B467"
      },
      "700": {
        "value": "#006037",
        "variable": "var(--color-green-700)",
        "raw": "#006037"
      },
      "800": {
        "value": "#002817",
        "variable": "var(--color-green-800)",
        "raw": "#002817"
      },
      "900": {
        "value": "#00190F",
        "variable": "var(--color-green-900)",
        "raw": "#00190F"
      }
    },
    "yellow": {
      "50": {
        "value": "#FFFDEA",
        "variable": "var(--color-yellow-50)",
        "raw": "#FFFDEA"
      },
      "100": {
        "value": "#FFF8CC",
        "variable": "var(--color-yellow-100)",
        "raw": "#FFF8CC"
      },
      "200": {
        "value": "#FEF5A4",
        "variable": "var(--color-yellow-200)",
        "raw": "#FEF5A4"
      },
      "300": {
        "value": "#FFEF8A",
        "variable": "var(--color-yellow-300)",
        "raw": "#FFEF8A"
      },
      "400": {
        "value": "#FFE53C",
        "variable": "var(--color-yellow-400)",
        "raw": "#FFE53C"
      },
      "500": {
        "value": "#EECF00",
        "variable": "var(--color-yellow-500)",
        "raw": "#EECF00"
      },
      "600": {
        "value": "#C2A905",
        "variable": "var(--color-yellow-600)",
        "raw": "#C2A905"
      },
      "700": {
        "value": "#6B5D02",
        "variable": "var(--color-yellow-700)",
        "raw": "#6B5D02"
      },
      "800": {
        "value": "#282300",
        "variable": "var(--color-yellow-800)",
        "raw": "#282300"
      },
      "900": {
        "value": "#1A1700",
        "variable": "var(--color-yellow-900)",
        "raw": "#1A1700"
      }
    },
    "orange": {
      "50": {
        "value": "#ffe9d9",
        "variable": "var(--color-orange-50)",
        "raw": "#ffe9d9"
      },
      "100": {
        "value": "#ffd3b3",
        "variable": "var(--color-orange-100)",
        "raw": "#ffd3b3"
      },
      "200": {
        "value": "#ffbd8d",
        "variable": "var(--color-orange-200)",
        "raw": "#ffbd8d"
      },
      "300": {
        "value": "#ffa666",
        "variable": "var(--color-orange-300)",
        "raw": "#ffa666"
      },
      "400": {
        "value": "#ff9040",
        "variable": "var(--color-orange-400)",
        "raw": "#ff9040"
      },
      "500": {
        "value": "#ff7a1a",
        "variable": "var(--color-orange-500)",
        "raw": "#ff7a1a"
      },
      "600": {
        "value": "#e15e00",
        "variable": "var(--color-orange-600)",
        "raw": "#e15e00"
      },
      "700": {
        "value": "#a94700",
        "variable": "var(--color-orange-700)",
        "raw": "#a94700"
      },
      "800": {
        "value": "#702f00",
        "variable": "var(--color-orange-800)",
        "raw": "#702f00"
      },
      "900": {
        "value": "#381800",
        "variable": "var(--color-orange-900)",
        "raw": "#381800"
      }
    },
    "red": {
      "50": {
        "value": "#FFF9F8",
        "variable": "var(--color-red-50)",
        "raw": "#FFF9F8"
      },
      "100": {
        "value": "#FFF3F0",
        "variable": "var(--color-red-100)",
        "raw": "#FFF3F0"
      },
      "200": {
        "value": "#FFDED7",
        "variable": "var(--color-red-200)",
        "raw": "#FFDED7"
      },
      "300": {
        "value": "#FFA692",
        "variable": "var(--color-red-300)",
        "raw": "#FFA692"
      },
      "400": {
        "value": "#FF7353",
        "variable": "var(--color-red-400)",
        "raw": "#FF7353"
      },
      "500": {
        "value": "#FF3B10",
        "variable": "var(--color-red-500)",
        "raw": "#FF3B10"
      },
      "600": {
        "value": "#BB2402",
        "variable": "var(--color-red-600)",
        "raw": "#BB2402"
      },
      "700": {
        "value": "#701704",
        "variable": "var(--color-red-700)",
        "raw": "#701704"
      },
      "800": {
        "value": "#340A01",
        "variable": "var(--color-red-800)",
        "raw": "#340A01"
      },
      "900": {
        "value": "#1C0301",
        "variable": "var(--color-red-900)",
        "raw": "#1C0301"
      }
    },
    "pear": {
      "50": {
        "value": "#f7f8dc",
        "variable": "var(--color-pear-50)",
        "raw": "#f7f8dc"
      },
      "100": {
        "value": "#eff0ba",
        "variable": "var(--color-pear-100)",
        "raw": "#eff0ba"
      },
      "200": {
        "value": "#e8e997",
        "variable": "var(--color-pear-200)",
        "raw": "#e8e997"
      },
      "300": {
        "value": "#e0e274",
        "variable": "var(--color-pear-300)",
        "raw": "#e0e274"
      },
      "400": {
        "value": "#d8da52",
        "variable": "var(--color-pear-400)",
        "raw": "#d8da52"
      },
      "500": {
        "value": "#d0d32f",
        "variable": "var(--color-pear-500)",
        "raw": "#d0d32f"
      },
      "600": {
        "value": "#a8aa24",
        "variable": "var(--color-pear-600)",
        "raw": "#a8aa24"
      },
      "700": {
        "value": "#7e801b",
        "variable": "var(--color-pear-700)",
        "raw": "#7e801b"
      },
      "800": {
        "value": "#545512",
        "variable": "var(--color-pear-800)",
        "raw": "#545512"
      },
      "900": {
        "value": "#2a2b09",
        "variable": "var(--color-pear-900)",
        "raw": "#2a2b09"
      }
    },
    "teal": {
      "50": {
        "value": "#d7faf8",
        "variable": "var(--color-teal-50)",
        "raw": "#d7faf8"
      },
      "100": {
        "value": "#aff4f0",
        "variable": "var(--color-teal-100)",
        "raw": "#aff4f0"
      },
      "200": {
        "value": "#87efe9",
        "variable": "var(--color-teal-200)",
        "raw": "#87efe9"
      },
      "300": {
        "value": "#5fe9e1",
        "variable": "var(--color-teal-300)",
        "raw": "#5fe9e1"
      },
      "400": {
        "value": "#36e4da",
        "variable": "var(--color-teal-400)",
        "raw": "#36e4da"
      },
      "500": {
        "value": "#1cd1c6",
        "variable": "var(--color-teal-500)",
        "raw": "#1cd1c6"
      },
      "600": {
        "value": "#16a79e",
        "variable": "var(--color-teal-600)",
        "raw": "#16a79e"
      },
      "700": {
        "value": "#117d77",
        "variable": "var(--color-teal-700)",
        "raw": "#117d77"
      },
      "800": {
        "value": "#0b544f",
        "variable": "var(--color-teal-800)",
        "raw": "#0b544f"
      },
      "900": {
        "value": "#062a28",
        "variable": "var(--color-teal-900)",
        "raw": "#062a28"
      }
    },
    "lightblue": {
      "50": {
        "value": "#d9f8ff",
        "variable": "var(--color-lightblue-50)",
        "raw": "#d9f8ff"
      },
      "100": {
        "value": "#b3f1ff",
        "variable": "var(--color-lightblue-100)",
        "raw": "#b3f1ff"
      },
      "200": {
        "value": "#8deaff",
        "variable": "var(--color-lightblue-200)",
        "raw": "#8deaff"
      },
      "300": {
        "value": "#66e4ff",
        "variable": "var(--color-lightblue-300)",
        "raw": "#66e4ff"
      },
      "400": {
        "value": "#40ddff",
        "variable": "var(--color-lightblue-400)",
        "raw": "#40ddff"
      },
      "500": {
        "value": "#1ad6ff",
        "variable": "var(--color-lightblue-500)",
        "raw": "#1ad6ff"
      },
      "600": {
        "value": "#00b9e1",
        "variable": "var(--color-lightblue-600)",
        "raw": "#00b9e1"
      },
      "700": {
        "value": "#008aa9",
        "variable": "var(--color-lightblue-700)",
        "raw": "#008aa9"
      },
      "800": {
        "value": "#005c70",
        "variable": "var(--color-lightblue-800)",
        "raw": "#005c70"
      },
      "900": {
        "value": "#002e38",
        "variable": "var(--color-lightblue-900)",
        "raw": "#002e38"
      }
    },
    "blue": {
      "50": {
        "value": "#F2FAFF",
        "variable": "var(--color-blue-50)",
        "raw": "#F2FAFF"
      },
      "100": {
        "value": "#DFF3FF",
        "variable": "var(--color-blue-100)",
        "raw": "#DFF3FF"
      },
      "200": {
        "value": "#C6EAFF",
        "variable": "var(--color-blue-200)",
        "raw": "#C6EAFF"
      },
      "300": {
        "value": "#A1DDFF",
        "variable": "var(--color-blue-300)",
        "raw": "#A1DDFF"
      },
      "400": {
        "value": "#64C7FF",
        "variable": "var(--color-blue-400)",
        "raw": "#64C7FF"
      },
      "500": {
        "value": "#1AADFF",
        "variable": "var(--color-blue-500)",
        "raw": "#1AADFF"
      },
      "600": {
        "value": "#0069A6",
        "variable": "var(--color-blue-600)",
        "raw": "#0069A6"
      },
      "700": {
        "value": "#003351",
        "variable": "var(--color-blue-700)",
        "raw": "#003351"
      },
      "800": {
        "value": "#002235",
        "variable": "var(--color-blue-800)",
        "raw": "#002235"
      },
      "900": {
        "value": "#00131D",
        "variable": "var(--color-blue-900)",
        "raw": "#00131D"
      }
    },
    "indigoblue": {
      "50": {
        "value": "#d9e5ff",
        "variable": "var(--color-indigoblue-50)",
        "raw": "#d9e5ff"
      },
      "100": {
        "value": "#b3cbff",
        "variable": "var(--color-indigoblue-100)",
        "raw": "#b3cbff"
      },
      "200": {
        "value": "#8db0ff",
        "variable": "var(--color-indigoblue-200)",
        "raw": "#8db0ff"
      },
      "300": {
        "value": "#6696ff",
        "variable": "var(--color-indigoblue-300)",
        "raw": "#6696ff"
      },
      "400": {
        "value": "#407cff",
        "variable": "var(--color-indigoblue-400)",
        "raw": "#407cff"
      },
      "500": {
        "value": "#1a62ff",
        "variable": "var(--color-indigoblue-500)",
        "raw": "#1a62ff"
      },
      "600": {
        "value": "#0047e1",
        "variable": "var(--color-indigoblue-600)",
        "raw": "#0047e1"
      },
      "700": {
        "value": "#0035a9",
        "variable": "var(--color-indigoblue-700)",
        "raw": "#0035a9"
      },
      "800": {
        "value": "#002370",
        "variable": "var(--color-indigoblue-800)",
        "raw": "#002370"
      },
      "900": {
        "value": "#001238",
        "variable": "var(--color-indigoblue-900)",
        "raw": "#001238"
      }
    },
    "royalblue": {
      "50": {
        "value": "#dfdbfb",
        "variable": "var(--color-royalblue-50)",
        "raw": "#dfdbfb"
      },
      "100": {
        "value": "#c0b7f7",
        "variable": "var(--color-royalblue-100)",
        "raw": "#c0b7f7"
      },
      "200": {
        "value": "#a093f3",
        "variable": "var(--color-royalblue-200)",
        "raw": "#a093f3"
      },
      "300": {
        "value": "#806ff0",
        "variable": "var(--color-royalblue-300)",
        "raw": "#806ff0"
      },
      "400": {
        "value": "#614bec",
        "variable": "var(--color-royalblue-400)",
        "raw": "#614bec"
      },
      "500": {
        "value": "#4127e8",
        "variable": "var(--color-royalblue-500)",
        "raw": "#4127e8"
      },
      "600": {
        "value": "#2c15c4",
        "variable": "var(--color-royalblue-600)",
        "raw": "#2c15c4"
      },
      "700": {
        "value": "#211093",
        "variable": "var(--color-royalblue-700)",
        "raw": "#211093"
      },
      "800": {
        "value": "#160a62",
        "variable": "var(--color-royalblue-800)",
        "raw": "#160a62"
      },
      "900": {
        "value": "#0b0531",
        "variable": "var(--color-royalblue-900)",
        "raw": "#0b0531"
      }
    },
    "purple": {
      "50": {
        "value": "#ead9ff",
        "variable": "var(--color-purple-50)",
        "raw": "#ead9ff"
      },
      "100": {
        "value": "#d5b3ff",
        "variable": "var(--color-purple-100)",
        "raw": "#d5b3ff"
      },
      "200": {
        "value": "#c08dff",
        "variable": "var(--color-purple-200)",
        "raw": "#c08dff"
      },
      "300": {
        "value": "#ab66ff",
        "variable": "var(--color-purple-300)",
        "raw": "#ab66ff"
      },
      "400": {
        "value": "#9640ff",
        "variable": "var(--color-purple-400)",
        "raw": "#9640ff"
      },
      "500": {
        "value": "#811aff",
        "variable": "var(--color-purple-500)",
        "raw": "#811aff"
      },
      "600": {
        "value": "#6500e1",
        "variable": "var(--color-purple-600)",
        "raw": "#6500e1"
      },
      "700": {
        "value": "#4c00a9",
        "variable": "var(--color-purple-700)",
        "raw": "#4c00a9"
      },
      "800": {
        "value": "#330070",
        "variable": "var(--color-purple-800)",
        "raw": "#330070"
      },
      "900": {
        "value": "#190038",
        "variable": "var(--color-purple-900)",
        "raw": "#190038"
      }
    },
    "pink": {
      "50": {
        "value": "#ffd9f2",
        "variable": "var(--color-pink-50)",
        "raw": "#ffd9f2"
      },
      "100": {
        "value": "#ffb3e5",
        "variable": "var(--color-pink-100)",
        "raw": "#ffb3e5"
      },
      "200": {
        "value": "#ff8dd8",
        "variable": "var(--color-pink-200)",
        "raw": "#ff8dd8"
      },
      "300": {
        "value": "#ff66cc",
        "variable": "var(--color-pink-300)",
        "raw": "#ff66cc"
      },
      "400": {
        "value": "#ff40bf",
        "variable": "var(--color-pink-400)",
        "raw": "#ff40bf"
      },
      "500": {
        "value": "#ff1ab2",
        "variable": "var(--color-pink-500)",
        "raw": "#ff1ab2"
      },
      "600": {
        "value": "#e10095",
        "variable": "var(--color-pink-600)",
        "raw": "#e10095"
      },
      "700": {
        "value": "#a90070",
        "variable": "var(--color-pink-700)",
        "raw": "#a90070"
      },
      "800": {
        "value": "#70004b",
        "variable": "var(--color-pink-800)",
        "raw": "#70004b"
      },
      "900": {
        "value": "#380025",
        "variable": "var(--color-pink-900)",
        "raw": "#380025"
      }
    },
    "ruby": {
      "50": {
        "value": "#ffd9e4",
        "variable": "var(--color-ruby-50)",
        "raw": "#ffd9e4"
      },
      "100": {
        "value": "#ffb3c9",
        "variable": "var(--color-ruby-100)",
        "raw": "#ffb3c9"
      },
      "200": {
        "value": "#ff8dae",
        "variable": "var(--color-ruby-200)",
        "raw": "#ff8dae"
      },
      "300": {
        "value": "#ff6694",
        "variable": "var(--color-ruby-300)",
        "raw": "#ff6694"
      },
      "400": {
        "value": "#ff4079",
        "variable": "var(--color-ruby-400)",
        "raw": "#ff4079"
      },
      "500": {
        "value": "#ff1a5e",
        "variable": "var(--color-ruby-500)",
        "raw": "#ff1a5e"
      },
      "600": {
        "value": "#e10043",
        "variable": "var(--color-ruby-600)",
        "raw": "#e10043"
      },
      "700": {
        "value": "#a90032",
        "variable": "var(--color-ruby-700)",
        "raw": "#a90032"
      },
      "800": {
        "value": "#700021",
        "variable": "var(--color-ruby-800)",
        "raw": "#700021"
      },
      "900": {
        "value": "#380011",
        "variable": "var(--color-ruby-900)",
        "raw": "#380011"
      }
    },
    "primary": {
      "50": {
        "value": "#F1FCFF",
        "variable": "var(--color-primary-50)",
        "raw": "#F1FCFF"
      },
      "100": {
        "value": "#DCF7FF",
        "variable": "var(--color-primary-100)",
        "raw": "#DCF7FF"
      },
      "200": {
        "value": "#C5F2FF",
        "variable": "var(--color-primary-200)",
        "raw": "#C5F2FF"
      },
      "300": {
        "value": "#82E3FF",
        "variable": "var(--color-primary-300)",
        "raw": "#82E3FF"
      },
      "400": {
        "value": "#55E1FF",
        "variable": "var(--color-primary-400)",
        "raw": "#55E1FF"
      },
      "500": {
        "value": "#1AD6FF",
        "variable": "var(--color-primary-500)",
        "raw": "#1AD6FF"
      },
      "600": {
        "value": "#09A0C1",
        "variable": "var(--color-primary-600)",
        "raw": "#09A0C1"
      },
      "700": {
        "value": "#024757",
        "variable": "var(--color-primary-700)",
        "raw": "#024757"
      },
      "800": {
        "value": "#00232B",
        "variable": "var(--color-primary-800)",
        "raw": "#00232B"
      },
      "900": {
        "value": "#001A1F",
        "variable": "var(--color-primary-900)",
        "raw": "#001A1F"
      }
    },
    "secondary": {
      "50": {
        "value": "var(--color-gray-50)",
        "variable": "var(--color-secondary-50)",
        "raw": "{color.gray.50}"
      },
      "100": {
        "value": "var(--color-gray-100)",
        "variable": "var(--color-secondary-100)",
        "raw": "{color.gray.100}"
      },
      "200": {
        "value": "var(--color-gray-200)",
        "variable": "var(--color-secondary-200)",
        "raw": "{color.gray.200}"
      },
      "300": {
        "value": "var(--color-gray-300)",
        "variable": "var(--color-secondary-300)",
        "raw": "{color.gray.300}"
      },
      "400": {
        "value": "var(--color-gray-400)",
        "variable": "var(--color-secondary-400)",
        "raw": "{color.gray.400}"
      },
      "500": {
        "value": "var(--color-gray-500)",
        "variable": "var(--color-secondary-500)",
        "raw": "{color.gray.500}"
      },
      "600": {
        "value": "var(--color-gray-600)",
        "variable": "var(--color-secondary-600)",
        "raw": "{color.gray.600}"
      },
      "700": {
        "value": "var(--color-gray-700)",
        "variable": "var(--color-secondary-700)",
        "raw": "{color.gray.700}"
      },
      "800": {
        "value": "var(--color-gray-800)",
        "variable": "var(--color-secondary-800)",
        "raw": "{color.gray.800}"
      },
      "900": {
        "value": "var(--color-gray-900)",
        "variable": "var(--color-secondary-900)",
        "raw": "{color.gray.900}"
      }
    }
  },
  "width": {
    "screen": {
      "value": "100vw",
      "variable": "var(--width-screen)",
      "raw": "100vw"
    }
  },
  "height": {
    "screen": {
      "value": "100vh",
      "variable": "var(--height-screen)",
      "raw": "100vh"
    }
  },
  "shadow": {
    "xs": {
      "value": "0px 1px 2px 0px #000000",
      "variable": "var(--shadow-xs)",
      "raw": "0px 1px 2px 0px #000000"
    },
    "sm": {
      "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000",
      "variable": "var(--shadow-sm)",
      "raw": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
    },
    "md": {
      "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000",
      "variable": "var(--shadow-md)",
      "raw": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
    },
    "lg": {
      "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000",
      "variable": "var(--shadow-lg)",
      "raw": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
    },
    "xl": {
      "value": "0px 20px 25px -5px var(--color-gray-400), 0px 8px 10px -6px #000000",
      "variable": "var(--shadow-xl)",
      "raw": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
    },
    "2xl": {
      "value": "0px 25px 50px -12px var(--color-gray-900)",
      "variable": "var(--shadow-2xl)",
      "raw": "0px 25px 50px -12px {color.gray.900}"
    },
    "none": {
      "value": "0px 0px 0px 0px transparent",
      "variable": "var(--shadow-none)",
      "raw": "0px 0px 0px 0px transparent"
    }
  },
  "radii": {
    "none": {
      "value": "0px",
      "variable": "var(--radii-none)",
      "raw": "0px"
    },
    "2xs": {
      "value": "0.125rem",
      "variable": "var(--radii-2xs)",
      "raw": "0.125rem"
    },
    "xs": {
      "value": "0.25rem",
      "variable": "var(--radii-xs)",
      "raw": "0.25rem"
    },
    "sm": {
      "value": "0.375rem",
      "variable": "var(--radii-sm)",
      "raw": "0.375rem"
    },
    "md": {
      "value": "0.5rem",
      "variable": "var(--radii-md)",
      "raw": "0.5rem"
    },
    "lg": {
      "value": "0.75rem",
      "variable": "var(--radii-lg)",
      "raw": "0.75rem"
    },
    "xl": {
      "value": "1rem",
      "variable": "var(--radii-xl)",
      "raw": "1rem"
    },
    "2xl": {
      "value": "1.5rem",
      "variable": "var(--radii-2xl)",
      "raw": "1.5rem"
    },
    "3xl": {
      "value": "1.75rem",
      "variable": "var(--radii-3xl)",
      "raw": "1.75rem"
    },
    "full": {
      "value": "9999px",
      "variable": "var(--radii-full)",
      "raw": "9999px"
    }
  },
  "size": {
    "0": {
      "value": "0px",
      "variable": "var(--size-0)",
      "raw": "0px"
    },
    "2": {
      "value": "2px",
      "variable": "var(--size-2)",
      "raw": "2px"
    },
    "4": {
      "value": "4px",
      "variable": "var(--size-4)",
      "raw": "4px"
    },
    "6": {
      "value": "6px",
      "variable": "var(--size-6)",
      "raw": "6px"
    },
    "8": {
      "value": "8px",
      "variable": "var(--size-8)",
      "raw": "8px"
    },
    "12": {
      "value": "12px",
      "variable": "var(--size-12)",
      "raw": "12px"
    },
    "16": {
      "value": "16px",
      "variable": "var(--size-16)",
      "raw": "16px"
    },
    "20": {
      "value": "20px",
      "variable": "var(--size-20)",
      "raw": "20px"
    },
    "24": {
      "value": "24px",
      "variable": "var(--size-24)",
      "raw": "24px"
    },
    "32": {
      "value": "32px",
      "variable": "var(--size-32)",
      "raw": "32px"
    },
    "40": {
      "value": "40px",
      "variable": "var(--size-40)",
      "raw": "40px"
    },
    "48": {
      "value": "48px",
      "variable": "var(--size-48)",
      "raw": "48px"
    },
    "56": {
      "value": "56px",
      "variable": "var(--size-56)",
      "raw": "56px"
    },
    "64": {
      "value": "64px",
      "variable": "var(--size-64)",
      "raw": "64px"
    },
    "80": {
      "value": "80px",
      "variable": "var(--size-80)",
      "raw": "80px"
    },
    "104": {
      "value": "104px",
      "variable": "var(--size-104)",
      "raw": "104px"
    },
    "200": {
      "value": "200px",
      "variable": "var(--size-200)",
      "raw": "200px"
    },
    "xs": {
      "value": "20rem",
      "variable": "var(--size-xs)",
      "raw": "20rem"
    },
    "sm": {
      "value": "24rem",
      "variable": "var(--size-sm)",
      "raw": "24rem"
    },
    "md": {
      "value": "28rem",
      "variable": "var(--size-md)",
      "raw": "28rem"
    },
    "lg": {
      "value": "32rem",
      "variable": "var(--size-lg)",
      "raw": "32rem"
    },
    "xl": {
      "value": "36rem",
      "variable": "var(--size-xl)",
      "raw": "36rem"
    },
    "2xl": {
      "value": "42rem",
      "variable": "var(--size-2xl)",
      "raw": "42rem"
    },
    "3xl": {
      "value": "48rem",
      "variable": "var(--size-3xl)",
      "raw": "48rem"
    },
    "4xl": {
      "value": "56rem",
      "variable": "var(--size-4xl)",
      "raw": "56rem"
    },
    "5xl": {
      "value": "64rem",
      "variable": "var(--size-5xl)",
      "raw": "64rem"
    },
    "6xl": {
      "value": "72rem",
      "variable": "var(--size-6xl)",
      "raw": "72rem"
    },
    "7xl": {
      "value": "80rem",
      "variable": "var(--size-7xl)",
      "raw": "80rem"
    },
    "full": {
      "value": "100%",
      "variable": "var(--size-full)",
      "raw": "100%"
    }
  },
  "space": {
    "0": {
      "value": "0px",
      "variable": "var(--space-0)",
      "raw": "0px"
    },
    "1": {
      "value": "0.25rem",
      "variable": "var(--space-1)",
      "raw": "0.25rem"
    },
    "2": {
      "value": "0.5rem",
      "variable": "var(--space-2)",
      "raw": "0.5rem"
    },
    "3": {
      "value": "0.75rem",
      "variable": "var(--space-3)",
      "raw": "0.75rem"
    },
    "4": {
      "value": "1rem",
      "variable": "var(--space-4)",
      "raw": "1rem"
    },
    "5": {
      "value": "1.25rem",
      "variable": "var(--space-5)",
      "raw": "1.25rem"
    },
    "6": {
      "value": "1.5rem",
      "variable": "var(--space-6)",
      "raw": "1.5rem"
    },
    "7": {
      "value": "1.75rem",
      "variable": "var(--space-7)",
      "raw": "1.75rem"
    },
    "8": {
      "value": "2rem",
      "variable": "var(--space-8)",
      "raw": "2rem"
    },
    "9": {
      "value": "2.25rem",
      "variable": "var(--space-9)",
      "raw": "2.25rem"
    },
    "10": {
      "value": "2.5rem",
      "variable": "var(--space-10)",
      "raw": "2.5rem"
    },
    "11": {
      "value": "2.75rem",
      "variable": "var(--space-11)",
      "raw": "2.75rem"
    },
    "12": {
      "value": "3rem",
      "variable": "var(--space-12)",
      "raw": "3rem"
    },
    "14": {
      "value": "3.5rem",
      "variable": "var(--space-14)",
      "raw": "3.5rem"
    },
    "16": {
      "value": "4rem",
      "variable": "var(--space-16)",
      "raw": "4rem"
    },
    "20": {
      "value": "5rem",
      "variable": "var(--space-20)",
      "raw": "5rem"
    },
    "24": {
      "value": "6rem",
      "variable": "var(--space-24)",
      "raw": "6rem"
    },
    "28": {
      "value": "7rem",
      "variable": "var(--space-28)",
      "raw": "7rem"
    },
    "32": {
      "value": "8rem",
      "variable": "var(--space-32)",
      "raw": "8rem"
    },
    "36": {
      "value": "9rem",
      "variable": "var(--space-36)",
      "raw": "9rem"
    },
    "40": {
      "value": "10rem",
      "variable": "var(--space-40)",
      "raw": "10rem"
    },
    "44": {
      "value": "11rem",
      "variable": "var(--space-44)",
      "raw": "11rem"
    },
    "48": {
      "value": "12rem",
      "variable": "var(--space-48)",
      "raw": "12rem"
    },
    "52": {
      "value": "13rem",
      "variable": "var(--space-52)",
      "raw": "13rem"
    },
    "56": {
      "value": "14rem",
      "variable": "var(--space-56)",
      "raw": "14rem"
    },
    "60": {
      "value": "15rem",
      "variable": "var(--space-60)",
      "raw": "15rem"
    },
    "64": {
      "value": "16rem",
      "variable": "var(--space-64)",
      "raw": "16rem"
    },
    "72": {
      "value": "18rem",
      "variable": "var(--space-72)",
      "raw": "18rem"
    },
    "80": {
      "value": "20rem",
      "variable": "var(--space-80)",
      "raw": "20rem"
    },
    "96": {
      "value": "24rem",
      "variable": "var(--space-96)",
      "raw": "24rem"
    },
    "128": {
      "value": "32rem",
      "variable": "var(--space-128)",
      "raw": "32rem"
    },
    "px": {
      "value": "1px",
      "variable": "var(--space-px)",
      "raw": "1px"
    },
    "rem": {
      "125": {
        "value": "0.125rem",
        "variable": "var(--space-rem-125)",
        "raw": "0.125rem"
      },
      "375": {
        "value": "0.375rem",
        "variable": "var(--space-rem-375)",
        "raw": "0.375rem"
      },
      "625": {
        "value": "0.625rem",
        "variable": "var(--space-rem-625)",
        "raw": "0.625rem"
      },
      "875": {
        "value": "0.875rem",
        "variable": "var(--space-rem-875)",
        "raw": "0.875rem"
      }
    }
  },
  "borderWidth": {
    "noBorder": {
      "value": "0",
      "variable": "var(--borderWidth-noBorder)",
      "raw": "0"
    },
    "sm": {
      "value": "1px",
      "variable": "var(--borderWidth-sm)",
      "raw": "1px"
    },
    "md": {
      "value": "2px",
      "variable": "var(--borderWidth-md)",
      "raw": "2px"
    },
    "lg": {
      "value": "3px",
      "variable": "var(--borderWidth-lg)",
      "raw": "3px"
    }
  },
  "opacity": {
    "noOpacity": {
      "value": "0",
      "variable": "var(--opacity-noOpacity)",
      "raw": "0"
    },
    "bright": {
      "value": "0.1",
      "variable": "var(--opacity-bright)",
      "raw": "0.1"
    },
    "light": {
      "value": "0.15",
      "variable": "var(--opacity-light)",
      "raw": "0.15"
    },
    "soft": {
      "value": "0.3",
      "variable": "var(--opacity-soft)",
      "raw": "0.3"
    },
    "medium": {
      "value": "0.5",
      "variable": "var(--opacity-medium)",
      "raw": "0.5"
    },
    "high": {
      "value": "0.8",
      "variable": "var(--opacity-high)",
      "raw": "0.8"
    },
    "total": {
      "value": "1",
      "variable": "var(--opacity-total)",
      "raw": "1"
    }
  },
  "font": {
    "sans": {
      "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
      "variable": "var(--font-sans)",
      "raw": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    },
    "serif": {
      "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
      "variable": "var(--font-serif)",
      "raw": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    },
    "mono": {
      "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      "variable": "var(--font-mono)",
      "raw": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    }
  },
  "fontWeight": {
    "thin": {
      "value": "100",
      "variable": "var(--fontWeight-thin)",
      "raw": "100"
    },
    "extralight": {
      "value": "200",
      "variable": "var(--fontWeight-extralight)",
      "raw": "200"
    },
    "light": {
      "value": "300",
      "variable": "var(--fontWeight-light)",
      "raw": "300"
    },
    "normal": {
      "value": "400",
      "variable": "var(--fontWeight-normal)",
      "raw": "400"
    },
    "medium": {
      "value": "500",
      "variable": "var(--fontWeight-medium)",
      "raw": "500"
    },
    "semibold": {
      "value": "600",
      "variable": "var(--fontWeight-semibold)",
      "raw": "600"
    },
    "bold": {
      "value": "700",
      "variable": "var(--fontWeight-bold)",
      "raw": "700"
    },
    "extrabold": {
      "value": "800",
      "variable": "var(--fontWeight-extrabold)",
      "raw": "800"
    },
    "black": {
      "value": "900",
      "variable": "var(--fontWeight-black)",
      "raw": "900"
    }
  },
  "fontSize": {
    "xs": {
      "value": "0.75rem",
      "variable": "var(--fontSize-xs)",
      "raw": "0.75rem"
    },
    "sm": {
      "value": "0.875rem",
      "variable": "var(--fontSize-sm)",
      "raw": "0.875rem"
    },
    "base": {
      "value": "1rem",
      "variable": "var(--fontSize-base)",
      "raw": "1rem"
    },
    "lg": {
      "value": "1.125rem",
      "variable": "var(--fontSize-lg)",
      "raw": "1.125rem"
    },
    "xl": {
      "value": "1.25rem",
      "variable": "var(--fontSize-xl)",
      "raw": "1.25rem"
    },
    "2xl": {
      "value": "1.5rem",
      "variable": "var(--fontSize-2xl)",
      "raw": "1.5rem"
    },
    "3xl": {
      "value": "1.875rem",
      "variable": "var(--fontSize-3xl)",
      "raw": "1.875rem"
    },
    "4xl": {
      "value": "2.25rem",
      "variable": "var(--fontSize-4xl)",
      "raw": "2.25rem"
    },
    "5xl": {
      "value": "3rem",
      "variable": "var(--fontSize-5xl)",
      "raw": "3rem"
    },
    "6xl": {
      "value": "3.75rem",
      "variable": "var(--fontSize-6xl)",
      "raw": "3.75rem"
    },
    "7xl": {
      "value": "4.5rem",
      "variable": "var(--fontSize-7xl)",
      "raw": "4.5rem"
    },
    "8xl": {
      "value": "6rem",
      "variable": "var(--fontSize-8xl)",
      "raw": "6rem"
    },
    "9xl": {
      "value": "8rem",
      "variable": "var(--fontSize-9xl)",
      "raw": "8rem"
    }
  },
  "letterSpacing": {
    "tighter": {
      "value": "-0.05em",
      "variable": "var(--letterSpacing-tighter)",
      "raw": "-0.05em"
    },
    "tight": {
      "value": "-0.025em",
      "variable": "var(--letterSpacing-tight)",
      "raw": "-0.025em"
    },
    "normal": {
      "value": "0em",
      "variable": "var(--letterSpacing-normal)",
      "raw": "0em"
    },
    "wide": {
      "value": "0.025em",
      "variable": "var(--letterSpacing-wide)",
      "raw": "0.025em"
    },
    "wider": {
      "value": "0.05em",
      "variable": "var(--letterSpacing-wider)",
      "raw": "0.05em"
    },
    "widest": {
      "value": "0.1em",
      "variable": "var(--letterSpacing-widest)",
      "raw": "0.1em"
    }
  },
  "lead": {
    "1": {
      "value": ".025rem",
      "variable": "var(--lead-1)",
      "raw": ".025rem"
    },
    "2": {
      "value": ".5rem",
      "variable": "var(--lead-2)",
      "raw": ".5rem"
    },
    "3": {
      "value": ".75rem",
      "variable": "var(--lead-3)",
      "raw": ".75rem"
    },
    "4": {
      "value": "1rem",
      "variable": "var(--lead-4)",
      "raw": "1rem"
    },
    "5": {
      "value": "1.25rem",
      "variable": "var(--lead-5)",
      "raw": "1.25rem"
    },
    "6": {
      "value": "1.5rem",
      "variable": "var(--lead-6)",
      "raw": "1.5rem"
    },
    "7": {
      "value": "1.75rem",
      "variable": "var(--lead-7)",
      "raw": "1.75rem"
    },
    "8": {
      "value": "2rem",
      "variable": "var(--lead-8)",
      "raw": "2rem"
    },
    "9": {
      "value": "2.25rem",
      "variable": "var(--lead-9)",
      "raw": "2.25rem"
    },
    "10": {
      "value": "2.5rem",
      "variable": "var(--lead-10)",
      "raw": "2.5rem"
    },
    "none": {
      "value": "1",
      "variable": "var(--lead-none)",
      "raw": "1"
    },
    "tight": {
      "value": "1.25",
      "variable": "var(--lead-tight)",
      "raw": "1.25"
    },
    "snug": {
      "value": "1.375",
      "variable": "var(--lead-snug)",
      "raw": "1.375"
    },
    "normal": {
      "value": "1.5",
      "variable": "var(--lead-normal)",
      "raw": "1.5"
    },
    "relaxed": {
      "value": "1.625",
      "variable": "var(--lead-relaxed)",
      "raw": "1.625"
    },
    "loose": {
      "value": "2",
      "variable": "var(--lead-loose)",
      "raw": "2"
    }
  },
  "text": {
    "xs": {
      "fontSize": {
        "value": "var(--fontSize-xs)",
        "variable": "var(--text-xs-fontSize)",
        "raw": "{fontSize.xs}"
      },
      "lineHeight": {
        "value": "var(--lead-4)",
        "variable": "var(--text-xs-lineHeight)",
        "raw": "{lead.4}"
      }
    },
    "sm": {
      "fontSize": {
        "value": "var(--fontSize-sm)",
        "variable": "var(--text-sm-fontSize)",
        "raw": "{fontSize.sm}"
      },
      "lineHeight": {
        "value": "var(--lead-5)",
        "variable": "var(--text-sm-lineHeight)",
        "raw": "{lead.5}"
      }
    },
    "base": {
      "fontSize": {
        "value": "var(--fontSize-base)",
        "variable": "var(--text-base-fontSize)",
        "raw": "{fontSize.base}"
      },
      "lineHeight": {
        "value": "var(--lead-6)",
        "variable": "var(--text-base-lineHeight)",
        "raw": "{lead.6}"
      }
    },
    "lg": {
      "fontSize": {
        "value": "var(--fontSize-lg)",
        "variable": "var(--text-lg-fontSize)",
        "raw": "{fontSize.lg}"
      },
      "lineHeight": {
        "value": "var(--lead-7)",
        "variable": "var(--text-lg-lineHeight)",
        "raw": "{lead.7}"
      }
    },
    "xl": {
      "fontSize": {
        "value": "var(--fontSize-xl)",
        "variable": "var(--text-xl-fontSize)",
        "raw": "{fontSize.xl}"
      },
      "lineHeight": {
        "value": "var(--lead-7)",
        "variable": "var(--text-xl-lineHeight)",
        "raw": "{lead.7}"
      }
    },
    "2xl": {
      "fontSize": {
        "value": "var(--fontSize-2xl)",
        "variable": "var(--text-2xl-fontSize)",
        "raw": "{fontSize.2xl}"
      },
      "lineHeight": {
        "value": "var(--lead-8)",
        "variable": "var(--text-2xl-lineHeight)",
        "raw": "{lead.8}"
      }
    },
    "3xl": {
      "fontSize": {
        "value": "var(--fontSize-3xl)",
        "variable": "var(--text-3xl-fontSize)",
        "raw": "{fontSize.3xl}"
      },
      "lineHeight": {
        "value": "var(--lead-9)",
        "variable": "var(--text-3xl-lineHeight)",
        "raw": "{lead.9}"
      }
    },
    "4xl": {
      "fontSize": {
        "value": "var(--fontSize-4xl)",
        "variable": "var(--text-4xl-fontSize)",
        "raw": "{fontSize.4xl}"
      },
      "lineHeight": {
        "value": "var(--lead-10)",
        "variable": "var(--text-4xl-lineHeight)",
        "raw": "{lead.10}"
      }
    },
    "5xl": {
      "fontSize": {
        "value": "var(--fontSize-5xl)",
        "variable": "var(--text-5xl-fontSize)",
        "raw": "{fontSize.5xl}"
      },
      "lineHeight": {
        "value": "var(--lead-none)",
        "variable": "var(--text-5xl-lineHeight)",
        "raw": "{lead.none}"
      }
    },
    "6xl": {
      "fontSize": {
        "value": "var(--fontSize-6xl)",
        "variable": "var(--text-6xl-fontSize)",
        "raw": "{fontSize.6xl}"
      },
      "lineHeight": {
        "value": "var(--lead-none)",
        "variable": "var(--text-6xl-lineHeight)",
        "raw": "{lead.none}"
      }
    }
  },
  "elements": {
    "text": {
      "primary": {
        "color": {
          "static": {
            "value": {
              "initial": "var(--color-gray-900)",
              "dark": "var(--color-gray-50)"
            },
            "variable": "var(--elements-text-primary-color-static)",
            "raw": {
              "initial": "{color.gray.900}",
              "dark": "{color.gray.50}"
            }
          },
          "hover": {}
        }
      },
      "secondary": {
        "color": {
          "static": {
            "value": {
              "initial": "var(--color-gray-500)",
              "dark": "var(--color-gray-400)"
            },
            "variable": "var(--elements-text-secondary-color-static)",
            "raw": {
              "initial": "{color.gray.500}",
              "dark": "{color.gray.400}"
            }
          },
          "hover": {
            "value": {
              "initial": "var(--color-gray-700)",
              "dark": "var(--color-gray-200)"
            },
            "variable": "var(--elements-text-secondary-color-hover)",
            "raw": {
              "initial": "{color.gray.700}",
              "dark": "{color.gray.200}"
            }
          }
        }
      }
    },
    "container": {
      "maxWidth": {
        "value": "80rem",
        "variable": "var(--elements-container-maxWidth)",
        "raw": "80rem"
      },
      "padding": {
        "mobile": {
          "value": "var(--space-4)",
          "variable": "var(--elements-container-padding-mobile)",
          "raw": "{space.4}"
        },
        "xs": {
          "value": "var(--space-4)",
          "variable": "var(--elements-container-padding-xs)",
          "raw": "{space.4}"
        },
        "sm": {
          "value": "var(--space-6)",
          "variable": "var(--elements-container-padding-sm)",
          "raw": "{space.6}"
        },
        "md": {
          "value": "var(--space-6)",
          "variable": "var(--elements-container-padding-md)",
          "raw": "{space.6}"
        }
      }
    },
    "backdrop": {
      "filter": {
        "value": "saturate(200%) blur(20px)",
        "variable": "var(--elements-backdrop-filter)",
        "raw": "saturate(200%) blur(20px)"
      },
      "background": {
        "value": {
          "initial": "#fffc",
          "dark": "#0c0d0ccc"
        },
        "variable": "var(--elements-backdrop-background)",
        "raw": {
          "initial": "#fffc",
          "dark": "#0c0d0ccc"
        }
      }
    },
    "border": {
      "primary": {
        "static": {
          "value": {
            "initial": "var(--color-gray-100)",
            "dark": "var(--color-gray-900)"
          },
          "variable": "var(--elements-border-primary-static)",
          "raw": {
            "initial": "{color.gray.100}",
            "dark": "{color.gray.900}"
          }
        },
        "hover": {
          "value": {
            "initial": "var(--color-gray-200)",
            "dark": "var(--color-gray-800)"
          },
          "variable": "var(--elements-border-primary-hover)",
          "raw": {
            "initial": "{color.gray.200}",
            "dark": "{color.gray.800}"
          }
        }
      },
      "secondary": {
        "static": {
          "value": {
            "initial": "var(--color-gray-200)",
            "dark": "var(--color-gray-800)"
          },
          "variable": "var(--elements-border-secondary-static)",
          "raw": {
            "initial": "{color.gray.200}",
            "dark": "{color.gray.800}"
          }
        },
        "hover": {
          "value": {
            "initial": "",
            "dark": ""
          },
          "variable": "var(--elements-border-secondary-hover)",
          "raw": {
            "initial": "",
            "dark": ""
          }
        }
      }
    },
    "surface": {
      "background": {
        "base": {
          "value": {
            "initial": "var(--color-gray-100)",
            "dark": "var(--color-gray-900)"
          },
          "variable": "var(--elements-surface-background-base)",
          "raw": {
            "initial": "{color.gray.100}",
            "dark": "{color.gray.900}"
          }
        }
      },
      "primary": {
        "backgroundColor": {
          "value": {
            "initial": "var(--color-gray-100)",
            "dark": "var(--color-gray-900)"
          },
          "variable": "var(--elements-surface-primary-backgroundColor)",
          "raw": {
            "initial": "{color.gray.100}",
            "dark": "{color.gray.900}"
          }
        }
      },
      "secondary": {
        "backgroundColor": {
          "value": {
            "initial": "var(--color-gray-200)",
            "dark": "var(--color-gray-800)"
          },
          "variable": "var(--elements-surface-secondary-backgroundColor)",
          "raw": {
            "initial": "{color.gray.200}",
            "dark": "{color.gray.800}"
          }
        }
      }
    },
    "state": {
      "primary": {
        "color": {
          "primary": {
            "value": {
              "initial": "var(--color-primary-600)",
              "dark": "var(--color-primary-400)"
            },
            "variable": "var(--elements-state-primary-color-primary)",
            "raw": {
              "initial": "{color.primary.600}",
              "dark": "{color.primary.400}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-primary-700)",
              "dark": "var(--color-primary-200)"
            },
            "variable": "var(--elements-state-primary-color-secondary)",
            "raw": {
              "initial": "{color.primary.700}",
              "dark": "{color.primary.200}"
            }
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "var(--color-primary-50)",
              "dark": "var(--color-primary-900)"
            },
            "variable": "var(--elements-state-primary-backgroundColor-primary)",
            "raw": {
              "initial": "{color.primary.50}",
              "dark": "{color.primary.900}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-primary-100)",
              "dark": "var(--color-primary-800)"
            },
            "variable": "var(--elements-state-primary-backgroundColor-secondary)",
            "raw": {
              "initial": "{color.primary.100}",
              "dark": "{color.primary.800}"
            }
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "var(--color-primary-100)",
              "dark": "var(--color-primary-800)"
            },
            "variable": "var(--elements-state-primary-borderColor-primary)",
            "raw": {
              "initial": "{color.primary.100}",
              "dark": "{color.primary.800}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-primary-200)",
              "dark": "var(--color-primary-700)"
            },
            "variable": "var(--elements-state-primary-borderColor-secondary)",
            "raw": {
              "initial": "{color.primary.200}",
              "dark": "{color.primary.700}"
            }
          }
        }
      },
      "info": {
        "color": {
          "primary": {
            "value": {
              "initial": "var(--color-blue-500)",
              "dark": "var(--color-blue-400)"
            },
            "variable": "var(--elements-state-info-color-primary)",
            "raw": {
              "initial": "{color.blue.500}",
              "dark": "{color.blue.400}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-blue-600)",
              "dark": "var(--color-blue-200)"
            },
            "variable": "var(--elements-state-info-color-secondary)",
            "raw": {
              "initial": "{color.blue.600}",
              "dark": "{color.blue.200}"
            }
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "var(--color-blue-50)",
              "dark": "var(--color-blue-900)"
            },
            "variable": "var(--elements-state-info-backgroundColor-primary)",
            "raw": {
              "initial": "{color.blue.50}",
              "dark": "{color.blue.900}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-blue-100)",
              "dark": "var(--color-blue-800)"
            },
            "variable": "var(--elements-state-info-backgroundColor-secondary)",
            "raw": {
              "initial": "{color.blue.100}",
              "dark": "{color.blue.800}"
            }
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "var(--color-blue-100)",
              "dark": "var(--color-blue-800)"
            },
            "variable": "var(--elements-state-info-borderColor-primary)",
            "raw": {
              "initial": "{color.blue.100}",
              "dark": "{color.blue.800}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-blue-200)",
              "dark": "var(--color-blue-700)"
            },
            "variable": "var(--elements-state-info-borderColor-secondary)",
            "raw": {
              "initial": "{color.blue.200}",
              "dark": "{color.blue.700}"
            }
          }
        }
      },
      "success": {
        "color": {
          "primary": {
            "value": {
              "initial": "var(--color-green-500)",
              "dark": "var(--color-green-400)"
            },
            "variable": "var(--elements-state-success-color-primary)",
            "raw": {
              "initial": "{color.green.500}",
              "dark": "{color.green.400}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-green-600)",
              "dark": "var(--color-green-200)"
            },
            "variable": "var(--elements-state-success-color-secondary)",
            "raw": {
              "initial": "{color.green.600}",
              "dark": "{color.green.200}"
            }
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "var(--color-green-50)",
              "dark": "var(--color-green-900)"
            },
            "variable": "var(--elements-state-success-backgroundColor-primary)",
            "raw": {
              "initial": "{color.green.50}",
              "dark": "{color.green.900}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-green-100)",
              "dark": "var(--color-green-800)"
            },
            "variable": "var(--elements-state-success-backgroundColor-secondary)",
            "raw": {
              "initial": "{color.green.100}",
              "dark": "{color.green.800}"
            }
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "var(--color-green-100)",
              "dark": "var(--color-green-800)"
            },
            "variable": "var(--elements-state-success-borderColor-primary)",
            "raw": {
              "initial": "{color.green.100}",
              "dark": "{color.green.800}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-green-200)",
              "dark": "var(--color-green-700)"
            },
            "variable": "var(--elements-state-success-borderColor-secondary)",
            "raw": {
              "initial": "{color.green.200}",
              "dark": "{color.green.700}"
            }
          }
        }
      },
      "warning": {
        "color": {
          "primary": {
            "value": {
              "initial": "var(--color-yellow-600)",
              "dark": "var(--color-yellow-400)"
            },
            "variable": "var(--elements-state-warning-color-primary)",
            "raw": {
              "initial": "{color.yellow.600}",
              "dark": "{color.yellow.400}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-yellow-700)",
              "dark": "var(--color-yellow-200)"
            },
            "variable": "var(--elements-state-warning-color-secondary)",
            "raw": {
              "initial": "{color.yellow.700}",
              "dark": "{color.yellow.200}"
            }
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "var(--color-yellow-50)",
              "dark": "var(--color-yellow-900)"
            },
            "variable": "var(--elements-state-warning-backgroundColor-primary)",
            "raw": {
              "initial": "{color.yellow.50}",
              "dark": "{color.yellow.900}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-yellow-100)",
              "dark": "var(--color-yellow-800)"
            },
            "variable": "var(--elements-state-warning-backgroundColor-secondary)",
            "raw": {
              "initial": "{color.yellow.100}",
              "dark": "{color.yellow.800}"
            }
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "var(--color-yellow-100)",
              "dark": "var(--color-yellow-800)"
            },
            "variable": "var(--elements-state-warning-borderColor-primary)",
            "raw": {
              "initial": "{color.yellow.100}",
              "dark": "{color.yellow.800}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-yellow-200)",
              "dark": "var(--color-yellow-700)"
            },
            "variable": "var(--elements-state-warning-borderColor-secondary)",
            "raw": {
              "initial": "{color.yellow.200}",
              "dark": "{color.yellow.700}"
            }
          }
        }
      },
      "danger": {
        "color": {
          "primary": {
            "value": {
              "initial": "var(--color-red-500)",
              "dark": "var(--color-red-300)"
            },
            "variable": "var(--elements-state-danger-color-primary)",
            "raw": {
              "initial": "{color.red.500}",
              "dark": "{color.red.300}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-red-600)",
              "dark": "var(--color-red-200)"
            },
            "variable": "var(--elements-state-danger-color-secondary)",
            "raw": {
              "initial": "{color.red.600}",
              "dark": "{color.red.200}"
            }
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "var(--color-red-50)",
              "dark": "var(--color-red-900)"
            },
            "variable": "var(--elements-state-danger-backgroundColor-primary)",
            "raw": {
              "initial": "{color.red.50}",
              "dark": "{color.red.900}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-red-100)",
              "dark": "var(--color-red-800)"
            },
            "variable": "var(--elements-state-danger-backgroundColor-secondary)",
            "raw": {
              "initial": "{color.red.100}",
              "dark": "{color.red.800}"
            }
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "var(--color-red-100)",
              "dark": "var(--color-red-800)"
            },
            "variable": "var(--elements-state-danger-borderColor-primary)",
            "raw": {
              "initial": "{color.red.100}",
              "dark": "{color.red.800}"
            }
          },
          "secondary": {
            "value": {
              "initial": "var(--color-red-200)",
              "dark": "var(--color-red-700)"
            },
            "variable": "var(--elements-state-danger-borderColor-secondary)",
            "raw": {
              "initial": "{color.red.200}",
              "dark": "{color.red.700}"
            }
          }
        }
      }
    }
  },
  "typography": {
    "body": {
      "color": {
        "value": {
          "initial": "var(--color-black)",
          "dark": "var(--color-white)"
        },
        "variable": "var(--typography-body-color)",
        "raw": {
          "initial": "{color.black}",
          "dark": "{color.white}"
        }
      },
      "backgroundColor": {
        "value": {
          "initial": "var(--color-white)",
          "dark": "var(--color-black)"
        },
        "variable": "var(--typography-body-backgroundColor)",
        "raw": {
          "initial": "{color.white}",
          "dark": "{color.black}"
        }
      }
    },
    "verticalMargin": {
      "sm": {
        "value": "16px",
        "variable": "var(--typography-verticalMargin-sm)",
        "raw": "16px"
      },
      "base": {
        "value": "24px",
        "variable": "var(--typography-verticalMargin-base)",
        "raw": "24px"
      }
    },
    "letterSpacing": {
      "tight": {
        "value": "-0.025em",
        "variable": "var(--typography-letterSpacing-tight)",
        "raw": "-0.025em"
      },
      "wide": {
        "value": "0.025em",
        "variable": "var(--typography-letterSpacing-wide)",
        "raw": "0.025em"
      }
    },
    "fontSize": {
      "xs": {
        "value": "12px",
        "variable": "var(--typography-fontSize-xs)",
        "raw": "12px"
      },
      "sm": {
        "value": "14px",
        "variable": "var(--typography-fontSize-sm)",
        "raw": "14px"
      },
      "base": {
        "value": "16px",
        "variable": "var(--typography-fontSize-base)",
        "raw": "16px"
      },
      "lg": {
        "value": "18px",
        "variable": "var(--typography-fontSize-lg)",
        "raw": "18px"
      },
      "xl": {
        "value": "20px",
        "variable": "var(--typography-fontSize-xl)",
        "raw": "20px"
      },
      "2xl": {
        "value": "24px",
        "variable": "var(--typography-fontSize-2xl)",
        "raw": "24px"
      },
      "3xl": {
        "value": "30px",
        "variable": "var(--typography-fontSize-3xl)",
        "raw": "30px"
      },
      "4xl": {
        "value": "36px",
        "variable": "var(--typography-fontSize-4xl)",
        "raw": "36px"
      },
      "5xl": {
        "value": "48px",
        "variable": "var(--typography-fontSize-5xl)",
        "raw": "48px"
      },
      "6xl": {
        "value": "60px",
        "variable": "var(--typography-fontSize-6xl)",
        "raw": "60px"
      },
      "7xl": {
        "value": "72px",
        "variable": "var(--typography-fontSize-7xl)",
        "raw": "72px"
      },
      "8xl": {
        "value": "96px",
        "variable": "var(--typography-fontSize-8xl)",
        "raw": "96px"
      },
      "9xl": {
        "value": "128px",
        "variable": "var(--typography-fontSize-9xl)",
        "raw": "128px"
      }
    },
    "fontWeight": {
      "thin": {
        "value": "100",
        "variable": "var(--typography-fontWeight-thin)",
        "raw": "100"
      },
      "extralight": {
        "value": "200",
        "variable": "var(--typography-fontWeight-extralight)",
        "raw": "200"
      },
      "light": {
        "value": "300",
        "variable": "var(--typography-fontWeight-light)",
        "raw": "300"
      },
      "normal": {
        "value": "400",
        "variable": "var(--typography-fontWeight-normal)",
        "raw": "400"
      },
      "medium": {
        "value": "500",
        "variable": "var(--typography-fontWeight-medium)",
        "raw": "500"
      },
      "semibold": {
        "value": "600",
        "variable": "var(--typography-fontWeight-semibold)",
        "raw": "600"
      },
      "bold": {
        "value": "700",
        "variable": "var(--typography-fontWeight-bold)",
        "raw": "700"
      },
      "extrabold": {
        "value": "800",
        "variable": "var(--typography-fontWeight-extrabold)",
        "raw": "800"
      },
      "black": {
        "value": "900",
        "variable": "var(--typography-fontWeight-black)",
        "raw": "900"
      }
    },
    "lead": {
      "1": {
        "value": ".025rem",
        "variable": "var(--typography-lead-1)",
        "raw": ".025rem"
      },
      "2": {
        "value": ".5rem",
        "variable": "var(--typography-lead-2)",
        "raw": ".5rem"
      },
      "3": {
        "value": ".75rem",
        "variable": "var(--typography-lead-3)",
        "raw": ".75rem"
      },
      "4": {
        "value": "1rem",
        "variable": "var(--typography-lead-4)",
        "raw": "1rem"
      },
      "5": {
        "value": "1.25rem",
        "variable": "var(--typography-lead-5)",
        "raw": "1.25rem"
      },
      "6": {
        "value": "1.5rem",
        "variable": "var(--typography-lead-6)",
        "raw": "1.5rem"
      },
      "7": {
        "value": "1.75rem",
        "variable": "var(--typography-lead-7)",
        "raw": "1.75rem"
      },
      "8": {
        "value": "2rem",
        "variable": "var(--typography-lead-8)",
        "raw": "2rem"
      },
      "9": {
        "value": "2.25rem",
        "variable": "var(--typography-lead-9)",
        "raw": "2.25rem"
      },
      "10": {
        "value": "2.5rem",
        "variable": "var(--typography-lead-10)",
        "raw": "2.5rem"
      },
      "none": {
        "value": "1",
        "variable": "var(--typography-lead-none)",
        "raw": "1"
      },
      "tight": {
        "value": "1.25",
        "variable": "var(--typography-lead-tight)",
        "raw": "1.25"
      },
      "snug": {
        "value": "1.375",
        "variable": "var(--typography-lead-snug)",
        "raw": "1.375"
      },
      "normal": {
        "value": "1.5",
        "variable": "var(--typography-lead-normal)",
        "raw": "1.5"
      },
      "relaxed": {
        "value": "1.625",
        "variable": "var(--typography-lead-relaxed)",
        "raw": "1.625"
      },
      "loose": {
        "value": "2",
        "variable": "var(--typography-lead-loose)",
        "raw": "2"
      }
    },
    "font": {
      "display": {
        "value": "var(--font-sans)",
        "variable": "var(--typography-font-display)",
        "raw": "{font.sans}"
      },
      "body": {
        "value": "var(--font-sans)",
        "variable": "var(--typography-font-body)",
        "raw": "{font.sans}"
      },
      "code": {
        "value": "var(--font-mono)",
        "variable": "var(--typography-font-code)",
        "raw": "{font.mono}"
      }
    },
    "color": {
      "primary": {
        "50": {
          "value": "var(--color-primary-50)",
          "variable": "var(--typography-color-primary-50)",
          "raw": "{color.primary.50}"
        },
        "100": {
          "value": "var(--color-primary-100)",
          "variable": "var(--typography-color-primary-100)",
          "raw": "{color.primary.100}"
        },
        "200": {
          "value": "var(--color-primary-200)",
          "variable": "var(--typography-color-primary-200)",
          "raw": "{color.primary.200}"
        },
        "300": {
          "value": "var(--color-primary-300)",
          "variable": "var(--typography-color-primary-300)",
          "raw": "{color.primary.300}"
        },
        "400": {
          "value": "var(--color-primary-400)",
          "variable": "var(--typography-color-primary-400)",
          "raw": "{color.primary.400}"
        },
        "500": {
          "value": "var(--color-primary-500)",
          "variable": "var(--typography-color-primary-500)",
          "raw": "{color.primary.500}"
        },
        "600": {
          "value": "var(--color-primary-600)",
          "variable": "var(--typography-color-primary-600)",
          "raw": "{color.primary.600}"
        },
        "700": {
          "value": "var(--color-primary-700)",
          "variable": "var(--typography-color-primary-700)",
          "raw": "{color.primary.700}"
        },
        "800": {
          "value": "var(--color-primary-800)",
          "variable": "var(--typography-color-primary-800)",
          "raw": "{color.primary.800}"
        },
        "900": {
          "value": "var(--color-primary-900)",
          "variable": "var(--typography-color-primary-900)",
          "raw": "{color.primary.900}"
        }
      },
      "secondary": {
        "50": {
          "value": "var(--color-gray-50)",
          "variable": "var(--typography-color-secondary-50)",
          "raw": "{color.gray.50}"
        },
        "100": {
          "value": "var(--color-gray-100)",
          "variable": "var(--typography-color-secondary-100)",
          "raw": "{color.gray.100}"
        },
        "200": {
          "value": "var(--color-gray-200)",
          "variable": "var(--typography-color-secondary-200)",
          "raw": "{color.gray.200}"
        },
        "300": {
          "value": "var(--color-gray-300)",
          "variable": "var(--typography-color-secondary-300)",
          "raw": "{color.gray.300}"
        },
        "400": {
          "value": "var(--color-gray-400)",
          "variable": "var(--typography-color-secondary-400)",
          "raw": "{color.gray.400}"
        },
        "500": {
          "value": "var(--color-gray-500)",
          "variable": "var(--typography-color-secondary-500)",
          "raw": "{color.gray.500}"
        },
        "600": {
          "value": "var(--color-gray-600)",
          "variable": "var(--typography-color-secondary-600)",
          "raw": "{color.gray.600}"
        },
        "700": {
          "value": "var(--color-gray-700)",
          "variable": "var(--typography-color-secondary-700)",
          "raw": "{color.gray.700}"
        },
        "800": {
          "value": "var(--color-gray-800)",
          "variable": "var(--typography-color-secondary-800)",
          "raw": "{color.gray.800}"
        },
        "900": {
          "value": "var(--color-gray-900)",
          "variable": "var(--typography-color-secondary-900)",
          "raw": "{color.gray.900}"
        }
      }
    }
  },
  "prose": {
    "p": {
      "fontSize": {
        "value": "var(--typography-fontSize-base)",
        "variable": "var(--prose-p-fontSize)",
        "raw": "{typography.fontSize.base}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-normal)",
        "variable": "var(--prose-p-lineHeight)",
        "raw": "{typography.lead.normal}"
      },
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-p-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      },
      "br": {
        "margin": {
          "value": "var(--typography-verticalMargin-base) 0 0 0",
          "variable": "var(--prose-p-br-margin)",
          "raw": "{typography.verticalMargin.base} 0 0 0"
        }
      }
    },
    "h1": {
      "margin": {
        "value": "0 0 2rem",
        "variable": "var(--prose-h1-margin)",
        "raw": "0 0 2rem"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-5xl)",
        "variable": "var(--prose-h1-fontSize)",
        "raw": "{typography.fontSize.5xl}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-tight)",
        "variable": "var(--prose-h1-lineHeight)",
        "raw": "{typography.lead.tight}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-bold)",
        "variable": "var(--prose-h1-fontWeight)",
        "raw": "{typography.fontWeight.bold}"
      },
      "letterSpacing": {
        "value": "var(--typography-letterSpacing-tight)",
        "variable": "var(--prose-h1-letterSpacing)",
        "raw": "{typography.letterSpacing.tight}"
      },
      "iconSize": {
        "value": "var(--typography-fontSize-3xl)",
        "variable": "var(--prose-h1-iconSize)",
        "raw": "{typography.fontSize.3xl}"
      }
    },
    "h2": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h2-margin)",
        "raw": "3rem 0 2rem"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-4xl)",
        "variable": "var(--prose-h2-fontSize)",
        "raw": "{typography.fontSize.4xl}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-tight)",
        "variable": "var(--prose-h2-lineHeight)",
        "raw": "{typography.lead.tight}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-h2-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      },
      "letterSpacing": {
        "value": "var(--typography-letterSpacing-tight)",
        "variable": "var(--prose-h2-letterSpacing)",
        "raw": "{typography.letterSpacing.tight}"
      },
      "iconSize": {
        "value": "var(--typography-fontSize-2xl)",
        "variable": "var(--prose-h2-iconSize)",
        "raw": "{typography.fontSize.2xl}"
      }
    },
    "h3": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h3-margin)",
        "raw": "3rem 0 2rem"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-3xl)",
        "variable": "var(--prose-h3-fontSize)",
        "raw": "{typography.fontSize.3xl}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-snug)",
        "variable": "var(--prose-h3-lineHeight)",
        "raw": "{typography.lead.snug}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-h3-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      },
      "letterSpacing": {
        "value": "var(--typography-letterSpacing-tight)",
        "variable": "var(--prose-h3-letterSpacing)",
        "raw": "{typography.letterSpacing.tight}"
      },
      "iconSize": {
        "value": "var(--typography-fontSize-xl)",
        "variable": "var(--prose-h3-iconSize)",
        "raw": "{typography.fontSize.xl}"
      }
    },
    "h4": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h4-margin)",
        "raw": "3rem 0 2rem"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-2xl)",
        "variable": "var(--prose-h4-fontSize)",
        "raw": "{typography.fontSize.2xl}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-snug)",
        "variable": "var(--prose-h4-lineHeight)",
        "raw": "{typography.lead.snug}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-h4-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      },
      "letterSpacing": {
        "value": "var(--typography-letterSpacing-tight)",
        "variable": "var(--prose-h4-letterSpacing)",
        "raw": "{typography.letterSpacing.tight}"
      },
      "iconSize": {
        "value": "var(--typography-fontSize-lg)",
        "variable": "var(--prose-h4-iconSize)",
        "raw": "{typography.fontSize.lg}"
      }
    },
    "h5": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h5-margin)",
        "raw": "3rem 0 2rem"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-xl)",
        "variable": "var(--prose-h5-fontSize)",
        "raw": "{typography.fontSize.xl}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-snug)",
        "variable": "var(--prose-h5-lineHeight)",
        "raw": "{typography.lead.snug}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-h5-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      },
      "iconSize": {
        "value": "var(--typography-fontSize-lg)",
        "variable": "var(--prose-h5-iconSize)",
        "raw": "{typography.fontSize.lg}"
      }
    },
    "h6": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h6-margin)",
        "raw": "3rem 0 2rem"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-lg)",
        "variable": "var(--prose-h6-fontSize)",
        "raw": "{typography.fontSize.lg}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-normal)",
        "variable": "var(--prose-h6-lineHeight)",
        "raw": "{typography.lead.normal}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-h6-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      },
      "iconSize": {
        "value": "var(--typography-fontSize-base)",
        "variable": "var(--prose-h6-iconSize)",
        "raw": "{typography.fontSize.base}"
      }
    },
    "strong": {
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-strong-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      }
    },
    "img": {
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-img-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      }
    },
    "a": {
      "textDecoration": {
        "value": "none",
        "variable": "var(--prose-a-textDecoration)",
        "raw": "none"
      },
      "color": {
        "static": {
          "value": {
            "initial": "inherit",
            "dark": "inherit"
          },
          "variable": "var(--prose-a-color-static)",
          "raw": {
            "initial": "inherit",
            "dark": "inherit"
          }
        },
        "hover": {
          "value": {
            "initial": "var(--typography-color-primary-500)",
            "dark": "var(--typography-color-primary-400)"
          },
          "variable": "var(--prose-a-color-hover)",
          "raw": {
            "initial": "{typography.color.primary.500}",
            "dark": "{typography.color.primary.400}"
          }
        }
      },
      "border": {
        "width": {
          "value": "1px",
          "variable": "var(--prose-a-border-width)",
          "raw": "1px"
        },
        "style": {
          "static": {
            "value": "dashed",
            "variable": "var(--prose-a-border-style-static)",
            "raw": "dashed"
          },
          "hover": {
            "value": "solid",
            "variable": "var(--prose-a-border-style-hover)",
            "raw": "solid"
          }
        },
        "color": {
          "static": {
            "value": {
              "initial": "currentColor",
              "dark": "currentColor"
            },
            "variable": "var(--prose-a-border-color-static)",
            "raw": {
              "initial": "currentColor",
              "dark": "currentColor"
            }
          },
          "hover": {
            "value": {
              "initial": "currentColor",
              "dark": "currentColor"
            },
            "variable": "var(--prose-a-border-color-hover)",
            "raw": {
              "initial": "currentColor",
              "dark": "currentColor"
            }
          }
        },
        "distance": {
          "value": "2px",
          "variable": "var(--prose-a-border-distance)",
          "raw": "2px"
        }
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-medium)",
        "variable": "var(--prose-a-fontWeight)",
        "raw": "{typography.fontWeight.medium}"
      },
      "hasCode": {
        "borderBottom": {
          "value": "none",
          "variable": "var(--prose-a-hasCode-borderBottom)",
          "raw": "none"
        }
      },
      "code": {
        "border": {
          "width": {
            "value": "var(--prose-a-border-width)",
            "variable": "var(--prose-a-code-border-width)",
            "raw": "{prose.a.border.width}"
          },
          "style": {
            "value": "var(--prose-a-border-style-static)",
            "variable": "var(--prose-a-code-border-style)",
            "raw": "{prose.a.border.style.static}"
          },
          "color": {
            "static": {
              "value": {
                "initial": "var(--typography-color-secondary-400)",
                "dark": "var(--typography-color-secondary-600)"
              },
              "variable": "var(--prose-a-code-border-color-static)",
              "raw": {
                "initial": "{typography.color.secondary.400}",
                "dark": "{typography.color.secondary.600}"
              }
            },
            "hover": {
              "value": {
                "initial": "var(--typography-color-primary-500)",
                "dark": "var(--typography-color-primary-600)"
              },
              "variable": "var(--prose-a-code-border-color-hover)",
              "raw": {
                "initial": "{typography.color.primary.500}",
                "dark": "{typography.color.primary.600}"
              }
            }
          }
        },
        "color": {
          "static": {
            "value": {
              "initial": "currentColor",
              "dark": "currentColor"
            },
            "variable": "var(--prose-a-code-color-static)",
            "raw": {
              "initial": "currentColor",
              "dark": "currentColor"
            }
          },
          "hover": {
            "value": {
              "initial": "currentColor",
              "dark": "currentColor"
            },
            "variable": "var(--prose-a-code-color-hover)",
            "raw": {
              "initial": "currentColor",
              "dark": "currentColor"
            }
          }
        },
        "background": {
          "static": {},
          "hover": {
            "value": {
              "initial": "var(--typography-color-primary-50)",
              "dark": "var(--typography-color-primary-900)"
            },
            "variable": "var(--prose-a-code-background-hover)",
            "raw": {
              "initial": "{typography.color.primary.50}",
              "dark": "{typography.color.primary.900}"
            }
          }
        }
      }
    },
    "blockquote": {
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-blockquote-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      },
      "paddingInlineStart": {
        "value": "24px",
        "variable": "var(--prose-blockquote-paddingInlineStart)",
        "raw": "24px"
      },
      "quotes": {
        "value": "'201C' '201D' '2018' '2019'",
        "variable": "var(--prose-blockquote-quotes)",
        "raw": "'201C' '201D' '2018' '2019'"
      },
      "color": {
        "value": {
          "initial": "var(--typography-color-secondary-500)",
          "dark": "var(--typography-color-secondary-400)"
        },
        "variable": "var(--prose-blockquote-color)",
        "raw": {
          "initial": "{typography.color.secondary.500}",
          "dark": "{typography.color.secondary.400}"
        }
      },
      "border": {
        "width": {
          "value": "4px",
          "variable": "var(--prose-blockquote-border-width)",
          "raw": "4px"
        },
        "style": {
          "value": "solid",
          "variable": "var(--prose-blockquote-border-style)",
          "raw": "solid"
        },
        "color": {
          "value": {
            "initial": "var(--typography-color-secondary-200)",
            "dark": "var(--typography-color-secondary-700)"
          },
          "variable": "var(--prose-blockquote-border-color)",
          "raw": {
            "initial": "{typography.color.secondary.200}",
            "dark": "{typography.color.secondary.700}"
          }
        }
      }
    },
    "ul": {
      "listStyleType": {
        "value": "disc",
        "variable": "var(--prose-ul-listStyleType)",
        "raw": "disc"
      },
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-ul-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      },
      "paddingInlineStart": {
        "value": "21px",
        "variable": "var(--prose-ul-paddingInlineStart)",
        "raw": "21px"
      },
      "li": {
        "markerColor": {
          "value": {
            "initial": "currentColor",
            "dark": "currentColor"
          },
          "variable": "var(--prose-ul-li-markerColor)",
          "raw": {
            "initial": "currentColor",
            "dark": "currentColor"
          }
        }
      }
    },
    "ol": {
      "listStyleType": {
        "value": "decimal",
        "variable": "var(--prose-ol-listStyleType)",
        "raw": "decimal"
      },
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-ol-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      },
      "paddingInlineStart": {
        "value": "21px",
        "variable": "var(--prose-ol-paddingInlineStart)",
        "raw": "21px"
      },
      "li": {
        "markerColor": {
          "value": {
            "initial": "currentColor",
            "dark": "currentColor"
          },
          "variable": "var(--prose-ol-li-markerColor)",
          "raw": {
            "initial": "currentColor",
            "dark": "currentColor"
          }
        }
      }
    },
    "li": {
      "margin": {
        "value": "var(--typography-verticalMargin-sm) 0",
        "variable": "var(--prose-li-margin)",
        "raw": "{typography.verticalMargin.sm} 0"
      },
      "listStylePosition": {
        "value": "outside",
        "variable": "var(--prose-li-listStylePosition)",
        "raw": "outside"
      }
    },
    "hr": {
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-hr-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      },
      "style": {
        "value": "solid",
        "variable": "var(--prose-hr-style)",
        "raw": "solid"
      },
      "width": {
        "value": "1px",
        "variable": "var(--prose-hr-width)",
        "raw": "1px"
      },
      "color": {
        "value": {
          "initial": "var(--typography-color-secondary-200)",
          "dark": "var(--typography-color-secondary-800)"
        },
        "variable": "var(--prose-hr-color)",
        "raw": {
          "initial": "{typography.color.secondary.200}",
          "dark": "{typography.color.secondary.800}"
        }
      }
    },
    "table": {
      "margin": {
        "value": "var(--typography-verticalMargin-base) 0",
        "variable": "var(--prose-table-margin)",
        "raw": "{typography.verticalMargin.base} 0"
      },
      "textAlign": {
        "value": "start",
        "variable": "var(--prose-table-textAlign)",
        "raw": "start"
      },
      "fontSize": {
        "value": "var(--typography-fontSize-sm)",
        "variable": "var(--prose-table-fontSize)",
        "raw": "{typography.fontSize.sm}"
      },
      "lineHeight": {
        "value": "var(--typography-lead-6)",
        "variable": "var(--prose-table-lineHeight)",
        "raw": "{typography.lead.6}"
      }
    },
    "thead": {
      "border": {
        "width": {
          "value": "0px",
          "variable": "var(--prose-thead-border-width)",
          "raw": "0px"
        },
        "style": {
          "value": "solid",
          "variable": "var(--prose-thead-border-style)",
          "raw": "solid"
        },
        "color": {
          "value": {
            "initial": "var(--typography-color-secondary-300)",
            "dark": "var(--typography-color-secondary-600)"
          },
          "variable": "var(--prose-thead-border-color)",
          "raw": {
            "initial": "{typography.color.secondary.300}",
            "dark": "{typography.color.secondary.600}"
          }
        }
      },
      "borderBottom": {
        "width": {
          "value": "1px",
          "variable": "var(--prose-thead-borderBottom-width)",
          "raw": "1px"
        },
        "style": {
          "value": "solid",
          "variable": "var(--prose-thead-borderBottom-style)",
          "raw": "solid"
        },
        "color": {
          "value": {
            "initial": "var(--typography-color-secondary-200)",
            "dark": "var(--typography-color-secondary-800)"
          },
          "variable": "var(--prose-thead-borderBottom-color)",
          "raw": {
            "initial": "{typography.color.secondary.200}",
            "dark": "{typography.color.secondary.800}"
          }
        }
      }
    },
    "th": {
      "color": {
        "value": {
          "initial": "var(--typography-color-secondary-600)",
          "dark": "var(--typography-color-secondary-400)"
        },
        "variable": "var(--prose-th-color)",
        "raw": {
          "initial": "{typography.color.secondary.600}",
          "dark": "{typography.color.secondary.400}"
        }
      },
      "padding": {
        "value": "0 var(--typography-verticalMargin-sm) var(--typography-verticalMargin-sm) var(--typography-verticalMargin-sm)",
        "variable": "var(--prose-th-padding)",
        "raw": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
      },
      "fontWeight": {
        "value": "var(--typography-fontWeight-semibold)",
        "variable": "var(--prose-th-fontWeight)",
        "raw": "{typography.fontWeight.semibold}"
      },
      "textAlign": {
        "value": "inherit",
        "variable": "var(--prose-th-textAlign)",
        "raw": "inherit"
      }
    },
    "tbody": {
      "tr": {
        "borderBottom": {
          "width": {
            "value": "1px",
            "variable": "var(--prose-tbody-tr-borderBottom-width)",
            "raw": "1px"
          },
          "style": {
            "value": "dashed",
            "variable": "var(--prose-tbody-tr-borderBottom-style)",
            "raw": "dashed"
          },
          "color": {
            "value": {
              "initial": "var(--typography-color-secondary-200)",
              "dark": "var(--typography-color-secondary-800)"
            },
            "variable": "var(--prose-tbody-tr-borderBottom-color)",
            "raw": {
              "initial": "{typography.color.secondary.200}",
              "dark": "{typography.color.secondary.800}"
            }
          }
        }
      },
      "td": {
        "padding": {
          "value": "var(--typography-verticalMargin-sm)",
          "variable": "var(--prose-tbody-td-padding)",
          "raw": "{typography.verticalMargin.sm}"
        }
      },
      "code": {
        "inline": {
          "fontSize": {
            "value": "var(--typography-fontSize-sm)",
            "variable": "var(--prose-tbody-code-inline-fontSize)",
            "raw": "{typography.fontSize.sm}"
          }
        }
      }
    },
    "code": {
      "block": {
        "fontSize": {
          "value": "var(--typography-fontSize-sm)",
          "variable": "var(--prose-code-block-fontSize)",
          "raw": "{typography.fontSize.sm}"
        },
        "margin": {
          "value": "var(--typography-verticalMargin-base) 0",
          "variable": "var(--prose-code-block-margin)",
          "raw": "{typography.verticalMargin.base} 0"
        },
        "border": {
          "width": {
            "value": "1px",
            "variable": "var(--prose-code-block-border-width)",
            "raw": "1px"
          },
          "style": {
            "value": "solid",
            "variable": "var(--prose-code-block-border-style)",
            "raw": "solid"
          },
          "color": {
            "value": {
              "initial": "var(--typography-color-secondary-200)",
              "dark": "var(--typography-color-secondary-800)"
            },
            "variable": "var(--prose-code-block-border-color)",
            "raw": {
              "initial": "{typography.color.secondary.200}",
              "dark": "{typography.color.secondary.800}"
            }
          }
        },
        "color": {
          "value": {
            "initial": "var(--typography-color-secondary-700)",
            "dark": "var(--typography-color-secondary-200)"
          },
          "variable": "var(--prose-code-block-color)",
          "raw": {
            "initial": "{typography.color.secondary.700}",
            "dark": "{typography.color.secondary.200}"
          }
        },
        "backgroundColor": {
          "value": {
            "initial": "var(--typography-color-secondary-100)",
            "dark": "var(--typography-color-secondary-900)"
          },
          "variable": "var(--prose-code-block-backgroundColor)",
          "raw": {
            "initial": "{typography.color.secondary.100}",
            "dark": "{typography.color.secondary.900}"
          }
        },
        "backdropFilter": {
          "value": {
            "initial": "contrast(1)",
            "dark": "contrast(1)"
          },
          "variable": "var(--prose-code-block-backdropFilter)",
          "raw": {
            "initial": "contrast(1)",
            "dark": "contrast(1)"
          }
        },
        "pre": {
          "padding": {
            "value": "var(--typography-verticalMargin-sm)",
            "variable": "var(--prose-code-block-pre-padding)",
            "raw": "{typography.verticalMargin.sm}"
          }
        }
      },
      "inline": {
        "borderRadius": {
          "value": "var(--radii-xs)",
          "variable": "var(--prose-code-inline-borderRadius)",
          "raw": "{radii.xs}"
        },
        "padding": {
          "value": "0.2rem 0.375rem 0.2rem 0.375rem",
          "variable": "var(--prose-code-inline-padding)",
          "raw": "0.2rem 0.375rem 0.2rem 0.375rem"
        },
        "fontSize": {
          "value": "var(--typography-fontSize-sm)",
          "variable": "var(--prose-code-inline-fontSize)",
          "raw": "{typography.fontSize.sm}"
        },
        "fontWeight": {
          "value": "var(--typography-fontWeight-normal)",
          "variable": "var(--prose-code-inline-fontWeight)",
          "raw": "{typography.fontWeight.normal}"
        },
        "color": {
          "value": {
            "initial": "var(--typography-color-secondary-700)",
            "dark": "var(--typography-color-secondary-200)"
          },
          "variable": "var(--prose-code-inline-color)",
          "raw": {
            "initial": "{typography.color.secondary.700}",
            "dark": "{typography.color.secondary.200}"
          }
        },
        "backgroundColor": {
          "value": {
            "initial": "var(--typography-color-secondary-100)",
            "dark": "var(--typography-color-secondary-800)"
          },
          "variable": "var(--prose-code-inline-backgroundColor)",
          "raw": {
            "initial": "{typography.color.secondary.100}",
            "dark": "{typography.color.secondary.800}"
          }
        }
      }
    }
  },
  "docus": {
    "header": {
      "height": {
        "value": "64px",
        "variable": "var(--docus-header-height)",
        "raw": "64px"
      }
    },
    "footer": {
      "height": {
        "value": {
          "initial": "145px",
          "sm": "100px"
        },
        "variable": "var(--docus-footer-height)",
        "raw": {
          "initial": "145px",
          "sm": "100px"
        }
      },
      "padding": {
        "value": "var(--space-4) 0",
        "variable": "var(--docus-footer-padding)",
        "raw": "{space.4} 0"
      }
    },
    "readableLine": {
      "value": "78ch",
      "variable": "var(--docus-readableLine)",
      "raw": "78ch"
    },
    "loadingBar": {
      "height": {
        "value": "3px",
        "variable": "var(--docus-loadingBar-height)",
        "raw": "3px"
      },
      "gradientColorStop1": {
        "value": "#00dc82",
        "variable": "var(--docus-loadingBar-gradientColorStop1)",
        "raw": "#00dc82"
      },
      "gradientColorStop2": {
        "value": "#34cdfe",
        "variable": "var(--docus-loadingBar-gradientColorStop2)",
        "raw": "#34cdfe"
      },
      "gradientColorStop3": {
        "value": "#0047e1",
        "variable": "var(--docus-loadingBar-gradientColorStop3)",
        "raw": "#0047e1"
      }
    }
  }
};
const pinceau_nuxt_plugin_server_KEuz79zT4K = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(plugin, { colorSchemeMode: "class", theme, utils });
  nuxtApp.hook("app:rendered", async (app) => {
    app.ssrContext.event.pinceauContent = app.ssrContext.event.pinceauContent || {};
    const content = app.ssrContext.nuxt.vueApp.config.globalProperties.$pinceauSsr.get();
    app.ssrContext.event.pinceauContent.runtime = content;
  });
});
const schema = {
  "properties": {
    "id": "#tokensConfig",
    "properties": {
      "media": {
        "title": "Your website media queries.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType color",
          "@studioIcon material-symbols:screenshot-monitor-outline-rounded"
        ],
        "id": "#tokensConfig/media",
        "properties": {
          "xs": {
            "id": "#tokensConfig/media/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/xs/value",
                "default": "(min-width: 475px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 475px)"
            }
          },
          "sm": {
            "id": "#tokensConfig/media/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/sm/value",
                "default": "(min-width: 640px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 640px)"
            }
          },
          "md": {
            "id": "#tokensConfig/media/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/md/value",
                "default": "(min-width: 768px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 768px)"
            }
          },
          "lg": {
            "id": "#tokensConfig/media/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/lg/value",
                "default": "(min-width: 1024px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 1024px)"
            }
          },
          "xl": {
            "id": "#tokensConfig/media/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/xl/value",
                "default": "(min-width: 1280px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 1280px)"
            }
          },
          "2xl": {
            "id": "#tokensConfig/media/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/2xl/value",
                "default": "(min-width: 1536px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 1536px)"
            }
          },
          "rm": {
            "id": "#tokensConfig/media/rm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/rm/value",
                "default": "(prefers-reduced-motion: reduce)"
              }
            },
            "type": "object",
            "default": {
              "value": "(prefers-reduced-motion: reduce)"
            }
          },
          "landscape": {
            "id": "#tokensConfig/media/landscape",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/landscape/value",
                "default": "only screen and (orientation: landscape)"
              }
            },
            "type": "object",
            "default": {
              "value": "only screen and (orientation: landscape)"
            }
          },
          "portrait": {
            "id": "#tokensConfig/media/portrait",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/portrait/value",
                "default": "only screen and (orientation: portrait)"
              }
            },
            "type": "object",
            "default": {
              "value": "only screen and (orientation: portrait)"
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "value": "(min-width: 475px)"
          },
          "sm": {
            "value": "(min-width: 640px)"
          },
          "md": {
            "value": "(min-width: 768px)"
          },
          "lg": {
            "value": "(min-width: 1024px)"
          },
          "xl": {
            "value": "(min-width: 1280px)"
          },
          "2xl": {
            "value": "(min-width: 1536px)"
          },
          "rm": {
            "value": "(prefers-reduced-motion: reduce)"
          },
          "landscape": {
            "value": "only screen and (orientation: landscape)"
          },
          "portrait": {
            "value": "only screen and (orientation: portrait)"
          }
        }
      },
      "color": {
        "title": "Your website color palette.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType color",
          "@studioIcon ph:palette"
        ],
        "id": "#tokensConfig/color",
        "properties": {
          "white": {
            "id": "#tokensConfig/color/white",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/color/white/value",
                "default": "#ffffff"
              }
            },
            "type": "object",
            "default": {
              "value": "#ffffff"
            }
          },
          "black": {
            "id": "#tokensConfig/color/black",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/color/black/value",
                "default": "#0B0A0A"
              }
            },
            "type": "object",
            "default": {
              "value": "#0B0A0A"
            }
          },
          "gray": {
            "id": "#tokensConfig/color/gray",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/gray/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/50/value",
                    "default": "#FBFBFB"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FBFBFB"
                }
              },
              "100": {
                "id": "#tokensConfig/color/gray/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/100/value",
                    "default": "#F6F5F4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#F6F5F4"
                }
              },
              "200": {
                "id": "#tokensConfig/color/gray/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/200/value",
                    "default": "#ECEBE8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ECEBE8"
                }
              },
              "300": {
                "id": "#tokensConfig/color/gray/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/300/value",
                    "default": "#DBD9D3"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#DBD9D3"
                }
              },
              "400": {
                "id": "#tokensConfig/color/gray/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/400/value",
                    "default": "#ADA9A4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ADA9A4"
                }
              },
              "500": {
                "id": "#tokensConfig/color/gray/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/500/value",
                    "default": "#97948F"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#97948F"
                }
              },
              "600": {
                "id": "#tokensConfig/color/gray/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/600/value",
                    "default": "#67635D"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#67635D"
                }
              },
              "700": {
                "id": "#tokensConfig/color/gray/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/700/value",
                    "default": "#36332E"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#36332E"
                }
              },
              "800": {
                "id": "#tokensConfig/color/gray/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/800/value",
                    "default": "#201E1B"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#201E1B"
                }
              },
              "900": {
                "id": "#tokensConfig/color/gray/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/900/value",
                    "default": "#121110"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#121110"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#FBFBFB"
              },
              "100": {
                "value": "#F6F5F4"
              },
              "200": {
                "value": "#ECEBE8"
              },
              "300": {
                "value": "#DBD9D3"
              },
              "400": {
                "value": "#ADA9A4"
              },
              "500": {
                "value": "#97948F"
              },
              "600": {
                "value": "#67635D"
              },
              "700": {
                "value": "#36332E"
              },
              "800": {
                "value": "#201E1B"
              },
              "900": {
                "value": "#121110"
              }
            }
          },
          "green": {
            "id": "#tokensConfig/color/green",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/green/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/50/value",
                    "default": "#ECFFF7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ECFFF7"
                }
              },
              "100": {
                "id": "#tokensConfig/color/green/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/100/value",
                    "default": "#DEFFF1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#DEFFF1"
                }
              },
              "200": {
                "id": "#tokensConfig/color/green/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/200/value",
                    "default": "#C3FFE6"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#C3FFE6"
                }
              },
              "300": {
                "id": "#tokensConfig/color/green/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/300/value",
                    "default": "#86FBCB"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#86FBCB"
                }
              },
              "400": {
                "id": "#tokensConfig/color/green/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/400/value",
                    "default": "#3CEEA5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#3CEEA5"
                }
              },
              "500": {
                "id": "#tokensConfig/color/green/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/500/value",
                    "default": "#0DD885"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0DD885"
                }
              },
              "600": {
                "id": "#tokensConfig/color/green/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/600/value",
                    "default": "#00B467"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00B467"
                }
              },
              "700": {
                "id": "#tokensConfig/color/green/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/700/value",
                    "default": "#006037"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#006037"
                }
              },
              "800": {
                "id": "#tokensConfig/color/green/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/800/value",
                    "default": "#002817"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002817"
                }
              },
              "900": {
                "id": "#tokensConfig/color/green/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/900/value",
                    "default": "#00190F"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00190F"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ECFFF7"
              },
              "100": {
                "value": "#DEFFF1"
              },
              "200": {
                "value": "#C3FFE6"
              },
              "300": {
                "value": "#86FBCB"
              },
              "400": {
                "value": "#3CEEA5"
              },
              "500": {
                "value": "#0DD885"
              },
              "600": {
                "value": "#00B467"
              },
              "700": {
                "value": "#006037"
              },
              "800": {
                "value": "#002817"
              },
              "900": {
                "value": "#00190F"
              }
            }
          },
          "yellow": {
            "id": "#tokensConfig/color/yellow",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/yellow/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/50/value",
                    "default": "#FFFDEA"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFFDEA"
                }
              },
              "100": {
                "id": "#tokensConfig/color/yellow/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/100/value",
                    "default": "#FFF8CC"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFF8CC"
                }
              },
              "200": {
                "id": "#tokensConfig/color/yellow/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/200/value",
                    "default": "#FEF5A4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FEF5A4"
                }
              },
              "300": {
                "id": "#tokensConfig/color/yellow/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/300/value",
                    "default": "#FFEF8A"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFEF8A"
                }
              },
              "400": {
                "id": "#tokensConfig/color/yellow/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/400/value",
                    "default": "#FFE53C"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFE53C"
                }
              },
              "500": {
                "id": "#tokensConfig/color/yellow/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/500/value",
                    "default": "#EECF00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#EECF00"
                }
              },
              "600": {
                "id": "#tokensConfig/color/yellow/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/600/value",
                    "default": "#C2A905"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#C2A905"
                }
              },
              "700": {
                "id": "#tokensConfig/color/yellow/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/700/value",
                    "default": "#6B5D02"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#6B5D02"
                }
              },
              "800": {
                "id": "#tokensConfig/color/yellow/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/800/value",
                    "default": "#282300"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#282300"
                }
              },
              "900": {
                "id": "#tokensConfig/color/yellow/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/900/value",
                    "default": "#1A1700"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1A1700"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#FFFDEA"
              },
              "100": {
                "value": "#FFF8CC"
              },
              "200": {
                "value": "#FEF5A4"
              },
              "300": {
                "value": "#FFEF8A"
              },
              "400": {
                "value": "#FFE53C"
              },
              "500": {
                "value": "#EECF00"
              },
              "600": {
                "value": "#C2A905"
              },
              "700": {
                "value": "#6B5D02"
              },
              "800": {
                "value": "#282300"
              },
              "900": {
                "value": "#1A1700"
              }
            }
          },
          "orange": {
            "id": "#tokensConfig/color/orange",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/orange/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/50/value",
                    "default": "#ffe9d9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffe9d9"
                }
              },
              "100": {
                "id": "#tokensConfig/color/orange/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/100/value",
                    "default": "#ffd3b3"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffd3b3"
                }
              },
              "200": {
                "id": "#tokensConfig/color/orange/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/200/value",
                    "default": "#ffbd8d"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffbd8d"
                }
              },
              "300": {
                "id": "#tokensConfig/color/orange/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/300/value",
                    "default": "#ffa666"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffa666"
                }
              },
              "400": {
                "id": "#tokensConfig/color/orange/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/400/value",
                    "default": "#ff9040"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff9040"
                }
              },
              "500": {
                "id": "#tokensConfig/color/orange/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/500/value",
                    "default": "#ff7a1a"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff7a1a"
                }
              },
              "600": {
                "id": "#tokensConfig/color/orange/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/600/value",
                    "default": "#e15e00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e15e00"
                }
              },
              "700": {
                "id": "#tokensConfig/color/orange/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/700/value",
                    "default": "#a94700"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a94700"
                }
              },
              "800": {
                "id": "#tokensConfig/color/orange/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/800/value",
                    "default": "#702f00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#702f00"
                }
              },
              "900": {
                "id": "#tokensConfig/color/orange/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/900/value",
                    "default": "#381800"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#381800"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffe9d9"
              },
              "100": {
                "value": "#ffd3b3"
              },
              "200": {
                "value": "#ffbd8d"
              },
              "300": {
                "value": "#ffa666"
              },
              "400": {
                "value": "#ff9040"
              },
              "500": {
                "value": "#ff7a1a"
              },
              "600": {
                "value": "#e15e00"
              },
              "700": {
                "value": "#a94700"
              },
              "800": {
                "value": "#702f00"
              },
              "900": {
                "value": "#381800"
              }
            }
          },
          "red": {
            "id": "#tokensConfig/color/red",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/red/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/50/value",
                    "default": "#FFF9F8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFF9F8"
                }
              },
              "100": {
                "id": "#tokensConfig/color/red/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/100/value",
                    "default": "#FFF3F0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFF3F0"
                }
              },
              "200": {
                "id": "#tokensConfig/color/red/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/200/value",
                    "default": "#FFDED7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFDED7"
                }
              },
              "300": {
                "id": "#tokensConfig/color/red/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/300/value",
                    "default": "#FFA692"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FFA692"
                }
              },
              "400": {
                "id": "#tokensConfig/color/red/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/400/value",
                    "default": "#FF7353"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FF7353"
                }
              },
              "500": {
                "id": "#tokensConfig/color/red/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/500/value",
                    "default": "#FF3B10"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#FF3B10"
                }
              },
              "600": {
                "id": "#tokensConfig/color/red/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/600/value",
                    "default": "#BB2402"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#BB2402"
                }
              },
              "700": {
                "id": "#tokensConfig/color/red/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/700/value",
                    "default": "#701704"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#701704"
                }
              },
              "800": {
                "id": "#tokensConfig/color/red/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/800/value",
                    "default": "#340A01"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#340A01"
                }
              },
              "900": {
                "id": "#tokensConfig/color/red/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/900/value",
                    "default": "#1C0301"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1C0301"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#FFF9F8"
              },
              "100": {
                "value": "#FFF3F0"
              },
              "200": {
                "value": "#FFDED7"
              },
              "300": {
                "value": "#FFA692"
              },
              "400": {
                "value": "#FF7353"
              },
              "500": {
                "value": "#FF3B10"
              },
              "600": {
                "value": "#BB2402"
              },
              "700": {
                "value": "#701704"
              },
              "800": {
                "value": "#340A01"
              },
              "900": {
                "value": "#1C0301"
              }
            }
          },
          "pear": {
            "id": "#tokensConfig/color/pear",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/pear/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/50/value",
                    "default": "#f7f8dc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f7f8dc"
                }
              },
              "100": {
                "id": "#tokensConfig/color/pear/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/100/value",
                    "default": "#eff0ba"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#eff0ba"
                }
              },
              "200": {
                "id": "#tokensConfig/color/pear/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/200/value",
                    "default": "#e8e997"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e8e997"
                }
              },
              "300": {
                "id": "#tokensConfig/color/pear/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/300/value",
                    "default": "#e0e274"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e0e274"
                }
              },
              "400": {
                "id": "#tokensConfig/color/pear/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/400/value",
                    "default": "#d8da52"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d8da52"
                }
              },
              "500": {
                "id": "#tokensConfig/color/pear/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/500/value",
                    "default": "#d0d32f"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d0d32f"
                }
              },
              "600": {
                "id": "#tokensConfig/color/pear/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/600/value",
                    "default": "#a8aa24"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a8aa24"
                }
              },
              "700": {
                "id": "#tokensConfig/color/pear/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/700/value",
                    "default": "#7e801b"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#7e801b"
                }
              },
              "800": {
                "id": "#tokensConfig/color/pear/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/800/value",
                    "default": "#545512"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#545512"
                }
              },
              "900": {
                "id": "#tokensConfig/color/pear/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/900/value",
                    "default": "#2a2b09"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#2a2b09"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#f7f8dc"
              },
              "100": {
                "value": "#eff0ba"
              },
              "200": {
                "value": "#e8e997"
              },
              "300": {
                "value": "#e0e274"
              },
              "400": {
                "value": "#d8da52"
              },
              "500": {
                "value": "#d0d32f"
              },
              "600": {
                "value": "#a8aa24"
              },
              "700": {
                "value": "#7e801b"
              },
              "800": {
                "value": "#545512"
              },
              "900": {
                "value": "#2a2b09"
              }
            }
          },
          "teal": {
            "id": "#tokensConfig/color/teal",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/teal/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/50/value",
                    "default": "#d7faf8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d7faf8"
                }
              },
              "100": {
                "id": "#tokensConfig/color/teal/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/100/value",
                    "default": "#aff4f0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#aff4f0"
                }
              },
              "200": {
                "id": "#tokensConfig/color/teal/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/200/value",
                    "default": "#87efe9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#87efe9"
                }
              },
              "300": {
                "id": "#tokensConfig/color/teal/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/300/value",
                    "default": "#5fe9e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#5fe9e1"
                }
              },
              "400": {
                "id": "#tokensConfig/color/teal/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/400/value",
                    "default": "#36e4da"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#36e4da"
                }
              },
              "500": {
                "id": "#tokensConfig/color/teal/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/500/value",
                    "default": "#1cd1c6"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1cd1c6"
                }
              },
              "600": {
                "id": "#tokensConfig/color/teal/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/600/value",
                    "default": "#16a79e"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#16a79e"
                }
              },
              "700": {
                "id": "#tokensConfig/color/teal/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/700/value",
                    "default": "#117d77"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#117d77"
                }
              },
              "800": {
                "id": "#tokensConfig/color/teal/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/800/value",
                    "default": "#0b544f"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0b544f"
                }
              },
              "900": {
                "id": "#tokensConfig/color/teal/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/900/value",
                    "default": "#062a28"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#062a28"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d7faf8"
              },
              "100": {
                "value": "#aff4f0"
              },
              "200": {
                "value": "#87efe9"
              },
              "300": {
                "value": "#5fe9e1"
              },
              "400": {
                "value": "#36e4da"
              },
              "500": {
                "value": "#1cd1c6"
              },
              "600": {
                "value": "#16a79e"
              },
              "700": {
                "value": "#117d77"
              },
              "800": {
                "value": "#0b544f"
              },
              "900": {
                "value": "#062a28"
              }
            }
          },
          "lightblue": {
            "id": "#tokensConfig/color/lightblue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/lightblue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/50/value",
                    "default": "#d9f8ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d9f8ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/lightblue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/100/value",
                    "default": "#b3f1ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#b3f1ff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/lightblue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/200/value",
                    "default": "#8deaff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8deaff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/lightblue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/300/value",
                    "default": "#66e4ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#66e4ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/lightblue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/400/value",
                    "default": "#40ddff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#40ddff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/lightblue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/500/value",
                    "default": "#1ad6ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1ad6ff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/lightblue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/600/value",
                    "default": "#00b9e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00b9e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/lightblue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/700/value",
                    "default": "#008aa9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#008aa9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/lightblue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/800/value",
                    "default": "#005c70"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#005c70"
                }
              },
              "900": {
                "id": "#tokensConfig/color/lightblue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/900/value",
                    "default": "#002e38"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002e38"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d9f8ff"
              },
              "100": {
                "value": "#b3f1ff"
              },
              "200": {
                "value": "#8deaff"
              },
              "300": {
                "value": "#66e4ff"
              },
              "400": {
                "value": "#40ddff"
              },
              "500": {
                "value": "#1ad6ff"
              },
              "600": {
                "value": "#00b9e1"
              },
              "700": {
                "value": "#008aa9"
              },
              "800": {
                "value": "#005c70"
              },
              "900": {
                "value": "#002e38"
              }
            }
          },
          "blue": {
            "id": "#tokensConfig/color/blue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/blue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/50/value",
                    "default": "#F2FAFF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#F2FAFF"
                }
              },
              "100": {
                "id": "#tokensConfig/color/blue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/100/value",
                    "default": "#DFF3FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#DFF3FF"
                }
              },
              "200": {
                "id": "#tokensConfig/color/blue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/200/value",
                    "default": "#C6EAFF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#C6EAFF"
                }
              },
              "300": {
                "id": "#tokensConfig/color/blue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/300/value",
                    "default": "#A1DDFF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#A1DDFF"
                }
              },
              "400": {
                "id": "#tokensConfig/color/blue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/400/value",
                    "default": "#64C7FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#64C7FF"
                }
              },
              "500": {
                "id": "#tokensConfig/color/blue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/500/value",
                    "default": "#1AADFF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1AADFF"
                }
              },
              "600": {
                "id": "#tokensConfig/color/blue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/600/value",
                    "default": "#0069A6"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0069A6"
                }
              },
              "700": {
                "id": "#tokensConfig/color/blue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/700/value",
                    "default": "#003351"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#003351"
                }
              },
              "800": {
                "id": "#tokensConfig/color/blue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/800/value",
                    "default": "#002235"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002235"
                }
              },
              "900": {
                "id": "#tokensConfig/color/blue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/900/value",
                    "default": "#00131D"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00131D"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#F2FAFF"
              },
              "100": {
                "value": "#DFF3FF"
              },
              "200": {
                "value": "#C6EAFF"
              },
              "300": {
                "value": "#A1DDFF"
              },
              "400": {
                "value": "#64C7FF"
              },
              "500": {
                "value": "#1AADFF"
              },
              "600": {
                "value": "#0069A6"
              },
              "700": {
                "value": "#003351"
              },
              "800": {
                "value": "#002235"
              },
              "900": {
                "value": "#00131D"
              }
            }
          },
          "indigoblue": {
            "id": "#tokensConfig/color/indigoblue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/indigoblue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/50/value",
                    "default": "#d9e5ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d9e5ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/indigoblue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/100/value",
                    "default": "#b3cbff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#b3cbff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/indigoblue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/200/value",
                    "default": "#8db0ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8db0ff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/indigoblue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/300/value",
                    "default": "#6696ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#6696ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/indigoblue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/400/value",
                    "default": "#407cff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#407cff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/indigoblue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/500/value",
                    "default": "#1a62ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1a62ff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/indigoblue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/600/value",
                    "default": "#0047e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0047e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/indigoblue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/700/value",
                    "default": "#0035a9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0035a9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/indigoblue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/800/value",
                    "default": "#002370"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002370"
                }
              },
              "900": {
                "id": "#tokensConfig/color/indigoblue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/900/value",
                    "default": "#001238"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#001238"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d9e5ff"
              },
              "100": {
                "value": "#b3cbff"
              },
              "200": {
                "value": "#8db0ff"
              },
              "300": {
                "value": "#6696ff"
              },
              "400": {
                "value": "#407cff"
              },
              "500": {
                "value": "#1a62ff"
              },
              "600": {
                "value": "#0047e1"
              },
              "700": {
                "value": "#0035a9"
              },
              "800": {
                "value": "#002370"
              },
              "900": {
                "value": "#001238"
              }
            }
          },
          "royalblue": {
            "id": "#tokensConfig/color/royalblue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/royalblue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/50/value",
                    "default": "#dfdbfb"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#dfdbfb"
                }
              },
              "100": {
                "id": "#tokensConfig/color/royalblue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/100/value",
                    "default": "#c0b7f7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#c0b7f7"
                }
              },
              "200": {
                "id": "#tokensConfig/color/royalblue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/200/value",
                    "default": "#a093f3"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a093f3"
                }
              },
              "300": {
                "id": "#tokensConfig/color/royalblue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/300/value",
                    "default": "#806ff0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#806ff0"
                }
              },
              "400": {
                "id": "#tokensConfig/color/royalblue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/400/value",
                    "default": "#614bec"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#614bec"
                }
              },
              "500": {
                "id": "#tokensConfig/color/royalblue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/500/value",
                    "default": "#4127e8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#4127e8"
                }
              },
              "600": {
                "id": "#tokensConfig/color/royalblue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/600/value",
                    "default": "#2c15c4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#2c15c4"
                }
              },
              "700": {
                "id": "#tokensConfig/color/royalblue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/700/value",
                    "default": "#211093"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#211093"
                }
              },
              "800": {
                "id": "#tokensConfig/color/royalblue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/800/value",
                    "default": "#160a62"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#160a62"
                }
              },
              "900": {
                "id": "#tokensConfig/color/royalblue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/900/value",
                    "default": "#0b0531"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0b0531"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#dfdbfb"
              },
              "100": {
                "value": "#c0b7f7"
              },
              "200": {
                "value": "#a093f3"
              },
              "300": {
                "value": "#806ff0"
              },
              "400": {
                "value": "#614bec"
              },
              "500": {
                "value": "#4127e8"
              },
              "600": {
                "value": "#2c15c4"
              },
              "700": {
                "value": "#211093"
              },
              "800": {
                "value": "#160a62"
              },
              "900": {
                "value": "#0b0531"
              }
            }
          },
          "purple": {
            "id": "#tokensConfig/color/purple",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/purple/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/50/value",
                    "default": "#ead9ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ead9ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/purple/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/100/value",
                    "default": "#d5b3ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d5b3ff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/purple/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/200/value",
                    "default": "#c08dff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#c08dff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/purple/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/300/value",
                    "default": "#ab66ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ab66ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/purple/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/400/value",
                    "default": "#9640ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#9640ff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/purple/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/500/value",
                    "default": "#811aff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#811aff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/purple/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/600/value",
                    "default": "#6500e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#6500e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/purple/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/700/value",
                    "default": "#4c00a9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#4c00a9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/purple/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/800/value",
                    "default": "#330070"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#330070"
                }
              },
              "900": {
                "id": "#tokensConfig/color/purple/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/900/value",
                    "default": "#190038"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#190038"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ead9ff"
              },
              "100": {
                "value": "#d5b3ff"
              },
              "200": {
                "value": "#c08dff"
              },
              "300": {
                "value": "#ab66ff"
              },
              "400": {
                "value": "#9640ff"
              },
              "500": {
                "value": "#811aff"
              },
              "600": {
                "value": "#6500e1"
              },
              "700": {
                "value": "#4c00a9"
              },
              "800": {
                "value": "#330070"
              },
              "900": {
                "value": "#190038"
              }
            }
          },
          "pink": {
            "id": "#tokensConfig/color/pink",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/pink/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/50/value",
                    "default": "#ffd9f2"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffd9f2"
                }
              },
              "100": {
                "id": "#tokensConfig/color/pink/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/100/value",
                    "default": "#ffb3e5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffb3e5"
                }
              },
              "200": {
                "id": "#tokensConfig/color/pink/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/200/value",
                    "default": "#ff8dd8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff8dd8"
                }
              },
              "300": {
                "id": "#tokensConfig/color/pink/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/300/value",
                    "default": "#ff66cc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff66cc"
                }
              },
              "400": {
                "id": "#tokensConfig/color/pink/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/400/value",
                    "default": "#ff40bf"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff40bf"
                }
              },
              "500": {
                "id": "#tokensConfig/color/pink/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/500/value",
                    "default": "#ff1ab2"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff1ab2"
                }
              },
              "600": {
                "id": "#tokensConfig/color/pink/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/600/value",
                    "default": "#e10095"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e10095"
                }
              },
              "700": {
                "id": "#tokensConfig/color/pink/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/700/value",
                    "default": "#a90070"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a90070"
                }
              },
              "800": {
                "id": "#tokensConfig/color/pink/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/800/value",
                    "default": "#70004b"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#70004b"
                }
              },
              "900": {
                "id": "#tokensConfig/color/pink/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/900/value",
                    "default": "#380025"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#380025"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffd9f2"
              },
              "100": {
                "value": "#ffb3e5"
              },
              "200": {
                "value": "#ff8dd8"
              },
              "300": {
                "value": "#ff66cc"
              },
              "400": {
                "value": "#ff40bf"
              },
              "500": {
                "value": "#ff1ab2"
              },
              "600": {
                "value": "#e10095"
              },
              "700": {
                "value": "#a90070"
              },
              "800": {
                "value": "#70004b"
              },
              "900": {
                "value": "#380025"
              }
            }
          },
          "ruby": {
            "id": "#tokensConfig/color/ruby",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/ruby/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/50/value",
                    "default": "#ffd9e4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffd9e4"
                }
              },
              "100": {
                "id": "#tokensConfig/color/ruby/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/100/value",
                    "default": "#ffb3c9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffb3c9"
                }
              },
              "200": {
                "id": "#tokensConfig/color/ruby/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/200/value",
                    "default": "#ff8dae"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff8dae"
                }
              },
              "300": {
                "id": "#tokensConfig/color/ruby/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/300/value",
                    "default": "#ff6694"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff6694"
                }
              },
              "400": {
                "id": "#tokensConfig/color/ruby/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/400/value",
                    "default": "#ff4079"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff4079"
                }
              },
              "500": {
                "id": "#tokensConfig/color/ruby/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/500/value",
                    "default": "#ff1a5e"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff1a5e"
                }
              },
              "600": {
                "id": "#tokensConfig/color/ruby/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/600/value",
                    "default": "#e10043"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e10043"
                }
              },
              "700": {
                "id": "#tokensConfig/color/ruby/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/700/value",
                    "default": "#a90032"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a90032"
                }
              },
              "800": {
                "id": "#tokensConfig/color/ruby/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/800/value",
                    "default": "#700021"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#700021"
                }
              },
              "900": {
                "id": "#tokensConfig/color/ruby/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/900/value",
                    "default": "#380011"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#380011"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffd9e4"
              },
              "100": {
                "value": "#ffb3c9"
              },
              "200": {
                "value": "#ff8dae"
              },
              "300": {
                "value": "#ff6694"
              },
              "400": {
                "value": "#ff4079"
              },
              "500": {
                "value": "#ff1a5e"
              },
              "600": {
                "value": "#e10043"
              },
              "700": {
                "value": "#a90032"
              },
              "800": {
                "value": "#700021"
              },
              "900": {
                "value": "#380011"
              }
            }
          },
          "primary": {
            "id": "#tokensConfig/color/primary",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/primary/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/50/value",
                    "default": "#F1FCFF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#F1FCFF"
                }
              },
              "100": {
                "id": "#tokensConfig/color/primary/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/100/value",
                    "default": "#DCF7FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#DCF7FF"
                }
              },
              "200": {
                "id": "#tokensConfig/color/primary/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/200/value",
                    "default": "#C5F2FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#C5F2FF"
                }
              },
              "300": {
                "id": "#tokensConfig/color/primary/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/300/value",
                    "default": "#82E3FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#82E3FF"
                }
              },
              "400": {
                "id": "#tokensConfig/color/primary/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/400/value",
                    "default": "#55E1FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#55E1FF"
                }
              },
              "500": {
                "id": "#tokensConfig/color/primary/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/500/value",
                    "default": "#1AD6FF"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1AD6FF"
                }
              },
              "600": {
                "id": "#tokensConfig/color/primary/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/600/value",
                    "default": "#09A0C1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#09A0C1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/primary/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/700/value",
                    "default": "#024757"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#024757"
                }
              },
              "800": {
                "id": "#tokensConfig/color/primary/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/800/value",
                    "default": "#00232B"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00232B"
                }
              },
              "900": {
                "id": "#tokensConfig/color/primary/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/900/value",
                    "default": "#001A1F"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#001A1F"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#F1FCFF"
              },
              "100": {
                "value": "#DCF7FF"
              },
              "200": {
                "value": "#C5F2FF"
              },
              "300": {
                "value": "#82E3FF"
              },
              "400": {
                "value": "#55E1FF"
              },
              "500": {
                "value": "#1AD6FF"
              },
              "600": {
                "value": "#09A0C1"
              },
              "700": {
                "value": "#024757"
              },
              "800": {
                "value": "#00232B"
              },
              "900": {
                "value": "#001A1F"
              }
            }
          },
          "secondary": {
            "id": "#tokensConfig/color/secondary",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/secondary/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/50/value",
                    "default": "{color.gray.50}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.50}"
                }
              },
              "100": {
                "id": "#tokensConfig/color/secondary/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/100/value",
                    "default": "{color.gray.100}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.100}"
                }
              },
              "200": {
                "id": "#tokensConfig/color/secondary/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/200/value",
                    "default": "{color.gray.200}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.200}"
                }
              },
              "300": {
                "id": "#tokensConfig/color/secondary/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/300/value",
                    "default": "{color.gray.300}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.300}"
                }
              },
              "400": {
                "id": "#tokensConfig/color/secondary/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/400/value",
                    "default": "{color.gray.400}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.400}"
                }
              },
              "500": {
                "id": "#tokensConfig/color/secondary/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/500/value",
                    "default": "{color.gray.500}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.500}"
                }
              },
              "600": {
                "id": "#tokensConfig/color/secondary/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/600/value",
                    "default": "{color.gray.600}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.600}"
                }
              },
              "700": {
                "id": "#tokensConfig/color/secondary/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/700/value",
                    "default": "{color.gray.700}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.700}"
                }
              },
              "800": {
                "id": "#tokensConfig/color/secondary/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/800/value",
                    "default": "{color.gray.800}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.800}"
                }
              },
              "900": {
                "id": "#tokensConfig/color/secondary/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/900/value",
                    "default": "{color.gray.900}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{color.gray.900}"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "{color.gray.50}"
              },
              "100": {
                "value": "{color.gray.100}"
              },
              "200": {
                "value": "{color.gray.200}"
              },
              "300": {
                "value": "{color.gray.300}"
              },
              "400": {
                "value": "{color.gray.400}"
              },
              "500": {
                "value": "{color.gray.500}"
              },
              "600": {
                "value": "{color.gray.600}"
              },
              "700": {
                "value": "{color.gray.700}"
              },
              "800": {
                "value": "{color.gray.800}"
              },
              "900": {
                "value": "{color.gray.900}"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "white": {
            "value": "#ffffff"
          },
          "black": {
            "value": "#0B0A0A"
          },
          "gray": {
            "50": {
              "value": "#FBFBFB"
            },
            "100": {
              "value": "#F6F5F4"
            },
            "200": {
              "value": "#ECEBE8"
            },
            "300": {
              "value": "#DBD9D3"
            },
            "400": {
              "value": "#ADA9A4"
            },
            "500": {
              "value": "#97948F"
            },
            "600": {
              "value": "#67635D"
            },
            "700": {
              "value": "#36332E"
            },
            "800": {
              "value": "#201E1B"
            },
            "900": {
              "value": "#121110"
            }
          },
          "green": {
            "50": {
              "value": "#ECFFF7"
            },
            "100": {
              "value": "#DEFFF1"
            },
            "200": {
              "value": "#C3FFE6"
            },
            "300": {
              "value": "#86FBCB"
            },
            "400": {
              "value": "#3CEEA5"
            },
            "500": {
              "value": "#0DD885"
            },
            "600": {
              "value": "#00B467"
            },
            "700": {
              "value": "#006037"
            },
            "800": {
              "value": "#002817"
            },
            "900": {
              "value": "#00190F"
            }
          },
          "yellow": {
            "50": {
              "value": "#FFFDEA"
            },
            "100": {
              "value": "#FFF8CC"
            },
            "200": {
              "value": "#FEF5A4"
            },
            "300": {
              "value": "#FFEF8A"
            },
            "400": {
              "value": "#FFE53C"
            },
            "500": {
              "value": "#EECF00"
            },
            "600": {
              "value": "#C2A905"
            },
            "700": {
              "value": "#6B5D02"
            },
            "800": {
              "value": "#282300"
            },
            "900": {
              "value": "#1A1700"
            }
          },
          "orange": {
            "50": {
              "value": "#ffe9d9"
            },
            "100": {
              "value": "#ffd3b3"
            },
            "200": {
              "value": "#ffbd8d"
            },
            "300": {
              "value": "#ffa666"
            },
            "400": {
              "value": "#ff9040"
            },
            "500": {
              "value": "#ff7a1a"
            },
            "600": {
              "value": "#e15e00"
            },
            "700": {
              "value": "#a94700"
            },
            "800": {
              "value": "#702f00"
            },
            "900": {
              "value": "#381800"
            }
          },
          "red": {
            "50": {
              "value": "#FFF9F8"
            },
            "100": {
              "value": "#FFF3F0"
            },
            "200": {
              "value": "#FFDED7"
            },
            "300": {
              "value": "#FFA692"
            },
            "400": {
              "value": "#FF7353"
            },
            "500": {
              "value": "#FF3B10"
            },
            "600": {
              "value": "#BB2402"
            },
            "700": {
              "value": "#701704"
            },
            "800": {
              "value": "#340A01"
            },
            "900": {
              "value": "#1C0301"
            }
          },
          "pear": {
            "50": {
              "value": "#f7f8dc"
            },
            "100": {
              "value": "#eff0ba"
            },
            "200": {
              "value": "#e8e997"
            },
            "300": {
              "value": "#e0e274"
            },
            "400": {
              "value": "#d8da52"
            },
            "500": {
              "value": "#d0d32f"
            },
            "600": {
              "value": "#a8aa24"
            },
            "700": {
              "value": "#7e801b"
            },
            "800": {
              "value": "#545512"
            },
            "900": {
              "value": "#2a2b09"
            }
          },
          "teal": {
            "50": {
              "value": "#d7faf8"
            },
            "100": {
              "value": "#aff4f0"
            },
            "200": {
              "value": "#87efe9"
            },
            "300": {
              "value": "#5fe9e1"
            },
            "400": {
              "value": "#36e4da"
            },
            "500": {
              "value": "#1cd1c6"
            },
            "600": {
              "value": "#16a79e"
            },
            "700": {
              "value": "#117d77"
            },
            "800": {
              "value": "#0b544f"
            },
            "900": {
              "value": "#062a28"
            }
          },
          "lightblue": {
            "50": {
              "value": "#d9f8ff"
            },
            "100": {
              "value": "#b3f1ff"
            },
            "200": {
              "value": "#8deaff"
            },
            "300": {
              "value": "#66e4ff"
            },
            "400": {
              "value": "#40ddff"
            },
            "500": {
              "value": "#1ad6ff"
            },
            "600": {
              "value": "#00b9e1"
            },
            "700": {
              "value": "#008aa9"
            },
            "800": {
              "value": "#005c70"
            },
            "900": {
              "value": "#002e38"
            }
          },
          "blue": {
            "50": {
              "value": "#F2FAFF"
            },
            "100": {
              "value": "#DFF3FF"
            },
            "200": {
              "value": "#C6EAFF"
            },
            "300": {
              "value": "#A1DDFF"
            },
            "400": {
              "value": "#64C7FF"
            },
            "500": {
              "value": "#1AADFF"
            },
            "600": {
              "value": "#0069A6"
            },
            "700": {
              "value": "#003351"
            },
            "800": {
              "value": "#002235"
            },
            "900": {
              "value": "#00131D"
            }
          },
          "indigoblue": {
            "50": {
              "value": "#d9e5ff"
            },
            "100": {
              "value": "#b3cbff"
            },
            "200": {
              "value": "#8db0ff"
            },
            "300": {
              "value": "#6696ff"
            },
            "400": {
              "value": "#407cff"
            },
            "500": {
              "value": "#1a62ff"
            },
            "600": {
              "value": "#0047e1"
            },
            "700": {
              "value": "#0035a9"
            },
            "800": {
              "value": "#002370"
            },
            "900": {
              "value": "#001238"
            }
          },
          "royalblue": {
            "50": {
              "value": "#dfdbfb"
            },
            "100": {
              "value": "#c0b7f7"
            },
            "200": {
              "value": "#a093f3"
            },
            "300": {
              "value": "#806ff0"
            },
            "400": {
              "value": "#614bec"
            },
            "500": {
              "value": "#4127e8"
            },
            "600": {
              "value": "#2c15c4"
            },
            "700": {
              "value": "#211093"
            },
            "800": {
              "value": "#160a62"
            },
            "900": {
              "value": "#0b0531"
            }
          },
          "purple": {
            "50": {
              "value": "#ead9ff"
            },
            "100": {
              "value": "#d5b3ff"
            },
            "200": {
              "value": "#c08dff"
            },
            "300": {
              "value": "#ab66ff"
            },
            "400": {
              "value": "#9640ff"
            },
            "500": {
              "value": "#811aff"
            },
            "600": {
              "value": "#6500e1"
            },
            "700": {
              "value": "#4c00a9"
            },
            "800": {
              "value": "#330070"
            },
            "900": {
              "value": "#190038"
            }
          },
          "pink": {
            "50": {
              "value": "#ffd9f2"
            },
            "100": {
              "value": "#ffb3e5"
            },
            "200": {
              "value": "#ff8dd8"
            },
            "300": {
              "value": "#ff66cc"
            },
            "400": {
              "value": "#ff40bf"
            },
            "500": {
              "value": "#ff1ab2"
            },
            "600": {
              "value": "#e10095"
            },
            "700": {
              "value": "#a90070"
            },
            "800": {
              "value": "#70004b"
            },
            "900": {
              "value": "#380025"
            }
          },
          "ruby": {
            "50": {
              "value": "#ffd9e4"
            },
            "100": {
              "value": "#ffb3c9"
            },
            "200": {
              "value": "#ff8dae"
            },
            "300": {
              "value": "#ff6694"
            },
            "400": {
              "value": "#ff4079"
            },
            "500": {
              "value": "#ff1a5e"
            },
            "600": {
              "value": "#e10043"
            },
            "700": {
              "value": "#a90032"
            },
            "800": {
              "value": "#700021"
            },
            "900": {
              "value": "#380011"
            }
          },
          "primary": {
            "50": {
              "value": "#F1FCFF"
            },
            "100": {
              "value": "#DCF7FF"
            },
            "200": {
              "value": "#C5F2FF"
            },
            "300": {
              "value": "#82E3FF"
            },
            "400": {
              "value": "#55E1FF"
            },
            "500": {
              "value": "#1AD6FF"
            },
            "600": {
              "value": "#09A0C1"
            },
            "700": {
              "value": "#024757"
            },
            "800": {
              "value": "#00232B"
            },
            "900": {
              "value": "#001A1F"
            }
          },
          "secondary": {
            "50": {
              "value": "{color.gray.50}"
            },
            "100": {
              "value": "{color.gray.100}"
            },
            "200": {
              "value": "{color.gray.200}"
            },
            "300": {
              "value": "{color.gray.300}"
            },
            "400": {
              "value": "{color.gray.400}"
            },
            "500": {
              "value": "{color.gray.500}"
            },
            "600": {
              "value": "{color.gray.600}"
            },
            "700": {
              "value": "{color.gray.700}"
            },
            "800": {
              "value": "{color.gray.800}"
            },
            "900": {
              "value": "{color.gray.900}"
            }
          }
        }
      },
      "width": {
        "title": "Your website screen sizings.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon ph:ruler"
        ],
        "id": "#tokensConfig/width",
        "properties": {
          "screen": {
            "id": "#tokensConfig/width/screen",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/width/screen/value",
                "default": "100vw"
              }
            },
            "type": "object",
            "default": {
              "value": "100vw"
            }
          }
        },
        "type": "object",
        "default": {
          "screen": {
            "value": "100vw"
          }
        }
      },
      "height": {
        "title": "Your website screen sizings.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon ph:ruler"
        ],
        "id": "#tokensConfig/height",
        "properties": {
          "screen": {
            "id": "#tokensConfig/height/screen",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/height/screen/value",
                "default": "100vh"
              }
            },
            "type": "object",
            "default": {
              "value": "100vh"
            }
          }
        },
        "type": "object",
        "default": {
          "screen": {
            "value": "100vh"
          }
        }
      },
      "shadow": {
        "title": "Your website shadows.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType shadow",
          "@studioIcon mdi:box-shadow"
        ],
        "id": "#tokensConfig/shadow",
        "properties": {
          "xs": {
            "id": "#tokensConfig/shadow/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/xs/value",
                "default": "0px 1px 2px 0px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 1px 2px 0px #000000"
            }
          },
          "sm": {
            "id": "#tokensConfig/shadow/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/sm/value",
                "default": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
            }
          },
          "md": {
            "id": "#tokensConfig/shadow/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/md/value",
                "default": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
            }
          },
          "lg": {
            "id": "#tokensConfig/shadow/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/lg/value",
                "default": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
            }
          },
          "xl": {
            "id": "#tokensConfig/shadow/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/xl/value",
                "default": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
            }
          },
          "2xl": {
            "id": "#tokensConfig/shadow/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/2xl/value",
                "default": "0px 25px 50px -12px {color.gray.900}"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 25px 50px -12px {color.gray.900}"
            }
          },
          "none": {
            "id": "#tokensConfig/shadow/none",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/none/value",
                "default": "0px 0px 0px 0px transparent"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 0px 0px 0px transparent"
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "value": "0px 1px 2px 0px #000000"
          },
          "sm": {
            "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
          },
          "md": {
            "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
          },
          "lg": {
            "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
          },
          "xl": {
            "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
          },
          "2xl": {
            "value": "0px 25px 50px -12px {color.gray.900}"
          },
          "none": {
            "value": "0px 0px 0px 0px transparent"
          }
        }
      },
      "radii": {
        "title": "Your website border radiuses.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon material-symbols:rounded-corner",
          "@studioInpuTokenType size"
        ],
        "id": "#tokensConfig/radii",
        "properties": {
          "none": {
            "id": "#tokensConfig/radii/none",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/none/value",
                "default": "0px"
              }
            },
            "type": "object",
            "default": {
              "value": "0px"
            }
          },
          "2xs": {
            "id": "#tokensConfig/radii/2xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/2xs/value",
                "default": "0.125rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.125rem"
            }
          },
          "xs": {
            "id": "#tokensConfig/radii/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/xs/value",
                "default": "0.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.25rem"
            }
          },
          "sm": {
            "id": "#tokensConfig/radii/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/sm/value",
                "default": "0.375rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.375rem"
            }
          },
          "md": {
            "id": "#tokensConfig/radii/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/md/value",
                "default": "0.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.5rem"
            }
          },
          "lg": {
            "id": "#tokensConfig/radii/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/lg/value",
                "default": "0.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.75rem"
            }
          },
          "xl": {
            "id": "#tokensConfig/radii/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/xl/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "2xl": {
            "id": "#tokensConfig/radii/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/2xl/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "3xl": {
            "id": "#tokensConfig/radii/3xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/3xl/value",
                "default": "1.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.75rem"
            }
          },
          "full": {
            "id": "#tokensConfig/radii/full",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/full/value",
                "default": "9999px"
              }
            },
            "type": "object",
            "default": {
              "value": "9999px"
            }
          }
        },
        "type": "object",
        "default": {
          "none": {
            "value": "0px"
          },
          "2xs": {
            "value": "0.125rem"
          },
          "xs": {
            "value": "0.25rem"
          },
          "sm": {
            "value": "0.375rem"
          },
          "md": {
            "value": "0.5rem"
          },
          "lg": {
            "value": "0.75rem"
          },
          "xl": {
            "value": "1rem"
          },
          "2xl": {
            "value": "1.5rem"
          },
          "3xl": {
            "value": "1.75rem"
          },
          "full": {
            "value": "9999px"
          }
        }
      },
      "size": {
        "title": "Your website sizings.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon ph:ruler"
        ],
        "id": "#tokensConfig/size",
        "properties": {
          "0": {
            "id": "#tokensConfig/size/0",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/0/value",
                "default": "0px"
              }
            },
            "type": "object",
            "default": {
              "value": "0px"
            }
          },
          "2": {
            "id": "#tokensConfig/size/2",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/2/value",
                "default": "2px"
              }
            },
            "type": "object",
            "default": {
              "value": "2px"
            }
          },
          "4": {
            "id": "#tokensConfig/size/4",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/4/value",
                "default": "4px"
              }
            },
            "type": "object",
            "default": {
              "value": "4px"
            }
          },
          "6": {
            "id": "#tokensConfig/size/6",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/6/value",
                "default": "6px"
              }
            },
            "type": "object",
            "default": {
              "value": "6px"
            }
          },
          "8": {
            "id": "#tokensConfig/size/8",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/8/value",
                "default": "8px"
              }
            },
            "type": "object",
            "default": {
              "value": "8px"
            }
          },
          "12": {
            "id": "#tokensConfig/size/12",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/12/value",
                "default": "12px"
              }
            },
            "type": "object",
            "default": {
              "value": "12px"
            }
          },
          "16": {
            "id": "#tokensConfig/size/16",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/16/value",
                "default": "16px"
              }
            },
            "type": "object",
            "default": {
              "value": "16px"
            }
          },
          "20": {
            "id": "#tokensConfig/size/20",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/20/value",
                "default": "20px"
              }
            },
            "type": "object",
            "default": {
              "value": "20px"
            }
          },
          "24": {
            "id": "#tokensConfig/size/24",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/24/value",
                "default": "24px"
              }
            },
            "type": "object",
            "default": {
              "value": "24px"
            }
          },
          "32": {
            "id": "#tokensConfig/size/32",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/32/value",
                "default": "32px"
              }
            },
            "type": "object",
            "default": {
              "value": "32px"
            }
          },
          "40": {
            "id": "#tokensConfig/size/40",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/40/value",
                "default": "40px"
              }
            },
            "type": "object",
            "default": {
              "value": "40px"
            }
          },
          "48": {
            "id": "#tokensConfig/size/48",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/48/value",
                "default": "48px"
              }
            },
            "type": "object",
            "default": {
              "value": "48px"
            }
          },
          "56": {
            "id": "#tokensConfig/size/56",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/56/value",
                "default": "56px"
              }
            },
            "type": "object",
            "default": {
              "value": "56px"
            }
          },
          "64": {
            "id": "#tokensConfig/size/64",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/64/value",
                "default": "64px"
              }
            },
            "type": "object",
            "default": {
              "value": "64px"
            }
          },
          "80": {
            "id": "#tokensConfig/size/80",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/80/value",
                "default": "80px"
              }
            },
            "type": "object",
            "default": {
              "value": "80px"
            }
          },
          "104": {
            "id": "#tokensConfig/size/104",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/104/value",
                "default": "104px"
              }
            },
            "type": "object",
            "default": {
              "value": "104px"
            }
          },
          "200": {
            "id": "#tokensConfig/size/200",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/200/value",
                "default": "200px"
              }
            },
            "type": "object",
            "default": {
              "value": "200px"
            }
          },
          "xs": {
            "id": "#tokensConfig/size/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/xs/value",
                "default": "20rem"
              }
            },
            "type": "object",
            "default": {
              "value": "20rem"
            }
          },
          "sm": {
            "id": "#tokensConfig/size/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/sm/value",
                "default": "24rem"
              }
            },
            "type": "object",
            "default": {
              "value": "24rem"
            }
          },
          "md": {
            "id": "#tokensConfig/size/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/md/value",
                "default": "28rem"
              }
            },
            "type": "object",
            "default": {
              "value": "28rem"
            }
          },
          "lg": {
            "id": "#tokensConfig/size/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/lg/value",
                "default": "32rem"
              }
            },
            "type": "object",
            "default": {
              "value": "32rem"
            }
          },
          "xl": {
            "id": "#tokensConfig/size/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/xl/value",
                "default": "36rem"
              }
            },
            "type": "object",
            "default": {
              "value": "36rem"
            }
          },
          "2xl": {
            "id": "#tokensConfig/size/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/2xl/value",
                "default": "42rem"
              }
            },
            "type": "object",
            "default": {
              "value": "42rem"
            }
          },
          "3xl": {
            "id": "#tokensConfig/size/3xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/3xl/value",
                "default": "48rem"
              }
            },
            "type": "object",
            "default": {
              "value": "48rem"
            }
          },
          "4xl": {
            "id": "#tokensConfig/size/4xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/4xl/value",
                "default": "56rem"
              }
            },
            "type": "object",
            "default": {
              "value": "56rem"
            }
          },
          "5xl": {
            "id": "#tokensConfig/size/5xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/5xl/value",
                "default": "64rem"
              }
            },
            "type": "object",
            "default": {
              "value": "64rem"
            }
          },
          "6xl": {
            "id": "#tokensConfig/size/6xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/6xl/value",
                "default": "72rem"
              }
            },
            "type": "object",
            "default": {
              "value": "72rem"
            }
          },
          "7xl": {
            "id": "#tokensConfig/size/7xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/7xl/value",
                "default": "80rem"
              }
            },
            "type": "object",
            "default": {
              "value": "80rem"
            }
          },
          "full": {
            "id": "#tokensConfig/size/full",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/full/value",
                "default": "100%"
              }
            },
            "type": "object",
            "default": {
              "value": "100%"
            }
          }
        },
        "type": "object",
        "default": {
          "0": {
            "value": "0px"
          },
          "2": {
            "value": "2px"
          },
          "4": {
            "value": "4px"
          },
          "6": {
            "value": "6px"
          },
          "8": {
            "value": "8px"
          },
          "12": {
            "value": "12px"
          },
          "16": {
            "value": "16px"
          },
          "20": {
            "value": "20px"
          },
          "24": {
            "value": "24px"
          },
          "32": {
            "value": "32px"
          },
          "40": {
            "value": "40px"
          },
          "48": {
            "value": "48px"
          },
          "56": {
            "value": "56px"
          },
          "64": {
            "value": "64px"
          },
          "80": {
            "value": "80px"
          },
          "104": {
            "value": "104px"
          },
          "200": {
            "value": "200px"
          },
          "xs": {
            "value": "20rem"
          },
          "sm": {
            "value": "24rem"
          },
          "md": {
            "value": "28rem"
          },
          "lg": {
            "value": "32rem"
          },
          "xl": {
            "value": "36rem"
          },
          "2xl": {
            "value": "42rem"
          },
          "3xl": {
            "value": "48rem"
          },
          "4xl": {
            "value": "56rem"
          },
          "5xl": {
            "value": "64rem"
          },
          "6xl": {
            "value": "72rem"
          },
          "7xl": {
            "value": "80rem"
          },
          "full": {
            "value": "100%"
          }
        }
      },
      "space": {
        "title": "Your website spacings.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon ph:ruler"
        ],
        "id": "#tokensConfig/space",
        "properties": {
          "0": {
            "id": "#tokensConfig/space/0",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/0/value",
                "default": "0px"
              }
            },
            "type": "object",
            "default": {
              "value": "0px"
            }
          },
          "1": {
            "id": "#tokensConfig/space/1",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/1/value",
                "default": "0.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.25rem"
            }
          },
          "2": {
            "id": "#tokensConfig/space/2",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/2/value",
                "default": "0.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.5rem"
            }
          },
          "3": {
            "id": "#tokensConfig/space/3",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/3/value",
                "default": "0.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.75rem"
            }
          },
          "4": {
            "id": "#tokensConfig/space/4",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/4/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "5": {
            "id": "#tokensConfig/space/5",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/5/value",
                "default": "1.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25rem"
            }
          },
          "6": {
            "id": "#tokensConfig/space/6",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/6/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "7": {
            "id": "#tokensConfig/space/7",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/7/value",
                "default": "1.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.75rem"
            }
          },
          "8": {
            "id": "#tokensConfig/space/8",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/8/value",
                "default": "2rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2rem"
            }
          },
          "9": {
            "id": "#tokensConfig/space/9",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/9/value",
                "default": "2.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.25rem"
            }
          },
          "10": {
            "id": "#tokensConfig/space/10",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/10/value",
                "default": "2.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.5rem"
            }
          },
          "11": {
            "id": "#tokensConfig/space/11",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/11/value",
                "default": "2.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.75rem"
            }
          },
          "12": {
            "id": "#tokensConfig/space/12",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/12/value",
                "default": "3rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3rem"
            }
          },
          "14": {
            "id": "#tokensConfig/space/14",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/14/value",
                "default": "3.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3.5rem"
            }
          },
          "16": {
            "id": "#tokensConfig/space/16",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/16/value",
                "default": "4rem"
              }
            },
            "type": "object",
            "default": {
              "value": "4rem"
            }
          },
          "20": {
            "id": "#tokensConfig/space/20",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/20/value",
                "default": "5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "5rem"
            }
          },
          "24": {
            "id": "#tokensConfig/space/24",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/24/value",
                "default": "6rem"
              }
            },
            "type": "object",
            "default": {
              "value": "6rem"
            }
          },
          "28": {
            "id": "#tokensConfig/space/28",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/28/value",
                "default": "7rem"
              }
            },
            "type": "object",
            "default": {
              "value": "7rem"
            }
          },
          "32": {
            "id": "#tokensConfig/space/32",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/32/value",
                "default": "8rem"
              }
            },
            "type": "object",
            "default": {
              "value": "8rem"
            }
          },
          "36": {
            "id": "#tokensConfig/space/36",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/36/value",
                "default": "9rem"
              }
            },
            "type": "object",
            "default": {
              "value": "9rem"
            }
          },
          "40": {
            "id": "#tokensConfig/space/40",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/40/value",
                "default": "10rem"
              }
            },
            "type": "object",
            "default": {
              "value": "10rem"
            }
          },
          "44": {
            "id": "#tokensConfig/space/44",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/44/value",
                "default": "11rem"
              }
            },
            "type": "object",
            "default": {
              "value": "11rem"
            }
          },
          "48": {
            "id": "#tokensConfig/space/48",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/48/value",
                "default": "12rem"
              }
            },
            "type": "object",
            "default": {
              "value": "12rem"
            }
          },
          "52": {
            "id": "#tokensConfig/space/52",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/52/value",
                "default": "13rem"
              }
            },
            "type": "object",
            "default": {
              "value": "13rem"
            }
          },
          "56": {
            "id": "#tokensConfig/space/56",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/56/value",
                "default": "14rem"
              }
            },
            "type": "object",
            "default": {
              "value": "14rem"
            }
          },
          "60": {
            "id": "#tokensConfig/space/60",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/60/value",
                "default": "15rem"
              }
            },
            "type": "object",
            "default": {
              "value": "15rem"
            }
          },
          "64": {
            "id": "#tokensConfig/space/64",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/64/value",
                "default": "16rem"
              }
            },
            "type": "object",
            "default": {
              "value": "16rem"
            }
          },
          "72": {
            "id": "#tokensConfig/space/72",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/72/value",
                "default": "18rem"
              }
            },
            "type": "object",
            "default": {
              "value": "18rem"
            }
          },
          "80": {
            "id": "#tokensConfig/space/80",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/80/value",
                "default": "20rem"
              }
            },
            "type": "object",
            "default": {
              "value": "20rem"
            }
          },
          "96": {
            "id": "#tokensConfig/space/96",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/96/value",
                "default": "24rem"
              }
            },
            "type": "object",
            "default": {
              "value": "24rem"
            }
          },
          "128": {
            "id": "#tokensConfig/space/128",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/128/value",
                "default": "32rem"
              }
            },
            "type": "object",
            "default": {
              "value": "32rem"
            }
          },
          "px": {
            "id": "#tokensConfig/space/px",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/px/value",
                "default": "1px"
              }
            },
            "type": "object",
            "default": {
              "value": "1px"
            }
          },
          "rem": {
            "id": "#tokensConfig/space/rem",
            "properties": {
              "125": {
                "id": "#tokensConfig/space/rem/125",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/125/value",
                    "default": "0.125rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.125rem"
                }
              },
              "375": {
                "id": "#tokensConfig/space/rem/375",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/375/value",
                    "default": "0.375rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.375rem"
                }
              },
              "625": {
                "id": "#tokensConfig/space/rem/625",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/625/value",
                    "default": "0.625rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.625rem"
                }
              },
              "875": {
                "id": "#tokensConfig/space/rem/875",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/875/value",
                    "default": "0.875rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.875rem"
                }
              }
            },
            "type": "object",
            "default": {
              "125": {
                "value": "0.125rem"
              },
              "375": {
                "value": "0.375rem"
              },
              "625": {
                "value": "0.625rem"
              },
              "875": {
                "value": "0.875rem"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "0": {
            "value": "0px"
          },
          "1": {
            "value": "0.25rem"
          },
          "2": {
            "value": "0.5rem"
          },
          "3": {
            "value": "0.75rem"
          },
          "4": {
            "value": "1rem"
          },
          "5": {
            "value": "1.25rem"
          },
          "6": {
            "value": "1.5rem"
          },
          "7": {
            "value": "1.75rem"
          },
          "8": {
            "value": "2rem"
          },
          "9": {
            "value": "2.25rem"
          },
          "10": {
            "value": "2.5rem"
          },
          "11": {
            "value": "2.75rem"
          },
          "12": {
            "value": "3rem"
          },
          "14": {
            "value": "3.5rem"
          },
          "16": {
            "value": "4rem"
          },
          "20": {
            "value": "5rem"
          },
          "24": {
            "value": "6rem"
          },
          "28": {
            "value": "7rem"
          },
          "32": {
            "value": "8rem"
          },
          "36": {
            "value": "9rem"
          },
          "40": {
            "value": "10rem"
          },
          "44": {
            "value": "11rem"
          },
          "48": {
            "value": "12rem"
          },
          "52": {
            "value": "13rem"
          },
          "56": {
            "value": "14rem"
          },
          "60": {
            "value": "15rem"
          },
          "64": {
            "value": "16rem"
          },
          "72": {
            "value": "18rem"
          },
          "80": {
            "value": "20rem"
          },
          "96": {
            "value": "24rem"
          },
          "128": {
            "value": "32rem"
          },
          "px": {
            "value": "1px"
          },
          "rem": {
            "125": {
              "value": "0.125rem"
            },
            "375": {
              "value": "0.375rem"
            },
            "625": {
              "value": "0.625rem"
            },
            "875": {
              "value": "0.875rem"
            }
          }
        }
      },
      "borderWidth": {
        "title": "Your website border widths.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon material-symbols:border-all-outline-rounded"
        ],
        "id": "#tokensConfig/borderWidth",
        "properties": {
          "noBorder": {
            "id": "#tokensConfig/borderWidth/noBorder",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/noBorder/value",
                "default": "0"
              }
            },
            "type": "object",
            "default": {
              "value": "0"
            }
          },
          "sm": {
            "id": "#tokensConfig/borderWidth/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/sm/value",
                "default": "1px"
              }
            },
            "type": "object",
            "default": {
              "value": "1px"
            }
          },
          "md": {
            "id": "#tokensConfig/borderWidth/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/md/value",
                "default": "2px"
              }
            },
            "type": "object",
            "default": {
              "value": "2px"
            }
          },
          "lg": {
            "id": "#tokensConfig/borderWidth/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/lg/value",
                "default": "3px"
              }
            },
            "type": "object",
            "default": {
              "value": "3px"
            }
          }
        },
        "type": "object",
        "default": {
          "noBorder": {
            "value": "0"
          },
          "sm": {
            "value": "1px"
          },
          "md": {
            "value": "2px"
          },
          "lg": {
            "value": "3px"
          }
        }
      },
      "opacity": {
        "title": "Your website opacities.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType opacity",
          "@studioIcon material-symbols:opacity"
        ],
        "id": "#tokensConfig/opacity",
        "properties": {
          "noOpacity": {
            "id": "#tokensConfig/opacity/noOpacity",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/noOpacity/value",
                "default": "0"
              }
            },
            "type": "object",
            "default": {
              "value": "0"
            }
          },
          "bright": {
            "id": "#tokensConfig/opacity/bright",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/bright/value",
                "default": "0.1"
              }
            },
            "type": "object",
            "default": {
              "value": "0.1"
            }
          },
          "light": {
            "id": "#tokensConfig/opacity/light",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/light/value",
                "default": "0.15"
              }
            },
            "type": "object",
            "default": {
              "value": "0.15"
            }
          },
          "soft": {
            "id": "#tokensConfig/opacity/soft",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/soft/value",
                "default": "0.3"
              }
            },
            "type": "object",
            "default": {
              "value": "0.3"
            }
          },
          "medium": {
            "id": "#tokensConfig/opacity/medium",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/medium/value",
                "default": "0.5"
              }
            },
            "type": "object",
            "default": {
              "value": "0.5"
            }
          },
          "high": {
            "id": "#tokensConfig/opacity/high",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/high/value",
                "default": "0.8"
              }
            },
            "type": "object",
            "default": {
              "value": "0.8"
            }
          },
          "total": {
            "id": "#tokensConfig/opacity/total",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/total/value",
                "default": "1"
              }
            },
            "type": "object",
            "default": {
              "value": "1"
            }
          }
        },
        "type": "object",
        "default": {
          "noOpacity": {
            "value": "0"
          },
          "bright": {
            "value": "0.1"
          },
          "light": {
            "value": "0.15"
          },
          "soft": {
            "value": "0.3"
          },
          "medium": {
            "value": "0.5"
          },
          "high": {
            "value": "0.8"
          },
          "total": {
            "value": "1"
          }
        }
      },
      "font": {
        "title": "Your website fonts",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType font",
          "@studioIcon material-symbols:font-download-rounded"
        ],
        "id": "#tokensConfig/font",
        "properties": {
          "sans": {
            "id": "#tokensConfig/font/sans",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/font/sans/value",
                "default": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
              }
            },
            "type": "object",
            "default": {
              "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
            }
          },
          "serif": {
            "id": "#tokensConfig/font/serif",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/font/serif/value",
                "default": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
              }
            },
            "type": "object",
            "default": {
              "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
            }
          },
          "mono": {
            "id": "#tokensConfig/font/mono",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/font/mono/value",
                "default": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
              }
            },
            "type": "object",
            "default": {
              "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
            }
          }
        },
        "type": "object",
        "default": {
          "sans": {
            "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
          },
          "serif": {
            "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
          },
          "mono": {
            "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
          }
        }
      },
      "fontWeight": {
        "title": "Your website font weights.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType font-weight",
          "@studioIcon radix-icons:font-style"
        ],
        "id": "#tokensConfig/fontWeight",
        "properties": {
          "thin": {
            "id": "#tokensConfig/fontWeight/thin",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/thin/value",
                "default": "100"
              }
            },
            "type": "object",
            "default": {
              "value": "100"
            }
          },
          "extralight": {
            "id": "#tokensConfig/fontWeight/extralight",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/extralight/value",
                "default": "200"
              }
            },
            "type": "object",
            "default": {
              "value": "200"
            }
          },
          "light": {
            "id": "#tokensConfig/fontWeight/light",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/light/value",
                "default": "300"
              }
            },
            "type": "object",
            "default": {
              "value": "300"
            }
          },
          "normal": {
            "id": "#tokensConfig/fontWeight/normal",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/normal/value",
                "default": "400"
              }
            },
            "type": "object",
            "default": {
              "value": "400"
            }
          },
          "medium": {
            "id": "#tokensConfig/fontWeight/medium",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/medium/value",
                "default": "500"
              }
            },
            "type": "object",
            "default": {
              "value": "500"
            }
          },
          "semibold": {
            "id": "#tokensConfig/fontWeight/semibold",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/semibold/value",
                "default": "600"
              }
            },
            "type": "object",
            "default": {
              "value": "600"
            }
          },
          "bold": {
            "id": "#tokensConfig/fontWeight/bold",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/bold/value",
                "default": "700"
              }
            },
            "type": "object",
            "default": {
              "value": "700"
            }
          },
          "extrabold": {
            "id": "#tokensConfig/fontWeight/extrabold",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/extrabold/value",
                "default": "800"
              }
            },
            "type": "object",
            "default": {
              "value": "800"
            }
          },
          "black": {
            "id": "#tokensConfig/fontWeight/black",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/black/value",
                "default": "900"
              }
            },
            "type": "object",
            "default": {
              "value": "900"
            }
          }
        },
        "type": "object",
        "default": {
          "thin": {
            "value": "100"
          },
          "extralight": {
            "value": "200"
          },
          "light": {
            "value": "300"
          },
          "normal": {
            "value": "400"
          },
          "medium": {
            "value": "500"
          },
          "semibold": {
            "value": "600"
          },
          "bold": {
            "value": "700"
          },
          "extrabold": {
            "value": "800"
          },
          "black": {
            "value": "900"
          }
        }
      },
      "fontSize": {
        "title": "Your website font sizes.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType font-size",
          "@studioIcon radix-icons:font-style"
        ],
        "id": "#tokensConfig/fontSize",
        "properties": {
          "xs": {
            "id": "#tokensConfig/fontSize/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/xs/value",
                "default": "0.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.75rem"
            }
          },
          "sm": {
            "id": "#tokensConfig/fontSize/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/sm/value",
                "default": "0.875rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.875rem"
            }
          },
          "base": {
            "id": "#tokensConfig/fontSize/base",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/base/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "lg": {
            "id": "#tokensConfig/fontSize/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/lg/value",
                "default": "1.125rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.125rem"
            }
          },
          "xl": {
            "id": "#tokensConfig/fontSize/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/xl/value",
                "default": "1.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25rem"
            }
          },
          "2xl": {
            "id": "#tokensConfig/fontSize/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/2xl/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "3xl": {
            "id": "#tokensConfig/fontSize/3xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/3xl/value",
                "default": "1.875rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.875rem"
            }
          },
          "4xl": {
            "id": "#tokensConfig/fontSize/4xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/4xl/value",
                "default": "2.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.25rem"
            }
          },
          "5xl": {
            "id": "#tokensConfig/fontSize/5xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/5xl/value",
                "default": "3rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3rem"
            }
          },
          "6xl": {
            "id": "#tokensConfig/fontSize/6xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/6xl/value",
                "default": "3.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3.75rem"
            }
          },
          "7xl": {
            "id": "#tokensConfig/fontSize/7xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/7xl/value",
                "default": "4.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "4.5rem"
            }
          },
          "8xl": {
            "id": "#tokensConfig/fontSize/8xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/8xl/value",
                "default": "6rem"
              }
            },
            "type": "object",
            "default": {
              "value": "6rem"
            }
          },
          "9xl": {
            "id": "#tokensConfig/fontSize/9xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/9xl/value",
                "default": "8rem"
              }
            },
            "type": "object",
            "default": {
              "value": "8rem"
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "value": "0.75rem"
          },
          "sm": {
            "value": "0.875rem"
          },
          "base": {
            "value": "1rem"
          },
          "lg": {
            "value": "1.125rem"
          },
          "xl": {
            "value": "1.25rem"
          },
          "2xl": {
            "value": "1.5rem"
          },
          "3xl": {
            "value": "1.875rem"
          },
          "4xl": {
            "value": "2.25rem"
          },
          "5xl": {
            "value": "3rem"
          },
          "6xl": {
            "value": "3.75rem"
          },
          "7xl": {
            "value": "4.5rem"
          },
          "8xl": {
            "value": "6rem"
          },
          "9xl": {
            "value": "8rem"
          }
        }
      },
      "letterSpacing": {
        "title": "Your website letter spacings.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType letter-spacing",
          "@studioIcon fluent:font-space-tracking-out-24-filled"
        ],
        "id": "#tokensConfig/letterSpacing",
        "properties": {
          "tighter": {
            "id": "#tokensConfig/letterSpacing/tighter",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/tighter/value",
                "default": "-0.05em"
              }
            },
            "type": "object",
            "default": {
              "value": "-0.05em"
            }
          },
          "tight": {
            "id": "#tokensConfig/letterSpacing/tight",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/tight/value",
                "default": "-0.025em"
              }
            },
            "type": "object",
            "default": {
              "value": "-0.025em"
            }
          },
          "normal": {
            "id": "#tokensConfig/letterSpacing/normal",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/normal/value",
                "default": "0em"
              }
            },
            "type": "object",
            "default": {
              "value": "0em"
            }
          },
          "wide": {
            "id": "#tokensConfig/letterSpacing/wide",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/wide/value",
                "default": "0.025em"
              }
            },
            "type": "object",
            "default": {
              "value": "0.025em"
            }
          },
          "wider": {
            "id": "#tokensConfig/letterSpacing/wider",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/wider/value",
                "default": "0.05em"
              }
            },
            "type": "object",
            "default": {
              "value": "0.05em"
            }
          },
          "widest": {
            "id": "#tokensConfig/letterSpacing/widest",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/widest/value",
                "default": "0.1em"
              }
            },
            "type": "object",
            "default": {
              "value": "0.1em"
            }
          }
        },
        "type": "object",
        "default": {
          "tighter": {
            "value": "-0.05em"
          },
          "tight": {
            "value": "-0.025em"
          },
          "normal": {
            "value": "0em"
          },
          "wide": {
            "value": "0.025em"
          },
          "wider": {
            "value": "0.05em"
          },
          "widest": {
            "value": "0.1em"
          }
        }
      },
      "lead": {
        "title": "Your website line heights.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon icon-park-outline:auto-line-height"
        ],
        "id": "#tokensConfig/lead",
        "properties": {
          "1": {
            "id": "#tokensConfig/lead/1",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/1/value",
                "default": ".025rem"
              }
            },
            "type": "object",
            "default": {
              "value": ".025rem"
            }
          },
          "2": {
            "id": "#tokensConfig/lead/2",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/2/value",
                "default": ".5rem"
              }
            },
            "type": "object",
            "default": {
              "value": ".5rem"
            }
          },
          "3": {
            "id": "#tokensConfig/lead/3",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/3/value",
                "default": ".75rem"
              }
            },
            "type": "object",
            "default": {
              "value": ".75rem"
            }
          },
          "4": {
            "id": "#tokensConfig/lead/4",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/4/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "5": {
            "id": "#tokensConfig/lead/5",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/5/value",
                "default": "1.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25rem"
            }
          },
          "6": {
            "id": "#tokensConfig/lead/6",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/6/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "7": {
            "id": "#tokensConfig/lead/7",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/7/value",
                "default": "1.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.75rem"
            }
          },
          "8": {
            "id": "#tokensConfig/lead/8",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/8/value",
                "default": "2rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2rem"
            }
          },
          "9": {
            "id": "#tokensConfig/lead/9",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/9/value",
                "default": "2.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.25rem"
            }
          },
          "10": {
            "id": "#tokensConfig/lead/10",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/10/value",
                "default": "2.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.5rem"
            }
          },
          "none": {
            "id": "#tokensConfig/lead/none",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/none/value",
                "default": "1"
              }
            },
            "type": "object",
            "default": {
              "value": "1"
            }
          },
          "tight": {
            "id": "#tokensConfig/lead/tight",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/tight/value",
                "default": "1.25"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25"
            }
          },
          "snug": {
            "id": "#tokensConfig/lead/snug",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/snug/value",
                "default": "1.375"
              }
            },
            "type": "object",
            "default": {
              "value": "1.375"
            }
          },
          "normal": {
            "id": "#tokensConfig/lead/normal",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/normal/value",
                "default": "1.5"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5"
            }
          },
          "relaxed": {
            "id": "#tokensConfig/lead/relaxed",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/relaxed/value",
                "default": "1.625"
              }
            },
            "type": "object",
            "default": {
              "value": "1.625"
            }
          },
          "loose": {
            "id": "#tokensConfig/lead/loose",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/loose/value",
                "default": "2"
              }
            },
            "type": "object",
            "default": {
              "value": "2"
            }
          }
        },
        "type": "object",
        "default": {
          "1": {
            "value": ".025rem"
          },
          "2": {
            "value": ".5rem"
          },
          "3": {
            "value": ".75rem"
          },
          "4": {
            "value": "1rem"
          },
          "5": {
            "value": "1.25rem"
          },
          "6": {
            "value": "1.5rem"
          },
          "7": {
            "value": "1.75rem"
          },
          "8": {
            "value": "2rem"
          },
          "9": {
            "value": "2.25rem"
          },
          "10": {
            "value": "2.5rem"
          },
          "none": {
            "value": "1"
          },
          "tight": {
            "value": "1.25"
          },
          "snug": {
            "value": "1.375"
          },
          "normal": {
            "value": "1.5"
          },
          "relaxed": {
            "value": "1.625"
          },
          "loose": {
            "value": "2"
          }
        }
      },
      "text": {
        "title": "Your website text scales.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType size",
          "@studioIcon material-symbols:format-size-rounded"
        ],
        "id": "#tokensConfig/text",
        "properties": {
          "xs": {
            "id": "#tokensConfig/text/xs",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/xs/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xs/fontSize/value",
                    "default": "{fontSize.xs}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.xs}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/xs/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xs/lineHeight/value",
                    "default": "{lead.4}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.4}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.xs}"
              },
              "lineHeight": {
                "value": "{lead.4}"
              }
            }
          },
          "sm": {
            "id": "#tokensConfig/text/sm",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/sm/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/sm/fontSize/value",
                    "default": "{fontSize.sm}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.sm}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/sm/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/sm/lineHeight/value",
                    "default": "{lead.5}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.5}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.sm}"
              },
              "lineHeight": {
                "value": "{lead.5}"
              }
            }
          },
          "base": {
            "id": "#tokensConfig/text/base",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/base/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/base/fontSize/value",
                    "default": "{fontSize.base}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.base}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/base/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/base/lineHeight/value",
                    "default": "{lead.6}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.6}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.base}"
              },
              "lineHeight": {
                "value": "{lead.6}"
              }
            }
          },
          "lg": {
            "id": "#tokensConfig/text/lg",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/lg/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/lg/fontSize/value",
                    "default": "{fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.lg}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/lg/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/lg/lineHeight/value",
                    "default": "{lead.7}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.7}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.lg}"
              },
              "lineHeight": {
                "value": "{lead.7}"
              }
            }
          },
          "xl": {
            "id": "#tokensConfig/text/xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xl/fontSize/value",
                    "default": "{fontSize.xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xl/lineHeight/value",
                    "default": "{lead.7}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.7}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.xl}"
              },
              "lineHeight": {
                "value": "{lead.7}"
              }
            }
          },
          "2xl": {
            "id": "#tokensConfig/text/2xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/2xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/2xl/fontSize/value",
                    "default": "{fontSize.2xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.2xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/2xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/2xl/lineHeight/value",
                    "default": "{lead.8}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.8}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.2xl}"
              },
              "lineHeight": {
                "value": "{lead.8}"
              }
            }
          },
          "3xl": {
            "id": "#tokensConfig/text/3xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/3xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/3xl/fontSize/value",
                    "default": "{fontSize.3xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.3xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/3xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/3xl/lineHeight/value",
                    "default": "{lead.9}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.9}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.3xl}"
              },
              "lineHeight": {
                "value": "{lead.9}"
              }
            }
          },
          "4xl": {
            "id": "#tokensConfig/text/4xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/4xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/4xl/fontSize/value",
                    "default": "{fontSize.4xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.4xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/4xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/4xl/lineHeight/value",
                    "default": "{lead.10}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.10}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.4xl}"
              },
              "lineHeight": {
                "value": "{lead.10}"
              }
            }
          },
          "5xl": {
            "id": "#tokensConfig/text/5xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/5xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/5xl/fontSize/value",
                    "default": "{fontSize.5xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.5xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/5xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/5xl/lineHeight/value",
                    "default": "{lead.none}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.none}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.5xl}"
              },
              "lineHeight": {
                "value": "{lead.none}"
              }
            }
          },
          "6xl": {
            "id": "#tokensConfig/text/6xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/6xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/6xl/fontSize/value",
                    "default": "{fontSize.6xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.6xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/6xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/6xl/lineHeight/value",
                    "default": "{lead.none}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.none}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.6xl}"
              },
              "lineHeight": {
                "value": "{lead.none}"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "fontSize": {
              "value": "{fontSize.xs}"
            },
            "lineHeight": {
              "value": "{lead.4}"
            }
          },
          "sm": {
            "fontSize": {
              "value": "{fontSize.sm}"
            },
            "lineHeight": {
              "value": "{lead.5}"
            }
          },
          "base": {
            "fontSize": {
              "value": "{fontSize.base}"
            },
            "lineHeight": {
              "value": "{lead.6}"
            }
          },
          "lg": {
            "fontSize": {
              "value": "{fontSize.lg}"
            },
            "lineHeight": {
              "value": "{lead.7}"
            }
          },
          "xl": {
            "fontSize": {
              "value": "{fontSize.xl}"
            },
            "lineHeight": {
              "value": "{lead.7}"
            }
          },
          "2xl": {
            "fontSize": {
              "value": "{fontSize.2xl}"
            },
            "lineHeight": {
              "value": "{lead.8}"
            }
          },
          "3xl": {
            "fontSize": {
              "value": "{fontSize.3xl}"
            },
            "lineHeight": {
              "value": "{lead.9}"
            }
          },
          "4xl": {
            "fontSize": {
              "value": "{fontSize.4xl}"
            },
            "lineHeight": {
              "value": "{lead.10}"
            }
          },
          "5xl": {
            "fontSize": {
              "value": "{fontSize.5xl}"
            },
            "lineHeight": {
              "value": "{lead.none}"
            }
          },
          "6xl": {
            "fontSize": {
              "value": "{fontSize.6xl}"
            },
            "lineHeight": {
              "value": "{lead.none}"
            }
          }
        }
      },
      "elements": {
        "title": "All the configurable tokens for your Elements.",
        "tags": [
          "@studioIcon uiw:component"
        ],
        "id": "#tokensConfig/elements",
        "properties": {
          "text": {
            "id": "#tokensConfig/elements/text",
            "properties": {
              "primary": {
                "id": "#tokensConfig/elements/text/primary",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/text/primary/color",
                    "properties": {
                      "static": {
                        "id": "#tokensConfig/elements/text/primary/color/static",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/text/primary/color/static/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/text/primary/color/static/value/initial",
                                "default": "{color.gray.900}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/text/primary/color/static/value/dark",
                                "default": "{color.gray.50}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.gray.900}",
                              "dark": "{color.gray.50}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.gray.900}",
                            "dark": "{color.gray.50}"
                          }
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/elements/text/primary/color/hover",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "static": {
                        "value": {
                          "initial": "{color.gray.900}",
                          "dark": "{color.gray.50}"
                        }
                      },
                      "hover": {}
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "static": {
                      "value": {
                        "initial": "{color.gray.900}",
                        "dark": "{color.gray.50}"
                      }
                    },
                    "hover": {}
                  }
                }
              },
              "secondary": {
                "id": "#tokensConfig/elements/text/secondary",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/text/secondary/color",
                    "properties": {
                      "static": {
                        "id": "#tokensConfig/elements/text/secondary/color/static",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/text/secondary/color/static/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/text/secondary/color/static/value/initial",
                                "default": "{color.gray.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/text/secondary/color/static/value/dark",
                                "default": "{color.gray.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.gray.500}",
                              "dark": "{color.gray.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.gray.500}",
                            "dark": "{color.gray.400}"
                          }
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/elements/text/secondary/color/hover",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/text/secondary/color/hover/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/text/secondary/color/hover/value/initial",
                                "default": "{color.gray.700}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/text/secondary/color/hover/value/dark",
                                "default": "{color.gray.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.gray.700}",
                              "dark": "{color.gray.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.gray.700}",
                            "dark": "{color.gray.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "static": {
                        "value": {
                          "initial": "{color.gray.500}",
                          "dark": "{color.gray.400}"
                        }
                      },
                      "hover": {
                        "value": {
                          "initial": "{color.gray.700}",
                          "dark": "{color.gray.200}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "static": {
                      "value": {
                        "initial": "{color.gray.500}",
                        "dark": "{color.gray.400}"
                      }
                    },
                    "hover": {
                      "value": {
                        "initial": "{color.gray.700}",
                        "dark": "{color.gray.200}"
                      }
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "color": {
                  "static": {
                    "value": {
                      "initial": "{color.gray.900}",
                      "dark": "{color.gray.50}"
                    }
                  },
                  "hover": {}
                }
              },
              "secondary": {
                "color": {
                  "static": {
                    "value": {
                      "initial": "{color.gray.500}",
                      "dark": "{color.gray.400}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "{color.gray.700}",
                      "dark": "{color.gray.200}"
                    }
                  }
                }
              }
            }
          },
          "container": {
            "title": "Main container sizings.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType size",
              "@studioIcon material-symbols:width-full-outline"
            ],
            "id": "#tokensConfig/elements/container",
            "properties": {
              "maxWidth": {
                "id": "#tokensConfig/elements/container/maxWidth",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/elements/container/maxWidth/value",
                    "default": "80rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "80rem"
                }
              },
              "padding": {
                "id": "#tokensConfig/elements/container/padding",
                "properties": {
                  "mobile": {
                    "id": "#tokensConfig/elements/container/padding/mobile",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/mobile/value",
                        "default": "{space.4}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.4}"
                    }
                  },
                  "xs": {
                    "id": "#tokensConfig/elements/container/padding/xs",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/xs/value",
                        "default": "{space.4}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.4}"
                    }
                  },
                  "sm": {
                    "id": "#tokensConfig/elements/container/padding/sm",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/sm/value",
                        "default": "{space.6}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.6}"
                    }
                  },
                  "md": {
                    "id": "#tokensConfig/elements/container/padding/md",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/md/value",
                        "default": "{space.6}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.6}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "mobile": {
                    "value": "{space.4}"
                  },
                  "xs": {
                    "value": "{space.4}"
                  },
                  "sm": {
                    "value": "{space.6}"
                  },
                  "md": {
                    "value": "{space.6}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "maxWidth": {
                "value": "80rem"
              },
              "padding": {
                "mobile": {
                  "value": "{space.4}"
                },
                "xs": {
                  "value": "{space.4}"
                },
                "sm": {
                  "value": "{space.6}"
                },
                "md": {
                  "value": "{space.6}"
                }
              }
            }
          },
          "backdrop": {
            "title": "Backdrops used in Elements.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType size",
              "@studioIcon material-symbols:blur-circular"
            ],
            "id": "#tokensConfig/elements/backdrop",
            "properties": {
              "filter": {
                "id": "#tokensConfig/elements/backdrop/filter",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/elements/backdrop/filter/value",
                    "default": "saturate(200%) blur(20px)"
                  }
                },
                "type": "object",
                "default": {
                  "value": "saturate(200%) blur(20px)"
                }
              },
              "background": {
                "id": "#tokensConfig/elements/backdrop/background",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/elements/backdrop/background/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/elements/backdrop/background/value/initial",
                        "default": "#fffc"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/elements/backdrop/background/value/dark",
                        "default": "#0c0d0ccc"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "#fffc",
                      "dark": "#0c0d0ccc"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "#fffc",
                    "dark": "#0c0d0ccc"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "filter": {
                "value": "saturate(200%) blur(20px)"
              },
              "background": {
                "value": {
                  "initial": "#fffc",
                  "dark": "#0c0d0ccc"
                }
              }
            }
          },
          "border": {
            "title": "Borders used in Elements.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType color",
              "@studioIcon material-symbols:border-all-outline-rounded"
            ],
            "id": "#tokensConfig/elements/border",
            "properties": {
              "primary": {
                "id": "#tokensConfig/elements/border/primary",
                "properties": {
                  "static": {
                    "id": "#tokensConfig/elements/border/primary/static",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/primary/static/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/static/value/initial",
                            "default": "{color.gray.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/static/value/dark",
                            "default": "{color.gray.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.100}",
                          "dark": "{color.gray.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.100}",
                        "dark": "{color.gray.900}"
                      }
                    }
                  },
                  "hover": {
                    "id": "#tokensConfig/elements/border/primary/hover",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/primary/hover/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/hover/value/initial",
                            "default": "{color.gray.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/hover/value/dark",
                            "default": "{color.gray.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.200}",
                          "dark": "{color.gray.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.200}",
                        "dark": "{color.gray.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "static": {
                    "value": {
                      "initial": "{color.gray.100}",
                      "dark": "{color.gray.900}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "{color.gray.200}",
                      "dark": "{color.gray.800}"
                    }
                  }
                }
              },
              "secondary": {
                "id": "#tokensConfig/elements/border/secondary",
                "properties": {
                  "static": {
                    "id": "#tokensConfig/elements/border/secondary/static",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/secondary/static/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/static/value/initial",
                            "default": "{color.gray.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/static/value/dark",
                            "default": "{color.gray.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.200}",
                          "dark": "{color.gray.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.200}",
                        "dark": "{color.gray.800}"
                      }
                    }
                  },
                  "hover": {
                    "id": "#tokensConfig/elements/border/secondary/hover",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/secondary/hover/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/hover/value/initial",
                            "default": ""
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/hover/value/dark",
                            "default": ""
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "",
                          "dark": ""
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "",
                        "dark": ""
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "static": {
                    "value": {
                      "initial": "{color.gray.200}",
                      "dark": "{color.gray.800}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "",
                      "dark": ""
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "static": {
                  "value": {
                    "initial": "{color.gray.100}",
                    "dark": "{color.gray.900}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "{color.gray.200}",
                    "dark": "{color.gray.800}"
                  }
                }
              },
              "secondary": {
                "static": {
                  "value": {
                    "initial": "{color.gray.200}",
                    "dark": "{color.gray.800}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "",
                    "dark": ""
                  }
                }
              }
            }
          },
          "surface": {
            "title": "Surfaces used in Elements.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType color",
              "@studioIcon fluent:surface-hub-20-filled"
            ],
            "id": "#tokensConfig/elements/surface",
            "properties": {
              "background": {
                "id": "#tokensConfig/elements/surface/background",
                "properties": {
                  "base": {
                    "id": "#tokensConfig/elements/surface/background/base",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/surface/background/base/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/background/base/value/initial",
                            "default": "{color.gray.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/background/base/value/dark",
                            "default": "{color.gray.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.100}",
                          "dark": "{color.gray.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.100}",
                        "dark": "{color.gray.900}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "base": {
                    "value": {
                      "initial": "{color.gray.100}",
                      "dark": "{color.gray.900}"
                    }
                  }
                }
              },
              "primary": {
                "id": "#tokensConfig/elements/surface/primary",
                "properties": {
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/surface/primary/backgroundColor",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/surface/primary/backgroundColor/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/primary/backgroundColor/value/initial",
                            "default": "{color.gray.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/primary/backgroundColor/value/dark",
                            "default": "{color.gray.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.100}",
                          "dark": "{color.gray.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.100}",
                        "dark": "{color.gray.900}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "backgroundColor": {
                    "value": {
                      "initial": "{color.gray.100}",
                      "dark": "{color.gray.900}"
                    }
                  }
                }
              },
              "secondary": {
                "id": "#tokensConfig/elements/surface/secondary",
                "properties": {
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/surface/secondary/backgroundColor",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/surface/secondary/backgroundColor/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/secondary/backgroundColor/value/initial",
                            "default": "{color.gray.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/secondary/backgroundColor/value/dark",
                            "default": "{color.gray.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.200}",
                          "dark": "{color.gray.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.200}",
                        "dark": "{color.gray.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "backgroundColor": {
                    "value": {
                      "initial": "{color.gray.200}",
                      "dark": "{color.gray.800}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "background": {
                "base": {
                  "value": {
                    "initial": "{color.gray.100}",
                    "dark": "{color.gray.900}"
                  }
                }
              },
              "primary": {
                "backgroundColor": {
                  "value": {
                    "initial": "{color.gray.100}",
                    "dark": "{color.gray.900}"
                  }
                }
              },
              "secondary": {
                "backgroundColor": {
                  "value": {
                    "initial": "{color.gray.200}",
                    "dark": "{color.gray.800}"
                  }
                }
              }
            }
          },
          "state": {
            "title": "Color states used in Elements.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType color",
              "@studioIcon mdi:palette-advanced"
            ],
            "id": "#tokensConfig/elements/state",
            "properties": {
              "primary": {
                "id": "#tokensConfig/elements/state/primary",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/primary/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/primary/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/primary/value/initial",
                                "default": "{color.primary.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/primary/value/dark",
                                "default": "{color.primary.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.600}",
                              "dark": "{color.primary.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.600}",
                            "dark": "{color.primary.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/primary/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/secondary/value/initial",
                                "default": "{color.primary.700}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/secondary/value/dark",
                                "default": "{color.primary.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.700}",
                              "dark": "{color.primary.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.700}",
                            "dark": "{color.primary.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.primary.600}",
                          "dark": "{color.primary.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.primary.700}",
                          "dark": "{color.primary.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/primary/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/primary/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/primary/value/initial",
                                "default": "{color.primary.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/primary/value/dark",
                                "default": "{color.primary.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.50}",
                              "dark": "{color.primary.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.50}",
                            "dark": "{color.primary.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary/value/initial",
                                "default": "{color.primary.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary/value/dark",
                                "default": "{color.primary.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.100}",
                              "dark": "{color.primary.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.100}",
                            "dark": "{color.primary.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.primary.50}",
                          "dark": "{color.primary.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.primary.100}",
                          "dark": "{color.primary.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/primary/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/primary/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/borderColor/primary/value/initial",
                                "default": "{color.primary.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/borderColor/primary/value/dark",
                                "default": "{color.primary.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.100}",
                              "dark": "{color.primary.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.100}",
                            "dark": "{color.primary.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/primary/borderColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/borderColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/borderColor/secondary/value/initial",
                                "default": "{color.primary.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/borderColor/secondary/value/dark",
                                "default": "{color.primary.700}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.200}",
                              "dark": "{color.primary.700}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.200}",
                            "dark": "{color.primary.700}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.primary.100}",
                          "dark": "{color.primary.800}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.primary.200}",
                          "dark": "{color.primary.700}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.primary.600}",
                        "dark": "{color.primary.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.primary.700}",
                        "dark": "{color.primary.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.primary.50}",
                        "dark": "{color.primary.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.primary.100}",
                        "dark": "{color.primary.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.primary.100}",
                        "dark": "{color.primary.800}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.primary.200}",
                        "dark": "{color.primary.700}"
                      }
                    }
                  }
                }
              },
              "info": {
                "id": "#tokensConfig/elements/state/info",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/info/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/info/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/primary/value/initial",
                                "default": "{color.blue.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/primary/value/dark",
                                "default": "{color.blue.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.500}",
                              "dark": "{color.blue.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.500}",
                            "dark": "{color.blue.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/info/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/secondary/value/initial",
                                "default": "{color.blue.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/secondary/value/dark",
                                "default": "{color.blue.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.600}",
                              "dark": "{color.blue.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.600}",
                            "dark": "{color.blue.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.blue.500}",
                          "dark": "{color.blue.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.blue.600}",
                          "dark": "{color.blue.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/info/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/info/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/primary/value/initial",
                                "default": "{color.blue.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/primary/value/dark",
                                "default": "{color.blue.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.50}",
                              "dark": "{color.blue.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.50}",
                            "dark": "{color.blue.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/info/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/secondary/value/initial",
                                "default": "{color.blue.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/secondary/value/dark",
                                "default": "{color.blue.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.100}",
                              "dark": "{color.blue.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.100}",
                            "dark": "{color.blue.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.blue.50}",
                          "dark": "{color.blue.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.blue.100}",
                          "dark": "{color.blue.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/info/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/info/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/borderColor/primary/value/initial",
                                "default": "{color.blue.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/borderColor/primary/value/dark",
                                "default": "{color.blue.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.100}",
                              "dark": "{color.blue.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.100}",
                            "dark": "{color.blue.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/info/borderColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/borderColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/borderColor/secondary/value/initial",
                                "default": "{color.blue.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/borderColor/secondary/value/dark",
                                "default": "{color.blue.700}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.200}",
                              "dark": "{color.blue.700}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.200}",
                            "dark": "{color.blue.700}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.blue.100}",
                          "dark": "{color.blue.800}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.blue.200}",
                          "dark": "{color.blue.700}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.blue.500}",
                        "dark": "{color.blue.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.blue.600}",
                        "dark": "{color.blue.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.blue.50}",
                        "dark": "{color.blue.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.blue.100}",
                        "dark": "{color.blue.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.blue.100}",
                        "dark": "{color.blue.800}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.blue.200}",
                        "dark": "{color.blue.700}"
                      }
                    }
                  }
                }
              },
              "success": {
                "id": "#tokensConfig/elements/state/success",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/success/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/success/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/primary/value/initial",
                                "default": "{color.green.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/primary/value/dark",
                                "default": "{color.green.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.500}",
                              "dark": "{color.green.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.500}",
                            "dark": "{color.green.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/success/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/secondary/value/initial",
                                "default": "{color.green.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/secondary/value/dark",
                                "default": "{color.green.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.600}",
                              "dark": "{color.green.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.600}",
                            "dark": "{color.green.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.green.500}",
                          "dark": "{color.green.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.green.600}",
                          "dark": "{color.green.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/success/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/success/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/primary/value/initial",
                                "default": "{color.green.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/primary/value/dark",
                                "default": "{color.green.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.50}",
                              "dark": "{color.green.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.50}",
                            "dark": "{color.green.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/success/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/secondary/value/initial",
                                "default": "{color.green.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/secondary/value/dark",
                                "default": "{color.green.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.100}",
                              "dark": "{color.green.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.100}",
                            "dark": "{color.green.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.green.50}",
                          "dark": "{color.green.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.green.100}",
                          "dark": "{color.green.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/success/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/success/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/borderColor/primary/value/initial",
                                "default": "{color.green.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/borderColor/primary/value/dark",
                                "default": "{color.green.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.100}",
                              "dark": "{color.green.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.100}",
                            "dark": "{color.green.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/success/borderColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/borderColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/borderColor/secondary/value/initial",
                                "default": "{color.green.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/borderColor/secondary/value/dark",
                                "default": "{color.green.700}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.200}",
                              "dark": "{color.green.700}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.200}",
                            "dark": "{color.green.700}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.green.100}",
                          "dark": "{color.green.800}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.green.200}",
                          "dark": "{color.green.700}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.green.500}",
                        "dark": "{color.green.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.green.600}",
                        "dark": "{color.green.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.green.50}",
                        "dark": "{color.green.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.green.100}",
                        "dark": "{color.green.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.green.100}",
                        "dark": "{color.green.800}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.green.200}",
                        "dark": "{color.green.700}"
                      }
                    }
                  }
                }
              },
              "warning": {
                "id": "#tokensConfig/elements/state/warning",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/warning/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/warning/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/primary/value/initial",
                                "default": "{color.yellow.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/primary/value/dark",
                                "default": "{color.yellow.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.600}",
                              "dark": "{color.yellow.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.600}",
                            "dark": "{color.yellow.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/warning/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/secondary/value/initial",
                                "default": "{color.yellow.700}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/secondary/value/dark",
                                "default": "{color.yellow.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.700}",
                              "dark": "{color.yellow.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.700}",
                            "dark": "{color.yellow.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.yellow.600}",
                          "dark": "{color.yellow.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.yellow.700}",
                          "dark": "{color.yellow.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/warning/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/warning/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/primary/value/initial",
                                "default": "{color.yellow.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/primary/value/dark",
                                "default": "{color.yellow.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.50}",
                              "dark": "{color.yellow.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.50}",
                            "dark": "{color.yellow.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary/value/initial",
                                "default": "{color.yellow.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary/value/dark",
                                "default": "{color.yellow.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.100}",
                              "dark": "{color.yellow.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.100}",
                            "dark": "{color.yellow.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.yellow.50}",
                          "dark": "{color.yellow.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.yellow.100}",
                          "dark": "{color.yellow.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/warning/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/warning/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/borderColor/primary/value/initial",
                                "default": "{color.yellow.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/borderColor/primary/value/dark",
                                "default": "{color.yellow.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.100}",
                              "dark": "{color.yellow.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.100}",
                            "dark": "{color.yellow.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/warning/borderColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/borderColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/borderColor/secondary/value/initial",
                                "default": "{color.yellow.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/borderColor/secondary/value/dark",
                                "default": "{color.yellow.700}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.200}",
                              "dark": "{color.yellow.700}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.200}",
                            "dark": "{color.yellow.700}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.yellow.100}",
                          "dark": "{color.yellow.800}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.yellow.200}",
                          "dark": "{color.yellow.700}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.yellow.600}",
                        "dark": "{color.yellow.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.yellow.700}",
                        "dark": "{color.yellow.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.yellow.50}",
                        "dark": "{color.yellow.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.yellow.100}",
                        "dark": "{color.yellow.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.yellow.100}",
                        "dark": "{color.yellow.800}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.yellow.200}",
                        "dark": "{color.yellow.700}"
                      }
                    }
                  }
                }
              },
              "danger": {
                "id": "#tokensConfig/elements/state/danger",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/danger/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/danger/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/primary/value/initial",
                                "default": "{color.red.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/primary/value/dark",
                                "default": "{color.red.300}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.500}",
                              "dark": "{color.red.300}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.500}",
                            "dark": "{color.red.300}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/danger/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/secondary/value/initial",
                                "default": "{color.red.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/secondary/value/dark",
                                "default": "{color.red.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.600}",
                              "dark": "{color.red.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.600}",
                            "dark": "{color.red.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.red.500}",
                          "dark": "{color.red.300}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.red.600}",
                          "dark": "{color.red.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/danger/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/danger/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/primary/value/initial",
                                "default": "{color.red.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/primary/value/dark",
                                "default": "{color.red.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.50}",
                              "dark": "{color.red.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.50}",
                            "dark": "{color.red.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary/value/initial",
                                "default": "{color.red.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary/value/dark",
                                "default": "{color.red.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.100}",
                              "dark": "{color.red.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.100}",
                            "dark": "{color.red.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.red.50}",
                          "dark": "{color.red.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.red.100}",
                          "dark": "{color.red.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/danger/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/danger/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/borderColor/primary/value/initial",
                                "default": "{color.red.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/borderColor/primary/value/dark",
                                "default": "{color.red.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.100}",
                              "dark": "{color.red.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.100}",
                            "dark": "{color.red.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/danger/borderColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/borderColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/borderColor/secondary/value/initial",
                                "default": "{color.red.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/borderColor/secondary/value/dark",
                                "default": "{color.red.700}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.200}",
                              "dark": "{color.red.700}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.200}",
                            "dark": "{color.red.700}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.red.100}",
                          "dark": "{color.red.800}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.red.200}",
                          "dark": "{color.red.700}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.red.500}",
                        "dark": "{color.red.300}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.red.600}",
                        "dark": "{color.red.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.red.50}",
                        "dark": "{color.red.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.red.100}",
                        "dark": "{color.red.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.red.100}",
                        "dark": "{color.red.800}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.red.200}",
                        "dark": "{color.red.700}"
                      }
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.primary.600}",
                      "dark": "{color.primary.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.primary.700}",
                      "dark": "{color.primary.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.primary.50}",
                      "dark": "{color.primary.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.primary.100}",
                      "dark": "{color.primary.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.primary.100}",
                      "dark": "{color.primary.800}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.primary.200}",
                      "dark": "{color.primary.700}"
                    }
                  }
                }
              },
              "info": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.blue.500}",
                      "dark": "{color.blue.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.blue.600}",
                      "dark": "{color.blue.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.blue.50}",
                      "dark": "{color.blue.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.blue.100}",
                      "dark": "{color.blue.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.blue.100}",
                      "dark": "{color.blue.800}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.blue.200}",
                      "dark": "{color.blue.700}"
                    }
                  }
                }
              },
              "success": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.green.500}",
                      "dark": "{color.green.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.green.600}",
                      "dark": "{color.green.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.green.50}",
                      "dark": "{color.green.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.green.100}",
                      "dark": "{color.green.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.green.100}",
                      "dark": "{color.green.800}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.green.200}",
                      "dark": "{color.green.700}"
                    }
                  }
                }
              },
              "warning": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.yellow.600}",
                      "dark": "{color.yellow.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.yellow.700}",
                      "dark": "{color.yellow.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.yellow.50}",
                      "dark": "{color.yellow.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.yellow.100}",
                      "dark": "{color.yellow.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.yellow.100}",
                      "dark": "{color.yellow.800}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.yellow.200}",
                      "dark": "{color.yellow.700}"
                    }
                  }
                }
              },
              "danger": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.red.500}",
                      "dark": "{color.red.300}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.red.600}",
                      "dark": "{color.red.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.red.50}",
                      "dark": "{color.red.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.red.100}",
                      "dark": "{color.red.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.red.100}",
                      "dark": "{color.red.800}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.red.200}",
                      "dark": "{color.red.700}"
                    }
                  }
                }
              }
            }
          }
        },
        "type": "object",
        "default": {
          "text": {
            "primary": {
              "color": {
                "static": {
                  "value": {
                    "initial": "{color.gray.900}",
                    "dark": "{color.gray.50}"
                  }
                },
                "hover": {}
              }
            },
            "secondary": {
              "color": {
                "static": {
                  "value": {
                    "initial": "{color.gray.500}",
                    "dark": "{color.gray.400}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "{color.gray.700}",
                    "dark": "{color.gray.200}"
                  }
                }
              }
            }
          },
          "container": {
            "maxWidth": {
              "value": "80rem"
            },
            "padding": {
              "mobile": {
                "value": "{space.4}"
              },
              "xs": {
                "value": "{space.4}"
              },
              "sm": {
                "value": "{space.6}"
              },
              "md": {
                "value": "{space.6}"
              }
            }
          },
          "backdrop": {
            "filter": {
              "value": "saturate(200%) blur(20px)"
            },
            "background": {
              "value": {
                "initial": "#fffc",
                "dark": "#0c0d0ccc"
              }
            }
          },
          "border": {
            "primary": {
              "static": {
                "value": {
                  "initial": "{color.gray.100}",
                  "dark": "{color.gray.900}"
                }
              },
              "hover": {
                "value": {
                  "initial": "{color.gray.200}",
                  "dark": "{color.gray.800}"
                }
              }
            },
            "secondary": {
              "static": {
                "value": {
                  "initial": "{color.gray.200}",
                  "dark": "{color.gray.800}"
                }
              },
              "hover": {
                "value": {
                  "initial": "",
                  "dark": ""
                }
              }
            }
          },
          "surface": {
            "background": {
              "base": {
                "value": {
                  "initial": "{color.gray.100}",
                  "dark": "{color.gray.900}"
                }
              }
            },
            "primary": {
              "backgroundColor": {
                "value": {
                  "initial": "{color.gray.100}",
                  "dark": "{color.gray.900}"
                }
              }
            },
            "secondary": {
              "backgroundColor": {
                "value": {
                  "initial": "{color.gray.200}",
                  "dark": "{color.gray.800}"
                }
              }
            }
          },
          "state": {
            "primary": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.primary.600}",
                    "dark": "{color.primary.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.primary.700}",
                    "dark": "{color.primary.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.primary.50}",
                    "dark": "{color.primary.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.primary.100}",
                    "dark": "{color.primary.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.primary.100}",
                    "dark": "{color.primary.800}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.primary.200}",
                    "dark": "{color.primary.700}"
                  }
                }
              }
            },
            "info": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.blue.500}",
                    "dark": "{color.blue.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.blue.600}",
                    "dark": "{color.blue.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.blue.50}",
                    "dark": "{color.blue.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.blue.100}",
                    "dark": "{color.blue.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.blue.100}",
                    "dark": "{color.blue.800}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.blue.200}",
                    "dark": "{color.blue.700}"
                  }
                }
              }
            },
            "success": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.green.500}",
                    "dark": "{color.green.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.green.600}",
                    "dark": "{color.green.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.green.50}",
                    "dark": "{color.green.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.green.100}",
                    "dark": "{color.green.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.green.100}",
                    "dark": "{color.green.800}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.green.200}",
                    "dark": "{color.green.700}"
                  }
                }
              }
            },
            "warning": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.yellow.600}",
                    "dark": "{color.yellow.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.yellow.700}",
                    "dark": "{color.yellow.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.yellow.50}",
                    "dark": "{color.yellow.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.yellow.100}",
                    "dark": "{color.yellow.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.yellow.100}",
                    "dark": "{color.yellow.800}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.yellow.200}",
                    "dark": "{color.yellow.700}"
                  }
                }
              }
            },
            "danger": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.red.500}",
                    "dark": "{color.red.300}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.red.600}",
                    "dark": "{color.red.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.red.50}",
                    "dark": "{color.red.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.red.100}",
                    "dark": "{color.red.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.red.100}",
                    "dark": "{color.red.800}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.red.200}",
                    "dark": "{color.red.700}"
                  }
                }
              }
            }
          }
        }
      },
      "typography": {
        "title": "All the configurable tokens for your Typography.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType color",
          "@studioIcon material-symbols:article"
        ],
        "id": "#tokensConfig/typography",
        "properties": {
          "body": {
            "id": "#tokensConfig/typography/body",
            "properties": {
              "color": {
                "id": "#tokensConfig/typography/body/color",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/typography/body/color/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/typography/body/color/value/initial",
                        "default": "{color.black}"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/typography/body/color/value/dark",
                        "default": "{color.white}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "{color.black}",
                      "dark": "{color.white}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "{color.black}",
                    "dark": "{color.white}"
                  }
                }
              },
              "backgroundColor": {
                "id": "#tokensConfig/typography/body/backgroundColor",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/typography/body/backgroundColor/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/typography/body/backgroundColor/value/initial",
                        "default": "{color.white}"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/typography/body/backgroundColor/value/dark",
                        "default": "{color.black}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "{color.white}",
                      "dark": "{color.black}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "{color.white}",
                    "dark": "{color.black}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "color": {
                "value": {
                  "initial": "{color.black}",
                  "dark": "{color.white}"
                }
              },
              "backgroundColor": {
                "value": {
                  "initial": "{color.white}",
                  "dark": "{color.black}"
                }
              }
            }
          },
          "verticalMargin": {
            "title": "Vertical spacings between paragraphs.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType size",
              "@studioIcon mingcute:line-height-line"
            ],
            "id": "#tokensConfig/typography/verticalMargin",
            "properties": {
              "sm": {
                "id": "#tokensConfig/typography/verticalMargin/sm",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/verticalMargin/sm/value",
                    "default": "16px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "16px"
                }
              },
              "base": {
                "id": "#tokensConfig/typography/verticalMargin/base",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/verticalMargin/base/value",
                    "default": "24px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "24px"
                }
              }
            },
            "type": "object",
            "default": {
              "sm": {
                "value": "16px"
              },
              "base": {
                "value": "24px"
              }
            }
          },
          "letterSpacing": {
            "title": "Horizontal spacings between letters.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType size",
              "@studioIcon mingcute:letter-spacing-line"
            ],
            "id": "#tokensConfig/typography/letterSpacing",
            "properties": {
              "tight": {
                "id": "#tokensConfig/typography/letterSpacing/tight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/letterSpacing/tight/value",
                    "default": "-0.025em"
                  }
                },
                "type": "object",
                "default": {
                  "value": "-0.025em"
                }
              },
              "wide": {
                "id": "#tokensConfig/typography/letterSpacing/wide",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/letterSpacing/wide/value",
                    "default": "0.025em"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.025em"
                }
              }
            },
            "type": "object",
            "default": {
              "tight": {
                "value": "-0.025em"
              },
              "wide": {
                "value": "0.025em"
              }
            }
          },
          "fontSize": {
            "title": "Horizontal spacings between letters.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType font-size",
              "@studioIcon mingcute:font-size-fill"
            ],
            "id": "#tokensConfig/typography/fontSize",
            "properties": {
              "xs": {
                "id": "#tokensConfig/typography/fontSize/xs",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/xs/value",
                    "default": "12px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "12px"
                }
              },
              "sm": {
                "id": "#tokensConfig/typography/fontSize/sm",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/sm/value",
                    "default": "14px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "14px"
                }
              },
              "base": {
                "id": "#tokensConfig/typography/fontSize/base",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/base/value",
                    "default": "16px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "16px"
                }
              },
              "lg": {
                "id": "#tokensConfig/typography/fontSize/lg",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/lg/value",
                    "default": "18px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "18px"
                }
              },
              "xl": {
                "id": "#tokensConfig/typography/fontSize/xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/xl/value",
                    "default": "20px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "20px"
                }
              },
              "2xl": {
                "id": "#tokensConfig/typography/fontSize/2xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/2xl/value",
                    "default": "24px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "24px"
                }
              },
              "3xl": {
                "id": "#tokensConfig/typography/fontSize/3xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/3xl/value",
                    "default": "30px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "30px"
                }
              },
              "4xl": {
                "id": "#tokensConfig/typography/fontSize/4xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/4xl/value",
                    "default": "36px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "36px"
                }
              },
              "5xl": {
                "id": "#tokensConfig/typography/fontSize/5xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/5xl/value",
                    "default": "48px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "48px"
                }
              },
              "6xl": {
                "id": "#tokensConfig/typography/fontSize/6xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/6xl/value",
                    "default": "60px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "60px"
                }
              },
              "7xl": {
                "id": "#tokensConfig/typography/fontSize/7xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/7xl/value",
                    "default": "72px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "72px"
                }
              },
              "8xl": {
                "id": "#tokensConfig/typography/fontSize/8xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/8xl/value",
                    "default": "96px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "96px"
                }
              },
              "9xl": {
                "id": "#tokensConfig/typography/fontSize/9xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/9xl/value",
                    "default": "128px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "128px"
                }
              }
            },
            "type": "object",
            "default": {
              "xs": {
                "value": "12px"
              },
              "sm": {
                "value": "14px"
              },
              "base": {
                "value": "16px"
              },
              "lg": {
                "value": "18px"
              },
              "xl": {
                "value": "20px"
              },
              "2xl": {
                "value": "24px"
              },
              "3xl": {
                "value": "30px"
              },
              "4xl": {
                "value": "36px"
              },
              "5xl": {
                "value": "48px"
              },
              "6xl": {
                "value": "60px"
              },
              "7xl": {
                "value": "72px"
              },
              "8xl": {
                "value": "96px"
              },
              "9xl": {
                "value": "128px"
              }
            }
          },
          "fontWeight": {
            "title": "Font weights used in typography.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType font-size",
              "@studioIcon mingcute:bold-fill"
            ],
            "id": "#tokensConfig/typography/fontWeight",
            "properties": {
              "thin": {
                "id": "#tokensConfig/typography/fontWeight/thin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/thin/value",
                    "default": "100"
                  }
                },
                "type": "object",
                "default": {
                  "value": "100"
                }
              },
              "extralight": {
                "id": "#tokensConfig/typography/fontWeight/extralight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/extralight/value",
                    "default": "200"
                  }
                },
                "type": "object",
                "default": {
                  "value": "200"
                }
              },
              "light": {
                "id": "#tokensConfig/typography/fontWeight/light",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/light/value",
                    "default": "300"
                  }
                },
                "type": "object",
                "default": {
                  "value": "300"
                }
              },
              "normal": {
                "id": "#tokensConfig/typography/fontWeight/normal",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/normal/value",
                    "default": "400"
                  }
                },
                "type": "object",
                "default": {
                  "value": "400"
                }
              },
              "medium": {
                "id": "#tokensConfig/typography/fontWeight/medium",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/medium/value",
                    "default": "500"
                  }
                },
                "type": "object",
                "default": {
                  "value": "500"
                }
              },
              "semibold": {
                "id": "#tokensConfig/typography/fontWeight/semibold",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/semibold/value",
                    "default": "600"
                  }
                },
                "type": "object",
                "default": {
                  "value": "600"
                }
              },
              "bold": {
                "id": "#tokensConfig/typography/fontWeight/bold",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/bold/value",
                    "default": "700"
                  }
                },
                "type": "object",
                "default": {
                  "value": "700"
                }
              },
              "extrabold": {
                "id": "#tokensConfig/typography/fontWeight/extrabold",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/extrabold/value",
                    "default": "800"
                  }
                },
                "type": "object",
                "default": {
                  "value": "800"
                }
              },
              "black": {
                "id": "#tokensConfig/typography/fontWeight/black",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/black/value",
                    "default": "900"
                  }
                },
                "type": "object",
                "default": {
                  "value": "900"
                }
              }
            },
            "type": "object",
            "default": {
              "thin": {
                "value": "100"
              },
              "extralight": {
                "value": "200"
              },
              "light": {
                "value": "300"
              },
              "normal": {
                "value": "400"
              },
              "medium": {
                "value": "500"
              },
              "semibold": {
                "value": "600"
              },
              "bold": {
                "value": "700"
              },
              "extrabold": {
                "value": "800"
              },
              "black": {
                "value": "900"
              }
            }
          },
          "lead": {
            "title": "Line heights used in your typography.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType font-size",
              "@studioIcon material-symbols:height-rounded"
            ],
            "id": "#tokensConfig/typography/lead",
            "properties": {
              "1": {
                "id": "#tokensConfig/typography/lead/1",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/1/value",
                    "default": ".025rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": ".025rem"
                }
              },
              "2": {
                "id": "#tokensConfig/typography/lead/2",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/2/value",
                    "default": ".5rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": ".5rem"
                }
              },
              "3": {
                "id": "#tokensConfig/typography/lead/3",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/3/value",
                    "default": ".75rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": ".75rem"
                }
              },
              "4": {
                "id": "#tokensConfig/typography/lead/4",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/4/value",
                    "default": "1rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1rem"
                }
              },
              "5": {
                "id": "#tokensConfig/typography/lead/5",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/5/value",
                    "default": "1.25rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.25rem"
                }
              },
              "6": {
                "id": "#tokensConfig/typography/lead/6",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/6/value",
                    "default": "1.5rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.5rem"
                }
              },
              "7": {
                "id": "#tokensConfig/typography/lead/7",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/7/value",
                    "default": "1.75rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.75rem"
                }
              },
              "8": {
                "id": "#tokensConfig/typography/lead/8",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/8/value",
                    "default": "2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "2rem"
                }
              },
              "9": {
                "id": "#tokensConfig/typography/lead/9",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/9/value",
                    "default": "2.25rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "2.25rem"
                }
              },
              "10": {
                "id": "#tokensConfig/typography/lead/10",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/10/value",
                    "default": "2.5rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "2.5rem"
                }
              },
              "none": {
                "id": "#tokensConfig/typography/lead/none",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/none/value",
                    "default": "1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1"
                }
              },
              "tight": {
                "id": "#tokensConfig/typography/lead/tight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/tight/value",
                    "default": "1.25"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.25"
                }
              },
              "snug": {
                "id": "#tokensConfig/typography/lead/snug",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/snug/value",
                    "default": "1.375"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.375"
                }
              },
              "normal": {
                "id": "#tokensConfig/typography/lead/normal",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/normal/value",
                    "default": "1.5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.5"
                }
              },
              "relaxed": {
                "id": "#tokensConfig/typography/lead/relaxed",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/relaxed/value",
                    "default": "1.625"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.625"
                }
              },
              "loose": {
                "id": "#tokensConfig/typography/lead/loose",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/loose/value",
                    "default": "2"
                  }
                },
                "type": "object",
                "default": {
                  "value": "2"
                }
              }
            },
            "type": "object",
            "default": {
              "1": {
                "value": ".025rem"
              },
              "2": {
                "value": ".5rem"
              },
              "3": {
                "value": ".75rem"
              },
              "4": {
                "value": "1rem"
              },
              "5": {
                "value": "1.25rem"
              },
              "6": {
                "value": "1.5rem"
              },
              "7": {
                "value": "1.75rem"
              },
              "8": {
                "value": "2rem"
              },
              "9": {
                "value": "2.25rem"
              },
              "10": {
                "value": "2.5rem"
              },
              "none": {
                "value": "1"
              },
              "tight": {
                "value": "1.25"
              },
              "snug": {
                "value": "1.375"
              },
              "normal": {
                "value": "1.5"
              },
              "relaxed": {
                "value": "1.625"
              },
              "loose": {
                "value": "2"
              }
            }
          },
          "font": {
            "title": "Your typography fonts",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType font",
              "@studioIcon material-symbols:font-download-rounded"
            ],
            "id": "#tokensConfig/typography/font",
            "properties": {
              "display": {
                "id": "#tokensConfig/typography/font/display",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/font/display/value",
                    "default": "{font.sans}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{font.sans}"
                }
              },
              "body": {
                "id": "#tokensConfig/typography/font/body",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/font/body/value",
                    "default": "{font.sans}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{font.sans}"
                }
              },
              "code": {
                "id": "#tokensConfig/typography/font/code",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/font/code/value",
                    "default": "{font.mono}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{font.mono}"
                }
              }
            },
            "type": "object",
            "default": {
              "display": {
                "value": "{font.sans}"
              },
              "body": {
                "value": "{font.sans}"
              },
              "code": {
                "value": "{font.mono}"
              }
            }
          },
          "color": {
            "title": "Your typography color palette.",
            "tags": [
              "@studioInput design-token",
              "@studioInputTokenType color",
              "@studioIcon ph:palette"
            ],
            "id": "#tokensConfig/typography/color",
            "properties": {
              "primary": {
                "id": "#tokensConfig/typography/color/primary",
                "properties": {
                  "50": {
                    "id": "#tokensConfig/typography/color/primary/50",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/50/value",
                        "default": "{color.primary.50}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.50}"
                    }
                  },
                  "100": {
                    "id": "#tokensConfig/typography/color/primary/100",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/100/value",
                        "default": "{color.primary.100}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.100}"
                    }
                  },
                  "200": {
                    "id": "#tokensConfig/typography/color/primary/200",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/200/value",
                        "default": "{color.primary.200}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.200}"
                    }
                  },
                  "300": {
                    "id": "#tokensConfig/typography/color/primary/300",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/300/value",
                        "default": "{color.primary.300}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.300}"
                    }
                  },
                  "400": {
                    "id": "#tokensConfig/typography/color/primary/400",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/400/value",
                        "default": "{color.primary.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.400}"
                    }
                  },
                  "500": {
                    "id": "#tokensConfig/typography/color/primary/500",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/500/value",
                        "default": "{color.primary.500}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.500}"
                    }
                  },
                  "600": {
                    "id": "#tokensConfig/typography/color/primary/600",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/600/value",
                        "default": "{color.primary.600}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.600}"
                    }
                  },
                  "700": {
                    "id": "#tokensConfig/typography/color/primary/700",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/700/value",
                        "default": "{color.primary.700}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.700}"
                    }
                  },
                  "800": {
                    "id": "#tokensConfig/typography/color/primary/800",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/800/value",
                        "default": "{color.primary.800}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.800}"
                    }
                  },
                  "900": {
                    "id": "#tokensConfig/typography/color/primary/900",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/900/value",
                        "default": "{color.primary.900}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.900}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "50": {
                    "value": "{color.primary.50}"
                  },
                  "100": {
                    "value": "{color.primary.100}"
                  },
                  "200": {
                    "value": "{color.primary.200}"
                  },
                  "300": {
                    "value": "{color.primary.300}"
                  },
                  "400": {
                    "value": "{color.primary.400}"
                  },
                  "500": {
                    "value": "{color.primary.500}"
                  },
                  "600": {
                    "value": "{color.primary.600}"
                  },
                  "700": {
                    "value": "{color.primary.700}"
                  },
                  "800": {
                    "value": "{color.primary.800}"
                  },
                  "900": {
                    "value": "{color.primary.900}"
                  }
                }
              },
              "secondary": {
                "id": "#tokensConfig/typography/color/secondary",
                "properties": {
                  "50": {
                    "id": "#tokensConfig/typography/color/secondary/50",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/50/value",
                        "default": "{color.gray.50}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.50}"
                    }
                  },
                  "100": {
                    "id": "#tokensConfig/typography/color/secondary/100",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/100/value",
                        "default": "{color.gray.100}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.100}"
                    }
                  },
                  "200": {
                    "id": "#tokensConfig/typography/color/secondary/200",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/200/value",
                        "default": "{color.gray.200}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.200}"
                    }
                  },
                  "300": {
                    "id": "#tokensConfig/typography/color/secondary/300",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/300/value",
                        "default": "{color.gray.300}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.300}"
                    }
                  },
                  "400": {
                    "id": "#tokensConfig/typography/color/secondary/400",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/400/value",
                        "default": "{color.gray.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.400}"
                    }
                  },
                  "500": {
                    "id": "#tokensConfig/typography/color/secondary/500",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/500/value",
                        "default": "{color.gray.500}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.500}"
                    }
                  },
                  "600": {
                    "id": "#tokensConfig/typography/color/secondary/600",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/600/value",
                        "default": "{color.gray.600}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.600}"
                    }
                  },
                  "700": {
                    "id": "#tokensConfig/typography/color/secondary/700",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/700/value",
                        "default": "{color.gray.700}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.700}"
                    }
                  },
                  "800": {
                    "id": "#tokensConfig/typography/color/secondary/800",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/800/value",
                        "default": "{color.gray.800}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.800}"
                    }
                  },
                  "900": {
                    "id": "#tokensConfig/typography/color/secondary/900",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/900/value",
                        "default": "{color.gray.900}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.900}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "50": {
                    "value": "{color.gray.50}"
                  },
                  "100": {
                    "value": "{color.gray.100}"
                  },
                  "200": {
                    "value": "{color.gray.200}"
                  },
                  "300": {
                    "value": "{color.gray.300}"
                  },
                  "400": {
                    "value": "{color.gray.400}"
                  },
                  "500": {
                    "value": "{color.gray.500}"
                  },
                  "600": {
                    "value": "{color.gray.600}"
                  },
                  "700": {
                    "value": "{color.gray.700}"
                  },
                  "800": {
                    "value": "{color.gray.800}"
                  },
                  "900": {
                    "value": "{color.gray.900}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "50": {
                  "value": "{color.primary.50}"
                },
                "100": {
                  "value": "{color.primary.100}"
                },
                "200": {
                  "value": "{color.primary.200}"
                },
                "300": {
                  "value": "{color.primary.300}"
                },
                "400": {
                  "value": "{color.primary.400}"
                },
                "500": {
                  "value": "{color.primary.500}"
                },
                "600": {
                  "value": "{color.primary.600}"
                },
                "700": {
                  "value": "{color.primary.700}"
                },
                "800": {
                  "value": "{color.primary.800}"
                },
                "900": {
                  "value": "{color.primary.900}"
                }
              },
              "secondary": {
                "50": {
                  "value": "{color.gray.50}"
                },
                "100": {
                  "value": "{color.gray.100}"
                },
                "200": {
                  "value": "{color.gray.200}"
                },
                "300": {
                  "value": "{color.gray.300}"
                },
                "400": {
                  "value": "{color.gray.400}"
                },
                "500": {
                  "value": "{color.gray.500}"
                },
                "600": {
                  "value": "{color.gray.600}"
                },
                "700": {
                  "value": "{color.gray.700}"
                },
                "800": {
                  "value": "{color.gray.800}"
                },
                "900": {
                  "value": "{color.gray.900}"
                }
              }
            }
          }
        },
        "type": "object",
        "default": {
          "body": {
            "color": {
              "value": {
                "initial": "{color.black}",
                "dark": "{color.white}"
              }
            },
            "backgroundColor": {
              "value": {
                "initial": "{color.white}",
                "dark": "{color.black}"
              }
            }
          },
          "verticalMargin": {
            "sm": {
              "value": "16px"
            },
            "base": {
              "value": "24px"
            }
          },
          "letterSpacing": {
            "tight": {
              "value": "-0.025em"
            },
            "wide": {
              "value": "0.025em"
            }
          },
          "fontSize": {
            "xs": {
              "value": "12px"
            },
            "sm": {
              "value": "14px"
            },
            "base": {
              "value": "16px"
            },
            "lg": {
              "value": "18px"
            },
            "xl": {
              "value": "20px"
            },
            "2xl": {
              "value": "24px"
            },
            "3xl": {
              "value": "30px"
            },
            "4xl": {
              "value": "36px"
            },
            "5xl": {
              "value": "48px"
            },
            "6xl": {
              "value": "60px"
            },
            "7xl": {
              "value": "72px"
            },
            "8xl": {
              "value": "96px"
            },
            "9xl": {
              "value": "128px"
            }
          },
          "fontWeight": {
            "thin": {
              "value": "100"
            },
            "extralight": {
              "value": "200"
            },
            "light": {
              "value": "300"
            },
            "normal": {
              "value": "400"
            },
            "medium": {
              "value": "500"
            },
            "semibold": {
              "value": "600"
            },
            "bold": {
              "value": "700"
            },
            "extrabold": {
              "value": "800"
            },
            "black": {
              "value": "900"
            }
          },
          "lead": {
            "1": {
              "value": ".025rem"
            },
            "2": {
              "value": ".5rem"
            },
            "3": {
              "value": ".75rem"
            },
            "4": {
              "value": "1rem"
            },
            "5": {
              "value": "1.25rem"
            },
            "6": {
              "value": "1.5rem"
            },
            "7": {
              "value": "1.75rem"
            },
            "8": {
              "value": "2rem"
            },
            "9": {
              "value": "2.25rem"
            },
            "10": {
              "value": "2.5rem"
            },
            "none": {
              "value": "1"
            },
            "tight": {
              "value": "1.25"
            },
            "snug": {
              "value": "1.375"
            },
            "normal": {
              "value": "1.5"
            },
            "relaxed": {
              "value": "1.625"
            },
            "loose": {
              "value": "2"
            }
          },
          "font": {
            "display": {
              "value": "{font.sans}"
            },
            "body": {
              "value": "{font.sans}"
            },
            "code": {
              "value": "{font.mono}"
            }
          },
          "color": {
            "primary": {
              "50": {
                "value": "{color.primary.50}"
              },
              "100": {
                "value": "{color.primary.100}"
              },
              "200": {
                "value": "{color.primary.200}"
              },
              "300": {
                "value": "{color.primary.300}"
              },
              "400": {
                "value": "{color.primary.400}"
              },
              "500": {
                "value": "{color.primary.500}"
              },
              "600": {
                "value": "{color.primary.600}"
              },
              "700": {
                "value": "{color.primary.700}"
              },
              "800": {
                "value": "{color.primary.800}"
              },
              "900": {
                "value": "{color.primary.900}"
              }
            },
            "secondary": {
              "50": {
                "value": "{color.gray.50}"
              },
              "100": {
                "value": "{color.gray.100}"
              },
              "200": {
                "value": "{color.gray.200}"
              },
              "300": {
                "value": "{color.gray.300}"
              },
              "400": {
                "value": "{color.gray.400}"
              },
              "500": {
                "value": "{color.gray.500}"
              },
              "600": {
                "value": "{color.gray.600}"
              },
              "700": {
                "value": "{color.gray.700}"
              },
              "800": {
                "value": "{color.gray.800}"
              },
              "900": {
                "value": "{color.gray.900}"
              }
            }
          }
        }
      },
      "prose": {
        "title": "All the configurable tokens for your Prose components.",
        "tags": [
          "@studioInput design-token",
          "@studioInputTokenType font-size",
          "@studioIcon lucide:component"
        ],
        "id": "#tokensConfig/prose",
        "properties": {
          "p": {
            "id": "#tokensConfig/prose/p",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/prose/p/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/p/fontSize/value",
                    "default": "{typography.fontSize.base}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.base}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/p/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/p/lineHeight/value",
                    "default": "{typography.lead.normal}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.normal}"
                }
              },
              "margin": {
                "id": "#tokensConfig/prose/p/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/p/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "br": {
                "id": "#tokensConfig/prose/p/br",
                "properties": {
                  "margin": {
                    "id": "#tokensConfig/prose/p/br/margin",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/p/br/margin/value",
                        "default": "{typography.verticalMargin.base} 0 0 0"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.verticalMargin.base} 0 0 0"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "margin": {
                    "value": "{typography.verticalMargin.base} 0 0 0"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{typography.fontSize.base}"
              },
              "lineHeight": {
                "value": "{typography.lead.normal}"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "br": {
                "margin": {
                  "value": "{typography.verticalMargin.base} 0 0 0"
                }
              }
            }
          },
          "h1": {
            "id": "#tokensConfig/prose/h1",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h1/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/margin/value",
                    "default": "0 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h1/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/fontSize/value",
                    "default": "{typography.fontSize.5xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.5xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h1/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/lineHeight/value",
                    "default": "{typography.lead.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.tight}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h1/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/fontWeight/value",
                    "default": "{typography.fontWeight.bold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.bold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h1/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h1/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/iconSize/value",
                    "default": "{typography.fontSize.3xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.3xl}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "0 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.5xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.tight}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.bold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.3xl}"
              }
            }
          },
          "h2": {
            "id": "#tokensConfig/prose/h2",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h2/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h2/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/fontSize/value",
                    "default": "{typography.fontSize.4xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.4xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h2/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/lineHeight/value",
                    "default": "{typography.lead.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.tight}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h2/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h2/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h2/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/iconSize/value",
                    "default": "{typography.fontSize.2xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.2xl}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.4xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.tight}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.2xl}"
              }
            }
          },
          "h3": {
            "id": "#tokensConfig/prose/h3",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h3/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h3/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/fontSize/value",
                    "default": "{typography.fontSize.3xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.3xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h3/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/lineHeight/value",
                    "default": "{typography.lead.snug}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.snug}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h3/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h3/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h3/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/iconSize/value",
                    "default": "{typography.fontSize.xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.xl}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.3xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.snug}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.xl}"
              }
            }
          },
          "h4": {
            "id": "#tokensConfig/prose/h4",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h4/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h4/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/fontSize/value",
                    "default": "{typography.fontSize.2xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.2xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h4/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/lineHeight/value",
                    "default": "{typography.lead.snug}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.snug}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h4/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h4/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h4/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/iconSize/value",
                    "default": "{typography.fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.lg}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.2xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.snug}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.lg}"
              }
            }
          },
          "h5": {
            "id": "#tokensConfig/prose/h5",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h5/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h5/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/fontSize/value",
                    "default": "{typography.fontSize.xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h5/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/lineHeight/value",
                    "default": "{typography.lead.snug}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.snug}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h5/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h5/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/iconSize/value",
                    "default": "{typography.fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.lg}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.snug}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "iconSize": {
                "value": "{typography.fontSize.lg}"
              }
            }
          },
          "h6": {
            "id": "#tokensConfig/prose/h6",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h6/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h6/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/fontSize/value",
                    "default": "{typography.fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.lg}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h6/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/lineHeight/value",
                    "default": "{typography.lead.normal}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.normal}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h6/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h6/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/iconSize/value",
                    "default": "{typography.fontSize.base}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.base}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.lg}"
              },
              "lineHeight": {
                "value": "{typography.lead.normal}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "iconSize": {
                "value": "{typography.fontSize.base}"
              }
            }
          },
          "strong": {
            "id": "#tokensConfig/prose/strong",
            "properties": {
              "fontWeight": {
                "id": "#tokensConfig/prose/strong/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/strong/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              }
            }
          },
          "img": {
            "id": "#tokensConfig/prose/img",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/img/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/img/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              }
            }
          },
          "a": {
            "id": "#tokensConfig/prose/a",
            "properties": {
              "textDecoration": {
                "id": "#tokensConfig/prose/a/textDecoration",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/textDecoration/value",
                    "default": "none"
                  }
                },
                "type": "object",
                "default": {
                  "value": "none"
                }
              },
              "color": {
                "id": "#tokensConfig/prose/a/color",
                "properties": {
                  "static": {
                    "id": "#tokensConfig/prose/a/color/static",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/a/color/static/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/static/value/initial",
                            "default": "inherit"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/static/value/dark",
                            "default": "inherit"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "inherit",
                          "dark": "inherit"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "inherit",
                        "dark": "inherit"
                      }
                    }
                  },
                  "hover": {
                    "id": "#tokensConfig/prose/a/color/hover",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/a/color/hover/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/hover/value/initial",
                            "default": "{typography.color.primary.500}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/hover/value/dark",
                            "default": "{typography.color.primary.400}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.primary.500}",
                          "dark": "{typography.color.primary.400}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.primary.500}",
                        "dark": "{typography.color.primary.400}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "static": {
                    "value": {
                      "initial": "inherit",
                      "dark": "inherit"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "{typography.color.primary.500}",
                      "dark": "{typography.color.primary.400}"
                    }
                  }
                }
              },
              "border": {
                "id": "#tokensConfig/prose/a/border",
                "properties": {
                  "width": {
                    "id": "#tokensConfig/prose/a/border/width",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/border/width/value",
                        "default": "1px"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "1px"
                    }
                  },
                  "style": {
                    "id": "#tokensConfig/prose/a/border/style",
                    "properties": {
                      "static": {
                        "id": "#tokensConfig/prose/a/border/style/static",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/border/style/static/value",
                            "default": "dashed"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "dashed"
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/border/style/hover",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/border/style/hover/value",
                            "default": "solid"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "solid"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "static": {
                        "value": "dashed"
                      },
                      "hover": {
                        "value": "solid"
                      }
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/a/border/color",
                    "properties": {
                      "static": {
                        "id": "#tokensConfig/prose/a/border/color/static",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/a/border/color/static/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/border/color/static/value/initial",
                                "default": "currentColor"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/border/color/static/value/dark",
                                "default": "currentColor"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "currentColor",
                              "dark": "currentColor"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "currentColor",
                            "dark": "currentColor"
                          }
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/border/color/hover",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/a/border/color/hover/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/border/color/hover/value/initial",
                                "default": "currentColor"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/border/color/hover/value/dark",
                                "default": "currentColor"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "currentColor",
                              "dark": "currentColor"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "currentColor",
                            "dark": "currentColor"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "static": {
                        "value": {
                          "initial": "currentColor",
                          "dark": "currentColor"
                        }
                      },
                      "hover": {
                        "value": {
                          "initial": "currentColor",
                          "dark": "currentColor"
                        }
                      }
                    }
                  },
                  "distance": {
                    "id": "#tokensConfig/prose/a/border/distance",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/border/distance/value",
                        "default": "2px"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "2px"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "width": {
                    "value": "1px"
                  },
                  "style": {
                    "static": {
                      "value": "dashed"
                    },
                    "hover": {
                      "value": "solid"
                    }
                  },
                  "color": {
                    "static": {
                      "value": {
                        "initial": "currentColor",
                        "dark": "currentColor"
                      }
                    },
                    "hover": {
                      "value": {
                        "initial": "currentColor",
                        "dark": "currentColor"
                      }
                    }
                  },
                  "distance": {
                    "value": "2px"
                  }
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/a/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/fontWeight/value",
                    "default": "{typography.fontWeight.medium}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.medium}"
                }
              },
              "hasCode": {
                "id": "#tokensConfig/prose/a/hasCode",
                "properties": {
                  "borderBottom": {
                    "id": "#tokensConfig/prose/a/hasCode/borderBottom",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/hasCode/borderBottom/value",
                        "default": "none"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "none"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "borderBottom": {
                    "value": "none"
                  }
                }
              },
              "code": {
                "id": "#tokensConfig/prose/a/code",
                "properties": {
                  "border": {
                    "id": "#tokensConfig/prose/a/code/border",
                    "properties": {
                      "width": {
                        "id": "#tokensConfig/prose/a/code/border/width",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/code/border/width/value",
                            "default": "{prose.a.border.width}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{prose.a.border.width}"
                        }
                      },
                      "style": {
                        "id": "#tokensConfig/prose/a/code/border/style",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/code/border/style/value",
                            "default": "{prose.a.border.style.static}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{prose.a.border.style.static}"
                        }
                      },
                      "color": {
                        "id": "#tokensConfig/prose/a/code/border/color",
                        "properties": {
                          "static": {
                            "id": "#tokensConfig/prose/a/code/border/color/static",
                            "properties": {
                              "value": {
                                "id": "#tokensConfig/prose/a/code/border/color/static/value",
                                "properties": {
                                  "initial": {
                                    "type": "string",
                                    "id": "#tokensConfig/prose/a/code/border/color/static/value/initial",
                                    "default": "{typography.color.secondary.400}"
                                  },
                                  "dark": {
                                    "type": "string",
                                    "id": "#tokensConfig/prose/a/code/border/color/static/value/dark",
                                    "default": "{typography.color.secondary.600}"
                                  }
                                },
                                "type": "object",
                                "default": {
                                  "initial": "{typography.color.secondary.400}",
                                  "dark": "{typography.color.secondary.600}"
                                }
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": {
                                "initial": "{typography.color.secondary.400}",
                                "dark": "{typography.color.secondary.600}"
                              }
                            }
                          },
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/border/color/hover",
                            "properties": {
                              "value": {
                                "id": "#tokensConfig/prose/a/code/border/color/hover/value",
                                "properties": {
                                  "initial": {
                                    "type": "string",
                                    "id": "#tokensConfig/prose/a/code/border/color/hover/value/initial",
                                    "default": "{typography.color.primary.500}"
                                  },
                                  "dark": {
                                    "type": "string",
                                    "id": "#tokensConfig/prose/a/code/border/color/hover/value/dark",
                                    "default": "{typography.color.primary.600}"
                                  }
                                },
                                "type": "object",
                                "default": {
                                  "initial": "{typography.color.primary.500}",
                                  "dark": "{typography.color.primary.600}"
                                }
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": {
                                "initial": "{typography.color.primary.500}",
                                "dark": "{typography.color.primary.600}"
                              }
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "static": {
                            "value": {
                              "initial": "{typography.color.secondary.400}",
                              "dark": "{typography.color.secondary.600}"
                            }
                          },
                          "hover": {
                            "value": {
                              "initial": "{typography.color.primary.500}",
                              "dark": "{typography.color.primary.600}"
                            }
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "width": {
                        "value": "{prose.a.border.width}"
                      },
                      "style": {
                        "value": "{prose.a.border.style.static}"
                      },
                      "color": {
                        "static": {
                          "value": {
                            "initial": "{typography.color.secondary.400}",
                            "dark": "{typography.color.secondary.600}"
                          }
                        },
                        "hover": {
                          "value": {
                            "initial": "{typography.color.primary.500}",
                            "dark": "{typography.color.primary.600}"
                          }
                        }
                      }
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/a/code/color",
                    "properties": {
                      "static": {
                        "id": "#tokensConfig/prose/a/code/color/static",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/a/code/color/static/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/color/static/value/initial",
                                "default": "currentColor"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/color/static/value/dark",
                                "default": "currentColor"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "currentColor",
                              "dark": "currentColor"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "currentColor",
                            "dark": "currentColor"
                          }
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/code/color/hover",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/a/code/color/hover/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/color/hover/value/initial",
                                "default": "currentColor"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/color/hover/value/dark",
                                "default": "currentColor"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "currentColor",
                              "dark": "currentColor"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "currentColor",
                            "dark": "currentColor"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "static": {
                        "value": {
                          "initial": "currentColor",
                          "dark": "currentColor"
                        }
                      },
                      "hover": {
                        "value": {
                          "initial": "currentColor",
                          "dark": "currentColor"
                        }
                      }
                    }
                  },
                  "background": {
                    "id": "#tokensConfig/prose/a/code/background",
                    "properties": {
                      "static": {
                        "id": "#tokensConfig/prose/a/code/background/static",
                        "type": "any",
                        "default": {}
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/code/background/hover",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/a/code/background/hover/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/background/hover/value/initial",
                                "default": "{typography.color.primary.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/background/hover/value/dark",
                                "default": "{typography.color.primary.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{typography.color.primary.50}",
                              "dark": "{typography.color.primary.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{typography.color.primary.50}",
                            "dark": "{typography.color.primary.900}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "static": {},
                      "hover": {
                        "value": {
                          "initial": "{typography.color.primary.50}",
                          "dark": "{typography.color.primary.900}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "border": {
                    "width": {
                      "value": "{prose.a.border.width}"
                    },
                    "style": {
                      "value": "{prose.a.border.style.static}"
                    },
                    "color": {
                      "static": {
                        "value": {
                          "initial": "{typography.color.secondary.400}",
                          "dark": "{typography.color.secondary.600}"
                        }
                      },
                      "hover": {
                        "value": {
                          "initial": "{typography.color.primary.500}",
                          "dark": "{typography.color.primary.600}"
                        }
                      }
                    }
                  },
                  "color": {
                    "static": {
                      "value": {
                        "initial": "currentColor",
                        "dark": "currentColor"
                      }
                    },
                    "hover": {
                      "value": {
                        "initial": "currentColor",
                        "dark": "currentColor"
                      }
                    }
                  },
                  "background": {
                    "static": {},
                    "hover": {
                      "value": {
                        "initial": "{typography.color.primary.50}",
                        "dark": "{typography.color.primary.900}"
                      }
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "textDecoration": {
                "value": "none"
              },
              "color": {
                "static": {
                  "value": {
                    "initial": "inherit",
                    "dark": "inherit"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "{typography.color.primary.500}",
                    "dark": "{typography.color.primary.400}"
                  }
                }
              },
              "border": {
                "width": {
                  "value": "1px"
                },
                "style": {
                  "static": {
                    "value": "dashed"
                  },
                  "hover": {
                    "value": "solid"
                  }
                },
                "color": {
                  "static": {
                    "value": {
                      "initial": "currentColor",
                      "dark": "currentColor"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "currentColor",
                      "dark": "currentColor"
                    }
                  }
                },
                "distance": {
                  "value": "2px"
                }
              },
              "fontWeight": {
                "value": "{typography.fontWeight.medium}"
              },
              "hasCode": {
                "borderBottom": {
                  "value": "none"
                }
              },
              "code": {
                "border": {
                  "width": {
                    "value": "{prose.a.border.width}"
                  },
                  "style": {
                    "value": "{prose.a.border.style.static}"
                  },
                  "color": {
                    "static": {
                      "value": {
                        "initial": "{typography.color.secondary.400}",
                        "dark": "{typography.color.secondary.600}"
                      }
                    },
                    "hover": {
                      "value": {
                        "initial": "{typography.color.primary.500}",
                        "dark": "{typography.color.primary.600}"
                      }
                    }
                  }
                },
                "color": {
                  "static": {
                    "value": {
                      "initial": "currentColor",
                      "dark": "currentColor"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "currentColor",
                      "dark": "currentColor"
                    }
                  }
                },
                "background": {
                  "static": {},
                  "hover": {
                    "value": {
                      "initial": "{typography.color.primary.50}",
                      "dark": "{typography.color.primary.900}"
                    }
                  }
                }
              }
            }
          },
          "blockquote": {
            "id": "#tokensConfig/prose/blockquote",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/blockquote/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "paddingInlineStart": {
                "id": "#tokensConfig/prose/blockquote/paddingInlineStart",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/paddingInlineStart/value",
                    "default": "24px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "24px"
                }
              },
              "quotes": {
                "id": "#tokensConfig/prose/blockquote/quotes",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/quotes/value",
                    "default": "'201C' '201D' '2018' '2019'"
                  }
                },
                "type": "object",
                "default": {
                  "value": "'201C' '201D' '2018' '2019'"
                }
              },
              "color": {
                "id": "#tokensConfig/prose/blockquote/color",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/prose/blockquote/color/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/color/value/initial",
                        "default": "{typography.color.secondary.500}"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/color/value/dark",
                        "default": "{typography.color.secondary.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "{typography.color.secondary.500}",
                      "dark": "{typography.color.secondary.400}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "{typography.color.secondary.500}",
                    "dark": "{typography.color.secondary.400}"
                  }
                }
              },
              "border": {
                "id": "#tokensConfig/prose/blockquote/border",
                "properties": {
                  "width": {
                    "id": "#tokensConfig/prose/blockquote/border/width",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/border/width/value",
                        "default": "4px"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "4px"
                    }
                  },
                  "style": {
                    "id": "#tokensConfig/prose/blockquote/border/style",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/border/style/value",
                        "default": "solid"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "solid"
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/blockquote/border/color",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/blockquote/border/color/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/blockquote/border/color/value/initial",
                            "default": "{typography.color.secondary.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/blockquote/border/color/value/dark",
                            "default": "{typography.color.secondary.700}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.200}",
                          "dark": "{typography.color.secondary.700}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.200}",
                        "dark": "{typography.color.secondary.700}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "width": {
                    "value": "4px"
                  },
                  "style": {
                    "value": "solid"
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.200}",
                      "dark": "{typography.color.secondary.700}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "paddingInlineStart": {
                "value": "24px"
              },
              "quotes": {
                "value": "'201C' '201D' '2018' '2019'"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.500}",
                  "dark": "{typography.color.secondary.400}"
                }
              },
              "border": {
                "width": {
                  "value": "4px"
                },
                "style": {
                  "value": "solid"
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.200}",
                    "dark": "{typography.color.secondary.700}"
                  }
                }
              }
            }
          },
          "ul": {
            "id": "#tokensConfig/prose/ul",
            "properties": {
              "listStyleType": {
                "id": "#tokensConfig/prose/ul/listStyleType",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ul/listStyleType/value",
                    "default": "disc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "disc"
                }
              },
              "margin": {
                "id": "#tokensConfig/prose/ul/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ul/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "paddingInlineStart": {
                "id": "#tokensConfig/prose/ul/paddingInlineStart",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ul/paddingInlineStart/value",
                    "default": "21px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "21px"
                }
              },
              "li": {
                "id": "#tokensConfig/prose/ul/li",
                "properties": {
                  "markerColor": {
                    "id": "#tokensConfig/prose/ul/li/markerColor",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/ul/li/markerColor/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ul/li/markerColor/value/initial",
                            "default": "currentColor"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ul/li/markerColor/value/dark",
                            "default": "currentColor"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "currentColor",
                          "dark": "currentColor"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "currentColor",
                        "dark": "currentColor"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "markerColor": {
                    "value": {
                      "initial": "currentColor",
                      "dark": "currentColor"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "listStyleType": {
                "value": "disc"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "paddingInlineStart": {
                "value": "21px"
              },
              "li": {
                "markerColor": {
                  "value": {
                    "initial": "currentColor",
                    "dark": "currentColor"
                  }
                }
              }
            }
          },
          "ol": {
            "id": "#tokensConfig/prose/ol",
            "properties": {
              "listStyleType": {
                "id": "#tokensConfig/prose/ol/listStyleType",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ol/listStyleType/value",
                    "default": "decimal"
                  }
                },
                "type": "object",
                "default": {
                  "value": "decimal"
                }
              },
              "margin": {
                "id": "#tokensConfig/prose/ol/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ol/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "paddingInlineStart": {
                "id": "#tokensConfig/prose/ol/paddingInlineStart",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ol/paddingInlineStart/value",
                    "default": "21px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "21px"
                }
              },
              "li": {
                "id": "#tokensConfig/prose/ol/li",
                "properties": {
                  "markerColor": {
                    "id": "#tokensConfig/prose/ol/li/markerColor",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/ol/li/markerColor/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ol/li/markerColor/value/initial",
                            "default": "currentColor"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ol/li/markerColor/value/dark",
                            "default": "currentColor"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "currentColor",
                          "dark": "currentColor"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "currentColor",
                        "dark": "currentColor"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "markerColor": {
                    "value": {
                      "initial": "currentColor",
                      "dark": "currentColor"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "listStyleType": {
                "value": "decimal"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "paddingInlineStart": {
                "value": "21px"
              },
              "li": {
                "markerColor": {
                  "value": {
                    "initial": "currentColor",
                    "dark": "currentColor"
                  }
                }
              }
            }
          },
          "li": {
            "id": "#tokensConfig/prose/li",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/li/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/li/margin/value",
                    "default": "{typography.verticalMargin.sm} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.sm} 0"
                }
              },
              "listStylePosition": {
                "id": "#tokensConfig/prose/li/listStylePosition",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/li/listStylePosition/value",
                    "default": "outside"
                  }
                },
                "type": "object",
                "default": {
                  "value": "outside"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.sm} 0"
              },
              "listStylePosition": {
                "value": "outside"
              }
            }
          },
          "hr": {
            "id": "#tokensConfig/prose/hr",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/hr/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/hr/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "style": {
                "id": "#tokensConfig/prose/hr/style",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/hr/style/value",
                    "default": "solid"
                  }
                },
                "type": "object",
                "default": {
                  "value": "solid"
                }
              },
              "width": {
                "id": "#tokensConfig/prose/hr/width",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/hr/width/value",
                    "default": "1px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1px"
                }
              },
              "color": {
                "id": "#tokensConfig/prose/hr/color",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/prose/hr/color/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/prose/hr/color/value/initial",
                        "default": "{typography.color.secondary.200}"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/prose/hr/color/value/dark",
                        "default": "{typography.color.secondary.800}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "{typography.color.secondary.200}",
                      "dark": "{typography.color.secondary.800}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "{typography.color.secondary.200}",
                    "dark": "{typography.color.secondary.800}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "style": {
                "value": "solid"
              },
              "width": {
                "value": "1px"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.200}",
                  "dark": "{typography.color.secondary.800}"
                }
              }
            }
          },
          "table": {
            "id": "#tokensConfig/prose/table",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/table/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "textAlign": {
                "id": "#tokensConfig/prose/table/textAlign",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/textAlign/value",
                    "default": "start"
                  }
                },
                "type": "object",
                "default": {
                  "value": "start"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/table/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/fontSize/value",
                    "default": "{typography.fontSize.sm}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.sm}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/table/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/lineHeight/value",
                    "default": "{typography.lead.6}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.6}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "textAlign": {
                "value": "start"
              },
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              },
              "lineHeight": {
                "value": "{typography.lead.6}"
              }
            }
          },
          "thead": {
            "id": "#tokensConfig/prose/thead",
            "properties": {
              "border": {
                "id": "#tokensConfig/prose/thead/border",
                "properties": {
                  "width": {
                    "id": "#tokensConfig/prose/thead/border/width",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/thead/border/width/value",
                        "default": "0px"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "0px"
                    }
                  },
                  "style": {
                    "id": "#tokensConfig/prose/thead/border/style",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/thead/border/style/value",
                        "default": "solid"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "solid"
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/thead/border/color",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/thead/border/color/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/thead/border/color/value/initial",
                            "default": "{typography.color.secondary.300}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/thead/border/color/value/dark",
                            "default": "{typography.color.secondary.600}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.300}",
                          "dark": "{typography.color.secondary.600}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.300}",
                        "dark": "{typography.color.secondary.600}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "width": {
                    "value": "0px"
                  },
                  "style": {
                    "value": "solid"
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.300}",
                      "dark": "{typography.color.secondary.600}"
                    }
                  }
                }
              },
              "borderBottom": {
                "id": "#tokensConfig/prose/thead/borderBottom",
                "properties": {
                  "width": {
                    "id": "#tokensConfig/prose/thead/borderBottom/width",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/thead/borderBottom/width/value",
                        "default": "1px"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "1px"
                    }
                  },
                  "style": {
                    "id": "#tokensConfig/prose/thead/borderBottom/style",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/thead/borderBottom/style/value",
                        "default": "solid"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "solid"
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/thead/borderBottom/color",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/thead/borderBottom/color/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/thead/borderBottom/color/value/initial",
                            "default": "{typography.color.secondary.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/thead/borderBottom/color/value/dark",
                            "default": "{typography.color.secondary.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.200}",
                          "dark": "{typography.color.secondary.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.200}",
                        "dark": "{typography.color.secondary.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "width": {
                    "value": "1px"
                  },
                  "style": {
                    "value": "solid"
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.200}",
                      "dark": "{typography.color.secondary.800}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "border": {
                "width": {
                  "value": "0px"
                },
                "style": {
                  "value": "solid"
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.300}",
                    "dark": "{typography.color.secondary.600}"
                  }
                }
              },
              "borderBottom": {
                "width": {
                  "value": "1px"
                },
                "style": {
                  "value": "solid"
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.200}",
                    "dark": "{typography.color.secondary.800}"
                  }
                }
              }
            }
          },
          "th": {
            "id": "#tokensConfig/prose/th",
            "properties": {
              "color": {
                "id": "#tokensConfig/prose/th/color",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/prose/th/color/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/prose/th/color/value/initial",
                        "default": "{typography.color.secondary.600}"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/prose/th/color/value/dark",
                        "default": "{typography.color.secondary.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "{typography.color.secondary.600}",
                      "dark": "{typography.color.secondary.400}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "{typography.color.secondary.600}",
                    "dark": "{typography.color.secondary.400}"
                  }
                }
              },
              "padding": {
                "id": "#tokensConfig/prose/th/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/th/padding/value",
                    "default": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/th/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/th/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "textAlign": {
                "id": "#tokensConfig/prose/th/textAlign",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/th/textAlign/value",
                    "default": "inherit"
                  }
                },
                "type": "object",
                "default": {
                  "value": "inherit"
                }
              }
            },
            "type": "object",
            "default": {
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.600}",
                  "dark": "{typography.color.secondary.400}"
                }
              },
              "padding": {
                "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "textAlign": {
                "value": "inherit"
              }
            }
          },
          "tbody": {
            "id": "#tokensConfig/prose/tbody",
            "properties": {
              "tr": {
                "id": "#tokensConfig/prose/tbody/tr",
                "properties": {
                  "borderBottom": {
                    "id": "#tokensConfig/prose/tbody/tr/borderBottom",
                    "properties": {
                      "width": {
                        "id": "#tokensConfig/prose/tbody/tr/borderBottom/width",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/tbody/tr/borderBottom/width/value",
                            "default": "1px"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "1px"
                        }
                      },
                      "style": {
                        "id": "#tokensConfig/prose/tbody/tr/borderBottom/style",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/tbody/tr/borderBottom/style/value",
                            "default": "dashed"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "dashed"
                        }
                      },
                      "color": {
                        "id": "#tokensConfig/prose/tbody/tr/borderBottom/color",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/tbody/tr/borderBottom/color/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/tbody/tr/borderBottom/color/value/initial",
                                "default": "{typography.color.secondary.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/tbody/tr/borderBottom/color/value/dark",
                                "default": "{typography.color.secondary.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{typography.color.secondary.200}",
                              "dark": "{typography.color.secondary.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{typography.color.secondary.200}",
                            "dark": "{typography.color.secondary.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "width": {
                        "value": "1px"
                      },
                      "style": {
                        "value": "dashed"
                      },
                      "color": {
                        "value": {
                          "initial": "{typography.color.secondary.200}",
                          "dark": "{typography.color.secondary.800}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "borderBottom": {
                    "width": {
                      "value": "1px"
                    },
                    "style": {
                      "value": "dashed"
                    },
                    "color": {
                      "value": {
                        "initial": "{typography.color.secondary.200}",
                        "dark": "{typography.color.secondary.800}"
                      }
                    }
                  }
                }
              },
              "td": {
                "id": "#tokensConfig/prose/tbody/td",
                "properties": {
                  "padding": {
                    "id": "#tokensConfig/prose/tbody/td/padding",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/tbody/td/padding/value",
                        "default": "{typography.verticalMargin.sm}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.verticalMargin.sm}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "padding": {
                    "value": "{typography.verticalMargin.sm}"
                  }
                }
              },
              "code": {
                "id": "#tokensConfig/prose/tbody/code",
                "properties": {
                  "inline": {
                    "id": "#tokensConfig/prose/tbody/code/inline",
                    "properties": {
                      "fontSize": {
                        "id": "#tokensConfig/prose/tbody/code/inline/fontSize",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/tbody/code/inline/fontSize/value",
                            "default": "{typography.fontSize.sm}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.fontSize.sm}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "fontSize": {
                        "value": "{typography.fontSize.sm}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "inline": {
                    "fontSize": {
                      "value": "{typography.fontSize.sm}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "tr": {
                "borderBottom": {
                  "width": {
                    "value": "1px"
                  },
                  "style": {
                    "value": "dashed"
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.200}",
                      "dark": "{typography.color.secondary.800}"
                    }
                  }
                }
              },
              "td": {
                "padding": {
                  "value": "{typography.verticalMargin.sm}"
                }
              },
              "code": {
                "inline": {
                  "fontSize": {
                    "value": "{typography.fontSize.sm}"
                  }
                }
              }
            }
          },
          "code": {
            "id": "#tokensConfig/prose/code",
            "properties": {
              "block": {
                "id": "#tokensConfig/prose/code/block",
                "properties": {
                  "fontSize": {
                    "id": "#tokensConfig/prose/code/block/fontSize",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/block/fontSize/value",
                        "default": "{typography.fontSize.sm}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.fontSize.sm}"
                    }
                  },
                  "margin": {
                    "id": "#tokensConfig/prose/code/block/margin",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/block/margin/value",
                        "default": "{typography.verticalMargin.base} 0"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.verticalMargin.base} 0"
                    }
                  },
                  "border": {
                    "id": "#tokensConfig/prose/code/block/border",
                    "properties": {
                      "width": {
                        "id": "#tokensConfig/prose/code/block/border/width",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/border/width/value",
                            "default": "1px"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "1px"
                        }
                      },
                      "style": {
                        "id": "#tokensConfig/prose/code/block/border/style",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/border/style/value",
                            "default": "solid"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "solid"
                        }
                      },
                      "color": {
                        "id": "#tokensConfig/prose/code/block/border/color",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/prose/code/block/border/color/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/prose/code/block/border/color/value/initial",
                                "default": "{typography.color.secondary.200}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/prose/code/block/border/color/value/dark",
                                "default": "{typography.color.secondary.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{typography.color.secondary.200}",
                              "dark": "{typography.color.secondary.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{typography.color.secondary.200}",
                            "dark": "{typography.color.secondary.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "width": {
                        "value": "1px"
                      },
                      "style": {
                        "value": "solid"
                      },
                      "color": {
                        "value": {
                          "initial": "{typography.color.secondary.200}",
                          "dark": "{typography.color.secondary.800}"
                        }
                      }
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/code/block/color",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/code/block/color/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/color/value/initial",
                            "default": "{typography.color.secondary.700}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/color/value/dark",
                            "default": "{typography.color.secondary.200}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.700}",
                          "dark": "{typography.color.secondary.200}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.700}",
                        "dark": "{typography.color.secondary.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/prose/code/block/backgroundColor",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/code/block/backgroundColor/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/backgroundColor/value/initial",
                            "default": "{typography.color.secondary.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/backgroundColor/value/dark",
                            "default": "{typography.color.secondary.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.100}",
                          "dark": "{typography.color.secondary.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.100}",
                        "dark": "{typography.color.secondary.900}"
                      }
                    }
                  },
                  "backdropFilter": {
                    "id": "#tokensConfig/prose/code/block/backdropFilter",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/code/block/backdropFilter/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/backdropFilter/value/initial",
                            "default": "contrast(1)"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/backdropFilter/value/dark",
                            "default": "contrast(1)"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "contrast(1)",
                          "dark": "contrast(1)"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "contrast(1)",
                        "dark": "contrast(1)"
                      }
                    }
                  },
                  "pre": {
                    "id": "#tokensConfig/prose/code/block/pre",
                    "properties": {
                      "padding": {
                        "id": "#tokensConfig/prose/code/block/pre/padding",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/pre/padding/value",
                            "default": "{typography.verticalMargin.sm}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.verticalMargin.sm}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "padding": {
                        "value": "{typography.verticalMargin.sm}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "fontSize": {
                    "value": "{typography.fontSize.sm}"
                  },
                  "margin": {
                    "value": "{typography.verticalMargin.base} 0"
                  },
                  "border": {
                    "width": {
                      "value": "1px"
                    },
                    "style": {
                      "value": "solid"
                    },
                    "color": {
                      "value": {
                        "initial": "{typography.color.secondary.200}",
                        "dark": "{typography.color.secondary.800}"
                      }
                    }
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.700}",
                      "dark": "{typography.color.secondary.200}"
                    }
                  },
                  "backgroundColor": {
                    "value": {
                      "initial": "{typography.color.secondary.100}",
                      "dark": "{typography.color.secondary.900}"
                    }
                  },
                  "backdropFilter": {
                    "value": {
                      "initial": "contrast(1)",
                      "dark": "contrast(1)"
                    }
                  },
                  "pre": {
                    "padding": {
                      "value": "{typography.verticalMargin.sm}"
                    }
                  }
                }
              },
              "inline": {
                "id": "#tokensConfig/prose/code/inline",
                "properties": {
                  "borderRadius": {
                    "id": "#tokensConfig/prose/code/inline/borderRadius",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/borderRadius/value",
                        "default": "{radii.xs}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{radii.xs}"
                    }
                  },
                  "padding": {
                    "id": "#tokensConfig/prose/code/inline/padding",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/padding/value",
                        "default": "0.2rem 0.375rem 0.2rem 0.375rem"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "0.2rem 0.375rem 0.2rem 0.375rem"
                    }
                  },
                  "fontSize": {
                    "id": "#tokensConfig/prose/code/inline/fontSize",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/fontSize/value",
                        "default": "{typography.fontSize.sm}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.fontSize.sm}"
                    }
                  },
                  "fontWeight": {
                    "id": "#tokensConfig/prose/code/inline/fontWeight",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/fontWeight/value",
                        "default": "{typography.fontWeight.normal}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.fontWeight.normal}"
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/code/inline/color",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/code/inline/color/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/color/value/initial",
                            "default": "{typography.color.secondary.700}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/color/value/dark",
                            "default": "{typography.color.secondary.200}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.700}",
                          "dark": "{typography.color.secondary.200}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.700}",
                        "dark": "{typography.color.secondary.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/prose/code/inline/backgroundColor",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/prose/code/inline/backgroundColor/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/backgroundColor/value/initial",
                            "default": "{typography.color.secondary.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/backgroundColor/value/dark",
                            "default": "{typography.color.secondary.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{typography.color.secondary.100}",
                          "dark": "{typography.color.secondary.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{typography.color.secondary.100}",
                        "dark": "{typography.color.secondary.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "borderRadius": {
                    "value": "{radii.xs}"
                  },
                  "padding": {
                    "value": "0.2rem 0.375rem 0.2rem 0.375rem"
                  },
                  "fontSize": {
                    "value": "{typography.fontSize.sm}"
                  },
                  "fontWeight": {
                    "value": "{typography.fontWeight.normal}"
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.700}",
                      "dark": "{typography.color.secondary.200}"
                    }
                  },
                  "backgroundColor": {
                    "value": {
                      "initial": "{typography.color.secondary.100}",
                      "dark": "{typography.color.secondary.800}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "block": {
                "fontSize": {
                  "value": "{typography.fontSize.sm}"
                },
                "margin": {
                  "value": "{typography.verticalMargin.base} 0"
                },
                "border": {
                  "width": {
                    "value": "1px"
                  },
                  "style": {
                    "value": "solid"
                  },
                  "color": {
                    "value": {
                      "initial": "{typography.color.secondary.200}",
                      "dark": "{typography.color.secondary.800}"
                    }
                  }
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.700}",
                    "dark": "{typography.color.secondary.200}"
                  }
                },
                "backgroundColor": {
                  "value": {
                    "initial": "{typography.color.secondary.100}",
                    "dark": "{typography.color.secondary.900}"
                  }
                },
                "backdropFilter": {
                  "value": {
                    "initial": "contrast(1)",
                    "dark": "contrast(1)"
                  }
                },
                "pre": {
                  "padding": {
                    "value": "{typography.verticalMargin.sm}"
                  }
                }
              },
              "inline": {
                "borderRadius": {
                  "value": "{radii.xs}"
                },
                "padding": {
                  "value": "0.2rem 0.375rem 0.2rem 0.375rem"
                },
                "fontSize": {
                  "value": "{typography.fontSize.sm}"
                },
                "fontWeight": {
                  "value": "{typography.fontWeight.normal}"
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.700}",
                    "dark": "{typography.color.secondary.200}"
                  }
                },
                "backgroundColor": {
                  "value": {
                    "initial": "{typography.color.secondary.100}",
                    "dark": "{typography.color.secondary.800}"
                  }
                }
              }
            }
          }
        },
        "type": "object",
        "default": {
          "p": {
            "fontSize": {
              "value": "{typography.fontSize.base}"
            },
            "lineHeight": {
              "value": "{typography.lead.normal}"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "br": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0 0 0"
              }
            }
          },
          "h1": {
            "margin": {
              "value": "0 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.5xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.tight}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.bold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.3xl}"
            }
          },
          "h2": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.4xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.tight}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.2xl}"
            }
          },
          "h3": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.3xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.snug}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.xl}"
            }
          },
          "h4": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.2xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.snug}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.lg}"
            }
          },
          "h5": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.snug}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "iconSize": {
              "value": "{typography.fontSize.lg}"
            }
          },
          "h6": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.lg}"
            },
            "lineHeight": {
              "value": "{typography.lead.normal}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "iconSize": {
              "value": "{typography.fontSize.base}"
            }
          },
          "strong": {
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            }
          },
          "img": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            }
          },
          "a": {
            "textDecoration": {
              "value": "none"
            },
            "color": {
              "static": {
                "value": {
                  "initial": "inherit",
                  "dark": "inherit"
                }
              },
              "hover": {
                "value": {
                  "initial": "{typography.color.primary.500}",
                  "dark": "{typography.color.primary.400}"
                }
              }
            },
            "border": {
              "width": {
                "value": "1px"
              },
              "style": {
                "static": {
                  "value": "dashed"
                },
                "hover": {
                  "value": "solid"
                }
              },
              "color": {
                "static": {
                  "value": {
                    "initial": "currentColor",
                    "dark": "currentColor"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "currentColor",
                    "dark": "currentColor"
                  }
                }
              },
              "distance": {
                "value": "2px"
              }
            },
            "fontWeight": {
              "value": "{typography.fontWeight.medium}"
            },
            "hasCode": {
              "borderBottom": {
                "value": "none"
              }
            },
            "code": {
              "border": {
                "width": {
                  "value": "{prose.a.border.width}"
                },
                "style": {
                  "value": "{prose.a.border.style.static}"
                },
                "color": {
                  "static": {
                    "value": {
                      "initial": "{typography.color.secondary.400}",
                      "dark": "{typography.color.secondary.600}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "{typography.color.primary.500}",
                      "dark": "{typography.color.primary.600}"
                    }
                  }
                }
              },
              "color": {
                "static": {
                  "value": {
                    "initial": "currentColor",
                    "dark": "currentColor"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "currentColor",
                    "dark": "currentColor"
                  }
                }
              },
              "background": {
                "static": {},
                "hover": {
                  "value": {
                    "initial": "{typography.color.primary.50}",
                    "dark": "{typography.color.primary.900}"
                  }
                }
              }
            }
          },
          "blockquote": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "paddingInlineStart": {
              "value": "24px"
            },
            "quotes": {
              "value": "'201C' '201D' '2018' '2019'"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.500}",
                "dark": "{typography.color.secondary.400}"
              }
            },
            "border": {
              "width": {
                "value": "4px"
              },
              "style": {
                "value": "solid"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.200}",
                  "dark": "{typography.color.secondary.700}"
                }
              }
            }
          },
          "ul": {
            "listStyleType": {
              "value": "disc"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "paddingInlineStart": {
              "value": "21px"
            },
            "li": {
              "markerColor": {
                "value": {
                  "initial": "currentColor",
                  "dark": "currentColor"
                }
              }
            }
          },
          "ol": {
            "listStyleType": {
              "value": "decimal"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "paddingInlineStart": {
              "value": "21px"
            },
            "li": {
              "markerColor": {
                "value": {
                  "initial": "currentColor",
                  "dark": "currentColor"
                }
              }
            }
          },
          "li": {
            "margin": {
              "value": "{typography.verticalMargin.sm} 0"
            },
            "listStylePosition": {
              "value": "outside"
            }
          },
          "hr": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "style": {
              "value": "solid"
            },
            "width": {
              "value": "1px"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.200}",
                "dark": "{typography.color.secondary.800}"
              }
            }
          },
          "table": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "textAlign": {
              "value": "start"
            },
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            },
            "lineHeight": {
              "value": "{typography.lead.6}"
            }
          },
          "thead": {
            "border": {
              "width": {
                "value": "0px"
              },
              "style": {
                "value": "solid"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.300}",
                  "dark": "{typography.color.secondary.600}"
                }
              }
            },
            "borderBottom": {
              "width": {
                "value": "1px"
              },
              "style": {
                "value": "solid"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.200}",
                  "dark": "{typography.color.secondary.800}"
                }
              }
            }
          },
          "th": {
            "color": {
              "value": {
                "initial": "{typography.color.secondary.600}",
                "dark": "{typography.color.secondary.400}"
              }
            },
            "padding": {
              "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "textAlign": {
              "value": "inherit"
            }
          },
          "tbody": {
            "tr": {
              "borderBottom": {
                "width": {
                  "value": "1px"
                },
                "style": {
                  "value": "dashed"
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.200}",
                    "dark": "{typography.color.secondary.800}"
                  }
                }
              }
            },
            "td": {
              "padding": {
                "value": "{typography.verticalMargin.sm}"
              }
            },
            "code": {
              "inline": {
                "fontSize": {
                  "value": "{typography.fontSize.sm}"
                }
              }
            }
          },
          "code": {
            "block": {
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "border": {
                "width": {
                  "value": "1px"
                },
                "style": {
                  "value": "solid"
                },
                "color": {
                  "value": {
                    "initial": "{typography.color.secondary.200}",
                    "dark": "{typography.color.secondary.800}"
                  }
                }
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.700}",
                  "dark": "{typography.color.secondary.200}"
                }
              },
              "backgroundColor": {
                "value": {
                  "initial": "{typography.color.secondary.100}",
                  "dark": "{typography.color.secondary.900}"
                }
              },
              "backdropFilter": {
                "value": {
                  "initial": "contrast(1)",
                  "dark": "contrast(1)"
                }
              },
              "pre": {
                "padding": {
                  "value": "{typography.verticalMargin.sm}"
                }
              }
            },
            "inline": {
              "borderRadius": {
                "value": "{radii.xs}"
              },
              "padding": {
                "value": "0.2rem 0.375rem 0.2rem 0.375rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.normal}"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.700}",
                  "dark": "{typography.color.secondary.200}"
                }
              },
              "backgroundColor": {
                "value": {
                  "initial": "{typography.color.secondary.100}",
                  "dark": "{typography.color.secondary.800}"
                }
              }
            }
          }
        }
      },
      "docus": {
        "title": "All the configurable tokens from Docus.",
        "tags": [
          "@studioIcon material-symbols:docs"
        ],
        "id": "#tokensConfig/docus",
        "properties": {
          "header": {
            "id": "#tokensConfig/docus/header",
            "properties": {
              "height": {
                "id": "#tokensConfig/docus/header/height",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/header/height/value",
                    "default": "64px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "64px"
                }
              }
            },
            "type": "object",
            "default": {
              "height": {
                "value": "64px"
              }
            }
          },
          "footer": {
            "id": "#tokensConfig/docus/footer",
            "properties": {
              "height": {
                "id": "#tokensConfig/docus/footer/height",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/docus/footer/height/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/docus/footer/height/value/initial",
                        "default": "145px"
                      },
                      "sm": {
                        "type": "string",
                        "id": "#tokensConfig/docus/footer/height/value/sm",
                        "default": "100px"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "145px",
                      "sm": "100px"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "145px",
                    "sm": "100px"
                  }
                }
              },
              "padding": {
                "id": "#tokensConfig/docus/footer/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/footer/padding/value",
                    "default": "{space.4} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{space.4} 0"
                }
              }
            },
            "type": "object",
            "default": {
              "height": {
                "value": {
                  "initial": "145px",
                  "sm": "100px"
                }
              },
              "padding": {
                "value": "{space.4} 0"
              }
            }
          },
          "readableLine": {
            "id": "#tokensConfig/docus/readableLine",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/docus/readableLine/value",
                "default": "78ch"
              }
            },
            "type": "object",
            "default": {
              "value": "78ch"
            }
          },
          "loadingBar": {
            "id": "#tokensConfig/docus/loadingBar",
            "properties": {
              "height": {
                "id": "#tokensConfig/docus/loadingBar/height",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/loadingBar/height/value",
                    "default": "3px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3px"
                }
              },
              "gradientColorStop1": {
                "id": "#tokensConfig/docus/loadingBar/gradientColorStop1",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/loadingBar/gradientColorStop1/value",
                    "default": "#00dc82"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00dc82"
                }
              },
              "gradientColorStop2": {
                "id": "#tokensConfig/docus/loadingBar/gradientColorStop2",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/loadingBar/gradientColorStop2/value",
                    "default": "#34cdfe"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#34cdfe"
                }
              },
              "gradientColorStop3": {
                "id": "#tokensConfig/docus/loadingBar/gradientColorStop3",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/loadingBar/gradientColorStop3/value",
                    "default": "#0047e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0047e1"
                }
              }
            },
            "type": "object",
            "default": {
              "height": {
                "value": "3px"
              },
              "gradientColorStop1": {
                "value": "#00dc82"
              },
              "gradientColorStop2": {
                "value": "#34cdfe"
              },
              "gradientColorStop3": {
                "value": "#0047e1"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "header": {
            "height": {
              "value": "64px"
            }
          },
          "footer": {
            "height": {
              "value": {
                "initial": "145px",
                "sm": "100px"
              }
            },
            "padding": {
              "value": "{space.4} 0"
            }
          },
          "readableLine": {
            "value": "78ch"
          },
          "loadingBar": {
            "height": {
              "value": "3px"
            },
            "gradientColorStop1": {
              "value": "#00dc82"
            },
            "gradientColorStop2": {
              "value": "#34cdfe"
            },
            "gradientColorStop3": {
              "value": "#0047e1"
            }
          }
        }
      }
    },
    "type": "object",
    "default": {
      "media": {
        "xs": {
          "value": "(min-width: 475px)"
        },
        "sm": {
          "value": "(min-width: 640px)"
        },
        "md": {
          "value": "(min-width: 768px)"
        },
        "lg": {
          "value": "(min-width: 1024px)"
        },
        "xl": {
          "value": "(min-width: 1280px)"
        },
        "2xl": {
          "value": "(min-width: 1536px)"
        },
        "rm": {
          "value": "(prefers-reduced-motion: reduce)"
        },
        "landscape": {
          "value": "only screen and (orientation: landscape)"
        },
        "portrait": {
          "value": "only screen and (orientation: portrait)"
        }
      },
      "color": {
        "white": {
          "value": "#ffffff"
        },
        "black": {
          "value": "#0B0A0A"
        },
        "gray": {
          "50": {
            "value": "#FBFBFB"
          },
          "100": {
            "value": "#F6F5F4"
          },
          "200": {
            "value": "#ECEBE8"
          },
          "300": {
            "value": "#DBD9D3"
          },
          "400": {
            "value": "#ADA9A4"
          },
          "500": {
            "value": "#97948F"
          },
          "600": {
            "value": "#67635D"
          },
          "700": {
            "value": "#36332E"
          },
          "800": {
            "value": "#201E1B"
          },
          "900": {
            "value": "#121110"
          }
        },
        "green": {
          "50": {
            "value": "#ECFFF7"
          },
          "100": {
            "value": "#DEFFF1"
          },
          "200": {
            "value": "#C3FFE6"
          },
          "300": {
            "value": "#86FBCB"
          },
          "400": {
            "value": "#3CEEA5"
          },
          "500": {
            "value": "#0DD885"
          },
          "600": {
            "value": "#00B467"
          },
          "700": {
            "value": "#006037"
          },
          "800": {
            "value": "#002817"
          },
          "900": {
            "value": "#00190F"
          }
        },
        "yellow": {
          "50": {
            "value": "#FFFDEA"
          },
          "100": {
            "value": "#FFF8CC"
          },
          "200": {
            "value": "#FEF5A4"
          },
          "300": {
            "value": "#FFEF8A"
          },
          "400": {
            "value": "#FFE53C"
          },
          "500": {
            "value": "#EECF00"
          },
          "600": {
            "value": "#C2A905"
          },
          "700": {
            "value": "#6B5D02"
          },
          "800": {
            "value": "#282300"
          },
          "900": {
            "value": "#1A1700"
          }
        },
        "orange": {
          "50": {
            "value": "#ffe9d9"
          },
          "100": {
            "value": "#ffd3b3"
          },
          "200": {
            "value": "#ffbd8d"
          },
          "300": {
            "value": "#ffa666"
          },
          "400": {
            "value": "#ff9040"
          },
          "500": {
            "value": "#ff7a1a"
          },
          "600": {
            "value": "#e15e00"
          },
          "700": {
            "value": "#a94700"
          },
          "800": {
            "value": "#702f00"
          },
          "900": {
            "value": "#381800"
          }
        },
        "red": {
          "50": {
            "value": "#FFF9F8"
          },
          "100": {
            "value": "#FFF3F0"
          },
          "200": {
            "value": "#FFDED7"
          },
          "300": {
            "value": "#FFA692"
          },
          "400": {
            "value": "#FF7353"
          },
          "500": {
            "value": "#FF3B10"
          },
          "600": {
            "value": "#BB2402"
          },
          "700": {
            "value": "#701704"
          },
          "800": {
            "value": "#340A01"
          },
          "900": {
            "value": "#1C0301"
          }
        },
        "pear": {
          "50": {
            "value": "#f7f8dc"
          },
          "100": {
            "value": "#eff0ba"
          },
          "200": {
            "value": "#e8e997"
          },
          "300": {
            "value": "#e0e274"
          },
          "400": {
            "value": "#d8da52"
          },
          "500": {
            "value": "#d0d32f"
          },
          "600": {
            "value": "#a8aa24"
          },
          "700": {
            "value": "#7e801b"
          },
          "800": {
            "value": "#545512"
          },
          "900": {
            "value": "#2a2b09"
          }
        },
        "teal": {
          "50": {
            "value": "#d7faf8"
          },
          "100": {
            "value": "#aff4f0"
          },
          "200": {
            "value": "#87efe9"
          },
          "300": {
            "value": "#5fe9e1"
          },
          "400": {
            "value": "#36e4da"
          },
          "500": {
            "value": "#1cd1c6"
          },
          "600": {
            "value": "#16a79e"
          },
          "700": {
            "value": "#117d77"
          },
          "800": {
            "value": "#0b544f"
          },
          "900": {
            "value": "#062a28"
          }
        },
        "lightblue": {
          "50": {
            "value": "#d9f8ff"
          },
          "100": {
            "value": "#b3f1ff"
          },
          "200": {
            "value": "#8deaff"
          },
          "300": {
            "value": "#66e4ff"
          },
          "400": {
            "value": "#40ddff"
          },
          "500": {
            "value": "#1ad6ff"
          },
          "600": {
            "value": "#00b9e1"
          },
          "700": {
            "value": "#008aa9"
          },
          "800": {
            "value": "#005c70"
          },
          "900": {
            "value": "#002e38"
          }
        },
        "blue": {
          "50": {
            "value": "#F2FAFF"
          },
          "100": {
            "value": "#DFF3FF"
          },
          "200": {
            "value": "#C6EAFF"
          },
          "300": {
            "value": "#A1DDFF"
          },
          "400": {
            "value": "#64C7FF"
          },
          "500": {
            "value": "#1AADFF"
          },
          "600": {
            "value": "#0069A6"
          },
          "700": {
            "value": "#003351"
          },
          "800": {
            "value": "#002235"
          },
          "900": {
            "value": "#00131D"
          }
        },
        "indigoblue": {
          "50": {
            "value": "#d9e5ff"
          },
          "100": {
            "value": "#b3cbff"
          },
          "200": {
            "value": "#8db0ff"
          },
          "300": {
            "value": "#6696ff"
          },
          "400": {
            "value": "#407cff"
          },
          "500": {
            "value": "#1a62ff"
          },
          "600": {
            "value": "#0047e1"
          },
          "700": {
            "value": "#0035a9"
          },
          "800": {
            "value": "#002370"
          },
          "900": {
            "value": "#001238"
          }
        },
        "royalblue": {
          "50": {
            "value": "#dfdbfb"
          },
          "100": {
            "value": "#c0b7f7"
          },
          "200": {
            "value": "#a093f3"
          },
          "300": {
            "value": "#806ff0"
          },
          "400": {
            "value": "#614bec"
          },
          "500": {
            "value": "#4127e8"
          },
          "600": {
            "value": "#2c15c4"
          },
          "700": {
            "value": "#211093"
          },
          "800": {
            "value": "#160a62"
          },
          "900": {
            "value": "#0b0531"
          }
        },
        "purple": {
          "50": {
            "value": "#ead9ff"
          },
          "100": {
            "value": "#d5b3ff"
          },
          "200": {
            "value": "#c08dff"
          },
          "300": {
            "value": "#ab66ff"
          },
          "400": {
            "value": "#9640ff"
          },
          "500": {
            "value": "#811aff"
          },
          "600": {
            "value": "#6500e1"
          },
          "700": {
            "value": "#4c00a9"
          },
          "800": {
            "value": "#330070"
          },
          "900": {
            "value": "#190038"
          }
        },
        "pink": {
          "50": {
            "value": "#ffd9f2"
          },
          "100": {
            "value": "#ffb3e5"
          },
          "200": {
            "value": "#ff8dd8"
          },
          "300": {
            "value": "#ff66cc"
          },
          "400": {
            "value": "#ff40bf"
          },
          "500": {
            "value": "#ff1ab2"
          },
          "600": {
            "value": "#e10095"
          },
          "700": {
            "value": "#a90070"
          },
          "800": {
            "value": "#70004b"
          },
          "900": {
            "value": "#380025"
          }
        },
        "ruby": {
          "50": {
            "value": "#ffd9e4"
          },
          "100": {
            "value": "#ffb3c9"
          },
          "200": {
            "value": "#ff8dae"
          },
          "300": {
            "value": "#ff6694"
          },
          "400": {
            "value": "#ff4079"
          },
          "500": {
            "value": "#ff1a5e"
          },
          "600": {
            "value": "#e10043"
          },
          "700": {
            "value": "#a90032"
          },
          "800": {
            "value": "#700021"
          },
          "900": {
            "value": "#380011"
          }
        },
        "primary": {
          "50": {
            "value": "#F1FCFF"
          },
          "100": {
            "value": "#DCF7FF"
          },
          "200": {
            "value": "#C5F2FF"
          },
          "300": {
            "value": "#82E3FF"
          },
          "400": {
            "value": "#55E1FF"
          },
          "500": {
            "value": "#1AD6FF"
          },
          "600": {
            "value": "#09A0C1"
          },
          "700": {
            "value": "#024757"
          },
          "800": {
            "value": "#00232B"
          },
          "900": {
            "value": "#001A1F"
          }
        },
        "secondary": {
          "50": {
            "value": "{color.gray.50}"
          },
          "100": {
            "value": "{color.gray.100}"
          },
          "200": {
            "value": "{color.gray.200}"
          },
          "300": {
            "value": "{color.gray.300}"
          },
          "400": {
            "value": "{color.gray.400}"
          },
          "500": {
            "value": "{color.gray.500}"
          },
          "600": {
            "value": "{color.gray.600}"
          },
          "700": {
            "value": "{color.gray.700}"
          },
          "800": {
            "value": "{color.gray.800}"
          },
          "900": {
            "value": "{color.gray.900}"
          }
        }
      },
      "width": {
        "screen": {
          "value": "100vw"
        }
      },
      "height": {
        "screen": {
          "value": "100vh"
        }
      },
      "shadow": {
        "xs": {
          "value": "0px 1px 2px 0px #000000"
        },
        "sm": {
          "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
        },
        "md": {
          "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
        },
        "lg": {
          "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
        },
        "xl": {
          "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
        },
        "2xl": {
          "value": "0px 25px 50px -12px {color.gray.900}"
        },
        "none": {
          "value": "0px 0px 0px 0px transparent"
        }
      },
      "radii": {
        "none": {
          "value": "0px"
        },
        "2xs": {
          "value": "0.125rem"
        },
        "xs": {
          "value": "0.25rem"
        },
        "sm": {
          "value": "0.375rem"
        },
        "md": {
          "value": "0.5rem"
        },
        "lg": {
          "value": "0.75rem"
        },
        "xl": {
          "value": "1rem"
        },
        "2xl": {
          "value": "1.5rem"
        },
        "3xl": {
          "value": "1.75rem"
        },
        "full": {
          "value": "9999px"
        }
      },
      "size": {
        "0": {
          "value": "0px"
        },
        "2": {
          "value": "2px"
        },
        "4": {
          "value": "4px"
        },
        "6": {
          "value": "6px"
        },
        "8": {
          "value": "8px"
        },
        "12": {
          "value": "12px"
        },
        "16": {
          "value": "16px"
        },
        "20": {
          "value": "20px"
        },
        "24": {
          "value": "24px"
        },
        "32": {
          "value": "32px"
        },
        "40": {
          "value": "40px"
        },
        "48": {
          "value": "48px"
        },
        "56": {
          "value": "56px"
        },
        "64": {
          "value": "64px"
        },
        "80": {
          "value": "80px"
        },
        "104": {
          "value": "104px"
        },
        "200": {
          "value": "200px"
        },
        "xs": {
          "value": "20rem"
        },
        "sm": {
          "value": "24rem"
        },
        "md": {
          "value": "28rem"
        },
        "lg": {
          "value": "32rem"
        },
        "xl": {
          "value": "36rem"
        },
        "2xl": {
          "value": "42rem"
        },
        "3xl": {
          "value": "48rem"
        },
        "4xl": {
          "value": "56rem"
        },
        "5xl": {
          "value": "64rem"
        },
        "6xl": {
          "value": "72rem"
        },
        "7xl": {
          "value": "80rem"
        },
        "full": {
          "value": "100%"
        }
      },
      "space": {
        "0": {
          "value": "0px"
        },
        "1": {
          "value": "0.25rem"
        },
        "2": {
          "value": "0.5rem"
        },
        "3": {
          "value": "0.75rem"
        },
        "4": {
          "value": "1rem"
        },
        "5": {
          "value": "1.25rem"
        },
        "6": {
          "value": "1.5rem"
        },
        "7": {
          "value": "1.75rem"
        },
        "8": {
          "value": "2rem"
        },
        "9": {
          "value": "2.25rem"
        },
        "10": {
          "value": "2.5rem"
        },
        "11": {
          "value": "2.75rem"
        },
        "12": {
          "value": "3rem"
        },
        "14": {
          "value": "3.5rem"
        },
        "16": {
          "value": "4rem"
        },
        "20": {
          "value": "5rem"
        },
        "24": {
          "value": "6rem"
        },
        "28": {
          "value": "7rem"
        },
        "32": {
          "value": "8rem"
        },
        "36": {
          "value": "9rem"
        },
        "40": {
          "value": "10rem"
        },
        "44": {
          "value": "11rem"
        },
        "48": {
          "value": "12rem"
        },
        "52": {
          "value": "13rem"
        },
        "56": {
          "value": "14rem"
        },
        "60": {
          "value": "15rem"
        },
        "64": {
          "value": "16rem"
        },
        "72": {
          "value": "18rem"
        },
        "80": {
          "value": "20rem"
        },
        "96": {
          "value": "24rem"
        },
        "128": {
          "value": "32rem"
        },
        "px": {
          "value": "1px"
        },
        "rem": {
          "125": {
            "value": "0.125rem"
          },
          "375": {
            "value": "0.375rem"
          },
          "625": {
            "value": "0.625rem"
          },
          "875": {
            "value": "0.875rem"
          }
        }
      },
      "borderWidth": {
        "noBorder": {
          "value": "0"
        },
        "sm": {
          "value": "1px"
        },
        "md": {
          "value": "2px"
        },
        "lg": {
          "value": "3px"
        }
      },
      "opacity": {
        "noOpacity": {
          "value": "0"
        },
        "bright": {
          "value": "0.1"
        },
        "light": {
          "value": "0.15"
        },
        "soft": {
          "value": "0.3"
        },
        "medium": {
          "value": "0.5"
        },
        "high": {
          "value": "0.8"
        },
        "total": {
          "value": "1"
        }
      },
      "font": {
        "sans": {
          "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
        },
        "serif": {
          "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
        },
        "mono": {
          "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
        }
      },
      "fontWeight": {
        "thin": {
          "value": "100"
        },
        "extralight": {
          "value": "200"
        },
        "light": {
          "value": "300"
        },
        "normal": {
          "value": "400"
        },
        "medium": {
          "value": "500"
        },
        "semibold": {
          "value": "600"
        },
        "bold": {
          "value": "700"
        },
        "extrabold": {
          "value": "800"
        },
        "black": {
          "value": "900"
        }
      },
      "fontSize": {
        "xs": {
          "value": "0.75rem"
        },
        "sm": {
          "value": "0.875rem"
        },
        "base": {
          "value": "1rem"
        },
        "lg": {
          "value": "1.125rem"
        },
        "xl": {
          "value": "1.25rem"
        },
        "2xl": {
          "value": "1.5rem"
        },
        "3xl": {
          "value": "1.875rem"
        },
        "4xl": {
          "value": "2.25rem"
        },
        "5xl": {
          "value": "3rem"
        },
        "6xl": {
          "value": "3.75rem"
        },
        "7xl": {
          "value": "4.5rem"
        },
        "8xl": {
          "value": "6rem"
        },
        "9xl": {
          "value": "8rem"
        }
      },
      "letterSpacing": {
        "tighter": {
          "value": "-0.05em"
        },
        "tight": {
          "value": "-0.025em"
        },
        "normal": {
          "value": "0em"
        },
        "wide": {
          "value": "0.025em"
        },
        "wider": {
          "value": "0.05em"
        },
        "widest": {
          "value": "0.1em"
        }
      },
      "lead": {
        "1": {
          "value": ".025rem"
        },
        "2": {
          "value": ".5rem"
        },
        "3": {
          "value": ".75rem"
        },
        "4": {
          "value": "1rem"
        },
        "5": {
          "value": "1.25rem"
        },
        "6": {
          "value": "1.5rem"
        },
        "7": {
          "value": "1.75rem"
        },
        "8": {
          "value": "2rem"
        },
        "9": {
          "value": "2.25rem"
        },
        "10": {
          "value": "2.5rem"
        },
        "none": {
          "value": "1"
        },
        "tight": {
          "value": "1.25"
        },
        "snug": {
          "value": "1.375"
        },
        "normal": {
          "value": "1.5"
        },
        "relaxed": {
          "value": "1.625"
        },
        "loose": {
          "value": "2"
        }
      },
      "text": {
        "xs": {
          "fontSize": {
            "value": "{fontSize.xs}"
          },
          "lineHeight": {
            "value": "{lead.4}"
          }
        },
        "sm": {
          "fontSize": {
            "value": "{fontSize.sm}"
          },
          "lineHeight": {
            "value": "{lead.5}"
          }
        },
        "base": {
          "fontSize": {
            "value": "{fontSize.base}"
          },
          "lineHeight": {
            "value": "{lead.6}"
          }
        },
        "lg": {
          "fontSize": {
            "value": "{fontSize.lg}"
          },
          "lineHeight": {
            "value": "{lead.7}"
          }
        },
        "xl": {
          "fontSize": {
            "value": "{fontSize.xl}"
          },
          "lineHeight": {
            "value": "{lead.7}"
          }
        },
        "2xl": {
          "fontSize": {
            "value": "{fontSize.2xl}"
          },
          "lineHeight": {
            "value": "{lead.8}"
          }
        },
        "3xl": {
          "fontSize": {
            "value": "{fontSize.3xl}"
          },
          "lineHeight": {
            "value": "{lead.9}"
          }
        },
        "4xl": {
          "fontSize": {
            "value": "{fontSize.4xl}"
          },
          "lineHeight": {
            "value": "{lead.10}"
          }
        },
        "5xl": {
          "fontSize": {
            "value": "{fontSize.5xl}"
          },
          "lineHeight": {
            "value": "{lead.none}"
          }
        },
        "6xl": {
          "fontSize": {
            "value": "{fontSize.6xl}"
          },
          "lineHeight": {
            "value": "{lead.none}"
          }
        }
      },
      "elements": {
        "text": {
          "primary": {
            "color": {
              "static": {
                "value": {
                  "initial": "{color.gray.900}",
                  "dark": "{color.gray.50}"
                }
              },
              "hover": {}
            }
          },
          "secondary": {
            "color": {
              "static": {
                "value": {
                  "initial": "{color.gray.500}",
                  "dark": "{color.gray.400}"
                }
              },
              "hover": {
                "value": {
                  "initial": "{color.gray.700}",
                  "dark": "{color.gray.200}"
                }
              }
            }
          }
        },
        "container": {
          "maxWidth": {
            "value": "80rem"
          },
          "padding": {
            "mobile": {
              "value": "{space.4}"
            },
            "xs": {
              "value": "{space.4}"
            },
            "sm": {
              "value": "{space.6}"
            },
            "md": {
              "value": "{space.6}"
            }
          }
        },
        "backdrop": {
          "filter": {
            "value": "saturate(200%) blur(20px)"
          },
          "background": {
            "value": {
              "initial": "#fffc",
              "dark": "#0c0d0ccc"
            }
          }
        },
        "border": {
          "primary": {
            "static": {
              "value": {
                "initial": "{color.gray.100}",
                "dark": "{color.gray.900}"
              }
            },
            "hover": {
              "value": {
                "initial": "{color.gray.200}",
                "dark": "{color.gray.800}"
              }
            }
          },
          "secondary": {
            "static": {
              "value": {
                "initial": "{color.gray.200}",
                "dark": "{color.gray.800}"
              }
            },
            "hover": {
              "value": {
                "initial": "",
                "dark": ""
              }
            }
          }
        },
        "surface": {
          "background": {
            "base": {
              "value": {
                "initial": "{color.gray.100}",
                "dark": "{color.gray.900}"
              }
            }
          },
          "primary": {
            "backgroundColor": {
              "value": {
                "initial": "{color.gray.100}",
                "dark": "{color.gray.900}"
              }
            }
          },
          "secondary": {
            "backgroundColor": {
              "value": {
                "initial": "{color.gray.200}",
                "dark": "{color.gray.800}"
              }
            }
          }
        },
        "state": {
          "primary": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.primary.600}",
                  "dark": "{color.primary.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.primary.700}",
                  "dark": "{color.primary.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.primary.50}",
                  "dark": "{color.primary.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.primary.100}",
                  "dark": "{color.primary.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.primary.100}",
                  "dark": "{color.primary.800}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.primary.200}",
                  "dark": "{color.primary.700}"
                }
              }
            }
          },
          "info": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.blue.500}",
                  "dark": "{color.blue.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.blue.600}",
                  "dark": "{color.blue.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.blue.50}",
                  "dark": "{color.blue.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.blue.100}",
                  "dark": "{color.blue.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.blue.100}",
                  "dark": "{color.blue.800}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.blue.200}",
                  "dark": "{color.blue.700}"
                }
              }
            }
          },
          "success": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.green.500}",
                  "dark": "{color.green.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.green.600}",
                  "dark": "{color.green.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.green.50}",
                  "dark": "{color.green.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.green.100}",
                  "dark": "{color.green.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.green.100}",
                  "dark": "{color.green.800}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.green.200}",
                  "dark": "{color.green.700}"
                }
              }
            }
          },
          "warning": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.yellow.600}",
                  "dark": "{color.yellow.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.yellow.700}",
                  "dark": "{color.yellow.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.yellow.50}",
                  "dark": "{color.yellow.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.yellow.100}",
                  "dark": "{color.yellow.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.yellow.100}",
                  "dark": "{color.yellow.800}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.yellow.200}",
                  "dark": "{color.yellow.700}"
                }
              }
            }
          },
          "danger": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.red.500}",
                  "dark": "{color.red.300}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.red.600}",
                  "dark": "{color.red.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.red.50}",
                  "dark": "{color.red.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.red.100}",
                  "dark": "{color.red.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.red.100}",
                  "dark": "{color.red.800}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.red.200}",
                  "dark": "{color.red.700}"
                }
              }
            }
          }
        }
      },
      "typography": {
        "body": {
          "color": {
            "value": {
              "initial": "{color.black}",
              "dark": "{color.white}"
            }
          },
          "backgroundColor": {
            "value": {
              "initial": "{color.white}",
              "dark": "{color.black}"
            }
          }
        },
        "verticalMargin": {
          "sm": {
            "value": "16px"
          },
          "base": {
            "value": "24px"
          }
        },
        "letterSpacing": {
          "tight": {
            "value": "-0.025em"
          },
          "wide": {
            "value": "0.025em"
          }
        },
        "fontSize": {
          "xs": {
            "value": "12px"
          },
          "sm": {
            "value": "14px"
          },
          "base": {
            "value": "16px"
          },
          "lg": {
            "value": "18px"
          },
          "xl": {
            "value": "20px"
          },
          "2xl": {
            "value": "24px"
          },
          "3xl": {
            "value": "30px"
          },
          "4xl": {
            "value": "36px"
          },
          "5xl": {
            "value": "48px"
          },
          "6xl": {
            "value": "60px"
          },
          "7xl": {
            "value": "72px"
          },
          "8xl": {
            "value": "96px"
          },
          "9xl": {
            "value": "128px"
          }
        },
        "fontWeight": {
          "thin": {
            "value": "100"
          },
          "extralight": {
            "value": "200"
          },
          "light": {
            "value": "300"
          },
          "normal": {
            "value": "400"
          },
          "medium": {
            "value": "500"
          },
          "semibold": {
            "value": "600"
          },
          "bold": {
            "value": "700"
          },
          "extrabold": {
            "value": "800"
          },
          "black": {
            "value": "900"
          }
        },
        "lead": {
          "1": {
            "value": ".025rem"
          },
          "2": {
            "value": ".5rem"
          },
          "3": {
            "value": ".75rem"
          },
          "4": {
            "value": "1rem"
          },
          "5": {
            "value": "1.25rem"
          },
          "6": {
            "value": "1.5rem"
          },
          "7": {
            "value": "1.75rem"
          },
          "8": {
            "value": "2rem"
          },
          "9": {
            "value": "2.25rem"
          },
          "10": {
            "value": "2.5rem"
          },
          "none": {
            "value": "1"
          },
          "tight": {
            "value": "1.25"
          },
          "snug": {
            "value": "1.375"
          },
          "normal": {
            "value": "1.5"
          },
          "relaxed": {
            "value": "1.625"
          },
          "loose": {
            "value": "2"
          }
        },
        "font": {
          "display": {
            "value": "{font.sans}"
          },
          "body": {
            "value": "{font.sans}"
          },
          "code": {
            "value": "{font.mono}"
          }
        },
        "color": {
          "primary": {
            "50": {
              "value": "{color.primary.50}"
            },
            "100": {
              "value": "{color.primary.100}"
            },
            "200": {
              "value": "{color.primary.200}"
            },
            "300": {
              "value": "{color.primary.300}"
            },
            "400": {
              "value": "{color.primary.400}"
            },
            "500": {
              "value": "{color.primary.500}"
            },
            "600": {
              "value": "{color.primary.600}"
            },
            "700": {
              "value": "{color.primary.700}"
            },
            "800": {
              "value": "{color.primary.800}"
            },
            "900": {
              "value": "{color.primary.900}"
            }
          },
          "secondary": {
            "50": {
              "value": "{color.gray.50}"
            },
            "100": {
              "value": "{color.gray.100}"
            },
            "200": {
              "value": "{color.gray.200}"
            },
            "300": {
              "value": "{color.gray.300}"
            },
            "400": {
              "value": "{color.gray.400}"
            },
            "500": {
              "value": "{color.gray.500}"
            },
            "600": {
              "value": "{color.gray.600}"
            },
            "700": {
              "value": "{color.gray.700}"
            },
            "800": {
              "value": "{color.gray.800}"
            },
            "900": {
              "value": "{color.gray.900}"
            }
          }
        }
      },
      "prose": {
        "p": {
          "fontSize": {
            "value": "{typography.fontSize.base}"
          },
          "lineHeight": {
            "value": "{typography.lead.normal}"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "br": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0 0 0"
            }
          }
        },
        "h1": {
          "margin": {
            "value": "0 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.5xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.tight}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.bold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.3xl}"
          }
        },
        "h2": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.4xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.tight}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.2xl}"
          }
        },
        "h3": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.3xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.snug}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.xl}"
          }
        },
        "h4": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.2xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.snug}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.lg}"
          }
        },
        "h5": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.snug}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "iconSize": {
            "value": "{typography.fontSize.lg}"
          }
        },
        "h6": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.lg}"
          },
          "lineHeight": {
            "value": "{typography.lead.normal}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "iconSize": {
            "value": "{typography.fontSize.base}"
          }
        },
        "strong": {
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          }
        },
        "img": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          }
        },
        "a": {
          "textDecoration": {
            "value": "none"
          },
          "color": {
            "static": {
              "value": {
                "initial": "inherit",
                "dark": "inherit"
              }
            },
            "hover": {
              "value": {
                "initial": "{typography.color.primary.500}",
                "dark": "{typography.color.primary.400}"
              }
            }
          },
          "border": {
            "width": {
              "value": "1px"
            },
            "style": {
              "static": {
                "value": "dashed"
              },
              "hover": {
                "value": "solid"
              }
            },
            "color": {
              "static": {
                "value": {
                  "initial": "currentColor",
                  "dark": "currentColor"
                }
              },
              "hover": {
                "value": {
                  "initial": "currentColor",
                  "dark": "currentColor"
                }
              }
            },
            "distance": {
              "value": "2px"
            }
          },
          "fontWeight": {
            "value": "{typography.fontWeight.medium}"
          },
          "hasCode": {
            "borderBottom": {
              "value": "none"
            }
          },
          "code": {
            "border": {
              "width": {
                "value": "{prose.a.border.width}"
              },
              "style": {
                "value": "{prose.a.border.style.static}"
              },
              "color": {
                "static": {
                  "value": {
                    "initial": "{typography.color.secondary.400}",
                    "dark": "{typography.color.secondary.600}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "{typography.color.primary.500}",
                    "dark": "{typography.color.primary.600}"
                  }
                }
              }
            },
            "color": {
              "static": {
                "value": {
                  "initial": "currentColor",
                  "dark": "currentColor"
                }
              },
              "hover": {
                "value": {
                  "initial": "currentColor",
                  "dark": "currentColor"
                }
              }
            },
            "background": {
              "static": {},
              "hover": {
                "value": {
                  "initial": "{typography.color.primary.50}",
                  "dark": "{typography.color.primary.900}"
                }
              }
            }
          }
        },
        "blockquote": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "paddingInlineStart": {
            "value": "24px"
          },
          "quotes": {
            "value": "'201C' '201D' '2018' '2019'"
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.500}",
              "dark": "{typography.color.secondary.400}"
            }
          },
          "border": {
            "width": {
              "value": "4px"
            },
            "style": {
              "value": "solid"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.200}",
                "dark": "{typography.color.secondary.700}"
              }
            }
          }
        },
        "ul": {
          "listStyleType": {
            "value": "disc"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "paddingInlineStart": {
            "value": "21px"
          },
          "li": {
            "markerColor": {
              "value": {
                "initial": "currentColor",
                "dark": "currentColor"
              }
            }
          }
        },
        "ol": {
          "listStyleType": {
            "value": "decimal"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "paddingInlineStart": {
            "value": "21px"
          },
          "li": {
            "markerColor": {
              "value": {
                "initial": "currentColor",
                "dark": "currentColor"
              }
            }
          }
        },
        "li": {
          "margin": {
            "value": "{typography.verticalMargin.sm} 0"
          },
          "listStylePosition": {
            "value": "outside"
          }
        },
        "hr": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "style": {
            "value": "solid"
          },
          "width": {
            "value": "1px"
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.200}",
              "dark": "{typography.color.secondary.800}"
            }
          }
        },
        "table": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "textAlign": {
            "value": "start"
          },
          "fontSize": {
            "value": "{typography.fontSize.sm}"
          },
          "lineHeight": {
            "value": "{typography.lead.6}"
          }
        },
        "thead": {
          "border": {
            "width": {
              "value": "0px"
            },
            "style": {
              "value": "solid"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.300}",
                "dark": "{typography.color.secondary.600}"
              }
            }
          },
          "borderBottom": {
            "width": {
              "value": "1px"
            },
            "style": {
              "value": "solid"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.200}",
                "dark": "{typography.color.secondary.800}"
              }
            }
          }
        },
        "th": {
          "color": {
            "value": {
              "initial": "{typography.color.secondary.600}",
              "dark": "{typography.color.secondary.400}"
            }
          },
          "padding": {
            "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "textAlign": {
            "value": "inherit"
          }
        },
        "tbody": {
          "tr": {
            "borderBottom": {
              "width": {
                "value": "1px"
              },
              "style": {
                "value": "dashed"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.200}",
                  "dark": "{typography.color.secondary.800}"
                }
              }
            }
          },
          "td": {
            "padding": {
              "value": "{typography.verticalMargin.sm}"
            }
          },
          "code": {
            "inline": {
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              }
            }
          }
        },
        "code": {
          "block": {
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "border": {
              "width": {
                "value": "1px"
              },
              "style": {
                "value": "solid"
              },
              "color": {
                "value": {
                  "initial": "{typography.color.secondary.200}",
                  "dark": "{typography.color.secondary.800}"
                }
              }
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.700}",
                "dark": "{typography.color.secondary.200}"
              }
            },
            "backgroundColor": {
              "value": {
                "initial": "{typography.color.secondary.100}",
                "dark": "{typography.color.secondary.900}"
              }
            },
            "backdropFilter": {
              "value": {
                "initial": "contrast(1)",
                "dark": "contrast(1)"
              }
            },
            "pre": {
              "padding": {
                "value": "{typography.verticalMargin.sm}"
              }
            }
          },
          "inline": {
            "borderRadius": {
              "value": "{radii.xs}"
            },
            "padding": {
              "value": "0.2rem 0.375rem 0.2rem 0.375rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.normal}"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.700}",
                "dark": "{typography.color.secondary.200}"
              }
            },
            "backgroundColor": {
              "value": {
                "initial": "{typography.color.secondary.100}",
                "dark": "{typography.color.secondary.800}"
              }
            }
          }
        }
      },
      "docus": {
        "header": {
          "height": {
            "value": "64px"
          }
        },
        "footer": {
          "height": {
            "value": {
              "initial": "145px",
              "sm": "100px"
            }
          },
          "padding": {
            "value": "{space.4} 0"
          }
        },
        "readableLine": {
          "value": "78ch"
        },
        "loadingBar": {
          "height": {
            "value": "3px"
          },
          "gradientColorStop1": {
            "value": "#00dc82"
          },
          "gradientColorStop2": {
            "value": "#34cdfe"
          },
          "gradientColorStop3": {
            "value": "#0047e1"
          }
        }
      }
    }
  },
  "default": {
    "media": {
      "xs": {
        "value": "(min-width: 475px)"
      },
      "sm": {
        "value": "(min-width: 640px)"
      },
      "md": {
        "value": "(min-width: 768px)"
      },
      "lg": {
        "value": "(min-width: 1024px)"
      },
      "xl": {
        "value": "(min-width: 1280px)"
      },
      "2xl": {
        "value": "(min-width: 1536px)"
      },
      "rm": {
        "value": "(prefers-reduced-motion: reduce)"
      },
      "landscape": {
        "value": "only screen and (orientation: landscape)"
      },
      "portrait": {
        "value": "only screen and (orientation: portrait)"
      }
    },
    "color": {
      "white": {
        "value": "#ffffff"
      },
      "black": {
        "value": "#0B0A0A"
      },
      "gray": {
        "50": {
          "value": "#FBFBFB"
        },
        "100": {
          "value": "#F6F5F4"
        },
        "200": {
          "value": "#ECEBE8"
        },
        "300": {
          "value": "#DBD9D3"
        },
        "400": {
          "value": "#ADA9A4"
        },
        "500": {
          "value": "#97948F"
        },
        "600": {
          "value": "#67635D"
        },
        "700": {
          "value": "#36332E"
        },
        "800": {
          "value": "#201E1B"
        },
        "900": {
          "value": "#121110"
        }
      },
      "green": {
        "50": {
          "value": "#ECFFF7"
        },
        "100": {
          "value": "#DEFFF1"
        },
        "200": {
          "value": "#C3FFE6"
        },
        "300": {
          "value": "#86FBCB"
        },
        "400": {
          "value": "#3CEEA5"
        },
        "500": {
          "value": "#0DD885"
        },
        "600": {
          "value": "#00B467"
        },
        "700": {
          "value": "#006037"
        },
        "800": {
          "value": "#002817"
        },
        "900": {
          "value": "#00190F"
        }
      },
      "yellow": {
        "50": {
          "value": "#FFFDEA"
        },
        "100": {
          "value": "#FFF8CC"
        },
        "200": {
          "value": "#FEF5A4"
        },
        "300": {
          "value": "#FFEF8A"
        },
        "400": {
          "value": "#FFE53C"
        },
        "500": {
          "value": "#EECF00"
        },
        "600": {
          "value": "#C2A905"
        },
        "700": {
          "value": "#6B5D02"
        },
        "800": {
          "value": "#282300"
        },
        "900": {
          "value": "#1A1700"
        }
      },
      "orange": {
        "50": {
          "value": "#ffe9d9"
        },
        "100": {
          "value": "#ffd3b3"
        },
        "200": {
          "value": "#ffbd8d"
        },
        "300": {
          "value": "#ffa666"
        },
        "400": {
          "value": "#ff9040"
        },
        "500": {
          "value": "#ff7a1a"
        },
        "600": {
          "value": "#e15e00"
        },
        "700": {
          "value": "#a94700"
        },
        "800": {
          "value": "#702f00"
        },
        "900": {
          "value": "#381800"
        }
      },
      "red": {
        "50": {
          "value": "#FFF9F8"
        },
        "100": {
          "value": "#FFF3F0"
        },
        "200": {
          "value": "#FFDED7"
        },
        "300": {
          "value": "#FFA692"
        },
        "400": {
          "value": "#FF7353"
        },
        "500": {
          "value": "#FF3B10"
        },
        "600": {
          "value": "#BB2402"
        },
        "700": {
          "value": "#701704"
        },
        "800": {
          "value": "#340A01"
        },
        "900": {
          "value": "#1C0301"
        }
      },
      "pear": {
        "50": {
          "value": "#f7f8dc"
        },
        "100": {
          "value": "#eff0ba"
        },
        "200": {
          "value": "#e8e997"
        },
        "300": {
          "value": "#e0e274"
        },
        "400": {
          "value": "#d8da52"
        },
        "500": {
          "value": "#d0d32f"
        },
        "600": {
          "value": "#a8aa24"
        },
        "700": {
          "value": "#7e801b"
        },
        "800": {
          "value": "#545512"
        },
        "900": {
          "value": "#2a2b09"
        }
      },
      "teal": {
        "50": {
          "value": "#d7faf8"
        },
        "100": {
          "value": "#aff4f0"
        },
        "200": {
          "value": "#87efe9"
        },
        "300": {
          "value": "#5fe9e1"
        },
        "400": {
          "value": "#36e4da"
        },
        "500": {
          "value": "#1cd1c6"
        },
        "600": {
          "value": "#16a79e"
        },
        "700": {
          "value": "#117d77"
        },
        "800": {
          "value": "#0b544f"
        },
        "900": {
          "value": "#062a28"
        }
      },
      "lightblue": {
        "50": {
          "value": "#d9f8ff"
        },
        "100": {
          "value": "#b3f1ff"
        },
        "200": {
          "value": "#8deaff"
        },
        "300": {
          "value": "#66e4ff"
        },
        "400": {
          "value": "#40ddff"
        },
        "500": {
          "value": "#1ad6ff"
        },
        "600": {
          "value": "#00b9e1"
        },
        "700": {
          "value": "#008aa9"
        },
        "800": {
          "value": "#005c70"
        },
        "900": {
          "value": "#002e38"
        }
      },
      "blue": {
        "50": {
          "value": "#F2FAFF"
        },
        "100": {
          "value": "#DFF3FF"
        },
        "200": {
          "value": "#C6EAFF"
        },
        "300": {
          "value": "#A1DDFF"
        },
        "400": {
          "value": "#64C7FF"
        },
        "500": {
          "value": "#1AADFF"
        },
        "600": {
          "value": "#0069A6"
        },
        "700": {
          "value": "#003351"
        },
        "800": {
          "value": "#002235"
        },
        "900": {
          "value": "#00131D"
        }
      },
      "indigoblue": {
        "50": {
          "value": "#d9e5ff"
        },
        "100": {
          "value": "#b3cbff"
        },
        "200": {
          "value": "#8db0ff"
        },
        "300": {
          "value": "#6696ff"
        },
        "400": {
          "value": "#407cff"
        },
        "500": {
          "value": "#1a62ff"
        },
        "600": {
          "value": "#0047e1"
        },
        "700": {
          "value": "#0035a9"
        },
        "800": {
          "value": "#002370"
        },
        "900": {
          "value": "#001238"
        }
      },
      "royalblue": {
        "50": {
          "value": "#dfdbfb"
        },
        "100": {
          "value": "#c0b7f7"
        },
        "200": {
          "value": "#a093f3"
        },
        "300": {
          "value": "#806ff0"
        },
        "400": {
          "value": "#614bec"
        },
        "500": {
          "value": "#4127e8"
        },
        "600": {
          "value": "#2c15c4"
        },
        "700": {
          "value": "#211093"
        },
        "800": {
          "value": "#160a62"
        },
        "900": {
          "value": "#0b0531"
        }
      },
      "purple": {
        "50": {
          "value": "#ead9ff"
        },
        "100": {
          "value": "#d5b3ff"
        },
        "200": {
          "value": "#c08dff"
        },
        "300": {
          "value": "#ab66ff"
        },
        "400": {
          "value": "#9640ff"
        },
        "500": {
          "value": "#811aff"
        },
        "600": {
          "value": "#6500e1"
        },
        "700": {
          "value": "#4c00a9"
        },
        "800": {
          "value": "#330070"
        },
        "900": {
          "value": "#190038"
        }
      },
      "pink": {
        "50": {
          "value": "#ffd9f2"
        },
        "100": {
          "value": "#ffb3e5"
        },
        "200": {
          "value": "#ff8dd8"
        },
        "300": {
          "value": "#ff66cc"
        },
        "400": {
          "value": "#ff40bf"
        },
        "500": {
          "value": "#ff1ab2"
        },
        "600": {
          "value": "#e10095"
        },
        "700": {
          "value": "#a90070"
        },
        "800": {
          "value": "#70004b"
        },
        "900": {
          "value": "#380025"
        }
      },
      "ruby": {
        "50": {
          "value": "#ffd9e4"
        },
        "100": {
          "value": "#ffb3c9"
        },
        "200": {
          "value": "#ff8dae"
        },
        "300": {
          "value": "#ff6694"
        },
        "400": {
          "value": "#ff4079"
        },
        "500": {
          "value": "#ff1a5e"
        },
        "600": {
          "value": "#e10043"
        },
        "700": {
          "value": "#a90032"
        },
        "800": {
          "value": "#700021"
        },
        "900": {
          "value": "#380011"
        }
      },
      "primary": {
        "50": {
          "value": "#F1FCFF"
        },
        "100": {
          "value": "#DCF7FF"
        },
        "200": {
          "value": "#C5F2FF"
        },
        "300": {
          "value": "#82E3FF"
        },
        "400": {
          "value": "#55E1FF"
        },
        "500": {
          "value": "#1AD6FF"
        },
        "600": {
          "value": "#09A0C1"
        },
        "700": {
          "value": "#024757"
        },
        "800": {
          "value": "#00232B"
        },
        "900": {
          "value": "#001A1F"
        }
      },
      "secondary": {
        "50": {
          "value": "{color.gray.50}"
        },
        "100": {
          "value": "{color.gray.100}"
        },
        "200": {
          "value": "{color.gray.200}"
        },
        "300": {
          "value": "{color.gray.300}"
        },
        "400": {
          "value": "{color.gray.400}"
        },
        "500": {
          "value": "{color.gray.500}"
        },
        "600": {
          "value": "{color.gray.600}"
        },
        "700": {
          "value": "{color.gray.700}"
        },
        "800": {
          "value": "{color.gray.800}"
        },
        "900": {
          "value": "{color.gray.900}"
        }
      }
    },
    "width": {
      "screen": {
        "value": "100vw"
      }
    },
    "height": {
      "screen": {
        "value": "100vh"
      }
    },
    "shadow": {
      "xs": {
        "value": "0px 1px 2px 0px #000000"
      },
      "sm": {
        "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
      },
      "md": {
        "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
      },
      "lg": {
        "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
      },
      "xl": {
        "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
      },
      "2xl": {
        "value": "0px 25px 50px -12px {color.gray.900}"
      },
      "none": {
        "value": "0px 0px 0px 0px transparent"
      }
    },
    "radii": {
      "none": {
        "value": "0px"
      },
      "2xs": {
        "value": "0.125rem"
      },
      "xs": {
        "value": "0.25rem"
      },
      "sm": {
        "value": "0.375rem"
      },
      "md": {
        "value": "0.5rem"
      },
      "lg": {
        "value": "0.75rem"
      },
      "xl": {
        "value": "1rem"
      },
      "2xl": {
        "value": "1.5rem"
      },
      "3xl": {
        "value": "1.75rem"
      },
      "full": {
        "value": "9999px"
      }
    },
    "size": {
      "0": {
        "value": "0px"
      },
      "2": {
        "value": "2px"
      },
      "4": {
        "value": "4px"
      },
      "6": {
        "value": "6px"
      },
      "8": {
        "value": "8px"
      },
      "12": {
        "value": "12px"
      },
      "16": {
        "value": "16px"
      },
      "20": {
        "value": "20px"
      },
      "24": {
        "value": "24px"
      },
      "32": {
        "value": "32px"
      },
      "40": {
        "value": "40px"
      },
      "48": {
        "value": "48px"
      },
      "56": {
        "value": "56px"
      },
      "64": {
        "value": "64px"
      },
      "80": {
        "value": "80px"
      },
      "104": {
        "value": "104px"
      },
      "200": {
        "value": "200px"
      },
      "xs": {
        "value": "20rem"
      },
      "sm": {
        "value": "24rem"
      },
      "md": {
        "value": "28rem"
      },
      "lg": {
        "value": "32rem"
      },
      "xl": {
        "value": "36rem"
      },
      "2xl": {
        "value": "42rem"
      },
      "3xl": {
        "value": "48rem"
      },
      "4xl": {
        "value": "56rem"
      },
      "5xl": {
        "value": "64rem"
      },
      "6xl": {
        "value": "72rem"
      },
      "7xl": {
        "value": "80rem"
      },
      "full": {
        "value": "100%"
      }
    },
    "space": {
      "0": {
        "value": "0px"
      },
      "1": {
        "value": "0.25rem"
      },
      "2": {
        "value": "0.5rem"
      },
      "3": {
        "value": "0.75rem"
      },
      "4": {
        "value": "1rem"
      },
      "5": {
        "value": "1.25rem"
      },
      "6": {
        "value": "1.5rem"
      },
      "7": {
        "value": "1.75rem"
      },
      "8": {
        "value": "2rem"
      },
      "9": {
        "value": "2.25rem"
      },
      "10": {
        "value": "2.5rem"
      },
      "11": {
        "value": "2.75rem"
      },
      "12": {
        "value": "3rem"
      },
      "14": {
        "value": "3.5rem"
      },
      "16": {
        "value": "4rem"
      },
      "20": {
        "value": "5rem"
      },
      "24": {
        "value": "6rem"
      },
      "28": {
        "value": "7rem"
      },
      "32": {
        "value": "8rem"
      },
      "36": {
        "value": "9rem"
      },
      "40": {
        "value": "10rem"
      },
      "44": {
        "value": "11rem"
      },
      "48": {
        "value": "12rem"
      },
      "52": {
        "value": "13rem"
      },
      "56": {
        "value": "14rem"
      },
      "60": {
        "value": "15rem"
      },
      "64": {
        "value": "16rem"
      },
      "72": {
        "value": "18rem"
      },
      "80": {
        "value": "20rem"
      },
      "96": {
        "value": "24rem"
      },
      "128": {
        "value": "32rem"
      },
      "px": {
        "value": "1px"
      },
      "rem": {
        "125": {
          "value": "0.125rem"
        },
        "375": {
          "value": "0.375rem"
        },
        "625": {
          "value": "0.625rem"
        },
        "875": {
          "value": "0.875rem"
        }
      }
    },
    "borderWidth": {
      "noBorder": {
        "value": "0"
      },
      "sm": {
        "value": "1px"
      },
      "md": {
        "value": "2px"
      },
      "lg": {
        "value": "3px"
      }
    },
    "opacity": {
      "noOpacity": {
        "value": "0"
      },
      "bright": {
        "value": "0.1"
      },
      "light": {
        "value": "0.15"
      },
      "soft": {
        "value": "0.3"
      },
      "medium": {
        "value": "0.5"
      },
      "high": {
        "value": "0.8"
      },
      "total": {
        "value": "1"
      }
    },
    "font": {
      "sans": {
        "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
      },
      "serif": {
        "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
      },
      "mono": {
        "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
      }
    },
    "fontWeight": {
      "thin": {
        "value": "100"
      },
      "extralight": {
        "value": "200"
      },
      "light": {
        "value": "300"
      },
      "normal": {
        "value": "400"
      },
      "medium": {
        "value": "500"
      },
      "semibold": {
        "value": "600"
      },
      "bold": {
        "value": "700"
      },
      "extrabold": {
        "value": "800"
      },
      "black": {
        "value": "900"
      }
    },
    "fontSize": {
      "xs": {
        "value": "0.75rem"
      },
      "sm": {
        "value": "0.875rem"
      },
      "base": {
        "value": "1rem"
      },
      "lg": {
        "value": "1.125rem"
      },
      "xl": {
        "value": "1.25rem"
      },
      "2xl": {
        "value": "1.5rem"
      },
      "3xl": {
        "value": "1.875rem"
      },
      "4xl": {
        "value": "2.25rem"
      },
      "5xl": {
        "value": "3rem"
      },
      "6xl": {
        "value": "3.75rem"
      },
      "7xl": {
        "value": "4.5rem"
      },
      "8xl": {
        "value": "6rem"
      },
      "9xl": {
        "value": "8rem"
      }
    },
    "letterSpacing": {
      "tighter": {
        "value": "-0.05em"
      },
      "tight": {
        "value": "-0.025em"
      },
      "normal": {
        "value": "0em"
      },
      "wide": {
        "value": "0.025em"
      },
      "wider": {
        "value": "0.05em"
      },
      "widest": {
        "value": "0.1em"
      }
    },
    "lead": {
      "1": {
        "value": ".025rem"
      },
      "2": {
        "value": ".5rem"
      },
      "3": {
        "value": ".75rem"
      },
      "4": {
        "value": "1rem"
      },
      "5": {
        "value": "1.25rem"
      },
      "6": {
        "value": "1.5rem"
      },
      "7": {
        "value": "1.75rem"
      },
      "8": {
        "value": "2rem"
      },
      "9": {
        "value": "2.25rem"
      },
      "10": {
        "value": "2.5rem"
      },
      "none": {
        "value": "1"
      },
      "tight": {
        "value": "1.25"
      },
      "snug": {
        "value": "1.375"
      },
      "normal": {
        "value": "1.5"
      },
      "relaxed": {
        "value": "1.625"
      },
      "loose": {
        "value": "2"
      }
    },
    "text": {
      "xs": {
        "fontSize": {
          "value": "{fontSize.xs}"
        },
        "lineHeight": {
          "value": "{lead.4}"
        }
      },
      "sm": {
        "fontSize": {
          "value": "{fontSize.sm}"
        },
        "lineHeight": {
          "value": "{lead.5}"
        }
      },
      "base": {
        "fontSize": {
          "value": "{fontSize.base}"
        },
        "lineHeight": {
          "value": "{lead.6}"
        }
      },
      "lg": {
        "fontSize": {
          "value": "{fontSize.lg}"
        },
        "lineHeight": {
          "value": "{lead.7}"
        }
      },
      "xl": {
        "fontSize": {
          "value": "{fontSize.xl}"
        },
        "lineHeight": {
          "value": "{lead.7}"
        }
      },
      "2xl": {
        "fontSize": {
          "value": "{fontSize.2xl}"
        },
        "lineHeight": {
          "value": "{lead.8}"
        }
      },
      "3xl": {
        "fontSize": {
          "value": "{fontSize.3xl}"
        },
        "lineHeight": {
          "value": "{lead.9}"
        }
      },
      "4xl": {
        "fontSize": {
          "value": "{fontSize.4xl}"
        },
        "lineHeight": {
          "value": "{lead.10}"
        }
      },
      "5xl": {
        "fontSize": {
          "value": "{fontSize.5xl}"
        },
        "lineHeight": {
          "value": "{lead.none}"
        }
      },
      "6xl": {
        "fontSize": {
          "value": "{fontSize.6xl}"
        },
        "lineHeight": {
          "value": "{lead.none}"
        }
      }
    },
    "elements": {
      "text": {
        "primary": {
          "color": {
            "static": {
              "value": {
                "initial": "{color.gray.900}",
                "dark": "{color.gray.50}"
              }
            },
            "hover": {}
          }
        },
        "secondary": {
          "color": {
            "static": {
              "value": {
                "initial": "{color.gray.500}",
                "dark": "{color.gray.400}"
              }
            },
            "hover": {
              "value": {
                "initial": "{color.gray.700}",
                "dark": "{color.gray.200}"
              }
            }
          }
        }
      },
      "container": {
        "maxWidth": {
          "value": "80rem"
        },
        "padding": {
          "mobile": {
            "value": "{space.4}"
          },
          "xs": {
            "value": "{space.4}"
          },
          "sm": {
            "value": "{space.6}"
          },
          "md": {
            "value": "{space.6}"
          }
        }
      },
      "backdrop": {
        "filter": {
          "value": "saturate(200%) blur(20px)"
        },
        "background": {
          "value": {
            "initial": "#fffc",
            "dark": "#0c0d0ccc"
          }
        }
      },
      "border": {
        "primary": {
          "static": {
            "value": {
              "initial": "{color.gray.100}",
              "dark": "{color.gray.900}"
            }
          },
          "hover": {
            "value": {
              "initial": "{color.gray.200}",
              "dark": "{color.gray.800}"
            }
          }
        },
        "secondary": {
          "static": {
            "value": {
              "initial": "{color.gray.200}",
              "dark": "{color.gray.800}"
            }
          },
          "hover": {
            "value": {
              "initial": "",
              "dark": ""
            }
          }
        }
      },
      "surface": {
        "background": {
          "base": {
            "value": {
              "initial": "{color.gray.100}",
              "dark": "{color.gray.900}"
            }
          }
        },
        "primary": {
          "backgroundColor": {
            "value": {
              "initial": "{color.gray.100}",
              "dark": "{color.gray.900}"
            }
          }
        },
        "secondary": {
          "backgroundColor": {
            "value": {
              "initial": "{color.gray.200}",
              "dark": "{color.gray.800}"
            }
          }
        }
      },
      "state": {
        "primary": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.primary.600}",
                "dark": "{color.primary.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.primary.700}",
                "dark": "{color.primary.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.primary.50}",
                "dark": "{color.primary.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.primary.100}",
                "dark": "{color.primary.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.primary.100}",
                "dark": "{color.primary.800}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.primary.200}",
                "dark": "{color.primary.700}"
              }
            }
          }
        },
        "info": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.blue.500}",
                "dark": "{color.blue.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.blue.600}",
                "dark": "{color.blue.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.blue.50}",
                "dark": "{color.blue.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.blue.100}",
                "dark": "{color.blue.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.blue.100}",
                "dark": "{color.blue.800}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.blue.200}",
                "dark": "{color.blue.700}"
              }
            }
          }
        },
        "success": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.green.500}",
                "dark": "{color.green.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.green.600}",
                "dark": "{color.green.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.green.50}",
                "dark": "{color.green.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.green.100}",
                "dark": "{color.green.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.green.100}",
                "dark": "{color.green.800}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.green.200}",
                "dark": "{color.green.700}"
              }
            }
          }
        },
        "warning": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.yellow.600}",
                "dark": "{color.yellow.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.yellow.700}",
                "dark": "{color.yellow.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.yellow.50}",
                "dark": "{color.yellow.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.yellow.100}",
                "dark": "{color.yellow.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.yellow.100}",
                "dark": "{color.yellow.800}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.yellow.200}",
                "dark": "{color.yellow.700}"
              }
            }
          }
        },
        "danger": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.red.500}",
                "dark": "{color.red.300}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.red.600}",
                "dark": "{color.red.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.red.50}",
                "dark": "{color.red.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.red.100}",
                "dark": "{color.red.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.red.100}",
                "dark": "{color.red.800}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.red.200}",
                "dark": "{color.red.700}"
              }
            }
          }
        }
      }
    },
    "typography": {
      "body": {
        "color": {
          "value": {
            "initial": "{color.black}",
            "dark": "{color.white}"
          }
        },
        "backgroundColor": {
          "value": {
            "initial": "{color.white}",
            "dark": "{color.black}"
          }
        }
      },
      "verticalMargin": {
        "sm": {
          "value": "16px"
        },
        "base": {
          "value": "24px"
        }
      },
      "letterSpacing": {
        "tight": {
          "value": "-0.025em"
        },
        "wide": {
          "value": "0.025em"
        }
      },
      "fontSize": {
        "xs": {
          "value": "12px"
        },
        "sm": {
          "value": "14px"
        },
        "base": {
          "value": "16px"
        },
        "lg": {
          "value": "18px"
        },
        "xl": {
          "value": "20px"
        },
        "2xl": {
          "value": "24px"
        },
        "3xl": {
          "value": "30px"
        },
        "4xl": {
          "value": "36px"
        },
        "5xl": {
          "value": "48px"
        },
        "6xl": {
          "value": "60px"
        },
        "7xl": {
          "value": "72px"
        },
        "8xl": {
          "value": "96px"
        },
        "9xl": {
          "value": "128px"
        }
      },
      "fontWeight": {
        "thin": {
          "value": "100"
        },
        "extralight": {
          "value": "200"
        },
        "light": {
          "value": "300"
        },
        "normal": {
          "value": "400"
        },
        "medium": {
          "value": "500"
        },
        "semibold": {
          "value": "600"
        },
        "bold": {
          "value": "700"
        },
        "extrabold": {
          "value": "800"
        },
        "black": {
          "value": "900"
        }
      },
      "lead": {
        "1": {
          "value": ".025rem"
        },
        "2": {
          "value": ".5rem"
        },
        "3": {
          "value": ".75rem"
        },
        "4": {
          "value": "1rem"
        },
        "5": {
          "value": "1.25rem"
        },
        "6": {
          "value": "1.5rem"
        },
        "7": {
          "value": "1.75rem"
        },
        "8": {
          "value": "2rem"
        },
        "9": {
          "value": "2.25rem"
        },
        "10": {
          "value": "2.5rem"
        },
        "none": {
          "value": "1"
        },
        "tight": {
          "value": "1.25"
        },
        "snug": {
          "value": "1.375"
        },
        "normal": {
          "value": "1.5"
        },
        "relaxed": {
          "value": "1.625"
        },
        "loose": {
          "value": "2"
        }
      },
      "font": {
        "display": {
          "value": "{font.sans}"
        },
        "body": {
          "value": "{font.sans}"
        },
        "code": {
          "value": "{font.mono}"
        }
      },
      "color": {
        "primary": {
          "50": {
            "value": "{color.primary.50}"
          },
          "100": {
            "value": "{color.primary.100}"
          },
          "200": {
            "value": "{color.primary.200}"
          },
          "300": {
            "value": "{color.primary.300}"
          },
          "400": {
            "value": "{color.primary.400}"
          },
          "500": {
            "value": "{color.primary.500}"
          },
          "600": {
            "value": "{color.primary.600}"
          },
          "700": {
            "value": "{color.primary.700}"
          },
          "800": {
            "value": "{color.primary.800}"
          },
          "900": {
            "value": "{color.primary.900}"
          }
        },
        "secondary": {
          "50": {
            "value": "{color.gray.50}"
          },
          "100": {
            "value": "{color.gray.100}"
          },
          "200": {
            "value": "{color.gray.200}"
          },
          "300": {
            "value": "{color.gray.300}"
          },
          "400": {
            "value": "{color.gray.400}"
          },
          "500": {
            "value": "{color.gray.500}"
          },
          "600": {
            "value": "{color.gray.600}"
          },
          "700": {
            "value": "{color.gray.700}"
          },
          "800": {
            "value": "{color.gray.800}"
          },
          "900": {
            "value": "{color.gray.900}"
          }
        }
      }
    },
    "prose": {
      "p": {
        "fontSize": {
          "value": "{typography.fontSize.base}"
        },
        "lineHeight": {
          "value": "{typography.lead.normal}"
        },
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "br": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0 0 0"
          }
        }
      },
      "h1": {
        "margin": {
          "value": "0 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.5xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.tight}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.bold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.3xl}"
        }
      },
      "h2": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.4xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.tight}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.2xl}"
        }
      },
      "h3": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.3xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.snug}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.xl}"
        }
      },
      "h4": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.2xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.snug}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.lg}"
        }
      },
      "h5": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.snug}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "iconSize": {
          "value": "{typography.fontSize.lg}"
        }
      },
      "h6": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.lg}"
        },
        "lineHeight": {
          "value": "{typography.lead.normal}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "iconSize": {
          "value": "{typography.fontSize.base}"
        }
      },
      "strong": {
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        }
      },
      "img": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        }
      },
      "a": {
        "textDecoration": {
          "value": "none"
        },
        "color": {
          "static": {
            "value": {
              "initial": "inherit",
              "dark": "inherit"
            }
          },
          "hover": {
            "value": {
              "initial": "{typography.color.primary.500}",
              "dark": "{typography.color.primary.400}"
            }
          }
        },
        "border": {
          "width": {
            "value": "1px"
          },
          "style": {
            "static": {
              "value": "dashed"
            },
            "hover": {
              "value": "solid"
            }
          },
          "color": {
            "static": {
              "value": {
                "initial": "currentColor",
                "dark": "currentColor"
              }
            },
            "hover": {
              "value": {
                "initial": "currentColor",
                "dark": "currentColor"
              }
            }
          },
          "distance": {
            "value": "2px"
          }
        },
        "fontWeight": {
          "value": "{typography.fontWeight.medium}"
        },
        "hasCode": {
          "borderBottom": {
            "value": "none"
          }
        },
        "code": {
          "border": {
            "width": {
              "value": "{prose.a.border.width}"
            },
            "style": {
              "value": "{prose.a.border.style.static}"
            },
            "color": {
              "static": {
                "value": {
                  "initial": "{typography.color.secondary.400}",
                  "dark": "{typography.color.secondary.600}"
                }
              },
              "hover": {
                "value": {
                  "initial": "{typography.color.primary.500}",
                  "dark": "{typography.color.primary.600}"
                }
              }
            }
          },
          "color": {
            "static": {
              "value": {
                "initial": "currentColor",
                "dark": "currentColor"
              }
            },
            "hover": {
              "value": {
                "initial": "currentColor",
                "dark": "currentColor"
              }
            }
          },
          "background": {
            "static": {},
            "hover": {
              "value": {
                "initial": "{typography.color.primary.50}",
                "dark": "{typography.color.primary.900}"
              }
            }
          }
        }
      },
      "blockquote": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "paddingInlineStart": {
          "value": "24px"
        },
        "quotes": {
          "value": "'201C' '201D' '2018' '2019'"
        },
        "color": {
          "value": {
            "initial": "{typography.color.secondary.500}",
            "dark": "{typography.color.secondary.400}"
          }
        },
        "border": {
          "width": {
            "value": "4px"
          },
          "style": {
            "value": "solid"
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.200}",
              "dark": "{typography.color.secondary.700}"
            }
          }
        }
      },
      "ul": {
        "listStyleType": {
          "value": "disc"
        },
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "paddingInlineStart": {
          "value": "21px"
        },
        "li": {
          "markerColor": {
            "value": {
              "initial": "currentColor",
              "dark": "currentColor"
            }
          }
        }
      },
      "ol": {
        "listStyleType": {
          "value": "decimal"
        },
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "paddingInlineStart": {
          "value": "21px"
        },
        "li": {
          "markerColor": {
            "value": {
              "initial": "currentColor",
              "dark": "currentColor"
            }
          }
        }
      },
      "li": {
        "margin": {
          "value": "{typography.verticalMargin.sm} 0"
        },
        "listStylePosition": {
          "value": "outside"
        }
      },
      "hr": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "style": {
          "value": "solid"
        },
        "width": {
          "value": "1px"
        },
        "color": {
          "value": {
            "initial": "{typography.color.secondary.200}",
            "dark": "{typography.color.secondary.800}"
          }
        }
      },
      "table": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "textAlign": {
          "value": "start"
        },
        "fontSize": {
          "value": "{typography.fontSize.sm}"
        },
        "lineHeight": {
          "value": "{typography.lead.6}"
        }
      },
      "thead": {
        "border": {
          "width": {
            "value": "0px"
          },
          "style": {
            "value": "solid"
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.300}",
              "dark": "{typography.color.secondary.600}"
            }
          }
        },
        "borderBottom": {
          "width": {
            "value": "1px"
          },
          "style": {
            "value": "solid"
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.200}",
              "dark": "{typography.color.secondary.800}"
            }
          }
        }
      },
      "th": {
        "color": {
          "value": {
            "initial": "{typography.color.secondary.600}",
            "dark": "{typography.color.secondary.400}"
          }
        },
        "padding": {
          "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "textAlign": {
          "value": "inherit"
        }
      },
      "tbody": {
        "tr": {
          "borderBottom": {
            "width": {
              "value": "1px"
            },
            "style": {
              "value": "dashed"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.200}",
                "dark": "{typography.color.secondary.800}"
              }
            }
          }
        },
        "td": {
          "padding": {
            "value": "{typography.verticalMargin.sm}"
          }
        },
        "code": {
          "inline": {
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            }
          }
        }
      },
      "code": {
        "block": {
          "fontSize": {
            "value": "{typography.fontSize.sm}"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "border": {
            "width": {
              "value": "1px"
            },
            "style": {
              "value": "solid"
            },
            "color": {
              "value": {
                "initial": "{typography.color.secondary.200}",
                "dark": "{typography.color.secondary.800}"
              }
            }
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.700}",
              "dark": "{typography.color.secondary.200}"
            }
          },
          "backgroundColor": {
            "value": {
              "initial": "{typography.color.secondary.100}",
              "dark": "{typography.color.secondary.900}"
            }
          },
          "backdropFilter": {
            "value": {
              "initial": "contrast(1)",
              "dark": "contrast(1)"
            }
          },
          "pre": {
            "padding": {
              "value": "{typography.verticalMargin.sm}"
            }
          }
        },
        "inline": {
          "borderRadius": {
            "value": "{radii.xs}"
          },
          "padding": {
            "value": "0.2rem 0.375rem 0.2rem 0.375rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.sm}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.normal}"
          },
          "color": {
            "value": {
              "initial": "{typography.color.secondary.700}",
              "dark": "{typography.color.secondary.200}"
            }
          },
          "backgroundColor": {
            "value": {
              "initial": "{typography.color.secondary.100}",
              "dark": "{typography.color.secondary.800}"
            }
          }
        }
      }
    },
    "docus": {
      "header": {
        "height": {
          "value": "64px"
        }
      },
      "footer": {
        "height": {
          "value": {
            "initial": "145px",
            "sm": "100px"
          }
        },
        "padding": {
          "value": "{space.4} 0"
        }
      },
      "readableLine": {
        "value": "78ch"
      },
      "loadingBar": {
        "height": {
          "value": "3px"
        },
        "gradientColorStop1": {
          "value": "#00dc82"
        },
        "gradientColorStop2": {
          "value": "#34cdfe"
        },
        "gradientColorStop3": {
          "value": "#0047e1"
        }
      }
    }
  }
};
const schema_server_zIxGbBm233 = /* @__PURE__ */ defineNuxtPlugin(() => {
  const event = useRequestEvent();
  if (event.path === "/__pinceau_tokens_config.json") {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 200;
    event.node.res.end(JSON.stringify(theme, null, 2));
  }
  if (event.path === "/__pinceau_tokens_schema.json") {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 200;
    event.node.res.end(JSON.stringify(schema, null, 2));
  }
});
const preference = "system";
const componentName = "ColorScheme";
const dataValue = "theme";
const plugin_server_XNCxeHyTuP = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      {
        htmlAttrs[`data-${dataValue}`] = colorMode.value;
      }
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const app_config_server_3EJd2il4WQ = /* @__PURE__ */ defineNuxtPlugin(() => {
  const event = useRequestEvent();
  if (event.path === "/__app_config.json") {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 200;
    event.node.res.end(JSON.stringify(useAppConfig(), null, 2));
  }
});
const preview_detector_wuXocrN5Sn = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const contentStorage = useState("client-db", () => null);
  const runtimeConfig = useRuntimeConfig().public.studio || {};
  const route = useRoute();
  const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
  async function initializePreview() {
    nuxtApp.hook("page:finish", () => {
      refreshNuxtData();
      nuxtApp.hook("content:storage", (storage) => {
        contentStorage.value = storage;
      });
    });
    const useStudio = await import('./_nuxt/useStudio-bb94a758.mjs').then((m) => m.useStudio);
    const { mountPreviewUI } = useStudio();
    mountPreviewUI(contentStorage);
  }
  if (runtimeConfig.apiURL) {
    if (Object.prototype.hasOwnProperty.call(route.query, "preview") && !route.query.preview) {
      return false;
    }
    if (!route.query.preview && !previewToken.value) {
      return false;
    }
    if (route.query.preview && previewToken.value !== route.query.preview) {
      previewToken.value = String(route.query.preview);
    }
    nuxtApp.hook("app:mounted", async () => {
      await initializePreview();
    });
  }
});
const useSupabaseToken = () => {
  const { supabase: { cookies: cookieOptions } } = useRuntimeConfig().public;
  const cookieName = `${cookieOptions.name}-access-token`;
  return useCookie(cookieName);
};
const useSupabaseUser = () => {
  const user = useState("supabase_user");
  const token = useSupabaseToken();
  if (!token.value) {
    user.value = null;
  }
  return user;
};
const useSupabaseAuthClient = () => {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._supabaseAuthClient) {
    const token = useSupabaseToken();
    const authorizationHeader = token.value ? `Bearer ${token.value}` : void 0;
    const { supabase: { url, key, client: clientOptions } } = useRuntimeConfig().public;
    const options = authorizationHeader ? defu(clientOptions, { global: { headers: { Authorization: authorizationHeader } } }) : clientOptions;
    nuxtApp._supabaseAuthClient = createClient(url, key, options);
  }
  return nuxtApp._supabaseAuthClient;
};
const redirectToLogin = (toPath) => {
  const router = useRouter();
  const redirect = useRuntimeConfig().public.supabase.redirect;
  if (redirect && redirect.login) {
    if ([redirect.login, redirect.callback].includes(toPath)) {
      return;
    }
    if (!router.resolve(toPath).name) {
      return;
    }
    router.push(redirect.login);
  }
};
const supabase_server_6VOknHCOlQ = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  const user = useSupabaseUser();
  const authClient = useSupabaseAuthClient();
  const token = useSupabaseToken();
  const route = useRoute();
  if (!token.value) {
    return;
  }
  const { data: { user: supabaseUser }, error } = ([__temp, __restore] = executeAsync(() => authClient.auth.getUser(token.value)), __temp = await __temp, __restore(), __temp);
  if (error) {
    token.value = null;
    user.value = null;
    redirectToLogin(route.path);
  } else {
    user.value = supabaseUser;
  }
}, 1);
const useContentState = () => {
  const pages = useState("dd-pages", () => ({}));
  const surrounds = useState("dd-surrounds", () => ({}));
  const navigation = useState("dd-navigation");
  const globals = useState("dd-globals", () => ({}));
  return {
    pages,
    surrounds,
    navigation,
    globals
  };
};
const useContent = () => {
  const { navigation, pages, surrounds, globals } = useContentState();
  const _path = computed(() => withoutTrailingSlash(useRoute().path));
  const page = computed(() => pages.value[_path.value]);
  const surround = computed(() => surrounds.value[_path.value]);
  const toc = computed(() => {
    var _a, _b;
    return (_b = (_a = page == null ? void 0 : page.value) == null ? void 0 : _a.body) == null ? void 0 : _b.toc;
  });
  const type = computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a.type;
  });
  const excerpt = computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a.excerpt;
  });
  const layout = computed(() => {
    var _a;
    return (_a = page.value) == null ? void 0 : _a.layout;
  });
  const next = computed(() => {
    var _a;
    return (_a = surround.value) == null ? void 0 : _a[1];
  });
  const prev = computed(() => {
    var _a;
    return (_a = surround.value) == null ? void 0 : _a[0];
  });
  return {
    // Refs
    globals,
    navigation,
    surround,
    page,
    // From page
    excerpt,
    toc,
    type,
    layout,
    // From surround
    next,
    prev
  };
};
const navBottomLink = (link) => {
  if (!link.children) {
    return link._path;
  }
  for (const child of (link == null ? void 0 : link.children) || []) {
    const result = navBottomLink(child);
    if (result) {
      return result;
    }
  }
};
const navDirFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path && !file._id) {
      return file.children;
    }
    if (file.children) {
      const result = navDirFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navPageFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path) {
      return file;
    }
    if (file.children) {
      const result = navPageFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navKeyFromPath = (path, key, tree) => {
  let value;
  const goDeep = (path2, tree2) => {
    for (const file of tree2) {
      if (path2 !== "/" && file._path === "/") {
        continue;
      }
      if ((path2 == null ? void 0 : path2.startsWith(file._path)) && file[key]) {
        value = file[key];
      }
      if (file._path === path2) {
        return;
      }
      if (file.children) {
        goDeep(path2, file.children);
      }
    }
  };
  goDeep(path, tree);
  return value;
};
const useContentHelpers = () => {
  return {
    navBottomLink,
    navDirFromPath,
    navPageFromPath,
    navKeyFromPath
  };
};
function jsonStringify(value) {
  return JSON.stringify(value, regExpReplacer);
}
function regExpReplacer(_key, value) {
  if (value instanceof RegExp) {
    return `--REGEX ${value.toString()}`;
  }
  return value;
}
const encodeQueryParams = (params) => {
  let encoded = jsonStringify(params);
  encoded = typeof Buffer !== "undefined" ? Buffer.from(encoded).toString("base64") : btoa(encoded);
  encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const chunks = encoded.match(/.{1,100}/g) || [];
  return chunks.join("/");
};
const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || typeof vnode.children === "string";
}
function nodeChildren(node) {
  var _a;
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof ((_a = node.children) == null ? void 0 : _a.default) === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value;
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).join("");
  }
  return "";
}
function unwrap(vnode, tags = ["p"]) {
  if (Array.isArray(vnode)) {
    return vnode.flatMap((node) => unwrap(node, tags));
  }
  let result = vnode;
  if (tags.some((tag) => tag === "*" || isTag(vnode, tag))) {
    result = nodeChildren(vnode) || vnode;
    if (!Array.isArray(result) && TEXT_TAGS.some((tag) => isTag(vnode, tag))) {
      result = [result];
    }
  }
  return result;
}
function flatUnwrap(vnodes, tags = ["p"]) {
  vnodes = Array.isArray(vnodes) ? vnodes : [vnodes];
  if (!tags.length) {
    return vnodes;
  }
  return vnodes.flatMap((vnode) => flatUnwrap(unwrap(vnode, [tags[0]]), tags.slice(1))).filter((vnode) => !(isText(vnode) && nodeTextContent(vnode).trim() === ""));
}
const withContentBase = (url) => withBase(url, useRuntimeConfig().public.content.api.baseURL);
const useUnwrap = () => ({
  unwrap,
  flatUnwrap
});
const addPrerenderPath = (path) => {
  const event = useRequestEvent();
  event.res.setHeader(
    "x-nitro-prerender",
    [
      event.res.getHeader("x-nitro-prerender"),
      path
    ].filter(Boolean).join(",")
  );
};
const shouldUseClientDB = () => {
  useRuntimeConfig().content;
  {
    return false;
  }
};
const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => Array.isArray(value) ? value : value ? [value] : [];
const arrayParams = ["sort", "where", "only", "without"];
const createQuery = (fetcher, intitialParams) => {
  const queryParams = {
    ...intitialParams
  };
  for (const key of arrayParams) {
    if (queryParams[key]) {
      queryParams[key] = ensureArray(queryParams[key]);
    }
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const query = {
    params: () => queryParams,
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), ...ensureArray(q)]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    // find
    find: () => fetcher(query),
    findOne: () => {
      queryParams.first = true;
      return fetcher(query);
    },
    findSurround: (surroundQuery, options) => {
      queryParams.surround = { query: surroundQuery, ...options };
      return fetcher(query);
    },
    // locale
    locale: (_locale) => query.where({ _locale })
  };
  return query;
};
const createQueryFetch = () => async (query) => {
  const { content } = useRuntimeConfig().public;
  const params = query.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/query/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/query/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const db = await import('./_nuxt/client-db-6ab83f8b.mjs').then((m) => m.useContentDatabase());
    return db.fetch(query);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useCookie("previewToken").value
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
function queryContent(query, ...pathParts) {
  const { content } = useRuntimeConfig().public;
  const queryBuilder = createQuery(createQueryFetch(), typeof query !== "string" ? query : {});
  let path;
  if (typeof query === "string") {
    path = withLeadingSlash(joinURL(query, ...pathParts));
  }
  const originalParamsFn = queryBuilder.params;
  queryBuilder.params = () => {
    var _a, _b, _c;
    const params = originalParamsFn();
    if (path) {
      params.where = params.where || [];
      if (params.first && (params.where || []).length === 0) {
        params.where.push({ _path: withoutTrailingSlash(path) });
      } else {
        params.where.push({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
      }
    }
    if (!((_a = params.sort) == null ? void 0 : _a.length)) {
      params.sort = [{ _file: 1, $numeric: true }];
    }
    if (content.locales.length) {
      const queryLocale = (_c = (_b = params.where) == null ? void 0 : _b.find((w) => w._locale)) == null ? void 0 : _c._locale;
      if (!queryLocale) {
        params.where = params.where || [];
        params.where.push({ _locale: content.defaultLocale });
      }
    }
    return params;
  };
  return queryBuilder;
}
const fetchContentNavigation = async (queryBuilder) => {
  const { content } = useRuntimeConfig().public;
  if (typeof (queryBuilder == null ? void 0 : queryBuilder.params) !== "function") {
    queryBuilder = queryContent(queryBuilder);
  }
  const params = queryBuilder.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/navigation/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/navigation/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const generateNavigation = await import('./_nuxt/client-db-6ab83f8b.mjs').then((m) => m.generateNavigation);
    return generateNavigation(params);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useCookie("previewToken").value
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
const layouts = {
  admin: () => import('./_nuxt/admin-1bc3dc2a.mjs').then((m) => m.default || m),
  landing: () => import('./_nuxt/landing-93cf0ab9.mjs').then((m) => m.default || m),
  login: () => import('./_nuxt/login-5e1cc3b8.mjs').then((m) => m.default || m),
  default: () => import('./_nuxt/default-878eca8a.mjs').then((m) => m.default || m),
  page: () => import('./_nuxt/page-3cb8c6b5.mjs').then((m) => m.default || m)
};
const documentDriven_9cX98v59ZY = /* @__PURE__ */ defineNuxtPlugin((nuxt) => {
  var _a, _b, _c, _d;
  const moduleOptions = (_b = (_a = useRuntimeConfig()) == null ? void 0 : _a.public) == null ? void 0 : _b.content.documentDriven;
  (_d = (_c = useRuntimeConfig()) == null ? void 0 : _c.public) == null ? void 0 : _d.content.experimental.clientDB;
  const findLayout = (to, page, navigation, globals) => {
    var _a2;
    if (page && (page == null ? void 0 : page.layout)) {
      return page.layout;
    }
    if (to.matched.length && ((_a2 = to.matched[0].meta) == null ? void 0 : _a2.layout)) {
      return to.matched[0].meta.layout;
    }
    if (navigation && page) {
      const { navKeyFromPath: navKeyFromPath2 } = useContentHelpers();
      const layoutFromNav = navKeyFromPath2(page._path, "layout", navigation);
      if (layoutFromNav) {
        return layoutFromNav;
      }
    }
    if (moduleOptions.layoutFallbacks && globals) {
      let layoutFallback;
      for (const fallback of moduleOptions.layoutFallbacks) {
        if (globals[fallback] && globals[fallback].layout) {
          layoutFallback = globals[fallback].layout;
          break;
        }
      }
      if (layoutFallback) {
        return layoutFallback;
      }
    }
    return "default";
  };
  const refresh = async (to, dedup = false) => {
    nuxt.callHook("content:document-driven:start", { route: to, dedup });
    const routeConfig = to.meta.documentDriven || {};
    if (to.meta.documentDriven === false) {
      return;
    }
    const { navigation, pages, globals, surrounds } = useContentState();
    const _path = withoutTrailingSlash(to.path);
    const promises = [];
    if (moduleOptions.navigation && routeConfig.navigation !== false) {
      const navigationQuery = () => {
        const { navigation: navigation2 } = useContentState();
        if (navigation2.value && !dedup) {
          return navigation2.value;
        }
        return fetchContentNavigation().then((_navigation) => {
          navigation2.value = _navigation;
          return _navigation;
        }).catch(() => null);
      };
      promises.push(navigationQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.globals) {
      const globalsQuery = () => {
        const { globals: globals2 } = useContentState();
        if (typeof moduleOptions.globals === "object" && Array.isArray(moduleOptions.globals)) {
          console.log("Globals must be a list of keys with QueryBuilderParams as a value.");
          return;
        }
        return Promise.all(
          Object.entries(moduleOptions.globals).map(
            ([key, query]) => {
              if (!dedup && globals2.value[key]) {
                return globals2.value[key];
              }
              let type = "findOne";
              if (query == null ? void 0 : query.type) {
                type = query.type;
              }
              return queryContent(query)[type]().catch(() => null);
            }
          )
        ).then(
          (values) => {
            return values.reduce(
              (acc, value, index) => {
                const key = Object.keys(moduleOptions.globals)[index];
                acc[key] = value;
                return acc;
              },
              {}
            );
          }
        );
      };
      promises.push(globalsQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.page && routeConfig.page !== false) {
      let where = { _path };
      if (typeof routeConfig.page === "string") {
        where = { _path: routeConfig.page };
      }
      if (typeof routeConfig.page === "object") {
        where = routeConfig.page;
      }
      const pageQuery = () => {
        const { pages: pages2 } = useContentState();
        if (!dedup && pages2.value[_path] && pages2.value[_path]._path === _path) {
          return pages2.value[_path];
        }
        return queryContent().where(where).findOne().catch(() => null);
      };
      promises.push(pageQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.surround && routeConfig.surround !== false) {
      let surround = _path;
      if (["string", "object"].includes(typeof routeConfig.page)) {
        surround = routeConfig.page;
      }
      if (["string", "object"].includes(typeof routeConfig.surround)) {
        surround = routeConfig.surround;
      }
      const surroundQuery = () => {
        const { surrounds: surrounds2 } = useContentState();
        if (!dedup && surrounds2.value[_path]) {
          return surrounds2.value[_path];
        }
        return queryContent().where({
          _partial: { $not: true },
          navigation: { $not: false }
        }).without(["body"]).findSurround(surround).catch(() => null);
      };
      promises.push(surroundQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    return await Promise.all(promises.map((promise) => promise())).then(async ([
      _navigation,
      _globals,
      _page,
      _surround
    ]) => {
      var _a2, _b2;
      if (_navigation) {
        navigation.value = _navigation;
      }
      if (_globals) {
        globals.value = _globals;
      }
      if (_surround) {
        surrounds.value[_path] = _surround;
      }
      const redirectTo = (_page == null ? void 0 : _page.redirect) || ((_b2 = (_a2 = _page == null ? void 0 : _page._dir) == null ? void 0 : _a2.navigation) == null ? void 0 : _b2.redirect);
      if (redirectTo) {
        pages.value[_path] = _page;
        return redirectTo;
      }
      if (_page) {
        const layoutName = findLayout(to, _page, _navigation, _globals);
        const layout = layouts[layoutName];
        if (layout && typeof layout === "function") {
          await layout();
        }
        to.meta.layout = layoutName;
        _page.layout = layoutName;
      }
      pages.value[_path] = _page;
      await nuxt.callHook("content:document-driven:finish", { route: to, dedup, page: _page, navigation: _navigation, globals: _globals, surround: _surround });
    });
  };
  addRouteMiddleware(async (to, from) => {
    if (to.path.includes("favicon.ico")) {
      return;
    }
    const redirect = await refresh(to, false);
    if (redirect) {
      if (hasProtocol(redirect)) {
        return callWithNuxt(nuxt, navigateTo, [redirect, { external: true }]);
      } else {
        return redirect;
      }
    }
  });
  {
    delete nuxt.payload.prerenderedAt;
  }
  nuxt.hook("app:data:refresh", async () => false);
});
const dayjs_FoMn5Zigri = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime);
  dayjs.extend(localeData);
  dayjs.extend(updateLocale);
  dayjs.extend(utc);
  nuxtApp.provide("dayjs", dayjs);
});
const emitter = mitt();
const emitter_eH7MaP8C1y = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("bus", {
    $on: emitter.on,
    $emit: emitter.emit
  });
});
const hello$1 = "Hello, {name}!";
const language$1 = "Language";
const en = {
  hello: hello$1,
  language: language$1
};
const hello = "こんにちは、{name}！";
const language = "言語";
const ja = {
  hello,
  language
};
const i18n_sVHQBgnb3t = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: {
      en,
      ja
    }
  });
  vueApp.use(i18n);
});
const underscore_string_gOUiMW6PKS = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("s", underscorestring);
});
const menu_13PGuw7IWk = /* @__PURE__ */ defineNuxtPlugin((ctx) => {
  const visible = ref(false);
  const open = () => visible.value = true;
  const close = () => visible.value = false;
  const toggle = () => visible.value = !visible.value;
  ctx.$router.afterEach(() => setTimeout(close, 50));
  return {
    provide: {
      menu: {
        visible,
        close,
        open,
        toggle
      }
    }
  };
});
const _plugins = [
  plugin_vue3_A0OWXRrUgq,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  router_jmwsqit4Rs,
  pinceau_nuxt_plugin_server_KEuz79zT4K,
  schema_server_zIxGbBm233,
  plugin_server_XNCxeHyTuP,
  app_config_server_3EJd2il4WQ,
  preview_detector_wuXocrN5Sn,
  supabase_server_6VOknHCOlQ,
  documentDriven_9cX98v59ZY,
  dayjs_FoMn5Zigri,
  emitter_eH7MaP8C1y,
  i18n_sVHQBgnb3t,
  underscore_string_gOUiMW6PKS,
  menu_13PGuw7IWk
];
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = /* @__PURE__ */ defineComponent({
  name: "FragmentWrapper",
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const useProperties = async () => {
  let query = "";
  query = `${process.env.TEMPLRJS_BASE_URL}/properties.json`;
  if (process.env.TEMPLRJS_DB == "supabase") {
    query = "/api/properties?select=code,name,parent_code,is_active";
  }
  console.log("query=", query);
  const parent = await useFetch(query, {
    method: "get"
  }, "$4tumyHh5BT");
  return parent;
};
const useCountry = async () => {
  let query = "";
  query = `${process.env.TEMPLRJS_BASE_URL}/countries.json`;
  if (process.env.TEMPLRJS_DB == "supabase") {
    query = "/api/country?select=id,code,name";
  }
  console.log("query=", query);
  const country = await useFetch(query, {
    method: "get"
  }, "$FjcNXbived");
  return country;
};
const useCompany = async () => {
  let query = "";
  query = `${process.env.TEMPLRJS_BASE_URL}/company.json`;
  if (process.env.TEMPLRJS_DB == "supabase") {
    query = "/api/company?select=*";
  }
  console.log("query=", query);
  const company = await useFetch(query, {
    method: "get"
  }, "$03Z4pEWBYm");
  return company;
};
const useParentNav = async () => {
  let query = "";
  query = `${process.env.TEMPLRJS_BASE_URL}/parent_nav.json`;
  if (process.env.TEMPLRJS_DB == "supabase") {
    query = "/api/postgres/navigation_parent";
  }
  console.log("query=", query);
  const parent = await useFetch(query, {
    method: "get"
  }, "$noPX0aly5P");
  return parent;
};
const useChildNav = async () => {
  let query = "";
  query = `${process.env.TEMPLRJS_BASE_URL}/child_nav.json`;
  if (process.env.TEMPLRJS_DB == "supabase") {
    query = "/api/postgres/navigation_child";
  }
  console.log("query=", query);
  const child = await useFetch(query, {
    method: "get"
  }, "$3QgMZrSKJB");
  return child;
};
const usePropertiesStore = defineStore("properties", {
  state: () => ({
    properties: []
  }),
  getters: {
    parent_properties: (state) => {
      return state.properties.filter((object) => {
        return object.parent_code == void 0;
      });
    },
    child_properties: (state) => {
      return state.properties.filter((object) => {
        return object.parent_code != void 0;
      });
    },
    logo_url: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == "logo-url";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    logo_url_dark: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == "logo-url-dark";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    logo_css: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == "logo-css";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    app_page_head_title: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == "app-page-head-title";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    //
    app_copyright: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == "copy-right";
      });
      return result.length > 0 ? result[0].name : "© 2022 company_name. All rights reserved.";
    },
    layout_width: (state) => {
      let result = state.properties.filter((object) => {
        return object.code == "layout-width";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    megamenu_bg_color: (state) => {
      let result = state.properties.filter((object) => {
        return object.parent_code == "mega-menu" && object.code == "bg-color";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    megamenu_text_style: (state) => {
      let result = state.properties.filter((object) => {
        return object.parent_code == "mega-menu" && object.code == "text-style";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    megamenu_popover_style: (state) => {
      let result = state.properties.filter((object) => {
        return object.parent_code == "mega-menu" && object.code == "popover-style";
      });
      return result.length > 0 ? result[0].name : void 0;
    },
    //
    properties_by_code: (state) => (code) => {
      let result = state.properties.filter((object) => {
        return object.code == code;
      });
      return result.length > 0 ? result[0] : void 0;
    },
    properties_by_parent_code: (state) => (code) => {
      return state.properties.filter((object) => {
        return object.parent_code == code;
      });
    }
  },
  actions: {
    updateProperties(item) {
      this.properties.push({ item });
    },
    reloadProperties(items) {
      this.properties = items;
    }
  }
});
const useNavigationsStore = defineStore("navigations", {
  state: () => ({
    navigations: []
  }),
  getters: {
    navigatioins_by_module: (state) => (code) => {
      return state.navigations.filter((object) => {
        return object.nav_module_code == code;
      });
    }
  },
  actions: {
    updateNavigations(item) {
      this.navigations.push({ item });
    },
    reloadNavigations(items) {
      this.navigations = items;
    }
  }
});
const useCountryStore = defineStore("country", {
  state: () => ({
    country: []
  }),
  getters: {
    list_all: (state) => () => {
      let result = state.country.filter((object) => {
        return object;
      });
      return result;
    },
    country_by_code: (state) => (code) => {
      let result = state.country.filter((object) => {
        return object.code == code;
      });
      return result.length > 0 ? result[0].name : "";
    },
    country_by_name: (state) => (name) => {
      let result = state.country.filter((object) => {
        return object.name == name;
      });
      return result.length > 0 ? result[0] : void 0;
    }
  },
  actions: {
    updateCountry(item) {
      this.country.push({ item });
    },
    reloadCountry(items) {
      this.country = items;
    }
  }
});
const useCompanyStore = defineStore("company", {
  state: () => ({
    company: {}
  }),
  getters: {
    organization: (state) => {
      if (state.company.id) {
        return {
          id: state.company.id,
          code: state.company.code,
          company_name: state.company.company_name,
          company_website: state.company.company_website,
          company_email: state.company.company_email,
          phone_number: state.company.phone_number,
          tin_ein_number: state.company.tin_ein_number,
          date_of_incorporation: state.company.date_of_incorporation,
          country_of_incorporation: useCountryStore().country_by_code(state.company.country_of_incorporation),
          address: state.company.address
        };
      } else {
        return void 0;
      }
    },
    basic_details: (state) => {
      if (state.company.id) {
        return {
          company_name: state.company.company_name,
          tin_ein_number: state.company.tin_ein_number,
          date_of_incorporation: useNuxtApp().$dayjs(state.company.date_of_incorporation).format("DD-MMM-YYYY"),
          country_of_incorporation: useCountryStore().country_by_code(state.company.country_of_incorporation)
        };
      } else {
        return void 0;
      }
    },
    primary_address: (state) => {
      if (state.company.id) {
        return state.company.address;
      } else {
        return void 0;
      }
    },
    primary_address_formatted: (state) => {
      if (state.company.id) {
        var address = state.company.address.appartment != void 0 ? state.company.address.appartment + " " + state.company.address.street : state.company.address.street + ", ";
        address += state.company.address.city + "-" + state.company.address.postal_code + ", ";
        address += state.company.address.state + ", " + state.company.address.country_name;
        return {
          address,
          company_email: state.company.company_email,
          phone_number: state.company.phone_number,
          company_website: state.company.company_website
        };
      } else {
        return void 0;
      }
    },
    corporate_headquarters: (state) => {
      if (state.company.id) {
        return state.company.address;
      } else {
        return void 0;
      }
    },
    incorporation: (state) => {
      if (state.company.id) {
        return {
          tin_ein_number: state.company.tin_ein_number,
          date_of_incorporation: useNuxtApp().$dayjs(state.company.date_of_incorporation).format("DD-MMM-YYYY"),
          year_of_incorporation: useNuxtApp().$dayjs(state.company.date_of_incorporation).format("DD-MMM-YYYY"),
          country_of_incorporation: state.company.country_of_incorporation
        };
      } else {
        return void 0;
      }
    },
    logo_url: (state) => {
      return state.company.logo_url;
    },
    company_by_code: (state) => (code) => {
      let result = state.company.filter((object) => {
        return object.code == code;
      });
      return result.length > 0 ? result[0] : void 0;
    },
    company_by_name: (state) => (name) => {
      let result = state.company.filter((object) => {
        return object.name == name;
      });
      return result.length > 0 ? result[0] : void 0;
    }
  },
  actions: {
    updateCompany(item) {
      this.company = item;
    },
    reloadCompany(item) {
      this.company = item;
    },
    updateLogoUrl(url) {
      this.company.logo_url = url;
    }
  }
});
const _sfc_main$1 = {
  __name: "app",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const propertiesStore = usePropertiesStore();
    const navigationsStore = useNavigationsStore();
    const countryStore = useCountryStore();
    const properties = ([__temp, __restore] = withAsyncContext(() => useProperties()), __temp = await __temp, __restore(), __temp);
    propertiesStore.reloadProperties(properties.data._rawValue);
    const countries = ([__temp, __restore] = withAsyncContext(() => useCountry()), __temp = await __temp, __restore(), __temp);
    countryStore.reloadCountry(countries.data._rawValue);
    const company = ([__temp, __restore] = withAsyncContext(() => useCompany()), __temp = await __temp, __restore(), __temp);
    if (company.data._rawValue.length > 0)
      useCompanyStore().updateCompany(company.data._rawValue[0]);
    const parent_nav = ([__temp, __restore] = withAsyncContext(() => useParentNav()), __temp = await __temp, __restore(), __temp);
    const child_nav = ([__temp, __restore] = withAsyncContext(() => useChildNav()), __temp = await __temp, __restore(), __temp);
    navigationsStore.reloadNavigations(union(child_nav.data._rawValue, parent_nav.data._rawValue));
    const page_meta = [];
    propertiesStore.properties_by_parent_code("social-media-head-metadata").forEach((metadata) => {
      page_meta.push({ hid: metadata.code, property: metadata.code, content: metadata.name });
    });
    useHead({
      title: propertiesStore.app_page_head_title,
      description: propertiesStore.app_page_head_title,
      meta: page_meta,
      /*meta: [
      	{
      		name: "description",
      		content: "Corporate intranet application",
      	},
      	{
      		property: "og:title",
      		content: "Corporate intranet application",
      	},
      	{
      		property: "og:description",
      		content: "Corporate intranet application",
      	},
      	{
      		property: "og:image",
      		content: "/logo.png",
      	},
      	{
      		property: "og:type",
      		content: "website",
      	},
      	{
      		property: "og:site_name",
      		content: "templrjs",
      	},
      ],*/
      script: [
        {
          hid: "underscore",
          src: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.4/underscore-min.js",
          defer: true
        },
        {
          hid: "chartjs",
          src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js",
          defer: true
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto" }, _attrs))}><div class="min-h-screen relative"><div class="h-full relative">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-cc8d816c.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-474309c6.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { appLayoutTransition as A, useSupabaseToken as B, useSupabaseUser as C, useNavigationsStore as D, usePropertiesStore as E, useFetch as F, useCompany as G, useCompanyStore as H, nodeTextContent as I, useSupabaseAuthClient as J, useCountryStore as K, defineNuxtRouteMiddleware as L, get as M, assertArray as N, ensureArray as O, sortList as P, apply as Q, withoutKeys as R, withKeys as S, createQuery as T, _wrapIf as _, usePinceauRuntime as a, useRouter as b, createError as c, useNuxtApp as d, entry$1 as default, useAppConfig as e, useState as f, useContent as g, useRoute as h, useContentHelpers as i, componentName as j, useHead as k, useRuntimeConfig as l, useUnwrap as m, navigateTo as n, computedStyle as o, useAsyncData as p, usePinceauTheme as q, queryContent as r, fetchContentNavigation as s, useRequestEvent as t, useError as u, useCookie as v, callWithNuxt as w, updateAppConfig as x, refreshNuxtData as y, layouts as z };
