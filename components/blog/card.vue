<script lang="ts" setup>
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import _ from 'lodash';
interface Props {
  path: string;
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  ogImage: string;
  tags: Array<string>;
  published: boolean;
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/nuxt-blog/no-image_cyyits.png',
  alt: 'no-alt',
  ogImage: '/nuxt-blog/no-image_cyyits.png',
  tags: () => [],
  published: false,
});
</script>

<template>
  <article class="flex flex-col w-full h-full bg-teal-50 hover:shadow-lg focus-within:ring ring-teal-300 transition-shadow duration-300 ease-in-out rounded-2xl shadow-sm">
    <a :href="`/blog/${useNuxtApp().$s.slugify(title)}`" class="flex flex-col h-full">
      <img :src="image" class="h-48  w-full object-cover object-center mb-8 rounded-2xl p-2" loading="lazy" :alt="_.startCase(title)" />
      <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 p-2">
        <!--<span>{{ author }}</span>-->
        <div class="flex-grow h-px bg-gray-200 mx-2"></div>
        <span>{{ $dayjs(date).format("DD-MMM-YYYY") }}</span>
      </div>
      <h2 class="font-heading text-xl font-semibold text-zinc-700 mb-2 p-2">
        {{ _.startCase(title) }}
      </h2>

      <p class="flex-grow text-base line-clamp-3 mb-2 text-gray-700 p-2">
        {{ description }}
      </p>

      <p class="mt-auto font-semibold text-teal-700 p-2">
        Read more
        <svg aria-hidden="true" class="ml-1 w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10H3a1 1 0 100 2h11.586l-4.293 4.293a1 1 0 000 1.414z" clip-rule="evenodd"></path>
        </svg>
      </p>
    </a>
  </article>
</template>
