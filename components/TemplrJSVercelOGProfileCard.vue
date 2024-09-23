<template>
  <div class="relative mx-auto text-base max-w-prose lg:max-w-none px-6 py-6">
    <div id="blog-scl-card-container">
      <!--OG Starts-->
      <div class="flex rounded-2xl flex-col justify-between w-full h-full bg-cover bg-center p-10 box-border font-sans text-white bg-indigo-600">
        <div class="flex flex-row items-start justify-start">
          <img src="https://res.cloudinary.com/nathansweb/image/upload/v1727025413/senthilsweb.com/avatars/senthil-face-photo-sep-2024.png" alt="Profile" class="w-[150px] h-[150px] mr-5 rounded-2xl rotate-3" />
          <div class="flex flex-col items-start">
            <h1 class="text-2xl">Senthilnathan Karuppaiah</h1>
            <p class="text-md flex items-center mb-2">Enterprise Data Architect</p>
            <p class="text-sm flex items-center">senthilnathan@example.com</p>
            <p class="text-sm flex items-center">+1 123-456-7890</p>
            <p class="text-sm flex items-center">www.senthilsweb.com</p>
          </div>
        </div>
      </div>
      <!--OG Ends-->
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
