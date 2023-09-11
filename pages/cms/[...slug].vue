<script setup>
import { ref } from 'vue';
//import { exportToPDF } from '#imports';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

definePageMeta({});

const editor = ref(null);
const editing = ref(false);
const saving = ref(false);
const page = useState('page');

const { path } = useRoute();
const pdfSection = ref(null);
// Fetch the page on SSR

const pathArray = path.split('/');
const folder = pathArray[pathArray.length - 2];
const cms_page = pathArray.pop();
const storage_key = `${cms_page}`;
const edit = ref(useRoute().query.edit || false);


//const pdfSection = ref(null)
// Fetch the page on SSR
const data = await $fetch(`http://localhost:8080/entities/blog`);

//console.log('data = ', data);

if(data) {
  Array.isArray(data.data) ? page.value = data.data[0] : "# Sorry No page exists";
}



 const result = await parseMarkdown(page.value.post);

 console.log('result = ', JSON.stringify(result));

</script>

<template>
  <NuxtLayout name="landing">
    <div class="lg:max-w-5xl mx-auto">
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div>
          <div ref="pdfSection" class="mt-8 text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800">
            <ContentRendererMarkdown :value="result" class="p-2" />
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
