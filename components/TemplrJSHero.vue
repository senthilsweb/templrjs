<template>
  <main class="mx-auto mt-8 max-w-7xl px-6 lg:mt-16 sm:px-0 lg:max-w-7xl mx-auto">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
        <h1>
          <span class="mt-1 p-1 block text-4xl space-y-6 font-bold tracking-tight sm:text-2xl xl:text-5xl">
            <span class="block text-gray-900">{{ hero.title.primary }}</span>
            <span
              class="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">{{
                hero.title.secondary }}</span>
          </span>
        </h1>
        <p class="mt-3 text-base text-gray-700 sm:mt-5 sm:text-sm lg:text-lg xl:text-lg">{{ hero.description }}</p>

        <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div class="hidden md:flex md:items-center md:space-x-6">
            <NuxtLink to="#" @click="useNuxtApp().$bus.$emit(`${hero.button.primary.click_event}`)"
              class="px-5 py-2 text-md ring-2 hover:ring-2 text-white rounded-full transition-all duration-300"
              :class="[`bg-[${useThemeStore().palette('500')}]`, `hover:bg-[${useThemeStore().palette('700')}]`, `ring-[${useThemeStore().palette('500')}]`]">
              {{ hero.button.primary.text }}</NuxtLink>
            <NuxtLink to="#" @click="useNuxtApp().$bus.$emit(`${hero.button.secondary.click_event}`)"
              class="px-5 py-2 text-md border border-transparent bg-white hover:text-white ring-2 rounded-full transition-all duration-300"
              :class="[`text-[${useThemeStore().palette('500')}]`, `hover:bg-[${useThemeStore().palette('700')}]`, `ring-[${useThemeStore().palette('500')}]`]">
              {{ hero.button.secondary.text }}</NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
        <div class="relative mx-auto w-full rounded-lg lg:max-w-md">
          <template v-if="hero.video.url && hero.video.weight > hero.image.weight">
            <VideoPlayer :src="hero.video.url" />
          </template>
          <template v-else-if="hero.image.url">
            <span class="sr-only">{{ hero.image.alt }}</span>
            <img class="w-full aspect-[4/3]" :src="hero.image.url" :alt="hero.image.alt" />
          </template>
          <template v-else> no image </template>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useThemeStore } from '~/stores/theme';

const props = defineProps({
  api_end_point: {
    type: String,
    required: true,
  },
});

let path = props.api_end_point != undefined ? props.api_end_point : '/configs/hero';
const result = await fetch(`https://www.senthilsweb.com/configs/hero.json`, {
  method: 'get',
});
const hero = await result.json();
//console.log('hero=', JSON.stringify(hero));

useNuxtApp().$bus.$on('evt_explore', async (args) => {
  document.location.href="/portfolio/healthbuddy"
});
</script>
  