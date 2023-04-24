import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
	const { id } = event.context.params;
	console.log(`Deleting registration with id = ${id}`)
	const { error } = await supabase.from('registrations').delete().eq('id', id);
	return error;
});