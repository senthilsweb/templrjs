<template>
  <NuxtLayout name="landing">
    <div>
      <main class="mx-auto max-w-7xl px-4">
        <div class="bg-white overflow-hidden">
          <div class="relative max-w-7xl mx-auto py-16">
            <div class="mx-auto text-base max-w-prose lg:max-w-none">
              <div>
                <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ article.title }}</h3>
              </div>
             <ContentRendererMarkdown :value="article" />
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
        </div>
      </main>
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
</script>
