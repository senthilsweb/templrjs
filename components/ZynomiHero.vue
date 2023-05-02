<template>
  <main class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6" :class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
        <h1>
          <span class="mt-1 p-1 block text-4xl space-y-6 font-bold tracking-tight sm:text-2xl xl:text-5xl">
            <span class="block text-gray-900">{{ primary_title }}</span>
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 ">{{ secondary_title }}</span>
          </span>
        </h1>
        <p class="mt-3 text-base text-gray-700 sm:mt-5 sm:text-sm lg:text-lg xl:text-lg">{{ app_hero_description }}</p>

        <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div class="hidden md:flex md:items-center md:space-x-6">
            <NuxtLink to="#" @click="useNuxtApp().$bus.$emit(`${primary_button.click_event}`)" class="px-5 py-2 text-md bg-primary-500 ring-2 hover:bg-primary-700 hover:ring-2 ring-primary-500 text-white rounded-full transition-all duration-300"> {{ primary_button.name }}</NuxtLink>
            <NuxtLink to="#" @click="useNuxtApp().$bus.$emit(`${secondary_button.click_event}`)" class="px-5 py-2 text-md border border-transparent bg-white ring-2 ring-primary-500 text-primary-600 hover:text-white hover:bg-primary-700 rounded-full transition-all duration-300"> {{ secondary_button.name }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
        <svg class="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden" width="640" height="784" fill="none" viewBox="0 0 640 784" aria-hidden="true">
          <defs>
            <pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
          <rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
        </svg>
        <div class="relative mx-auto w-full rounded-lg lg:max-w-md">
          <button type="button" class="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <span class="sr-only">{{ cover_image_video.href.name }}</span>
            <img class="w-full aspect-[4/3]" :src="cover_image_video.href" :alt="cover_image_video.href.name" />
            <!--<span class="absolute inset-0 flex h-full w-full items-center justify-center" aria-hidden="true">
            <svg class="h-20 w-20 text-yellow-500" fill="currentColor" viewBox="0 0 84 84">
              <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
              <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
            </svg>
          </span>-->
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';
import { useNavigationsStore } from '~/stores/navigations';
console.log("--------------------------------------->>>>>ZynomiHero.vue")
const data = usePropertiesStore().properties_by_parent_code('component-app-hero');
//console.log("data=",useFilter(data, { code: 'primary-title' })[0].name);
const primary_title = useFilter(data, { code: 'primary-title' })[0].name;
const secondary_title = useFilter(data, { code: 'secondary-title' })[0].name;
const app_hero_description = useFilter(data, { code: 'app-hero-description' })[0].name;
const navs = useNavigationsStore().navigatioins_by_module('application-hero');

const primary_button = useFilter(navs, { code: 'primary-button' })[0];
const secondary_button = useFilter(navs, { code: 'secondary-button' })[0];
const cover_image_video = useFilter(navs, { code: 'cover-image-video' })[0];

//console.log("primary-title=", JSON.stringify(useFilter(data, {'code': 'primary-title'})[0].name))
//console.log(JSON.stringify(cover_image_video));
</script>
