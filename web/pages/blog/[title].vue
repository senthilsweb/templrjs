<script setup>
import { ref } from 'vue';
//import { exportToPDF } from '#imports';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

definePageMeta({});

const page = useState('page');

const { path } = useRoute();

//const params = new URLSearchParams(window.location.search);

//const title = params.get('title'); // returns 'John'

const data = await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/blogs?title.eq=${useRoute().params.title}`);
//console.log(`${useRuntimeConfig().public.API_BASE_URL}/blogs?title.eq=${cms_page}`)

if (data) {
  if (Array.isArray(data.data)) {
    page.value = await parseMarkdown(data.data[0].content);
    //console.log('data.data[0].content=', JSON.stringify(page.value));
    //console.log('page=', JSON.stringify(page.value));
  }
} else {
  page.value = '# Sorry No page exists';
}
</script>

<template>
  <NuxtLayout name="landing">
    <div class="container p-4 lg:p-0 max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
      <div class="col-span-12 lg:col-span-8">
        <div class="mx-auto text-base max-w-prose lg:max-w-none">
          <figure class="relative">
            <img class="post-cover rounded-lg" :src="page.data.coverimage" :alt="page.data.title" />
          </figure>
          <div class="mt-8 text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800">
            <ContentRendererMarkdown :value="page.body" class="p-2" />
          </div>
        </div>
      </div>
      <div class="lg:col-span-3 sticky top-28 h-96 p-2 hidden lg:block justify-self-end">
        <h1 class="text-lg font-bold mb-4">Table Of Content</h1>
        <NuxtLink v-for="link in page.toc.links" :key="link.id" :to="`#${link.id}`" class="block text-sm text-zinc-600 hover:text-primary-600 font-bold mb-3">
          {{ link.text }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
