import { createClient } from '@supabase/supabase-js'
import lodash from 'lodash';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`)

// Make a request

export default async (req, res) => {

       const { data, error } = await supabase.rpc('get_child_navigations')
       return data
}