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
						<nav aria-label="Breadcrumb" class="bg-white border-b border-blue-gray-200 xl:hidden">
							<div class="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
								<a href="#" class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
									<!-- Heroicon name: solid/chevron-left -->
									<svg class="h-5 w-5 text-blue-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
									</svg>
									<span>Profile information</span>
								</a>
							</div>
						</nav>

						<div class="flex-1 flex xl:overflow-hidden">
							<!-- Secondary sidebar (Start)-->
							<!--<ManagementLeftNavSecondary :data="lefNavLinks.navManagement" :api="api" />-->
							<!-- Secondary sidebar (End)-->

							<div class="flex-1 xl:overflow-y-auto">
								<TypePageHeader :heading="pageHeading" showbutton="true" guide="Management screen to keep Type(s) up-to-date" addClickEvent="evtUpsertType" />
								<TypeSearch :heading="searchHeading" />
								<div class="w-full">
									<!-- Main content (start)-->

									<!-- Type Body content (start)-->

									<div class="space-y-8 divide-y divide-gray sm:space-y-5 pt-5">
										<div>
											<TypeGrid />
										</div>
									</div>

									<!-- Type Body content (End)-->
									<!-- Main content (End)-->
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
		<TypeUpsert />
	</div>
</template>
<script>
	import TypePageHeader from "@/pages/configurations/types/TypePageHeader.vue";
	import TypeSearch from "@/pages/configurations/types/TypeSearch.vue";
	import TypeGrid from "@/pages/configurations/types/TypeGrid.vue";
	import TypeUpsert from "@/pages/configurations/types/TypeUpsert.vue";
	import lefNavLinks from "@/store/admin-navigation.json";

	export default {
		layout: "app",
		components: {
			TypePageHeader,
			TypeSearch,
			TypeGrid,
			TypeUpsert,
		},
		data() {
			return {
				user: {},
				api: "",
				lefNavLinks,
				pageHeading: "Type",
				searchHeading: "",
			};
		},
		methods: {
			async getuser(email) {
				try {
				} catch (error) {
					console.log(error);
				}
			},
		},
		async asyncData({params}) {},
		created() {},
	};
</script>
<script setup>
	definePageMeta({
		layout: "admin",
		middleware: ["auth"],
	});
</script>
