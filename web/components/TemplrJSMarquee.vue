<template>
  <div class="py-12 sm:py-24 px-4 lg:px-0 rounded-3xl rounded-t-none -mt-4 relative text-gable-green bg-white" style="z-index: 6">
    <div class="m-auto max-w-screen-xl">
      <div class="flex flex-col lg:flex-row justify-between items-baseline">
        <h2 class="text-3xl text-zinc-600 font-bold w-full mb-4 md:mb-0 lg:w-6/12">Technology Stack</h2>
        <a class="inline-flex text-lg font-normal text-gable-green gap-2 whitespace-nowrap items-center hover:text-blurple" href="#">See full list of Technology Stack</a>
      </div>
      <div class="w-full overflow-hidden index mt-6 md:mt-12" style="mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%); -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%)">
        <div class="flex whitespace-nowrap relative">
          <div class="gap-2 flex-shrink-0 grid relative grid-rows-1 grid-flow-col items-center justify-items-center min-w-full" style="animation: carouselspin 40s linear infinite">
            <span v-for="item in links.data._rawValue.menu" :key="item.name" class="text-xl font-bold text-zinc-400 mx-4">
              <Icon :name="item.icon" class="h-10 w-10" />
              {{ item.name }}
            </span>
          </div>
          <div class="gap-2 flex-shrink-0 grid relative grid-rows-1 grid-flow-col items-center justify-items-center min-w-full" style="animation: carouselspin 40s linear infinite">
            <span v-for="item in links.data._rawValue.menu" :key="item.name" class="text-xl font-bold text-zinc-400 mx-4">
              <Icon :name="item.icon" class="h-10 w-10" />
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as heroIcons from '@heroicons/vue/20/solid';
const props = defineProps({
  api_end_point: {
    type: String,
    required: true,
  },
});

let path = props.api_end_point != undefined ? props.api_end_point : '/configs/tech-stack';


const links = await useFetch(`${path}.json`, {
  method: 'get',
});

</script>
<style>
@keyframes carouselspin {
  0% {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
