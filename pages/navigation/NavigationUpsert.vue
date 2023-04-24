<template>
  <section v-if="isUpsertNavigationVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-primary-700 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-primary-200">Navigation</h2>
                  <div class="h-7 flex items-center">
                   
                    <button v-on:click="isUpsertNavigationVisible = false" type="button" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-primary-300">Create|View|Manage application level nagations</p>
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
                    <form name="frmNavigation" id="frmNavigation" class="space-y-8 divide-y divide-gray-200" @submit.prevent="upsertNavigation">
                      <div class="sm:overflow-hidden">
                        <div class="bg-white space-y-6">
                          <div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: nav_modules }" v-on:change="handleSelectedInNavigation_nav_modules" show_label="true" v-model="data.nav_module_code" name="nav_module" label="Module" :selected_value="data.nav_module_code" />
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: nav_parents }" v-on:change="handleSelectedInNavigation_Parent" show_label="true" v-model="data.parent_code" name="parent_code" label="Parent" :selected_value="data.parent_code" />
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Code</label>
                              <div class="mt-1">
                                <input :readonly="data.id" type="text" id="code" name="code" v-model="data.code" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" :class="[data.id ? 'bg-gray-100' : '']" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Title</label>
                              <div class="mt-1">
                                <input type="text" id="name" name="name" v-model="data.name" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="sort_order" class="block text-sm font-medium text-gray-700">Sort Order</label>
                              <div class="mt-1">
                                <input type="text" id="sort_order" name="sort_order" v-model="data.sort_order" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                              <textarea v-model="data.description" id="description" name="description" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"></textarea>
                            </div>
                            <div class="sm:col-span-3 mt-1">
                              <label for="is_footer_description" class="block text-sm font-medium text-gray-700">Is-footer description?</label>
                            </div>
                            <div class="sm:col-span-3">
                              <div class="mt-1">
                                <Switch v-model="data.is_footer_description" :class="data.is_footer_description ? 'bg-primary-800' : 'bg-primary-500'" class="relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <span class="sr-only">Is-footer Description?</span>
                                  <span aria-hidden="true" :class="data.is_footer_description ? 'translate-x-9' : 'translate-x-0'" class="pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                </Switch>
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Link</label>
                              <div class="mt-1">
                                <input type="text" id="href" name="href" v-model="data.href" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Icon</label>
                              <div class="mt-1">
                                <input type="text" id="icon" name="icon" v-model="data.icon" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Click Event</label>
                              <div class="mt-1">
                                <input type="text" id="click_event" name="click_event" v-model="data.click_event" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Icon CSS Foreground</label>
                              <div class="mt-1">
                                <input type="text" id="iconforeground" name="iconforeground" v-model="data.iconforeground" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Icon CSS Background</label>
                              <div class="mt-1">
                                <input type="text" id="iconbackground" name="iconbackground" v-model="data.iconbackground" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="css_class" class="block text-sm font-medium text-gray-700">CSS Class</label>
                              <div class="mt-1">
                                <input type="text" id="css_class" name="css_class" v-model="data.css_class" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-3 mt-1">
                              <label for="is_action_button" class="block text-sm font-medium text-gray-700">Is-action button?</label>
                            </div>
                            <div class="sm:col-span-3">
                              <div class="mt-1">
                                <Switch v-model="data.is_action_button" :class="data.is_action_button ? 'bg-primary-800' : 'bg-primary-500'" class="relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <span class="sr-only">Is action button?</span>
                                  <span aria-hidden="true" :class="data.is_action_button ? 'translate-x-9' : 'translate-x-0'" class="pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                                </Switch>
                              </div>
                            </div>
                            <div class="sm:col-span-3 mt-1">
                              <label for="is_active" class="block text-sm font-medium text-gray-700">Is-active?</label>
                            </div>
                            <div class="sm:col-span-3">
                              <div class="mt-1">
                                <Switch v-model="data.is_active" :class="data.is_active ? 'bg-primary-800' : 'bg-primary-500'" class="relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <span class="sr-only">Is-active?</span>
                                  <span aria-hidden="true" :class="data.is_active ? 'translate-x-9' : 'translate-x-0'" class="pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
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
            <!--<div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="saveNavigation" type="submit" class="zyn-button">Save</button>
              </span>
            </div>-->
            <div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
              </span>
              <span v-if="isDeleteButtonVisible" class="inline-flex rounded-md shadow-sm">
                <button v-on:click="useNuxtApp().$bus.$emit('evtDeleteNavigation', data)" type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="upsertNavigation" type="submit" class="zyn-button">Save</button>
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
import { XMarkIcon } from '@heroicons/vue/24/outline';
const data = ref({ is_active: true, is_action_button: false, is_footer_description: false });
const progress = ref(false);
const isUpsertNavigationVisible = ref(false);
const isDeleteButtonVisible = ref(false);
const date = ref(new Date());
const api = '/api/nav/';
const frmNavigation = ref(null);

let parent = useState('parent');

//----------------------------------------------------------------------------------------------
// 1) Page level initiation
//----------------------------------------------------------------------------------------------

/* */
useNuxtApp().$bus.$on('evtUpsertNavigation', (args) => {
  isUpsertNavigationVisible.value = !isUpsertNavigationVisible.value;

  if (args !== undefined) {
    //alert(data._cells[0].data);
    getNavigation(args._cells[0].data);
  } else {
    data.value = { is_active: true, is_action_button: false, is_footer_description: false };
  }
});

useNuxtApp().$bus.$on('evtDeleteNavigation', (data) => {
  deleteNavigation(data._cells[0].data);
});

const { data: nav_parents } = await useAsyncData('navigations-list-' + Math.random, () =>
  $fetch('/api/nav?parent_code=is.null', {
    initialCache: false,
    method: 'get',
  })
);

const { data: nav_modules } = await useAsyncData('navigation-modules-list-' + Math.random, () =>
  $fetch('/api/properties?parent_code=eq.navigation-by-modules', {
    initialCache: false,
    method: 'get',
  })
);

function handleSelectedInNavigation_Parent(e) {
  data.value.parent_code = e.target.value;
}
function handleSelectedInNavigation_nav_modules(e) {
  data.value.nav_module_code = e.target.value;
}

//----------------------------------------------------------------------------------------------
// 2) Get
//----------------------------------------------------------------------------------------------

async function getNavigation(id) {
  progress.value = true;
  let result = useFetch(api + id, {
    method: 'get',
    initialCache: false,
    onResponse({ request, response, options }) {
      //alert(JSON.stringify(response._data));
      //console.log('navigation.value=', response._data);
      data.value = response._data[0];
      progress.value = false;
    },
  });
}
// 3) Save
async function upsertNavigation(fields) {
  try {
    progress.value = true;
    /*
    const body = new FormData();
    fields.logo.forEach((fileItem) => {
      body.append('logo', fileItem.file);
    });
    data.value = fields;
    data.value.createdAt = useNuxtApp().$dayjs().utc();
    data.value.updatedAt = useNuxtApp().$dayjs().utc();
    data.value.tenant = 'www.xycc-company.com'; //todo: dynamic get from settings

    // We can append other data to our form data:
    body.append('attributes', data.value);
*/
    //console.log(JSON.stringify(data.value));

    if (!data.value.id) {
      await useFetch('/api/nav/create', {
        method: 'post',
        body: data.value,
        initialCache: false,
        onResponse({ request, response, options }) {
          if (response._data) {
            if (!response._data.code) {
              useNuxtApp().$toast.show({ type: 'success', message: `Record added successfully`, timeout: 6 });
            } else {
              useNuxtApp().$toast.show({ type: 'danger', message: `Failure during insert`, timeout: 6 });
            }
          }
        },
      });
    } else {
      await useFetch('/api/nav/' + data.value.id, {
        method: 'put',
        body: _.omit(data.value, 'id'),
        initialCache: false,
        onResponse({ request, response, options }) {
          if (response._data) {
            if (!response._data.code) {
              useNuxtApp().$toast.show({ type: 'success', message: `Record updated successfully`, timeout: 6 });
            } else {
              useNuxtApp().$toast.show({ type: 'danger', message: `Failure during update`, timeout: 6 });
            }
          }
        },
      });
    }
    progress.value = false;
    useNuxtApp().$bus.$emit('evtSearchNavigation');
    data.value = { is_active: true, is_action_button: false, is_footer_description: false };
    isUpsertNavigationVisible.value = !isUpsertNavigationVisible.value;
  } catch (error) {
    console.log(error);
    progress.value = false;
  } finally {
  }
}
// 3) Delete
async function deleteNavigation(id) {
  try {
    await useFetch(api + id, {
      method: 'delete',
      body: {},
      initialCache: false,
      onResponse({ request, response, options }) {
        if (response.status == 204) {
          useNuxtApp().$toast.show({ type: 'success', message: 'Delete was successful', timeout: 6 });
          useNuxtApp().$bus.$emit('evtSearchNavigation');
          data.value = { is_active: true, is_action_button: false, is_footer_description: false };
        } else {
          useNuxtApp().$toast.show({ type: 'danger', message: 'The delete failed...', timeout: 6 });
        }
      },
    });
  } catch (error) {
    //TODO
  } finally {
    //TODO
  }
}
</script>
