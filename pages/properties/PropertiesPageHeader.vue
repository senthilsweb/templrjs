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
      </div>
      <div v-if="pgShowbutton == 'true'" class="ml-2 mt-2 pr-6 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
        <button @click="useNuxtApp().$bus.$emit('evtShowSearchProperties')" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Icon name="icon-park-twotone:search" class="h-6 w-6" />
        </button>
        <button type="button" @click="useNuxtApp().$bus.$emit('evtUpsertProperties')" class="zyn-button">
          <Icon name="heroicons:plus-20-solid" class="h-6 w-6 text-white" />
          Add a Property
        </button>
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
