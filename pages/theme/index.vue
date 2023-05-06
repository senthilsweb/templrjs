<script setup>
import { useThemeStore } from '~/stores/theme';
definePageMeta({});

async function updateTheme(color) {
  console.log("The theme color is ", useThemeStore().getPrimaryColor);
  console.log("Setting theme color to ", color);
  useThemeStore().setPrimary(color);
  console.log("The theme color is ", useThemeStore().getPrimaryColor);
}
</script>

<template>
  <NuxtLayout name="landing">
    <!--Main Content (Start)-->
    <div class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <header class="relative isolate pt-16">
          <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
              <div class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]" style="clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)" />
            </div>
            <div class="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
          </div>
          <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-teal-100">
            <div class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
            Theme color is : {{ useThemeStore().getPrimaryColor }}
            </div>
          </div>
        </header>
        <!--Color Picker-->
        <div class="flex items-center justify-center p-8">
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-4">
            <a href="#" @click="updateTheme('green')"><span class="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-md font-medium text-green-400 ring-2 ring-inset ring-green-500/20">Green</span></a>
            <a href="#" @click="updateTheme('blue')"><span class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-md font-medium text-blue-400 ring-2 ring-inset ring-blue-400/30">Blue</span></a>
            <a href="#" @click="updateTheme('indigo')"><span class="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-md font-medium text-indigo-400 ring-2 ring-inset ring-indigo-400/30">Indigo</span></a>
            <a href="#" @click="updateTheme('purple')"><span class="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-md font-medium text-purple-400 ring-2 ring-inset ring-purple-400/30">Purple</span></a>
            <a href="#" @click="updateTheme('pink')"><span class="inline-flex items-center rounded-md bg-pink-500/10 px-2 py-1 text-md font-medium text-pink-400 ring-2 ring-inset ring-pink-400/20">Pink</span></a>
            <a href="#" @click="updateTheme('yellow')"><span class="inline-flex items-center rounded-md bg-yellow-500/10 px-2 py-1 text-md font-medium text-yellow-400 ring-2 ring-inset ring-yellow-400/20">Yellow</span></a>
            <a href="#" @click="updateTheme('orange')"><span class="inline-flex items-center rounded-md bg-orange-500/10 px-2 py-1 text-md font-medium text-orange-400 ring-2 ring-inset ring-orange-400/20">Orange</span></a>
            <a href="#" @click="updateTheme('teal')"><span class="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-1 text-md font-medium text-teal-400 ring-2 ring-inset ring-teal-400/20">Teal</span></a>
            <a href="#" @click="updateTheme('cyan')"><span class="inline-flex items-center rounded-md bg-cyan-500/10 px-2 py-1 text-md font-medium text-cyan-400 ring-2 ring-inset ring-cyan-400/20">Cyan</span></a>
          </div>
        </div>
      </div>
    </div>

    <!--Main Content (End)-->
  </NuxtLayout>
</template>
