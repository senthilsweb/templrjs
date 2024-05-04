<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ props.title ? props.title : '' }}</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ props.title_description ? props.title_description : '' }}</p>
    </div>
    <div class="border-t border-gray-200">
      <dl class="mt-2 divide-y divide-gray-200 border-b border-gray-200">
        <div v-for="(key, idx) in Object.keys(props.data)" :key="key" :class="[idx % 2 == 0 ? 'bg-white' : 'bg-gray-50', 'px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6']">
          <template v-if="!isObject(props.data[key])">
            <dt class="text-sm font-medium whitespace-nowrap text-gray-900">{{ useCapitalize(useLowerCase(key)) }}</dt>
            <dd class="mt-1 mx-10 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{{ props.data[key] }}</dd>
          </template>
          <template v-else-if="isObject(props.data[key])">
            <dt class="text-sm font-medium text-gray-900">{{ useCapitalize(useLowerCase(key)) }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <dl class="mt-2 divide-y divide-gray-200 border-b border-gray-200">
                <div v-for="(key2, idx2) in Object.keys(props.data[key])" :key="key2" :class="[idx2 % 2 == 0 ? 'bg-white' : 'bg-gray-50', 'py-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6']">
                  <dt class="text-sm font-medium whitespace-nowrap text-gray-900">{{ useCapitalize(useLowerCase(key2)) }}</dt>
                  <dd class="mt-1 text-sm text-gray-500 sm:col-span-1 sm:mt-0">{{ props.data[key][key2] }}</dd>
                </div>
              </dl>
            </dd>
          </template>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  title_description: {
    type: String,
    required: false,
  },
  api_end_point: {
    type: String,
    required: false,
  },
  data: {
    type: Object,
    required: false,
  },
});
</script>
