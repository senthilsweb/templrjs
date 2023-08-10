export default defineEventHandler(async () => {
  const [blogs, books, casestudies, jobs] = await Promise.all([$fetch('/api/blog'), $fetch('/api/book'), $fetch('/api/job'), $fetch('/api/casestudy')]);
  return [blogs, books, casestudies, jobs].map((p) => {
    return { loc: p.url, lastmod: p.updatedAt };
  });
});
