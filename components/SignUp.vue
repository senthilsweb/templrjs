<template>
	<section v-if="isSignUpFormVisible" class="z-50 fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title"
		role="dialog" aria-modal="true">
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true"></div>
			<div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
				<div class="w-screen max-w-4xl">
					<div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-2xl">
						<div class="flex-1 h-0 overflow-y-auto">
							<header
								class="space-y-1 py-6 px-4 bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 sm:px-6">
								<div class="flex items-center justify-between space-x-3">
									<h2 class="text-lg leading-7 font-medium text-white">New Registration</h2>
									<div class="h-7 flex items-center">
										<button v-on:click="isSignUpFormVisible = false" aria-label="Close panel"
											class="text-primary-200 hover:text-white transition ease-in-out duration-150">
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
								<div>
									<p class="text-sm leading-5 text-white">The information that you have provided in
										this registration form is used by us so that we can contact you regarding
										classes and events, as well as ensuring that we are able to contact you in an
										emergency.Information collected by this form will be held for a limited time in
										accordance with GDPR.</p>
								</div>
							</header>
							<div class="flex-1 flex flex-col justify-between">
								<div class="px-4 divide-y divide-gray-200 sm:px-6">
									<div class="space-y-6 pt-6 pb-5">
										<form name="SignUp" id="SignUp" class="space-y-8" method="POST"
											@submit.prevent="SignUp" ref="frmSignUp">
											<input type="hidden" name="form-name" value="SignUp" />
											<div class="sm:overflow-hidden">
												<section aria-labelledby="shipping-heading">
													<div class="sm:col-span-6">
														<h2 class="font-medium text-blue-gray-900">Course Information
														</h2>
														<!--<p class="mt-1 text-sm text-blue-gray-500">This information will be kept private and never be shared with others for marketing purposes.</p>-->
													</div>
													<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
														<!-- Checkboxes (Start)-->
														<div class="pt-2 space-y-4 sm:pt-2 sm:space-y-4 sm:col-span-6">
															<div
																class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
																<div class="pt-6 sm:pt-2">
																	<div role="group" aria-labelledby="label-email">
																		<div
																			class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
																			<div>
																				<div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
																					id="label-email">Select the classes
																					you would like to register.</div>
																			</div>
																			<div class="mt-4 sm:mt-0 sm:col-span-2">
																				<div class="max-w-lg space-y-4">
																					<div
																						class="relative flex items-start">
																						<div
																							class="flex items-center h-5">
																							<input id="comments"
																								name="comments"
																								type="checkbox"
																								class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
																						</div>
																						<div class="ml-3 text-sm">
																							<label for="comments"
																								class="font-medium text-gray-700">Bollywood</label>
																						</div>
																					</div>
																					<div>
																						<div
																							class="relative flex items-start">
																							<div
																								class="flex items-center h-5">
																								<input id="candidates"
																									name="candidates"
																									type="checkbox"
																									class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
																							</div>
																							<div class="ml-3 text-sm">
																								<label for="candidates"
																									class="font-medium text-gray-700">Carnatic
																									Music</label>
																							</div>
																						</div>
																					</div>
																					<div>
																						<div
																							class="relative flex items-start">
																							<div
																								class="flex items-center h-5">
																								<input id="offers"
																									name="offers"
																									type="checkbox"
																									class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
																							</div>
																							<div class="ml-3 text-sm">
																								<label for="offers"
																									class="font-medium text-gray-700">Odissi</label>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<!-- Checkboxes (End)-->
													</div>
												</section>
												<section aria-labelledby="shipping-heading" class="mt-10">
													<div class="sm:col-span-6">
														<h2 class="font-medium text-blue-gray-900">Student Information
														</h2>
														<!--<p class="mt-1 text-sm text-blue-gray-500">This information will be kept private and never be shared with others for marketing purposes.</p>-->
													</div>
													<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
														<div class="sm:col-span-6">
															<label for="first_name"
																class="block text-sm font-medium text-gray-700">First
																name *</label>
															<div class="mt-1">
																<input v-model="data.first_name" type="text"
																	name="first_name" id="first_name"
																	autocomplete="given-name"
																	class="py-3 px-4 block w-full shadow-sm focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="last_name"
																class="block text-sm font-medium text-gray-700">Last
																name *</label>
															<div class="mt-1">
																<input v-model="data.last_name" type="text"
																	name="last_name" id="last_name"
																	autocomplete="family-name"
																	class="py-3 px-4 block w-full shadow-sm focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="name"
																class="block text-sm font-medium text-gray-700"> Date of
																birth date </label>
															<div class="mt-1 rounded-md shadow-sm">
																<input v-model="data.last_name" type="text"
																	name="last_name" id="last_name"
																	autocomplete="family-name"
																	class="py-3 px-4 block w-full shadow-sm focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="description"
																class="block font-medium text-gray-700"> Medical
																Information </label>
															<div class="mt-1">
																<textarea v-model="data.description" id="description"
																	name="description" rows="3"
																	class="shadow-sm focus:ring-lime-600 focus:border-lime-600 block w-full sm:text-sm border-gray-300"></textarea>
															</div>
															<p class="mt-2 text-sm text-gray-500">e.g Asthma, nut
																allergy. Please state N/A if there is no medical
																information that we need to be aware of</p>
														</div>
													</div>
												</section>
												<section aria-labelledby="shipping-heading" class="mt-10">
													<div class="sm:col-span-6">
														<h2 class="font-medium text-blue-gray-900">Parent/Guardian
															Information</h2>
													</div>
													<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
														<div class="sm:col-span-6">
															<label for="first_name"
																class="block text-sm font-medium text-gray-700">Full
																name *</label>
															<div class="mt-1">
																<input v-model="data.full_name" type="text"
																	name="full_name" id="full_name"
																	autocomplete="given-name"
																	class="py-3 px-4 block w-full shadow-sm focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="Email"
																class="block text-sm font-medium text-gray-700"> Email *
															</label>
															<div class="mt-1 rounded-md shadow-sm">
																<input v-model="data.email" type="text" id="email"
																	name="email" autocomplete="name"
																	class="py-3 px-4 flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="phone_number"
																class="block text-sm font-medium text-gray-700">Phone
																Number</label>
															<div class="mt-1 relative">
																<!--<div class="pl-40">-->
																<input v-model="data.phone_number" type="text"
																	name="phone_number" id="phone_number"
																	autocomplete="tel"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"
																	placeholder="+1 (555) 987-6543" />
																<!--</div>-->
															</div>
														</div>
													</div>
												</section>

												<section aria-labelledby="shipping-heading" class="mt-10">
													<div class="sm:col-span-6">
														<h2 class="font-medium text-blue-gray-900">Address Information
														</h2>
														<!--<p class="mt-1 text-sm text-blue-gray-500">This information will be kept private and never be shared with others for marketing purposes.</p>-->
													</div>

													<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
														<div class="sm:col-span-3">
															<label for="address"
																class="block text-sm font-medium text-gray-700">Address</label>
															<div class="mt-1">
																<input type="text" id="address" name="address"
																	autocomplete="street-address"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div class="sm:col-span-3">
															<label for="apartment"
																class="block text-sm font-medium text-gray-700">Apartment,
																suite, etc.</label>
															<div class="mt-1">
																<input type="text" id="apartment" name="apartment"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div>
															<label for="city"
																class="block text-sm font-medium text-gray-700">City</label>
															<div class="mt-1">
																<input type="text" id="city" name="city"
																	autocomplete="address-level2"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div>
															<label for="region"
																class="block text-sm font-medium text-gray-700">State /
																Province</label>
															<div class="mt-1">
																<input type="text" id="region" name="region"
																	autocomplete="address-level1"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div>
															<label for="postal-code"
																class="block text-sm font-medium text-gray-700">Postal
																code</label>
															<div class="mt-1">
																<input type="text" id="postal-code" name="postal-code"
																	autocomplete="postal-code"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
													</div>
												</section>
												<!-- Checkboxes (Start)-->
												<div class="pt-2 space-y-4 sm:pt-2 sm:space-y-4 sm:col-span-6">
													<section aria-labelledby="shipping-heading" class="mt-10">
														<div class="sm:col-span-6">
															<h2 class="font-medium text-blue-gray-900">Parent Consent
															</h2>
														</div>
														<div class="mt-6">
															<div
																class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
																<div class="pt-6 sm:pt-2">
																	<div role="group" aria-labelledby="label-email">
																		<div
																			class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
																			<div>
																				<div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
																					id="label-email">Parent Concent
																				</div>
																			</div>
																			<div class="mt-4 sm:mt-0 sm:col-span-2">
																				<div class="max-w-lg space-y-4">
																					<div
																						class="relative flex items-start">
																						<div
																							class="flex items-center h-5">
																							<input id="comments"
																								name="comments"
																								type="checkbox"
																								class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
																						</div>
																						<div class="ml-3 text-sm">
																							<label for="comments"
																								class="text-sm text-gray-700">I
																								hereby agree that my
																								data entered in the
																								contact form will be
																								stored electronically,
																								and will be processed
																								and used for the purpose
																								of establishing contact.
																								I am aware that I can
																								revoke my consent at any
																								time.</label>
																						</div>
																					</div>
																					<div>
																						<div
																							class="relative flex items-start">
																							<div
																								class="flex items-center h-5">
																								<input id="candidates"
																									name="candidates"
																									type="checkbox"
																									class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
																							</div>
																							<div class="ml-3 text-sm">
																								<label for="candidates"
																									class="text-sm text-gray-700">I
																									grant permission for
																									my child to be in
																									the photos/videos
																									taken for
																									promotional
																									purposes/social
																									media/display on the
																									school
																									website</label>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</section>
												</div>
												<!-- Checkboxes (End)-->
												<div class="sm:col-span-6">
													<div class="flex items-center">
														<input id="terms" type="checkbox"
															class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
														<label for="terms"
															class="ml-2 block text-sm leading-5 text-gray-900">
															I agree to
															<a href="legal/tc"
																class="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150">
																terms & conditions. </a>
														</label>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
							<span class="inline-flex rounded-md shadow-sm">
								<button type="button"
									class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
							</span>
							<span class="inline-flex rounded-md shadow-sm">
								<button v-on:click="SignUp" type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-primary-900 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-primary active:bg-primary-700 transition duration-150 ease-in-out">Save</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
//const config = useRuntimeConfig()
export default {
	components: {},
	data() {
		return {
			isSignUpFormVisible: false,
			data: { "form-name": "SignUp" },
			api: "",
		};
	},
	methods: {
		async SignUp(args) {
			try {
				let request = {};
				const { data: SignUp } = await useFetch("/api/signup", {
					method: "post",
					body: this.data,
				});
				alert("Thank you for your enquiry! our customer success team will repond as soon as possible.");
				this.data = {};
				this.isSignUpFormVisible = !this.isSignUpFormVisible;
				//this.$toast.success("Thank you for your enquiry! our customer success team will repond as soon as possible.")
			} catch (error) {
				this.isSignUpFormVisible = !this.isSignUpFormVisible;
				//alert(JSON.stringify(error))
				//this.$toast.error(JSON.stringify(error))
			} finally {
			}
		},
		handleSelectedInProduct(data) {
			this.data.product = data;
		},
		handleSelectedInCountryCode(data) {
			this.data.country_code = data;
		},
	},
	computed: {},
	mounted() {
		this.$toast.add({
			severity: "info",
			summary: "Info Message",
			detail: "Message Content",
			life: 10000,
		});
	},
	created() {
		useNuxtApp().$bus.$on("evtShowSignUp", (data) => {
			this.isSignUpFormVisible = true;
		});
	},
	beforeDestroy() {
		useNuxtApp().$bus.$off("evtShowSignUp");
	},
};
</script>
