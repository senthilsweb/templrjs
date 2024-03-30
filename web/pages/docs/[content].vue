<script setup>
import { ref } from 'vue';
//import { exportToPDF } from '#imports';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

definePageMeta({});

const editor = ref(null);
const editing = ref(false);
const saving = ref(false);
const page = useState('page');
const content = ref('');


const pdfSection = ref(null);
// Fetch the page on SSR



const data = await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/entities/blogs?title.eq=${useRoute().params.content}`);
//console.log(`${useRuntimeConfig().public.API_BASE_URL}/entities/blogs?title.eq=${cms_page}`)

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
    <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2">
      <div class="hidden lg:relative lg:block lg:flex-none">
        <div class="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden"></div>
        <div class="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block"></div>
        <div class="absolute top-28 bottom-0 right-0 hidden w-px bg-gray-800 dark:block"></div>
        <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
          <nav class="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16">
            <docnav :data="navigation[1].children" :title="page.title" />
          </nav>
        </div>
      </div>
      <div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <header class="mb-9 space-y-1">
            <p class="font-display text-sm font-medium text-sky-500">{{ page.data.title }}</p>
            <h1 class="font-display text-3xl tracking-tight text-gray-900 dark:text-white">{{ page.data.title }}</h1>
          </header>
          <div class="mt-8 text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800">
            <ContentRendererMarkdown :value="page.body" class="p-2" />
          </div>
        </article>
      </div>
      <div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16">
        <nav aria-labelledby="on-this-page-title" class="w-56">
          <Toc :data="page.toc.links" />
        </nav>
      </div>
    </div>
  </NuxtLayout>
</template>
