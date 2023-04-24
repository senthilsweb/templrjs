import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
  const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
  console.log(JSON.stringify(body));
  const { data, error } = await supabase.from('registrations').insert(body);
  if (error) {
    return error;
  }
  return data;
});
