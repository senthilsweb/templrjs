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
const api = "/api/employees/"; /*To-be customized for each entity */
const grid = useState("grid");

const mongo_query = useState("mongo_query", () => ({
	projection: {},
	filter: {},
	limit: 25,
}));

const gridRef = ref();

const { data: Employees } = await useAsyncData("Employees-list-" + Math.random, () =>
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
			{ data: (row) => row.last_name + ", " + row.first_name, name: "Name", width: "200px" },
			{ id: "email", name: "Email", width: "100px" },
			{ id: "client", name: "Client", width: "100px", hidden: true },
			{ id: "work_location", name: "Work Location", hidden: true },
			{ id: "mobile_phone", name: "Mobile", width: "100px", hidden: true },
			{ id: "department", name: "Department", hidden: false },
			{ id: "role", name: "Role", hidden: false },
			/*{
				id: "btnAssociateProject",
				name: "",
				formatter: (cell, row) => {
					return h(
						"button",
						{
							className: "inline-flex items-center rounded-full border border-transparent bg-primary-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
							onClick: () => useNuxtApp().$bus.$emit("evtUpsertClientAllocation", row),
						},
						"Allocation"
					);
				},
				sort: false,
				width: "50px",
			},
			{
				id: "btnRatings",
				name: "",
				formatter: (cell, row) => {
					return h(
						"button",
						{
							className: "inline-flex items-center rounded-full border border-transparent bg-primary-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
							onClick: () => useNuxtApp().$bus.$emit("evtRequestEmployeeFeedback", row),
						},
						"Feedback"
					);
				},
				sort: false,
				width: "50px",
			},*/
			{
				id: "btnEdit",
				name: "",
				formatter: (cell, row) => {
					return h(
						"button",
						{
							className: "inline-flex items-center rounded-full border border-transparent bg-lime-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
							onClick: () => useNuxtApp().$bus.$emit("evtUpsertEmployee", row),
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
		data: Employees._rawValue.documents,
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
			if (_.isString(args.name)) {
				let cond = {};
				cond["a"] = { first_name: { $regex: ".*" + args.name + ".*", $options: "i" } };
				cond["b"] = { last_name: { $regex: ".*" + args.name + ".*", $options: "i" } };
				filter["$or"] = [cond["a"], cond["b"]];
			}
			if (_.isString(args.client)) {
				filter["client"] = { $regex: ".*" + args.client + ".*", $options: "i" };
			}
			return filter;
		},
		/*Search [Employee]*/
		async searchEmployees() {
			this.progress = true;
			try {
				let employee_list = await useFetch("/api/employees", {
					method: "post",
					initialCache: false,
					body: {
						projection: useState("mongo_query").value.projection,
						filter: this.buildMongoQueryFilterCriteria(this.filter),
						limit: _.isNumber(this.filter.limit) ? parseInt(this.filter.limit) : 10000,
					},
				});
				setTimeout(() => {
					useState("grid").value.updateConfig({ data: employee_list.data._rawValue.documents }).forceRender();
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
		useNuxtApp().$bus.$on("evtSearchEmployee", (data) => {
			this.filter = data;
			this.searchEmployees();
		});
	},
};
</script>
