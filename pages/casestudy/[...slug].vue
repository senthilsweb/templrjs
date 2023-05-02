<script setup>
import { ref } from 'vue';
import { exportToPDF } from '#imports';
definePageMeta({

});

const editor = ref(null);
const editing = ref(false);
const saving = ref(false);
const page = useState('page');

const { path } = useRoute();
console.log('path = ', path.split('/').pop());
const pdfSection = ref(null);
// Fetch the page on SSR

console.log('path = ', path);
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
</script>

<template>
  <NuxtLayout name="landing">
    <!--Hero-->
    <div class="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div class="py-4 sm:px-2 lg:relative lg:px-0 lg:py-8">
        <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <div class="relative">
                <p class="inline  bg-clip-text font-display text-5xl tracking-tight text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300">{{ page.parsed.title }}</p>
                <p class="mt-3 text-2xl tracking-tight text-slate-400">{{ page.parsed.excerpt }}</p>
                <!--<div class="mt-8 flex gap-4 md:justify-center lg:justify-start"><a class="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500" href="/">Get started</a><a class="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400" href="/">View on GitHub</a></div>-->
              </div>
            </div>
            <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <!--<div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80" alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
              </div>-->
              <div class="z-10 relative mb-12 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-300  to-orange-500">
                <div class="w-full h-[392px]">
                  <div class="absolute inset-0">
                    <div class="divide-y divide-gray-300/50">
                      <div class="space-y-6 py-8 text-base leading-7 p-2 m-2">
                        <p class="text-3xl font-bold tracking-tight text-gray-900">The Client</p>
                        <!--<p>Since 1901, Jergens skin care has been a leading, trusted brand for moisturizing products. That’s because everything we do is designed to help you feel good – soothing relief from dryness, a touch of summer color, a fruity scent that makes Monday feel like Friday.</p>
                        <p>As a long-established brand, Jergens prioritizes innovative ways to expand awareness and growth by diversifying channels and reaching new audiences.</p>
                      -->
                      <p v-for="item in page.parsed.about_client">{{ item }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Background image: Start -->
          <div class="relative lg:static xl:pl-10">
            <div class="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <svg aria-hidden="true" viewBox="0 0 668 1069" width="668" height="1069" fill="none" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]">
                <defs>
                  <clipPath id=":R6km:-clip-path"><path fill="#fff" transform="rotate(-180 334 534.4)" d="M0 0h668v1068.8H0z"></path></clipPath>
                </defs>
                <g opacity=".4" clip-path="url(#:R6km:-clip-path)" stroke-width="4">
                  <path opacity=".3" d="M584.5 770.4v-474M484.5 770.4v-474M384.5 770.4v-474M283.5 769.4v-474M183.5 768.4v-474M83.5 767.4v-474" stroke="#334155"></path>
                  <path d="M83.5 221.275v6.587a50.1 50.1 0 0 0 22.309 41.686l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M83.5 716.012v6.588a50.099 50.099 0 0 0 22.309 41.685l55.581 37.054a50.102 50.102 0 0 1 22.309 41.686v6.587M183.7 584.5v6.587a50.1 50.1 0 0 0 22.31 41.686l55.581 37.054a50.097 50.097 0 0 1 22.309 41.685v6.588M384.101 277.637v6.588a50.1 50.1 0 0 0 22.309 41.685l55.581 37.054a50.1 50.1 0 0 1 22.31 41.686v6.587M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588" stroke="#334155"></path>
                  <path d="M384.1 770.288v6.587a50.1 50.1 0 0 1-22.309 41.686l-55.581 37.054A50.099 50.099 0 0 0 283.9 897.3v6.588M484.3 594.937v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054A50.1 50.1 0 0 0 384.1 721.95v6.587M484.3 872.575v6.587a50.1 50.1 0 0 1-22.31 41.686l-55.581 37.054a50.098 50.098 0 0 0-22.309 41.686v6.582M584.501 663.824v39.988a50.099 50.099 0 0 1-22.31 41.685l-55.581 37.054a50.102 50.102 0 0 0-22.309 41.686v6.587M283.899 945.637v6.588a50.1 50.1 0 0 1-22.309 41.685l-55.581 37.05a50.12 50.12 0 0 0-22.31 41.69v6.59M384.1 277.637c0 19.946 12.763 37.655 31.686 43.962l137.028 45.676c18.923 6.308 31.686 24.016 31.686 43.962M183.7 463.425v30.69c0 21.564 13.799 40.709 34.257 47.529l134.457 44.819c18.922 6.307 31.686 24.016 31.686 43.962M83.5 102.288c0 19.515 13.554 36.412 32.604 40.645l235.391 52.309c19.05 4.234 32.605 21.13 32.605 40.646M83.5 463.425v-58.45M183.699 542.75V396.625M283.9 1068.8V945.637M83.5 363.225v-141.95M83.5 179.524v-77.237M83.5 60.537V0M384.1 630.425V277.637M484.301 830.824V594.937M584.5 1068.8V663.825M484.301 555.275V452.988M584.5 622.075V452.988M384.1 728.537v-56.362M384.1 1068.8v-20.88M384.1 1006.17V770.287M283.9 903.888V759.85M183.699 1066.71V891.362M83.5 1068.8V716.012M83.5 674.263V505.175" stroke="#334155"></path>
                  <circle cx="83.5" cy="384.1" r="10.438" transform="rotate(-180 83.5 384.1)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="83.5" cy="200.399" r="10.438" transform="rotate(-180 83.5 200.399)" stroke="#334155"></circle>
                  <circle cx="83.5" cy="81.412" r="10.438" transform="rotate(-180 83.5 81.412)" stroke="#334155"></circle>
                  <circle cx="183.699" cy="375.75" r="10.438" transform="rotate(-180 183.699 375.75)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="183.699" cy="563.625" r="10.438" transform="rotate(-180 183.699 563.625)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="384.1" cy="651.3" r="10.438" transform="rotate(-180 384.1 651.3)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="484.301" cy="574.062" r="10.438" transform="rotate(-180 484.301 574.062)" fill="#0EA5E9" fill-opacity=".42" stroke="#0EA5E9"></circle>
                  <circle cx="384.1" cy="749.412" r="10.438" transform="rotate(-180 384.1 749.412)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="384.1" cy="1027.05" r="10.438" transform="rotate(-180 384.1 1027.05)" stroke="#334155"></circle>
                  <circle cx="283.9" cy="924.763" r="10.438" transform="rotate(-180 283.9 924.763)" stroke="#334155"></circle>
                  <circle cx="183.699" cy="870.487" r="10.438" transform="rotate(-180 183.699 870.487)" stroke="#334155"></circle>
                  <circle cx="283.9" cy="738.975" r="10.438" transform="rotate(-180 283.9 738.975)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="83.5" cy="695.138" r="10.438" transform="rotate(-180 83.5 695.138)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="83.5" cy="484.3" r="10.438" transform="rotate(-180 83.5 484.3)" fill="#0EA5E9" fill-opacity=".42" stroke="#0EA5E9"></circle>
                  <circle cx="484.301" cy="432.112" r="10.438" transform="rotate(-180 484.301 432.112)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="584.5" cy="432.112" r="10.438" transform="rotate(-180 584.5 432.112)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="584.5" cy="642.95" r="10.438" transform="rotate(-180 584.5 642.95)" fill="#1E293B" stroke="#334155"></circle>
                  <circle cx="484.301" cy="851.699" r="10.438" transform="rotate(-180 484.301 851.699)" stroke="#334155"></circle>
                  <circle cx="384.1" cy="256.763" r="10.438" transform="rotate(-180 384.1 256.763)" stroke="#334155"></circle>
                </g>
              </svg>
            </div>
            <div class="relative"></div>
          </div>
          <!--Background image: End-->
        </div>
      </div>
    </div>
    <!--Hero (End)-->
    <!--Main Content (Start)-->
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
                <a href="#" @click="editMode" class="rounded-md px-3 py-2 text-sm font-semiboldtransition-all duration-300 zyn-nav-action-button-bordered">{{ editing ? 'Editing' : 'Edit' }} this page</a>
                <a href="#" v-if="editing" class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">{{ saving ? 'Saving' : 'Save' }}</a>
              </div>
            </div>
          </div>
        </header>
        <div @dblclick="editMode" class="mt-2">
          <form v-if="editing" class="editor-wrapper" @submit.prevent="save">
            <textarea v-model="page.body" ref="editor" @blur="save" @input="autogrow" />
            <div class="block w-full pt-2 pb-2">
              <button class="w-full zyn-button zyn-login-button zyn-button-contrast">{{ saving ? 'Saving' : 'Save' }}</button>
            </div>
          </form>
          <div v-else ref="pdfSection">
            <div class="relative">
              <!--<div class="pb-2 ml-2">
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
              <ContentRendererMarkdown :value="page.parsed"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Main Content (End)-->
    <!--Technology (Start)-->
    <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div class="py-4 w-full sm:px-2 lg:relative lg:px-0">
        <h2 class="text-3xl font-bold text-gray-900">Technology Stack</h2>
        <ul role="list" class="mt-6 grid grid-cols-1 gap-6 py-6 sm:grid-cols-4">
          <li v-for="(item, itemIdx) in page.parsed.technologies" :key="itemIdx" class="flow-root">
            <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
              <Icon :name="item.icon" class="h-12 w-12" />
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  <span>{{ item.name }}</span>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ item.version }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--Technology (End)-->
    <!--Stat (Start)-->
   <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl pb-4">
    <h2 class="text-3xl font-bold text-gray-900 pb-6">The Results</h2>
    <div class="bg-gray-900 rounded-xl">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in page.parsed.stats" :key="stat.title" class="px-4 py-6 sm:px-6 lg:px-8">
            <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.name }}</p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <span class="text-4xl font-semibold inline  bg-clip-text font-display tracking-tight text-transparent bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300">{{ stat.value }}</span>
              <span v-if="stat.unit" class="text-sm text-gray-400">{{ stat.unit }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--Stat (End)-->
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
