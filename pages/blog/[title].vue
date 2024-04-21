<template>
  <NuxtLayout name="landing">
    <div class="container p-4 lg:p-0 max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
      <div class="col-span-12 lg:col-span-8">
        <div class="mx-auto text-base max-w-prose lg:max-w-none">
          <div class="image-container">
            <figure class="relative">
              <img class="post-cover rounded-lg" :src="cloudinaryURL" :alt="page.data.title" />
            </figure>
          </div>
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

<script setup>
import { useCloudinaryConfig, computeCloudinaryURL } from '~/utils/functions';

const runtimeConfig = useRuntimeConfig();

const cloudinaryURL = ref('');
const page = ref({});
const data = await $fetch(`${runtimeConfig.public.API_BASE_URL}/blogs?title.eq=${useRoute().params.title}`);
if (data && Array.isArray(data.data) && data.data.length) {
  page.value = await parseMarkdown(data.data[0].content);
  //console.log(`Page Title = ${page.value.data.title}`)
  const config = useCloudinaryConfig(page.value.data.title, useRuntimeConfig().public.CLOUDINARY_BASE_URL, 'v1711924071/senthilsweb-scl-card-template_cyxogj.png')
  

  cloudinaryURL.value = computeCloudinaryURL(config.value);
  //console.log(`cloudinaryURL = ${cloudinaryURL.value}`)

} else {
  page.value = { data: { title: 'Sorry, No page exists', body: '' }, toc: { links: [] } };
}

const websiteBrand = "Senthilnathan's Data Edge"; // Your website brand name

useHead({
  title: `${page.value.data.title} - ${websiteBrand}`, // Combining blog title with website brand
  meta: [
    { name: 'description', content: `${page.value.data.title} - Learn more about how we simplify complex technologies at ${websiteBrand}.` },
    { property: 'og:description', content: `${page.value.data.title} - Discover cutting-edge solutions and insights at ${websiteBrand}.` },
    { property: 'og:title', content: `${page.value.data.title} - ${websiteBrand}` },
    { property: 'og:image', content: cloudinaryURL.value },
    { name: 'twitter:title', content: `${page.value.data.title} - ${websiteBrand}` },
    { name: 'twitter:image', content: cloudinaryURL.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:description', content: `${page.value.data.title} - Explore innovative solutions at ${websiteBrand}.` },
  ],
});
</script>
