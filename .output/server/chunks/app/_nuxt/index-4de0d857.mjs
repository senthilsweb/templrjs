import { _ as __nuxt_component_0 } from './layout-87b4d106.mjs';
import { mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, ref, withAsyncContext, createTextVNode, toDisplayString } from 'vue';
import { filter } from 'lodash-es';
import { E as usePropertiesStore, D as useNavigationsStore, f as useState, F as useFetch, p as useAsyncData, r as queryContent, d as useNuxtApp } from '../server.mjs';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { N as NuxtLink } from './nuxt-link-fccebd7d.mjs';
import __nuxt_component_2$1 from './Icon-7255ab8c.mjs';
import 'vue-router';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$4 = {
  __name: "Carousel",
  __ssrInlineRender: true,
  setup(__props) {
    ref(0);
    const c_total = ref(0);
    ref(0);
    const carousel_assets = useNavigationsStore().navigatioins_by_module("carousel-component");
    const active_carousel = filter(carousel_assets, { is_active: true });
    c_total.value = active_carousel.length;
    useState("carousel", () => ref({}));
    active_carousel.forEach((item, idx) => {
      useState("carousel").value[item.href] = idx == 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="relative"><ul id="slider" class="bg-gray-400"><!--[-->`);
      ssrRenderList(unref(active_carousel), (item, idx) => {
        _push(`<div>`);
        if (("useState" in _ctx ? _ctx.useState : unref(useState))("carousel").value[item.href]) {
          _push(`<li class="h-[100%] w-[100%] relative transition duration-700 ease-in-out"><img class="h-full w-full object-cover animate-blob transition ease-in-out delay-150 animation-delay-4000"${ssrRenderAttr("src", item.href)}><div class="absolute top-0 left-0 h-full w-full flex"><h2 class="text-4xl font-bold my-auto w-full text-white text-center p-20">${ssrInterpolate(item.name)}</h2></div></li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></ul><div class="absolute px-5 flex w-full h-full top-0 left-0"><div class="my-auto w-full flex justify-between"><button class="bg-white p-2 rounded-full bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path></svg></button><button class="bg-white p-2 rounded-full bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg></button></div></div><div class="absolute flex justify-center items-center space-x-5 w-full bottom-0 left-0 py-10"><div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(1)"></div><div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(2)"></div><div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(3)"></div><div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(4)"></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Carousel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "InstagramPosts",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/postgres/instagram", {
      initialCache: false,
      headers: {
        range: "0-7"
      }
    }, "$NkIKZPCn3H")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><h2 class="text-2xl font-bold tracking-tight text-gray-900">Recent Instagram Posts</h2><a href="#" class="hidden text-sm font-medium text-primary-600 hover:text-primary-500 md:block"> Go to the Instagram page <span aria-hidden="true"> \u2192</span></a></div><div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"><img${ssrRenderAttr("src", `data:image/gif;base64,${post.base64}`)} alt="" class="absolute inset-0 -z-10 h-full w-full object-cover"><div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div><div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div><div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"><time${ssrRenderAttr("datetime", post.created_at)} class="mr-8">${ssrInterpolate(post.created_at)}</time></div><h3 class="mt-3 text-lg font-semibold leading-6 text-white"><a${ssrRenderAttr("href", `https://www.instagram.com/p/${post.shortcode}`)} target="_blank"><span class="absolute inset-0"></span> ${ssrInterpolate(_ctx.$s(post.text).prune(50)._wrapped)}</a></h3></article>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InstagramPosts.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$3;
const _sfc_main$2 = {
  __name: "Marquee",
  __ssrInlineRender: true,
  props: {
    api_end_point: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    let path = props.api_end_point != void 0 ? props.api_end_point : "/_navigation/notification-channels";
    const { data: links } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(path, () => {
      return queryContent().where({ _path: path }).findOne();
    }, "$PbJoMZBx10")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "py-12 sm:py-24 px-6 sm:px-20 rounded-3xl rounded-t-none -mt-4 relative text-gable-green bg-white",
        style: { "z-index": "6" }
      }, _attrs))}><div class="m-auto max-w-screen-xl"><div class="flex flex-col lg:flex-row justify-between items-baseline"><h2 class="text-3xl w-full mb-4 md:mb-0 lg:w-6/12">Integration Channels</h2><a class="inline-flex text-lg font-normal text-gable-green gap-2 whitespace-nowrap items-center hover:text-blurple" href="#">See full list of integrations</a></div><div class="w-full overflow-hidden index mt-6 md:mt-12" style="${ssrRenderStyle({ "mask-image": "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)", "-webkit-mask-image": "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)" })}"><div class="flex whitespace-nowrap relative"><div class="gap-2 flex-shrink-0 grid relative grid-rows-1 grid-flow-col items-center justify-items-center min-w-full" style="${ssrRenderStyle({ "animation": "carouselspin 40s linear infinite" })}"><!--[-->`);
      ssrRenderList(unref(links).menu, (item) => {
        _push(`<span class="text-xl font-bold text-gray-100 mx-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: item.icon,
          class: "h-10 w-10"
        }, null, _parent));
        _push(` ${ssrInterpolate(item.name)}</span>`);
      });
      _push(`<!--]--></div><div class="gap-2 flex-shrink-0 grid relative grid-rows-1 grid-flow-col items-center justify-items-center min-w-full" style="${ssrRenderStyle({ "animation": "carouselspin 40s linear infinite" })}"><!--[-->`);
      ssrRenderList(unref(links).menu, (item) => {
        _push(`<span class="text-xl font-bold text-gray-100 mx-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: item.icon,
          class: "h-10 w-10"
        }, null, _parent));
        _push(` ${ssrInterpolate(item.name)}</span>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Marquee.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "ZynomiHero",
  __ssrInlineRender: true,
  setup(__props) {
    const data = usePropertiesStore().properties_by_parent_code("component-app-hero");
    const primary_title = filter(data, { code: "primary-title" })[0].name;
    const secondary_title = filter(data, { code: "secondary-title" })[0].name;
    const app_hero_description = filter(data, { code: "app-hero-description" })[0].name;
    const navs = useNavigationsStore().navigatioins_by_module("application-hero");
    const primary_button = filter(navs, { code: "primary-button" })[0];
    const secondary_button = filter(navs, { code: "secondary-button" })[0];
    const cover_image_video = filter(navs, { code: "cover-image-video" })[0];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = NuxtLink;
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: ["mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6", [unref(usePropertiesStore)().layout_width ? unref(usePropertiesStore)().layout_width : "lg:max-w-7xl mx-auto"]]
      }, _attrs))}><div class="lg:grid lg:grid-cols-12 lg:gap-8"><div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left"><h1><span class="mt-1 p-1 block text-4xl space-y-6 font-bold tracking-tight sm:text-2xl xl:text-5xl"><span class="block text-gray-900">${ssrInterpolate(unref(primary_title))}</span><span class="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">${ssrInterpolate(unref(secondary_title))}</span></span></h1><p class="mt-3 text-base text-gray-700 sm:mt-5 sm:text-sm lg:text-lg xl:text-lg">${ssrInterpolate(unref(app_hero_description))}</p><div class="mt-10 sm:flex sm:justify-center lg:justify-start"><div class="hidden md:flex md:items-center md:space-x-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#",
        onClick: ($event) => ("useNuxtApp" in _ctx ? _ctx.useNuxtApp : unref(useNuxtApp))().$bus.$emit(`${unref(primary_button).click_event}`),
        class: "px-5 py-2 text-md bg-primary-500 ring-2 hover:bg-primary-700 hover:ring-2 ring-primary-500 text-white rounded-full transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(primary_button).name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(primary_button).name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#",
        onClick: ($event) => ("useNuxtApp" in _ctx ? _ctx.useNuxtApp : unref(useNuxtApp))().$bus.$emit(`${unref(secondary_button).click_event}`),
        class: "px-5 py-2 text-md border border-transparent bg-white ring-2 ring-primary-500 text-primary-600 hover:text-white hover:bg-primary-700 rounded-full transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(secondary_button).name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(secondary_button).name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center"><svg class="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden" width="640" height="784" fill="none" viewBox="0 0 640 784" aria-hidden="true"><defs><pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor"></rect></pattern></defs><rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor"></rect><rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"></rect></svg><div class="relative mx-auto w-full rounded-lg lg:max-w-md"><button type="button" class="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"><span class="sr-only">${ssrInterpolate(unref(cover_image_video).href.name)}</span><img class="w-full aspect-[4/3]"${ssrRenderAttr("src", unref(cover_image_video).href)}${ssrRenderAttr("alt", unref(cover_image_video).href.name)}></button></div></div></div></main>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ZynomiHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Carousel = __nuxt_component_1;
      const _component_ZynomiHero = __nuxt_component_2;
      const _component_InstagramPosts = __nuxt_component_3;
      const _component_Marquee = __nuxt_component_4;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "landing" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="" class="${ssrRenderClass([[unref(usePropertiesStore)().layout_width ? unref(usePropertiesStore)().layout_width : "lg:max-w-7xl mx-auto"], ""])}"${_scopeId}>`);
            if (unref(usePropertiesStore)().properties_by_code("component-carousel").is_active) {
              _push2(ssrRenderComponent(_component_Carousel, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(usePropertiesStore)().properties_by_code("component-app-hero").is_active) {
              _push2(ssrRenderComponent(_component_ZynomiHero, { class: "pb-10" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(usePropertiesStore)().properties_by_code("component-instagram-post").is_active) {
              _push2(ssrRenderComponent(_component_InstagramPosts, { class: "pb-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Marquee, { api_end_point: "/_navigation/notification-channels" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: ["", [unref(usePropertiesStore)().layout_width ? unref(usePropertiesStore)().layout_width : "lg:max-w-7xl mx-auto"]]
              }, [
                unref(usePropertiesStore)().properties_by_code("component-carousel").is_active ? (openBlock(), createBlock(_component_Carousel, { key: 0 })) : createCommentVNode("", true),
                unref(usePropertiesStore)().properties_by_code("component-app-hero").is_active ? (openBlock(), createBlock(_component_ZynomiHero, {
                  key: 1,
                  class: "pb-10"
                })) : createCommentVNode("", true),
                unref(usePropertiesStore)().properties_by_code("component-instagram-post").is_active ? (openBlock(), createBlock(_component_InstagramPosts, {
                  key: 2,
                  class: "pb-4"
                })) : createCommentVNode("", true),
                createVNode(_component_Marquee, { api_end_point: "/_navigation/notification-channels" })
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
