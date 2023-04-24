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
	<TransitionRoot as="template" :show="isUploaderFormOpen">
		<div class="space-y-8 divide-y divide-gray sm:space-y-5">
			<div class="px-4 sm:px-4 lg:px-4">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="mt-5 md:col-span-2 md:mt-0">
						<TransitionChild as="template"
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enter-from="translate-x-full" enter-to="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leave-from="translate-x-0" leave-to="translate-x-full">

							<form @submit.prevent="saveUploaderForm">
								<div class="shadow sm:overflow-hidden sm:rounded-md">
									<div class="space-y-6 bg-white px-4 py-5 sm:p-6">
										<div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
											<label class="block text-sm font-medium text-gray-700">Photo</label>
											<div class="relative hidden overflow-hidden lg:block">
												<img class="relative h-40"
													:src="logo_url ? logo_url : 'https://via.placeholder.com/100.png'"
													alt="" />
												<label for="desktop-user-photo"
													class="absolute inset-0 flex h-40 items-center justify-center bg-gray-700 bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
													<span class="text-white">Change</span>
													<span class="sr-only">user photo</span>
													<input type="file" id="desktop-user-photo"
														@change="handleFileSelectionInUploaderForm($event)"
														class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
												</label>
											</div>
										</div>
										<!--use this for multiple file uploader (start)-->
										<div class="hidden">
											<label class="block text-sm font-medium text-gray-700">Cover photo</label>
											<div
												class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
												<div class="space-y-1 text-center">
													<svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor"
														fill="none" viewBox="0 0 48 48" aria-hidden="true">
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															stroke-width="2" stroke-linecap="round"
															stroke-linejoin="round" />
													</svg>
													<div class="flex text-sm text-gray-600">
														<label for="file-upload"
															class="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500">
															<span>Upload a file</span>
															<input id="file-upload" name="file-upload" type="file"
																multiple
																@change="handleFileSelectionInUploaderForm($event)"
																class="sr-only" />
														</label>
														<p class="pl-1">or drag and drop</p>
													</div>
													<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
												</div>
											</div>
										</div>
										<!--use this for multiple file uploader (end)-->
									</div>
									<div class="flex flex-shrink-0 justify-end px-4 py-4">
										<button type="button"
											class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
											@click="isUploaderFormOpen = false">Cancel</button>
										<button type="submit"
											class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Save</button>
									</div>
								</div>
							</form>
						</TransitionChild>
					</div>
				</div>
			</div>
		</div>
	</TransitionRoot>

</template>
<!--Server and client side javascript-->
<script setup>
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
import { ref } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";


//-----------------------------------------------------------------------------------------------------
//2. Page or component properties
//-----------------------------------------------------------------------------------------------------
const props = defineProps({
	logo_url: {
		type: String
	}
})

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------
const isUploaderFormOpen = ref(true);
const progress = ref(false);
const data = ref({})
const files = ref([]);


//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on("evtUploaderForm", (data) => {
	//isUploaderFormOpen.value = !isUploaderFormOpen.value;
	progress.value = false;
});

//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------

const handleFileSelectionInUploaderForm = (event) => {
	let uploadedFiles = event.target.files;
	//console.log(event.target.files)
	for (let i = 0; i < uploadedFiles.length; i++) {
		files.value.push(uploadedFiles[i]);
	}
	//console.log(files)
}



//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------
async function saveUploaderForm(args) {
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

		progress.value = true

		//attach tenant into the payload (Required for SaaS)
		data.value.tenant = "www.xycc-company.com" //todo: dynamic get from settings

		//Prepare file upload
		let formData = new FormData();
		formData.append('upload_preset', "templr-assets");
		formData.append('file', files.value[0]);

		//Unccomment this for multiple file upload
		/*for (let i = 0; i < files.value.length; i++) {
			formData.append('file[' + i + ']', files.value[i]);
		}*/

		//Send to server
		await useFetch("https://api.cloudinary.com/v1_1/nathansweb/image/upload", {
			//await useFetch("/api/upload", {
			method: "post",
			body: formData,
			onResponse({ request, response, options }) {
				//Show user friendly response message 
				if (response._data.asset_id) {
					console.log(JSON.stringify(response._data))
					useNuxtApp().$toast.show({
						type: "success",
						message: "File has been uploaded successfully",
						timeout: 6,
					});
					//upsertTenant(response._data)
					data.value.logo_url = response._data.url
					useNuxtApp().$bus.$emit("evtUploadSuccess", response._data)
					files.value = []
				} else if (response._data.error) {
					useNuxtApp().$toast.show({
						type: "success",
						message: response._data.error.message,
						timeout: 6,
					});
				}
				//reset model
				//data.value = {}
				//reset progress
				progress.value = false
			},
		});
	} catch (error) {
		//Show user friendly error message 
		useNuxtApp().$toast.show({
			type: "error",
			message: `Oops!... Something went wrong....<br/>[${error.message}]`,
			timeout: 6,
		});
		//reset progress
		progress.value = false
	} finally {
	}
	//Insert/update the just uploaded image path
	//upsertTenant(data.value)
	//(async () => { upsertTenant() })
}

function modelValidate(args) {

	return (data.value.first_name != undefined && data.value.first_name != "")
}
</script>
