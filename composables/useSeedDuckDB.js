/**
 * This function retrieves child navigation data either from a local JSON file or from a PostgreSQL
 * database.
 * @returns The `useChildNav` function returns a Promise that resolves to the result of calling the
 * `useFetch` function with a query and options object as arguments. The result is the child navigation
 * data fetched from either a local JSON file or a PostgreSQL database, depending on the value of the
 * `TEMPLRJS_CMS_DATA` environment variable.
 */

export const useSeedDuckDB = async () => {
  const tables = ['parent_nav', 'child_nav', 'company', 'countries', 'properties'];
  const errors = [];
  
  for (const tablename of tables) {
    try {
      const query = `CREATE TABLE ${tablename} AS SELECT * FROM read_json_auto('${useRuntimeConfig().public.CONFIG_BASE_URL}/${tablename}.json')`;
  
      const response = await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/execute-query`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "query": query,
        }), // Convert the body to a JSON string
      });
  
      if (response.ok) {
        console.log(`${query} executed successfully.`);
      } else {
        errors.push(JSON.stringify(response.status));
        console.log("response.status for ", query);
        console.log("response.status=", JSON.stringify(response))
      }
    } catch (error) {
      console.error(`An error occurred while executing query for ${tablename}: ${error.message}`);
      errors.push(JSON.stringify(error.message));
      console.log("error.message=", JSON.stringify(error.message))
    }
  }
  
  if (errors.length > 0) {
    console.log("errors.join=", errors.join(', '))
    throw new Error(`Failed to execute queries: ${errors.join(', ')}`);
  } else {
    return true;
  }
  

    
};
