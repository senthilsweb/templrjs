<template>
  <div class="h-screen">
    <div class="flex justify-center">
      <div class="border border-white-200 pb-5 m-4 w-3/6 h-24">
        <h3 class="text-base font-semibold leading-6 text-white-900">{{ job.title }}</h3>
        <p class="mt-2 max-w-4xl text-sm text-white-500">{{ job.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const { data } = await useAsyncData('home', () => queryContent('/data/').findOne());
const job = data._rawValue.jobs[id];
</script>

<style scoped></style>