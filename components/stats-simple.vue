<template>
	<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		<ClientOnly>
			<div v-for="(item, index) in this.items.data">
				<div v-if="!item.hidden">
					<div class="relative bg-white pt-5 px-4  sm:pt-6 sm:px-6 shadow overflow-hidden"
						:class="[item.links ? 'pb-12' : '']">
						<dt>
							<div class="absolute bg-primary-500 p-3">
								<!-- Heroicon name: outline/users -->
								<svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path v-for="(path, index) in item.paths" :key="index" stroke-linecap="round"
										stroke-linejoin="round" stroke-width="2" :d="path" />
								</svg>
							</div>
							<p class="ml-16 text-md font-medium text-gray-500 truncate">{{ item.name }}</p>
						</dt>
						<dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
							<p class="text-2xl font-semibold text-gray-900">{{ $s.isBlank(item.value) ? "&nbsp;" :
									item.value
							}}</p>
							<div v-if="item.links" class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
								<div class="relative flex items-start">
									<div class="flex items-center h-5">
										<ul>
											<li v-on:click="useNuxtApp().$bus.$emit(`${link.event}`)"
												v-for="(link, index) in item.links" :key="'stat_lnk_' + index"
												class="text-sm">
												<a href="#" class="font-medium text-primary-600 hover:text-primary-500">
													{{ link.title }}<span class="sr-only"> {{ link.title }}</span></a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</dd>
					</div>
				</div>

			</div>
		</ClientOnly>
	</dl>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			items: this.data,
		};
	},
	props: {
		type: String,
		label: String,
		name: String,
		selected_item: String,
		api: String,
		data: Array,
	},

	methods: {},
};
</script>
