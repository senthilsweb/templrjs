export const useProperties = async () => {
  let query = '';
  query = `${process.env.TEMPLRJS_BASE_URL}/properties.json`;
  if (process.env.TEMPLRJS_DB == 'supabase') {
    query = '/api/properties?select=code,name,parent_code,is_active';
  }
  console.log('query=', query);
  const parent = await useFetch(query, {
    method: 'get',
  });
  return parent;
};
