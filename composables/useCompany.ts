export const useCompany = async () => {
  let query = '';
  query = `${process.env.TEMPLRJS_BASE_URL}/company.json`;
  if (process.env.TEMPLRJS_DB == 'supabase') {
    query = '/api/company?select=*';
  }
  console.log('query=', query);
  const company = await useFetch(query, {
    method: 'get',
  });
  return company;
};
