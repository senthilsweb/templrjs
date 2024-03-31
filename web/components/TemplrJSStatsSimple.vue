<template>

  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="(item, index) in props.data">
      <div v-if="!item.hidden">
        <div class="relative bg-white pt-6 px-6 shadow overflow-hidden" :class="[item.links ? 'pb-12' : '']">
          <dt>
            <div :class="[item.iconBackground, item.iconForeground,'absolute rounded-lg p-3 ring-4 ring-white']">
              <!-- Heroicon name: outline/users -->
              <Icon :name="item.icon" class="h-6 w-6" />
            </div>
            <p class="ml-16 text-md font-medium text-gray-500 truncate">{{ item.title }}</p>
          </dt>
          <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ $s.isBlank(item.value) ? '&nbsp;' : item.value }}</p>
            <div v-if="item.links" class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <ul>
                    <li v-on:click="useNuxtApp().$bus.$emit(`${link.clickEvent}`)" v-for="(link, index) in item.links" :key="'stat_lnk_' + index" class="text-sm">
                      <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
                        {{ link.title }}<span class="sr-only"> {{ link.title }}</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </dd>
        </div>
      </div>
    </div>
  </dl>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  api_end_point: {
    type: String,
    required: false,
  },
});
</script>
