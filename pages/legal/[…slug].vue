<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="..."></div>
    <div class="overflow-hidden col-span-3">
      <div class="relative max-w-7xl mx-auto py-16 m-6">
        <div class="mx-auto text-base max-w-prose lg:grid lg:gap-4 lg:max-w-none">
          <div>
            <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ article.title
              }}
            </h3>
          </div>
        </div>
        <div class="lg:mt-0">
          <article class="prose md:prose-md">
            <ContentDoc />
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "",
})
const { path } = useRoute()
const { data: article } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>