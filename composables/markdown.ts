/**
 * This is a TypeScript function that parses markdown and highlights code using the Shiki library.
 * @param {string} body - The markdown content that needs to be parsed and highlighted.
 * @returns The `parseMarkdown` function is returning a Promise that resolves to the parsed Markdown
 * content. The content is parsed using the `mdTransformer` from the `@nuxt/content` package. If the
 * code is running on the client-side, the `highlight` function is called to apply syntax highlighting
 * to the parsed content using the `shikiTransformer` from the same package.
 */
import mdTransformer from '@nuxt/content/transformers/markdown';
import shikiTransformer from '@nuxt/content/transformers/shiki/shiki';

export async function parseMarkdown(body: string) {
  const parsed = await mdTransformer.parse('index.md', body, {});

  if (process.client) {
    await highlight(parsed);
  }

  return parsed;
}

export async function highlight(parsed) {
  await shikiTransformer.transform(parsed, {
    preload: ['js', 'ts', 'md', 'vue'],
    theme: {
      default: 'github-light',
      dark: 'github-dark',
    },
  });
}
