/**
 * This function fetches country data from an API endpoint or a local JSON file depending on the
 * environment variable.
 * @returns The `useCountry` function is returning the data fetched from the specified API endpoint or
 * local JSON file. The returned data contains the `id`, `code`, and `name` properties of countries.
 */
export const useCountry = async () => {
  let query = '';
  //query = '/api/country?select=id,code,name';
  query = `/api/json/countries.json`;
  if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'dbms') {
    query = '/api/country?select=id,code,name';
  }
  console.log('query=', query);
  const data = await useFetch(query, {
    method: 'get',
  });
  return data;
};
