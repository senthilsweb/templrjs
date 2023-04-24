<template>
  <div class="flex md:order-2">
    <a :href="link.href" class="ml-6 text-white hover:text-primary-500" v-for="link in social_links" :key="link.name">
      <span class="sr-only"> {{ link.name }} </span>
      <Icon :name="link.icon" class="h-6 w-6" />
    </a>
  </div>
</template>



<script setup>
import { useNavigationsStore } from '~/stores/navigations';
const social_links = useNavigationsStore().navigatioins_by_module(props.module_name);
const props = defineProps(['module_name']);
</script>

