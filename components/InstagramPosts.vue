<template>
  <div class="mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="md:flex md:items-center md:justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Recent Instagram Posts</h2>
      <a href="#" class="hidden text-sm font-medium text-primary-600 hover:text-primary-500 md:block">
        Go to the Instagram page
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
    <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <article v-for="post in posts" :key="post.id" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
        <img :src="`data:image/gif;base64,${post.base64}`" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
        <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
          <time :datetime="post.created_at" class="mr-8">{{ post.created_at }}</time>
        </div>
        <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
          <a :href="`https://www.instagram.com/p/${post.shortcode}`" target="_blank">
            <span class="absolute inset-0" />
            {{ $s(post.text).prune(50)._wrapped }}
          </a>
        </h3>
        <!--<h3 class="mt-4 text-sm text-gray-700">
          <a :href="`https://www.instagram.com/p/${post.shortcode}`" target="_blank">
            <span class="absolute inset-0" />
            {{ $s(post.text).prune(50)._wrapped }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ post.created_at }}</p>-->
      </article>
    </div>
  </div>
</template>
<script setup>
const { data: posts } = await useFetch('/api/postgres/instagram', {
  initialCache: false,
  headers: {
    range: '0-7',
  },
});

onMounted(() => {
  //console.log(posts)
});
</script>
