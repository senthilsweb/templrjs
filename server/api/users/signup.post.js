import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);

export default eventHandler(async (event) => {
  const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests

  const { data, error } = await supabase.auth.signUp({ email: body.email, password: body.password })
  console.log('data=' + JSON.stringify(data));
  console.log('error=' + JSON.stringify(error));
  if (error) {
    return { status: 500, message: error.message }
  } else {
    return { status: 200, message: 'User created' }
  }

});
