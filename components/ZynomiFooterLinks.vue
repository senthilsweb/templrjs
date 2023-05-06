<template>
  <div class="grid grid-cols-2 gap-8 xl:col-span-2">
    <div class="grid auto-cols-max gap-y-8 md:gap-x-2 lg:gap-x-8 lg:grid-flow-col">
      <div v-for="(item, idx) in useSortBy(footer_links, ['sort_order'])" :key="`fl_${idx}`" class="">
        <h4 class="text-md leading-5 font-bold tracking-wider text-white uppercase">
          {{ item.name }}
        </h4>
        <ul class="mt-4">
          <li class="mt-4" v-for="sm in useSortBy(item.children, ['sort_order'])" :key="sm.name">
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
console.log("--------------------------------------->>>>>ZynomiFooterLinks")
const props = defineProps(['module_name']);

const footer_links = useNavigationsStore().navigatioins_by_module(props.module_name);
//console.log("footer-links=",JSON.stringify(footer_links))



</script>
