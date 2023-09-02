<template>
  <main class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6" :class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
        <h1>
          <span class="mt-1 p-1 block text-4xl space-y-6 font-bold tracking-tight sm:text-2xl xl:text-5xl">
            <span class="block text-gray-900">{{ primary_title }}</span>
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">{{ secondary_title }}</span>
          </span>
        </h1>
        <p class="mt-3 text-base text-gray-700 sm:mt-5 sm:text-sm lg:text-lg xl:text-lg">{{ app_hero_description }}</p>

        <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div class="hidden md:flex md:items-center md:space-x-6">
            <NuxtLink to="#" @click="useNuxtApp().$bus.$emit(`${primary_button.click_event}`)" class="px-5 py-2 text-md ring-2 hover:ring-2 text-white rounded-full transition-all duration-300" :class="[`bg-[${useThemeStore().palette('500')}]`, `hover:bg-[${useThemeStore().palette('700')}]`, `ring-[${useThemeStore().palette('500')}]`]"> {{ primary_button.name }}</NuxtLink>
            <NuxtLink to="#" @click="useNuxtApp().$bus.$emit(`${secondary_button.click_event}`)" class="px-5 py-2 text-md border border-transparent bg-white hover:text-white ring-2 rounded-full transition-all duration-300" :class="[`text-[${useThemeStore().palette('500')}]`, `hover:bg-[${useThemeStore().palette('700')}]`, `ring-[${useThemeStore().palette('500')}]`]"> {{ secondary_button.name }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
        <div class="relative mx-auto w-full rounded-lg lg:max-w-md">
          <template v-if="cover_image_video.href">
            <VideoPlayer :src="cover_image_video.href" />
          </template>
          <template v-else-if="cover_image_photo.href">
            <span class="sr-only">{{ cover_image_photo.name }}</span>
            <img class="w-full aspect-[4/3]" :src="cover_image_photo.href" :alt="cover_image_photo.name" />
          </template>
          <template v-else> no image </template>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useNavigationsStore } from '~/stores/navigations';
import { usePropertiesStore } from '~/stores/properties';
import { useThemeStore } from '~/stores/theme';

console.log('--------------------------------------->>>>>ZynomiHero.vue');
const data = usePropertiesStore().properties_by_parent_code('component-app-hero');
//console.log("data=",useFilter(data, { code: 'primary-title' })[0].name);
const primary_title = useFilter(data, { code: 'primary-title' })[0].name;
const secondary_title = useFilter(data, { code: 'secondary-title' })[0].name;
const app_hero_description = useFilter(data, { code: 'app-hero-description' })[0].name;
const navs = useNavigationsStore().navigatioins_by_module('application-hero');

const primary_button = useFilter(navs, { code: 'primary-button' })[0];
const secondary_button = useFilter(navs, { code: 'secondary-button' })[0];
const cover_image_video = useFilter(navs, { code: 'cover-image-video' })[0];
const cover_image_photo = useFilter(navs, { code: 'cover-image-photo' })[0];
//console.log("primary-title=", JSON.stringify(useFilter(data, {'code': 'primary-title'})[0].name))
//console.log(JSON.stringify(cover_image_video));
</script>
