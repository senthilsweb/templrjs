<template>
  <div class="relative mx-auto text-base max-w-prose lg:max-w-none px-6 py-6">
    <div id="blog-scl-card-container">
      <div class="absolute inset-0 z-10 mx-0 max-w-none overflow-hidden rounded-2xl">
        <div class="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div :class="['absolute inset-0 opacity-40', `bg-gradient-to-r from-green-500 to-green-200`, `dark:from-green-500/30 dark:to-green-200/30`, '[mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:opacity-100']">
            <svg aria-hidden="true" class="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:stroke-white/5">
              <defs>
                <pattern id=":S1:" width="72" height="56" patternUnits="userSpaceOnUse" x="-12" y="4"><path d="M.5 56V.5H72" fill="none"></path></pattern>
              </defs>
              <rect width="100%" height="100%" stroke-width="0" fill="url(#:S1:)"></rect>
              <svg x="-12" y="4" class="overflow-visible">
                <rect stroke-width="0" width="73" height="57" x="288" y="168"></rect>
                <rect stroke-width="0" width="73" height="57" x="144" y="56"></rect>
                <rect stroke-width="0" width="73" height="57" x="504" y="168"></rect>
                <rect stroke-width="0" width="73" height="57" x="720" y="336"></rect>
              </svg>
            </svg>
          </div>
          </div>
      </div>
    </div>
    <div>
      <h1 class="text-2xl tracking-tight text-gray-900 dark:text-white">{{ props.title }}</h1>
      <p class="mt-2 text-sm text-slate-800">{{ props.description }}</p>
      <div class="flex items-center gap-2 mt-2">
        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd"></path>
        </svg>
        <p class="text-sm font-semibold text-gray-900">{{ props.author }}</p>
        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd"></path>
        </svg>
        <time :datetime="props.date" class="text-gray-500 text-sm">{{ $dayjs(props.date).format('MMM DD, YYYY') }}</time>
      </div>

      <div class="pt-4 flex flex-wrap justify-left gap-x-2 gap-y-2">
        <span v-for="tag in tagsWithColors" :key="tag.text" class="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset" :class="tag.colorClass">
          {{ tag.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  type: String,
  color: String,
  description: String,
  tags: Array,
  author: String,
  date: String,
});

const colorClasses = ['gray', 'red', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'teal', 'cyan'];

const randomColorClass = (color) => `bg-${color}-400/10 text-${color}-400 ring-${color}-400/20`;

const tagsWithColors = computed(() => {
  return props.tags.map((tag) => ({
    text: tag,
    colorClass: randomColorClass(colorClasses[Math.floor(Math.random() * colorClasses.length)]),
  }));
});
</script>

<style>
/* You can add additional styles if needed */
</style>
