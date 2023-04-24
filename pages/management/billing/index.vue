<template>
	<div class="h-screen flex overflow-hidden bg-gray-50">
		<!-- Static sidebar for desktop -->
		<div class="hidden lg:flex lg:flex-shrink-0">
			<div class="flex flex-col w-64">
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
					<ManagementLeftNavBar />
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
									<span>Billing</span>
								</a>
							</div>
						</nav>

						<div class="flex-1 flex xl:overflow-hidden">
							<!-- Secondary sidebar (Start)-->
							<!--<ManagementLeftNavSecondary />
               Secondary sidebar (End)-->

							<div class="flex-1 xl:overflow-y-auto">
								<div class="max-w-5xl mx-4">
									<!-- Main content (start)-->

									<!-- Stat (start)-->
									<div class="space-y-8 divide-y divide-gray sm:space-y-5 pt-5">
										<div>
											<h3 class="text-lg leading-6 font-medium text-gray-900">Personal Billing</h3>
											<p class="mt-1 max-w-2xl text-sm text-gray-500"></p>
										</div>
									</div>
									<!-- Stat (End)-->

									<!-- Billing & Plans display (start)-->
									<div class="space-y-8 divide-y divide-gray sm:space-y-5 pt-5">
										<div>
											<h3 class="text-lg leading-6 font-medium text-gray-900">Billing & plans / Payment information</h3>
											<p class="mt-1 max-w-2xl text-sm text-gray-500"></p>
										</div>
										<div></div>
									</div>
									<BillingDisplay class="w-2/4" />
									<!-- Billing & Plans display (End)-->

									<!-- Main content (End)-->
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
		<!--<BillingPlansUpsert />-->
	</div>
</template>
<script>
	//import BillingPlansUpsert from '@/pages/management/billing/BillingPlansUpsert.vue';
	import BillingDisplay from "@/pages/management/billing/BillingDisplay.vue";
	import stats from "@/store/billing.json";

	export default {
		components: {
			stats,
			BillingDisplay,
			//BillingPlansUpsert,
		},
		data() {
			return {
				user: {},
				api: "",
				stats,
			};
		},

		methods: {},
	};
</script>
<script setup>
	//alert(location.coords.latitude)
	definePageMeta({
		layout: "admin",
		middleware: ["auth"],
	});
</script>
