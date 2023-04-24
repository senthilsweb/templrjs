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

<script setup>
import { Grid, h, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
const api = "/api/roles/"; /*To-be customized for each entity */
const grid = useState("grid");

const mongo_query = useState("mongo_query", () => ({
	projection: {},
	filter: {},
	limit: 25,
}));

const gridRef = ref();

const { data: Roles } = await useAsyncData("Roles-list-" + Math.random, () =>
	$fetch(api, {
		initialCache: false,
		method: "post",
		body: mongo_query.value,
		onResponse({ request, response, options }) {
			this.data = response._data.documents;
		},
	})
);

onMounted(() => {
	grid.value = new Grid({
		columns: [
			{ id: "_id", name: "Id.", hidden: true },
			{ id: "name", name: "Name", width: "100px" },
			{ id: "code", name: "Code", width: "100px" },
			{ id: "record_status", name: "Record status", hidden: true },
			{ id: "mark_as_delete", name: "Mark for deletion?", hidden: true },
			{
				name: "Status",
				data: (row) => {
					let bgcolor = row.record_status ? (row.record_status.toLowerCase() == "active" ? "text-blue-700 bg-blue-50" : "text-gray-800 bg-gray-50") : "";
					return h(
						"span",
						{
							className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium  ${bgcolor}`,
						},
						row.record_status
					);
				},
				sort: false,
				width: "25px",
			},
			{
				name: "Marked for delete?",
				data: (row) => {
					let bgcolor = row.mark_as_delete ? (row.mark_as_delete.toLowerCase() == "yes" ? "text-red-700 bg-red-50" : "") : "";
					return h(
						"span",
						{
							className: `inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium  ${bgcolor}`,
						},
						row.mark_as_delete ? (row.mark_as_delete.toLowerCase() == "yes" ? "Deleted" : "") : ""
					);
				},
				sort: false,
				width: "25px",
			},
			{
				id: "btnEdit",
				name: "",
				formatter: (cell, row) => {
					return h(
						"button",
						{
							className: "inline-flex items-center rounded-full border border-transparent bg-lime-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
							onClick: () => useNuxtApp().$bus.$emit("evtUpsertRole", row),
						},
						"Edit"
					);
				},
				sort: false,
				width: "50px",
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
		},
		search: true,
		fixedHeader: true,
		data: Roles._rawValue ? Roles._rawValue.documents : [],
	});
	grid.value.render(gridRef.value);
});
</script>
<script>
export default {
	components: {},
	data() {
		return {
			data: [],
			filter: {},
		};
	},
	methods: {
		/*To-be customized for each entity and your need*/
		buildMongoQueryFilterCriteria(args) {
			let filter = {};
			if (_.isString(args.name) && !useNuxtApp().$s.isBlank(args.name)) {
				filter["name"] = { $regex: ".*" + args.name + ".*", $options: "i" };
			}
			if (_.isString(args.record_status) && !useNuxtApp().$s.isBlank(args.record_status)) {
				filter["record_status"] = { $eq: args.record_status };
			}
			if (_.isString(args.mark_as_delete) && !useNuxtApp().$s.isBlank(args.mark_as_delete)) {
				filter["mark_as_delete"] = { $eq: args.mark_as_delete };
			}
			return filter;
		},
		/*Search [Role]*/
		async searchRoles() {
			this.progress = true;
			try {
				let consultant_list = await useFetch("/api/roles", {
					method: "post",
					initialCache: false,
					body: {
						projection: useState("mongo_query").value.projection,
						filter: this.buildMongoQueryFilterCriteria(this.filter),
						limit: _.isNumber(this.filter.limit) ? parseInt(this.filter.limit) : 10000,
					},
				});
				setTimeout(() => {
					useState("grid").value.updateConfig({ data: consultant_list.data._rawValue.documents }).forceRender();
					this.progress = false;
				}, 2000);
			} catch (err) {
				this.progress = false;
				useNuxtApp().$toast.show({
					type: "danger",
					message: err.message,
					timeout: 6,
				});
			}
		},
	},
	created() {
		useNuxtApp().$bus.$on("evtSearchRole", (data) => {
			this.filter = data;
			this.searchRoles();
		});
	},
};
</script>
