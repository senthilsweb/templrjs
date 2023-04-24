<template>
	<section
		v-if="isUpsertBillingVisible"
		class="fixed inset-0 overflow-hidden"
		aria-labelledby="slide-over-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true"></div>
			<div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
				<div class="w-screen max-w-md">
					<div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
						<div class="flex-1 h-0 overflow-y-auto">
							<header class="space-y-1 py-6 px-4 bg-gray-200 sm:px-6">
								<div class="flex items-center justify-between space-x-3">
									<h2 class="text-lg leading-7 font-medium text-gray-700">Billing & plans</h2>
									<div class="h-7 flex items-center">
										<button
											v-on:click="closeBillingPanel()"
											aria-label="Close panel"
											class="text-gray-600 hover:text-gray-900 transition ease-in-out duration-150"
										>
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
								<div>
									<p class="text-sm leading-5 text-gray-500">Manage you Billing & plans / Payment details.</p>
								</div>
							</header>
							<div class="flex-1 flex flex-col justify-between">
								<div class="px-4 divide-y divide-gray-200 sm:px-6">
									<div class="space-y-6 pt-6 pb-5">
										<form
											name="frmBilling"
											id="frmBilling"
											class="space-y-8 divide-y divide-gray-200"
											@submit.prevent="SaveAndUpdate"
										>
											<div class="sm:overflow-hidden">
												<section aria-labelledby="payment-heading" class="">
													<h2 id="payment-heading" class="text-lg font-medium text-gray-900">Card information</h2>

													<div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
														<div class="col-span-3 sm:col-span-4">
															<label for="name-on-card" class="block text-sm font-medium text-gray-700"
																>Name on card</label
															>
															<div class="mt-1">
																<input
																	type="text"
																	id="name-on-card"
																	name="name-on-card"
																	autocomplete="cc-name"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div class="col-span-3 sm:col-span-4">
															<label for="card-number" class="block text-sm font-medium text-gray-700"
																>Card number</label
															>
															<div class="mt-1">
																<input
																	type="text"
																	id="card-number"
																	name="card-number"
																	autocomplete="cc-number"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div class="col-span-2 sm:col-span-3">
															<label for="expiration-date" class="block text-sm font-medium text-gray-700"
																>Expiration date (MM/YY)</label
															>
															<div class="mt-1">
																<input
																	type="text"
																	name="expiration-date"
																	id="expiration-date"
																	autocomplete="cc-exp"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div>
															<label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
															<div class="mt-1">
																<input
																	type="text"
																	name="cvc"
																	id="cvc"
																	autocomplete="csc"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>
													</div>
												</section>

												<section aria-labelledby="shipping-heading" class="mt-10">
													<h2 id="shipping-heading" class="text-lg font-medium text-gray-900">Billing address</h2>

													<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
														<div class="sm:col-span-3">
															<label for="address" class="block text-sm font-medium text-gray-700">Address</label>
															<div class="mt-1">
																<input
																	type="text"
																	id="address"
																	name="address"
																	autocomplete="street-address"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div class="sm:col-span-3">
															<label for="apartment" class="block text-sm font-medium text-gray-700"
																>Apartment, suite, etc.</label
															>
															<div class="mt-1">
																<input
																	type="text"
																	id="apartment"
																	name="apartment"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div>
															<label for="city" class="block text-sm font-medium text-gray-700">City</label>
															<div class="mt-1">
																<input
																	type="text"
																	id="city"
																	name="city"
																	autocomplete="address-level2"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div>
															<label for="region" class="block text-sm font-medium text-gray-700"
																>State / Province</label
															>
															<div class="mt-1">
																<input
																	type="text"
																	id="region"
																	name="region"
																	autocomplete="address-level1"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>

														<div>
															<label for="postal-code" class="block text-sm font-medium text-gray-700"
																>Postal code</label
															>
															<div class="mt-1">
																<input
																	type="text"
																	id="postal-code"
																	name="postal-code"
																	autocomplete="postal-code"
																	class="block w-full border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
																/>
															</div>
														</div>
													</div>
												</section>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
							<span class="inline-flex rounded-md shadow-sm">
								<button
									type="button"
									class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
								>
									Reset
								</button>
							</span>
							<span class="inline-flex rounded-md shadow-sm">
								<button
									v-on:click="upsertBilling"
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out"
								>
									Save
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	/**
	 * BillingUpsert.vue
	 *
	 * @description :: [sails._s.capitalize(table) ] form panel to handle Add New & Edit. Panel visible and hidden managed thru event subscription.
	 *                 Additional events published to handle custom functions post "Save" operation.
	 *
	 * @author      :: Zynobot
	 * @help        ::
	 *
	 * Created at   :: Sun Feb 27 2022 16:44:20 GMT-0500 (Eastern Standard Time)
	 * Modified at  :: Sun Feb 27 2022 16:44:20 GMT-0500 (Eastern Standard Time)
	 */
	import Dropdownlist from "@/components/Dropdownlist.vue";

	import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
	export default {
		components: {
			Dropdownlist,
		},
		data() {
			return {
				isUpsertBillingVisible: false,
				data: {},
				api: "",
			};
		},
		methods: {
			async upsertBilling(args) {
				try {
					if (this.$_.isUndefined(this.data.id)) {
						const {data} = await this.$axios.post(this.$config.apiURL + "Billing", this.data);
					} else {
						const {data} = await this.$axios.put(this.$config.apiURL + "Billing/" + this.data.id, this.data);
					}
					this.data = {};
					this.isUpsertBillingVisible = !this.isUpsertBillingVisible;
					useNuxtApp().$bus.$on("evtRefreshBillingDatatable");
					this.$toast.success("Record saved successfully");
				} catch (error) {
					console.log(error);
					this.$toast.error("Oops!Save failed...");
				} finally {
				}
			},
			async deleteBilling() {
				try {
					//Make sure to set the status and delete marker
					this.data.is_enabled = false;
					//end
					const {data} = await this.$axios.delete(this.$config.apiURL + "Billing/" + this.data.id);
					useNuxtApp().$bus.$on("evtRefreshBillingDatatable");
					this.$toast.success("Record has been deleted successfully");
				} catch (error) {
					this.$toast.error("Oops! delete failed...");
				} finally {
				}
			},
			async bindBilling() {
				try {
				} catch (error) {
					console.log(error);
				}
			},
			async closeBillingPanel() {
				this.data = {};
				this.isUpsertBillingVisible = !this.isUpsertBillingVisible;
			},
			handleSelectedInPayment_Status(data) {
				this.data.payment_status = data;
			},
			handleSelectedInPayment_type(data) {
				this.data.payment_type = data;
			},
			handleSelectedInPayment_currency(data) {
				this.data.payment_currency = data;
			},
			handleSelectedIn_payment_to_user(data) {
				this.data.payment_to_user = data;
			},
			handleSelectedInMarkAsDelete(data) {
				this.data.mark_as_delete = data;
			},
		},
		computed: {},
		mounted() {},
		created() {
			useNuxtApp().$bus.$on("evtUpsertBilling", (data) => {
				//alert(data);
				if (data !== undefined) {
					this.data = data;
					this.isUpsertBillingVisible = !this.isUpsertBillingVisible;
					return this.data;
				}
				this.isUpsertBillingVisible = !this.isUpsertBillingVisible;
			});

			//2) Delete Billing record and then rebind datatable
			useNuxtApp().$bus.$on("evtDeleteBilling", (data) => {
				if (data !== undefined) {
					this.data = data;
					this.deleteBilling();
				}
			});
		},
		beforeDestroy() {
			useNuxtApp().$bus.$off("evtUpsertBilling");
			useNuxtApp().$bus.$off("evtDeleteBilling");
		},
	};
</script>
