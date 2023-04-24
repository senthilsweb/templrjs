const storage = useStorage();
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  // Force being a string (CF workers always returns a Buffer)
  const body = (await readRawBody(event, 'utf8'))?.toString();
  console.log('saving into storage with key =', `${slug}`);
  await storage.setItem(`${slug}`, body);
  return { slug, body };
});