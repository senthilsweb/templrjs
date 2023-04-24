import { createClient } from '@supabase/supabase-js';

const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);
const navigation_parent_get = async (req, res) => {
  const { data, error } = await supabase.rpc("get_parent_navigations");
  return data;
};

export { navigation_parent_get as default };
