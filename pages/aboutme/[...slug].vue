<template>
    <NuxtLayout name="landing">
      <div class="container p-4 lg:p-0 max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
        <div class="col-span-12 lg:col-span-8">
          <div class="mx-auto text-base max-w-prose lg:max-w-none">
            <div class="mt-8 prose text-zinc-600 dark:prose-invert">
              <ContentRendererMarkdown :value="article" />
            </div>
          </div>
        </div>
        <BlogToc class="lg:col-span-4"/>
      </div>
    </NuxtLayout>
  </template>
  <script setup>
  definePageMeta({
   
  });
  const { path } = useRoute();
  const { data: article } = await useAsyncData(`content-${path}`, () => {
    return queryContent().where({ _path: "/aboutme/senthilnathan.karuppaiah" }).findOne();
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
  