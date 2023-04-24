<template>
  <header class="w-full">
    <div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
      <div class="flex-1 flex justify-between px-2 sm:px-2">
        
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
  methods: {
    created() {},
    beforeMount() {},
  },
};
</script>
