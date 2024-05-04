<!--
  author: zynobot
  created_at: 13-Feb-2023
  modified_at: 13-Feb-2023
  description: This component is used to create and update [Users] entity.
  It is used in the following pages:
  - pages/Users/index.vue
-->
<template>
  <section v-if="isUpsertUserVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-gray-200 bg-opacity-50 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-gray-700">Users</h2>
                  <div class="h-7 flex items-center">
                    <button v-on:click="isUpsertUserVisible = false" aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-gray-500">Manage...</p>
                </div>
              </header>
              <!--Progress bar (start)-->
              <div v-if="progress" class="flex-1 flex flex-col justify-between">
                <div class="space-y-6 pt-6 pb-5">
                  <div class="flex justify-center">
                    <span class="inline-flex">
                      <button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600">
                        <svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <!--Progress bar (end)-->
              <div v-if="!progress" class="flex-1 flex flex-col justify-between">
                <div class="px-4 divide-y divide-gray-200 sm:px-6">
                  <div class="space-y-6 pt-6 pb-5">
                    <form name="frmUsers" id="frmUsers" class="space-y-8 divide-y divide-gray-200" @submit.prevent="upsertUser">
                      <div class="sm:overflow-hidden">
                        <div class="bg-white space-y-6">
                          <!--User Card (Start)-->
                          <div class="sm:col-span-6">
                            <div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                              <template v-if="data.avatar_url">
                                <img class="aspect-[3/2] w-full rounded-2xl object-cover" :src="data.avatar_url" :alt="data.last_name + ' ' + data.first_name" />
                              </template>
                              <template v-else>
                                <img class="aspect-[3/2] w-full rounded-2xl object-cover" src="https://via.placeholder.com/100.png" alt="Placeholder image" />
                              </template>
                              <div v-if="data.first_name" class="sm:col-span-2">
                                <div class="space-y-1 text-lg font-medium leading-6">
                                  <h3 class="text-lg font-semibold text-gray-900">{{ data.last_name + ',' + data.first_name }}</h3>
                                  <p class="text-base leading-7 text-gray-600">System Analyst</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--User Card (End)-->
                          <div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                            <!--Form controls created thru automation (start)-->

                            <div class="sm:col-span-6">
                              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                              <div class="mt-1">
                                <input type="text" id="email" name="email" v-model="data.email" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
                              <div class="mt-1">
                                <input type="text" id="first_name" name="first_name" v-model="data.first_name" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
                              <div class="mt-1">
                                <input type="text" id="last_name" name="last_name" v-model="data.last_name" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>

                            <!--Form controls created thru automation (end)-->

                            <!--Standard Form controls (start)-->
                            <!--Nil-->
                            <!--Standard Form controls (end)-->
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
              </span>
              <span v-if="isDeleteButtonVisible" class="inline-flex rounded-md shadow-sm">
                <button v-on:click="useNuxtApp().$bus.$emit('evtDeleteUser', data)" type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="upsertUser" type="submit" class="zyn-button">Save</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<!--Server and client side javascript-->
<script setup>
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------

import { usePropertiesStore } from '~/stores/properties';

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------
const data = ref({});
const progress = ref(false);
const isUpsertUserVisible = ref(false);
const isDeleteButtonVisible = ref(false);
const api = '/api/profiles/';
//-----------------------------------------------------------------------------------------------------
//3. Page or component properties
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//4. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//5. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
//Subscribe to upsert panel visiblity and get the selected value from the backend
useNuxtApp().$bus.$on('evtUpsertUser', (args) => {
  //alert(args._cells[0].data)
  isUpsertUserVisible.value = !isUpsertUserVisible.value;
  getUser(args._cells[0].data);
});

//Subscribe to delete button click
useNuxtApp().$bus.$on('evtDeleteUser', (data) => {
  deleteUser(data._cells[0].data);
});

//-----------------------------------------------------------------------------------------------------
//6. Page level events handlers
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//7. Page level action methods
//-----------------------------------------------------------------------------------------------------

// 7.1) Get value from backend

async function getUser(id) {
  progress.value = true;
  useFetch(api + id + '?*', {
    method: 'get',
    initialCache: false,
    onResponse({ request, response, options }) {
      data.value = response._data[0];
      //console.log('data.value=', JSON.stringify(data.value));
      progress.value = false;
    },
  });
}

// 7.2) Save or update => Upsert
//----------------------------------------------------------------------------------------------
async function upsertUser() {
  try {
    progress.value = true;
    await useFetch(api + data.value.id, {
      method: 'put',
      body: data.value,
      initialCache: false,
      onResponse({ request, response, options }) {
        if (response._data) {
          //console.log('response._data=', JSON.stringify(response._data));
          useNuxtApp().$toast.show({ type: 'success', message: `Record updated successfully`, timeout: 6 });
         useNuxtApp().$bus.$emit('evtSearchUsers');
        } else {
          useNuxtApp().$toast.show({ type: 'danger', message: `Failure during update`, timeout: 6 });
        }
      },
    });

    progress.value = false;
    //useNuxtApp().$bus.$emit('evtSearchUsers');
    data.value = {};
    isUpsertUserVisible.value = !isUpsertUserVisible.value;
  } catch (error) {
    console.log(error);
    progress.value = false;
  } finally {
  }
}

// 7.3) Delete selected value after confirmation

async function deleteUser(id) {
  try {
    await useFetch(api + id, {
      method: 'delete',
      body: {},
      initialCache: false,
      onResponse({ request, response, options }) {
        //console.log('response._data=' + JSON.stringify(response._data));
        if (response._data.status == 200) {
          useNuxtApp().$toast.show({ type: 'success', message: `Delete [${response._data.data[0].email}] was successful`, timeout: 6 });
          useNuxtApp().$bus.$emit('evtSearchUsers');
          data.value = {};
        } else {
          useNuxtApp().$toast.show({ type: 'danger', message: 'Failure during delete', timeout: 6 });
        }
      },
    });
  } catch (error) {
    //TODO
  } finally {
    //TODO
  }
}

//-----------------------------------------------------------------------------------------------------
//8. Form validations
//-----------------------------------------------------------------------------------------------------`

// Required field validations for all fields listed in this page
async function validate() {}
</script>
