<template>
  <div>
    <form name="frmSearchRegistration" id="frmSearchRegistration" ref="frmSearchRegistration" v-on:submit.prevent class="space-y-8 divide-y divide-gray-200">
      <div v-if="isShowSearchRegistrationVisible" class="px-2 pt-2 border-b space-y-2">
        <h2 v-if="this.heading" class="text-lg leading-7 font-medium">
          {{ this.heading }}
        </h2>
        <div class="sm:col-span-6">
          <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <!-- Heroicon name: solid/search -->
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input type="search" name="name" id="name" v-model="data.name" class="focus:ring-lime-600 focus:border-lime-600 block w-full pl-10 sm:text-sm border-gray-300" placeholder="Search" />
          </div>
          <div class="sm:col-span-6">
            <Dropdownlist :data="{ data: nav_parents }" v-on:change="handleSelectedInRegistration_Parent" show_label="true" v-model="data.parent_code" name="parent_code" label="Parent" :selected_value="data.parent_code" />
          </div>
        </div>
        <!--<div class="sm:col-span-6">
          <Dropdownlist :data="{ data: record_status.documents }" v-on:change="handleSelectedInRegistration_record_status" show_label="true" v-model="data.record_status" name="record_status" label="Record Status" :selected_value="data.record_status" />
        </div>
        <div class="sm:col-span-6">
          <Dropdownlist :data="{ data: limits.documents }" v-on:change="handleSelectedInRegistrationLimit" show_label="true" v-model="data.limit" name="limit" label="Limit #. of results to" :selected_value="data.limit" />
        </div>-->
        <div class="py-3 text-right space-x-4">
          <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Reset</button>
          <button @click="useNuxtApp().$bus.$emit('evtSearchRegistration', data)" type="submit" class="zyn-button">Search</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Dropdownlist from '@/components/Dropdownlist.vue';

export default {
  props: {
    heading: String,
  },
  components: {
    Dropdownlist,
  },
  data() {
    return {
      isShowSearchRegistrationVisible: false,
      data: {},
    };
  },
  created() {
    useNuxtApp().$bus.$on('evtShowSearchRegistration', (data) => {
      this.isShowSearchRegistrationVisible = !this.isShowSearchRegistrationVisible;
    });
  },
};
</script>
<script setup>
//Get server side master data for departments
const data = ref({});
const { data: record_status } = await useAsyncData('record_status-list-' + Math.random, () =>
  $fetch('/api/generic', {
    initialCache: false,
    method: 'post',
    body: { collection: 'properties', projection: {}, filter: { property_type: { $eq: 'record_status' } }, limit: 10000 },
    onResponse({ request, response, options }) {
      //console.log(response._data.documents);
    },
  })
);
//Pull from MongoDB (JDBC)
const { data: limits } = await useAsyncData('limits-list-' + Math.random, () =>
  $fetch('/api/generic', {
    initialCache: false,
    method: 'post',
    body: { collection: 'properties', projection: {}, filter: { property_type: { $eq: 'limit' } }, limit: 10000 },
    onResponse({ request, response, options }) {
      //console.log(response._data.documents);
    },
  })
);
//Pull from postgres (JDBC)
const { data: nav_parents } = await useAsyncData('registrations-list-' + Math.random, () =>
  $fetch('/api/nav?parent_code=is.null', {
    initialCache: false,
    method: 'get',
  })
);
function handleSelectedInRegistration_record_status(e) {
  data.value.record_status = e.target.value;
}
function handleSelectedInRegistrationLimit(e) {
  data.value.limit = e.target.value;
}
function handleSelectedInRegistration_Parent(e) {
  data.value.parent_code = e.target.value;
}
</script>
