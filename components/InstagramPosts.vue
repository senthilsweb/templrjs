
<template>
  <div class="mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
  <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Recent Instagram Posts</h2>
        <a href="#" class="hidden text-sm font-medium text-primary-600 hover:text-primary-500 md:block">
          Go to the Instagram page
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
  <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
        <div v-for="post of filteredArticles" :key="post.ID" class="group relative">
          <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img :src="`data:image/gif;base64,${post.base64}`" class="h-full w-full object-cover object-center" />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            <a :href="`https://www.instagram.com/p/${post.short_code}`" target="_blank">
              <span class="absolute inset-0" />
               {{ $s(post.text).prune(50)._wrapped }}
            </a>
          </h3>
         
          <p class="mt-1 text-sm text-gray-500"> {{ $dayjs(post.uploaded_at).format('DD-MMM-YYYY') }}</p>
         
    </div>
        </div>
        </div>
</template>
<script setup>

import _ from 'lodash';

const data = await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/entities/instagramposts?limit=10&order=id desc`);

const filteredArticles = ref([]);

if (data && _.isArray(data.data)) {
  filteredArticles.value = data.data;
  // Sorting the articles
  //filteredArticles.value = _.orderBy(data.data, (post) => new Date(_.get(post, 'data.Shortcode')), 'desc');

  // Limiting the articles to the top 6
  //filteredArticles.value = _.take(filteredArticles.value, 6);
  console.log('filteredArticles.value=', JSON.stringify(filteredArticles.value));
}
</script>
