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
						<div class="flex-1 flex xl:overflow-hidden">
							<!-- Secondary sidebar (Start)-->
							<ManagementLeftNavSecondary :data="lefNavLinks.navAccount" :api="api" />
							<!-- Secondary sidebar (End)-->
							<div class="flex-1 xl:overflow-y-auto">
								<!-- Main content (start)-->
								<div class="mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
									<h1 class="text-3xl font-bold tracking-tight text-primary-gray-900 p-4">Change
										Password</h1>
									<form class="divide-y-primary-gray-200 mt-6 space-y-8 divide-y">
										<div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
											<!--<div class="sm:col-span-6">
												<h2 class="text-xl font-medium text-primary-gray-900">Profile</h2>
												<p class="mt-1 text-sm text-primary-gray-500">This information will be
													displayed publicly so be
													careful
													what you share.</p>
											</div>-->
											<div class="sm:col-span-6">
												<label for="first-name"
													class="block text-sm font-medium text-primary-gray-900">Old
													Password</label>
												<input type="text" name="first-name" id="first-name"
													autocomplete="given-name"
													class="mt-1 block w-full rounded-md border-primary-gray-300 text-primary-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
											</div>

											<div class="sm:col-span-6">
												<label for="last-name"
													class="block text-sm font-medium text-primary-gray-900">New Password
												</label>
												<input type="text" name="last-name" id="last-name"
													autocomplete="family-name"
													class="mt-1 block w-full rounded-md border-primary-gray-300 text-primary-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
											</div>
											<div class="sm:col-span-6">
												<label for="last-name"
													class="block text-sm font-medium text-primary-gray-900">Re-enter New
													Password </label>
												<input type="text" name="last-name" id="last-name"
													autocomplete="family-name"
													class="mt-1 block w-full rounded-md border-primary-gray-300 text-primary-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
											</div>
										</div>

										<div class="flex justify-end pt-8">
											<button type="button"
												class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-primary-gray-900 shadow-sm hover:bg-primary-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Cancel</button>
											<button type="submit"
												class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Save</button>
										</div>
									</form>
								</div>
								<!-- Main content (End)-->
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>
<script>
import lefNavLinks from "@/store/admin-navigation.json";

export default {
	components: {},
	data() {
		return {
			user: {},
			api: "",
			lefNavLinks,
		};
	},
	methods: {
		async getUser(email) {
			try {
				let api = "users?email=" + email;
				const { data } = await this.$axios.get(api);
				//console.log(JSON.stringify(data));
				//alert(JSON.stringify(data.data[0]))
				return (this.user = data.data[0]);
			} catch (error) {
				console.log(error);
			}
		},
	},
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
