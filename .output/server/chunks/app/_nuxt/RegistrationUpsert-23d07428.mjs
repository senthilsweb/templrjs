import { ref, unref, mergeProps, useSSRContext } from 'vue';
import { d as useNuxtApp, F as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "RegistrationUpsert",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref({});
    const progress = ref(false);
    const isUpsertRegistrationVisible = ref(false);
    const isDeleteButtonVisible = ref(false);
    ref(/* @__PURE__ */ new Date());
    const api = "/api/supabase/registration/";
    ref(null);
    useNuxtApp().$bus.$on("evtUpsertRegistration", (args) => {
      isUpsertRegistrationVisible.value = !isUpsertRegistrationVisible.value;
      progress.value = false;
      data.value = args;
      data.value.date_of_birth = useNuxtApp().$dayjs(data.value.date_of_birth).format("DD-MMM-YYYY");
    });
    useNuxtApp().$bus.$on("evtDeleteRegistration", (data2) => {
      deleteRegistration(data2._cells[0].data);
    });
    async function deleteRegistration(id) {
      try {
        await useFetch(api + id, {
          method: "delete",
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response.status == 204) {
              useNuxtApp().$toast.show({ type: "success", message: "Delete was successful", timeout: 6 });
              useNuxtApp().$bus.$emit("evtSearchRegistration");
              data.value = { is_active: true, is_action_button: false, is_footer_description: false };
            } else {
              useNuxtApp().$toast.show({ type: "danger", message: "The delete failed...", timeout: 6 });
            }
          }
        }, "$ROy2ZiwH6m");
      } catch (error) {
      } finally {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isUpsertRegistrationVisible)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 overflow-hidden",
          "aria-labelledby": "slide-over-title",
          role: "dialog",
          "aria-modal": "true"
        }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute inset-0" aria-hidden="true"></div><div class="absolute inset-y-0 right-0 pl-10 max-w-full flex"><div class="w-screen max-w-4xl"><div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"><div class="flex-1 h-0 overflow-y-auto"><header class="space-y-1 py-6 px-4 bg-gray-200 bg-opacity-50 sm:px-6"><div class="flex items-center justify-between space-x-3"><h2 class="text-lg leading-7 font-medium text-gray-700">Registration</h2><div class="h-7 flex items-center"><button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div><p class="text-sm leading-5 text-gray-500">New Sign-up for classes</p></div></header>`);
        if (unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="space-y-6 pt-6 pb-5"><div class="flex justify-center"><span class="inline-flex"><button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600"><svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </button></span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(progress)) {
          _push(`<div class="flex-1 flex flex-col justify-between"><div class="px-4 divide-y divide-gray-200 sm:px-6"><div class="space-y-6 pt-6 pb-5"><form name="SignUp" id="SignUp" class="space-y-8" method="POST"><input type="hidden" name="form-name" value="SignUp"><div class="sm:overflow-hidden"><section aria-labelledby="shipping-heading"><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Course Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="pt-2 space-y-4 sm:pt-2 sm:space-y-4 sm:col-span-6"><div class="space-y-6 sm:space-y-5 divide-y divide-gray-200"><div class="pt-6 sm:pt-2"><div role="group" aria-labelledby="label-email"><div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline"><div><div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-course">Select the classes you would like to register.</div></div><div class="mt-4 sm:mt-0 sm:col-span-2"><div class="max-w-lg space-y-4"><div class="relative flex items-start"><div class="flex items-center h-5"><input id="course_bharathanatiyam" name="course_bollywood"${ssrIncludeBooleanAttr(Array.isArray(unref(data).course_bharathanatiyam) ? ssrLooseContain(unref(data).course_bharathanatiyam, null) : unref(data).course_bharathanatiyam) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="course_bharathanatiyam" class="font-medium text-gray-700">Bharathanatiyam</label></div></div><div class="relative flex items-start"><div class="flex items-center h-5"><input id="course_bollywood" name="course_bollywood"${ssrIncludeBooleanAttr(Array.isArray(unref(data).course_bollywood) ? ssrLooseContain(unref(data).course_bollywood, null) : unref(data).course_bollywood) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="course_bollywood" class="font-medium text-gray-700">Bollywood</label></div></div><div><div class="relative flex items-start"><div class="flex items-center h-5"><input id="course_carnatic" name="course_carnatic"${ssrIncludeBooleanAttr(Array.isArray(unref(data).course_carnatic) ? ssrLooseContain(unref(data).course_carnatic, null) : unref(data).course_carnatic) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="course_carnatic" class="font-medium text-gray-700">Carnatic Music</label></div></div></div><div><div class="relative flex items-start"><div class="flex items-center h-5"><input id="course_odissi" name="course_odissi"${ssrIncludeBooleanAttr(Array.isArray(unref(data).course_odissi) ? ssrLooseContain(unref(data).course_odissi, null) : unref(data).course_odissi) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="course_odissi" class="font-medium text-gray-700">Odissi</label></div></div></div><div class="relative flex items-start"><div class="flex items-center h-5"><input id="course_yoga_for_children" name="course_yoga_for_children"${ssrIncludeBooleanAttr(Array.isArray(unref(data).course_yoga_for_children) ? ssrLooseContain(unref(data).course_yoga_for_children, null) : unref(data).course_yoga_for_children) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="course_yoga_for_children" class="font-medium text-gray-700">Yoga for children</label></div></div></div></div></div></div></div></div></div></div></section><section aria-labelledby="shipping-heading" class="mt-10"><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Student Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-6"><label for="first_name" class="block text-sm font-medium text-gray-700">First name *</label><div class="mt-1"><input${ssrRenderAttr("value", unref(data).first_name)} type="text" name="first_name" id="first_name" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="last_name" class="block text-sm font-medium text-gray-700">Last name *</label><div class="mt-1"><input${ssrRenderAttr("value", unref(data).last_name)} type="text" name="last_name" id="last_name" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="date_of_birth" class="block text-sm font-medium text-gray-700"> Date of birth </label><div class="mt-1 rounded-md shadow-sm"><input type="text"${ssrRenderAttr("value", unref(data).date_of_birth)} class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="medical_information" class="block font-medium text-gray-700"> Medical Information </label><div class="mt-1"><textarea id="medical_information" name="medical_information" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300">${ssrInterpolate(unref(data).medical_information)}</textarea></div><p class="mt-2 text-sm text-gray-500">e.g Asthma, nut allergy. Please state N/A if there is no medical information that we need to be aware of</p></div></div></section><section aria-labelledby="shipping-heading" class="mt-10"><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900"> Parent/Guardian Information </h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-6"><label for="guardian_full_name" class="block text-sm font-medium text-gray-700">Full name *</label><div class="mt-1"><input${ssrRenderAttr("value", unref(data).guardian_full_name)} type="text" name="guardian_full_name" id="guardian_full_name" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-6"><label for="guardian_email" class="block text-sm font-medium text-gray-700"> Email * </label><div class="mt-1 rounded-md shadow-sm"><input${ssrRenderAttr("value", unref(data).guardian_email)} type="text" id="guardian_email" name="guardian_email" class="py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300"></div></div><div class="sm:col-span-6"><label for="guardian_phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label><div class="mt-1 relative"><input${ssrRenderAttr("value", unref(data).guardian_phone_number)} type="text" name="guardian_phone_number" id="guardian_phone_number" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" placeholder="+1 (555) 987-6543"></div></div></div></section><section aria-labelledby="shipping-heading" class="mt-10"><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Address Information</h2></div><div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3"><div class="sm:col-span-3"><label for="street" class="block text-sm font-medium text-gray-700">Address</label><div class="mt-1"><input type="text" id="street" name="street"${ssrRenderAttr("value", unref(data).address.street)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div class="sm:col-span-3"><label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label><div class="mt-1"><input type="text" id="apartment" name="apartment"${ssrRenderAttr("value", unref(data).address.apartment)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div><label for="city" class="block text-sm font-medium text-gray-700">City</label><div class="mt-1"><input type="text" id="city" name="city"${ssrRenderAttr("value", unref(data).address.city)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div><label for="state" class="block text-sm font-medium text-gray-700">State / Province</label><div class="mt-1"><input type="text" id="state" name="state"${ssrRenderAttr("value", unref(data).address.state)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div><div><label for="postal_code" class="block text-sm font-medium text-gray-700">Postal code</label><div class="mt-1"><input type="text" id="postal_code" name="postal_code"${ssrRenderAttr("value", unref(data).address.postal_code)} class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300"></div></div></div></section><div class="pt-2 space-y-4 sm:pt-2 sm:space-y-4 sm:col-span-6"><section aria-labelledby="shipping-heading" class="mt-10"><div class="sm:col-span-6"><h2 class="font-medium text-blue-gray-900">Parent Consent</h2></div><div class="mt-6"><div class="space-y-6 sm:space-y-5 divide-y divide-gray-200"><div class="pt-6 sm:pt-2"><div role="group" aria-labelledby="label-email"><div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline"><div><div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">Parent Concent</div></div><div class="mt-4 sm:mt-0 sm:col-span-2"><div class="max-w-lg space-y-4"><div class="relative flex items-start"><div class="flex items-center h-5"><input id="parent_consent_data_privacy" name="parent_consent_data_privacy"${ssrIncludeBooleanAttr(Array.isArray(unref(data).parent_consent_data_privacy) ? ssrLooseContain(unref(data).parent_consent_data_privacy, null) : unref(data).parent_consent_data_privacy) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="parent_consent_data_privacy" class="text-sm text-gray-700">I hereby agree that my data entered in the contact form will be stored electronically, and will be processed and used for the purpose of establishing contact. I am aware that I can revoke my consent at any time.</label></div></div><div><div class="relative flex items-start"><div class="flex items-center h-5"><input id="parent_consent_data_share_for_promotion" name="parent_consent_data_share_for_promotion"${ssrIncludeBooleanAttr(Array.isArray(unref(data).parent_consent_data_share_for_promotion) ? ssrLooseContain(unref(data).parent_consent_data_share_for_promotion, null) : unref(data).parent_consent_data_share_for_promotion) ? " checked" : ""} type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"></div><div class="ml-3 text-sm"><label for="parent_consent_data_share_for_promotion" class="text-sm text-gray-700">I grant permission for my child to be in the photos/videos taken for promotional purposes/social media/display on the school website</label></div></div></div></div></div></div></div></div></div></div></section></div><div class="sm:col-span-6"><div class="flex items-center"><input id="terms_and_conditions" name="terms_and_conditions" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(data).terms_and_conditions) ? ssrLooseContain(unref(data).terms_and_conditions, null) : unref(data).terms_and_conditions) ? " checked" : ""} class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"><label for="terms_and_conditions" class="ml-2 block text-sm leading-5 text-gray-900"> I agree to <a href="/legal/tc" target="_blank" class="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"> terms &amp; conditions. </a></label></div></div></div></form></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"><span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button></span>`);
        if (unref(isDeleteButtonVisible)) {
          _push(`<span class="inline-flex rounded-md shadow-sm"><button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="inline-flex rounded-md shadow-sm"><button type="submit" class="zyn-button">Save</button></span></div></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registration/RegistrationUpsert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
