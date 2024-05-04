<template>
	<div id="app">
		<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0" x-data x-init="$el.focus()">
			<div class="max-w-8xl mx-auto">
				<slot />
			</div>
		</main>
	</div>
	<AboutTemplrJS />
</template>

<script>
	export default {
		components: {},
		methods: {},
	};
</script>
