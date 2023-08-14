<template>
  <div class="h-full pt-8">
    <div class="flex justify-center">
      <NuxtLink :to="job._path" class="flex justify-center w-3/6">
        <div class="pb-5 m-1 w-full">
          <div class="flex flex-row justify-between">
            <h1 class="font-semibold leading-6 text-gray-900 text-2xl">{{ job.title }}</h1>
            <h1 class="font-normal leading-6 text-gray-400 text-base">{{ job.location }}</h1>
          </div>
          <p class="mt-6 max-w-4xl text-sm font-medium text-gray-500">{{ job.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { path } = useRoute();

const {data} = await useAsyncData(path.replace(/\/$/, ''),
  () => queryContent('jobsmd')
    .where({ _path: path })
    .findOne(),
)
const job=data._rawValue
console.log(job);

</script>