import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {

	//const options = getQuery(event);//TBD
	const { id } = event.context.params;//bucket name

	//console.log('options=', options);
	//console.log('bucket name=', id);

	const { data, error } = await supabase
		.storage
		.from(id)
		.list('');
	if (error) {
		return { status: error.statusCode, message: error.message, stack_trace: error }
	} else {
		return data;
	}

});