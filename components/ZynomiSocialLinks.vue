<template>
  <div class="flex md:order-2">
    <a :href="link.href" class="ml-6 text-white" :class="[`hover:text-[${useThemeStore().palette('600')}]`]" v-for="link in social_links" :key="link.name">
      <span class="sr-only"> {{ link.name }} </span>
      <Icon :name="link.icon" class="h-6 w-6" />
    </a>
  </div>
</template>



<script setup>
import { useNavigationsStore } from '~/stores/navigations';
import { useThemeStore } from '~/stores/theme';
console.log("--------------------------------------->>>>>ZynomiSocialLinks")
const social_links = useNavigationsStore().navigatioins_by_module(props.module_name);
const props = defineProps(['module_name']);
</script>

