<template>
  <!--Main Menu (Start)-->
  <!--Main Menu (End)-->
  <h2 class="text-4xl font-extrabold text-white text-center pt-8">
    <!--Build faster and focus on your Business Process-->
    Integration Channels
  </h2>
  <div class="relative flex overflow-x-hidden">
    <div class="py-8 animate-marquee whitespace-nowrap">
      <span v-for="item in links.menu" :key="item.name" class="text-xl font-bold text-gray-100 mx-4">
        <Icon :name="item.icon" class="h-10 w-10" />
        {{ item.name }}
      </span>
    </div>
    <div class="absolute top-0 py-8 animate-marquee2 whitespace-nowrap">
      <span v-for="item in links.menu" :key="item.name" class="text-xl font-bold text-gray-100 mx-4">
        <Icon :name="item.icon" class="h-10 w-10" />
        {{ item.name }}
      </span>
    </div>
  </div>
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

let path = props.api_end_point != undefined ? props.api_end_point : '/masters-db/setups-link';

const { data: links } = await useAsyncData(path, () => {
  return queryContent().where({ _path: path }).findOne();
});
</script>