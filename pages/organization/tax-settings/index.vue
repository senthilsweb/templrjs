<template>
	<div class="h-screen flex overflow-hidden bg-gray-50">
		<!-- Static sidebar for desktop -->
		<div class="hidden lg:flex lg:flex-shrink-0">
			<div class="flex flex-col w-64">
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
					<ManagementLeftNavBar />
					<!--{{$route.name.split('-')[$route.name.split('-').length-1]}}-->
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
								<div class="w-full">
									<!-- Main content (start)-->
								
									<!-- Main content (End)-->
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>


</template>
<!--Server and client side javascript-->
<script setup>




//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
//Get server side master data for departments
definePageMeta({
	layout: "admin",
	middleware: ["auth"],
});

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------

const progress = ref(false);
const data = ref({})

//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on("evtUploadSuccess", (data) => {
	let attributes = {}
	attributes.logo_url = data.url
	attributes.logo_metadata = data
	upsertTenant(attributes, "upload")
	//progress.value = false;
});

useNuxtApp().$bus.$on("evtCompanyFormSubmit", (data) => {
	upsertTenant(data, "company")
});
//


//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------






//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------

async function upsertTenant(args, module) {
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
		data.value = args
		data.value.tenant = "www.xycc-company.com" //todo: dynamic get from settings
		data.value.updatedAt = useNuxtApp().$dayjs().utc();


		//data.value.logo_url = args.url
		//data.value.logo_metadata = args

		if (settings.value.documents.length == 0) { //Insert
			//dayjs.utc()
			data.value.createdAt = useNuxtApp().$dayjs().utc();
			const { data: res } = await useFetch("/api/settings/" + "create", {
				method: "post",
				body: data.value,
				initialCache: false,
				onResponse({ request, response, options }) {
					if (response._data.insertedId) {
						useNuxtApp().$toast.show({ type: "success", message: `Record has been inserted successfully`, timeout: 6 });
					} else {
						useNuxtApp().$toast.show({ type: "error", message: `Failure`, timeout: 6 });
					}
					//store.updateSettings(response._data)
					//store.updateLogoUrl(response._data.url)
					progress.value = false
				},
			});
		} else { //Update
			//Send to server
			await useFetch("/api/settings/" + settings.value.documents[0]._id, {
				//await useFetch("/api/upload", {
				method: "put",
				body: data.value, //omit the mongo object id before the upsert
				onResponse({ request, response, options }) {

					//Show user friendly response message 
					if (response._data.modifiedCount > 0) {
						console.log("response._data.modifiedCount=", response._data.modifiedCount)
						useNuxtApp().$toast.show({ type: "success", message: `Record has been updated successfully`, timeout: 6 });
					} else {
						useNuxtApp().$toast.show({ type: "error", message: `Failure`, timeout: 6 });
					}
					//reset model
					//data.value = {}
					//reset progress
					//(async () => settings.value = await getSettings())
					//store.updateSettings(response._data)
					if (module == "upload") {
						store.updateLogoUrl(args.logo_url)
						store.updateLogoMetadata(args.logo_metadata)
					}

					progress.value = false
				},
			});
		}

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

}
</script>