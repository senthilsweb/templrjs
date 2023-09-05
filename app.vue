<template>
  <div class="mx-auto" id="app">
    <div class="min-h-screen relative">
      <div class="h-full relative">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>

//#############################################################################################

const page_meta = [];
</script>
<style>
.zyn-button {
  @apply relative inline-flex items-center border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out;
}
.zyn-secondary-button {
  @apply relative flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:border-secondary-700 active:bg-secondary-700 transition duration-150 ease-in-out;
}
.zyn-button-contrast {
  @apply bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:border-lime-700  active:bg-lime-700;
}
.zyn-login-button {
  @apply justify-center py-2;
}
.zyn-swatch-button {
  @apply relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-500 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75;
}
.zyn-swatch-unselected {
  @apply bg-primary-500;
}
.zyn-swatch-selected {
  @apply bg-primary-800;
}
.zyn-nav-action-button {
  @apply ring-2 ring-primary-500 bg-primary-500 hover:bg-primary-700 text-white;
}
.zyn-search-button {
  @apply bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600;
}
.zyn-nav-action-button-bordered {
  @apply ring-2 ring-gray-500 hover:bg-gray-700 text-gray-500 hover:text-white;
}
</style>
