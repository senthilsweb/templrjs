<script setup>
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import _ from 'lodash';

console.log(`${useRuntimeConfig().public.TEMPLRJS_WEB_ROOT_PATH}/api/_content/query?_params={"where":{"_path":{"$contains":"/_blog/"},"type":{"$eq":"Blog"}},"only":["title","author","date","description","coverimage","type","tags","published","_path"],"limit":6,"sort":{"date":-1}}`)
const data = await $fetch(`${useRuntimeConfig().public.TEMPLRJS_WEB_ROOT_PATH}/api/_content/query?_params={"where":{"_path":{"$contains":"/_blog/"},"type":{"$eq":"Blog"}},"only":["title","author","date","description","coverimage","type","tags","published","_path"],"limit":6,"sort":{"date":-1}}`);
const articlesContent = ref([]);
const filteredArticles = ref([]);

if (data && _.isArray(data)) {
  articlesContent.value = data;
  filteredArticles.value = _.orderBy(articlesContent.value, (article) => new Date(_.get(article, 'date')), 'desc');
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
      <template v-for="item in filteredArticles" :key="item.title">
        <article class="group border m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-700">
          <a :href="`/blog/${useNuxtApp().$s.slugify(item.title)}`">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500" :src="item.coverimage" :alt="_.startCase(title)" />
            <div class="px-3 pb-4">
              <div class="text-black pt-3 pb-2">
                <div class="flex items-center">
                  <LogoDate />
                  {{ $dayjs(item.date).format('DD-MMM-YYYY') }}
                </div>
              </div>
              <h2 class="text-xl font-semibold text-black pb-1 group-hover:text-sky-700">
                {{ _.startCase(item.title) }}
              </h2>
              <p class="text-ellipsis line-clamp-2 text-base">
                {{ item.description }}
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
