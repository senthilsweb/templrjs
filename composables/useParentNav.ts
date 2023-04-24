export const useParentNav = async () => {
  let query = '';
  query = `${process.env.TEMPLRJS_BASE_URL}/parent_nav.json`;
  if (process.env.TEMPLRJS_DB == 'supabase') {
    query = '/api/postgres/navigation_parent';
  }
  console.log('query=', query);
  const parent = await useFetch(query, {
    method: 'get',
  });
  return parent;
};
