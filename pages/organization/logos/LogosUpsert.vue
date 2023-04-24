<template>
  <section v-if="isUpsertLogoVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-primary-700 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-white">Logos</h2>
                  <div class="h-7 flex items-center">
                    <button v-on:click="isUpsertLogoVisible = false" aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span class="sr-only">Close panel</span>
                      <Icon name="material-symbols:close" class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-primary-300">Create | Manage brand assets</p>
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
                    <form name="frmLogos" id="frmLogos" class="space-y-8 divide-y divide-gray-200" @submit.prevent="upsertLogo">
                      <div class="sm:overflow-hidden">
                        <div class="bg-white space-y-6">
                          <div class="sm:col-span-6">
                            <Dropdownlist :data="{ data: usePropertiesStore().parent_properties }" v-on:change="handleSelectedInProperties_Parent" show_label="true" v-model="data.parent_code" name="parent_code" label="Parent code" :selected_value="data.parent_code" readonly />
                            <p class="mt-1 text-xs text-gray-500">Preconfigured parent code assigned for all brand-assets</p>
                          </div>
                           <div class="sm:col-span-6">
                              <label for="code" class="block text-sm font-medium text-gray-700">Code</label>
                              <div class="mt-1">
                                <input type="text" id="code" name="code" v-model="data.code" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                                <p class="mt-1 text-xs text-gray-500">Must be an unique string within the Parent Code.</p>
                              </div>
                            </div>
                          <div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                              <div class="mt-2 sm:col-span-2 sm:mt-0">
                                <div class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                  <div class="space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                      <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" @change="handleFileSelectionInUploaderForm($event)" class="sr-only" />
                                      </label>
                                      <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="file_name" class="block text-sm font-medium text-gray-700">File Name</label>
                              <div class="mt-1">
                                <input type="text" id="file_name" name="file_name" v-model="data.file_name" class="block w-full pl-5 focus:ring-primary-600 focus:border-primary-600 border-gray-300" />
                                <p class="mt-1 text-xs text-gray-500">Auto assign from uploaded file name which can be modified to any name of your choice.</p>
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="metadata" class="block text-sm font-medium text-gray-700">Metadata</label>
                              <textarea v-model="data.metadata" id="metadata" name="metadata" rows="3" class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300"></textarea>
                              <p class="mt-1 text-xs text-gray-500">Any additional data in JSON format.</p>
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
                <button v-on:click="useNuxtApp().$bus.$emit('evtDeleteLogo', data)" type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="upsertLogo" type="submit" class="zyn-button">Save</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';

const data = ref({ parent_code: 'logo' });
const files = ref([]);
const progress = ref(false);
const isUpsertLogoVisible = ref(false);
const isDeleteButtonVisible = ref(false);
const api = '/api/upload/logo/';

//----------------------------------------------------------------------------------------------
// 1) Page level initiation
//----------------------------------------------------------------------------------------------

useNuxtApp().$bus.$on('evtUpsertLogo', (args) => {
  isUpsertLogoVisible.value = !isUpsertLogoVisible.value;
  if (args !== undefined) {
    //getLogo(args._cells[1].data);
  }
});
useNuxtApp().$bus.$on('evtDeleteLogo', (data) => {
  //deleteLogo(data._cells[0].data);
});


//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------

function handleSelectedInProperties_Parent(e) {
  data.value.parent_code = e.target.value;
}

//-----------------------------------------------------------------------------------------------------
/*
function to handle file selection in uploader form. This function is called when user selects a file in uploader form
and it will push the selected file to files array. It can accept multiple files however we are only accepting one file at a time.
*/
const handleFileSelectionInUploaderForm = (event) => {
  let uploadedFiles = event.target.files;
  for (let i = 0; i < uploadedFiles.length; i++) {
    files.value.push(uploadedFiles[i]); //
  }

  data.value.file_name = files.value[0].name;
};

//----------------------------------------------------------------------------------------------
// 2) Get
//----------------------------------------------------------------------------------------------
async function getLogo(code) {
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
</script>
