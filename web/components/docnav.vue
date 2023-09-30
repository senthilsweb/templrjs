<template>
  <div>
    <h5 class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">{{ title }}</h5>
    <ul role="list" class="mt-2 space-y-2 border-l-2 border-gray-100 dark:border-gray-800 lg:mt-4 lg:space-y-4 lg:border-gray-200">
      <li class="relative" v-for="item of data" :key="item.path">
        <a :href="item._path" :class="{ 'font-semibold text-sky-500 before:bg-sky-500': item._path === useRoute().path }" class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-trangray-y-1/2 before:rounded-full text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'doc-nav',
  data() {
    return {};
  },
  props: {
    data: Array,
    title: String,
  },
  methods: {},
  created() {},
};
</script>
