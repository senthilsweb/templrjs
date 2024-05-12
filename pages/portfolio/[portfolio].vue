<template>
  <NuxtLayout name="landing">
    <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2">
      <div class="hidden lg:relative lg:block lg:flex-none">
        <div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden"></div>
        <div class="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block"></div>
        <div class="absolute top-28 bottom-0 right-0 hidden w-px bg-gray-800 dark:block"></div>
        <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7 pl-6 pr-6">
              <li>
                <ul role="list" id="ul_nav" class="-mx-2 space-y-1">
                  <li v-for="(item, idx) in parsedNavigation" :key="item.name">
                    <a v-if="!item.children" @click="goto(`${item.href}`, idx)" href="#" :id="item.href"
                      :class="['hover:bg-gray-100', 'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700']">{{
                        item.name }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="min-w-0 max-w-2xl flex-auto px-4 py-8 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <header>
            <dl class="flex items-center justify-between p-4">
              <div @click="paginate(`${useState('prev_shot_name').value}`)" class="cursor-pointer">
                <dt
                  class="inline-flex items-center gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                  ← Previous
                </dt>
                <!--<dd
                  class="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300">
                  {{ useState('prev_shot_name').value }}
                </dd>-->
              </div>

              <!-- This is the centered text -->
              <div class="flex-grow text-center">
                <a href="#" class="underline decoration-pink-500 text-lg font-medium">{{useState('active_shot_name').value}}</a>
              </div>

              <div @click="paginate(`${useState('next_shot_name').value}`)" class="cursor-pointer text-right">
                <dt
                  class="inline-flex items-center gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                  Next →
                </dt>
                <!--<dd
                  class="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300">
                  {{ useState('next_shot_name').value }}
                </dd>-->
              </div>
            </dl>
          </header>



          <!-- 
            The credit for this design goes to Tailwindlabs.
            https://www.youtube.com/watch?v=eSzNNYk7nVU
            https://play.tailwindcss.com/kY4LYXwsNZ
           -->
          <!-- iOS 15 Notification Summary -->
          <div class="grid place-items-center mt-8">
            <!-- The iPhone shell -->
            <div
              class="mx-auto h-[712px] w-[350px] bg-black rounded-[60px] border-[14px] border-black relative overflow-hidden ring ring-blue-400 shadow-xl">
              <img class="absolute inset-0 h-full w-full object-cover"
                :src="`/portfolio/healthbuddy/${useState('active_shot').value}`" />
              <div class="absolute top-0 inset-x-0">
                <div class="mx-auto bg-black h-6 w-40 rounded-b-3xl"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div
        class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-12 border-l border-gray-200">
        <nav aria-labelledby="on-this-page-title" class="w-64">
          <div class="p-2">{{useState('active_shot_name').value}}</div>
          <p class="ml-2 text-sm prose">{{ useState('active_shot_description').value }}</p>
        </nav>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import _ from 'lodash';
const runtimeConfig = useRuntimeConfig();
const { path } = useRoute();
const pathSegments = path.split('/').filter(Boolean); // split the path and remove any empty strings
const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'default';
console.log(`${useRuntimeConfig().public.TEMPLRJS_CONFIG_ROOT_PATH}/${useRoute().params.portfolio}.json`)
//const navigation = await fetch(`${config.TEMPLRJS_CONFIG_ROOT_PATH/${lastSegment}/${lastSegment}.json`);
const navigation = await fetch(`${useRuntimeConfig().public.TEMPLRJS_CONFIG_ROOT_PATH}/${useRoute().params.portfolio}.json`);

//console.log("---->", await navigation.json())

const parsedNavigation = await navigation.json();

//Set default value
useState('active_shot').value = 'ios-wallpaper.jpg';
useState('next_shot_name').value = parsedNavigation[0]?.name || '';
useState('active_shot_description').value = '';
useState('active_shot_name').value = '';

const setActiveAndNeighbors = (idx) => {
  parsedNavigation.forEach((item, i) => {
    item.current = i === idx;
  });

  useState('active_shot').value = parsedNavigation[idx].href;
  useState('next_shot_name').value = parsedNavigation[idx + 1]?.name || '';
  useState('prev_shot_name').value = parsedNavigation[idx - 1]?.name || '';
  useState('active_shot_description').value = parsedNavigation[idx].description;
  useState('active_shot_name').value = parsedNavigation[idx].name;

  const allLinks = document.querySelectorAll('ul#ul_nav li a');
  allLinks.forEach((element) => {
    element.classList.remove('bg-gray-100');
  });
  document.getElementById(parsedNavigation[idx].href).classList.add('bg-gray-100');
};

const goto = (url, idx) => {
  setActiveAndNeighbors(idx);
};

const paginate = (name) => {
  const idx = _.findIndex(parsedNavigation, { name });
  setActiveAndNeighbors(idx);
};
</script>
