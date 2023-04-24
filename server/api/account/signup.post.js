export default async (req, res) => {
    const body = await readBody(req)

    /* The body should be as below for email based sign-up
    body: {
            "email": body.email,
            "password": body.password
        }
   //------Phone based sign-up
   body: {
            "email": body.email,
            "phone": body.phone
        }
    */
    const signup = await $fetch(`${process.env.SUPABASE_URL}/auth/v1/signup`, {
        method: 'post', headers: {
            "apikey": `${process.env.SUPABASE_KEY}`,
            "Content-Type": "application/json"
        }, body: body
    })
    return signup
}