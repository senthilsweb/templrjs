import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
	const { id } = event.context.params;
	console.log(`Deleting country with ID = [${id}]`)
	const { data, error } = await supabase.from('country').delete().eq('id', id);
	console.log(`error = ${error}`)
	console.log(`data = ${data}`)
	if (error) {
		return error;
	}
	return data;
});