<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80&h=400',
  },
});
</script>
<template>
  <section>
    <img class="h-full w-full object-cover animate-blob transition ease-in-out delay-150 animation-delay-4000" :src="src" />
  </section>
</template>
