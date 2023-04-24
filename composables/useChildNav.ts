export const useChildNav = async () => {
  let query = '';
  query = `${process.env.TEMPLRJS_BASE_URL}/child_nav.json`;
  if (process.env.TEMPLRJS_DB == 'supabase') {
    query = '/api/postgres/navigation_child';
  }
  console.log('query=', query);
  const child = await useFetch(query, {
    method: 'get',
  });
  return child;
};
