<script setup>
import { ref } from 'vue';
//import { exportToPDF } from '#imports';
definePageMeta({
  
});

const editor = ref(null);
const editing = ref(false);
const saving = ref(false);
const page = useState('page');

const { path } = useRoute();
console.log('path23232323 = ', path.split('/').pop());
const pdfSection = ref(null);
// Fetch the page on SSR

console.log('path ABC= ', path);
const pathArray = path.split('/');
const folder = pathArray[pathArray.length - 2];
const cms_page = pathArray.pop();
const storage_key = `${cms_page}`;
const edit = ref(useRoute().query.edit || false);

//const pdfSection = ref(null)
// Fetch the page on SSR
if (!page.value) {
  page.value = await $fetch(`/api/cms/${storage_key}`);
  page.value.parsed = await parseMarkdown(page.value.body);
}

// Re-parse on hydration to enable shiki highlight for code blocks
if (page.value && process.client) {
  onMounted(async () => {
    page.value.parsed = await parseMarkdown(page.value.body);
  });
}

async function editMode() {
  console.log('editMode fired');
  editing.value = true;
  await nextTick();
  editor.value.focus();
  autogrow();
}

function autogrow() {
  if (!editor.value) return;
  editor.value.style.height = '5px';
  editor.value.style.height = `${editor.value.scrollHeight}px`;
}

function save() {
  if (!editing.value || saving.value) return;
  saving.value = true;
  $fetch(`/api/cms/${storage_key}`, {
    method: 'PUT',
    body: page.value.body,
  })
    .then(async () => {
      page.value.parsed = await parseMarkdown(page.value.body);
      editing.value = saving.value = false;
    })
    .catch((err) => {
      editing.value = saving.value = false;
      alert(err.data.message);
    });
}
console.log('Registering event cms_edit')
useNuxtApp().$bus.$on('cms_edit', (data) => {
console.log('Firing event cms_edit')
 //alert('cms_edit');
  //editMode();
});
console.log('Registered event cms_edit')
</script>

<template>
  <NuxtLayout name="landing">
    <div class="[usePropertiesStore().layout_width ? usePropertiesStore().layout_width : 'lg:max-w-7xl mx-auto']">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <header v-if="edit" class="relative isolate pt-16">
          <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div class="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
              <div class="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]" style="clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)" />
            </div>
            <div class="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
          </div>
          <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-teal-100">
            <div class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div class="flex items-center gap-x-6">
                <a href="#" @click="exportToPDF(`${page.parsed.title}.pdf`, pdfSection, undefined, { html2canvas: { margin: 1, scale: 0.5, width: 793.92, height: 1122.24, useCORS: true } })" class="rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered">Export to PDF</a>
              </div>
              <div class="flex items-center gap-x-4 sm:gap-x-6">
                <button @click="editMode()" class="rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered">{{ editing ? 'Editing' : 'Edit' }} this page</button>
                <a href="#" v-if="editing" class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">{{ saving ? 'Saving' : 'Save' }}</a>
              </div>
            </div>
          </div>
        </header>
        <div @dblclick="editMode">
          <form v-if="editing" class="editor-wrapper" @submit.prevent="save">
            <textarea v-model="page.body" ref="editor" @blur="save" @input="autogrow" />
            <div class="block w-full pt-2 pb-2">
              <button class="w-full zyn-button zyn-login-button zyn-button-contrast">{{ saving ? 'Saving' : 'Save' }}</button>
            </div>
          </form>
          <div v-else ref="pdfSection">
            <!--<div class="pt-10 pb-2 ml-2">
              <ul class="space-y-4">
                <li class="flex items-center" v-for="tag of page.parsed.tags" :key="tag">
                  <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p class="ml-4">
                    {{ tag }}
                  </p>
                </li>
              </ul>
            </div>-->
            <ContentRendererMarkdown :value="page.parsed" class="p-2" />
          </div>
        </div>
      </div>
    </div>
    </NuxtLayout>
</template>

<style lang="postcss">
.page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: white;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  &:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  }
  .body {
    h1:first-child {
      margin-top: 0;
    }
    h2 a,
    h3 a,
    h4 a,
    h5 a,
    h6 a {
      text-decoration: none;
      color: inherit;
    }
    pre {
      padding: 10px;
      border: 1px #ddd solid;
      border-radius: 5px;
      background: rgb(243, 243, 243);
    }
    p code {
      padding: 2px 6px;
      background: rgb(243, 243, 243);
      border-radius: 5px;
    }
    a {
      color: blue;
    }
  }
}
.editor-wrapper {
  input {
    width: 100%;
  }

  textarea {
    width: 100%;
    min-height: 200px;
    height: 100%;
    border-width: 0;
    outline: none;
    resize: none;
  }
}
.edit {
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #777;
  }
}
</style>
