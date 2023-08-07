<script setup lang="ts">
const print = ref(useRoute().query.print || false);
console.log("--------------------------------------->>>>>layout/landing")
</script>
<template>
   <div class="max-w-8xl mx-auto">
    <Header v-if="!print"/>
  </div>
  <div class="max-w-7xl mx-auto">
  <div class="mx-auto">
    <div class="min-h-screen relative">
      <div class="h-full relative">
        <slot />
      </div>
    </div>
  </div>
  </div>
   <Footer v-if="!print"/>
</template>
