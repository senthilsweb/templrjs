import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
	const { id } = event.context.params;
	const { error } = await supabase.from('inquiries').delete().eq('id', id);
	console.log(error)
	return error;
});