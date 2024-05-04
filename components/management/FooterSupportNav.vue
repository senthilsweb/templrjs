<template>


	<div class="flex justify-center space-x-4 md:order-2">
		<a v-for="item in navigation.menu" :key="item.name" :href="item.href"
			v-on:click="useNuxtApp().$bus.$emit(`${item.click_event}`)" class="text-gray-400 hover:text-gray-500">
			<span class="sr-only">{{ item.name }}</span>
			<Icon :name="item.icon" class="h-6 w-6" :alt="item.name" />
		</a>
	</div>



</template>
<script setup>
const props = defineProps({
	api_end_point: {
		type: String,
		required: true
	},
})

const { data: navigation } = await useAsyncData("links_" + props.api_end_point, () => {
	return queryContent().where({ _path: props.api_end_point }).findOne()
})




</script>
