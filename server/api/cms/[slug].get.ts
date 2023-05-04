const storage = useStorage();

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  //console.log('mount=', storage.getMount('fs_cms'));
  //console.log('slug inside the server=', slug);
  let mount = `${process.env.TEMPLRJS_CMS_STORAGE_MOUNT}` || 'fs_cms'; //File System mount i.e. .data/cms/*
  let body = await storage.getMount(mount).driver.getItem(`${slug}`);
  //console.log('body=', body);
  if (typeof body !== 'string') {
    body = '# The page you are looking for does not exist';
  }
  return { slug, body };
});

