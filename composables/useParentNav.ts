/**
 * This function retrieves navigation data either from a local JSON file or from a PostgreSQL database.
 * @returns The `useParentNav` function returns the data fetched from the
 * `/api/postgres/navigation_parent` endpoint or the `/api/json/parent_nav.json` file, depending on the
 * value of the `TEMPLRJS_CMS_DATA` environment variable. The data is fetched using the `useFetch`
 * function with a `get` method.
 */
export const useParentNav = async () => {
  let query = '';
  //query = '/api/postgres/navigation_parent';
  query = `/api/json/parent_nav.json`;
  if (process.env.TEMPLRJS_CMS_DATA == 'remote') {
    query = '/api/postgres/navigation_parent';
  }
  console.log('query=', query);
  const data = await useFetch(query, {
    method: 'get',
  });
  return data;
};
