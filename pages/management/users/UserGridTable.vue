<template>
	<div class="px-4 sm:px-4 lg:px-4">
		<div class="mt-8 flex flex-col">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<Grid :rows="rows" :columns="['Make', 'Model', 'Year', 'Color']" :limit="limit" @rowClick="handleRowClick" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const data = [
				["Ford", "Fusion", "2011", "Silver"],
				["Chevrolet", "Cruz", "2018", "White"],
			]
const rows = ref(data);
const cols = ['Make', 'Model', 'Year', 'Color'];
const limit = ref(2);
const handleRowClick = (args) => {
  console.log(args)
}
</script>
