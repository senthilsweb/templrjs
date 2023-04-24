<script setup>
const page = useState('page');
const { path } = useRoute().split('/').pop();
console.log('path = ', path.split('/').pop());
// Fetch the page on SSR
if (!page.value) {
  page.value = await $fetch(`/api/pages/${path}`);
  page.value.parsed = await parseMarkdown(page.value.body);
}
// Re-parse on hydration to enable shiki highlight for code blocks
if (page.value && process.client) {
  onMounted(async () => {
    page.value.parsed = await parseMarkdown(page.value.body);
  });
}
</script>

<template>
  <div class="relative max-w-7xl mx-auto py-16 m-6">
    <div class="lg:mt-0">
      <article class="prose md:prose-md">
        <ContentRendererMarkdown :value="page.parsed" class="body" />
      </article>
    </div>
  </div>
</template>
