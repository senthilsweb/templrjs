<template>
	<section v-if="isUpsertUserVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title"
		role="dialog" aria-modal="true">
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true"></div>
			<div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
				<div class="w-screen max-w-md">
					<div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
						<div class="flex-1 h-0 overflow-y-auto">
							<header class="space-y-1 py-6 px-4 bg-gray-200 sm:px-6">
								<div class="flex items-center justify-between space-x-3">
									<h2 class="text-lg leading-7 font-medium text-gray-700">User</h2>
									<div class="h-7 flex items-center">
										<button v-on:click="closeUserPanel()" aria-label="Close panel"
											class="text-gray-600 hover:text-white transition ease-in-out duration-150">
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
								<div>
									<p class="text-sm leading-5 text-gray-500">Create or update User</p>
								</div>
							</header>
							<!--Progress bar (start)-->
							<div v-if="progress" class="flex-1 flex flex-col justify-between">
								<div class="space-y-6 pt-6 pb-5">
									<div class="flex justify-center">
										<span class="inline-flex">
											<button type="button"
												class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600">
												<!-- Heroicon name: solid/mail -->
												<svg class="-ml-1 mr-3 h-5 w-5 animate-spin"
													xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
													aria-hidden="true">
													<path class="opacity-75" fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
													</path>
												</svg>
												Processing...
											</button>
										</span>
									</div>
								</div>
							</div>
							<!--Progress bar (end)-->
							<!--alert message (start)-->
							<!--<Alert type="success w-full">User User has been saved successfully!...</Alert>-->
							<!--alert message (start)-->
							<div v-if="!progress" class="flex-1 flex flex-col justify-between">
								<div class="px-4 divide-y divide-gray-200 sm:px-6">
									<div class="space-y-6 pt-6 pb-5">
										<form name="frmUser" id="frmUser" class="space-y-8 divide-y divide-gray-200"
											@submit.prevent="SaveAndUpdate">
											<div class="sm:overflow-hidden">
												<div class="bg-white space-y-6">
													<div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
														<div class="sm:col-span-6">
															<label for="first_name"
																class="block text-sm font-medium text-gray-700">First
																Name</label>
															<div class="mt-1">
																<input type="text" id="first_name" name="first_name"
																	v-model="data.first_name"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="last_name"
																class="block text-sm font-medium text-gray-700">Last
																Name</label>
															<div class="mt-1">
																<input type="text" id="last_name"
																	name="branchNameArabic" v-model="data.last_name"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="email"
																class="block text-sm font-medium text-gray-700">Email</label>
															<div class="mt-1">
																<input type="text" id="email" name="email"
																	v-model="data.email"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div class="sm:col-span-6">
															<label for="mobile_phone"
																class="block text-sm font-medium text-gray-700">Mobile
																phone</label>
															<div class="mt-1">
																<input type="text" id="mobile_phone" name="mobile_phone"
																	v-model="data.mobile_phone"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="hand_phone"
																class="block text-sm font-medium text-gray-700">Hand
																phone</label>
															<div class="mt-1">
																<input type="text" id="hand_phone" name="hand_phone"
																	v-model="data.hand_phone"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div class="sm:col-span-6">
															<h2 class="text-lg font-medium text-gray-900">Login
																Information</h2>
														</div>

														<div class="sm:col-span-6">
															<label for="username"
																class="block text-sm font-medium text-gray-700">Username</label>
															<div class="mt-1">
																<input type="text" id="username" name="username"
																	v-model="data.username"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>
														<div class="sm:col-span-6">
															<label for="password"
																class="block text-sm font-medium text-gray-700">Password</label>
															<div class="mt-1">
																<input type="text" id="password" name="street"
																	v-model="data.password"
																	class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
														</div>

														<div class="sm:col-span-6">
															<h2 class="text-lg font-medium text-gray-900">Administration
															</h2>
														</div>

														<div class="sm:col-span-6">
															<Dropdownlist v-model="data.is_enabled"
																@selected_item="handleSelectedInUserStatus"
																name="is_enabled" label="Status" :data="{
	data: [
		{ code: 'true', name: 'Active' },
		{ code: 'false', name: 'In-active' },
	],
}" :selected_value="data.is_enabled" />
														</div>
														<div class="sm:col-span-6">
															<Dropdownlist v-model="data.mark_as_delete"
																@selected_item="handleSelectedInUserMarkAsDelete"
																name="mark_as_delete" label="Mark as delete?" :data="{
	data: [
		{ code: 'true', name: 'Yes' },
		{ code: 'false', name: 'No' },
	],
}" :selected_value="data.mark_as_delete" />
														</div>
														<div class="sm:col-span-6">
															<h2 class="text-lg font-medium text-gray-900">Roles</h2>
														</div>
														<div class="sm:col-span-6">
															<CheckBoxGroup
																class="bg-primary-100 py-2 shadow sm:rounded-lg"
																v-model="data.roles" @checked_item="handleCheckedRoles"
																name="roles" :data="{
	data: [
		{ code: 'guest', name: 'Guest' },
		{ code: 'admin', name: 'Administrator' },
		{ code: 'priest', name: 'Priest' },
		{ code: 'ec-member', name: 'Executive Member' },
	],
}" :checked_value="['guest']" />
														</div>
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
								<button v-on:click="upsertUser" type="submit"
									class="zyn-button">
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
 * UserUpsert.vue
 *
 * @description :: [sails._s.capitalize(table) ] form panel to handle Add New & Edit. Panel visible and hidden managed thru event subscription.
 *                 Additional events published to handle custom functions post "Save" operation.
 *
 * @author      :: Zynobot
 * @help        ::
 *
 * Created at   :: Sun Feb 27 2022 11:48:01 GMT-0500 (Eastern Standard Time)
 * Modified at  :: Sun Feb 27 2022 11:48:01 GMT-0500 (Eastern Standard Time)
 */
import { Calendar, DatePicker } from "v-calendar";
export default {
	components: {
		Calendar,
		DatePicker,
	},
	data() {
		return {
			isUpsertUserVisible: false,
			data: {},
			api: "",
			date: new Date(),
			progress: false,
		};
	},
	methods: {
		async upsertUser(args) {
			try {
				//console.log("_.isUndefined(this.data._id)=", this.data._id);
				this.data.location.coordinates[0] = parseFloat(this.data.location.coordinates[0]);
				this.data.location.coordinates[1] = parseFloat(this.data.location.coordinates[1]);
				if (this.data._id === undefined) {
					const { data: User } = await useFetch("/api/users/User", {
						method: "post",
						body: this.data,
					});
				} else {
					const { data: User } = await useFetch("/api/users/User/" + this.data._id, {
						method: "put",
						body: this.data,
					});
				}
				//this.data = {};
				this.isUpsertUserVisible = !this.isUpsertUserVisible;
				useNuxtApp().$bus.$emit("evtRefreshUserDatatable");
				//this.$toast.success("Record saved successfully");
			} catch (error) {
				console.log(error);
				//this.$toast.error("Oops!Save failed...");
			} finally {
			}
		},
		async deleteUser() {
			try {
				//Make sure to set the status and delete marker
				this.data.is_enabled = false;
				//end
				const { data: User } = await useFetch("/api/users/User/" + this.data._id, {
					method: "delete",
				});
				useNuxtApp().$bus.$emit("evtRefreshUserDatatable");
				//this.$toast.success("Record has been deleted successfully");
			} catch (error) {
				//this.$toast.error("Oops! delete failed...");
			} finally {
			}
		},
		async bindUser() {
			try {
			} catch (error) {
				console.log(error);
			}
		},
		async closeUserPanel() {
			this.data = {};
			this.isUpsertUserVisible = !this.isUpsertUserVisible;
		},

		handleSelectedInUserMarkAsDelete(data) {
			alert(data);
			this.data.mark_as_delete = data;
		},
		handleSelectedInUserStatus(data) {
			this.data.is_enabled = data;
		},
	},
	computed: {},
	mounted() {
		//this.$toast.success("Record saved successfully");
		//console.log(_.isString("moe"))
	},
	created() {
		useNuxtApp().$bus.$on("evtUpsertUser", (data) => {
			//alert(data)
			if (data !== undefined) {
				this.data = data;
			} else {
				//set default value
				this.data = {
					location: { type: "Point", coordinates: [0.0, 0.0] },
					address: { street: "", apartment: "", city: "", district: "", state: "", country: "", postalCode: "" },
				};
			}
			this.isUpsertUserVisible = !this.isUpsertUserVisible;
		});

		//2) Delete User record and then rebind datatable
		useNuxtApp().$bus.$on("evtDeleteUser", (data) => {
			if (data !== undefined) {
				this.data = data;
				this.deleteUser();
			}
		});
	},
	beforeDestroy() {
		useNuxtApp().$bus.$off("evtUpsertUser");
		useNuxtApp().$bus.$off("evtDeleteUser");
	},
};
</script>
