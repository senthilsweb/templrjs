<script setup>
import { useThemeStore } from '~/stores/theme';
const { path } = useRoute();
const { data: books } = await useAsyncData(`content-${path}`, () => {
  return queryContent('/_navigation/books').only('body').find();
});
</script>
<template>
  <NuxtLayout name="landing">
    <div class="mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Books</h2>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
        <div v-for="article of books[0].body" :key="article._id" class="group relative">
          <a href="/books/page-01">
            <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              <img v-if="article.thumbnailUrl" class="h-full w-full object-cover object-center" :src="article.thumbnailUrl" />
            </div>
          </a>
          <div class="flex flex-1 flex-col justify-evenly bg-white">
            <div class="flex-1 p-1">
              <a href="/books/page-01">
                <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                  {{ $s(article.title).prune(50)._wrapped }}
                </h3>
              </a>
            </div>
            <div class="mt-3 flex items-center">
              <p class="text-sm leading-5 font-medium text-gray-900 absolute left-0">
                {{ $s(article.authors[0]).prune(15)._wrapped }}
              </p>
              <div class="flex text-xs leading-5 text-gray-500 absolute right-0">
                <time :datetime="$dayjs(article.publishedDate).format('DD-MMM-YYYY')" class="text-gray-500">{{ $dayjs(article.publishedDate).format('DD-MMM-YYYY') }}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
     <div class="mt-10 flex items-center justify-center gap-x-6">
        <button type="submit" class="inline-flex items-center rounded-md px-3 py-2 text-lg font-semibold" :class="[`bg-[${useThemeStore().palette('500')}]`,`hover:bg-[${useThemeStore().palette('700')}]`]">Load More</button>
      </div>
    </div>
  </NuxtLayout>
</template>






