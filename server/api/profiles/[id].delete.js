import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
	const { id } = event.context.params;
	const { data, error } = await supabase.from('profiles').delete().eq('id', id);
	if (error) {
		return { status: 500, message: error.message }
	} else {
		return { status: 200, message: 'Profile deleted', data: data }
	}
});