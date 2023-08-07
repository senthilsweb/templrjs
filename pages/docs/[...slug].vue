<template>
  <NuxtLayout name="landing">
  <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2">
    <div class="hidden  lg:relative lg:block  lg:flex-none">
      <div class="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden"></div>
      <div class="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-gray-800 dark:block"></div>
      <div class="absolute top-28 bottom-0 right-0 hidden w-px bg-gray-800 dark:block"></div>
      <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden  py-16 pl-0.5">
        <nav class="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16">
          <docnav :data="navigation[1].children" :title="page.title" />
        </nav>
      </div>
    </div>
    <div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
      <article>
        <header class="mb-9 space-y-1">
          <p class="font-display text-sm font-medium text-sky-500">{{page.title}}</p>
          <h1 class="font-display text-3xl tracking-tight text-gray-900 dark:text-white">{{page.title}}</h1>
        </header>
        <div class="prose prose-gray max-w-none dark:prose-invert dark:text-gray-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-gray-500 dark:prose-lead:text-gray-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.gray.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:shadow-lg dark:prose-pre:bg-gray-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-gray-300/10 dark:prose-hr:border-gray-800">
          <ContentRendererMarkdown :value="data" />
        </div>
      </article>
      <dl class="mt-12 flex border-t border-gray-200 pt-6 dark:border-gray-800">
        <div>
          <dt class="font-display text-sm font-medium text-gray-900 dark:text-white">Previous</dt>
          <dd class="mt-1">
            <a class="text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" :href="prev._path"><span aria-hidden="true">←</span> {{prev.title}}</a>
          </dd>
        </div>
        <div class="ml-auto text-right">
          <dt class="font-display text-sm font-medium text-gray-900 dark:text-white">Next</dt>
          <dd class="mt-1">
            <a class="text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" :href="next._path"
              >{{next.title}}
              <span aria-hidden="true">→</span></a
            >
          </dd>
        </div>
      </dl>
    </div>
    <div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16">
      <nav aria-labelledby="on-this-page-title" class="w-56">
        <Toc :data="toc.links" />
      </nav>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  
});
const { path } = useRoute();
console.log('docs path=', path);
console.log('useRoute().query.print', useRoute().query.print);
const { data } = await useAsyncData(`content`, () => {
  return queryContent().where({ _path: path }).findOne();
});

const { data: nav2 } = await useAsyncData('navigation', () => {
  return fetchContentNavigation();
});

const {
  // Global references
  globals,
  navigation,
  surround,
  page,
  // Computed properties from `page` key
  excerpt,
  toc,
  type,
  layout,
  // Computed properties from `surround` key
  next,
  prev,
} = useContent();
</script>
