export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  console.log('JSON file =', `${process.env.TEMPLRJS_BASE_URL}/${slug}`);
  const data = await $fetch(`${process.env.TEMPLRJS_BASE_URL}/${slug}`, {
    method: 'get',
  });
  return data;
});
