<script setup>
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import _ from 'lodash';

console.log(`/api/_content/query?_params={"where":{"_path":{"$contains":"/_blog/"},"type":{"$eq":"Blog"}},"only":["title","author","date","description","coverimage","type","tags","published","_path"],"limit":6,"sort":{"date":-1}}`);
const data = await $fetch(`/api/_content/query?_params={"where":{"_path":{"$contains":"/_blog/"},"type":{"$eq":"Blog"}},"only":["title","author","date","description","coverimage","type","tags","published","_path"],"limit":6,"sort":{"date":-1}}`);
const articlesContent = ref([]);
const filteredArticles = ref([]);

if (data && _.isArray(data)) {
  articlesContent.value = data;
  filteredArticles.value = _.orderBy(articlesContent.value, (article) => new Date(_.get(article, 'date')), 'desc');
}
</script>
<template>
  <div class="bg-white py-4 sm:py-8">
    <div class="px-6">
      <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
        <Icon name="mdi:star-three-points-outline" size="2em" class="text-black" />
        <h2 class="text-4xl font-semibold text-black">Related Posts</h2>
      </div>
    </div>
    <div class="mx-auto max-w-2xl lg:max-w-4xl">
      <div class="mt-4 space-y-4 lg:mt-8 lg:space-y-8">
        <article v-for="(post, index) in filteredArticles" :key="index" class="relative isolate flex flex-col gap-8 lg:flex-row">
          <div>
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.date" class="text-gray-500"> {{ $dayjs(post.date).format('DD-MMM-YYYY') }}</time>
              <p>{{ post.author }}</p>
              <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.type }}</a>
            </div>
            <div class="group relative max-w-xl">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span class="absolute inset-0"></span>
                  {{ _.startCase(post.title) }}
                </a>
              </h3>
              <p class="mt-5 text-sm leading-6 text-gray-600">{{ post.description }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
