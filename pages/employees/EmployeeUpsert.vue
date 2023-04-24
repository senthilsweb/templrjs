<template>
	<section v-if="isUpsertEmployeeVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title"
		role="dialog" aria-modal="true">
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true"></div>
			<div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
				<div class="w-screen max-w-md">
					<div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
						<div class="flex-1 h-0 overflow-y-auto">
							<header class="space-y-1 py-6 px-4 bg-primary-200 bg-opacity-50 sm:px-6">
								<div class="flex items-center justify-between space-x-3">
									<h2 class="text-lg leading-7 font-medium text-gray-700">Employee</h2>
									<div class="h-7 flex items-center">
										<button v-on:click="closeEmployeePanel()" aria-label="Close panel"
											class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
								<div>
									<p class="text-sm leading-5 text-gray-500">Create or update Employee {{
		data.billable
}}</p>
								</div>
							</header>
							<!--Progress bar (start)-->
							<div v-if="progress" class="flex-1 flex flex-col justify-between">
								<div class="space-y-6 pt-6 pb-5">
									<div class="flex justify-center">
										<span class="inline-flex">
											<button type="button"
												class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600">
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
							<div v-if="!progress" class="flex-1 flex flex-col justify-between">
								<div class="px-4 divide-y divide-gray-200 sm:px-6">
									<div class="space-y-6 pt-6 pb-5">
										<form name="frmEmployee" id="frmEmployee"
											class="space-y-8 divide-y divide-gray-200" @submit.prevent="upsertEmployee">
											<div class="sm:overflow-hidden">
												<div class="bg-white space-y-6">
													<div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
														<!--Profile Card (Start)-->
														<div v-if="isDeleteButtonVisible" class="sm:col-span-6">
															<div
																class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
																<div v-if="data.profile_picture"
																	class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
																	<img class="rounded-lg object-cover shadow-lg"
																		:src="data.profile_picture"
																		:alt="data.last_name + ' ' + data.first_name" />
																</div>
																<div v-else
																	class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
																	<img class="rounded-lg object-cover shadow-lg"
																		src="https://via.placeholder.com/100.png"
																		alt="Placeholder image" />
																</div>

																<div v-if="data.first_name" class="sm:col-span-2">
																	<div class="space-y-4">
																		<div
																			class="space-y-1 text-lg font-medium leading-6">
																			<h3>{{ data.last_name + "," +
		data.first_name
}}</h3>
																			<p class="text-primary-600">{{ data.role }}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<!--Profile Card (End)-->
														<div class="sm:col-span-6">
															<h2 class="font-medium text-blue-gray-900">Personal
																Information</h2>
														</div>
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
															<label for="last_name"
																class="block text-sm font-medium text-gray-700">Picture
															</label>
															<div class="mt-1">
																<input type="text" id="profile_picture"
																	name="profile_picture"
																	v-model="data.profile_picture"
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
															<h2 class="font-medium text-blue-gray-900">Professional
																Information</h2>
														</div>
														<div class="sm:col-span-6">
															<Dropdownlist :data="{ data: departments.documents }"
																v-on:change="handleSelectedInEmployeeDepartment"
																v-model="data.department" show_label="true"
																name="department" label="Department"
																:selected_value="data.department" />
														</div>
														<div class="sm:col-span-6">
															<Dropdownlist :data="{ data: roles.documents }"
																v-on:change="handleSelectedInEmployeeRole"
																v-model="data.role" show_label="true" name="role"
																label="Role" :selected_value="data.role" />
														</div>
														<div class="sm:col-span-6">
															<h2 class="font-medium text-blue-gray-900">Client/Project
																Information</h2>
														</div>
														<div class="sm:col-span-6">
															<Dropdownlist :data="{ data: clients.documents }"
																v-on:change="handleSelectedInEmployeeClient"
																v-model="data.client" show_label="true" name="client"
																label="Client" :selected_value="data.client" />
														</div>
														<div class="sm:col-span-3 mt-1">
															<label for="billable"
																class="block text-sm font-medium text-gray-700">Billable</label>
														</div>
														<div class="sm:col-span-3">
															<div class="mt-1">
																<Switch v-model="data.billable"
																	:class="data.billable ? 'bg-primary-900' : 'bg-primary-700'"
																	class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
																	<span class="sr-only">Billable</span>
																	<span aria-hidden="true"
																		:class="data.billable ? 'translate-x-9' : 'translate-x-0'"
																		class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
																</Switch>
															</div>
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
							<span v-if="isDeleteButtonVisible" class="inline-flex rounded-md shadow-sm">
								<button v-on:click="useNuxtApp().$bus.$emit('evtDeleteEmployee', data)" type="button"
									class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button>
							</span>
							<span class="inline-flex rounded-md shadow-sm">
								<button v-on:click="upsertEmployee" type="submit"
									class="zyn-button">Save</button>
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
 * EmployeeUpsert.vue
 *
 * @description ::
 *
 * @author      :: Zynobot
 * @help        ::
 *
 * Created at   ::
 * Modified at  ::
 */
import { Calendar, DatePicker } from "v-calendar";
let api = "/api/employees/";
export default {
	components: {
		Calendar,
		DatePicker,
	},
	data() {
		return {
			isUpsertEmployeeVisible: false,
			isDeleteButtonVisible: false,
			data: {},
			date: new Date(),
			progress: false,
		};
	},
	methods: {
		/*Get a single employee*/
		getEmployee(id) {
			this.progress = true;
			const { data: employee } = useFetch(api + id, {
				method: "post",
				initialCache: false,
				onResponse({ request, response, options }) {
					//console.log("Response from promise", response._data.document);
					this.data = response._data.document;
					this.progress = false;
				},
			});
			watch(employee, () => {
				//console.log("Response from watch");
				//console.log("employee=>", employee._rawValue.document);
				this.data = employee._rawValue.document;
				this.isDeleteButtonVisible = true;
				this.progress = false;
			});
		},
		/*Add a new employee or Update an existing employee*/
		async upsertEmployee(args) {
			try {
				this.progress = true;
				if (this.data._id === undefined) {
					//dayjs.utc()
					this.data.createdAt = useNuxtApp().$dayjs().utc();
					this.data.updatedAt = useNuxtApp().$dayjs().utc();
					const { data: res } = await useFetch(api + "create", {
						method: "post",
						body: this.data,
						initialCache: false,
						onResponse({ request, response, options }) {
							if (response._data.insertedId) {
								useNuxtApp().$toast.show({ type: "success", message: `Employee [${response._data.insertedId}] added successfully`, timeout: 6 });
							}
						},
					});
				} else {
					const { data: res } = await useFetch(api + this.data._id, {
						method: "put",
						body: _.omit(this.data, "_id"), //omit the mongo object id before the upsert
						initialCache: false,
						onResponse({ request, response, options }) {
							//console.log("Updated employee", JSON.stringify(response));
						},
					});
				}
				this.progress = false;
				useNuxtApp().$bus.$emit("evtSearchEmployee", { filter: {}, limit: 10 });
				this.data = {};
				this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
			} catch (error) {
				console.log(error);
				this.progress = false;
			} finally {
			}
		},
		/*Delete a employee */
		async deleteEmployee() {
			try {
				await useFetch("/api/employees/" + this.data._id, {
					method: "delete",
					body: {},
					initialCache: false,
					onResponse({ request, response, options }) {
						if (response._data.deletedCount == 1) {
							console.log("deletedCount = ", response._data.deletedCount);
							useNuxtApp().$toast.show({
								type: "success",
								message: "Delete was successful",
								timeout: 6,
							});
						} else {
							useNuxtApp().$toast.show({
								type: "error",
								message: "The delete failed...",
								timeout: 6,
							});
						}
						this.progress = false;
						useNuxtApp().$bus.$emit("evtSearchEmployee", { filter: {}, limit: 10 });
						this.data = {};
						this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
					},
				});
			} catch (error) {
				//TODO
			} finally {
				//TODO
			}
		},
		async closeEmployeePanel() {
			this.data = {};
			this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
		},
		handleSelectedInEmployeeDepartment(e) {
			this.data.department = e.target.value;
		},
		handleSelectedInEmployeeRole(e) {
			this.data.role = e.target.value;
		},
		handleSelectedInEmployeeClient(e) {
			this.data.client = e.target.value;
		},
	},
	created() {
		useNuxtApp().$bus.$on("evtUpsertEmployee", (data) => {
			if (data !== undefined) {
				this.getEmployee(data._cells[0].data);
			} else {
				this.data.billable = ref(false);
			}
			this.isUpsertEmployeeVisible = !this.isUpsertEmployeeVisible;
		});
		//2) Delete Employee record and then rebind datatable
		useNuxtApp().$bus.$on("evtDeleteEmployee", (data) => {
			if (data !== undefined) {
				this.data = data;
				this.deleteEmployee();
			}
		});
	},
	beforeDestroy() {
		useNuxtApp().$bus.$off("evtUpsertEmployee");
		useNuxtApp().$bus.$off("evtDeleteEmployee");
	},
};
</script>
<script setup>
import { Switch } from "@headlessui/vue";
//Get server side master data for departments
const { data: departments } = await useAsyncData("departments-list-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "departments", projection: {}, filter: {}, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);
//Get server side master data for roles
const { data: roles } = await useAsyncData("roles-list-" + Math.random, () =>
	$fetch("/api/generic", {
		initialCache: false,
		method: "post",
		body: { collection: "roles", projection: {}, filter: {}, limit: 10000 },
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
