<template>
	<div>
		<form name="frmSearchRole" id="frmSearchRole" ref="frmSearchRole" v-on:submit.prevent
			class="space-y-8 divide-y divide-gray-200">
			<div v-if="isFilterRoleVisible" class="px-2 pt-2 border-b space-y-2">
				<h2 v-if="this.heading" class="text-lg leading-7 font-medium">
					{{ this.heading }}
				</h2>
				<div class="sm:col-span-6">
					<Dropdownlist @selected_item="handleSelectedForMarkAsDeleteInSearch" name="search_mark_as_delete"
						label="Marked as delete" :data="{
	data: [
		{ code: 'true', name: 'Yes' },
		{ code: 'false', name: 'No' },
	],
}" />
				</div>
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
						<input type="search" name="search_name" id="search_name" ref="search_name"
							class="focus:ring-lime-600 focus:border-lime-600 block w-full pl-10 sm:text-sm border-gray-300"
							placeholder="Search" />
					</div>
				</div>
				<div class="py-3 text-right space-x-4">
					<button type="button"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Reset</button>
					<button @click="searchRole()" type="submit"
						class="zyn-button">Search</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
/**
 * RoleSearch.vue
 *
 * @description :: Generic search compoment for [sails._s.capitalize(table) ]. Default search is against [Name] attribute if present.
 *                 It comes with [Mark_As_Delete] filters.
 *
 * @author      :: Zynobot
 * @help        ::
 *
 * Created at   :: Sun Feb 27 2022 10:11:36 GMT-0500 (Eastern Standard Time)
 * Modified at  :: Sun Feb 27 2022 10:11:36 GMT-0500 (Eastern Standard Time)
 */
import Dropdownlist from "@/components/Dropdownlist.vue";

export default {
	layout: "app",
	props: {
		heading: String,
	},
	components: {
		Dropdownlist,
	},
	data() {
		return {
			isFilterRoleVisible: false,
			mark_as_delete: "",
		};
	},
	methods: {
		searchRole() {
			let args = {};
			args.name = this.$refs.search_name.value;
			args.mark_as_delete = this.mark_as_delete;
			useNuxtApp().$bus.$emit("evtSearchRole", args);
		},
		handleSelectedForMarkAsDeleteInSearch(data) {
			this.mark_as_delete = data;
		},
	},
	created() {
		useNuxtApp().$bus.$on("evtFilterRole", (data) => {
			this.isFilterRoleVisible = !this.isFilterRoleVisible;
		});
	},
};
</script>
