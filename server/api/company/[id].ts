import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
  const { id } = event.context.params;
  let { data: properties, error } = await supabase.from('company').select('*').eq('id', id);
  return properties;
});
