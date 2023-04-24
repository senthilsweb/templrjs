import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './SoftwareVersion-70a084df.mjs';
import { _ as __nuxt_component_2 } from './SecondaryNav-60cd97a1.mjs';
import { _ as __nuxt_component_3, a as __nuxt_component_4 } from './zynomi-stats-simple-8645f8de.mjs';
import { D as Dropdownlist } from './Dropdownlist-5dbe543b.mjs';
import { G as useCompany, H as useCompanyStore, d as useNuxtApp, K as useCountryStore, F as useFetch } from '../server.mjs';
import { withAsyncContext, ref, unref, useSSRContext, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, withDirectives, vModelText } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue';
import { r as render } from './XMarkIcon-293bebc4.mjs';
import OrganizationPageHeader from './OrganizationPageHeader-6409e8db.mjs';
import crypto from 'crypto';
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

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

const native = {
  randomUUID: crypto.randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

const _sfc_main$1 = {
  __name: "CompanyForm",
  __ssrInlineRender: true,
  props: {
    form_title: {
      type: String,
      required: true
    },
    form_description: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const isCompanyFormOpen = ref(false);
    const progress = ref(false);
    const data = ref({});
    data.value.address = {};
    if (useCompanyStore().organization)
      data.value = useCompanyStore().organization;
    useNuxtApp().$bus.$on("evtCompanyForm", (data2) => {
      isCompanyFormOpen.value = !isCompanyFormOpen.value;
      progress.value = false;
    });
    function handleSelectedInCompanyForm_country(e) {
      data.value.address.country = e.target.value;
      data.value.address.country_name = e.target.options[e.target.selectedIndex].text;
    }
    function handleSelectedInCompanyForm_country_of_incorporation(e) {
      alert(e.target.value);
      data.value.country_of_incorporation = e.target.value;
    }
    async function saveCompanyForm(args) {
      try {
        progress.value = true;
        data.value.tenant = "www.xycc-company.com";
        data.value.updated_at = useNuxtApp().$dayjs().utc();
        if (useCompanyStore().organization == void 0) {
          data.value.created_at = useNuxtApp().$dayjs().utc();
          data.value.code = v4();
          await useFetch("/api/company/create", {
            method: "post",
            body: data.value,
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data) {
                if (response._data[0].code) {
                  useCompanyStore().updateCompany(response._data[0]);
                  useNuxtApp().$toast.show({ type: "success", message: `Record added successfully`, timeout: 6 });
                } else {
                  useNuxtApp().$toast.show({ type: "danger", message: `Failure during insert`, timeout: 6 });
                }
              }
              progress.value = false;
            }
          }, "$AElUn1qAlO");
        } else {
          await useFetch("/api/company/" + useCompanyStore().organization.id, {
            method: "put",
            body: data.value,
            //omit the mongo object id before the upsert
            onResponse({ request, response, options }) {
              if (response._data) {
                console.log("response._data=" + JSON.stringify(response._data));
                if (response._data[0].code) {
                  useCompanyStore().updateCompany(response._data);
                  useNuxtApp().$toast.show({ type: "success", message: `Record updated successfully`, timeout: 6 });
                } else {
                  useNuxtApp().$toast.show({ type: "danger", message: `Failure during update`, timeout: 6 });
                }
              }
              if (module == "upload") {
                store.updateLogoUrl(args.logo_url);
              }
              progress.value = false;
            }
          }, "$7pxUtvDbz8");
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
      const _component_Dropdownlist = Dropdownlist;
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        as: "template",
        show: isCompanyFormOpen.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="fixed inset-0"${_scopeId2}></div><div class="fixed inset-0 overflow-hidden"${_scopeId2}><div class="absolute inset-0 overflow-hidden"${_scopeId2}><div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transform transition ease-in-out duration-500 sm:duration-700",
                    "enter-from": "translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transform transition ease-in-out duration-500 sm:duration-700",
                    "leave-from": "translate-x-0",
                    "leave-to": "translate-x-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<form name="frmCompany" id="frmCompany" class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"${_scopeId4}><div class="h-0 flex-1 overflow-y-auto"${_scopeId4}><div class="bg-primary-700 py-6 px-4 sm:px-6"${_scopeId4}><div class="flex items-center justify-between"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(__props.form_title ? __props.form_title : "Company")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Company"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="ml-3 flex h-7 items-center"${_scopeId4}><button type="button" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"${_scopeId4}><span class="sr-only"${_scopeId4}>Close panel</span>`);
                              _push5(ssrRenderComponent(unref(render), {
                                class: "h-6 w-6",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(`</button></div></div><div class="mt-1"${_scopeId4}><p class="text-sm text-primary-300"${_scopeId4}>${ssrInterpolate(__props.form_description ? __props.form_description : "Find out how we can help you?")}</p></div></div>`);
                              if (progress.value) {
                                _push5(`<div class="z-50 h-full overflow-hidden flex flex-col items-center justify-center"${_scopeId4}><div class="loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4"${_scopeId4}></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              if (!progress.value) {
                                _push5(`<div class="flex-1 flex-col justify-between"${_scopeId4}><div class="divide-y divide-gray-200 px-4 sm:px-6"${_scopeId4}><div class="space-y-6 pt-6 pb-5"${_scopeId4}><div class="sm:col-span-6"${_scopeId4}><label for="company_name" class="block text-sm font-medium text-gray-700"${_scopeId4}> Company name </label><div class="mt-1 rounded-md shadow-sm"${_scopeId4}><input${ssrRenderAttr("value", data.value.company_name)} type="text" id="company_name" name="company_name" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="company_website" class="block text-sm font-medium text-gray-700"${_scopeId4}> Website name </label><div class="mt-1 rounded-md shadow-sm"${_scopeId4}><input${ssrRenderAttr("value", data.value.company_website)} type="text" id="company_website" name="company_website" autocomplete="company_website" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="company_email" class="block text-sm font-medium text-gray-700"${_scopeId4}> Email </label><div class="mt-1 rounded-md shadow-sm"${_scopeId4}><input${ssrRenderAttr("value", data.value.company_email)} type="text" id="company_email" name="company_email" autocomplete="company_email" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="company_phone_number" class="block text-sm font-medium text-gray-700"${_scopeId4}>Phone Number</label><div class="mt-1 relative"${_scopeId4}><input${ssrRenderAttr("value", data.value.phone_number)} type="text" name="company_phone_number" id="company_phone_number" autocomplete="company_phone_number" class="py-3 px-4 block w-full pl-5 focus:ring-green-500 focus:border-green-500 border-gray-300" placeholder="(+1) 123-123-1234"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><h2 class="font-medium text-primary-700"${_scopeId4}>Incorporation Information</h2></div><div class="sm:col-span-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_Dropdownlist, {
                                  data: { data: unref(useCountryStore)().list_all("") },
                                  onChange: handleSelectedInCompanyForm_country_of_incorporation,
                                  show_label: "true",
                                  modelValue: data.value.country_of_incorporation,
                                  "onUpdate:modelValue": ($event) => data.value.country_of_incorporation = $event,
                                  name: "country_of_incorporation",
                                  label: "Country Of Incorporation",
                                  selected_value: data.value.country_of_incorporation
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="sm:col-span-6"${_scopeId4}><label for="date_of_incorporation" class="block text-sm font-medium text-gray-700"${_scopeId4}> Date Of Incorporation </label><div class="mt-1 rounded-md shadow-sm"${_scopeId4}><input${ssrRenderAttr("value", data.value.date_of_incorporation)} type="text" id="date_of_incorporation" name="date_of_incorporation" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="tin_ein_number" class="block text-sm font-medium text-gray-700"${_scopeId4}> TIN/EIN #. </label><div class="mt-1 rounded-md shadow-sm"${_scopeId4}><input${ssrRenderAttr("value", data.value.tin_ein_number)} type="text" id="tin_ein_number" name="tin_ein_number" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><h2 class="font-medium text-primary-700"${_scopeId4}>Primary Address/Corporate Headquarters</h2></div><div class="sm:col-span-6"${_scopeId4}><label for="address" class="block text-sm font-medium text-gray-700"${_scopeId4}>Street</label><div class="mt-1"${_scopeId4}><input type="text" id="street" name="street"${ssrRenderAttr("value", data.value.address.street)} class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="apartment" class="block text-sm font-medium text-gray-700"${_scopeId4}>Apartment, suite, etc.</label><div class="mt-1"${_scopeId4}><input type="text" id="apartment" name="apartment"${ssrRenderAttr("value", data.value.address.apartment)} class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}><label for="city" class="block text-sm font-medium text-gray-700"${_scopeId4}>City</label><div class="mt-1"${_scopeId4}><input type="text" id="city" name="city"${ssrRenderAttr("value", data.value.address.city)} class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"${_scopeId4}></div></div><div class="sm:col-span-3"${_scopeId4}><label for="region" class="block text-sm font-medium text-gray-700"${_scopeId4}>State / Province</label><div class="mt-1"${_scopeId4}><input type="text" id="state" name="state"${ssrRenderAttr("value", data.value.address.state)} class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"${_scopeId4}></div></div><div class="sm:col-span-3"${_scopeId4}><label for="postal-code" class="block text-sm font-medium text-gray-700"${_scopeId4}>Postal code</label><div class="mt-1"${_scopeId4}><input type="text" id="postal_code" name="postal_code"${ssrRenderAttr("value", data.value.address.postal_code)} class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"${_scopeId4}></div></div><div class="sm:col-span-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_Dropdownlist, {
                                  data: { data: unref(useCountryStore)().list_all("") },
                                  onChange: handleSelectedInCompanyForm_country,
                                  show_label: "true",
                                  modelValue: data.value.address.country,
                                  "onUpdate:modelValue": ($event) => data.value.address.country = $event,
                                  name: "country",
                                  label: "Country",
                                  selected_value: data.value.address.country
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><input type="hidden" name="country_name" id="country_name"${ssrRenderAttr("value", data.value.address.country_name)}${_scopeId4}></div></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="flex flex-shrink-0 justify-end px-4 py-4 gap-x-2"${_scopeId4}><button type="reset" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"${_scopeId4}>Reset</button><button type="submit" class="zyn-button"${_scopeId4}>Save</button></div></form>`);
                            } else {
                              return [
                                createVNode("form", {
                                  name: "frmCompany",
                                  id: "frmCompany",
                                  class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                  onSubmit: withModifiers(saveCompanyForm, ["prevent"])
                                }, [
                                  createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                    createVNode("div", { class: "bg-primary-700 py-6 px-4 sm:px-6" }, [
                                      createVNode("div", { class: "flex items-center justify-between" }, [
                                        createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Company"), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                          createVNode("button", {
                                            type: "button",
                                            class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                            onClick: ($event) => isCompanyFormOpen.value = false
                                          }, [
                                            createVNode("span", { class: "sr-only" }, "Close panel"),
                                            createVNode(unref(render), {
                                              class: "h-6 w-6",
                                              "aria-hidden": "true"
                                            })
                                          ], 8, ["onClick"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "mt-1" }, [
                                        createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                      ])
                                    ]),
                                    progress.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                    }, [
                                      createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                    ])) : createCommentVNode("", true),
                                    !progress.value ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex-1 flex-col justify-between"
                                    }, [
                                      createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                        createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_name",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Company name "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.company_name = $event,
                                                type: "text",
                                                id: "company_name",
                                                name: "company_name",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.company_name]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_website",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Website name "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.company_website = $event,
                                                type: "text",
                                                id: "company_website",
                                                name: "company_website",
                                                autocomplete: "company_website",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.company_website]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_email",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Email "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.company_email = $event,
                                                type: "text",
                                                id: "company_email",
                                                name: "company_email",
                                                autocomplete: "company_email",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.company_email]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_phone_number",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Phone Number"),
                                            createVNode("div", { class: "mt-1 relative" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                                type: "text",
                                                name: "company_phone_number",
                                                id: "company_phone_number",
                                                autocomplete: "company_phone_number",
                                                class: "py-3 px-4 block w-full pl-5 focus:ring-green-500 focus:border-green-500 border-gray-300",
                                                placeholder: "(+1) 123-123-1234"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.phone_number]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("h2", { class: "font-medium text-primary-700" }, "Incorporation Information")
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode(_component_Dropdownlist, {
                                              data: { data: unref(useCountryStore)().list_all("") },
                                              onChange: handleSelectedInCompanyForm_country_of_incorporation,
                                              show_label: "true",
                                              modelValue: data.value.country_of_incorporation,
                                              "onUpdate:modelValue": ($event) => data.value.country_of_incorporation = $event,
                                              name: "country_of_incorporation",
                                              label: "Country Of Incorporation",
                                              selected_value: data.value.country_of_incorporation
                                            }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "date_of_incorporation",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Date Of Incorporation "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.date_of_incorporation = $event,
                                                type: "text",
                                                id: "date_of_incorporation",
                                                name: "date_of_incorporation",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.date_of_incorporation]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "tin_ein_number",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " TIN/EIN #. "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.tin_ein_number = $event,
                                                type: "text",
                                                id: "tin_ein_number",
                                                name: "tin_ein_number",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.tin_ein_number]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("h2", { class: "font-medium text-primary-700" }, "Primary Address/Corporate Headquarters")
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "address",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Street"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "street",
                                                name: "street",
                                                "onUpdate:modelValue": ($event) => data.value.address.street = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.street]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "apartment",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Apartment, suite, etc."),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "apartment",
                                                name: "apartment",
                                                "onUpdate:modelValue": ($event) => data.value.address.apartment = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.apartment]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "city",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "City"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "city",
                                                name: "city",
                                                "onUpdate:modelValue": ($event) => data.value.address.city = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.city]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-3" }, [
                                            createVNode("label", {
                                              for: "region",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "State / Province"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "state",
                                                name: "state",
                                                "onUpdate:modelValue": ($event) => data.value.address.state = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.state]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-3" }, [
                                            createVNode("label", {
                                              for: "postal-code",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Postal code"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "postal_code",
                                                name: "postal_code",
                                                "onUpdate:modelValue": ($event) => data.value.address.postal_code = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.postal_code]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode(_component_Dropdownlist, {
                                              data: { data: unref(useCountryStore)().list_all("") },
                                              onChange: handleSelectedInCompanyForm_country,
                                              show_label: "true",
                                              modelValue: data.value.address.country,
                                              "onUpdate:modelValue": ($event) => data.value.address.country = $event,
                                              name: "country",
                                              label: "Country",
                                              selected_value: data.value.address.country
                                            }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                          ]),
                                          withDirectives(createVNode("input", {
                                            type: "hidden",
                                            name: "country_name",
                                            id: "country_name",
                                            "onUpdate:modelValue": ($event) => data.value.address.country_name = $event
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [vModelText, data.value.address.country_name]
                                          ])
                                        ])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4 gap-x-2" }, [
                                    createVNode("button", {
                                      type: "reset",
                                      class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    }, "Reset"),
                                    createVNode("button", {
                                      onClick: saveCompanyForm,
                                      type: "submit",
                                      class: "zyn-button"
                                    }, "Save")
                                  ])
                                ], 40, ["onSubmit"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                            default: withCtx(() => [
                              createVNode("form", {
                                name: "frmCompany",
                                id: "frmCompany",
                                class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                onSubmit: withModifiers(saveCompanyForm, ["prevent"])
                              }, [
                                createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                  createVNode("div", { class: "bg-primary-700 py-6 px-4 sm:px-6" }, [
                                    createVNode("div", { class: "flex items-center justify-between" }, [
                                      createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Company"), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                          onClick: ($event) => isCompanyFormOpen.value = false
                                        }, [
                                          createVNode("span", { class: "sr-only" }, "Close panel"),
                                          createVNode(unref(render), {
                                            class: "h-6 w-6",
                                            "aria-hidden": "true"
                                          })
                                        ], 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "mt-1" }, [
                                      createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                    ])
                                  ]),
                                  progress.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                  }, [
                                    createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                  ])) : createCommentVNode("", true),
                                  !progress.value ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex-1 flex-col justify-between"
                                  }, [
                                    createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                      createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "company_name",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " Company name "),
                                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.company_name = $event,
                                              type: "text",
                                              id: "company_name",
                                              name: "company_name",
                                              autocomplete: "name",
                                              class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.company_name]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "company_website",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " Website name "),
                                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.company_website = $event,
                                              type: "text",
                                              id: "company_website",
                                              name: "company_website",
                                              autocomplete: "company_website",
                                              class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.company_website]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "company_email",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " Email "),
                                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.company_email = $event,
                                              type: "text",
                                              id: "company_email",
                                              name: "company_email",
                                              autocomplete: "company_email",
                                              class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.company_email]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "company_phone_number",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "Phone Number"),
                                          createVNode("div", { class: "mt-1 relative" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                              type: "text",
                                              name: "company_phone_number",
                                              id: "company_phone_number",
                                              autocomplete: "company_phone_number",
                                              class: "py-3 px-4 block w-full pl-5 focus:ring-green-500 focus:border-green-500 border-gray-300",
                                              placeholder: "(+1) 123-123-1234"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.phone_number]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("h2", { class: "font-medium text-primary-700" }, "Incorporation Information")
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode(_component_Dropdownlist, {
                                            data: { data: unref(useCountryStore)().list_all("") },
                                            onChange: handleSelectedInCompanyForm_country_of_incorporation,
                                            show_label: "true",
                                            modelValue: data.value.country_of_incorporation,
                                            "onUpdate:modelValue": ($event) => data.value.country_of_incorporation = $event,
                                            name: "country_of_incorporation",
                                            label: "Country Of Incorporation",
                                            selected_value: data.value.country_of_incorporation
                                          }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "date_of_incorporation",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " Date Of Incorporation "),
                                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.date_of_incorporation = $event,
                                              type: "text",
                                              id: "date_of_incorporation",
                                              name: "date_of_incorporation",
                                              autocomplete: "name",
                                              class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.date_of_incorporation]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "tin_ein_number",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, " TIN/EIN #. "),
                                          createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                            withDirectives(createVNode("input", {
                                              "onUpdate:modelValue": ($event) => data.value.tin_ein_number = $event,
                                              type: "text",
                                              id: "tin_ein_number",
                                              name: "tin_ein_number",
                                              autocomplete: "name",
                                              class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.tin_ein_number]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("h2", { class: "font-medium text-primary-700" }, "Primary Address/Corporate Headquarters")
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "address",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "Street"),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("input", {
                                              type: "text",
                                              id: "street",
                                              name: "street",
                                              "onUpdate:modelValue": ($event) => data.value.address.street = $event,
                                              class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.address.street]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "apartment",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "Apartment, suite, etc."),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("input", {
                                              type: "text",
                                              id: "apartment",
                                              name: "apartment",
                                              "onUpdate:modelValue": ($event) => data.value.address.apartment = $event,
                                              class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.address.apartment]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode("label", {
                                            for: "city",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "City"),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("input", {
                                              type: "text",
                                              id: "city",
                                              name: "city",
                                              "onUpdate:modelValue": ($event) => data.value.address.city = $event,
                                              class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.address.city]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-3" }, [
                                          createVNode("label", {
                                            for: "region",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "State / Province"),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("input", {
                                              type: "text",
                                              id: "state",
                                              name: "state",
                                              "onUpdate:modelValue": ($event) => data.value.address.state = $event,
                                              class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.address.state]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-3" }, [
                                          createVNode("label", {
                                            for: "postal-code",
                                            class: "block text-sm font-medium text-gray-700"
                                          }, "Postal code"),
                                          createVNode("div", { class: "mt-1" }, [
                                            withDirectives(createVNode("input", {
                                              type: "text",
                                              id: "postal_code",
                                              name: "postal_code",
                                              "onUpdate:modelValue": ($event) => data.value.address.postal_code = $event,
                                              class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.address.postal_code]
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "sm:col-span-6" }, [
                                          createVNode(_component_Dropdownlist, {
                                            data: { data: unref(useCountryStore)().list_all("") },
                                            onChange: handleSelectedInCompanyForm_country,
                                            show_label: "true",
                                            modelValue: data.value.address.country,
                                            "onUpdate:modelValue": ($event) => data.value.address.country = $event,
                                            name: "country",
                                            label: "Country",
                                            selected_value: data.value.address.country
                                          }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                        ]),
                                        withDirectives(createVNode("input", {
                                          type: "hidden",
                                          name: "country_name",
                                          id: "country_name",
                                          "onUpdate:modelValue": ($event) => data.value.address.country_name = $event
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, data.value.address.country_name]
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4 gap-x-2" }, [
                                  createVNode("button", {
                                    type: "reset",
                                    class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                  }, "Reset"),
                                  createVNode("button", {
                                    onClick: saveCompanyForm,
                                    type: "submit",
                                    class: "zyn-button"
                                  }, "Save")
                                ])
                              ], 40, ["onSubmit"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "fixed inset-0" }),
                    createVNode("div", { class: "fixed inset-0 overflow-hidden" }, [
                      createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                        createVNode("div", { class: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16" }, [
                          createVNode(unref(TransitionChild), {
                            as: "template",
                            enter: "transform transition ease-in-out duration-500 sm:duration-700",
                            "enter-from": "translate-x-full",
                            "enter-to": "translate-x-0",
                            leave: "transform transition ease-in-out duration-500 sm:duration-700",
                            "leave-from": "translate-x-0",
                            "leave-to": "translate-x-full"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                                default: withCtx(() => [
                                  createVNode("form", {
                                    name: "frmCompany",
                                    id: "frmCompany",
                                    class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                    onSubmit: withModifiers(saveCompanyForm, ["prevent"])
                                  }, [
                                    createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                      createVNode("div", { class: "bg-primary-700 py-6 px-4 sm:px-6" }, [
                                        createVNode("div", { class: "flex items-center justify-between" }, [
                                          createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Company"), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                            createVNode("button", {
                                              type: "button",
                                              class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                              onClick: ($event) => isCompanyFormOpen.value = false
                                            }, [
                                              createVNode("span", { class: "sr-only" }, "Close panel"),
                                              createVNode(unref(render), {
                                                class: "h-6 w-6",
                                                "aria-hidden": "true"
                                              })
                                            ], 8, ["onClick"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "mt-1" }, [
                                          createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                        ])
                                      ]),
                                      progress.value ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                      }, [
                                        createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                      ])) : createCommentVNode("", true),
                                      !progress.value ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex-1 flex-col justify-between"
                                      }, [
                                        createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                          createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "company_name",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " Company name "),
                                              createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.company_name = $event,
                                                  type: "text",
                                                  id: "company_name",
                                                  name: "company_name",
                                                  autocomplete: "name",
                                                  class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.company_name]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "company_website",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " Website name "),
                                              createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.company_website = $event,
                                                  type: "text",
                                                  id: "company_website",
                                                  name: "company_website",
                                                  autocomplete: "company_website",
                                                  class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.company_website]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "company_email",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " Email "),
                                              createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.company_email = $event,
                                                  type: "text",
                                                  id: "company_email",
                                                  name: "company_email",
                                                  autocomplete: "company_email",
                                                  class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.company_email]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "company_phone_number",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "Phone Number"),
                                              createVNode("div", { class: "mt-1 relative" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                                  type: "text",
                                                  name: "company_phone_number",
                                                  id: "company_phone_number",
                                                  autocomplete: "company_phone_number",
                                                  class: "py-3 px-4 block w-full pl-5 focus:ring-green-500 focus:border-green-500 border-gray-300",
                                                  placeholder: "(+1) 123-123-1234"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.phone_number]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("h2", { class: "font-medium text-primary-700" }, "Incorporation Information")
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode(_component_Dropdownlist, {
                                                data: { data: unref(useCountryStore)().list_all("") },
                                                onChange: handleSelectedInCompanyForm_country_of_incorporation,
                                                show_label: "true",
                                                modelValue: data.value.country_of_incorporation,
                                                "onUpdate:modelValue": ($event) => data.value.country_of_incorporation = $event,
                                                name: "country_of_incorporation",
                                                label: "Country Of Incorporation",
                                                selected_value: data.value.country_of_incorporation
                                              }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "date_of_incorporation",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " Date Of Incorporation "),
                                              createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.date_of_incorporation = $event,
                                                  type: "text",
                                                  id: "date_of_incorporation",
                                                  name: "date_of_incorporation",
                                                  autocomplete: "name",
                                                  class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.date_of_incorporation]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "tin_ein_number",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, " TIN/EIN #. "),
                                              createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                                withDirectives(createVNode("input", {
                                                  "onUpdate:modelValue": ($event) => data.value.tin_ein_number = $event,
                                                  type: "text",
                                                  id: "tin_ein_number",
                                                  name: "tin_ein_number",
                                                  autocomplete: "name",
                                                  class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.tin_ein_number]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("h2", { class: "font-medium text-primary-700" }, "Primary Address/Corporate Headquarters")
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "address",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "Street"),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("input", {
                                                  type: "text",
                                                  id: "street",
                                                  name: "street",
                                                  "onUpdate:modelValue": ($event) => data.value.address.street = $event,
                                                  class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.address.street]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "apartment",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "Apartment, suite, etc."),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("input", {
                                                  type: "text",
                                                  id: "apartment",
                                                  name: "apartment",
                                                  "onUpdate:modelValue": ($event) => data.value.address.apartment = $event,
                                                  class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.address.apartment]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode("label", {
                                                for: "city",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "City"),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("input", {
                                                  type: "text",
                                                  id: "city",
                                                  name: "city",
                                                  "onUpdate:modelValue": ($event) => data.value.address.city = $event,
                                                  class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.address.city]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-3" }, [
                                              createVNode("label", {
                                                for: "region",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "State / Province"),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("input", {
                                                  type: "text",
                                                  id: "state",
                                                  name: "state",
                                                  "onUpdate:modelValue": ($event) => data.value.address.state = $event,
                                                  class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.address.state]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-3" }, [
                                              createVNode("label", {
                                                for: "postal-code",
                                                class: "block text-sm font-medium text-gray-700"
                                              }, "Postal code"),
                                              createVNode("div", { class: "mt-1" }, [
                                                withDirectives(createVNode("input", {
                                                  type: "text",
                                                  id: "postal_code",
                                                  name: "postal_code",
                                                  "onUpdate:modelValue": ($event) => data.value.address.postal_code = $event,
                                                  class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                                }, null, 8, ["onUpdate:modelValue"]), [
                                                  [vModelText, data.value.address.postal_code]
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "sm:col-span-6" }, [
                                              createVNode(_component_Dropdownlist, {
                                                data: { data: unref(useCountryStore)().list_all("") },
                                                onChange: handleSelectedInCompanyForm_country,
                                                show_label: "true",
                                                modelValue: data.value.address.country,
                                                "onUpdate:modelValue": ($event) => data.value.address.country = $event,
                                                name: "country",
                                                label: "Country",
                                                selected_value: data.value.address.country
                                              }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                            ]),
                                            withDirectives(createVNode("input", {
                                              type: "hidden",
                                              name: "country_name",
                                              id: "country_name",
                                              "onUpdate:modelValue": ($event) => data.value.address.country_name = $event
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, data.value.address.country_name]
                                            ])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4 gap-x-2" }, [
                                      createVNode("button", {
                                        type: "reset",
                                        class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                      }, "Reset"),
                                      createVNode("button", {
                                        onClick: saveCompanyForm,
                                        type: "submit",
                                        class: "zyn-button"
                                      }, "Save")
                                    ])
                                  ], 40, ["onSubmit"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-10"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "fixed inset-0" }),
                  createVNode("div", { class: "fixed inset-0 overflow-hidden" }, [
                    createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                      createVNode("div", { class: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "transform transition ease-in-out duration-500 sm:duration-700",
                          "enter-from": "translate-x-full",
                          "enter-to": "translate-x-0",
                          leave: "transform transition ease-in-out duration-500 sm:duration-700",
                          "leave-from": "translate-x-0",
                          "leave-to": "translate-x-full"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "pointer-events-auto w-screen max-w-md" }, {
                              default: withCtx(() => [
                                createVNode("form", {
                                  name: "frmCompany",
                                  id: "frmCompany",
                                  class: "flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",
                                  onSubmit: withModifiers(saveCompanyForm, ["prevent"])
                                }, [
                                  createVNode("div", { class: "h-0 flex-1 overflow-y-auto" }, [
                                    createVNode("div", { class: "bg-primary-700 py-6 px-4 sm:px-6" }, [
                                      createVNode("div", { class: "flex items-center justify-between" }, [
                                        createVNode(unref(DialogTitle), { class: "text-lg font-medium text-white" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.form_title ? __props.form_title : "Company"), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "ml-3 flex h-7 items-center" }, [
                                          createVNode("button", {
                                            type: "button",
                                            class: "rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                            onClick: ($event) => isCompanyFormOpen.value = false
                                          }, [
                                            createVNode("span", { class: "sr-only" }, "Close panel"),
                                            createVNode(unref(render), {
                                              class: "h-6 w-6",
                                              "aria-hidden": "true"
                                            })
                                          ], 8, ["onClick"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "mt-1" }, [
                                        createVNode("p", { class: "text-sm text-primary-300" }, toDisplayString(__props.form_description ? __props.form_description : "Find out how we can help you?"), 1)
                                      ])
                                    ]),
                                    progress.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "z-50 h-full overflow-hidden flex flex-col items-center justify-center"
                                    }, [
                                      createVNode("div", { class: "loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4" })
                                    ])) : createCommentVNode("", true),
                                    !progress.value ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex-1 flex-col justify-between"
                                    }, [
                                      createVNode("div", { class: "divide-y divide-gray-200 px-4 sm:px-6" }, [
                                        createVNode("div", { class: "space-y-6 pt-6 pb-5" }, [
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_name",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Company name "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.company_name = $event,
                                                type: "text",
                                                id: "company_name",
                                                name: "company_name",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.company_name]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_website",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Website name "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.company_website = $event,
                                                type: "text",
                                                id: "company_website",
                                                name: "company_website",
                                                autocomplete: "company_website",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.company_website]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_email",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Email "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.company_email = $event,
                                                type: "text",
                                                id: "company_email",
                                                name: "company_email",
                                                autocomplete: "company_email",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.company_email]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "company_phone_number",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Phone Number"),
                                            createVNode("div", { class: "mt-1 relative" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.phone_number = $event,
                                                type: "text",
                                                name: "company_phone_number",
                                                id: "company_phone_number",
                                                autocomplete: "company_phone_number",
                                                class: "py-3 px-4 block w-full pl-5 focus:ring-green-500 focus:border-green-500 border-gray-300",
                                                placeholder: "(+1) 123-123-1234"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.phone_number]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("h2", { class: "font-medium text-primary-700" }, "Incorporation Information")
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode(_component_Dropdownlist, {
                                              data: { data: unref(useCountryStore)().list_all("") },
                                              onChange: handleSelectedInCompanyForm_country_of_incorporation,
                                              show_label: "true",
                                              modelValue: data.value.country_of_incorporation,
                                              "onUpdate:modelValue": ($event) => data.value.country_of_incorporation = $event,
                                              name: "country_of_incorporation",
                                              label: "Country Of Incorporation",
                                              selected_value: data.value.country_of_incorporation
                                            }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "date_of_incorporation",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " Date Of Incorporation "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.date_of_incorporation = $event,
                                                type: "text",
                                                id: "date_of_incorporation",
                                                name: "date_of_incorporation",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.date_of_incorporation]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "tin_ein_number",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, " TIN/EIN #. "),
                                            createVNode("div", { class: "mt-1 rounded-md shadow-sm" }, [
                                              withDirectives(createVNode("input", {
                                                "onUpdate:modelValue": ($event) => data.value.tin_ein_number = $event,
                                                type: "text",
                                                id: "tin_ein_number",
                                                name: "tin_ein_number",
                                                autocomplete: "name",
                                                class: "py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.tin_ein_number]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("h2", { class: "font-medium text-primary-700" }, "Primary Address/Corporate Headquarters")
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "address",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Street"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "street",
                                                name: "street",
                                                "onUpdate:modelValue": ($event) => data.value.address.street = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.street]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "apartment",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Apartment, suite, etc."),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "apartment",
                                                name: "apartment",
                                                "onUpdate:modelValue": ($event) => data.value.address.apartment = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.apartment]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode("label", {
                                              for: "city",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "City"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "city",
                                                name: "city",
                                                "onUpdate:modelValue": ($event) => data.value.address.city = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.city]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-3" }, [
                                            createVNode("label", {
                                              for: "region",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "State / Province"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "state",
                                                name: "state",
                                                "onUpdate:modelValue": ($event) => data.value.address.state = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.state]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-3" }, [
                                            createVNode("label", {
                                              for: "postal-code",
                                              class: "block text-sm font-medium text-gray-700"
                                            }, "Postal code"),
                                            createVNode("div", { class: "mt-1" }, [
                                              withDirectives(createVNode("input", {
                                                type: "text",
                                                id: "postal_code",
                                                name: "postal_code",
                                                "onUpdate:modelValue": ($event) => data.value.address.postal_code = $event,
                                                class: "block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm"
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [vModelText, data.value.address.postal_code]
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "sm:col-span-6" }, [
                                            createVNode(_component_Dropdownlist, {
                                              data: { data: unref(useCountryStore)().list_all("") },
                                              onChange: handleSelectedInCompanyForm_country,
                                              show_label: "true",
                                              modelValue: data.value.address.country,
                                              "onUpdate:modelValue": ($event) => data.value.address.country = $event,
                                              name: "country",
                                              label: "Country",
                                              selected_value: data.value.address.country
                                            }, null, 8, ["data", "modelValue", "onUpdate:modelValue", "selected_value"])
                                          ]),
                                          withDirectives(createVNode("input", {
                                            type: "hidden",
                                            name: "country_name",
                                            id: "country_name",
                                            "onUpdate:modelValue": ($event) => data.value.address.country_name = $event
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [vModelText, data.value.address.country_name]
                                          ])
                                        ])
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "flex flex-shrink-0 justify-end px-4 py-4 gap-x-2" }, [
                                    createVNode("button", {
                                      type: "reset",
                                      class: "rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    }, "Reset"),
                                    createVNode("button", {
                                      onClick: saveCompanyForm,
                                      type: "submit",
                                      class: "zyn-button"
                                    }, "Save")
                                  ])
                                ], 40, ["onSubmit"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/commons/CompanyForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    console.log("Calling company ##############################################################################---->");
    const company = ([__temp, __restore] = withAsyncContext(() => useCompany()), __temp = await __temp, __restore(), __temp);
    if (company.data._rawValue.length > 0)
      useCompanyStore().updateCompany(company.data._rawValue[0]);
    ref(false);
    ref({});
    useNuxtApp().$bus.$on("evtUploadSuccess", (data) => {
      data.url;
    });
    const stats = [
      {
        hidden: false,
        title: "Date Of Incorporation",
        description: "",
        value: useNuxtApp().$dayjs(useCompanyStore().incorporation.date_of_incorporation).format("DD-MMM-YYYY"),
        icon: "icon-park-twotone:calendar",
        iconForeground: "text-yellow-700",
        iconBackground: "bg-yellow-50"
      },
      {
        hidden: false,
        title: "Country Of Incorporation",
        description: "",
        value: useCountryStore().country_by_code(useCompanyStore().incorporation.country_of_incorporation),
        icon: "icon-park-twotone:globe",
        iconForeground: "text-teal-700",
        iconBackground: "bg-teal-50"
      },
      {
        hidden: false,
        title: "EIN/TIN #",
        description: "",
        value: useCompanyStore().incorporation.tin_ein_number,
        icon: "icon-park-twotone:bank-card",
        iconForeground: "text-purple-700",
        iconBackground: "bg-purple-50"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ManagementLeftNavBar = __nuxt_component_0;
      const _component_ManagementSoftwareVersion = __nuxt_component_1;
      const _component_CommonsSecondaryNav = __nuxt_component_2;
      const _component_zynomi_stats_simple = __nuxt_component_3;
      const _component_zynomi_dynamic_data_display = __nuxt_component_4;
      const _component_CommonsCompanyForm = __nuxt_component_5;
      _push(`<!--[--><div class="h-screen flex overflow-hidden bg-gray-50"><div class="hidden lg:flex lg:flex-shrink-0"><div class="flex flex-col w-64"><div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">`);
      _push(ssrRenderComponent(_component_ManagementLeftNavBar, null, null, _parent));
      _push(ssrRenderComponent(_component_ManagementSoftwareVersion, null, null, _parent));
      _push(`</div></div></div><div class="flex flex-col min-w-0 flex-1 overflow-hidden"><div class="flex-1 relative z-0 flex overflow-hidden"><main class="flex-1 flex overflow-hidden"><div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden"><div class="flex-1 flex xl:overflow-hidden">`);
      _push(ssrRenderComponent(_component_CommonsSecondaryNav, {
        title: "Organization",
        api_end_point: "/_navigation/organization"
      }, null, _parent));
      _push(`<div class="flex-1 xl:overflow-y-auto">`);
      _push(ssrRenderComponent(OrganizationPageHeader, {
        heading: "Company",
        showbutton: "true",
        guide: "Company details",
        addClickEvent: "evtCompanyForm"
      }, null, _parent));
      _push(`<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div class="pb-4">`);
      _push(ssrRenderComponent(_component_zynomi_stats_simple, { data: stats }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 gap-4 lg:grid-cols-2">`);
      _push(ssrRenderComponent(_component_zynomi_dynamic_data_display, {
        title: "Basic Information",
        title_description: "General details of the company",
        data: unref(useCompanyStore)().basic_details
      }, null, _parent));
      _push(ssrRenderComponent(_component_zynomi_dynamic_data_display, {
        title: "Address",
        title_description: "Primary address / Corporate Headquarters",
        data: unref(useCompanyStore)().primary_address_formatted
      }, null, _parent));
      _push(`</div></div></div></div></div></main></div></div></div>`);
      _push(ssrRenderComponent(_component_CommonsCompanyForm, {
        form_title: "Company",
        form_description: "Company details"
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/organization/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
