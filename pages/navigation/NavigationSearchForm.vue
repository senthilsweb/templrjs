<template>
  <!-- Secondary sidebar (Start)-->
  <nav aria-label="Sections" class="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col">
    <div class="h-16 px-2 border-b border-blue-gray-200 items-center">
      <h2 class="text-lg leading-7 font-medium">Business Card</h2>
      <div>
        <p class="text-sm leading-5 text-gray-400">REPL Business card</p>
      </div>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto p-2">
      <div class="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-2">
        <!--Cloudinary image Template URL (Start)-->
        <div class="sm:col-span-6">
          <h2 class="font-semibold text-gray-700">Cloudinary Image Template Details</h2>
        </div>
        <div class="sm:col-span-6">
          <div class="mt-1">
            <input v-model="data.cloudinary_image_version" type="text" placeholder="version" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
          </div>
        </div>
        <div class="sm:col-span-6">
          <div class="mt-1">
            <input v-model="data.cloudinary_image_public_id" type="text" placeholder="Public Id." class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
          </div>
        </div>
        <!--Cloudinary image Template URL (End)-->
        <!--Name (Start)-->
        <div class="sm:col-span-6">
          <h2 class="font-semibold text-gray-700">Name</h2>
        </div>
        <div class="sm:col-span-6">
          <div class="mt-1">
            <input v-model="data.name" type="text" placeholder="Name" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
          </div>
        </div>
        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.name_x" type="text" placeholder="X Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>

        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.name_y" type="text" placeholder="Y Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>
        <!--Name (End)-->
        <!--Designation (Start)-->
        <div class="sm:col-span-6">
          <h2 class="font-semibold text-gray-700">Designation</h2>
        </div>
        <div class="sm:col-span-6">
          <div class="mt-1">
            <input v-model="data.designation" type="text" placeholder="Designation" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
          </div>
        </div>
        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.designation_x" type="text" id="state" name="state" placeholder="X Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>

        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.designation_y" type="text" placeholder="Y Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>
        <!--Designation (End)-->
        <!--Email (Start)-->
        <div class="sm:col-span-6">
          <h2 class="font-semibold text-gray-700">Email</h2>
        </div>
        <div class="sm:col-span-6">
          <div class="mt-1">
            <input v-model="data.email" type="text" placeholder="Email" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
          </div>
        </div>
        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.email_x" type="text" placeholder="X Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>

        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.email_y" type="text" placeholder="Y Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>
        <!--Email (End)-->
        <!--Mobile (Start)-->
        <div class="sm:col-span-6">
          <h2 class="font-semibold text-gray-700">Mobile</h2>
        </div>
        <div class="sm:col-span-6">
          <div class="mt-1">
            <input v-model="data.mobile" type="text" placeholder="Mobile" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
          </div>
        </div>
        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.mobile_x" type="text" placeholder="X Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>

        <div class="sm:col-span-3">
          <div class="mt-1">
            <input v-model="data.mobile_y" type="text" placeholder="Y Pos." class="block w-full border-gray-300 shadow-sm focus:ring-primary-600 focus:border-primary-600 sm:text-sm" />
          </div>
        </div>
        <!--Mobile (End)-->
        <div class="sm:col-span-6 pt-2">
          <button id="btnBusinessCardRender" name="btnBusinessCardRender" @click="useNuxtApp().$bus.$emit('evtBusinessCardRender', data)" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-primary-900 hover:bg-primary-700 focus:outline-none focus:border-primary-900 focus:shadow-outline-primary active:bg-primary-900 transition duration-150 ease-in-out">Render</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
const data = ref({});
</script>
