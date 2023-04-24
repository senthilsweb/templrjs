<template>
	<section v-if="isUpsertClientAllocationVisible" class="fixed inset-0 overflow-hidden"
		aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true"></div>
			<div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
				<div class="w-screen max-w-md">
					<div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
						<div class="flex-1 h-0 overflow-y-auto">
							<header class="space-y-1 py-6 px-4 bg-primary-200 bg-opacity-50 sm:px-6">
								<div class="flex items-center justify-between space-x-3">
									<h2 class="text-lg leading-7 font-medium text-gray-700">Client/Project Allocation
									</h2>
									<div class="h-7 flex items-center">
										<button v-on:click="closeEmployeeAllocationPanel()" aria-label="Close panel"
											class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
											<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
								<div>
									<p class="text-sm leading-5 text-gray-500">Manage client and project allocations</p>
									{{ allocations }}
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
							<div class="w-full max-w-md px-2 sm:px-0">
								<TabGroup @change="changeTab">
									<TabList class="flex space-x-1 bg-blue-900/20 p-1">
										<Tab v-for="category in Object.keys(categories)" as="template" :key="category"
											v-slot="{ selected }">
											<button
												:class="['w-full py-2.5 text-sm font-medium leading-5 text-blue-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white']">
												{{ category }}
											</button>
										</Tab>
									</TabList>

									<TabPanels class="mt-2">
										<TabPanel v-for="(posts, idx) in Object.values(categories)" :key="idx"
											:class="['bg-white p-3', '']">
											<ul>
												<li v-for="post in posts" :key="post.id"
													class="relative rounded-md p-3 hover:bg-gray-100">
													<h3 class="text-sm font-medium leading-5">
														{{ post.role }}
													</h3>

													<ul
														class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
														<li>{{ post.start_date }}</li>
														<li>-</li>
														<li>{{ post.end_date }}</li>
														<li>&middot;</li>
														<li>{{ post.location }}</li>
													</ul>

													<a href="#"
														:class="['absolute inset-0 rounded-md', 'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2']" />
												</li>
											</ul>
										</TabPanel>
									</TabPanels>
								</TabGroup>
							</div>

							<div v-if="!past_tab">
								<div v-if="!progress" class="flex-1 flex flex-col justify-between">
									<div class="px-4 divide-y divide-gray-200 sm:px-6">
										<div class="space-y-6 pt-6 pb-5">
											<form name="frmEmployee" id="frmEmployee"
												class="space-y-8 divide-y divide-gray-200"
												@submit.prevent="upsertEmployeeAllocation">
												<div class="sm:overflow-hidden">
													<div class="bg-white space-y-6">
														<div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
															<!--Profile Card (Start)-->
															<div class="sm:col-span-6">
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
																			<div class="space-y-1 leading-6">
																				<h3 class="text-xl font-bold">{{
		data.last_name + "," +
		data.first_name
}}</h3>
																				<p class="text-primary-600">{{ data.role
}}</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!--Profile Card (End)-->

															<!--Hidden control (start)-->

															<!--Hidden control (end)-->
															<div class="sm:col-span-6">
																<h2 class="font-medium text-blue-gray-900">
																	Client/Project Information</h2>
															</div>
															<div class="sm:col-span-6">
																<Dropdownlist :data="{ data: clients.documents }"
																	v-on:change="handleSelectedInEmployeeClient"
																	v-model="allocation.client" show_label="true"
																	name="client" label="Client"
																	:selected_value="data.allocations[0].client" />
															</div>
															<div class="sm:col-span-6">
																<Dropdownlist :key="useState('componentKey').value"
																	:data="{ data: useState('managers').value.documents }"
																	v-on:change="handleSelectedInEmployee_client_reporting_manager"
																	v-model="data.allocations[0].client_reporting_manager"
																	show_label="true" name="client_reporting_manager"
																	label="Client Reporting Manager"
																	:selected_value="data.allocations[0].client_reporting_manager" />
															</div>
															<div class="sm:col-span-6">
																<label for="percentage_allocation"
																	class="block text-sm font-medium text-gray-700">Percentage
																	(%) Allocation</label>
																<div class="mt-1">
																	<input type="text" id="percentage_allocation"
																		name="percentage_allocation"
																		v-model="data.allocations[0].percentage_allocation"
																		class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
																</div>
															</div>
															<div class="sm:col-span-6">
																<label for="work_location"
																	class="block text-sm font-medium text-gray-700">Work
																	Location </label>
																<div class="mt-1">
																	<input type="text" id="work_location"
																		name="work_location"
																		v-model="data.allocations[0].work_location"
																		class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
																</div>
															</div>
															<div class="sm:col-span-6">
																<label for="first_name"
																	class="block text-sm font-medium text-gray-700 pb-1">Duration</label>
																<ClientOnly>
																	<DatePicker
																		v-model="data.allocations[0].assignment_duration"
																		:columns="2" color="teal" is-range>
																		<template v-slot="{ inputValue, inputEvents }"
																			class="z-40">
																			<div
																				class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
																				<input type="text"
																					class="py-3 block w-full focus:ring-lime-600 focus:border-lime-600 border-gray-300"
																					id="allocationDateRangeStart"
																					name="allocationDateRangeStart"
																					:value="inputValue.start"
																					v-on="inputEvents.start" />
																				<input type="text"
																					class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300"
																					id="allocationDateRangeEnd"
																					name="allocationDateRangeEnd"
																					:value="inputValue.end" readonly />
																			</div>
																		</template>
																	</DatePicker>
																</ClientOnly>
															</div>
															<div class="sm:col-span-3 mt-1">
																<label for="billable"
																	class="block text-sm font-medium text-gray-700">Billable</label>
															</div>
															<div class="sm:col-span-3">
																<div class="mt-1">
																	<Switch v-model="data.allocations[0].billable"
																		:class="data.billable ? 'bg-primary-900' : 'bg-primary-700'"
																		class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
																		<span class="sr-only">Billable</span>
																		<span aria-hidden="true"
																			:class="data.allocations[0].billable ? 'translate-x-9' : 'translate-x-0'"
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
								<button v-on:click="upsertEmployeeAllocation" type="submit"
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
import { Calendar, DatePicker } from "v-calendar";
let api = "/api/employees/";
let api_allocations = "/api/employees/allocations/";
export default {
	components: {
		Calendar,
		DatePicker,
	},
	data() {
		return {
			isUpsertClientAllocationVisible: false,
			isDeleteButtonVisible: false,
			allocation: {},
			data: {},
			date: new Date(),
			progress: false,
		};
	},
	methods: {
		/*Get a single employee*/
		getEmployee(id) {
			this.progress = true;
			const { data: employee } = useFetch("api/mongodb/query/aggregate", {
				method: "post",
				initialCache: false,
				body: { collection: "vwEmployees", pipeline: [{ $match: { _id: { $oid: id } } }] },
			});
			watch(employee, () => {
				console.log("employee", employee._rawValue);
				//alert(employee._rawValue.document);
				this.data = employee._rawValue.documents[0];
				this.progress = false;
			});
		},
		getEmployeeAllocations(emp_id) {
			//this.progress = true;
			useAsyncData("allocations-list-" + Math.random, () =>
				$fetch(api_allocations, {
					initialCache: false,
					method: "post",
					body: { collection: "allocations", projection: {}, filter: { emp_id: { $eq: emp_id } }, limit: 100 },
					onResponse({ request, response, options }) {
						if (response._data.documents) {
							console.log("allocations=", response._data);
							this.allocation = response._data.documents[0];
							//alert(response._data.documents[0]);
						}
						this.progress = false;
					},
				})
			);
		},
		async filterClientManagers(client) {
			await useAsyncData("client_managers-list-" + Math.random, () =>
				$fetch("/api/contacts", {
					initialCache: false,
					method: "post",
					body: { collection: "contacts", projection: { _id: 1, client: 1, name: 1, first_name: 1, last_name: 1, code: "$_id" }, filter: { client: { $eq: client } }, limit: 10000 },
					onResponse({ request, response, options }) {
						useState("managers").value = response._data;
						useState("componentKey").value += 1; //This will force the control to rerender inorder to update with the new "data"
						//console.log("response=", JSON.stringify(response._data));
					},
				})
			);
		},
		/*Add a new employee or Update an existing employee*/
		async upsertEmployeeAllocation(args) {
			try {
				this.progress = true;
				if (this.allocation.emp_id === undefined) {
					this.allocation.emp_id = this.data._id;
					//dayjs.utc()
					this.data.createdAt = useNuxtApp().$dayjs().utc();
					this.data.updatedAt = useNuxtApp().$dayjs().utc();
					const { data: res } = await useFetch(api_allocations + "create", {
						method: "post",
						body: this.allocation,
						initialCache: false,
						onResponse({ request, response, options }) {
							if (response._data.insertedId) {
								useNuxtApp().$toast.show({ type: "success", message: `Allocation [${response._data.insertedId}] added successfully`, timeout: 6 });
							}
						},
					});
				} else {
					const { data: res } = await useFetch(api_allocations + this.data._id, {
						method: "put",
						//body: _.omit(this.allocation, "_id"), //omit the mongo object id before the upsert
						initialCache: false,
						onResponse({ request, response, options }) {
							//console.log("Updated employee", JSON.stringify(response));
						},
					});
				}
				this.progress = false;

				this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
			} catch (error) {
				console.log(error);
				this.progress = false;
			} finally {
			}
		},
		/*Delete a employee */
		async deleteClientAllocation() {
			try {
				await useFetch(api_allocations + this.data._id, {
					method: "delete",
					body: {},
					initialCache: false,
					onResponse({ request, response, options }) {
						if (response._data.deletedCount == 1) {
							//console.log("deletedCount = ", response._data.deletedCount);
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
						//useNuxtApp().$bus.$emit("evtSearchEmployee", {filter: {}, limit: 10});
						//this.allocation = {};
						this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
					},
				});
			} catch (error) {
				//TODO
			} finally {
				//TODO
			}
		},
		async closeEmployeeAllocationPanel() {
			this.data = {};
			this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
		},

		handleSelectedInEmployeeClient(e) {
			this.allocation.client = e.target.value;
			this.filterClientManagers(this.allocation.client);
		},
		handleSelectedInEmployee_client_reporting_manager(e) {
			this.allocation.client_reporting_manager = e.target.value;
		},
	},
	created() {
		useNuxtApp().$bus.$on("evtUpsertClientAllocation", (data) => {
			//alert(JSON.stringify(data));

			this.getEmployeeAllocations(data._cells[0].data);
			this.getEmployee(data._cells[0].data);
			/*This is for date range control initialization (start) */
			const date = ref(new Date());
			date.value.setDate(Number(new Date().getDate()) + 35);
			/*this.allocation.assignment_duration = {
				start: new Date(),
				end: date.value,
			};*/
			/*This is for date range control initialization (end) */
			if (data._cells[3].data) {
				this.filterClientManagers(data._cells[3].data);
			}
			this.isUpsertClientAllocationVisible = !this.isUpsertClientAllocationVisible;
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
		useNuxtApp().$bus.$off("evtUpsertClientAllocation");
		useNuxtApp().$bus.$off("evtDeleteEmployee");
	},
};
</script>
<script setup>
import { Switch } from "@headlessui/vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const past_tab = ref(false);
let componentKey = useState("componentKey", () => ref(0));
let managers = useState("managers");

//const managers_filtered = useState("managers_filtered");
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

//Get server side master data for roles
const { data: client_managers } = await useAsyncData("client_managers-list-" + Math.random, () =>
	$fetch("/api/contacts", {
		initialCache: false,
		method: "post",
		body: { collection: "contacts", projection: { _id: 1, client: 1, name: 1, first_name: 1, last_name: 1, code: "$_id" }, filter: {}, limit: 10000 },
		onResponse({ request, response, options }) {
			//console.log(response._data.documents);
		},
	})
);

useState("managers").value = client_managers;
let managers_filtered = client_managers;
const categories = ref({
	Current: [],
	Past: [
		{
			id: 1,
			title: "Is tech making coffee better or worse?",
			date: "Jan 7",
			commentCount: 29,
			shareCount: 16,
			role: "Mobile application developer",
			start_date: "14-JAN-2022",
			end_date: "22-SEP-2022",
			location: "Tampa, FL",
		},
		{
			id: 1,
			title: "Is tech making coffee better or worse?",
			date: "Jan 7",
			commentCount: 29,
			shareCount: 16,
			role: "IOS Architect",
			start_date: "23-SEP-2022",
			end_date: "CURRENT",
			location: "Tucson, AZ",
		},
	],
});

function changeTab(index) {
	//alert(index);
	console.log("Changed active tab to:", index);
	past_tab.value = index == 1 ? true : false;
}
</script>
