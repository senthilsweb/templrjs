<template>
  <div class="bg-white m-0 pt-8">
    <div v-for="(job, index) in jobs" :key="`${index}`" class="flex justify-center overflow-hidden">
      <NuxtLink :to="job._path" class="flex justify-center w-3/6">
        <div class="pb-5 m-1 w-full h-32">
          <div class="flex flex-row justify-between">
            <h1 class="font-semibold leading-6 text-gray-900 text-2xl">{{ job.title }}</h1>
            <h1 class="font-normal leading-6 text-gray-400 text-base">{{ job.location }}</h1>
          </div>
          <p class="my-6 max-w-4xl text-sm font-medium text-gray-500 line-clamp-3">{{ job.description }}</p>
        </div>
      </NuxtLink>
    </div>
    <!-- v-if="!loading" -->
    <div class="flex justify-center">
      <button :disabled="loading" @click="fetchMore" class="rounded-full bg-slate-300  font-semibold leading-6 m-2 p-2 flex justify-center" :class="[loading ? activeClass : inActiveClass]">Load More..</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      jobs: [],
      activeClass: 'text-gray-400 text-lg',
      inActiveClass: 'text-gray-800 text-lg',
    };
  },
  methods: {
    fetchMore: async function () {
      let len = this.jobs.length;
      const { data } = await useAsyncData('home', () => queryContent('jobsmd').skip(len).limit(4).find());
      if(data._rawValue.length<4)
      {
        this.loading = true;
      }
      data._rawValue.forEach((element) => {
        this.jobs.push(element);
      });
      console.log(this.jobs);
    },
  },
  created() {
    this.loading = true;
    this.fetchMore();
  },
  mounted() {
    this.loading = false;
    console.log("mounted")
  },
};
</script>