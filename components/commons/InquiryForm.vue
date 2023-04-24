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
  <TransitionRoot as="template" :show="isInquiryFormOpen">
    <Dialog as="div" class="relative z-10">
      <div class="fixed inset-0" />
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" @submit.prevent="saveInquiryForm">
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 py-6 px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-medium text-white">{{ form_title ? form_title : 'Contact us' }} </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="isInquiryFormOpen = false">
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
                          <div class="sm:col-span-3">
                            <label for="name" class="block text-sm font-medium text-gray-700">Fullname </label>
                            <div class="mt-1">
                              <input v-model="data.name" type="text" name="name" id="name" autocomplete="name" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                            </div>
                          </div>
                          <!--<div class="sm:col-span-6">
                            <label for="company" class="block text-sm font-medium text-gray-700"> Company name </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.company" type="text" id="company" name="company" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>-->
                          <div class="sm:col-span-6">
                            <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>
                            <div class="mt-1 rounded-md shadow-sm">
                              <input v-model="data.email" type="text" id="email" name="email" autocomplete="name" class="py-3 px-4 flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 sm:text-sm border-gray-300" />
                            </div>
                          </div>
                          <div class="sm:col-span-6">
                            <label for="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div class="mt-1 relative">
                              <!--<div class="pl-40">-->
                              <input v-model="data.phone_number" type="text" name="phone_number" id="phone_number" autocomplete="tel" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" placeholder="(+1) 123-123-1234" />
                              <!--</div>-->
                            </div>
                          </div>

                          <div class="sm:col-span-6">
                            <Dropdownlist :data="{ data: usePropertiesStore().properties_by_parent_code('pick-list-inquiry-reason') }" v-on:change="handleSelectedInInquiry_Reason" show_label="true" v-model="data.inquiry_reason" name="inquiry_reason" label="Reason for enquiry" :selected_value="data.inquiry_reason" />
                          </div>
                          <div class="sm:col-span-6">
                            <label for="description" class="block text-sm font-medium text-gray-700"> How we can help you? </label>
                            <div class="mt-1">
                              <textarea v-model="data.description" id="description" name="description" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"></textarea>
                            </div>
                            <p class="mt-2 text-sm text-gray-500">Tell us your requirements in few lines.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--Form Body (end)-->
                  </div>
                  <div class="flex flex-shrink-0 justify-end px-4 py-4">
                    <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" @click="isInquiryFormOpen = false">Cancel</button>
                    <button type="submit" class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Submit</button>
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
import { usePropertiesStore } from '~/stores/properties';
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

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
const isInquiryFormOpen = ref(false);
const progress = ref(false);
const data = ref({});

//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on('evtInquiryForm', (data) => {
  isInquiryFormOpen.value = !isInquiryFormOpen.value;
  data.value = {};
  progress.value = false;
});

//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------

function handleSelectedInInquiry_Reason(e) {
  data.value.inquiry_reason = e.target.value;
}

//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------
async function saveInquiryForm(args) {
  try {
    // Validate form data
    if (!modelValidate(data.value)) {
      //Show user friendly error message
      useNuxtApp().$toast.show({
        type: 'error',
        message: 'Please fill all required inputs',
        timeout: 10,
      });
      return;
    }
    progress.value = true;
    
    //attach tenant into the payload (Required for SaaS)
    data.value.tenant = 'www.xyz-company.com'; //todo: dynamic get from settings

    //Send to server
    await useFetch('/api/inquiries/create', {
      method: 'post',
      body: data.value,
      initialCache: false,
      onResponse({ request, response, options }) {
        if (response._data) {
          if (!response._data.code) {
            useNuxtApp().$toast.show({ type: 'success', message: `Thank you for your inquiry, one of our associate will contact you soon`, timeout: 6 });
            data.value = {};
            isInquiryFormOpen.value = !isInquiryFormOpen.value;
          } else {
            useNuxtApp().$toast.show({ type: 'danger', message: `Failure during inquiry save`, timeout: 6 });
          }
          progress.value = false;
        }
      },
    });
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



function modelValidate(args) {
  let name = data.value.name != undefined && data.value.name != '';
  let phone_number = data.value.phone_number != undefined && data.value.phone_number != '';
  let email = data.value.email != undefined && data.value.email != '';
  let description = data.value.description != undefined && data.value.description != '';
  //console.log('name && phone_number && email && description', name && phone_number && email && description);
  return name && phone_number && email && description;
}
</script>
