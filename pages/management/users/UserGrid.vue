<template>
	<div class="px-4 sm:px-4 lg:px-4">
		<div class="sm:flex sm:items-center">
			<!--Datatable action buttons (start)-->

			<!--right action buttons (start)-->

			<!--right action buttons (end)-->
			<!--Datatable action buttons (End)-->
		</div>
		<div class="mt-2 flex flex-col">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div ref="gridRef"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				data: [],
			};
		},
	};
</script>
<script setup>
	import {Grid, h} from "gridjs";
	import "gridjs/dist/theme/mermaid.css";
	const gridRef = ref();
	const slist = ref([]);
	const {data: Users} = await useAsyncData("Users-list-" + Math.random, () =>
		$fetch("/api/users", {
			initialCache: false,
			method: "post",
			body: {
				projection: {
					last_name: 1,
					first_name: 1,
					email: 1,
					mobile_phone: 1,
					hand_phone: 1,
					subscription: 1,
					roles: 1,
				},
				filter: {},
				limit: 500,
			},
		})
	);
	onMounted(() => {
		const grid = new Grid({
			columns: [
				{id: "_id", name: "Id.", hidden: true},
				{
					data: (row) => row.last_name + ", " + row.first_name,
					name: "Name",
					width: "200px",
				},
				{id: "email", name: "Email", width: "100px"},
				{id: "mobile_phone", name: "Mobile", width: "100px"},
				{
					data: (row) => row.roles.join(", "),
					name: "Roles",
					width: "200px",
				},
				{
					name: "Subscription",
					data: (row) => {
						let bgcolor = row.subscription.toLowerCase() == "free" ? "text-primary-700 bg-primary-50" : "text-blue-800 bg-blue-50";
						return h(
							"span",
							{
								className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium  ${bgcolor}`,
								//onClick: () => useNuxtApp().$bus.$emit("evtOpenSMSNotification", row),
							},
							row.subscription
						);
					},
					sort: false,
					width: "25px",
				},
			],
			sort: true,
			pagination: {
				enabled: true,
				limit: 25,
				summary: true,
			},
			className: {
				td: "whitespace-nowrap px-2 py-2 text-sm text-gray-500",
				table: "min-w-full divide-y divide-gray-300",
				thead: "bg-gray-50",
				th: "whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900",
				//tbody: 'divide-y divide-gray-200 bg-primary-200'
			},
			search: true,
			fixedHeader: true,
			height: "600px",
			data: Users._rawValue ? Users._rawValue.documents : [],
		});
		grid.render(gridRef.value);
	});
	//console.log("underscore=",_)
</script>
