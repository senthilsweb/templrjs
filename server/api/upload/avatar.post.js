import { createClient } from '@supabase/supabase-js';
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`);
import { decode } from 'base64-arraybuffer';

export default eventHandler(async (event) => {
  const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
  const fileData = body.fileData;
  const fileName = body.fileName;
  const id = body.id;
  let avatar_url = '';

  //console.log(body.fileName);



  const { data, error } = await supabase.storage.from('avatars').upload(fileName, decode(fileData), {
    contentType: 'image/png',
    upsert: true,
  });

  console.log(JSON.stringify(data));
  console.log(JSON.stringify(error));
  if (error) {
    return { status: error.statusCode, message: error.message, stack_trace: error }
  }
  else {
    avatar_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.Key}`;
    const { db_data, db_error } = await supabase.from('profiles').update({
      avatar_url: avatar_url,
    }).eq('id', id);
    if (db_error) {
      return { status: db_error.statusCode, message: db_error.message, stack_trace: db_error }
    }
  }
  return { status: 200, message: 'File uploaded', avatar_url: avatar_url }
});
