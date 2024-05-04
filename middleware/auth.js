export default defineNuxtRouteMiddleware(async () => {
  console.log('Entering auth middleware')
  const supabase = useSupabaseClient();
  
  const user = await supabase.auth.getUser()
  if (user.data.user === null) {
    console.log('User not logged in')
    return navigateTo('/')
  }
  console.log('Exiting auth middleware')
})