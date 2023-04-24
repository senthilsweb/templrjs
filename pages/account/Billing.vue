<template>
	<div class="h-screen flex overflow-hidden bg-gray-100">
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
						<div class="flex-1 flex xl:overflow-hidden">
							<!-- Secondary sidebar (Start)-->
							<CommonsSecondaryNav title="Account" api_end_point="/_navigation/profile" />
							<!-- Secondary sidebar (End)-->
							<div class="flex-1 xl:overflow-y-auto">
								<!-- Main content (start)-->
								<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
									<h1 class="text-3xl font-bold tracking-tight text-primary-gray-900 pt-4">Personal
										Billing</h1>
									<!-- Stat (start)-->
									<div class="space-y-8 divide-y divide-gray sm:space-y-5">
										<stats-simple :data="stats" />
									</div>
									<!-- Stat (End)-->
									<!-- Payment (start)-->

									<div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
										<div>
											<section aria-labelledby="applicant-information-title">
												<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
													<PaymentInformation />
												</div>
											</section>
										</div>
										<div>
											<section aria-labelledby="timeline-title">
												<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
													<BillingInformation />
												</div>
											</section>
										</div>
									</div>
									<div class="grid grid-cols-1 pt-4">
										<section aria-labelledby="timeline-title">
											<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
												<div class="sm:flex sm:items-center sm:justify-between">
													<button type="submit"
														class="w-full bg-lime-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-lime-500 sm:ml-6 sm:order-last sm:w-auto">Continue</button>
													<p
														class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
														You won't be charged until the next step.</p>
												</div>
											</div>
										</section>
									</div>

									<!-- Payment (end)-->
								</div>
								<!-- Main content (End)-->
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
	<BillingPlansUpsert />
</template>
<script>
import lefNavLinks from "@/store/admin-navigation.json";
import BillingPlansUpsert from "@/pages/account/BillingPlansUpsert.vue";
import BillingInformation from "@/pages/account/BillingInformation.vue";
import PaymentInformation from "@/pages/account/PaymentInformation.vue";
import stats from "@/store/billing.json";

export default {
	components: {
		stats,
		BillingInformation,
		PaymentInformation,
		BillingPlansUpsert,
	},
	data() {
		return {
			user: {},
			api: "",
			lefNavLinks,
			stats,
		};
	},
	methods: {},
	async asyncData({ params }) { },
	created() { },
};
</script>
<script setup>
definePageMeta({
	layout: "admin",
	middleware: ["auth"],
});
</script>
