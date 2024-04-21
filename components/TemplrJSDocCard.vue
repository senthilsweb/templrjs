<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
    <div v-for="(card, index) in data" :key="index" class="flex w-full relative text-white overflow-hidden rounded-3xl shadow-lg">
      <div :class="`flex w-full md:flex-col bg-gradient-to-br ${card.bgFrom} ${card.bgTo}`">
        <div class="max-w-sm flex flex-col items-start relative z-10 p-6 xl:p-8">
          <h2 class="text-xl font-semibold mb-2">{{ card.heading }}</h2>

          <p :class="`mb-4 ${card.textColor} text-sm hover:text-shadow`">
            {{ card.paragraph }}
          </p>
          <a :href="card.link" :class="`mt-auto ${card.buttonColor} text-shadow hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex`">
            {{ card.buttonText }}
          </a>
        </div>
        <div class="relative hidden sm:block"></div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-20 hidden sm:block" :style="gradientStyle(card)"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: Array,
});

const gradientStyle = (card) => {
  return `background: linear-gradient(to top, ${card.bgFrom}, rgba(${card.bgFrom}, 0));`;
};
</script>

<style>
/* You can add additional styles if needed */
</style>
