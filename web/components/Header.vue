<script setup>
import { useNavigationsStore } from '~/stores/navigations';
import { usePropertiesStore } from '~/stores/properties';
import { useThemeStore } from '~/stores/theme';
import * as heroIcons from '@heroicons/vue/20/solid';
import { Popover, PopoverPanel } from '@headlessui/vue';
import _ from 'lodash';
const propertiesStore = usePropertiesStore();
console.log("--------------------------------------->>>>>Header")
const navs = useNavigationsStore().navigatioins_by_module('landing-page');
const isVisible = useState('isVisible', () => ref({})); //This is used to maintain the active hover state of the pophover menu.
navs.forEach((item) => {
  useState('isVisible').value[item.name] = false;
});
const buttons = useSortBy(useNavigationsStore().navigatioins_by_module('landing-page'), ['sort_order']);
const isMobileNavVisible = useState('isMobileNavVisible', () => ref(false));
</script>
<template>
  <header class="fixed sticky top-0 z-10 flex flex-wrap items-center justify-between px-4 sm:px-0 py-5 transition duration-500 h-20" :class="[propertiesStore.megamenu_bg_color ? propertiesStore.megamenu_bg_color : 'bg-white', propertiesStore.layout_width ? propertiesStore.layout_width : 'lg:max-w-8xl']">
    <!-- Logo (Start)-->
    <div class="relative flex flex-grow basis-0 items-center">
      <a href="/">
        <IconLogo logo_url="/logo.svg"/>
      </a>
    </div>
    <!-- Logo (End) -->
    <!-- Nav Starts-->
    <!--Desktop Menu with action buttons on the right side (Start)-->
    <div class="hidden space-x-4 md:ml-4 md:flex -my-5 mr-6 sm:mr-8 md:mr-0">
      <div v-for="(menu, idx) in useSortBy(navs, ['sort_order'])" :key="`mnu_${idx}`">
        <div v-if="menu.children && menu.is_active">
          <div v-on:mouseover="useState('isVisible').value[menu.name] = true" v-on:mouseleave="useState('isVisible').value[menu.name] = false" class="flex items-center">
            <a :href="menu.href" class="inline-flex items-center rounded-full px-3 py-2 text-lg font-semibold" :class="[`hover:text-[${useThemeStore().palette('700')}]`,propertiesStore.megamenu_text_style ? propertiesStore.megamenu_text_style : 'text-gray-600 hover:bg-gray-200']">
              {{ menu.name }}
              <component :is="heroIcons['ChevronDownIcon']" class="h-6 w-6" aria-hidden="true" />
            </a>
            <!--Pop-over (start)-->
            <Popover class="relative" v-slot="{ open }">
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel v-if="useState('isVisible').value[menu.name]" class="absolute left-1/2 z-50 mt-3 w-screen max-w-md -translate-x-1/2 transform py-4 px-2 sm:px-0" :class="[propertiesStore.megamenu_popover_style == 'narrow' ? 'lg:max-sm' : 'lg:max-w-2xl']" static>
                  <div class="overflow-hidden shadow-xl" :class="[propertiesStore.megamenu_bg_color ? 'rounded-xl' : 'rounded-b-xl']">
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" :class="[propertiesStore.megamenu_popover_style == 'narrow' ? '' : 'lg:grid-cols-2']">
                      <div v-for="item in _.filter(useSortBy(menu.children, ['sort_order']),(o) => o.is_active==true)">
                        <template v-if="item.is_footer_description == false">
                          <a :key="item.code" :href="item.href" class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out" :class="[item.selected == true ? 'text-gray-900 bg-[#fefce8] bg-opacity-50' : 'text-gray-800', `hover:bg-[${useThemeStore().palette('50')}]`]">
                            <div v-if="item.icon" class="rounded-lg inline-flex p-3" :class="[`text-[${useThemeStore().palette('50')}]`]">
                              <Icon :name="item.icon" class="h-6 w-6 flex-shrink-0" :class="[`text-[${useThemeStore().palette('700')}]`]" />
                            </div>
                            <div class="ml-4">
                              <p class="text-small font-normal text-gray-800" :class="[`hover:text-[${useThemeStore().palette('700')}]`]">
                                {{ item.name }}
                              </p>
                              <p class="mt-1 text-sm text-gray-500" :class="[`hover:text-[${useThemeStore().palette('700')}]`]">{{ item.description }}</p>
                            </div>
                          </a>
                        </template>
                      </div>
                    </div>
                    <!--Popover Footer(start). Though it is inside forloop but guarnteed that only one footer per children-->
                    <div v-for="item in menu.children">
                      <div v-if="item.is_footer_description" class="p-5 sm:p-8" :class="[`bg-[${useThemeStore().palette('600')}]`]">
                        <a :href="item.href" class="-m-3 flow-root rounded-md p-3 transition duration-150 ease-in-out">
                          <span class="flex items-center">
                            <span class="text-lg font-bold text-white hover:text-[#fde047]">{{ item.name }}</span>
                          </span>
                          <span class="mt-1 block text-sm text-white">{{ item.description }}</span>
                        </a>
                      </div>
                    </div>
                    <!--Popover Footer (end)-->
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </div>
          <!--Pop-Over (End)-->
        </div>

        <div v-if="!menu.is_action_button && !menu.children && menu.is_active" class="flex items-center">
          <a :href="menu.href" class="inline-flex items-center rounded-full px-3 py-2 text-lg font-semibold" :class="[`hover:text-[${useThemeStore().palette('700')}]`,propertiesStore.megamenu_text_style ? propertiesStore.megamenu_text_style : 'text-gray-600 hover:bg-gray-200']">
            {{ menu.name }}
          </a>
        </div>
      </div>
    </div>
    <!--Nav Action button start-->
    <div class="hidden relative lg:flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
      <div v-for="(cta, idx) in buttons.filter((o) => {return (o.is_action_button && o.is_active)})" :key="`cta_${idx}`" class="relative z-10">
        <a :href="cta.href" @click="useNuxtApp().$bus.$emit(`${cta.click_event}`)" class="px-4 py-2 relative inline-flex items-center rounded-full border border-transparent text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  transition duration-150 ease-in-out" :class="[`${cta.css_class}`]">
          {{ cta.name}}
        </a>
      </div>
    </div>
    <!--Nav action button end-->
    <!--Desktop Menu with action buttons on the right side (End)-->
    <!--Mobile Menu (Start)-->
    <div id="mobile_sidebar" v-if="useState('isMobileNavVisible').value" class="fixed z-40 inset-0 flex-none h-full bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 md:hidden">
      <div id="navwrapper" class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden shadow-2xl lg:top-18 bg-white mr-24 lg:mr-0">
        <div class="lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
        <div class="px-5 pt-4 flex items-center justify-between">
          <div>
            <NuxtLink to="/">
              <!--Example logo to get it from remote server.-->
              <!--<IconLogo class="w-14 h-14 text-center" :logo_url="propertiesStore.logo_url_dark" />-->
              <!--End Example logo -->
              <IconLogo class="w-14 h-10 text-center" logo_url="/logo.svg" />
            </NuxtLink>
          </div>
          <div class="-mr-2">
            <button type="button" @click="useState('isMobileNavVisible').value = !useState('isMobileNavVisible').value" class="bg-gray-200 rounded-full p-2 inline-flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <!--Mobile Nav(Start)-->
        <nav id="nav" class="px-1 pt-6 z-40 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)">
          <div class="mt-5 flex-grow flex flex-col">
            <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
              <ul v-for="(menu, idx) in useSortBy(navs, ['sort_order'])" :key="`mob_mnu_${idx}`">
                <li v-if="!menu.is_action_button" class="mt-2">
                  <h5 class="mb-4 lg:mb-3 font-semibold text-gray-900 dark:text-gray-200">
                    <Icon v-if="menu.icon" :name="menu.icon" class="h-6 w-6 flex-shrink-0 mr-2" />
                    <a :href="menu.href">
                      {{ menu.name }}
                    </a>
                  </h5>
                  <div v-if="menu.children">
                    <ul v-for="(c_menu, c_idx) in _.filter(useSortBy(menu.children, ['sort_order']),(o) => o.is_active==true && o.is_footer_description==false)" :key="`mob_mnu_chd_${c_idx}`" :href="c_menu.href" class="space-y-2 lg:space-y-2 border-l border-gray-100 dark:border-gray-800">
                      <li>
                        <a class="block border-l pl-4 -ml-px border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" :href="c_menu.href">{{ c_menu.name }}</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
        <!--Mobile Nav(End)-->
      </div>
    </div>  
    <!--Mobile menu activator button (start)-->
    <div @click="useState('isMobileNavVisible').value = !useState('isMobileNavVisible').value" class="-mr-2 items-center sm:hidden">
      <button type="button" class="fixed z-50 top-4 right-4 rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-gray-500" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <!-- Heroicon name: outline/menu -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 hover:text-gray-900" fill="fill-white" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
    <!--Mobile menu activator button (end)-->

    <!--Mobile Menu (End)-->
  </header>
</template>
