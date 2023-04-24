import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Calendar, DatePicker } from 'v-calendar';

const __default__ = {
  components: {
    Calendar,
    DatePicker
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {},
  async asyncData({ params }) {
  },
  created() {
    this.data = {
      location: { type: "Point", coordinates: [0, 0] },
      address: { street: "", apartment: "", city: "", district: "", state: "", country: "", postalCode: "" }
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "UserProfile",
  __ssrInlineRender: true,
  setup(__props) {
    const user = {
      "_id": {
        "$oid": "6327b3f0d2b1b68f79f3fbc4"
      },
      "email": "suresh@zynomi.com",
      "roles": [
        "Field Engineer",
        "Administrator"
      ],
      //"picture": "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      "username": "Shemar_Bruen",
      "password": "suresh",
      "last_name": "Jacklyn.Schiller36",
      "first_name": "Jaida_Abshire",
      "hand_phone": "(300) 515-2009 x8411",
      "created_at": "2022-09-18T14:44:47.046Z",
      "modified_at": "2022-09-18T04:16:42.264Z",
      "subscription": "free",
      "mobile_phone": "785.486.1601"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-2 gap-x-4" }, _attrs))}><div><section aria-labelledby="applicant-information-title"><div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6"><div class="max-w-lg mx-auto lg:max-w-none"><section aria-labelledby="userprofile" class="">`);
      if (user.picture) {
        _push(`<div><div class="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg"><img${ssrRenderAttr("src", user.picture)} alt="" class="object-cover"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><h3 class="font-medium text-gray-900">User Profile</h3><dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"><div class="flex justify-between py-3 text-sm font-medium"><dt class="text-gray-500">First Name</dt><dd class="whitespace-nowrap text-gray-900">${ssrInterpolate(user.first_name)}</dd></div><div class="flex justify-between py-3 text-sm font-medium"><dt class="text-gray-500">Last Name</dt><dd class="whitespace-nowrap text-gray-900">${ssrInterpolate(user.last_name)}</dd></div><div class="flex justify-between py-3 text-sm font-medium"><dt class="text-gray-500">Email</dt><dd class="whitespace-nowrap text-gray-900">${ssrInterpolate(user.email)}</dd></div><div class="flex justify-between py-3 text-sm font-medium"><dt class="text-gray-500">Mobile</dt><dd class="whitespace-nowrap text-gray-900">${ssrInterpolate(user.mobile_phone)}</dd></div><div class="flex justify-between py-3 text-sm font-medium"><dt class="text-gray-500">Member since</dt><dd class="whitespace-nowrap text-gray-900">${ssrInterpolate(user.created_at)}</dd></div></dl></div><div class="pt-2 sm:flex sm:items-center sm:justify-between"><button type="submit" class="w-full bg-lime-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lime-50 focus:ring-lime-400 sm:ml-6 sm:order-last sm:w-auto">Edit</button><p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left"></p></div></section></div></div></section></div><div><section aria-labelledby="User-Roles"><div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6"><h3 class="font-medium text-gray-900">Assigned Role(s)</h3><div class="sm:col-span-2"><dd class="bg-primary-50 bg-opacity-50 mt-1 text-sm text-gray-900 rounded-md"><ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200"><!--[-->`);
      ssrRenderList(user.roles, (role) => {
        _push(`<li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"><div class="flex w-0 flex-1 items-center"><span class="ml-2 w-0 flex-1 truncate">${ssrInterpolate(role)}</span></div></li>`);
      });
      _push(`<!--]--></ul></dd></div><div class="pt-2 sm:flex sm:items-center sm:justify-between"><button type="submit" class="w-full bg-lime-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lime-50 focus:ring-lime-400 sm:ml-6 sm:order-last sm:w-auto">Edit</button><p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left"></p></div></div></section></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/UserProfile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
