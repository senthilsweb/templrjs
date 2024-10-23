<template>
  <NuxtLayout name="landing"
    ><!-- Use the default layout if needed -->
    <div @click.stop>
      <div class="relative mb-[62px] py-4 max-h-[720px] overflow-auto py-20">
        <!-- Check if promptData exists and if prompt.query exists -->
        <div class="py-10">
          <!-- Display the query -->
          <div class="flex gap-6 mx-4 mb-6">
            <div class="prose text-gray-1000 text-lg font-bold">{{ my_query }}</div>
          </div>

          <!-- Display the progressively updated answer -->
          <div class="px-4 mb-6">
            <div class="flex gap-6 mb-6">
              <!--<div class="prose dark:prose-dark">{{ my_answer }}</div>-->
              <ClientOnly>
                <div class="mx-auto text-base max-w-prose lg:max-w-none">
                  <div class="text-sm text-zinc-600 prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10 dark:prose-hr:border-zinc-800">
                    <ContentRendererMarkdown :value="my_answer" />
                  </div>
                </div>
                <!--<BlogRelated />-->
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="hasError" class="p-6 flex flex-col items-center gap-6 mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h1m0-4h-1m9 8a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg text-gray-1200 text-center">Sorry, it looks like there is an issue!</p>
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="handleResetPrompt">Try again?</button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="p-6 text-center">
          <p class="text-lg text-gray-1200">Loading...</p>
        </div>
      </div>

      <!-- Input Area -->
      <div class="absolute bottom-0 w-full bg-gray-200 py-3">
        <input v-model="search" class="bg-gray-100 rounded mx-3 w-full p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500" :placeholder="isLoading || isResponding ? 'Waiting for a response...' : 'Ask a question...'" @keydown.enter="handleConfirm(search)" :disabled="isLoading || isResponding" />
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { ref } from 'vue';

import { SSE } from 'sse.js'; // Named import instead of default

const promptData = ref([]);
const my_answer = ref('');
const my_query = ref('');
const search = ref('');
const isLoading = ref(false);
const isResponding = ref(false);
const hasError = ref(false);
let eventSourceRef = null; // Reference for SSE instance

const edgeFunctionUrl = '/api/blog/chat'; // Your endpoint for the SSE
const doc_content = ref(null);
const updateContent = () => {
  if (doc_content.value) {
    doc_content.value.innerHTML = my_answer.value;
  }
};
const handleConfirm = async (query) => {
  if (!query) {
    console.error('Query is empty. Please enter a valid question.');
    return;
  }
  my_query.value = query;
  if (!edgeFunctionUrl) {
    console.error('No edge function URL');
    return;
  }

  // Add the new query to the promptData array
  promptData.value.push({ query: query, answer: '' });

  const currentPromptIndex = promptData.value.length - 1;

  search.value = '';
  isLoading.value = true;
  isResponding.value = true;
  hasError.value = false;

  try {
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      buffer += decoder.decode(value, { stream: true });

      // Split the buffer on newlines
      const chunks = buffer.split('\n\n');

      chunks.forEach(async (chunk) => {
        if (chunk.trim() === '' || chunk.trim() === '[DONE]') {
          console.log('Skipping [DONE] marker');
          return;
        }

        try {
          const cleanedChunk = chunk.replace(/^data:\s*/, '');

          if (cleanedChunk.trim()) {
            if (cleanedChunk.startsWith('{') && cleanedChunk.endsWith('}')) {
              const json = JSON.parse(cleanedChunk);
              const text = json.choices[0]?.delta?.content || '';

              // Directly updating the answer in the promptData array to ensure reactivity
              promptData.value[currentPromptIndex].answer += text;

              console.log('Processing complete JSON chunk:', json);
              console.log('Updated answer:', promptData.value[currentPromptIndex].answer);
              my_answer.value = await parseMarkdown(promptData.value[currentPromptIndex].answer);
              //my_answer.value = promptData.value[currentPromptIndex].answer;
              //updateContent();
            } else {
              console.log('Skipping invalid JSON chunk:', cleanedChunk);
            }
          }
        } catch (error) {
          console.error('Error parsing chunk, skipping invalid JSON:', chunk);
        }
      });

      buffer = '';
    }

    isResponding.value = false;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching the response:', error);
    isResponding.value = false;
    isLoading.value = false;
    hasError.value = true;
  }
};

const handleResetPrompt = () => {
  if (eventSourceRef) {
    eventSourceRef.close();
  }
  search.value = '';
  isResponding.value = false;
  hasError.value = false;
};
</script>
