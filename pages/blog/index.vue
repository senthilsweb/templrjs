<template>
  <NuxtLayout name="landing">
    <div class="bg-white">
      <div>
        <!-- Mobile filter dialog -->
        <TransitionRoot as="template" :show="mobileFiltersOpen">
          <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
              <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div class="flex items-center justify-between px-4">
                    <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                    <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" @click="mobileFiltersOpen = false">
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <!-- Filters -->
                  <form class="mt-4 border-t border-gray-200">
                    <h3 class="sr-only">Categories</h3>
                    <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                      <li v-for="category in subCategories" :key="category.name">
                        <a :href="category.href" class="block px-2 py-3">{{ category.name }}</a>
                      </li>
                    </ul>

                    <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                      <h3 class="-mx-2 -my-3 flow-root">
                        <DisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span class="font-medium text-gray-900">{{ section.name }}</span>
                          <span class="ml-6 flex items-center">
                            <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                            <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel class="pt-6">
                        <div class="space-y-6">
                          <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                            <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-500">{{ option.label }}</label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot>

        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
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
              <!-- Filters -->
              <form class="hidden lg:block">
                <h3 class="sr-only">Categories</h3>
                <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  <li v-for="category in subCategories" :key="category.name">
                    <a :href="category.href">{{ category.name }}</a>
                  </li>
                </ul>

                <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
                  <h3 class="-my-3 flow-root">
                    <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span class="font-medium text-gray-900">{{ section.name }}</span>
                      <span class="ml-6 flex items-center">
                        <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                        <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-4">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                        <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              <!-- blog grid (start)-->
              <div class="lg:col-span-3">
                <ClientOnly>
                  <div v-auto-animate class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <template v-for="article of paginatedData" :key="article.title">
                      <BlogCard :path="article._path" :title="article.title" :date="article.date" :description="article.description" :image="article.coverimage" :alt="article.title" :og-image="article.coverimage" :tags="article.tags" :published="article.published" />
                    </template>
                    <template v-if="data?.length === 0">
                      <BlogEmpty />
                    </template>
                  </div>
                </ClientOnly>

                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <!-- <button type="submit" class="rounded-md zyn-search-button" :class="[`bg-[${useThemeStore().palette('500')}]`, `hover:bg-[${useThemeStore().palette('700')}]`]">Load More...</button>-->
                  <div class="flex justify-center items-center space-x-6">
                    <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
                      <Icon name="mdi:code-less-than" size="30" :class="{ 'text-sky-700': pageNumber > 1 }" />
                    </button>
                    <p>{{ pageNumber }} / {{ totalPage }}</p>
                    <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
                      <Icon name="mdi:code-greater-than" size="30" :class="{ 'text-sky-700': pageNumber < totalPage }" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- blog grid (end)-->
            </div>
          </section>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: false },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: true },
];
const subCategories = [
  { name: 'Web Apps', href: '#' },
  { name: 'Mobile Apps', href: '#' },
  { name: 'Data Engineering', href: '#' },
  { name: 'DevOps', href: '#' },
];
const filters = [
  {
    id: 'language',
    name: 'Language',
    options: [
      { value: 'JavaScript', label: 'JavaScript', checked: true },
      { value: 'Python', label: 'Python', checked: false },
      { value: 'HTML & CSS', label: 'HTML & CSS', checked: false },
      { value: 'Golang', label: 'Golang', checked: false },
      { value: 'SQL', label: 'SQL', checked: false },
      { value: 'Bash Scripting', label: 'Bash Scripting', checked: false },
    ],
  },
  {
    id: 'Type',
    name: 'Type',
    options: [
      { value: 'Blog Article', label: 'Blog Article', checked: true },
      { value: 'Event', label: 'Event', checked: false },
      { value: 'Documentation', label: 'Documentation', checked: false },
      { value: 'Video', label: 'Video', checked: false },
    ],
  },
  {
    id: 'Author',
    name: 'Author',
    options: [
      { value: 'Senthilnathan Karuppaiah', label: 'Senthilnathan Karuppaiah', checked: true },
      { value: 'nathans-bot', label: "Nathan's Bot", checked: false },
    ],
  },
];

const mobileFiltersOpen = ref(false);
import { useThemeStore } from '~/stores/theme';
const { path } = useRoute();
console.log('path=', path);
const { data: articles } = await useAsyncData(`content-${path}`, () => {
  return queryContent(path)
    .where({
      _path: { $ne: '/blog/_dir' },
    })
    .sort({ date: -1 })
    .find();
});
//console.log(JSON.stringify(articles))
const searchPhrase = ref('');
const elementPerPgae = ref(6);
const pageNumber = ref(1);

const searchData = computed(() => {
  return (
    articles.value.filter((data) => {
      const lowerTitle = data.title.toLocaleLowerCase();
      console.log('lowerTitle Match = ', lowerTitle.search(searchPhrase.value) !== -1);
      console.log('searchPhrase.value = ', searchPhrase.value.toLocaleLowerCase());
      if (lowerTitle.search(searchPhrase.value.toLocaleLowerCase()) !== -1) return true;
      else return false;
    }) || []
  );
});

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
