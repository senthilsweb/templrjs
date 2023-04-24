<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <TransitionRoot as="template" :show="isCompanyFormOpen">
    <Dialog as="div" class="relative z-10">
      <div class="fixed inset-0" />
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <form name="frmCompany" id="frmCompany" class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" @submit.prevent="saveCompanyForm">
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="bg-primary-700 py-6 px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-medium text-white">{{ form_title ? form_title : 'Company' }} </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="isCompanyFormOpen = false">
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-primary-300">{{ form_description ? form_description : 'Find out how we can help you?' }}</p>
                      </div>
                    </div>
                    <!--Progress bar (start)-->
                    <div v-if="progress" class="z-50 h-full overflow-hidden flex flex-col items-center justify-center">
                      <div class="loader animate-ping text-indigo-900 ease-linear rounded-full border-4 border-t-4 border-primary-900 h-12 w-12 mb-4"></div>
                    </div>
                    <!--Progress bar (end)-->
                    <!--Form Body (start)-->
                    <div v-if="!progress" class="flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">
                          <div class="sm:col-span-6">
                            <label for="company_name" class="block text-sm font-medium text-gray-700"> Company name </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.company_name" type="text" id="company_name" name="company_name" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <label for="company_website" class="block text-sm font-medium text-gray-700"> Website name </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.company_website" type="text" id="company_website" name="company_website" autocomplete="company_website" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <label for="company_email" class="block text-sm font-medium text-gray-700"> Email </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.company_email" type="text" id="company_email" name="company_email" autocomplete="company_email" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <label for="company_phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div class="mt-1 relative">
                              <!--<div class="pl-40">-->
                              <input v-model="data.phone_number" type="text" name="company_phone_number" id="company_phone_number" autocomplete="company_phone_number" class="py-3 px-4 block w-full pl-5 focus:ring-green-500 focus:border-green-500 border-gray-300" placeholder="(+1) 123-123-1234" />
                              <!--</div>-->
                            </div>
                          </div>
                           <div class="sm:col-span-6">
                            <h2 class="font-medium text-primary-700">Incorporation Information</h2>
                          </div>
                          <div class="sm:col-span-6">
                            <Dropdownlist :data="{ data: useCountryStore().list_all('') }" v-on:change="handleSelectedInCompanyForm_country_of_incorporation" show_label="true" v-model="data.country_of_incorporation" name="country_of_incorporation" label="Country Of Incorporation" :selected_value="data.country_of_incorporation" />
                          </div>
                          <div class="sm:col-span-6">
                            <label for="date_of_incorporation" class="block text-sm font-medium text-gray-700"> Date Of Incorporation </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.date_of_incorporation" type="text" id="date_of_incorporation" name="date_of_incorporation" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <label for="tin_ein_number" class="block text-sm font-medium text-gray-700"> TIN/EIN #. </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.tin_ein_number" type="text" id="tin_ein_number" name="tin_ein_number" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <h2 class="font-medium text-primary-700">Primary Address/Corporate Headquarters</h2>
                          </div>
                          <div class="sm:col-span-6">
                            <label for="address" class="block text-sm font-medium text-gray-700">Street</label>
                            <div class="mt-1">
                              <input type="text" id="street" name="street" v-model="data.address.street" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                            </div>
                          </div>

                          <div class="sm:col-span-6">
                            <label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
                            <div class="mt-1">
                              <input type="text" id="apartment" name="apartment" v-model="data.address.apartment" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                            </div>
                          </div>

                          <div class="sm:col-span-6">
                            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                            <div class="mt-1">
                              <input type="text" id="city" name="city" v-model="data.address.city" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                            </div>
                          </div>

                          <div class="sm:col-span-3">
                            <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                            <div class="mt-1">
                              <input type="text" id="state" name="state" v-model="data.address.state" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                            </div>
                          </div>

                          <div class="sm:col-span-3">
                            <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
                            <div class="mt-1">
                              <input type="text" id="postal_code" name="postal_code" v-model="data.address.postal_code" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <Dropdownlist :data="{ data: useCountryStore().list_all('') }" v-on:change="handleSelectedInCompanyForm_country" show_label="true" v-model="data.address.country" name="country" label="Country" :selected_value="data.address.country" />
                          </div>
                          <input type="hidden" name="country_name" id="country_name" v-model="data.address.country_name" />
                        </div>
                      </div>
                    </div>
                    <!--Form Body (end)-->
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4 gap-x-2">
                    <button type="reset" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Reset</button>
                    <button v-on:click="saveCompanyForm"  type="submit" class="zyn-button">Save</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<!--Server and client side javascript-->
<script setup>
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useCountryStore } from '~/stores/country';
import { useCompanyStore } from "~/stores/company";
import { v4 as uuidv4 } from 'uuid';


//-----------------------------------------------------------------------------------------------------
//2. Page or component properties
//-----------------------------------------------------------------------------------------------------
const props = defineProps({
  form_title: {
    type: String,
    required: true,
  },
  form_description: {
    type: String,
    required: true,
  },
});

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------
const isCompanyFormOpen = ref(false);
const progress = ref(false);
const data = ref({});
data.value.address = {};

//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------

// use Pinia store:
if(useCompanyStore().organization)
  data.value = useCompanyStore().organization;

//console.log("company", JSON.stringify(store.company))

//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on('evtCompanyForm', (data) => {
  isCompanyFormOpen.value = !isCompanyFormOpen.value;
  progress.value = false;
});

//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------

function handleSelectedInCompanyForm_country(e) {
  data.value.address.country = e.target.value;
  data.value.address.country_name = e.target.options[e.target.selectedIndex].text;
}

function handleSelectedInCompanyForm_country_of_incorporation(e) {
  alert(e.target.value)
  data.value.country_of_incorporation = e.target.value;
  //data.value.country_of_incorporation = e.target.options[e.target.selectedIndex].text;
}
//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------
async function saveCompanyForm(args) {
  //useNuxtApp().$bus.$emit('evtCompanyFormSubmit', data.value);

  try {
    // Validate form data
    /*if (!modelValidate(data.value)) {
			//Show user friendly error message 
			useNuxtApp().$toast.show({
				type: "error",
				message: "Please fill all required inputs",
				timeout: 10,
			});
			return
		}*/

    progress.value = true;
    //attach tenant into the payload (Required for SaaS)
    //data.value = args;
    data.value.tenant = 'www.xycc-company.com'; //todo: dynamic get from settings
    data.value.updated_at = useNuxtApp().$dayjs().utc();

    //data.value.logo_url = args.url
    //data.value.logo_metadata = args

    if (useCompanyStore().organization==undefined) {
      //Insert
      data.value.created_at = useNuxtApp().$dayjs().utc();
      data.value.code = uuidv4()
      await useFetch('/api/company/' + 'create', {
        method: 'post',
        body: data.value,
        initialCache: false,
        onResponse({ request, response, options }) {
          if (response._data) {
            if (response._data[0].code) {
              useCompanyStore().updateCompany(response._data[0]) 
              useNuxtApp().$toast.show({ type: 'success', message: `Record added successfully`, timeout: 6 });
            } else {
              useNuxtApp().$toast.show({ type: 'danger', message: `Failure during insert`, timeout: 6 });
            }
          }
          progress.value = false;
        },
      });
    } else {
      //Update
      await useFetch('/api/company/' + useCompanyStore().organization.id, {
        method: 'put',
        body: data.value, //omit the mongo object id before the upsert
        onResponse({ request, response, options }) {
          if (response._data) {
             console.log("response._data=" + JSON.stringify(response._data))
            if (response._data[0].code) {
              
              useCompanyStore().updateCompany(response._data) 
              useNuxtApp().$toast.show({ type: 'success', message: `Record updated successfully`, timeout: 6 });
            } else {
              useNuxtApp().$toast.show({ type: 'danger', message: `Failure during update`, timeout: 6 });
            }
          }
          if (module == 'upload') {
            store.updateLogoUrl(args.logo_url);
            //store.updateLogoMetadata(args.logo_metadata);
          }
          progress.value = false;
        },
      });
    }
  } catch (error) {
    //Show user friendly error message
    useNuxtApp().$toast.show({
      type: 'error',
      message: `Oops!... Something went wrong....<br/>[${error.message}]`,
      timeout: 6,
    });
    //reset progress
    progress.value = false;
  } finally {
  }
}

function modelValidate(args) {}
</script>
