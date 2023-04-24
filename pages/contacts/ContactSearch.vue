<template>
	<div>
		<form name="frmSearchContact" id="frmSearchContact" ref="frmSearchContact" v-on:submit.prevent
			class="space-y-8 divide-y divide-gray-200">
			<div v-if="isShowSearchContactVisible" class="px-2 pt-2 border-b space-y-2">
				<h2 v-if="this.heading" class="text-lg leading-7 font-medium">
					{{ this.heading }}
				</h2>
				<div class="sm:col-span-6">
					<label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
					<div class="relative rounded-md shadow-sm">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<!-- Heroicon name: solid/search -->
							<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
								fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clip-rule="evenodd" />
							</svg>
						</div>
						<input type="search" name="name" id="name" v-model="data.name"
							class="focus:ring-lime-600 focus:border-lime-600 block w-full pl-10 sm:text-sm border-gray-300"
							placeholder="Search" />
					</div>
				</div>
				<div class="sm:col-span-6">
					<Dropdownlist :data="{ data: contact_types.documents }"
						v-on:change="handleSelectedInContact_contact_type" show_label="true" v-model="data.contact_type"
						name="contact_type" label="Contact Type" :selected_value="data.contact_type" />
				</div>
				<div v-if="data.contact_type == 'Active Client'" class="sm:col-span-6">
					<Dropdownlist :data="{ data: clients.documents }" v-on:change="handleSelectedInConsultantClient"
						v-model="data.client" show_label="true" name="client" label="Client"
						:selected_value="data.client" />
				</div>
				<div class="sm:col-span-6">
					<Dropdownlist :data="{ data: record_status.documents }"
						v-on:change="handleSelectedInContact_record_status" show_label="true"
						v-model="data.record_status" name="record_status" label="Record Status"
						:selected_value="data.record_status" />
				</div>
				<div class="sm:col-span-6">
					<Dropdownlist :data="{ data: mark_as_delete.documents }"
						v-on:change="handleSelectedInContact_mark_as_delete" show_label="true"
						v-model="data.mark_as_delete" name="mark_as_delete" label="Mark for Deletion"
						:selected_value="data.mark_as_delete" />
				</div>
				<div class="sm:col-span-6">
					<Dropdownlist :data="{ data: limits.documents }" v-on:change="handleSelectedInContactLimit"
						show_label="true" v-model="data.limit" name="limit" label="Limit #. of results to"
						:selected_value="data.limit" />
				</div>
				<div class="py-3 text-right space-x-4">
					<button type="button"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Reset</button>
					<button @click="useNuxtApp().$bus.$emit('evtSearchContact', data)" type="submit"
						class="zyn-button">Search</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import Dropdownlist from "@/components/Dropdownlist.vue";

export default {
	props: {
		heading: String,
	},
	components: {
		Dropdownlist,
	},
	data() {
		return {
			isShowSearchContactVisible: false,
			data: {},
		};
	},
	methods: {
		handleSelectedInContact_record_status(e) {
			this.data.record_status = e.target.value;
		},
		handleSelectedInContact_mark_as_delete(e) {
			this.data.mark_as_delete = e.target.value;
		},
		handleSelectedInContactLimit(e) {
			this.data.limit = e.target.value;
		},
		handleSelectedInContact_contact_type(e) {
			this.data.contact_type = e.target.value;
			if (this.data.contact_type != "Active Client") {
				this.data.client = null;
			}
		},
		handleSelectedInConsultantClient(e) {
			this.data.client = e.target.value;
		},
	},
	created() {
		useNuxtApp().$bus.$on("evtShowSearchContact", (data) => {
			this.isShowSearchContactVisible = !this.isShowSearchContactVisible;
		});
	},
};
</script>
<script setup>
//Get server side master data for departments
const { data: record_status } = await useAsyncData("record_status-list-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "record_status" } }, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);

const { data: mark_as_delete } = await useAsyncData("mark_as_delete-list-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "mark_as_delete" } }, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);

const { data: limits } = await useAsyncData("limits-list-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "properties", projection: {}, filter: { property_type: { $eq: "limit" } }, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);

const { data: contact_types } = await useAsyncData("contact_types-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "configurations", projection: {}, filter: { property_type: { $eq: "Contact Type" } }, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);

//Get server side master data for roles
const { data: clients } = await useAsyncData("clients-list-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "clients", projection: {}, filter: {}, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);
</script>
