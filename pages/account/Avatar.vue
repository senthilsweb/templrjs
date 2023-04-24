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
  <div :show="isUploaderFormOpen" class="space-y-8 divide-y divide-gray sm:space-y-5">
    <div class="mt-5 md:col-span-2 md:mt-0">
      <form @submit.prevent="saveUploaderForm">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
              <!--<label class="block text-sm font-medium text-gray-700">Photo</label>-->
              <div class="relative hidden overflow-hidden lg:block">
                <img class="aspect-[4/5] w-52 h-52 flex-none rounded-2xl object-cover" :src="props.image_src ? props.image_src : 'https://via.placeholder.com/100.png'" alt="" :key="componentKey" />
                <label for="desktop-user-photo" class="absolute inset-0 flex w-52 h-52 rounded-2xl items-center justify-center bg-gray-700 bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                  <span class="text-white">Change</span>
                  <span class="sr-only">user photo</span>
                  <input type="file" id="desktop-user-photo" @change="handleFileSelectionInUploaderForm($event)" class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
                </label>
              </div>
            </div>
            <!--use this for multiple file uploader (start)-->
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700">Cover photo</label>
              <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" multiple @change="handleFileSelectionInUploaderForm($event)" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <!--use this for multiple file uploader (end)-->
          </div>
          <div class="flex flex-shrink-0 justify-end gap-x-4 px-4 py-4">
            <p v-if="avatar_image_changed == true" class="text-sm leading-5 text-gray-400 text-center">{{ files[0].name }}</p>
            <button type="submit" class="zyn-button" :class="[!avatar_image_changed ? 'disabled:opacity-75' : '']" :disabled="!avatar_image_changed">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<!--Server and client side javascript-->
<script setup>
import { encode } from 'base64-arraybuffer';
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

//-----------------------------------------------------------------------------------------------------
//2. Page or component properties
//-----------------------------------------------------------------------------------------------------
const props = defineProps({
  image_src: {
    type: String,
  },
});

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------
const isUploaderFormOpen = ref(true);
const progress = ref(false);
const data = ref({});
const files = ref([]);
const avatar_image_changed = ref(false);
const componentKey = ref(0);

//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on('evtUploaderForm', (data) => {
  //isUploaderFormOpen.value = !isUploaderFormOpen.value;
  progress.value = false;
});

//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------

const handleFileSelectionInUploaderForm = (event) => {
  avatar_image_changed.value = true;

  let uploadedFiles = event.target.files;
  //console.log(event.target.files);
  for (let i = 0; i < uploadedFiles.length; i++) {
    files.value.push(uploadedFiles[i]); //
  }

  //console.log("Avatar = " + files.value[0].name)
  //console.log("Avatar path= " + files.value[0].mozFullPath)
};

//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------
async function saveUploaderForm(args) {
  //alert("saveUploaderForm" + args);
  //return
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
    data.value.tenant = 'www.xycc-company.com'; //todo: dynamic get from settings

    //Prepare file upload

    let image = files.value[0];
    const buffer = await image.arrayBuffer();
    let byteArray = new Int8Array(buffer);
    data.value.fileData = encode(byteArray);
    //console.log(data.value.fileData);
    data.value.fileName = files.value[0].name;
    data.value.id = useSupabaseUser().value.id;

    //Send to server
    await useFetch('/api/upload/avatar', {
      method: 'post',
      body: data.value,
      onResponse({ request, response, options }) {
        console.log(JSON.stringify(response));
        if (response._data.status == 200) {
          useNuxtApp().$toast.show({ type: 'success', message: `Upload was successful`, timeout: 6 });
        } else {
          useNuxtApp().$toast.show({ type: 'danger', message: `Oops!... Something went wrong....<br/>[${response._data.message}]`, timeout: 6 });
        }
        progress.value = false;
        avatar_image_changed.value = false;
        files.value = [];
        componentKey.value += 1;
        props.image_src = response._data.avatar_url;
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
  //Insert/update the just uploaded image path
  //upsertTenant(data.value)
  //(async () => { upsertTenant() })
}

function modelValidate(args) {
  return data.value.first_name != undefined && data.value.first_name != '';
}

</script>
