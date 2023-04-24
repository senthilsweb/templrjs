<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
        <!--Left side panel (Start)-->
        <div>
            <section aria-labelledby="applicant-information-title">

                <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <div class="max-w-lg mx-auto lg:max-w-none">
                        <section aria-labelledby="userprofile" class="">
                            <div v-if="user.picture">
                                <div class="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
                                    <img :src="user.picture" alt="" class="object-cover" />
                                </div>
                            </div>
                            <div>
                                <h3 class="font-medium text-gray-900">User Profile</h3>
                                <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                    <div class="flex justify-between py-3 text-sm font-medium">
                                        <dt class="text-gray-500">First Name</dt>
                                        <dd class="whitespace-nowrap text-gray-900">{{ user.first_name }}</dd>
                                    </div>
                                    <div class="flex justify-between py-3 text-sm font-medium">
                                        <dt class="text-gray-500">Last Name</dt>
                                        <dd class="whitespace-nowrap text-gray-900">{{ user.last_name }}</dd>
                                    </div>
                                    <div class="flex justify-between py-3 text-sm font-medium">
                                        <dt class="text-gray-500">Email</dt>
                                        <dd class="whitespace-nowrap text-gray-900">{{ user.email }}</dd>
                                    </div>
                                    <div class="flex justify-between py-3 text-sm font-medium">
                                        <dt class="text-gray-500">Mobile</dt>
                                        <dd class="whitespace-nowrap text-gray-900">{{ user.mobile_phone }}</dd>
                                    </div>
                                    <div class="flex justify-between py-3 text-sm font-medium">
                                        <dt class="text-gray-500">Member since</dt>
                                        <dd class="whitespace-nowrap text-gray-900">{{ user.created_at }}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div class="pt-2 sm:flex sm:items-center sm:justify-between">
                                <button type="submit" @click="useNuxtApp().$bus.$emit('evtUpsertUser')"
                                    class="w-full bg-lime-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lime-50 focus:ring-lime-400 sm:ml-6 sm:order-last sm:w-auto">Edit</button>
                                <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                                    <!--Custom help guide text goes here.-->
                                </p>
                            </div>

                        </section>
                    </div>
                </div>
            </section>
        </div>
        <!--Left side panel (End)-->
        <!--Right side panel (Start)-->
        <div>
            <section aria-labelledby="User-Roles">
                <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h3 class="font-medium text-gray-900">Assigned Role(s)</h3>
                    <div class="sm:col-span-2">
                        <dd class="bg-primary-50 bg-opacity-50 mt-1 text-sm text-gray-900 rounded-md">
                            <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                                <li v-for="role in user.roles" :key="role"
                                    class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div class="flex w-0 flex-1 items-center">
                                        <span class="ml-2 w-0 flex-1 truncate">{{ role }}</span>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                    <div class="pt-2 sm:flex sm:items-center sm:justify-between">
                        <button type="submit" @click="useNuxtApp().$bus.$emit('evtUpsertUser')"
                            class="w-full bg-lime-600 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lime-50 focus:ring-lime-400 sm:ml-6 sm:order-last sm:w-auto">Edit</button>
                        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                            <!--Custom help guide text goes here.-->
                        </p>
                    </div>
                </div>

            </section>
        </div>
        <!--Right side panel (End)-->



    </div>
    <!--Footer Edit button (Start)-->
    <!--<div class="grid grid-cols-1 pt-4">
        <section aria-labelledby="timeline-title">
            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <button type="submit"
                        class="w-full bg-primary-500 border border-transparent shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-400 sm:ml-6 sm:order-last sm:w-auto">Edit</button>
                    <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                        Custom help guide text goes here.
                    </p>
                </div>
            </div>
        </section>
    </div>-->
    <!--Footer Edit button (End)-->
</template>
<script>
import { Calendar, DatePicker } from "v-calendar";
export default {
    components: {
        Calendar,
        DatePicker,
    },
    data() {
        return {
            data: {}
        };
    },
    methods: {},
    async asyncData({ params }) { },
    created() {
        this.data = {
            location: { type: "Point", coordinates: [0.0, 0.0] },
            address: { street: "", apartment: "", city: "", district: "", state: "", country: "", postalCode: "" },
        };
    },
};
</script>
<script setup>
const user = {
    "_id": {
        "$oid": "6327b3f0d2b1b68f79f3fbc4"
    },
    "email": "suresh@zynomi.com",
    "roles": [
        "Field Engineer", "Administrator"
    ],
    //"picture": "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
    "username": "Shemar_Bruen",
    "password": "suresh",
    "last_name": "Jacklyn.Schiller36",
    "first_name": "Jaida_Abshire",
    "hand_phone": "(300) 515-2009 x8411",
    "created_at": "2022-09-18T14:44:47.046Z",
    "modified_at": "2022-09-18T04:16:42.264Z",
    "subscription": "free",
    "mobile_phone": "785.486.1601"
}
</script>
