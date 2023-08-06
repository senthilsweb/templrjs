<template>
  <div class="h-screen">
    <div class="flex justify-center" v-for="job in jobs" :key="job.id" >
      <div class="border border-white-200 pb-5 m-4 w-3/6 h-24">
        <h3 class="text-base font-semibold leading-6 text-white-900">{{ job.title }}</h3>
        <p class="mt-2 max-w-4xl text-sm text-white-500">{{ job.description }}</p>
        <NuxtLink :to="`/jobs/${job.id}`">View details</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useAsyncData('home', () => queryContent('/data').findOne());
const jobs = data._rawValue.jobs;
</script>

<style scoped></style>