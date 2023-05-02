import lodash from 'lodash';
/**
 * This function retrieves property data from an API or a local JSON file.
 * @returns The `useProperties` function is returning the data fetched from the specified API endpoint
 * or local JSON file. The returned data includes the code, name, parent code, and active status of
 * properties.
 */
export const useProperties = async () => {
  //let query = '/api/properties?is_active=eq.true&is_archived=eq.false&select=code,name,parent_code,is_active';

  let query = '';
  //query = '/api/properties?select=code,name,parent_code,is_active';
  query = `/api/json/properties.json`;

  if (process.env.TEMPLRJS_CMS_DATA == 'remote') {
    query = '/api/properties?select=code,name,parent_code,is_active';
  }
  console.log('query=', query);
  const data = await useFetch(query, {
    method: 'get',
  });
  return data;
};
