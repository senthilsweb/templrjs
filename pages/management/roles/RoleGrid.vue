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
	const {data: Roles} = await useAsyncData("Roles-list-" + Math.random, () =>
		$fetch("/api/roles", {
			initialCache: false,
			method: "post",
			body: {
				projection: {
					name: 1,
					code: 1,
					status: 1,
					mark_as_delete: 1,
				},
				filter: {},
				limit: 500,
			},
		})
	);

	onMounted(() => {
		console.log("Roles=", Roles._rawValue);
		const grid = new Grid({
			columns: [
				{id: "_id", name: "Id.", hidden: true},
				{id: "code", name: "Code", width: "100px"},
				{id: "name", name: "Name", width: "100px"},
				{
					name: "Status",
					data: (row) => {
						let bgcolor = row.status.toLowerCase() == "active" ? "bg-red-300" : "bg-emerald-300";
						return h(
							"span",
							{
								className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-gray-700 ${bgcolor}`,
								onClick: () => useNuxtApp().$bus.$emit("evtOpenSMSNotification", row),
							},
							row.status
						);
					},
					sort: true,
					width: "100px",
				},
				{
					name: "Marked as delete?",
					data: (row) => (row.mark_as_delete ? "Yes" : "No"),
					sort: false,
					width: "100px",
				},
			],
			sort: true,
			pagination: {
				enabled: true,
				limit: 25,
				summary: true,
			},
			className: {
				td: "whitespace-nowrap px-2 text-sm text-gray-500",
				table: "min-w-full divide-y divide-gray-300",
				thead: "bg-gray-50",
				th: "whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900",
				//tbody: 'divide-y divide-gray-200 bg-primary-200'
			},
			search: true,
			fixedHeader: true,
			resizable: true,
			data: Roles._rawValue.documents,
		});
		grid.render(gridRef.value);
	});
</script>
