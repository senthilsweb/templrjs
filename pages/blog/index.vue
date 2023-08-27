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
                            <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
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
          <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <p class="text-2xl font-bold tracking-tight text-gray-900">Blog Posts</p>
            <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 pl-2 pr-2">
              <form class="flex flex-1" action="#" method="GET">
                <input type="text" name="name" id="name" class="hidden sm:block w-full rounded-md border-0 px-4 py-1.5 ml-44 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search by keywords" />
              </form>
            </div>
            <button type="submit" class="hidden sm:block rounded-md px-3 zyn-search-button">Search</button>

            <div class="flex items-center">
              <button type="button" class="-m-2 ml-5 mr-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 lg:hidden">
                <span class="sr-only">View grid</span>
                <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <Menu as="div" class="relative inline-block text-left sm:ml-7">
                <div>
                  <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </MenuButton>
                </div>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                        <a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span class="sr-only">View grid</span>
                <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">
                <span class="sr-only">Filters</span>
                <FunnelIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" class="pb-24 pt-6">
            <h2 id="products-heading" class="sr-only">Blogs</h2>

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
                        <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              <!-- blog grid (start)-->
              <div class="lg:col-span-3">
                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <article v-for="article of articles" :key="article._path" class="flex flex-col items-start justify-between">
                  <div class="relative w-full">
                    <img v-if="article.coverimage" :src="article.coverimage" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                    <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>

                  <div class="max-w-xl">
                    <div class="mt-8 flex items-center gap-x-4 text-xs">
                      <time :datetime="article.date" class="text-gray-500"> {{ $dayjs(article.date).format('DD-MMM-YYYY') }}</time>
                      <a href="#" class="inline-block">
                        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="(article.type == 'Blog' && 'bg-emerald-300 text-emerald-800') || (article.type == 'Article' && 'bg-sy-500 text-white') || (article.type == 'Event' && 'bg-primary-500 text-white')">
                          {{ article.type }}
                        </span>
                      </a>
                    </div>
                    <div class="group relative">
                      <h3 class="mt-3 line-clamp-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a :href="article._path">
                          <span class="absolute inset-0" />
                          {{ article.title }}
                        </a>
                      </h3>
                      <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {{ article.description }}
                      </p>
                    </div>
                    <div class="relative mt-4 flex items-center gap-x-4">
                      <div class="text-sm leading-6">
                        <p class="font-semibold text-gray-900">
                          <a href="#">
                            <span class="absolute inset-0" />
                            {{ article.author }}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <button type="submit" class="rounded-md zyn-search-button" :class="[`bg-[${useThemeStore().palette('500')}]`, `hover:bg-[${useThemeStore().palette('700')}]`]">Load More...</button>
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
      { value: 'nathans-bot', label: 'Nathan\'s Bot', checked: false },
    ],
  },
];

const mobileFiltersOpen = ref(false);
import { useThemeStore } from '~/stores/theme';
const { path } = useRoute();
const { data: articles } = await useAsyncData(`content-${path}`, () => {
  return queryContent(path)
    .where({
      _path: { $ne: '/blog/_dir' },
    })
    .sort({ date: -1 })
    .find();
});
//console.log(JSON.stringify(articles))
</script>

<style scoped></style>
