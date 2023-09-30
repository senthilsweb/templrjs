<script setup>
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import _ from 'lodash';

const data = await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/entities/blogs?limit=10&order=id desc`);
const articlesContent = ref([]);
const filteredArticles = ref([]);

if (data && _.isArray(data.data)) {
  articlesContent.value = _.map(data.data, 'content');

  // Parsing content using Promise.all
  articlesContent.value = await Promise.all(_.map(articlesContent.value, async (content) => await parseMarkdown(content)));

  // Filtering the articles
  filteredArticles.value = _.filter(articlesContent.value, (article) => _.get(article, 'data.type') === 'Blog');
  
  // Sorting the articles
  filteredArticles.value = _.orderBy(filteredArticles.value, (article) => new Date(_.get(article, 'data.date')), 'desc');

  // Limiting the articles to the top 6
  filteredArticles.value = _.take(filteredArticles.value, 6);
}
</script>

<template>
  <div class="pb-10">
    <div class="px-6">
      <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
        <Icon name="mdi:star-three-points-outline" size="2em" class="text-black" />
        <h2 class="text-4xl font-semibold text-black">Recent Post</h2>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="item in filteredArticles" :key="item.data.title">
        <article class="group border m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-700">
          <a :href="`/cms?title=${useNuxtApp().$s.slugify(item.data.title)}`">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500" :src="item.data.coverimage" :alt="item.data.title" />
            <div class="px-3 pb-4">
              <div class="text-black pt-3 pb-2">
                <div class="flex items-center">
                  <LogoDate />
                  {{ $dayjs(item.data.date).format('DD-MMM-YYYY') }}
                </div>
              </div>
              <h2 class="text-xl font-semibold text-black pb-1 group-hover:text-sky-700">
                {{ item.data.title }}
              </h2>
              <p class="text-ellipsis line-clamp-2 text-base">
                {{ item.data.description }}
              </p>
              <div class="flex group-hover:underline text-sky-700 items-center py-2">
                <p>Read More</p>
                <LogoArrow />
              </div>
            </div>
          </a>
        </article>
      </template>
      <template v-if="data?.length === 0">
        <BlogEmpty />
      </template>
    </div>
  </div>
</template>
