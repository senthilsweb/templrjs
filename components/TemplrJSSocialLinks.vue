<template>
  <div class="flex md:order-2">
    <a v-for="link in _.filter(social_links,(o) => o.is_active==true)" :key="link.name" :href="link.href" class="ml-6 text-white" :class="[`hover:text-[${useThemeStore().palette('600')}]`]">
      <span class="sr-only"> {{ link.name }} </span>
      <Icon :name="link.icon" class="h-6 w-6" />
    </a>
  </div>
</template>

<script setup>
import { useNavigationsStore } from '~/stores/navigations';
import { useThemeStore } from '~/stores/theme';
import _ from 'lodash';
const props = defineProps(['module_name']);
const social_links = useNavigationsStore().navigatioins_by_module(props.module_name);
</script>

