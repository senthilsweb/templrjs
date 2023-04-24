<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
          <ManagementLeftNavBar />
          <ManagementSoftwareVersion />
        </div>
      </div>
    </div>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 flex overflow-hidden">
          <div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
            <div class="flex-1 flex xl:overflow-hidden">
              <!-- Secondary sidebar (Start)-->
              <!--Nil-->
              <!-- Secondary sidebar (End)-->
              <div class="flex-1 xl:overflow-y-auto">
                <AccountPageHeader heading="Account" showbutton="false" guide="Manage your profile settings and personalizations" addClickEvent="" buttonText="Add" />
                <!-- Main content body (start)-->
                <div class="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                  <!-- Main Body Content (start)-->
                  <!-- Stat (start)-->
                  <div class="pb-4">
                    <zynomi-stats-simple :data="stats" />
                  </div>
                  <!-- Stat (End)-->
                  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <!-- body content # 1 (Start)-->
                    <div class="grid grid-cols-1">
                    <Avatar :image_src="useState('avatar_url').value"/>
                    </div>
                    <div class="grid grid-cols-1 col-span-2"> 
                    <zynomi-dynamic-data-display title="Personal Details" title_description="User personal details and custom attributes" :data="useState('user_profile').value" :key="useState('componentKey').value" />
                    </div>
                    <!-- body content # 1 (End)-->
                    <!-- body content # 2 (Start)-->
                    <!--<zynomi-dynamic-data-display title="Address" title_description="Primary address / Corporate Headquarters" :data="useCompanyStore().primary_address_formatted" />-->
                    <!-- body content # 2 (End)-->
                  </div>
                </div>
                <!-- Main content body (End)-->
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  <ProfileUpsert />
</template>
<!--Server and client side javascript-->
<script setup>
import AccountPageHeader from '@/pages/account/AccountPageHeader.vue';
import ProfileUpsert from '@/pages/account/ProfileUpsert.vue';
import Avatar from '@/pages/account/Avatar.vue';
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
import { useCompanyStore } from '~/stores/company';
import { useCountryStore } from '~/stores/country';
const api = '/api/profiles/';
let user_profile = useState('user_profile');
let avatar_url = useState('avatar_url');
let componentKey = useState('componentKey', () => ref(0));
//console.log('Calling company ##############################################################################---->');
const company = await useCompany(); //Calling composables
//console.log('company.data._rawValue = ', JSON.stringify(company.data._rawValue)); //Debug code
if (company.data._rawValue.length > 0) useCompanyStore().updateCompany(company.data._rawValue[0]);

//console.log('Organization = ', useCompanyStore().organization); //Debug code

//console.log('ADDRESS=', isObject(useCompanyStore().organization.address));

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------

const progress = ref(false);
const data = ref({});

//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on('evtUploadSuccess', (data) => {
  let attributes = {};
  attributes.logo_url = data.url;
  attributes.logo_metadata = data;
  //upsertTenant(attributes, 'upload');
  //progress.value = false;
});

//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------

const { data: profile } = await useAsyncData('profile' + Math.random, () =>
  //Customized query string as compared to supabase/PostgREST convention to retrieve only the required fields
  // If you want all fields then replace it with "*"
  $fetch(api + useSupabaseUser().value.id + '?email,first_name,last_name,avatar_url', {
    initialCache: false,
    method: 'get',
    onResponse({ request, response, options }) {},
  })
);

useState('avatar_url').value = profile.value[0].avatar_url
useState('user_profile').value = useOmit(profile.value[0], 'avatar_url');
//useState('user_profile').value = profile.value[0];

useState('componentKey').value += 1;

const stats = [
  {
    hidden: false,
    title: 'Username',
    description: '',
    value: useSupabaseUser().value.email,
    icon: 'icon-park-twotone:avatar',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    links: [
      {
        title: 'Profile',
        clickEvent: 'evtUpsertProfile',
      },
      {
        title: 'Change Password',
        clickEvent: 'evtChangePassword',
      },
    ],
  },
  {
    hidden: false,
    title: 'Role',
    description: '',
    value: useCapitalize(useSupabaseUser().value.role),
    icon: 'icon-park-twotone:id-card-h',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    links: [
      {
        title: '',
        clickEvent: 'noops',
      },
      {
        title: '',
        clickEvent: 'noops',
      },
    ],
  },
  {
    hidden: false,
    title: 'Member Since',
    description: '',
    value: useNuxtApp().$dayjs(useSupabaseUser().value.created_at).format('DD-MMM-YYYY'),
    icon: 'icon-park-twotone:calendar',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    links: [
      {
        title: '',
        clickEvent: 'noops',
      },
      {
        title: '',
        clickEvent: 'noops',
      },
    ],
  },
];
</script>
