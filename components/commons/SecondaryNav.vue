<template>
  <!-- Secondary sidebar (Start)-->
  <nav aria-label="Sections" class="hidden flex-shrink-0 w-96 bg-white border-r border-primary-gray-200 xl:flex xl:flex-col">
    <div class="flex-shrink-0 justify-between space-x-3 h-16 px-6 border-b bg-gray-200 border-primary-200 flex items-center">
    
      <h2 class="text-lg leading-7 font-medium text-gray-700">{{ title }}</h2>
      <div class="h-7 flex items-center">
        <button aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
           <Icon name="icon-park-twotone:align-text-both-one" class="h-8 w-8 flex-shrink-0" />
        </button>
      </div>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto">
      <!-- Current: "bg-primary-50 bg-opacity-50", Default: "hover:bg-primary-50 hover:bg-opacity-50" -->
      <template v-for="menu in links.menu">
        <a :href="menu.href" v-on:click="useNuxtApp().$bus.$emit(`${menu.click_event}`)" class="flex p-6 border-b border-primary-200" :class="[menu.selected == true ? 'text-gray-900 bg-primary-50 bg-opacity-50' : 'text-gray-800', `hover:${menu.iconBackground}`]" aria-current="page">
          <Icon :name="menu.icon" class="h-6 w-6 flex-shrink-0 text-lime-800" />
          <div class="ml-3 text-sm">
            <p class="font-medium text-gray-900" :class="[menu.selected == true ? 'font-bold' : 'font-medium']">{{ menu.name }}</p>
            <p class="mt-1 text-gray-500">{{ menu.description }}</p>
          </div>
        </a>
      </template>
    </div>
  </nav>
</template>

<script setup>
import * as heroIcons from '@heroicons/vue/20/solid';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  api_end_point: {
    type: String,
    required: true,
  },
});
console.log(`links_${props.api_end_point}`)
const { data: links } = await useAsyncData(`links_${props.api_end_point}`, () => {
  return queryContent().where({ _path: props.api_end_point }).findOne();
});
console.log(links)
</script>
