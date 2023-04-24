import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
  const { id } = event.context.params;
  let { data: navigation, error } = await supabase.from('navigation').select('*').eq('id', id);
  return navigation;
});
