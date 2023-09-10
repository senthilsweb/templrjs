<template>
  <NuxtLayout name="landing">
    <div class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
      <div class="col-span-12 lg:col-span-9">
        <div class="mx-auto text-base max-w-prose lg:max-w-none">
          <BlogHeader :title="article.title" :image="article.coverimage" :alt="article.title" :date="article.date" :description="article.title" :tags="article.tags" />
          <div class="mt-8 text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800">
            <ContentRendererMarkdown :value="article" />
          </div>
          <div v-if="article.technologies" class="pt-10 pb-10 text-base max-w-prose mx-auto lg:max-w-none">
            <h2 class="text-base font-semibold tracking-wide uppercase">Technology Stack</h2>
          </div>
          <ul class="z-20 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
            <li v-for="technology of article.technologies" :key="technology.icon">
              <div class="space-y-4">
                <img class="mx-auto h-10 w-10" v-bind:src="technology.icon" :alt="technology.name" />
                <div class="space-y-2">
                  <div class="text-xs text-center font-medium lg:text-sm">
                    <h3>{{ technology.name }}</h3>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <BlogToc />
    </div>
  </NuxtLayout>
</template>
<script setup>
definePageMeta({
  layout: '',
});
const { path } = useRoute();
const { data: article } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne();
});
useHead({
  title: article.value.title || '',
  meta: [
    { name: 'description', content: article.value.description },
    {
      name: 'description',
      content: article.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: 'TemplerJS' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `${path}`,
    },
    {
      property: 'og:title',
      content: article.value.title,
    },
    {
      property: 'og:description',
      content: article.value.description,
    },
    {
      property: 'og:image',
      content: article.value.ogImage || article.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@qdnvubp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: `${path}`,
    },
    {
      name: 'twitter:title',
      content: article.value.title,
    },
    {
      name: 'twitter:description',
      content: article.value.description,
    },
    {
      name: 'twitter:image',
      content: article.value.ogImage || article.value.image,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${path}`,
    },
  ],
});
</script>
