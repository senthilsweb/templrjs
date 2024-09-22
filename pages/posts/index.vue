<template>
  <NuxtLayout name="landing">
    <div class="mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Recent Blog Posts</h2>
      </div>
     <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
        <div v-for="article of articles" :key="article._path" class="group relative">
          <a :href="article._path">
            <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
              <img v-if="article.coverimage" class="h-full w-full object-cover object-center" :src="article.coverimage" />
            </div>    
          </a>
          <div class="flex flex-1 flex-col justify-evenly bg-white">
            <div class="flex-1 p-1">
              <a href="#" class="inline-block">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="(article.type == 'Blog' && 'bg-emerald-300 text-emerald-800') || (article.type == 'Article' && 'bg-sy-500 text-white') || (article.type == 'Event' && 'bg-primary-500 text-white')">
                  {{ article.type }}
                </span>
              </a>
              <a :href="article._path">
                <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                 
                    {{ $s(article.description).prune(50)._wrapped }}
                 
                </h3>
                <p class="mt-3 text-base leading-6 text-gray-500">
                  
                    {{ $s(article.description).prune(100)._wrapped }}
                 
                </p>
              </a>
            </div>
            <div class="mt-3 flex items-center">
              <p class="text-sm leading-5 font-medium text-gray-900">
                {{ $s(article.author).prune(15)._wrapped }}
              </p>
              <span class="mx-1"> &middot; </span>
              <div class="flex text-sm leading-5 text-gray-500">
                {{ $dayjs(article.date).format('DD-MMM-YYYY') }}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { path } = useRoute();
const { data: articles } = await useAsyncData(`content-${path}`, () => {
  return queryContent(path).find();
});
</script>

<style scoped></style>
