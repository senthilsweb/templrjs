<script lang="ts" setup>
interface Props {
  path: string
  title: string
  date: string
  description: string
  image: string
  alt: string
  ogImage: string
  tags: Array<string>
  published: boolean
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog1.webp',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog1.webp',
  tags: () => [],
  published: false,
})
</script>

<template>
  <article class="group border m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-700">
    <a :href="path">
      <img
        class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500"
        :src="image"
        :alt="alt"
      />
      <div class="px-3 pb-4">
        <div class="text-black  pt-3 pb-2">
          <div class="flex items-center">
            <LogoDate />
            {{ $dayjs(date).format('DD-MMM-YYYY') }}
          </div>
           <!--<div class="flex items-center gap-1 flex-wrap">
           <LogoTag />
            <template v-for="tag in tags" :key="tag">
              <span>{{ tag }}</span>
            </template>
          </div>-->
        </div>
        <h2 class="text-xl line-clamp-3 font-semibold  text-black pb-1 group-hover:text-sky-700">
          {{ title }}
        </h2>
        <p class="line-clamp-3 text-base">
          {{ description }}
        </p>
       
        <div class="flex group-hover:underline text-sky-700 items-center py-2">
          <p>Read More</p>
          <LogoArrow />
        </div>
      
      </div>
    </a>
  </article>
</template>
