<!--
Reference : https://blog.devartis.com/custom-select-with-vue-js-39b010ddc1fb

-->
<template>
	<div>
		<div class="mt-1 sm:px-2">
			<div class="space-y-3">
				<div v-for="(option, optionIdx) in this.items.data" :key="option.code" class="flex items-center mx-2">
					<input @change="onChangeCheckBox" :checked="checkedOption(option.code)" :id="`${option.code}-${optionIdx}`" :name="`${this.items.name}[]`" :value="option.name" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
					<label :for="`${option.code}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.name }}</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "checkBoxGroup",
		data() {
			return {
				items: this.data,
				checked_value: this.checked_value,
			};
		},
		props: {
			type: String,

			name: String,
			checked_value: new Array(),
			api: String,
			data: new Array(),
		},
		emits: ["checked_item"],
		methods: {
			checkedOption(option) {
				return _.indexOf(this.checked_value, option) > -1;
			},
			onChangeCheckBox(e) {
				const checkedCode = e.target.value;
				const option = this.items.data.find((option) => {
					return checkedCode === option.name; //checkedCode - > always returns the "value"
				});
				try {
					this.checked_value = option.name;
					this.$emit("checked_item", option.name);
				} catch (e) {
					this.checked_value = "";
					this.$emit("checked_item", "");
				}
			},
			async getCheckbox() {
				alert("getCheckbox");
			},
			created() {
				alert("created called");
				//this.getCheckbox()
			},
			beforeMount() {
				this.getCheckbox();
			},
		},
		async fetch() {
			/*try {
            if (this.api !== undefined) {
                this.items = await fetch(this.$config.apiURL + this.api).then(res => res.json())
            } else if (this.data !== undefined) {
                this.items = this.data
            } else {
                this.items = ['No data']
            }
        } catch (error) {
            console.log(error)
        }*/
		},
	};
</script>
