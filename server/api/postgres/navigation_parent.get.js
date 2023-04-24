import { createClient } from '@supabase/supabase-js'
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`)
export default async (req, res) => {
       //const { data: navigations, error } = await supabase.from('navigation').select('*')
       const { data, error } = await supabase.rpc('get_parent_navigations')
       return data
}