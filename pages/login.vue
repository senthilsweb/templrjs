<template>
  <NuxtLayout name="login">
    <div class="sm:mx-auto sm:w-full sm:max-w-md py-40 ml-10">
          <div class="object-center">
            <IconLogo :logo_url="usePropertiesStore().logo_url_dark" class="w-14 h-14 object-contain" />
            <!--Default logo url configurred thru properties will be set but this can be overridden-->
          </div>

          <h2 class="mt-6 text-center text-2xl font-normal bg-clip-text">
            Login in to your account</h2>
      
          <div class="px-6 py-10">
            <input v-model="credentials.email" autocapitalize="none" autocomplete="none" type="text" placeholder="Email"
              class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300" />
            <input v-model="credentials.password" autocapitalize="none" autocomplete="none" type="password"
              placeholder="Password"
              class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300" />
          </div>
          <div class="px-6 mb-2">
            <button @click="doSignIn"
              class="bg-primary-900 hover:bg-primary-500 text-white px-4 py-4  mt-3 w-full font-bold">SIGN
              IN</button>
          </div>
          <div class="px-6 text-center">
            <IonRouterLink @click="useRouter().replace('/forgotpassword')" to="/forgot-password"
              class="text-primary-700 hover:text-primary-500 mb-2 block">Forgot Password?</IonRouterLink>
            <span class="text-gray-500">Don't have an account? </span>
            <nuxt-link @click="signup" class="text-primary-700 hover:text-primary-500">Sign Up</nuxt-link>
          </div>
  </div>
  </NuxtLayout>
</template>

<!-- Rest of the script remains unchanged     -->
<script lang="ts" setup>
definePageMeta({
  alias: ['/', '/sign-in'],
});
const supabase = useSupabaseClient();
const user = await supabase.auth.getUser();
const route = useRoute();
const router = useRouter();
const cancelWatch = ref();

console.log('On Sign-in page');




const credentials = ref({
  email: '',
  password: '',
});

const userProfile = ref({});

/**
 *
 */
const doSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      ...credentials.value,
    });

    if (error) {
      // Log the error status code and message
      //presentToast('top', error.message, 'danger');
      alert(error.message)
      console.error('Error:', error.message, 'Status code:', error.status);

      // Check for a 405 status code
      if (error.status === 405) {
        console.error('Method Not Allowed');
        // Handle the 405 error specifically
        // For example, display a specific message to the user
      } else {
        throw error;
      }
    }
    console.log('JWT user===>', JSON.stringify(data.user));


    // Set login session to localstorage
    if (data.user) {
      localStorage.setItem('data:user', JSON.stringify(user.data));
    }
    document.location.href="/docs/getting-started";
    //await navigateTo("/docs/getting-started")

  } catch (error) {
    console.log('error', (error as any)?.message);
    alert((error as any)?.message)
  }
};

</script>
