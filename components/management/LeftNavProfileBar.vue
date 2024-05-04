<template>
	<div>
		<div class="flex-shrink-0 flex border-t border-gray-300 p-4">
			<div>
				<a :href="`/account/${useSupabaseUser().value.email}`" class="group block w-full flex-shrink-0">
					<div class="flex items-center">
						<div>
							<img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-gray-500">{{ useSupabaseUser().value.email }}</p>
							<p class="text-xs font-medium text-gray-400 group-hover:text-gray-700">Account settings</p>
						</div>
					</div>
				</a>
			</div>
		</div>
		<div class="flex-shrink-0 w-14">
			<!-- Force sidebar to shrink to fit close icon -->
		</div>
	</div>
</template>
<script>
	export default {
		created() {
			useNuxtApp().$bus.$on("evtProfileClick", (data) => {
				//alert("Hello");
				//navigateTo({ path: "/account/ramanathan@zynomi.com" });
				navigateTo("/account/ramanathan@zynomi.com");
			});
		},
		beforeDestroy() {
			useNuxtApp().$bus.$off("evtProfileClick");
		},
	};
</script>
<script setup>
	import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
	import {EllipsisVerticalIcon} from "@heroicons/vue/20/solid";
</script>
