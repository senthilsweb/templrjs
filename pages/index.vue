<template>
  <NuxtLayout name="landing">
  <div class="" :class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
   
    <ZynomiHero class="pb-10"/>
    <ZynomiCardList/>
    <InstagramPosts v-if="usePropertiesStore().properties_by_code('component-instagram-post').is_active"/>
  </div>
  </NuxtLayout>
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';
import { useThemeStore } from '~/stores/theme';

console.log("--------------------------------------->>>>>pages/index")
</script>