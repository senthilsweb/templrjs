<script setup>
import _ from 'lodash';
definePageMeta({});

const editor = ref(null);
const title = ref('');
const content = ref('');

function autogrow() {
  alert(`${editor.value.scrollHeight}px`)
  if (!editor.value) return;
  editor.value.style.height = '5px';
  editor.value.style.height = `${editor.value.scrollHeight}px`;
}

function save() {
  $fetch(`${useRuntimeConfig().public.API_BASE_URL}/entities/blogs`, {
    method: 'POST',
    body: { content: content.value, title: useNuxtApp().$s.slugify(title.value) },
  })
    .then(async () => {
      console.log('saved');
    })
    .catch((err) => {
      alert(err.data.message);
    });
}

</script>

<template>
  <NuxtLayout name="landing">
    <div class="lg:max-w-5xl mx-auto">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div class="mt-4">
          <form class="editor-wrapper" @submit.prevent="save">
            <div class="sm:col-span-3">
            <label for="title" class="block text-md font-medium text-gray-700">Title </label>
            <div class="mt-1">
              <input v-model="title" type="text" name="title" id="title" autocomplete="name" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
            </div>
          </div>
          <div class="sm:col-span-3 mt-4">
            <label for="content" class="block text-md font-medium text-gray-700">Content </label>
            <div class="mt-1">
              <textarea name="content" v-model="content" rows="20" @input="autogrow" class="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
            </div>
          </div>
          <div class="sm:col-span-3 mt-4">
            <div class="block w-full pt-2 pb-2">
              <button @click="save" class="w-full zyn-button justify-center text-md">Save</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
