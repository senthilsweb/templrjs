const storage = useStorage();

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  console.log('slug=', slug);
  let body = await storage.getItem(`${slug}`);
  if (typeof body !== 'string') {
    body = '# The page you are looking for does not exist';
  }
  return { slug, body };
});
