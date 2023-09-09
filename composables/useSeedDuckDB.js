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
