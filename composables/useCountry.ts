export const useCountry = async () => {
  let query = '';
  query = `${process.env.TEMPLRJS_BASE_URL}/countries.json`;
  if (process.env.TEMPLRJS_DB == 'supabase') {
    query = '/api/country?select=id,code,name';
  }
  console.log('query=', query);
  const country = await useFetch(query, {
    method: 'get',
  });
  return country;
};
