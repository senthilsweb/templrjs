<!--
  author: Senthilnathan Karuppaiah
  created_at: 13-Feb-2023
  modified_at: 13-Feb-2023
  description: This is the search component for the [Users] entity
  It publishes the search event passing the search form data to the subscribed component which in this case is [UsersGrid.vue]
-->
<template>
  <div>
    <form name="frmSearchUsers" id="frmSearchUsers" ref="frmSearchUsers" v-on:submit.prevent class="space-y-8 divide-y divide-gray-200">
      <div v-if="isShowSearchUsersVisible" class="px-2 pt-2 border-b space-y-2">
        <h2 v-if="props.heading" class="text-lg leading-7 font-medium">
          {{ props.heading }}
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
        </div>
        <div class="py-3 text-right space-x-4">
          <button type="reset" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Reset</button>
          <button @click="useNuxtApp().$bus.$emit('evtSearchUsers', data)" type="submit" class="zyn-button">Search</button>
        </div>
      </div>
    </form>
  </div>
</template>
<!--Server and client side javascript-->
<script setup>
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
//Nil

//-----------------------------------------------------------------------------------------------------
//2. Page level variables
//-----------------------------------------------------------------------------------------------------

const props = defineProps(['heading']);
const isShowSearchUsersVisible = ref(false);
const data = ref({});

//-----------------------------------------------------------------------------------------------------
//3. Page or component properties
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//4. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//5. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on('evtToggleSearchUsersForm', (args) => {
  isShowSearchUsersVisible.value = !isShowSearchUsersVisible.value;
});

//-----------------------------------------------------------------------------------------------------
//6. Page level events handlers
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//7. Page level action methods
//-----------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------
//8. Form validations
//-----------------------------------------------------------------------------------------------------`
//Nil
</script>
