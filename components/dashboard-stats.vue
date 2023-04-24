<template>
	<div class="overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-4 sm:gap-px">
		<div v-for="(item, index) in stats.data"
			class="relative group bg-white border-gray-200 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
			<span class="rounded-lg inline-flex p-3 ring-4 ring-white" :class="item.iconBackground">
				<Icon :name="item.icon" class="h-6 w-6 flex-shrink-0" :class="item.iconForeground" />
			</span>
			<div class="mt-8">
				<h3 class="text-lg font-medium">
					<a href="#" class="focus:outline-none">
						<!-- Extend touch target to entire panel -->
						<span class="absolute inset-0" aria-hidden="true"></span>
						{{ item.name }}
					</a>
				</h3>
				<p class="mt-2 text-sm text-gray-500">{{ item.description }}</p>
			</div>
			<p class="ml-16 top-6 absolute text-2xl font-semibold text-gray-900">{{ item.value }}</p>
			<span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
				aria-hidden="true">
				<Icon name="heroicons:arrow-up-right-solid" class="h-6 w-6" />

			</span>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	api_end_point: {
		type: String,
		required: true
	},
})
const { data: stats } = await useAsyncData("stats_" + props.api_end_point, () => {
	return queryContent().where({ _path: props.api_end_point }).findOne()
})
</script>
