<template>
  <NuxtLayout>
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
      <div class="min-w-0 max-w-2xl flex-auto px-4 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <div class="col-span-12 lg:col-span-8">
          <TemplrJSSocialCard :title="page.title" :description="page.description" :tags="page.tags" :author="page.author" :date="page.date" :color="green"/>
          <div class="relative mx-auto text-base max-w-prose lg:max-w-none px-6 py-6">
            <!--Center main content (start)-->
            <article>
              <div class="mt-8 text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800">
                <ContentRendererMarkdown :value="data" />
              </div>
            </article>
          </div>
        </div>
        <!--Center main content (start)-->
        <!--Bottom pagination (start)-->
        <dl class="mt-12 flex border-t border-gray-200 pt-6 dark:border-gray-800 py-2">
          <div v-if="prev">
            <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300" aria-label="Previous: Quickstart" :href="prev._path">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -ml-1 rotate-180"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>Previous</a
            >
            <dd class="mt-1">
              <a class="text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" :href="prev._path">{{ prev.title }}</a>
            </dd>
          </div>
          <div v-if="next" class="ml-auto text-right">
            <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300" aria-label="Next: SDKs" :href="next._path"
              >Next<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg
            ></a>
            <dd class="mt-1">
              <a class="text-base font-semibold text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" :href="next._path">{{ next.title }}</a>
            </dd>
          </div>
        </dl>
        <!--Bottom pagination (end)-->
      </div>
      <!--Right sidebar for TOC (start)-->
      <div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16">
        <nav aria-labelledby="on-this-page-title" class="w-56">
          <Toc :data="toc.links" />
        </nav>
      </div>
      <!--Right sidebar for TOC (end)-->
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'landing',
});
const { path } = useRoute();
//console.log('docs path=', path);
//console.log('useRoute().query.print', useRoute().query.print);
console.log(`path = [${path}]`)
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
