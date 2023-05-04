/**
 * This function retrieves child navigation data either from a local JSON file or from a PostgreSQL
 * database.
 * @returns The `useChildNav` function returns a Promise that resolves to the result of calling the
 * `useFetch` function with a query and options object as arguments. The result is the child navigation
 * data fetched from either a local JSON file or a PostgreSQL database, depending on the value of the
 * `TEMPLRJS_CMS_DATA` environment variable.
 */

export const useChildNav = async () => {
  let query = '';

  query = `/api/json/child_nav.json`;
  if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'dbms') {
    query = '/api/postgres/navigation_child';
  }
  console.log('query=', query);
  const child = await useFetch(query, {
    method: 'get',
  });
  return child;
};
