<template>
  <NuxtLayout name="landing">
  <div class="" :class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
    <Carousel v-if="usePropertiesStore().properties_by_code('component-carousel').is_active"/>
    <ZynomiHero class="pb-10" v-if="usePropertiesStore().properties_by_code('component-app-hero').is_active"/>
    <InstagramPosts class="pb-4" v-if="usePropertiesStore().properties_by_code('component-instagram-post').is_active"/>
    <Marquee api_end_point="/_navigation/notification-channels" />
  </div>
  </NuxtLayout>
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';
console.log("--------------------------------------->>>>>pages/index")
</script>