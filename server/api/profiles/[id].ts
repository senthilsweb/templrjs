import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);
import lodash from 'lodash';
export default eventHandler(async (event) => {
  const { id } = event.context.params;
  const query = getQuery(event);

  /*Dynamic query string formation (start) */
  var query_string = [];
  lodash.forEach(query, function (value, key) {
    query_string.push(key + '=' + value);
  });

  console.log('query_string=', lodash.join(query_string, '&').replace(/=/g, ''));

  let { data: profiles, error } = await supabase.from('profiles').select(lodash.join(query_string, '&').replace(/=/g, '')).eq('id', id);
  return profiles;
});
