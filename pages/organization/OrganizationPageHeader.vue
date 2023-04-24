<template>
  <header class="w-full">
    <div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
      <div class="flex-1 flex justify-between px-2 sm:px-2">
        <div class="flex-1 min-w-0">
          <h2 class="text-lg leading-7 font-medium">
            {{ pgHead }}
          </h2>
          <div>
            <p class="text-sm leading-5 text-gray-400">
              {{ pgGuide }}
            </p>
          </div>
        </div>

        <div v-if="pgShowbutton == 'true'" class="ml-2 mt-2 pr-6 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
          <button type="button" @click="useNuxtApp().$bus.$emit('evtCompanyForm')" class="zyn-button">Edit</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      pgHead: this.heading,
      pgGuide: this.guide,
      pgShowbutton: this.showbutton,
    };
  },
  props: {
    heading: String,
    showbutton: String,
    guide: String,
    addClickEvent: String,
  },
};
</script>
