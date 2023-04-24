<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon, ChevronUpDownIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
const user = useSupabaseUser();
const client = useSupabaseClient();
</script>
<template>
	<!-- User account dropdown -->
	<Menu v-if="useSupabaseUser().value" as="div" class="relative inline-block px-3 text-left">
		<div>
			<MenuButton
				class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100">
				<span class="flex w-full items-center justify-between">
					<span class="flex min-w-0 items-center justify-between space-x-3">
						<Icon name="icon-park-twotone:avatar" class="h-6 w-6 text-gray-500" />
						<span class="flex min-w-0 flex-1 flex-col">
							<span class="truncate text-sm font-medium text-gray-900">{{ useSupabaseUser().value.email
}}</span>
						</span>
					</span>
					<ChevronUpDownIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
						aria-hidden="true" />
				</span>
			</MenuButton>
		</div>
		<transition enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95">
			<MenuItems
				class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
				<div class="py-1">
					<MenuItem v-slot="{ active }">
					<a :href="`/account/${useSupabaseUser().value.email}`"
						:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
						<Icon name="icon-park-twotone:id-card-h" class="h-6 w-6 text-primary-500" />
						profile
					</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
					<a :href="`/account/${useSupabaseUser().value.email}`"
						:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
						<Icon name="icon-park-twotone:setting" class="h-6 w-6 text-primary-500" />
						Personalization
					</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
					<a href="/organization"
						:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
						<Icon name="icon-park-twotone:building-one" class="h-6 w-6 text-primary-500" />
						Organization
					</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
					<a href="#"
						:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
						<Icon name="icon-park-twotone:book-open" class="h-6 w-6 text-primary-500" />
						Documentation
					</a>
					</MenuItem>
				</div>

				<div class="py-1">
					<MenuItem v-slot="{ active }">
					<a href="#" @click="client.auth.signOut()"
						:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
						<Icon name="icon-park-outline:power" class="h-6 w-6 text-red-500" />
						Logout
					</a>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>
// Using the lifecycle hooks of the Vue for refreshing the page. url: https://www.koderhq.com/tutorial/vue/lifecycle-hook/
// After clicking of logout click event "client.auth.signOut()", using the beforeUpdate method vue hook used to redirect to 
login page.
// Code snippet that can be used  to refresh page vue-router in Vuejs.	"this.$router.go(0)"
<script>
	export default {
		components: {},
		data() {
			return {
				data: [],
			};
		},
		created() {
    },
		beforeUpdate(){
			//this.$router.go(0)
		}
	};
</script>