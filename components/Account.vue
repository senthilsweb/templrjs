<template>
    <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="payment-details-heading">
            <form>
                <div class="shadow sm:overflow-hidden sm:rounded-md">
                    <div class="bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h2 id="payment-details-heading" class="text-lg font-medium leading-6 text-gray-900">Payment
                                details</h2>
                            <p class="mt-1 text-sm text-gray-500">Update your billing information. Please note that
                                updating your
                                location could affect your tax rates.</p>
                        </div>

                        <div class="rounded-md shadow-sm">
                            <div>
                                <input v-model="data.email" aria-label="Email address" name="email" type="email"
                                    required
                                    class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300"
                                    placeholder="Email address" readonly />
                            </div>
                            <div class="-mt-px">
                                <input v-model="data.password" aria-label="Password" name="password" type="password"
                                    required
                                    class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300"
                                    placeholder="Password" />
                            </div>
                            <div class="-mt-px">
                                <input v-model="data.password_match" aria-label="Password" name="password_match"
                                    type="password_match" required
                                    class="flex-1 focus:ring-lime-600 focus:border-lime-600 block w-full min-w-0 rounded-none sm:text-sm border-gray-300"
                                    placeholder="Re-enter password" />
                            </div>
                        </div>
                        <div class="mt-6">
                            <button id="btnChangePassword" name="btnChangePassword" type="submit"
                                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-primary-900 hover:bg-primary-500 focus:outline-none focus:border-primary-900 focus:shadow-outline-primary active:bg-primary-900 transition duration-150 ease-in-out">
                                Change Password
                            </button>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button type="submit"
                            class="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">Save</button>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
import * as heroIcons from "@heroicons/vue/20/solid";
export default {
    data() {
        return {
            data: {}
        };
    },
    created() {

    },
    mounted() {

    },
};
</script>