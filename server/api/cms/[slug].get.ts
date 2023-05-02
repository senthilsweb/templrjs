const storage = useStorage();

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  //console.log('mount=', storage.getMount('fs_cms'));
  //console.log('slug inside the server=', slug);
  let body = await storage.getMount('fs_cms').driver.getItem(`${slug}`);
  //console.log('body=', body);
  if (typeof body !== 'string') {
    body = '# The page you are looking for does not exist';
  }
  return { slug, body };
});

