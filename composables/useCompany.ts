/**
 * This function retrieves company data either from an API or a local JSON file.
 * @returns The `useCompany` function is returning data from a fetch request to an API endpoint or a
 * local JSON file. The data being returned depends on the value of `process.env.TEMPLRJS_CMS_DATA`. If
 * it is set to `'local'`, the function will return data from a local JSON file. Otherwise, it will
 * return data from the specified API endpoint. The data being returned is
 */
export const useCompany = async () => {
  //let query = '/api/company?is_active=eq.true&is_archived=eq.false&select=code,name,is_active';
  let query = '';
  //query = '/api/company?select=*';
  query = '/api/json/company.json';

  if (process.env.TEMPLRJS_CMS_DATA == 'remote') {
    query = '/api/company?select=*';
  }
  console.log('query=', query);
  const data = await useFetch(query, {
    method: 'get',
  });
  return data;
};
