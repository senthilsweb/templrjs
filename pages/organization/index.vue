<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
       
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
              <CommonsSecondaryNav title="Organization" api_end_point="/_navigation/organization" />
              <!-- Secondary sidebar (End)-->
              <div class="flex-1 xl:overflow-y-auto">
                <OrganizationPageHeader heading="Company" showbutton="true" guide="Company details" addClickEvent="evtCompanyForm" />
                <!-- Main content body (start)-->
                <div class="mx-auto max-w-5xl">
                  <!-- Main Body Content (start)-->
                  <!-- Stat (start)-->
                  <div class="pb-4">
                    <TemplrJSStatsSimple :data="stats" />
                  </div>
                  <!-- Stat (End)-->
                  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <!-- body content # 1 (Start)-->
                    <TemplrJSDynamicDataDisplay title="Basic Information" title_description="General details of the company" :data="useCompanyStore().basic_details" />
                    <!-- body content # 1 (End)-->
                    <!-- body content # 2 (Start)-->
                    <TemplrJSDynamicDataDisplay title="Address" title_description="Primary address / Corporate Headquarters" :data="useCompanyStore().primary_address_formatted" />
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
  <CommonsCompanyForm form_title="Company" form_description="Company details" />
</template>
<!--Server and client side javascript-->
<script setup>
import OrganizationPageHeader from '@/pages/organization/OrganizationPageHeader.vue';
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
const config = useRuntimeConfig();

definePageMeta({
  layout: 'admin',
  //middleware: ['auth'],
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

async function upsertTenant(args, module) {}

const stats = [
  {
    hidden: false,
    title: 'Date Of Incorporation',
    description: '',
    value: useNuxtApp().$dayjs(useCompanyStore().incorporation.date_of_incorporation).format('DD-MMM-YYYY'),
    icon: 'icon-park-twotone:calendar',
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    hidden: false,
    title: 'Country Of Incorporation',
    description: '',
    value: useCountryStore().country_by_code(useCompanyStore().incorporation.country_of_incorporation),
    icon: 'icon-park-twotone:globe',
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    hidden: false,
    title: 'EIN/TIN #',
    description: '',
    value: useCompanyStore().incorporation.tin_ein_number,
    icon: 'icon-park-twotone:bank-card',
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
];
</script>
