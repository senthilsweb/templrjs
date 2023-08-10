<template>
  <div class="bg-white m-0 pt-8">
    <div v-for="job in jobs" :key="job.A" class="flex justify-center">
      <NuxtLink :to="`/jobs/${job.A}`" class="flex justify-center w-3/6">
        <div class="pb-5 m-1 w-full h-32">
          <div class="flex flex-row justify-between">
            <h1 class="font-semibold leading-6 text-gray-900 text-2xl">{{ job.B }}</h1>
            <h1 class="font-normal leading-6 text-gray-400 text-base">{{ job.C }}</h1>
          </div>
          <p class="my-6 max-w-4xl text-sm font-medium text-gray-500 line-clamp-3">{{ job.D }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data } = await useAsyncData('home', () => queryContent('/jobsdata').findOne());
console.log(data);
// console.log(data.getvalue())
const jobs = data._rawValue.data;
console.log(jobs);
</script>

<style scoped></style>