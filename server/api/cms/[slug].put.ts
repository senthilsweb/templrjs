const storage = useStorage();

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  // Force being a string (CF workers always returns a Buffer)
  let body = (await readRawBody(event, 'utf8'))?.toString();
  let mount = `${process.env.TEMPLRJS_CMS_STORAGE_MOUNT}` || 'fs_cms'; //File System mount i.e. .data/cms/*
  if (typeof body !== 'string') {
    body = '# The page you are looking for does not exist';
  }
  await storage.getMount(mount).driver.setItem(`${slug}`, body);
  return { slug, body };
});