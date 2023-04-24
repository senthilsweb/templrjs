export default async (req, res) => {
    const body = await readBody(req)
    const result = await $fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password'`, {
        method: 'post', headers: {
            "apikey": `${process.env.SUPABASE_KEY}`,
            "Content-Type": "application/json"
        }, body: {
            "email": body.email,
            "password": body.password
        }
    })
    return result
}