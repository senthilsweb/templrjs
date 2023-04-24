<template>
  <section v-if="isUpsertPropertiesVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-primary-700 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-white">Properties</h2>
                  <div class="h-7 flex items-center">
                    <button v-on:click="isUpsertPropertiesVisible = false" aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span class="sr-only">Close panel</span>
                      <Icon name="material-symbols:close" class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-primary-300">Manage custom properties used as configuration varables</p>
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
                    <form name="frmProperties" id="frmProperties" class="space-y-8 divide-y divide-gray-200" @submit.prevent="upsertProperties">
                      <div class="sm:overflow-hidden">
                        <div class="bg-white space-y-6">
                          <div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: propertiesStore.parent_properties }" v-on:change="handleSelectedInProperties_Parent" show_label="true" v-model="data.parent_code" name="parent_code" label="Parent" :selected_value="data.parent_code" />
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Code</label>
                              <div class="mt-1">
                                <input :readonly="data.id" type="text" id="code" name="code" v-model="data.code" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" :class="[data.id ? 'bg-gray-100' : '']" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                              <div class="mt-1">
                                <input type="text" id="name" name="name" v-model="data.name" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                              <textarea v-model="data.description" id="description" name="description" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"></textarea>
                            </div>
                            <div class="sm:col-span-3 mt-1">
                              <label for="is_active" class="block text-sm font-medium text-gray-700">Is-active?</label>
                            </div>
                            <div class="sm:col-span-3">
                              <div class="mt-1">
                                <Switch id="is_active" name="is_active" v-model="data.is_active" :class="data.is_active ? 'bg-primary-800' : 'bg-primary-500'" class="relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <span class="sr-only">Is-active?</span>
                                  <span aria-hidden="true" :class="data.is_active ? 'translate-x-9' : 'translate-x-0'" class="pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                </Switch>
                              </div>
                            </div>
                            <div class="sm:col-span-3 mt-1">
                              <label for="is_archived" class="block text-sm font-medium text-gray-700">Is-archived?</label>
                            </div>
                            <div class="sm:col-span-3">
                              <div class="mt-1">
                                <Switch id="is_archived" name="is_archived" v-model="data.is_archived" :class="data.is_archived ? 'bg-primary-800' : 'bg-primary-500'" class="relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <span class="sr-only">Is-archived?</span>
                                  <span aria-hidden="true" :class="data.is_archived ? 'translate-x-9' : 'translate-x-0'" class="pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                </Switch>
                              </div>
                            </div>
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
                <button v-on:click="useNuxtApp().$bus.$emit('evtDeleteProperties', data)" type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="upsertProperties" type="submit" class="zyn-button">Save</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Switch } from '@headlessui/vue';
import { usePropertiesStore } from '~/stores/properties';
const data = ref({ is_active: true, is_archived: false });
const progress = ref(false);
const isUpsertPropertiesVisible = ref(false);
const isDeleteButtonVisible = ref(false);
const api = '/api/properties/';
// use Pinia store:
const propertiesStore = usePropertiesStore();

//----------------------------------------------------------------------------------------------
// 1) Page level initiation
//----------------------------------------------------------------------------------------------

/* */
useNuxtApp().$bus.$on('evtUpsertProperties', (args) => {
  isUpsertPropertiesVisible.value = !isUpsertPropertiesVisible.value;
  if (args !== undefined) {
    getProperties(args._cells[0].data);
  } else {
    data.value = { is_active: true, is_archived: false };
  }
});
useNuxtApp().$bus.$on('evtDeleteProperties', (data) => {
  deleteProperties(data._cells[0].data);
});

function handleSelectedInProperties_Parent(e) {
  data.value.parent_code = e.target.value;
}
//----------------------------------------------------------------------------------------------
// 2) Get
//----------------------------------------------------------------------------------------------
async function getProperties(id) {
  progress.value = true;
  useFetch(api + id, {
    method: 'get',
    initialCache: false,
    onResponse({ request, response, options }) {
      data.value = response._data[0];
      progress.value = false;
    },
  });
}
// 3) Save
async function upsertProperties() {
  try {
    progress.value = true;
    if (!data.value.id) {
      await useFetch('/api/properties/create', {
        method: 'post',
        body: data.value,
        initialCache: false,
        onResponse({ request, response, options }) {
          if (response._data) {
            if (!response._data.code) {
              useNuxtApp().$toast.show({ type: 'success', message: `Record added successfully`, timeout: 6 });
              reloadPropertiesStore();
            } else {
              useNuxtApp().$toast.show({ type: 'danger', message: `Failure during insert`, timeout: 6 });
            }
          }
        },
      });
    } else {
      await useFetch('/api/properties/' + data.value.id, {
        method: 'put',
        body: _.omit(data.value, 'id'),
        initialCache: false,
        onResponse({ request, response, options }) {
          if (response._data) {
            if (!response._data.code) {
              useNuxtApp().$toast.show({ type: 'success', message: `Record updated successfully`, timeout: 6 });
              reloadPropertiesStore();
            } else {
              useNuxtApp().$toast.show({ type: 'danger', message: `Failure during update`, timeout: 6 });
            }
          }
        },
      });
    }
    progress.value = false;
    useNuxtApp().$bus.$emit('evtSearchProperties');
    data.value = { is_active: true, is_archived: false };
    isUpsertPropertiesVisible.value = !isUpsertPropertiesVisible.value;
  } catch (error) {
    console.log(error);
    progress.value = false;
  } finally {
  }
}
// 3) Delete
async function deleteProperties(id) {
  try {
    await useFetch(api + id, {
      method: 'delete',
      body: {},
      initialCache: false,
      onResponse({ request, response, options }) {
        if (response.status == 204) {
          useNuxtApp().$toast.show({ type: 'success', message: 'Delete was successful', timeout: 6 });
          useNuxtApp().$bus.$emit('evtSearchProperties');
          data.value = { is_active: true, is_archived: false };
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
//4)
async function reloadPropertiesStore() {
  const properties = await useProperties();
  propertiesStore.reloadProperties(properties.data._rawValue);
}
</script>
