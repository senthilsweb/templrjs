<template>
	<!--Main Menu (Start)-->
	<div class="space-x-8 md:flex">
		<div class="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-4">
			<a v-for="item in links.menu" :key="item.name" v-on:click="useNuxtApp().$bus.$emit(`${item.click_event}`)"
				:href="item.href"
				:class="['-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out bg-white', `hover:${item.iconBackground}`]">
				<div
					:class="[item.iconBackground, item.iconForeground, 'rounded-lg inline-flex p-3 ring-4 ring-white']">
					<component :is="heroIcons[item.icon]" class="h-6 w-6" aria-hidden="true" />
				</div>
				<div class="ml-4">
					<p class="text-xl font-bold text-gray-900">
						{{ item.name }}
					</p>
					<p class="mt-1 text-sm text-gray-400">{{ item.description }}</p>
				</div>
			</a>
		</div>
	</div>
	<!--Main Menu (End)-->
</template>
<script setup>
import * as heroIcons from "@heroicons/vue/20/solid";
const props = defineProps({
	title: {
		type: String,
		required: true
	},
	api_end_point: {
		type: String,
		required: true
	},
})

let path = (props.api_end_point != undefined) ? props.api_end_point : "/_masters-db/setups-link";

const { data: links } = await useAsyncData(path, () => {
	return queryContent().where({ _path: path }).findOne();
});


</script>




