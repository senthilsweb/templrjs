<template>
  <header class="flex1 flex items-center   justify-between h-20   px-5 lg:px-5"
  :class="[usePropertiesStore().megamenu_bg_color  ? usePropertiesStore().megamenu_bg_color : 'bg-white',usePropertiesStore().layout_width  ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']"
  >
    <!-- Logo (Start)-->
    <NuxtLink to="/">
      <IconLogo class="w-14 h-14 text-center" />
    </NuxtLink>
    <!-- Logo (End) -->
    <!-- Nav Starts-->
      <!--Main Menu (Start)-->
  <div class="hidden space-x-4 md:ml-4 md:flex">
    <div v-for="(menu, idx) in useSortBy(navs, ['sort_order'])" :key="`mnu_${idx}`">
      <div v-if="menu.children">
        <div v-on:mouseover="useState('isVisible').value[menu.name] = true" v-on:mouseleave="useState('isVisible').value[menu.name] = false" class="flex items-center">
          <a :href="menu.href" class="inline-flex items-center rounded-full px-3 py-2 text-lg font-semibold hover:text-primary-700" :class="[usePropertiesStore().megamenu_text_style ? usePropertiesStore().megamenu_text_style : 'text-gray-600 hover:bg-gray-200']">
            {{ menu.name }}
            <component :is="heroIcons['ChevronDownIcon']" class="h-6 w-6" aria-hidden="true" />
          </a>
          <!--Pop-over (start)-->
          <Popover class="relative" v-slot="{ open }">
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel v-if="useState('isVisible').value[menu.name]" class="absolute left-1/2 z-50 mt-3 w-screen max-w-md -translate-x-1/2 transform py-4 px-2 sm:px-0" 
              :class="[usePropertiesStore().megamenu_popover_style=='narrow'  ? 'lg:max-sm' : 'lg:max-w-2xl']"
              static>
                <div class="overflow-hidden shadow-xl" 
                :class="[usePropertiesStore().megamenu_bg_color  ? 'rounded-xl' : 'rounded-b-xl']">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8" 
                  :class="[usePropertiesStore().megamenu_popover_style=='narrow'  ? '' : 'lg:grid-cols-2']">
                 
                    <div v-for="item in useSortBy(menu.children, ['sort_order'])">
                      <template v-if="item.is_footer_description == false">
                        <a :key="item.name" :href="item.href" class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out" :class="[item.selected == true ? 'text-gray-900 bg-primary-50 bg-opacity-50' : 'text-gray-800', `hover:${item.iconBackground}`]">
                          <div class="bg-primary-50 rounded-lg inline-flex p-3">
                            <Icon :name="item.icon" class="h-6 w-6 flex-shrink-0 text-primary-600" />
                          </div>
                          <div class="ml-4">
                            <p class="text-small font-normal text-gray-800 hover:text-primary-700">
                              {{ item.name }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500 hover:text-primary-600">{{ item.description }}</p>
                          </div>
                        </a>
                      </template>
                    </div>
                  </div>
                  <!--Popover Footer(start). Though it is inside forloop but guarnteed that only one footer per children-->
                  <div v-for="item in menu.children">
                    <div v-if="item.is_footer_description" class="bg-primary-600 p-5 sm:p-8">
                      <a :href="item.href" class="-m-3 flow-root rounded-md p-3 transition duration-150 ease-in-out">
                        <span class="flex items-center">
                          <span class="text-lg font-bold text-white hover:text-primary-300">{{ item.name }}</span>
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

      <div v-if="!menu.is_action_button && !menu.children" class="flex items-center">
        <a :href="menu.href" class="inline-flex items-center rounded-full px-3 py-2 text-lg font-semibold hover:text-primary-700" :class="[usePropertiesStore().megamenu_text_style ? usePropertiesStore().megamenu_text_style : 'text-gray-600 hover:bg-gray-200']">
          {{ menu.name }}
        </a>
      </div>
    </div>
  </div>
  <!--Main Menu (End)-->
   
    <!--Nav Action button start-->
    <div class="hidden md:flex md:items-center md:space-x-6">
      <div class="hidden space-x-4 md:flex">
        <!--<div v-for="(cta, idx) in navigation.header_call_to_actions" :key="`cta_${idx}`">
          <div class="flex items-center">
            <a :href="cta.href" class="px-5 py-2 text-md rounded-full transition-all duration-300" :class="cta.class">
              {{ cta.name }}
            </a>
          </div>
        </div>-->
        <div v-for="(cta, idx) in buttons" :key="`cta_${idx}`">
          <div v-if="cta.is_action_button" class="flex items-center">
            <a :href="cta.href" @click="useNuxtApp().$bus.$emit(`${cta.click_event}`)" class="px-5 py-2 text-md rounded-full transition-all duration-300" :class="cta.css_class">
              {{ cta.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--Nav action button end-->
    <!--Nav Ends-->
  </header>
</template>
<script setup>
import { useNavigationsStore } from '~/stores/navigations';
import { usePropertiesStore } from '~/stores/properties';
import * as heroIcons from '@heroicons/vue/20/solid';
import { Popover, PopoverPanel } from '@headlessui/vue';

const navs = useNavigationsStore().navigatioins_by_module('landing-page');
const isVisible = useState('isVisible', () => ref({})); //This is used to maintain the active hover state of the pophover menu.
navs.forEach((item) => {
  useState('isVisible').value[item.name] = false;
});


const buttons = useSortBy(useNavigationsStore().navigatioins_by_module('landing-page'), ['sort_order']);

</script>
