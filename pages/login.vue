<template>
	<NuxtLayout name="login">
	<div class="sm:mx-auto sm:w-full sm:max-w-md py-40 ml-10">
		<div class="object-center">
			<IconLogo/> <!--Default logo url configurred thru properties will be set but this can be overridden-->
		</div>

		<h2 class="mt-6 text-center text-2xl font-normal bg-clip-text">
			Login in to your account</h2>
		<p></p>
		<!--<p v-if="!forgotPassword && !formSignUp" class="mt-2 text-center text-sm text-gray-600 max-w">
			Don't have an account yet?
			<a @click="handleSignUpClick" href="#" class="font-medium text-primary-900 hover:text-primary-700"> Sign up </a>
		</p>-->
		<p v-if="forgotPassword" class="mt-2 text-center text-sm text-gray-600 max-w">
			Go back to
			<a @click="handleSignInClick" href="#" class="font-medium text-primary-500 hover:text-primary-600"> Sign in
			</a>
		</p>
		<p v-if="formSignUp" class="mt-2 text-center text-sm text-gray-600 max-w">
			Go back to
			<a @click="handleSignInClick" href="#" class="font-medium text-primary-500 hover:text-primary-600"> Sign in
			</a>
		</p>
		<div class="pt-6">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<div class="px-4 sm:rounded-lg sm:px-10">
					<form v-if="formSignIn" @submit.prevent="login">
						<input type="hidden" name="remember" value="true" />

						<div class="rounded-md shadow-sm">
							<div>
								<input v-model="data.email" aria-label="Email address" name="email" type="email"
									required
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300"
									placeholder="Email address" />
							</div>
							<div class="-mt-px">
								<input v-model="data.password" aria-label="Password" name="password" type="password"
									required
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300"
									placeholder="Password" />
							</div>
						</div>

						<div class="mt-6 flex items-center justify-between">
							<div class="flex items-center">
								<input id="remember_me" type="checkbox"
									class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
								<label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900"> Remember me
								</label>
							</div>

							<div class="text-sm leading-5">
								<a @click="handleForgotPassword" href="#"
									class="font-medium text-primary-500 hover:text-primary-600 focus:outline-none focus:underline transition ease-in-out duration-150">
									Forgot your password? </a>
							</div>
						</div>

						<div class="mt-6">
							<button id="btnSignIn" name="btnSignIn" type="submit"
								:class="['zyn-button zyn-login-button zyn-button-contrast','w-full']">
								<span class="absolute left-0 inset-y-0 flex items-center pl-3">
									<svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150"
										fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd"
											d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
											clip-rule="evenodd" />
									</svg>
								</span>
								Sign in
							</button>
						</div>
					</form>
					<!-- Signup (start)-->

					<form v-if="formSignUp" class="space-y-4">
						<div class="mt-10 flex items-center justify-center">
							<div class="flex items-center">
								<label class="ml-2 block text-sm leading-5 text-red-900">
									{{ error }}
								</label>
							</div>
							<div class="flex items-center" v-if="!notSamePassword">
								<label class="ml-2 block text-sm leading-5 text-red-900">
									<p>Passwords don't match.</p>
								</label>
							</div>
						</div>
						<div class="sm:col-span-6">
							<label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
							<div class="mt-1 rounded-md shadow-sm">
								<input v-model="data.email" type="text" id="email" name="email" autocomplete="email"
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"
									required />
							</div>
						</div>
						<div class="sm:col-span-6">
							<label for="phone" class="block text-sm font-medium text-gray-700"> Phone </label>
							<div class="mt-1 rounded-md shadow-sm">
								<input v-model="data.phone" type="text" id="phone" name="phone" autocomplete="phone"
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"
									required />
							</div>
						</div>
						<div class="sm:col-span-6">
							<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
							<div class="mt-1 rounded-md shadow-sm">
								<input v-model="data.password" type="password" id="password" name="password"
									autocomplete="password"
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"
									@change="passwordValidation" required />
							</div>
						</div>
						<div class="sm:col-span-6">
							<label for="confirm_password" class="block text-sm font-medium text-gray-700"> Confirm
								Password </label>
							<div class="mt-1 rounded-md shadow-sm">
								<input v-model="data.confirm_password" type="password" id="confirm_password"
									name="confirm_password" autocomplete="confirm_password"
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300"
									@change="notSamePasswords" required />
							</div>
						</div>
						<div class="mt-6 flex items-center justify-between">
							<div class="flex items-center">
								<input id="terms" type="checkbox"
									class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" required />
								<label for="terms" class="ml-2 block text-sm leading-5 text-gray-900">
									I agree to
									<a href="/legal/tc"
										class="font-medium text-primary-900 hover:text-primary-700 focus:outline-none focus:underline transition ease-in-out duration-150">
										terms & conditions. </a>
								</label>
							</div>
						</div>
						<div class="mt-6">
							<button id="btnSignUp" name="btnSignUp" type="submit"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-primary-900 hover:bg-primary-500 focus:outline-none focus:border-primary-900 focus:shadow-outline-primary active:bg-primary-900 transition duration-150 ease-in-out">Sign
								Up</button>
						</div>
						<div class="mt-6">
							<button id="btnReset" name="btnReset" type="reset"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out">Reset</button>
						</div>
					</form>

					<!-- Signup (end)-->
					<!--Forgot Password (start)-->
					<form v-if="forgotPassword" @submit.prevent="signIn">
						<div class="mt-10 flex items-center justify-center">
							<div class="flex items-center">
								<label class="ml-2 block text-sm leading-5 text-red-900">
									{{ error }}
								</label>
							</div>
						</div>
						<div class="sm:col-span-6">
							<div class="mt-1 rounded-md shadow-sm">
								<input v-model="email" placeholder="Email address" aria-label="Email address"
									type="text" id="f_email" name="f_email" autocomplete="f_email"
									class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 sm:text-sm border-gray-300" />
							</div>
						</div>
						<div class="mt-6">
							<button id="btnForgotPassword" name="btnForgotPassword" type="submit"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:border-lime-700 focus:shadow-outline-primary active:bg-lime-700 transition duration-150 ease-in-out">Reset</button>
						</div>
					</form>
					<!--Forgot Passowrd (end)-->
				</div>
			</div>
		</div>
	</div>
	</NuxtLayout>
</template>
<script>
import { ref } from "vue";

export default {
	components: {},
	data() {
		return {
			error: null,
			forgotPassword: false,
			formSignUp: false,
			formSignIn: true,
		};
	},
	methods: {
		handleForgotPassword() {
			this.formSignIn = false;
			this.formSignUp = false;
			this.forgotPassword = !this.forgotPassword;
		},
		handleSignUpClick() {
			this.forgotPassword = false;
			this.formSignIn = false;
			this.formSignUp = !this.formSignUp;
		},
		handleSignInClick() {
			this.forgotPassword = false;
			this.formSignIn = !this.formSignIn;
			this.formSignUp = false;
		},
	},
	mounted() { },
	created() { },
};
</script>
<script setup>
definePageMeta({
	
});
const client = useSupabaseAuthClient();
const user = useSupabaseUser();
const data = ref({});
const email = ref("");
const password = ref("");

const login = async () => {
	const { user, error } = await client.auth.signInWithPassword({
		email: data.value.email,
		password: data.value.password,
	}, {
		//redirectTo: "/account/" + useSupabaseUser().value.email,
	});
	if (error) {
		useNuxtApp().$toast.show({ type:'danger', message: `${error.message}`, timeout: 6 });
	}
};

console.log("login=" + JSON.stringify(login));

onMounted(() => {
	watchEffect(() => {
		if (user.value) {
			//navigateTo("/dashboard");
			navigateTo("/account/" + useSupabaseUser().value.email);
		}
	});
});
</script>
