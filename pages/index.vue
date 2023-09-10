<template>
  <NuxtLayout name="landing">
  <div class="" :class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
    <Carousel/>
    <ZynomiHero/>
    <ZynomiCardList/>
    <InstagramPosts v-if="usePropertiesStore().properties_by_code('component-instagram-post').is_active"/>
    <Marquee api_end_point="/technology" />
  </div>
  </NuxtLayout>
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';
import { useThemeStore } from '~/stores/theme';
</script>