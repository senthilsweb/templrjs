<template>
  <div class="grid grid-cols-2 gap-8 xl:col-span-2">
    <div class="grid auto-cols-max gap-y-8 md:gap-x-2 lg:gap-x-8 lg:grid-flow-col">
      <div v-for="(item, idx) in _.filter(useSortBy(footer_links, ['sort_order']), (o) => o.is_active == true)" :key="`fl_${idx}`" class="">
        <h4 class="text-md leading-5 font-bold tracking-wider text-white uppercase">
          {{ item.name }}
        </h4>
        <ul class="mt-4">
          <li class="mt-4" v-for="sm in _.filter(useSortBy(item.children, ['sort_order']), (o) => o.is_active == true)" :key="sm.name">
            <a :href="sm.href" @click="useNuxtApp().$bus.$emit(`${sm.click_event}`)" class="text-base leading-6 text-white" :class="[`hover:text-[${useThemeStore().palette('600')}]`]">
              {{ sm.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useNavigationsStore } from '~/stores/navigations';
import { useThemeStore } from '~/stores/theme';
import _ from 'lodash';
const props = defineProps(['module_name']);
const footer_links = useNavigationsStore().navigatioins_by_module(props.module_name);
</script>
