<template>
  <section v-if="isUpsertClientVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-primary-200 bg-opacity-50 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-gray-700">Client</h2>
                  <div class="h-7 flex items-center">
                    <button v-on:click="closeClientPanel()" aria-label="Close panel" class="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-gray-500">Manage client/supplier/vendor</p>
                </div>
              </header>
              <!--Progress bar (start)-->
              <div v-if="progress" class="flex-1 flex flex-col justify-between">
                <div class="space-y-6 pt-6 pb-5">
                  <div class="flex justify-center">
                    <span class="inline-flex">
                      <button type="button" class="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600">
                        <svg class="-ml-1 mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <!--Progress bar (end)-->
              <div v-if="!progress" class="flex-1 flex flex-col justify-between">
                <div class="px-4 divide-y divide-gray-200 sm:px-6">
                  <div class="space-y-6 pt-6 pb-5">
                    <form name="frmClient" id="frmClient" class="space-y-8 divide-y divide-gray-200" @submit.prevent="upsertClient">
                      <div class="sm:overflow-hidden">
                        <div class="bg-white space-y-6">
                          <div class="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                              <h2 class="font-semibold text-gray-700">Client Information</h2>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                              <div class="mt-1">
                                <input type="text" id="name" name="name" v-model="data.name" class="block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="website" class="block text-sm font-medium text-gray-700">Website url</label>
                              <div class="mt-1">
                                <input type="text" id="website" name="website" v-model="data.website" class="block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
                              </div>
                            </div>
                            <!--<div class="sm:col-span-6">
															<label for="first_name" class="block text-sm font-medium text-gray-700">Code</label>
															<div class="mt-1">
																<input type="text" id="code" name="code" v-model="data.code" class="py-3 px-4 block w-full pl-5 focus:ring-lime-600 focus:border-lime-600 border-gray-300" />
															</div>
															<p class="mt-2 text-sm text-gray-500">Custom code used as unique constraint. If the same string exists will be thrown duplicate record error.</p>
														</div>-->

                            <div class="sm:col-span-6">
                              <h2 class="font-semibold text-gray-700">Address Information</h2>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="address" class="block text-sm font-medium text-gray-700">Street</label>
                              <div class="mt-1">
                                <input type="text" id="street" name="street" v-model="data.address.street" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
                              <div class="mt-1">
                                <input type="text" id="apartment" name="apartment" v-model="data.address.apartment" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                              </div>
                            </div>

                            <div class="sm:col-span-6">
                              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                              <div class="mt-1">
                                <input type="text" id="city" name="city" v-model="data.address.city" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                              </div>
                            </div>

                            <div class="sm:col-span-3">
                              <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                              <div class="mt-1">
                                <input type="text" id="state" name="state" v-model="data.address.state" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                              </div>
                            </div>

                            <div class="sm:col-span-3">
                              <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
                              <div class="mt-1">
                                <input type="text" id="postal_code" name="postal_code" v-model="data.address.postal_code" class="block w-full border-gray-300 shadow-sm focus:ring-lime-600 focus:border-lime-600 sm:text-sm" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: countries.documents }" v-on:change="handleSelectedInClient_country" show_label="true" v-model="data.address.country" name="country" label="Country" :selected_value="data.address.country" />
                            </div>
                            <div class="sm:col-span-6">
                              <h2 class="font-bold text-yellow-700">Record Information</h2>
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: record_status.documents }" v-on:change="handleSelectedInClient_record_status" show_label="true" v-model="data.record_status" name="record_status" label="Status" :selected_value="data.record_status" />
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: mark_as_delete.documents }" v-on:change="handleSelectedInClient_mark_as_delete" show_label="true" v-model="data.mark_as_delete" name="mark_as_delete" label="Mark for Deletion" :selected_value="data.mark_as_delete" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
              </span>
              <span v-if="isDeleteButtonVisible" class="inline-flex rounded-md shadow-sm">
                <button v-on:click="useNuxtApp().$bus.$emit('evtDeleteClient', data)" type="button" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-primary-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Delete</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="upsertClient" type="submit" class="zyn-button">Save</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
let api = '/api/clients/';
export default {
  components: {},
  data() {
    return {
      isUpsertClientVisible: false,
      isDeleteButtonVisible: false,
      data: {},
      date: new Date(),
      progress: false,
    };
  },
  methods: {
    /*Get a single client*/
    getClient(id) {
      this.progress = true;
      const { data: client } = useFetch(api + id, {
        method: 'post',
        initialCache: false,
        onResponse({ request, response, options }) {
          //console.log('Response from promise', response._data.document);
          this.data = response._data.document;
          this.progress = false;
        },
      });
      watch(client, () => {
        this.data = client._rawValue.document;
        //Safety coding make sure no exception is thrown if address node doesn't exist
        if (!this.data.address) {
          this.data.address = {};
        }
        //end of safety coding
        this.isDeleteButtonVisible = true;
        this.progress = false;
      });
    },
    /*Add a new client or Update an existing client*/
    async upsertClient(args) {
      try {
        this.progress = true;
        if (this.data._id === undefined) {
          //dayjs.utc()
          this.data.createdAt = useNuxtApp().$dayjs().utc();
          this.data.updatedAt = useNuxtApp().$dayjs().utc();
          const { data: res } = await useFetch(api + 'create', {
            method: 'post',
            body: this.data,
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data.insertedId) {
                useNuxtApp().$toast.show({ type: 'success', message: `Client [${response._data.insertedId}] added successfully`, timeout: 6 });
              }
            },
          });
        } else {
          const { data: res } = await useFetch(api + this.data._id, {
            method: 'put',
            body: _.omit(this.data, '_id'), //omit the mongo object id before the upsert
            initialCache: false,
            onResponse({ request, response, options }) {
              if (response._data.modifiedCount > 0) {
                useNuxtApp().$toast.show({ type: 'success', message: `Record has been updated successfully`, timeout: 6 });
              }
            },
          });
        }
        this.progress = false;
        useNuxtApp().$bus.$emit('evtSearchClient', { filter: {}, limit: 10 });
        this.data = {};
        this.isUpsertClientVisible = !this.isUpsertClientVisible;
      } catch (error) {
        console.log(error);
        this.progress = false;
      } finally {
      }
    },
    /*Delete a client */
    async deleteClient() {
      try {
        await useFetch('/api/clients/' + this.data._id, {
          method: 'delete',
          body: {},
          initialCache: false,
          onResponse({ request, response, options }) {
            if (response._data.deletedCount == 1) {
              //console.log('deletedCount = ', response._data.deletedCount);
              useNuxtApp().$toast.show({
                type: 'success',
                message: 'Delete was successful',
                timeout: 6,
              });
              this.progress = false;
              this.isUpsertClientVisible = false;
              useNuxtApp().$bus.$emit('evtSearchClient', { filter: {}, limit: 10 });
              this.data = {};
            } else {
              this.progress = false;
              useNuxtApp().$toast.show({
                type: 'error',
                message: 'The delete failed...',
                timeout: 6,
              });
            }
          },
        });
      } catch (error) {
        //TODO
      } finally {
        //TODO
      }
    },
    async closeClientPanel() {
      this.data = {};
      this.isUpsertClientVisible = !this.isUpsertClientVisible;
    },
    handleSelectedInClient_record_status(e) {
      this.data.record_status = e.target.value;
    },
    handleSelectedInClient_mark_as_delete(e) {
      this.data.mark_as_delete = e.target.value;
    },
    handleSelectedInClient_country(e) {
      this.data.country = e.target.value;
    },
  },
  created() {
    useNuxtApp().$bus.$on('evtUpsertClient', (data) => {
      if (data !== undefined) {
        this.getClient(data._cells[0].data);
      } else {
        this.data.address = {};
      }
      this.isUpsertClientVisible = !this.isUpsertClientVisible;
    });
    //2) Delete Client record and then rebind datatable
    useNuxtApp().$bus.$on('evtDeleteClient', (data) => {
      if (data !== undefined) {
        this.data = data;
        this.deleteClient();
      }
    });
  },
  beforeDestroy() {
    useNuxtApp().$bus.$off('evtUpsertClient');
    useNuxtApp().$bus.$off('evtDeleteClient');
  },
};
</script>
<script setup>
//Get server side master data for departments
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

const { data: mark_as_delete } = await useAsyncData('mark_as_delete-list-' + Math.random, () =>
  $fetch('/api/generic', {
    initialCache: false,
    method: 'post',
    body: { collection: 'properties', projection: {}, filter: { property_type: { $eq: 'mark_as_delete' } }, limit: 10000 },
    onResponse({ request, response, options }) {
      //console.log(response._data.documents);
    },
  })
);

const { data: countries } = await useAsyncData('countries-list-' + Math.random, () =>
  $fetch('/api/generic', {
    initialCache: false,
    method: 'post',
    body: { collection: 'countries', projection: {}, filter: {}, limit: 10000 },
    onResponse({ request, response, options }) {
      //console.log(response._data.documents);
    },
  })
);

const countries2 = {
  data: [
    { code: 'USA', name: 'USA' },
    { code: 'UK', name: 'UK' },
    { code: 'India', name: 'India' },
    { code: 'Singapore', name: 'Singapore' },
  ],
};
</script>
