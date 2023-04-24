
<template>
  <NuxtLayout name="admin">
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
     
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-8xl px-4 pt-8 sm:px-6 lg:px-8">
           
           

            <!-- Gallery -->
            <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" class="sr-only">Photo Gallery</h2>
              <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <li v-for="file in gallery" :key="file.name" class="relative">
                  <div class="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                    
                    <img :src="`${useRuntimeConfig().public.SUPABASE_STORAGE_URL}/${bucket}/${file.name}`" alt="" class="group-hover:opacity-75 object-cover pointer-events-none"/>
                   
                  </div>
                  <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ file.name }}</p>
                  <p class="pointer-events-none block text-sm font-medium text-gray-500">{{ file.metadata.size }}</p>
                </li>
              </ul>
            </section>
          </div>
        </main>
        <!-- Details sidebar -->
      
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { ref } from 'vue';

definePageMeta({});
const bucket = 'brand-assets';

const { data: gallery } = await useAsyncData('storage-list-' + Math.random, () =>
  $fetch('/api/storage/' + bucket, {
    initialCache: false,
    method: 'get',
  })
);

</script>