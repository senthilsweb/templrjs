<template>
  <NuxtLayout name="landing">
    <div>
      <main class="mx-auto max-w-7xl px-4 mt-16 sm:px-6 lg:px-0">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8 space-x-3">
          <svg data-v-c3ad5561="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon text-black" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 9.5l1.2 4l2.8 3l-4-.9l-4.1.9l2.8-3l1.3-4m0-6.9l-3 9.8l-7 7.5l10-2.3L22 20l-7-7.5l-3-9.9Z"></path></svg>
          <h2 class="text-4xl font-semibold text-black">Blog Posts</h2>
          <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form class="flex flex-1" action="#" method="GET">
              <input type="text" name="txtBlogSearch" id="txtBlogSearch" v-model="searchPhrase" class="hidden ml-36 sm:block w-full rounded-xl border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600" placeholder="Search blogs by title" />
            </form>
          </div>
        </div>
        <section aria-labelledby="blogs-heading" class="pb-24 pt-6">
          <h2 id="blogs-heading" class="sr-only">Blogs</h2>
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- blog grid (start)-->
            <div class="lg:col-span-4">
              <ClientOnly>
                <div class="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-5 items-start mb-24">
                  <template v-for="article of paginatedData" :key="article.title">
                    <BlogCard :path="`/blog/${useNuxtApp().$s.slugify(article.title)}`" :title="article.title" :date="article.date" :description="article.description" :image="article.coverimage" :alt="article.title" :og-image="article.coverimage" :tags="[]" :published="article.published" />
                  </template>
                  <template v-if="data?.length === 0">
                    <BlogEmpty />
                  </template>
                </div>
              </ClientOnly>

             

              <header class="space-y-1 mt-4">
                <dl class="flex dark:border-gray-800">
                  <div>
                    <dt @click="onPreviousPageClick" class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 cursor-pointer"><span aria-hidden="true">←</span> Previous</dt>
                    <dd class="mt-1">
                      <a @click="onPreviousPageClick" class="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300" href="#"> {{ useState('prev_shot_name').value }}</a>
                    </dd>
                  </div>

                  <div class="ml-auto text-center">
                    <!-- Added text-center class -->
                    <div class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium text-zinc-900">Page {{ pageNumber }}/{{ totalPage }}</div>
                    <!-- Added this line for "page n/n" -->
                  </div>
                  <div class="ml-auto text-right">
                    <dt @click="onNextPageClick" class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 cursor-pointer">Next <span aria-hidden="true">→</span></dt>
                    <dd class="mt-1">
                      <a @click="onNextPageClick" class="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300" href="#">{{ useState('next_shot_name').value }} </a>
                    </dd>
                  </div>
                </dl>
              </header>
            </div>

            <!-- blog grid (end)-->
          </div>
        </section>
      </main>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import _ from 'lodash';
import dayjs from 'dayjs';

const mobileFiltersOpen = ref(false);
const { path } = useRoute();
console.log(`/api/_content/query?_params={"where":{"_path":{"$contains":"/_blog/"}}}`);

const data = await $fetch(`/api/_content/query?_params={"where":{"_path":{"$contains":"/_blog/"},"type":{"$eq":"Blog"}},"only":["title","author","date","description","coverimage","type","tags","published","_path"]}`);
const articlesContent = ref([]);
const filteredArticles = ref([]);

if (data && _.isArray(data)) {
  articlesContent.value = data;
  filteredArticles.value = _.orderBy(articlesContent.value, (article) => new Date(_.get(article, 'date')), 'desc');
}

//console.log(JSON.stringify(filteredArticles.value))

const searchPhrase = ref('');
const elementPerPgae = ref(6);
const pageNumber = ref(1);

//console.log('filteredArticles = ', JSON.stringify(filteredArticles.value));

const searchData = computed(() => {
  return (
    filteredArticles.value.filter((data) => {
      const lowerTitle = data.title.toLocaleLowerCase();
      //console.log('lowerTitle Match = ', lowerTitle.search(searchPhrase.value) !== -1);
      //console.log('searchPhrase.value = ', searchPhrase.value.toLocaleLowerCase());
      if (lowerTitle.search(searchPhrase.value.toLocaleLowerCase()) !== -1) return true;
      else return false;
    }) || []
  );
});

//console.log('searchData = ', JSON.stringify(searchData.value));

const paginatedData = computed(() => {
  return (
    searchData.value.filter((data, idx) => {
      const startInd = (pageNumber.value - 1) * elementPerPgae.value;
      const endInd = pageNumber.value * elementPerPgae.value - 1;

      if (idx >= startInd && idx <= endInd) return true;
      else return false;
    }) || []
  );
});

function onPreviousPageClick() {
  if (pageNumber.value > 1) pageNumber.value -= 1;
}

const totalPage = computed(() => {
  const ttlContent = searchData.value.length || 0;
  const totalPage = Math.ceil(ttlContent / elementPerPgae.value);
  return totalPage;
});

function onNextPageClick() {
  if (pageNumber.value < totalPage.value) pageNumber.value += 1;
}
</script>

<style scoped></style>
